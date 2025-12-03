// models/Shop.model.js
import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    address: { type: String, required: true },
    phone: { type: String },
    thumbnail: { type: String },
    website: { type: String },
    ownerName: { type: String },
    description: { type: String },
    location: {
      placeName: String,
      lat: Number,
      lng: Number,
    },
    openingHours: {
      open: String,
      close: String,
    },
    images: [String],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Shop", shopSchema);
