import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    merchantTransactionId: { type: String, required: true, unique: true },
    merchantUserId: { type: String },
    amount: { type: Number, required: true }, // in rupees
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentType: { type: String }, // you can customize per project
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "paymentTypeRef",
    },
    paymentTypeRef: { type: String }, // dynamic reference (e.g., "Advertisement")
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rawResponse: { type: Object },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
