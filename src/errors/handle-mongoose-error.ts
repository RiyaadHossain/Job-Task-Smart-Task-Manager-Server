// @ts-nocheck
import type { IGenericErrorMessage } from "@/interfaces/error.js";
import mongoose from "mongoose";

export const handleMongooseError = (
  error: mongoose.Error
): IGenericErrResponse => {
  let message = "An error occurred";
  let errors: IGenericErrorMessage[] = [];

  if (error instanceof mongoose.Error.ValidationError) {
    message = "Validation Error";
    errors = Object.entries(error.errors).map(([path, err]) => ({
      path,
      message: err.message,
    }));
  } else if (error instanceof mongoose.Error.CastError) {
    message = `Invalid value for ${error.path}: ${error.value}`;
    errors.push({ path: error.path, message: error.message });
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
    message = `Document not found for ${error.modelName} with ID ${error.value}`;
    errors.push({ path: error.path, message: error.message });
  } else {
    message = "An unexpected error occurred";
    errors.push({
      path: error.path || "unknown",
      message: error.message,
    });
  }

  return { message, errors };
};
