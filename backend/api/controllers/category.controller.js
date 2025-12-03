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
 📦 Create new category (with image upload)
----------------------------- */
export const addCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const image = req.files?.image?.[0]?.url || null;

  const category = await createCategory({ name, description, image });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

/* -----------------------------
 📋 Get all categories
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
 🔍 Get single category
----------------------------- */
export const getCategory = asyncHandler(async (req, res) => {
  const category = await getCategoryById(req.params.id);
  res.status(200).json({ success: true, data: category });
});

/* -----------------------------
 ✏️ Update category (replace image if new one uploaded)
----------------------------- */
export const editCategory = asyncHandler(async (req, res) => {
  const { name, description, isActive } = req.body;

  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404).json({ success: false, message: "Category not found" });
    return;
  }

  let image = category.image;
  const newImage = req.files?.image?.[0]?.url;

  // Replace old image if new uploaded
  if (newImage) {
    await deleteFile(category.image); // delete old from IMGBB
    image = newImage;
  }

  const updated = await updateCategory(req.params.id, {
    name,
    description,
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
 🗑️ Delete category (delete image too)
----------------------------- */
export const removeCategory = asyncHandler(async (req, res) => {
  const category = await getCategoryById(req.params.id);

  if (category.image) await deleteFile(category.image); // remove from IMGBB

  await deleteCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
