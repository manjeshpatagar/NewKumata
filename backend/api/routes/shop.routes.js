import express from "express";
import {
  addShop,
  getShops,
  getShop,
  editShop,
  removeShop,
} from "../controllers/shop.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { useUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

// 🖼️ IMGBB upload middleware for shop images
const uploadShopImages = useUpload({
  folder: "shops",
  fields: [{ name: "images", maxCount: 5, type: "image" }],
});

// 🌍 Public routes
router.get("/", getShops);
router.get("/:id", getShop);

// 🔒 Admin-protected routes
router.post("/", adminOnly, uploadShopImages, addShop);
router.patch("/:id", adminOnly, uploadShopImages, editShop);
router.delete("/:id", adminOnly, removeShop);

export default router;
