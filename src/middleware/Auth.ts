import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

// Extend the Express Request type to include 'user'
interface AuthenticatedRequest extends Request {
  user?: string | jwt.JwtPayload;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
    const token = req.header("Authorization");


  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Access Denied!" });
    return;
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid Token!" });
  }
};

export default authMiddleware;
