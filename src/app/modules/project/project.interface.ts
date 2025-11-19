import type { Types } from "mongoose";

export interface IProject {
  name: string;
  team: Types.ObjectId;
}
