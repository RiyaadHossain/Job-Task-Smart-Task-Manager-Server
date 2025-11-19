import { Team } from "@modules/team/team.model.js";
import type { ITeam } from "./team.interface.js";
import APIError from "@/errors/APIError.js";
import httpStatus from "http-status";

const createTeam = async (payload: ITeam) => {
  const created = await Team.create(payload as any);
  return created.toObject ? created.toObject() : created;
};

const getTeams = async () => Team.find().lean();

const getTeamById = async (id: string) => {
  const team = await Team.findById(id).lean();
  if (!team) throw new APIError("Team not found", httpStatus.NOT_FOUND);
  return team;
};

const updateTeam = async (id: string, payload: Partial<ITeam>) => {
  const updated = await Team.findByIdAndUpdate(id, payload as any, {
    new: true,
  }).lean();
  if (!updated) throw new APIError("Team not found", httpStatus.NOT_FOUND);
  return updated;
};

const deleteTeam = async (id: string) => {
  const deleted = await Team.findByIdAndDelete(id).lean();
  if (!deleted) throw new APIError("Team not found", httpStatus.NOT_FOUND);
  return deleted;
};

export const TeamService = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
