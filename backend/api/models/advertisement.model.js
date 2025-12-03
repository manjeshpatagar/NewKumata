import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    adtype: { type: String },
    description: { type: String },
    address: { type: String },
    location: { type: String },
    price: { type: Number },
    image: [String],
    video: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "active"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["featured", "sponsored", "normal"],
      default: "normal",
    },
    durationDays: { type: Number, required: true }, // how long ad is visible
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "not_required"],
      default: "pending",
    },
    merchantTransactionId: { type: String },
    activatedAt: { type: Date }, // <— Track activation date
  },
  { timestamps: true }
);

export const Advertisement = mongoose.model(
  "Advertisement",
  advertisementSchema
);
