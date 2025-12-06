import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createReview,
  editReview,
  removeReview,
  getReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

// Public: Get all reviews for a product
router.get("/:productId", getReviews);

// User actions
router.post("/", protect, createReview);
router.patch("/:id", protect, editReview);
router.delete("/:id", protect, removeReview);

export default router;
