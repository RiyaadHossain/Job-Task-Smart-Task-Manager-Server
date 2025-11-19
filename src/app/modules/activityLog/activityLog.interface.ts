import type { Types } from "mongoose";

export interface IActivityLog {
  task: Types.ObjectId;
  from?: Types.ObjectId;
  to?: Types.ObjectId;
  timestamp?: Date;
}

