import { AuthService } from "@/app/modules/auth/auth.services.js";
import catchAsync from "@/shared/catch-async.js";
import sendResponse from "@/shared/send-response.js";
import type { Request, Response } from "express";

const register = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await AuthService.register(payload);
  const responseData = {
    statusCode: 201,
    success: true,

    message: "User registered successfully",
    data,
  };
  sendResponse(res, responseData);
});

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await AuthService.login(payload);

  const responseData = {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data,
  };
  sendResponse(res, responseData);
});

export const AuthController = {
  login,register
};
