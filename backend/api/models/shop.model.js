// models/Shop.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    images: [String],
    shopName: { type: String, required: true },
    description: { type: String },
    about: { type: String },
    address: { type: String, required: true },
    contact: {
      phone: { type: String },
      ownerName: { type: String },
      email: { type: String },
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    thumbnail: { type: String },
    website: { type: String },
    openingHours: {
      open: String,
      close: String,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    badges: {
      type: String,
      enum: ["upcoming", "popular", "featured", "new", "trending", "exclusive"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
