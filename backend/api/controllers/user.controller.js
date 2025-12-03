import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import {
  findUserByEmail,
  registerUser,
  getAllUsers,
  deactivateUser,
} from "../services/user.service.js";

/* -----------------------------
 📝 Register User
----------------------------- */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber, role } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  const user = await registerUser({ name, email, password, phoneNumber, role });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* -----------------------------
 🔐 Login
----------------------------- */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new ApiError(400, "Email and password are required");

  const user = await findUserByEmail(email);
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

/* -----------------------------
 👥 Get All Users (Admin)
----------------------------- */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json({ success: true, data: users });
});

/* -----------------------------
 🚫 Deactivate User (Admin)
----------------------------- */
export const deactivate = asyncHandler(async (req, res) => {
  const user = await deactivateUser(req.params.id);
  res.status(200).json({
    success: true,
    message: "User deactivated successfully",
    data: user,
  });
});

/* -----------------------------
 👤 Profile (Self)
----------------------------- */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json({ success: true, data: user });
});
