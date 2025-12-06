import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { SubCategory } from "../models/subcategory.model.js";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
 📌 Create Product
----------------------------- */
export const createProduct = async (data) => {
  const category = await Category.findById(data.categoryId);
  if (!category) throw new ApiError(404, "Category not found");

  if (category.type === "business" && !data.subCategoryId) {
    throw new ApiError(400, "SubCategory is required for business category");
  }

  if (category.type === "business") {
    const sub = await SubCategory.findById(data.subCategoryId);
    if (!sub) throw new ApiError(404, "SubCategory not found");
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
 📌 Update Product
----------------------------- */
export const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) throw new ApiError(404, "Product not found");

  return product;
};

/* -----------------------------
 📌 Delete Product
----------------------------- */
export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError(404, "Product not found");
  return product;
};
