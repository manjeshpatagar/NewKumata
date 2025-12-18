import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "../services/subcategory.service.js";
import { deleteFile } from "../middleware/upload.middleware.js";
import { SubCategory } from "../models/subcategory.model.js";

/* -----------------------------
 📦 Create SubCategory (image supported)
----------------------------- */
export const addSubCategory = asyncHandler(async (req, res) => {
  const { name, description, categoryId } = req.body;

  const image = req.files?.image?.[0]?.url || null;

  const subcategory = await createSubCategory({
    name,
    description,
    categoryId,
    image,
  });

  res.status(201).json({
    success: true,
    message: "SubCategory created successfully",
    data: subcategory,
  });
});

/* -----------------------------
 📋 Get All SubCategories (optional categoryId)
----------------------------- */
export const getSubCategories = asyncHandler(async (req, res) => {
  const categoryId = req.query.categoryId || null;

  const subcategories = await getAllSubCategories(categoryId);

  res.status(200).json({
    success: true,
    count: subcategories.length,
    data: subcategories,
  });
});

/* -----------------------------
 🔍 Get Single SubCategory
----------------------------- */
export const getSubCategory = asyncHandler(async (req, res) => {
  const subcategory = await getSubCategoryById(req.params.id);
  res.status(200).json({ success: true, data: subcategory });
});

/* -----------------------------
 ✏️ Update SubCategory (replace image)
----------------------------- */
export const editSubCategory = asyncHandler(async (req, res) => {
  const { name, description, categoryId, isActive } = req.body;

  const subcategory = await SubCategory.findById(req.params.id);
  if (!subcategory) throw new ApiError(404, "SubCategory not found");

  let image = subcategory.image;
  const newImage = req.files?.image?.[0]?.url;

  if (newImage) {
    if (subcategory.image) await deleteFile(subcategory.image);
    image = newImage;
  }

  const updated = await updateSubCategory(req.params.id, {
    name,
    description,
    categoryId,
    isActive,
    image,
  });

  res.status(200).json({
    success: true,
    message: "SubCategory updated successfully",
    data: updated,
  });
});

/* -----------------------------
 🗑️ Delete SubCategory (delete IMGBB image)
----------------------------- */
export const removeSubCategory = asyncHandler(async (req, res) => {
  const subcategory = await getSubCategoryById(req.params.id);

  if (subcategory.image) await deleteFile(subcategory.image);

  await deleteSubCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "SubCategory deleted successfully",
  });
});
