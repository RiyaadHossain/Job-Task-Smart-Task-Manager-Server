import type { USER_ROLES } from "@/enums/user.js";

export interface AuthUser {
  id: string;
  role: USER_ROLES;
  [key: string]: any; // for additional payload data
}
