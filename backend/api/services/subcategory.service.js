import { SubCategory } from "../models/subcategory.model.js";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
 📦 Create SubCategory
----------------------------- */
export const createSubCategory = async (data) => {
  const category = await Category.findById(data.categoryId);
  if (!category) throw new ApiError(404, "Category not found");

  if (category.type !== "business") {
    throw new ApiError(
      400,
      "Subcategories can only be added to business categories"
    );
  }

  const exists = await SubCategory.findOne({
    name: data.name,
    categoryId: data.categoryId,
  });
  if (exists) throw new ApiError(400, "SubCategory already exists");

  return SubCategory.create(data);
};

/* -----------------------------
 📋 Get All SubCategories (optional filter by category)
----------------------------- */
export const getAllSubCategories = async (categoryId) => {
  if (categoryId) {
    return SubCategory.find({ categoryId }).sort({ createdAt: -1 });
  }
  return SubCategory.find().sort({ createdAt: -1 });
};

/* -----------------------------
 🔍 Get Single SubCategory
----------------------------- */
export const getSubCategoryById = async (id) => {
  const subcategory = await SubCategory.findById(id);
  if (!subcategory) throw new ApiError(404, "SubCategory not found");
  return subcategory;
};

/* -----------------------------
 ✏️ Update SubCategory
----------------------------- */
export const updateSubCategory = async (id, data) => {
  const subcategory = await SubCategory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!subcategory) throw new ApiError(404, "SubCategory not found");
  return subcategory;
};

/* -----------------------------
 🗑️ Delete SubCategory
----------------------------- */
export const deleteSubCategory = async (id) => {
  const subcategory = await SubCategory.findByIdAndDelete(id);
  if (!subcategory) throw new ApiError(404, "SubCategory not found");
  return subcategory;
};
