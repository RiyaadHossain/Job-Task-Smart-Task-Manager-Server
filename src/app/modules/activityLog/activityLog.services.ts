import { ActivityLog } from "@modules/activityLog/activityLog.model.js";
import type { IActivityLog } from "./activityLog.interface.js";
import APIError from "@/errors/APIError.js";
import httpStatus from "http-status";

const createActivity = async (payload: IActivityLog) => {
  const created = await ActivityLog.create(payload as any);
  return created.toObject ? created.toObject() : created;
};

const getActivities = async () => ActivityLog.find().lean();

const getActivityById = async (id: string) => {
  const a = await ActivityLog.findById(id).lean();
  if (!a) throw new APIError("Activity not found", httpStatus.NOT_FOUND);
  return a;
};

export const ActivityLogService = { createActivity, getActivities, getActivityById };
