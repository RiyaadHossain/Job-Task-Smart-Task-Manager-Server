import z from "zod/v3";
import { RoleEnum } from "@enums/role.enum.js";

const createMemberSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    role: z.enum(Object.values(RoleEnum) as [string, ...string[]]),
    capacity: z.number().min(1).max(5),
    team: z.string().optional(),
  }),
});

const updateMemberSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.enum(Object.values(RoleEnum) as [string, ...string[]]).optional(),
    capacity: z.number().min(1).max(5).optional(),
    team: z.string().optional(),
    currentTasks: z.number().optional(),
  }),
});

export const MemberValidation = { createMemberSchema, updateMemberSchema };
