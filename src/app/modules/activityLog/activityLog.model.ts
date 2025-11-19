import type { IActivityLog } from "./activityLog.interface.js";
import { Schema, model } from "mongoose";

const activityLogSchema = new Schema<IActivityLog>(
  {
    task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    from: { type: Schema.Types.ObjectId, ref: "Member", required: false },
    to: { type: Schema.Types.ObjectId, ref: "Member", required: false },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ActivityLog = model<IActivityLog>(
  "ActivityLog",
  activityLogSchema
);
