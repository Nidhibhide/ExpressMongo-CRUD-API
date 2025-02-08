import { Request, Response, NextFunction } from "express";
import {
    orderValidation
} from "../validations/OrderValidation";
import httpStatus from "http-status";

// Middleware for creating a user
const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = orderValidation.validate(req.body);
  if (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: error.details[0].message });
    return;
  }

  next();
};

export { validateCreateOrder };
