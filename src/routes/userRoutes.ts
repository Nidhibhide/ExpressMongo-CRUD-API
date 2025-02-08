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

// Route to update user
router.route("/update/:id").put(validateUpdateUser, userController.updateUser);

// Route to delete user
router.route("/delete/:id").delete(userController.deleteUser );

export default router;
