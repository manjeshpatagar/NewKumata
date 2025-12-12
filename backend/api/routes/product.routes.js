import express from "express";
import {
  addProduct,
  getProducts,
  getSingleProduct,
  editProduct,
  removeProduct,
} from "../controllers/product.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { useUpload } from "../middleware/upload.middleware.js";

const uploadProducts = useUpload({
  fields: [
    { name: "images", maxCount: 10, type: "image" },
    { name: "thumbnail", maxCount: 1, type: "image" },
  ],
});

const router = express.Router();

// Public
router.get("/", protect, getProducts);
router.get("/:id", protect, getSingleProduct);

// Admin
router.post("/", protect, adminOnly, uploadProducts, addProduct);
router.patch("/:id", protect, adminOnly, uploadProducts, editProduct);
router.delete("/:id", protect, adminOnly, removeProduct);

export default router;
