import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFile } from "../middleware/upload.middleware.js";
import { generateToken } from "../utils/generateToken.js";
import {
  findUserByEmail,
  registerUser,
  getAllUsers,
  deactivateUser,
  getUserById,
  updateUserById,
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
  if (req.user.role === "admin") {
    const users = await getAllUsers();
    return res.status(200).json({
      success: true,
      isAdmin: true,
      count: users.length,
      data: users,
    });
  }
  // Normal user → only their own data
  const user = await getUserById(req.user._id);

  return res.status(200).json({
    success: true,
    isAdmin: false,
    data: user,
  });
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
 👤 Update Profile (with image replace)
----------------------------- */
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch existing user details
  const user = await getUserById(userId);

  let image = user.avatarUrl;
  const newImage = req.files?.image?.[0]?.url; // from IMGBB uploader

  // Replace old image if new image uploaded
  if (newImage) {
    if (user.avatarUrl) {
      await deleteFile(user.avatarUrl); // delete from IMGBB
    }
    image = newImage;
  }

  // Prepare fields to update
  const updates = {
    ...req.body,
    avatarUrl: image,
  };

  // Update user with service (handles password hashing)
  const updatedUser = await updateUserById(userId, updates);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});
