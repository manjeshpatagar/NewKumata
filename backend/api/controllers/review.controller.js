import { asyncHandler } from "../utils/asyncHandler.js";
import {
  addReview,
  updateReview,
  deleteReview,
  getProductReviews,
} from "../services/review.service.js";

/* -----------------------------
 ⭐ Add Review
----------------------------- */
export const createReview = asyncHandler(async (req, res) => {
  const review = await addReview(req.user._id, req.body);

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: review,
  });
});

/* -----------------------------
 ⭐ Update Review
----------------------------- */
export const editReview = asyncHandler(async (req, res) => {
  const updated = await updateReview(req.user._id, req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    data: updated,
  });
});

/* -----------------------------
 ⭐ Delete Review
----------------------------- */
export const removeReview = asyncHandler(async (req, res) => {
  await deleteReview(req.user._id, req.params.id);

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

/* -----------------------------
 ⭐ Get reviews for a product
----------------------------- */
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await getProductReviews(req.params.productId);

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});
