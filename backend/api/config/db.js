import mongoose, { Mongoose } from "mongoose";
import { config } from "./index.js";

export const connectDB = async () => {
  try {
    console.log(config.dbUri);
    await mongoose.connect(config.dbUri);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
