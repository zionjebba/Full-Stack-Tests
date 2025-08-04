import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/responseHelper";
import { AuthenticatedRequest } from "../types/request";

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(errorResponse("No token provided"));
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    res.status(401).json(errorResponse("Invalid token"));
  }
};

export default authMiddleware;
