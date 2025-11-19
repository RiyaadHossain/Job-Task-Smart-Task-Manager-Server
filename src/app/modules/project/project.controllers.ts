import { ProjectService } from "./project.services.js";
import catchAsync from "@/shared/catch-async.js";
import sendResponse from "@/shared/send-response.js";
import type { Request, Response } from "express";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const data = await ProjectService.createProject(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created",
    data,
  });
});

const getProjects = catchAsync(async (_req: Request, res: Response) => {
  const data = await ProjectService.getProjects();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects fetched",
    data,
  });
});

const getProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params["id"] as string;
  const data = await ProjectService.getProjectById(projectId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project fetched",
    data,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params["id"] as string;
  const data = await ProjectService.updateProject(projectId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated",
    data,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params["id"] as string;
  const data = await ProjectService.deleteProject(projectId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted",
    data,
  });
});

export const ProjectController = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
