import type { AuthUser } from "@/interfaces/jwt.js";
import type { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  //@ts-ignore
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): AuthUser => {
  return jwt.verify(token, secret) as AuthUser;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
