import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

export const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, "Email already registered");
  const user = await User.create(data);
  return user;
};

export const getAllUsers = async () => {
  return User.find().select("-password");
};

export const deactivateUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  user.isActive = false;
  await user.save();
  return user;
};
