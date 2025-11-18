import configs from "@/configs/index.js";
import APIError from "@/errors/APIError.js";
import { jwtHelpers } from "@/helpers/jwt-helper.js";
import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import type { Secret } from "jsonwebtoken";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token)
        throw new APIError("You are not authorized", httpStatus.UNAUTHORIZED);

      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(
        token,
        configs.JWT_SECRET as Secret
      );

      req.user = verifiedUser;

      // check user role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser["role"]))
        throw new APIError("Forbidden", httpStatus.FORBIDDEN);

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
