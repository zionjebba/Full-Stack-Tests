import { Request, Response } from "express";
import Inquiry from "../models/Inquiry";
import Product from "../models/Product";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { AuthenticatedRequest } from "../types/request";

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { product, buyerEmail, message } = req.body;

    const inquiry = await Inquiry.create({ product, buyerEmail, message });

    res.status(201).json(
      successResponse("Inquiry created successfully", {
        id: inquiry._id,
        product: inquiry.product,
        buyerEmail: inquiry.buyerEmail,
        message: inquiry.message,
        createdAt: inquiry.createdAt,
      })
    );
  } catch (err: any) {
    res.status(500).json(errorResponse("Internal server error", err.message));
  }
};

export const getInquiriesByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const inquiries = await Inquiry.find({ product: productId });

    res.json(successResponse("Inquiries retrieved successfully", inquiries));
  } catch (err: any) {
    res.status(500).json(errorResponse("Internal server error", err.message));
  }
};

export const getMyInquiries = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json(errorResponse("Unauthorized"));
    }

    const products = await Product.find({ farmer: req.user.id });
    const productIds = products.map((product) => product._id);

    const inquiries = await Inquiry.find({
      product: { $in: productIds },
    }).populate("product", "title category");

    res.json(
      successResponse("Farmer inquiries retrieved successfully", inquiries)
    );
  } catch (err: any) {
    res.status(500).json(errorResponse("Internal server error", err.message));
  }
};
