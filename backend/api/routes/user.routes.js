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

import validate from "../utils/validators.js";
import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
} from "../validators/user.validator.js";

const router = express.Router();

/* -------- Public -------- */
router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

/* -------- Protected -------- */
router.patch(
  "/update",
  protect,
  uploadedImages,
  updateProfileValidator,
  validate,
  updateProfile
);

/* -------- Admin / User -------- */
router.get("/me", protect, getUsers);
router.put("/:id", protect, adminOnly, deactivate);

export default router;
