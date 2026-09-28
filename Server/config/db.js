import mongoose from "mongoose";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};