import UserModel from "../model/UserModel";
import { IUser } from "../types/UserType";
import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { comparePassword } from "../utils/ComparePass";
import { generateToken } from "../utils/GenerateToken";

// Create a new user
const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, orderIds } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      orderIds,
    });
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

//login user

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: any = await UserModel.findOne({ email });
    if (!user) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid email or password!" });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid email or password!" });
      return;
    }

    const token = generateToken(user._id, user.email);

    res.status(httpStatus.OK).json({ message: "Login Successfully", token });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error logging in", error });
  }
};

// Get user by ID

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    res.status(httpStatus.OK).json(user);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

// Update user

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Update only provided fields using `$set`
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    res.status(httpStatus.OK).json({
      message: "Updated User successfully",
      user,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Server Error",
    });
  }
};

// Delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    res.status(httpStatus.OK).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

export default {
  CreateUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
