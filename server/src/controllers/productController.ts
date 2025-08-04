import { Response } from "express";
import Product from "../models/Product";
import { successResponse, errorResponse } from "../utils/responseHelper";
import { AuthenticatedRequest } from "../types/request";

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { title, description, price, quantity, imageUrl, category } =
      req.body;

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json(errorResponse("Unauthorized: User not authenticated"));
    }

    const farmerId = req.user.id;

    const product = await Product.create({
      farmer: farmerId,
      title,
      description,
      price,
      quantity,
      imageUrl,
      category,
    });

    res.status(201).json(
      successResponse("Product created successfully", {
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        category: product.category,
        createdAt: product.createdAt,
      })
    );
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const products = await Product.find().populate("farmer", "name email");
    res
      .status(200)
      .json(successResponse("Products retrieved successfully", products));
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};

export const getMyProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json(errorResponse("Unauthorized"));
    }

    const products = await Product.find({ farmer: req.user.id }).populate(
      "farmer",
      "name email"
    );
    res
      .status(200)
      .json(
        successResponse("Farmer products retrieved successfully", products)
      );
  } catch (error) {
    res.status(500).json(errorResponse("Internal server error"));
  }
};
