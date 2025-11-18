
import validateRequest from "@/app/middlewares/validate-req.js";
import { AuthController } from "@/app/modules/auth/auth.controllers.js";
import { AuthValidation } from "@/app/modules/auth/auth.validation.js";
import { Router } from "express";

const router = Router();

router.get(
  "/register",
  validateRequest(AuthValidation.registerSchema),
  AuthController.register
);

router.get(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  AuthController.login
);

export const AuthRoutes = router;
