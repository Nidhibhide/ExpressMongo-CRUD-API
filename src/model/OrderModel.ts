import { model } from "mongoose";
import { IOrder } from "../types/OrderType";
import orderSchema from "../schema/OrderSchema";

const OrderModel = model<IOrder>("Order", orderSchema);

export default OrderModel;
