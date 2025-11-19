
import { TaskService } from "./task.services.js";
import catchAsync from "@/shared/catch-async.js";
import sendResponse from "@/shared/send-response.js";
import type { Request, Response } from "express";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const data = await TaskService.createTask(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created",
    data,
  });
});

const getTasks = catchAsync(async (_req: Request, res: Response) => {
  const data = await TaskService.getTasks();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks fetched",
    data,
  });
});

const getTask = catchAsync(async (req: Request, res: Response) => {
    const taskId = req.params["id"] as string;
  const data = await TaskService.getTaskById(taskId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task fetched",
    data,
  });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = req.params["id"] as string;
  const data = await TaskService.updateTask(taskId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task updated",
    data,
  });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const taskId = req.params["id"] as string;
  const data = await TaskService.deleteTask(taskId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task deleted",
    data,
  });
});

const reassignTask = catchAsync(async (_req: Request, res: Response) => {
  const data = await TaskService.reassignTask();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task reassignment processed",
    data,
  });
});

export const TaskController = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  reassignTask
};
