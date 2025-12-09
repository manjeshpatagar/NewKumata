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

router.post("/", protect, adminOnly, uploadedImages, addCategory);
router.patch("/:id", protect, adminOnly, uploadedImages, editCategory);
router.delete("/:id", protect, adminOnly, removeCategory);

router.get("/", protect, getCategories);
router.get("/:id", protect, getCategory);

export default router;
