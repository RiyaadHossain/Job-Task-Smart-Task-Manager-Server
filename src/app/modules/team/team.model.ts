import type { ITeam } from "./team.interface.js";
import { Schema, model } from "mongoose";

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

export const Team = model<ITeam>("Team", teamSchema);
