import { Product } from "../models/product.model.js";
import { SubCategory } from "../models/subcategory.model.js";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
 📌 Create Product
----------------------------- */
export const createProduct = async (data) => {
  const sub = await SubCategory.findById(data.subCategoryId);
  if (!sub) throw new ApiError(404, "SubCategory not found");
  return Product.create(data);
};

/* -----------------------------
 📌 Get All Products
----------------------------- */
export const getAllProducts = async () => {
  return Product.find()
    .populate("subCategoryId")  // ✅ ONLY THIS (categoryId removed)
    .sort({ createdAt: -1 });
};

/* -----------------------------
 📌 Get Product By ID
----------------------------- */
export const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate("subCategoryId"); // ✅ ONLY THIS
  
  if (!product) throw new ApiError(404, "Product not found");
  return product;
};

/* -----------------------------
 📌 Update Product
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
