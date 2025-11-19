import type { IMember } from "./member.interface.js";
import { Schema, model } from "mongoose";

const memberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1, max: 5 },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: false },
  },
  { timestamps: true }
);

export const Member = model<IMember>("Member", memberSchema);
