import { Product } from "../models/shop.model.js";
import { Category } from "../models/category.model.js";
import { SubCategory } from "../models/subcategory.model.js";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
 📌 Create Product (All fields optional except shopName + address)
----------------------------- */
export const createProduct = async (data) => {
  const category = await Category.findById(data.categoryId);
  if (!category) throw new ApiError(404, "Category not found");

  // Business category requires subcategory
  if (category.type === "business") {
    if (!data.subCategoryId) {
      throw new ApiError(
        400,
        "subCategoryId is required for business category"
      );
    }

    const sub = await SubCategory.findById(data.subCategoryId);
    if (!sub) throw new ApiError(404, "SubCategory not found");
  }

  // Advertisement category must NOT have a subcategory
  if (category.type === "advertisement" && data.subCategoryId) {
    throw new ApiError(400, "Advertisements cannot have subcategories");
  }

  return Product.create(data);
};

/* -----------------------------
 📌 Get All Products
----------------------------- */
export const getAllProducts = async () => {
  return Product.find()
    .populate("categoryId")
    .populate("subCategoryId")
    .sort({ createdAt: -1 });
};

/* -----------------------------
 📌 Get Product By ID
----------------------------- */
export const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("categoryId")
    .populate("subCategoryId");

  if (!product) throw new ApiError(404, "Product not found");
  return product;
};

/* -----------------------------
 📌 Update Product (All fields optional)
----------------------------- */
export const updateProduct = async (id, data) => {
  return Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/* -----------------------------
 🗑 Delete Product
----------------------------- */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, "Product not found");
  return product;
};
