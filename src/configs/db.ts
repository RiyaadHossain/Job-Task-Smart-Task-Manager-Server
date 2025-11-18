import mongoose from "mongoose";
import dotenv from "./index.js";
import { logger } from "@/utils/logger.js";

export async function connectDB() {
  if (!dotenv.MONGO_URI) 
    throw new Error("MONGO_URI is not defined in environment");
  

  try {
    await mongoose.connect(dotenv.MONGO_URI);
    logger.info("🧮 MongoDB connected successfully");
  } catch (err) {
    logger.error("💥 MongoDB connection error:", err);
    process.exit(1);
  }
}
