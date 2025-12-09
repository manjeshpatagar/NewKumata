import express from "express";
import {
  addAdvertisement,
  getAdvertisements,
  getSingleAdvertisement,
  editAdvertisement,
  removeAdvertisement,
} from "../controllers/advertisement.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { useUpload } from "../middleware/upload.middleware.js";

const uploadAds = useUpload({
  folder: "advertisements",
  fields: [
    { name: "images", maxCount: 10, type: "image" },
    { name: "video", maxCount: 1, type: "video" },
  ],
});

const router = express.Router();

// Public
router.get("/", protect, getAdvertisements);
router.get("/:id", protect, getSingleAdvertisement);

// Admin Only
router.post("/", protect, adminOnly, uploadAds, addAdvertisement);
router.patch("/:id", protect, adminOnly, uploadAds, editAdvertisement);
router.delete("/:id", protect, adminOnly, removeAdvertisement);

export default router;
