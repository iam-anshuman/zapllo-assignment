import mongoose from "mongoose";
const DB_URL = process.env.DB_URI || "mongodb://localhost:27017/nextjs";

if (!DB_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
  }
  
  let cached = (global as any).mongoose;
  
  if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
  }

  async function connectDB() {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
      };
  
      cached.promise = mongoose.connect(DB_URL, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }
  export default connectDB;