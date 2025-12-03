import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createCategory = async (data) => {
  const existing = await Category.findOne({ name: data.name });
  if (existing) throw new ApiError(400, "Category already exists");
  const category = await Category.create(data);
  return category;
};

export const getAllCategories = async () => {
  return Category.find({}).sort({ createdAt: -1 });
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");
  return category;
};

export const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!category) throw new ApiError(404, "Category not found");
  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(404, "Category not found");
  return category;
};
