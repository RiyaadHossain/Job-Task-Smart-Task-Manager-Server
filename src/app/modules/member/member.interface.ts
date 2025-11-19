import type { RoleEnum } from "@enums/role.enum.js";
import type { Types } from "mongoose";

export interface IMember {
  name: string;
  role: RoleEnum;
  capacity: number;
  team?: Types.ObjectId;
}

