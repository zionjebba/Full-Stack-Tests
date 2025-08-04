/**
 * @openapi
 * components:
 *   schemas:
 *     Inquiry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         product:
 *           type: string
 *           description: The product ID being inquired about
 *         buyerEmail:
 *           type: string
 *           description: The email address of the buyer
 *         message:
 *           type: string
 *           description: The inquiry message
 *         createdAt:
 *           type: string
 *           format: date-time
 */

import mongoose, { Document, Schema } from "mongoose";

export interface IInquiry extends Document {
  product: mongoose.Types.ObjectId; // Reference to Product
  buyerEmail: string;
  message: string;
  createdAt?: Date;
}

const InquirySchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  buyerEmail: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
