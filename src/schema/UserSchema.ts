import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../types/UserType";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    role: {
      type: String,
      enum: ["admin", "user", "seller"],
    },
  },
  
  {
    timestamps: true,
  }
);

export default userSchema
