import express from "express";
import {
  addSubCategory,
  getSubCategories,
  getSubCategory,
  editSubCategory,
  removeSubCategory,
} from "../controllers/subcategory.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { uploadedImages } from "../middleware/upload.middleware.js";

const router = express.Router();

// Public
router.get("/", getSubCategories);
router.get("/:id", getSubCategory);

// Admin Only
router.post("/", protect, adminOnly, uploadedImages, addSubCategory);
router.patch("/:id", protect, adminOnly, uploadedImages, editSubCategory);
router.delete("/:id", protect, adminOnly, removeSubCategory);

export default router;
