import type { IAPIError, IGenericErrorMessage } from "@interfaces/error.js";
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod/v3";
import httpStatus from "http-status";
import { MongooseError } from "mongoose";
import handleZodError from "@/errors/handle-zod-error.js";
import { handleMongooseError } from "@/errors/handle-mongoose-error.js";
import { logger } from "@/utils/logger.js";

const errorHandler = (
  err: IAPIError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error("❌ Error: ", err);

  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";
  let errorMessages: IGenericErrorMessage[] = [];

  if (err instanceof ZodError) {
    const simplifiedErrors = handleZodError(err);
    message = simplifiedErrors.message;
    errorMessages = simplifiedErrors.errors;
  }

  if (err instanceof MongooseError) {
    const simplifiedErrors = handleMongooseError(err);
    message = simplifiedErrors.message;
    errorMessages = simplifiedErrors.errors;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: errorMessages,
  });
};
export default errorHandler;
