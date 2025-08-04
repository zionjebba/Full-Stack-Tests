import { body } from "express-validator";

export const productValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("category").notEmpty().withMessage("Category is required"),
];

export const inquiryValidator = [
  body("product").notEmpty().withMessage("Product ID is required"),
  body("buyerEmail").isEmail().withMessage("A valid email is required"),
  body("message").notEmpty().withMessage("Message is required"),
];
