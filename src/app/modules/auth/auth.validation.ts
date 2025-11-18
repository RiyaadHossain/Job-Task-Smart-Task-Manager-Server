import z from "zod/v3";

const registerSchema = z.object({
  body: z.object({
    name: z.string({ message: "Invalid email address" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  }),
});

export const AuthValidation = {
  registerSchema,
  loginSchema,
};
