import type { ITask } from "./task.interface.js";
import { Schema, model } from "mongoose";
import { TaskPriorityEnum, TaskStatusEnum } from "@enums/task.enum.js";

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    assignee: { type: Schema.Types.ObjectId, ref: "Member", default: null },
    priority: {
      type: String,
      enum: Object.values(TaskPriorityEnum),
      default: TaskPriorityEnum.Medium,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatusEnum),
      default: TaskStatusEnum.Pending,
    },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
