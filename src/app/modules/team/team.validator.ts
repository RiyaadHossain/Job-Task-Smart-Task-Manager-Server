import z from "zod/v3";
import { DepartmentEnum } from "@enums/department.enum.js";

const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    department: z.enum(Object.values(DepartmentEnum) as [string, ...string[]]),
  }),
});

const updateTeamSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    department: z
      .enum(Object.values(DepartmentEnum) as [string, ...string[]])
      .optional(),
  }),
});

export const TeamValidation = {
  createTeamSchema,
  updateTeamSchema,
};
