import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: { type: String },
    bio: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

/* -----------------------------
 🔒 Password hashing before save
----------------------------- */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* -----------------------------
 🧠 Compare passwords
----------------------------- */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
export const User = mongoose.model("User", userSchema);
