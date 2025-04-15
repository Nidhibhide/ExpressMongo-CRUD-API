import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "seller"; 
  // orderIds: mongoose.Types.ObjectId[]; 
}
