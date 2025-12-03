import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const generateToken = (id) =>
  jwt.sign({ id }, config.jwtSecret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1w",
  });
