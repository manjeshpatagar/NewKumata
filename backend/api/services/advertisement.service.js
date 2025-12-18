import { Advertisement } from "../models/advertisement.model.js";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
 📌 Create Advertisement
----------------------------- */
export const createAdvertisement = async (data) => {
  const category = await Category.findById(data.category);
  if (!category) throw new ApiError(404, "Category not found");

  if (category.type !== "advertisement") {
    throw new ApiError(400, "This category is not an advertisement type");
  }

  data.activatedAt = new Date(); // optional auto-activation timestamp

  return Advertisement.create(data);
};

/* -----------------------------
 📌 Get All Advertisements
----------------------------- */
export const getAllAdvertisements = async () => {
  return Advertisement.find().populate("category").sort({ createdAt: -1 });
};

/* -----------------------------
 📌 Get Single Advertisement
----------------------------- */
export const getAdvertisementById = async (id) => {
  const ad = await Advertisement.findById(id).populate("category");
  if (!ad) throw new ApiError(404, "Advertisement not found");
  return ad;
};

/* -----------------------------
 📌 Update Advertisement
----------------------------- */
export const updateAdvertisement = async (id, data) => {
  const ad = await Advertisement.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!ad) throw new ApiError(404, "Advertisement not found");
  return ad;
};

/* -----------------------------
 🗑️ Delete Advertisement
----------------------------- */
export const deleteAdvertisement = async (id) => {
  const ad = await Advertisement.findByIdAndDelete(id);
  if (!ad) throw new ApiError(404, "Advertisement not found");
  return ad;
};
