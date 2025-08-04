import { Response, NextFunction } from "express";
import User from "../models/User";
import { errorResponse } from "../utils/responseHelper";
import { AuthenticatedRequest } from "../types/request";

export const requireFarmerRole = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json(errorResponse("Unauthorized: No user info found"));
    }

    const user = await User.findById(userId);

    if (!user || user.role !== "farmer") {
      return res
        .status(403)
        .json(
          errorResponse("Only farmers are allowed to perform this action.")
        );
    }

    next();
  } catch (error: any) {
    res
      .status(500)
      .json(errorResponse("Internal server error", error?.message));
  }
};
