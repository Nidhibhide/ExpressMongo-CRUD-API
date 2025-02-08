import { Schema } from "mongoose";
import { IOrder } from "../types/OrderType";

const OrderSchema = new Schema<IOrder>({
  totalAmount: { type: Number, required: true },
  Items: { type: [String], required: true },
});

export default OrderSchema;
