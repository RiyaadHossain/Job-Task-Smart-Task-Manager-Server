import type { LoginPayload } from "@modules/auth/auth.interface.js";
import { User } from "@modules/user/user.model.js";
import APIError from "@/errors/APIError.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import configs from "@/configs/index.js";
import { jwtHelpers } from "@/helpers/jwt-helper.js";

const register = async (payload: any) => {
  const { name, email, password } = payload;

  const existing = await User.findOne({ email });
  if (existing) throw new APIError("User already exists", httpStatus.CONFLICT);

  const hashedPassword = await bcrypt.hash(password, 10);

  const created = await User.create({ name, email, password: hashedPassword });

  const { password: pwd, ...userObj } = created.toObject();
  return userObj;
};

const login = async (payload: LoginPayload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).lean();
  if (!user) throw new APIError("Invalid credentials", httpStatus.UNAUTHORIZED);

  const matched = await bcrypt.compare(password, (user as any).password);
  if (!matched)
    throw new APIError("Invalid credentials", httpStatus.UNAUTHORIZED);

  const accessToken = jwtHelpers.createToken(
    { email: user.email },
    configs.JWT_SECRET as any,
    configs.JWT_EXPIRES_IN
  );

  const { password: pwd, ...safeUser } = user;

  return {
    user: safeUser,
    accessToken,
  };
};

export const AuthService = {
  login,
  register,
};
