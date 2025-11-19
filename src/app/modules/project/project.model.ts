import type { IProject } from "./project.interface.js";
import { Schema, model } from "mongoose";

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
