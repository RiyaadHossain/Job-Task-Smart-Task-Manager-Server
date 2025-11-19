import z from "zod/v3";

const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    team: z.string().min(1),
  }),
});

const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    team: z.string().optional(),
  }),
});

export const ProjectValidation = { createProjectSchema, updateProjectSchema };
