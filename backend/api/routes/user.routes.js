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
router.patch("/me", protect, uploadedImages, updateProfile);

// Admin
router.get("/", adminOnly, getUsers);
router.put("/:id", adminOnly, deactivate);

export default router;
