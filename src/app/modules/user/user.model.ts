import type { IUser} from "./user.interface.js";
import { Schema, model } from "mongoose";

// Step 1: Define Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Step 2: Create Model
export const User = model<IUser>("User", userSchema);
