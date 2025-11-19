import { Member } from "@modules/member/member.model.js";
import { Team } from "@modules/team/team.model.js";
import { Project } from "@modules/project/project.model.js";
import type { IMember } from "./member.interface.js";
import APIError from "@/errors/APIError.js";
import httpStatus from "http-status";
import { Task } from "@/app/modules/task/task.model.js";

const createMember = async (payload: IMember) => {
  // if team provided, ensure it exists
  if (payload.team) {
    const teamExists = await Team.findById(payload.team).lean();
    if (!teamExists)
      throw new APIError("Team not found", httpStatus.BAD_REQUEST);
  }

  const created = await Member.create(payload as any);
  return created.toObject ? created.toObject() : created;
};

const getMembers = async () => Member.find().lean();

const getMemberById = async (id: string) => {
  const member = await Member.findById(id).lean();
  if (!member) throw new APIError("Member not found", httpStatus.NOT_FOUND);
  return member;
};

const updateMember = async (id: string, payload: Partial<IMember>) => {
  // if team is being assigned/updated, validate it exists
  if (payload.team) {
    const teamExists = await Team.findById(payload.team).lean();
    if (!teamExists)
      throw new APIError("Team not found", httpStatus.BAD_REQUEST);
  }

  const updated = await Member.findByIdAndUpdate(id, payload as any, {
    new: true,
  }).lean();
  if (!updated) throw new APIError("Member not found", httpStatus.NOT_FOUND);
  return updated;
};

const deleteMember = async (id: string) => {
  const deleted = await Member.findByIdAndDelete(id).lean();
  if (!deleted) throw new APIError("Member not found", httpStatus.NOT_FOUND);
  return deleted;
};

async function getMembersByProject(projectId: string) {
  // check project exists
  const project = await Project.findById(projectId).lean();
  if (!project) throw new APIError("Project not found", httpStatus.NOT_FOUND);

  const teamId = (project as any).team;
  if (!teamId)
    throw new APIError("Project has no team assigned", httpStatus.BAD_REQUEST);

  const teamExists = await Team.findById(teamId).lean();
  if (!teamExists) throw new APIError("Team not found", httpStatus.NOT_FOUND);

  const members = await Member.find({ team: teamId }).lean();
  return members;
}

async function autoAssignMember(projectId: string) {
  // check project exists
  const project = await Project.findById(projectId).lean();
  if (!project) throw new APIError("Project not found", httpStatus.NOT_FOUND);

  const teamId = project.team;
  if (!teamId)
    throw new APIError("Project has no team assigned", httpStatus.BAD_REQUEST);

  const teamExists = await Team.findById(teamId).lean();
  if (!teamExists) throw new APIError("Team not found", httpStatus.NOT_FOUND);

  // fetch members for the team
  const members = await Member.find({ team: teamId }).lean();
  if (!members || members.length === 0)
    throw new APIError("No members in team", httpStatus.NOT_FOUND);

  // compute availability = capacity - currentTasks
  const withAvailability = await Promise.all(
    members.map(async (member: any) => {
      const totalTask = await Task.countDocuments({ assignee: member._id });
      return {
        ...member,
        availability: member.capacity - totalTask,
      };
    })
  );

  // pick member with highest availability, tie-breaker: highest capacity then lowest currentTasks
  withAvailability.sort((a: any, b: any) => {
    if (b.availability !== a.availability)
      return b.availability - a.availability;
    return b.capacity - a.capacity;
  });

  const chosen = withAvailability[0];
  if (!chosen)
    throw new APIError("No suitable member found", httpStatus.NOT_FOUND);

  return chosen;
}

export const MemberService = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getMembersByProject,
  autoAssignMember,
};
