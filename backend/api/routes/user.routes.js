import express from "express";
import {
  register,
  login,
  getUsers,
  deactivate,
  updateProfile,
} from "../controllers/user.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { uploadedImages } from "../middleware/upload.middleware.js";

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Protected
router.patch("/update", protect, uploadedImages, updateProfile);

// Admin
router.get("/me", protect, getUsers);
router.put("/:id", protect, deactivate);

export default router;
