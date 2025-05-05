

import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: "user" | "admin";
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
