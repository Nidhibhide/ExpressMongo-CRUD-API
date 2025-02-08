import UserModel from "../model/UserModel";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { IOrder } from "../types/OrderType";
import OrderModel from "../model/OrderModel";

// Create a new order
export const CreateOrder = async (req: Request, res: Response) => {
  try {
    const { totalAmount, Items } = req.body;

    const newOrder: IOrder = new OrderModel({ totalAmount, Items });
    await newOrder.save();

    res.status(httpStatus.CREATED).json({
      message: "Order created successful.",
    });
  } catch (error: any) {
    console.error("Creation Error:", error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

//fetch user with order details

export const BillOrder = async (req: Request, res: Response) => {
  try {
    const usersWithOrders = await UserModel.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "orderIds",
          foreignField: "_id",
          as: "Orders",
        },
      },
      {
        $unwind: {
          path: "$Orders",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          TotalSpent: { $sum: "$Orders.totalAmount" },
          Items: { $push: "$Orders.Items" },
          TotalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          TotalSpent: 1,
          TotalOrders: 1,
          Items: {
            $reduce: {
              input: "$Items",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      {
        $sort: {
          TotalSpent: 1,
        },
      },
    ]);

    if (usersWithOrders.length === 0) {
      res.json({
        message: "No orders found for users.",
        data: [],
      });
      return;
    }

    res.json({
      message: "User orders fetched successfully.",
      data: usersWithOrders,
    });
  } catch (error: any) {
    console.error("Error fetching user orders:", error);
    res.json({
      message: "An error occurred while fetching user orders.",
      error: error.message,
    });
  }
};
