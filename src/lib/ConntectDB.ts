import mongoose from "mongoose";
const DB_URL = process.env.DB_URI || "mongodb://localhost:27017/nextjs";

if (!DB_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
  }
  

  async function connectDB() {
    const conn = await mongoose.connect(DB_URL);
    if (conn) {
      console.log("Database connected successfully");
    }
  }
  export  {connectDB};