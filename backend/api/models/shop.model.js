import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    images: [String], // multiple images
    thumbnail: { type: String },

    shopName: { type: String, required: true },
    description: { type: String },
    about: { type: String },

    address: { type: String, required: true },

    contact: {
      phone: { type: String },
      ownerName: { type: String },
      email: { type: String },
    },

    // FIXED: use categoryId & subCategoryId
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },

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

export const Product = mongoose.model("Product", productSchema);
