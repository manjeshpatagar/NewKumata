import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";

/* ----------------------------------------
 ⭐ Helper: Recalculate product rating
---------------------------------------- */
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ productId });

  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(productId, { rating: 0 });
    return;
  }

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, { rating: avg.toFixed(1) });
};

/* ----------------------------------------
 ⭐ Add Review
---------------------------------------- */
export const addReview = async (userId, data) => {
  const product = await Product.findById(data.productId);
  if (!product) throw new ApiError(404, "Product not found");

  const exists = await Review.findOne({
    userId,
    productId: data.productId,
  });

  if (exists) throw new ApiError(400, "You already reviewed this product");

  const review = await Review.create({ ...data, userId });

  await updateProductRating(data.productId);

  return review;
};

/* ----------------------------------------
 ⭐ Update Review
---------------------------------------- */
export const updateReview = async (userId, id, data) => {
  const review = await Review.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
    runValidators: true,
  });

  if (!review) throw new ApiError(404, "Review not found or not yours");

  await updateProductRating(review.productId);

  return review;
};

/* ----------------------------------------
 ⭐ Delete Review
---------------------------------------- */
export const deleteReview = async (userId, id) => {
  const review = await Review.findOneAndDelete({ _id: id, userId });

  if (!review) throw new ApiError(404, "Review not found or not yours");

  await updateProductRating(review.productId);

  return review;
};

/* ----------------------------------------
 ⭐ Get Reviews for Product
---------------------------------------- */
export const getProductReviews = async (productId) => {
  return Review.find({ productId })
    .populate("userId", "name email")
    .sort({ createdAt: -1 });
};
