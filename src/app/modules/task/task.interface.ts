import type { Types } from "mongoose";
import type { TaskPriorityEnum, TaskStatusEnum } from "@enums/task.enum.js";

export interface ITask {
  title: string;
  description?: string;
  assignee?: Types.ObjectId | null;
  priority: TaskPriorityEnum | string;
  status: TaskStatusEnum | string;
  project: Types.ObjectId;
  team: Types.ObjectId;
}
