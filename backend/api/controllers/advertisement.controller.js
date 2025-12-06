import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createAdvertisement,
  getAllAdvertisements,
  getAdvertisementById,
  updateAdvertisement,
  deleteAdvertisement,
} from "../services/advertisement.service.js";

import { deleteFile } from "../middleware/upload.middleware.js";
import { Advertisement } from "../models/advertisement.model.js";

/* -----------------------------
 📌 Create Advertisement
----------------------------- */
export const addAdvertisement = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    price,
    description,
    address,
    location,
    badges,
    addetails,
    contactinfo,
  } = req.body;

  const images = req.files?.images?.map((f) => f.url) || [];
  const video = req.files?.video?.[0]?.url || null;

  const ad = await createAdvertisement({
    title,
    category,
    price,
    description,
    address,
    location,
    badges,
    addetails,
    contactinfo,
    images,
    video,
  });

  res.status(201).json({
    success: true,
    message: "Advertisement created successfully",
    data: ad,
  });
});

/* -----------------------------
 📌 Get All Ads
----------------------------- */
export const getAdvertisements = asyncHandler(async (req, res) => {
  const ads = await getAllAdvertisements();
  res.status(200).json({ success: true, count: ads.length, data: ads });
});

/* -----------------------------
 📌 Get Single Ad
----------------------------- */
export const getSingleAdvertisement = asyncHandler(async (req, res) => {
  const ad = await getAdvertisementById(req.params.id);
  res.status(200).json({ success: true, data: ad });
});

/* -----------------------------
 ✏️ Update Advertisement
----------------------------- */
export const editAdvertisement = asyncHandler(async (req, res) => {
  const ad = await Advertisement.findById(req.params.id);
  if (!ad) throw new ApiError(404, "Advertisement not found");

  let images = ad.images;
  let video = ad.video;

  const newImages = req.files?.images?.map((f) => f.url);
  const newVideo = req.files?.video?.[0]?.url;

  if (newImages?.length > 0) {
    for (const img of ad.images) await deleteFile(img);
    images = newImages;
  }

  if (newVideo) {
    if (ad.video) await deleteFile(ad.video);
    video = newVideo;
  }

  const updated = await updateAdvertisement(req.params.id, {
    ...req.body,
    images,
    video,
  });

  res.status(200).json({
    success: true,
    message: "Advertisement updated successfully",
    data: updated,
  });
});

/* -----------------------------
 🗑️ Delete Advertisement
----------------------------- */
export const removeAdvertisement = asyncHandler(async (req, res) => {
  const ad = await Advertisement.findById(req.params.id);
  if (!ad) throw new ApiError(404, "Advertisement not found");

  for (const img of ad.images) await deleteFile(img);
  if (ad.video) await deleteFile(ad.video);

  await deleteAdvertisement(req.params.id);

  res.status(200).json({
    success: true,
    message: "Advertisement deleted successfully",
  });
});
