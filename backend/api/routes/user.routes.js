import express from "express";
import {
  register,
  login,
  getUsers,
  deactivate,
  getProfile,
} from "../controllers/user.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/me", protect, getProfile);

// Admin
router.get("/", adminOnly, getUsers);
router.put("/:id", adminOnly, deactivate);

export default router;
