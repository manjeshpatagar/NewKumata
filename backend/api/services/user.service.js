import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

/* --------------------------------------------
🔍 Find user by email (Login Purpose)
--------------------------------------------- */
export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

/* --------------------------------------------
📝 Register user
--------------------------------------------- */
export const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already registered");

  const user = await User.create(data);
  return user;
};

/* --------------------------------------------
👥 Get all users (Admin)
--------------------------------------------- */
export const getAllUsers = async () => {
  return User.find().select("-password");
};

/* --------------------------------------------
👤 Get single user by ID (Normal User)
--------------------------------------------- */
export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

/* --------------------------------------------
🚫 Deactivate user (Admin)
--------------------------------------------- */
export const deactivateUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  user.isActive = false;
  await user.save();

  return user;
};

export const updateUserById = async (id, updates) => {
  const allowedFields = ["name", "phoneNumber", "bio", "avatarUrl", "password"];

  const dataToUpdate = {};
  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      dataToUpdate[field] = updates[field];
    }
  });

  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");

  Object.assign(user, dataToUpdate);

  await user.save(); // triggers password hashing

  return User.findById(id).select("-password"); // return updated user
};
