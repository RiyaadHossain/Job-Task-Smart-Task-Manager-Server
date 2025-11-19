import { Project } from "@modules/project/project.model.js";
import { Team } from "@modules/team/team.model.js";
import type { IProject } from "./project.interface.js";
import APIError from "@/errors/APIError.js";
import httpStatus from "http-status";

const createProject = async (payload: IProject) => {
  // ensure team exists
  if (payload.team) {
    const teamExists = await Team.findById(payload.team).lean();
    if (!teamExists)
      throw new APIError("Team not found", httpStatus.BAD_REQUEST);
  }

  const created = await Project.create(payload as any);
  return created.toObject ? created.toObject() : created;
};

const getProjects = async () => Project.find().lean();

const getProjectById = async (id: string) => {
  const project = await Project.findById(id).lean();
  if (!project) throw new APIError("Project not found", httpStatus.NOT_FOUND);
  return project;
};

const updateProject = async (id: string, payload: Partial<IProject>) => {
  // if team is being updated, validate it
  if (payload.team) {
    const teamExists = await Team.findById(payload.team).lean();
    if (!teamExists)
      throw new APIError("Team not found", httpStatus.BAD_REQUEST);
  }

  const updated = await Project.findByIdAndUpdate(id, payload as any, {
    new: true,
  }).lean();
  if (!updated) throw new APIError("Project not found", httpStatus.NOT_FOUND);
  return updated;
};

const deleteProject = async (id: string) => {
  const deleted = await Project.findByIdAndDelete(id).lean();
  if (!deleted) throw new APIError("Project not found", httpStatus.NOT_FOUND);
  return deleted;
};

export const ProjectService = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
