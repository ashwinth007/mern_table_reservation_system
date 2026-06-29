
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
    });
    console.log(`✅ Connected to database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
    throw err;
  }
};