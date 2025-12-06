import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    image: [String],
    video: { type: String },
    price: { type: Number },
    description: { type: String },
    address: { type: String },
    location: { type: String },
    addetails: {
      detailTitle: { type: String },
      detailInfo1: { type: String },
      detailInfo2: { type: String },
      detailInfo3: { type: String },
      detailInfo4: { type: String },
    },
    contactinfo: {
      phone: { type: String },
      email: { type: String },
      whatsapp: { type: String },
    },
    badges: {
      type: String,
      enum: ["upcoming", "popular", "featured", "new", "trending", "exclusive"],
    },
    activatedAt: { type: Date }, // <— Track activation date
  },
  { timestamps: true }
);

export const Advertisement = mongoose.model(
  "Advertisement",
  advertisementSchema
);
