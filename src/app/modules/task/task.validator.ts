import z from "zod/v3";
import { TaskPriorityEnum, TaskStatusEnum } from "@enums/task.enum.js";

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    assignee: z.string().nullable().optional(),
    priority: z
      .enum(Object.values(TaskPriorityEnum) as [string, ...string[]])
      .optional(),
    status: z
      .enum(Object.values(TaskStatusEnum) as [string, ...string[]])
      .optional(),
    project: z.string().min(1),
  }),
});

const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    assignee: z.string().nullable().optional(),
    priority: z
      .enum(Object.values(TaskPriorityEnum) as [string, ...string[]])
      .optional(),
    status: z
      .enum(Object.values(TaskStatusEnum) as [string, ...string[]])
      .optional(),
    project: z.string().optional(),
  }),
});

export const TaskValidation = { createTaskSchema, updateTaskSchema };
