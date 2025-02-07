import UserModel from "../model/UserModel";
import { IUser } from "../types/UserType";
import { Request, Response } from "express";
import httpStatus from "http-status";

// Create a new user
const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
      return;
    }

    const newUser: IUser = new UserModel({ name, email, password });
    await newUser.save();

    res.status(httpStatus.CREATED).json({
      message: "Registration successful.",
    });
  } catch (error: any) {
    console.error("Register Error:", error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      code: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
};

// Get all users

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(httpStatus.OK).json(users);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

// Get user by ID

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    if (!user) {
       res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
        return
    }

    res.status(httpStatus.OK).json(user);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export default { CreateUser, getUsers, getUserById };
