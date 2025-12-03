import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
};
