import configs from "@/configs/index.js";
import { NODE_ENV_ENUM } from "@/enums/env.js";
import DailyRotateFile from "winston-daily-rotate-file";
import winston from "winston";

// Define your log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Choose different colors for each level (for dev console)
const logColors = {
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};

// Apply colors
winston.addColors(logColors);

// Determine environment
const isProduction = configs.NODE_ENV === NODE_ENV_ENUM.PRODUCTION;

// Define format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winston.format.colorize({ all: !isProduction }),
  winston.format.printf(
    ({ timestamp, level, message, stack }) =>
      `${timestamp} [${level}]: ${stack || message}`
  )
);

// File format (without colors)
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message, stack }) =>
      `${timestamp} [${level}]: ${stack || message}`
  )
);

// Create logger instance
export const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  levels: logLevels,
  format: fileFormat,
  transports: [
    // 🖥️ Console (development)
    new winston.transports.Console({
      format: logFormat,
    }),

    // 🧾 Rotating error logs
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      level: "error",
      zippedArchive: true, 
      maxSize: "20m",
      maxFiles: "14d",
    }),

    // 📘 Rotating combined logs (info, warn, etc.)
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ], 

  // ⚠️ Handle uncaught exceptions
  exceptionHandlers: [
    new DailyRotateFile({
      filename: "logs/exceptions-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],

  // 🚨 Handle unhandled promise rejections
  rejectionHandlers: [
    new DailyRotateFile({
      filename: "logs/rejections-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "30d",
    }),
  ],
});

// Optional: Disable console logs in production
if (configs.NODE_ENV === NODE_ENV_ENUM.PRODUCTION)
  logger.remove(new winston.transports.Console());
