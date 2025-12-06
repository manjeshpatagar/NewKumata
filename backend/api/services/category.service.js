import { Category } from "../models/category.model.js";
import { SubCategory } from "../models/subcategory.model.js";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
 📦 Create Category
----------------------------- */
export const createCategory = async (data) => {
  const exists = await Category.findOne({ name: data.name });
  if (exists) throw new ApiError(400, "Category already exists");
  return Category.create(data);
};

/* -----------------------------
 📋 Get All Categories with Sub Categories
----------------------------- */
export const getAllCategories = async () => {
  const categories = await Category.find().sort({ createdAt: -1 });

  // Attach subcategories for business type only
  const result = [];
  for (const cat of categories) {
    let subcategories = [];

    if (cat.type === "business") {
      subcategories = await SubCategory.find({ categoryId: cat._id });
    }

    result.push({
      ...cat.toObject(),
      subcategories,
    });
  }

  return result;
};

/* -----------------------------
 🔍 Get Single Category with sub categories
----------------------------- */
export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  let subcategories = [];

  if (category.type === "business") {
    subcategories = await SubCategory.find({ categoryId: id });
  }

  return {
    ...category.toObject(),
    subcategories,
  };
};

/* -----------------------------
 ✏️ Update Category
----------------------------- */
export const updateCategory = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!category) throw new ApiError(404, "Category not found");

  return category;
};

/* -----------------------------
 🗑️ Delete Category + Subcategories
----------------------------- */
export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(404, "Category not found");

  // Delete all subcategories under this category
  await SubCategory.deleteMany({ categoryId: id });

  return category;
};
