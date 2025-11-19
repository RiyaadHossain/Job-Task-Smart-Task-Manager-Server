import z from "zod/v3";

const createActivitySchema = z.object({
  body: z.object({
    task: z.string().min(1),
    from: z.string().optional(),
    to: z.string().optional(),
    timestamp: z.string().optional(),
  }),
});

export const ActivityLogValidation = { createActivitySchema };
