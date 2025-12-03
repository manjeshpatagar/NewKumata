import express from "express";
import {
  createOrApproveAd,
  updateOrApproveAd,
  deleteAd,
  getAds,
} from "../controllers/advertisement.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { useUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

const uploadAdFiles = useUpload({
  folder: "advertisements",
  fields: [{ name: "images", maxCount: 5, type: "image" }],
});

router.get("/", protect, getAds); // all for admin, active only for user
router.post("/", protect, uploadAdFiles, createOrApproveAd); // create or admin auto-create
router.put("/:id", protect, uploadAdFiles, updateOrApproveAd); // update or approve
router.delete("/:id", protect, deleteAd); // admin only

export default router;
