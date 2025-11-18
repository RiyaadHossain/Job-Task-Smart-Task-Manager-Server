import { logger } from "@/utils/logger.js";
import type { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, _next: NextFunction) => {
  const errorMessage = `API Not Found - ${req.originalUrl}`;

  // Log the missing endpoint
  logger.warn(errorMessage);

  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "API Not Found",
    path: req.originalUrl,
  });
};
