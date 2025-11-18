import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod/v3";

// Middleware to validate request body against a Zod schema
const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      next(err);
    }
  };

export default validateRequest;
