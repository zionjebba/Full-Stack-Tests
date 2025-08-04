/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         farmer:
 *           type: string
 *           description: The farmer's user ID
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *         imageUrl:
 *           type: string
 *           description: Optional image URL
 *         category:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  farmer: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  category: string;
  createdAt?: Date;
}

const productSchema: Schema = new Schema({
  farmer: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageUrl: { type: String, default: "" },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
