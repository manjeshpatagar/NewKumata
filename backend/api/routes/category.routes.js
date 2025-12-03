import express from "express";
import {
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  removeCategory,
} from "../controllers/category.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { uploadedImages } from "../middleware/upload.middleware.js";

const router = express.Router();

// Public Routes
router.get("/", getCategories);
router.get("/:id", getCategory);

// Admin-only Routes
router.post("/", adminOnly, uploadedImages, addCategory);
router.patch("/:id", adminOnly, uploadedImages, editCategory);
router.delete("/:id", adminOnly, removeCategory);

export default router;
