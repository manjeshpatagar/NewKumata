import Shop from "../models/shop.model.js";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";

/* -----------------------------
📦 Create a new Shop
----------------------------- */
export const createShop = async (data) => {
  const category = await Category.findById(data.category);
  if (!category) throw new ApiError(404, "Category not found");

  const shop = await Shop.create(data);
  return shop.populate("category", "name");
};

/* -----------------------------
📋 Get all shops
----------------------------- */
export const getAllShops = async (filters = {}) => {
  const query = {};

  if (filters.category) query.category = filters.category;
  if (filters.status) query.status = filters.status;
  if (filters.search) {
    query.shopName = { $regex: filters.search, $options: "i" };
  }

  return Shop.find(query).populate("category", "name").sort({ createdAt: -1 });
};

/* -----------------------------
🔍 Get single shop
----------------------------- */
export const getShopById = async (id) => {
  const shop = await Shop.findById(id).populate("category", "name");
  if (!shop) throw new ApiError(404, "Shop not found");
  return shop;
};

/* -----------------------------
✏️ Update shop
----------------------------- */
export const updateShop = async (id, data) => {
  const shop = await Shop.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("category", "name");
  if (!shop) throw new ApiError(404, "Shop not found");
  return shop;
};

/* -----------------------------
🗑️ Delete shop
----------------------------- */
export const deleteShop = async (id) => {
  const shop = await Shop.findById(id);
  if (!shop) throw new ApiError(404, "Shop not found");

  await shop.deleteOne();
  return true;
};
