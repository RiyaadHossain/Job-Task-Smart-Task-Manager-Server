import { ActivityLogService } from "@modules/activityLog/activityLog.services.js";
import catchAsync from "@/shared/catch-async.js";
import sendResponse from "@/shared/send-response.js";
import type { Request, Response } from "express";

const createActivity = catchAsync(async (req: Request, res: Response) => {
  const data = await ActivityLogService.createActivity(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Activity created", data });
});

const getActivities = catchAsync(async (_req: Request, res: Response) => {
  const data = await ActivityLogService.getActivities();
  sendResponse(res, { statusCode: 200, success: true, message: "Activities fetched", data });
});

const getActivity = catchAsync(async (req: Request, res: Response) => {
  const activityId = req.params["id"] as string;
  const data = await ActivityLogService.getActivityById(activityId);
  sendResponse(res, { statusCode: 200, success: true, message: "Activity fetched", data });
});

export const ActivityLogController = { createActivity, getActivities, getActivity };
