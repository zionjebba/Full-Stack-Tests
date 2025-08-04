/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [farmer, buyer]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "farmer" | "buyer";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["farmer", "buyer"],
    required: true,
    default: "buyer",
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model<Iuser>("User", userSchema);

export default User;
