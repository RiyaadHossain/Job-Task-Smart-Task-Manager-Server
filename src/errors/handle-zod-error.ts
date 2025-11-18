import type {
  IGenericErrorMessage,
  IGenericErrResponse,
} from "@/interfaces/error.js";
import type { ZodError } from "zod/v3";

const handleZodError = (error: ZodError): IGenericErrResponse => {
  const message = "Zod Validation Error";
  const errors: IGenericErrorMessage[] = error.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1] as string,
      message: issue?.message,
    };
  });

  return {
    message,
    errors,
  };
};

export default handleZodError;
