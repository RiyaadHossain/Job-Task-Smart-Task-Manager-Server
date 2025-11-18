import mongoose from "mongoose";
import { Server } from "http";
import { logger } from "@/utils/logger.js";

let isShuttingDown = false;

export async function gracefulShutdown(server: Server, signal: string) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info(`📴 Received ${signal}. Shutting down gracefully...`);

  try {
    // 1️⃣ Stop accepting new connections
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });

    // 2️⃣ Close DB connections
    await mongoose.connection.close();
    logger.info("✅ MongoDB connection closed.");

    // 3️⃣ Exit cleanly
    process.exit(0);
  } catch (err) {
    logger.error("💥 Error during shutdown:", err);
    process.exit(1);
  }
}
