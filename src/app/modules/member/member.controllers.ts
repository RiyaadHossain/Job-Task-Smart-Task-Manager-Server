import { MemberService } from "./member.services.js";
import catchAsync from "@/shared/catch-async.js";
import sendResponse from "@/shared/send-response.js";
import type { Request, Response } from "express";

const createMember = catchAsync(async (req: Request, res: Response) => {
  const data = await MemberService.createMember(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Member created",
    data,
  });
});

const getMembers = catchAsync(async (_req: Request, res: Response) => {
  const data = await MemberService.getMembers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Members fetched",
    data,
  });
});

const getMember = catchAsync(async (req: Request, res: Response) => {
  const memberId = req.params["id"] as string;
  const data = await MemberService.getMemberById(memberId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member fetched",
    data,
  });
});

const updateMember = catchAsync(async (req: Request, res: Response) => {
  const memberId = req.params["id"] as string;
  const data = await MemberService.updateMember(memberId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member updated",
    data,
  });
});

const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const memberId = req.params["id"] as string;
  const data = await MemberService.deleteMember(memberId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member deleted",
    data,
  });
});

const getMembersByProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params["projectId"] as string;
  const data = await MemberService.getMembersByProject(projectId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Members fetched by project",
    data,
  });
});

const autoAssignByProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params["projectId"] as string;
  const data = await MemberService.autoAssignMember(projectId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Member auto-assigned",
    data,
  });
});

export const MemberController = {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
  getMembersByProject,
  autoAssignByProject,
};
