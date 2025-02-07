import { Request, Response, NextFunction } from "express";
import {
  createUserValidation,
  updateUserValidation,
} from "../validations/UserValidation";
import httpStatus from "http-status";

// Middleware for creating a user
const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createUserValidation.validate(req.body);
  if (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: error.details[0].message });
    return;
  }

  next();
};

// Middleware for updating a user
const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateUserValidation.validate(req.body);

  if (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: error.details[0].message });
    return;
  }

  next();
};

export { validateCreateUser, validateUpdateUser };
