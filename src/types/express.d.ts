import type { AuthUser } from "@/interfaces/jwt.ts";
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
