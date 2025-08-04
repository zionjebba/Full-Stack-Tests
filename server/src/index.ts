import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
