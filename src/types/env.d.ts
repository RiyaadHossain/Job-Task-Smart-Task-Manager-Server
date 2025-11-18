import type { NODE_ENV_ENUM } from "@/enums/env.ts";

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string ;
    PORT?: string;
    MONGO_URI?: string;
    JWT_SECRET?: string;
    JWT_EXPIRES_IN?: string;
    REFRESH_TOKEN_SECRET?: string;
    REFRESH_TOKEN_EXPIRES_IN?: string;
  }
}
