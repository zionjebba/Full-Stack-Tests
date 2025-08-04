import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import inquiryRoutes from "./routes/inquiryRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

import { setupSwagger } from "./config/swagger";
import { apiLimiter } from "./middlewares/rateLimiter";

dotenv.config();

const app = express();

app.use(apiLimiter);
app.use(helmet());

app.use(express.json());
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://agritech-marketplace.vercel.app", // e.g., https://farmdirect-frontend.vercel.app
        "http://localhost:5173",
      ]
    : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(morgan("dev"));

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inquiries", inquiryRoutes);

app.use(errorMiddleware);

export default app;
