import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  orderIds: mongoose.Types.ObjectId[]; 
}
