import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service.js";
import { deleteFile } from "../middleware/upload.middleware.js";
import { Category } from "../models/category.model.js";

/* -----------------------------
 📦 Add Category
----------------------------- */
export const addCategory = asyncHandler(async (req, res) => {
  const { name, description, type } = req.body;

  if (!type) throw new ApiError(400, "Category type is required");

  const image = req.files?.image?.[0]?.url || null;

  const category = await createCategory({ name, description, type, image });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

/* -----------------------------
 📋 Get All Categories (with subcategories)
----------------------------- */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getAllCategories();
  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

/* -----------------------------
 🔍 Get Single Category (with subcategories)
----------------------------- */
export const getCategory = asyncHandler(async (req, res) => {
  const category = await getCategoryById(req.params.id);
  res.status(200).json({ success: true, data: category });
});

/* -----------------------------
 ✏️ Edit Category (image replace)
----------------------------- */
export const editCategory = asyncHandler(async (req, res) => {
  const { name, description, type, isActive } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, "Category not found");

  let image = category.image;
  const newImage = req.files?.image?.[0]?.url;

  if (newImage) {
    if (category.image) await deleteFile(category.image);
    image = newImage;
  }

  const updated = await updateCategory(req.params.id, {
    name,
    description,
    type,
    image,
    isActive,
  });

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updated,
  });
});

/* -----------------------------
 🗑️ Delete Category + Subcategories
----------------------------- */
export const removeCategory = asyncHandler(async (req, res) => {
  const category = await getCategoryById(req.params.id);

  if (category.image) await deleteFile(category.image);

  await deleteCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category & subcategories deleted successfully",
  });
});
