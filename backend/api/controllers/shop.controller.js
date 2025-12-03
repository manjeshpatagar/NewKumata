import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} from "../services/shop.service.js";
import { deleteFile, replaceFile } from "../middleware/upload.middleware.js";

/* -----------------------------
📦 Add new shop
----------------------------- */
export const addShop = asyncHandler(async (req, res) => {
  const {
    shopName,
    category,
    address,
    phone,
    website,
    ownerName,
    description,
    location,
    openingHours,
  } = req.body;

  // ✅ Handle uploaded image URLs from IMGBB middleware
  const images = req.files?.images?.map((img) => img.url) || [];
  const thumbnail = images[0] || null; // first image can be the thumbnail

  const shop = await createShop({
    shopName,
    category,
    address,
    phone,
    website,
    ownerName,
    description,
    location,
    openingHours,
    images,
    thumbnail,
  });

  res.status(201).json({
    success: true,
    message: "Shop added successfully",
    data: shop,
  });
});

/* -----------------------------
📋 Get all shops
----------------------------- */
export const getShops = asyncHandler(async (req, res) => {
  const filters = {
    category: req.query.category,
    status: req.query.status,
    search: req.query.search,
  };
  const shops = await getAllShops(filters);
  res.status(200).json({ success: true, count: shops.length, data: shops });
});

/* -----------------------------
🔍 Get single shop
----------------------------- */
export const getShop = asyncHandler(async (req, res) => {
  const shop = await getShopById(req.params.id);
  res.status(200).json({ success: true, data: shop });
});

/* -----------------------------
✏️ Update shop (with new images)
----------------------------- */
export const editShop = asyncHandler(async (req, res) => {
  const shop = await getShopById(req.params.id);

  // If new images uploaded, delete old ones first
  let updatedImages = shop.images;
  if (req.files?.images?.length) {
    for (const oldImage of shop.images) {
      await deleteFile(oldImage);
    }
    updatedImages = req.files.images.map((img) => img.url);
  }

  const updatedShop = await updateShop(req.params.id, {
    ...req.body,
    images: updatedImages,
    thumbnail: updatedImages[0] || shop.thumbnail,
  });

  res.status(200).json({
    success: true,
    message: "Shop updated successfully",
    data: updatedShop,
  });
});

/* -----------------------------
🗑️ Delete shop (auto-delete IMGBB images)
----------------------------- */
export const removeShop = asyncHandler(async (req, res) => {
  const shop = await getShopById(req.params.id);

  // Delete all associated images from IMGBB
  for (const img of shop.images) {
    await deleteFile(img);
  }

  await deleteShop(req.params.id);

  res.status(200).json({
    success: true,
    message: "Shop deleted successfully",
  });
});
