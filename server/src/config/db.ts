import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase"
    );
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Mongodb connection error: ${error.message}`);
    } else {
      console.error("Mongodb connection error:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
