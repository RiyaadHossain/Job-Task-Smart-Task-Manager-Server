import { TeamService } from "@modules/team/team.services.js";
import catchAsync from "@/shared/catch-async.js";
import sendResponse from "@/shared/send-response.js";
import type { Request, Response } from "express";

const createTeam = catchAsync(async (req: Request, res: Response) => {
  const data = await TeamService.createTeam(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Team created",
    data,
  });
});

const getTeams = catchAsync(async (_req: Request, res: Response) => {
  const data = await TeamService.getTeams();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Teams fetched",
    data,
  });
});

const getTeam = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params["id"] as string;
  const data = await TeamService.getTeamById(teamId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team fetched",
    data,
  });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params["id"] as string;
  const data = await TeamService.updateTeam(teamId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team updated",
    data,
  });
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
  const teamId = req.params["id"] as string;
  const data = await TeamService.deleteTeam(teamId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Team deleted",
    data,
  });
});

export const TeamController = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
