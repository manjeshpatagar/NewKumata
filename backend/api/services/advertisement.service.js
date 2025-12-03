import { Advertisement } from "../models/advertisement.model.js";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";

export const createAdvertisement = async (data) => {
  if (data.category) {
    const category = await Category.findById(data.category);
    if (!category) throw new ApiError(404, "Category not found");
  }
  return Advertisement.create(data);
};

export const getAdvertisements = async (filter = {}, role = "user") => {
  const query = role === "admin" ? {} : { status: "active" };
  Object.assign(query, filter);

  return Advertisement.find(query)
    .populate("category", "name")
    .populate("user", "name email")
    .sort({ createdAt: -1 });
};

export const updateAdvertisement = async (id, data, user, isAdmin = false) => {
  const ad = await Advertisement.findById(id);
  if (!ad) throw new ApiError(404, "Ad not found");

  // Users can only edit their own paid, active ads
  if (!isAdmin) {
    if (ad.user.toString() !== user._id.toString())
      throw new ApiError(403, "Unauthorized");
    if (ad.paymentStatus !== "paid")
      throw new ApiError(403, "Payment required to edit ad");
    if (data.durationDays)
      throw new ApiError(403, "Cannot change duration after activation");
  }

  Object.assign(ad, data);
  await ad.save();
  return ad.populate("category", "name");
};

export const deleteAdvertisement = async (id) => {
  const ad = await Advertisement.findById(id);
  if (!ad) throw new ApiError(404, "Advertisement not found");
  await ad.deleteOne();
  return true;
};
