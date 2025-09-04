import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";



// Load .env only in non-production environments
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve("./backend/.env") });
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Successfully connected to MongoDB`);
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;

