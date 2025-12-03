import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { config } from "../config/index.js";
/**
 * Factory function for reusable authentication middleware
 * @param {Object} options
 * @param {mongoose.Model} options.userModel - The user model used to verify JWTs
 * @param {string} options.jwtSecret - Secret key for signing/verifying tokens
 */
export const createAuthMiddleware = ({ userModel, jwtSecret }) => {
  // Protect route (auth check)
  const protect = asyncHandler(async (req, res, next) => {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new ApiError(401, "Unauthorized access. No token provided.");
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      const user = await userModel.findById(decoded.id);

      if (!user) throw new ApiError(401, "Invalid token. User not found.");
      if (!user.isActive)
        throw new ApiError(403, "Your account is inactive. Contact support.");

      if (user.passwordChangedAt) {
        const changedAt = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
        if (changedAt > decoded.iat)
          throw new ApiError(
            401,
            "Password changed recently. Please log in again."
          );
      }

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid or expired token.");
    }
  });

  // Role-based access control
  const restrictTo =
    (...roles) =>
    (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new ApiError(403, "Access denied. Insufficient permissions.");
      }
      next();
    };

  return { protect, restrictTo };
};

export const { protect, restrictTo } = createAuthMiddleware({
  userModel: User,
  jwtSecret: config.jwtSecret,
});

export const adminOnly = [protect, restrictTo("admin")];
export const employeeOnly = [protect, restrictTo("employee")];
export const customerOnly = [protect, restrictTo("customer")];
