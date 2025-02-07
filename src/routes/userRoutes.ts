import { Router, Request, Response } from "express";
import userController from "../controller/UserController";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../middleware/UserValidMid";

const router = Router();

// Route to create a new user
router.route("/create").post(validateCreateUser, userController.CreateUser);

// Route to get users
router.route("/getAll").get(userController.getUsers);


// Route to get user
router.route("/getByid/:id").get(userController.getUserById);

export default router;
