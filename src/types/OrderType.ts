import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
  totalAmount: number;
  Items: string[];
}
