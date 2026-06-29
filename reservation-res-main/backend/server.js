import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import reservationRoutes from "./routes/reservationRoute.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();
const app = express();

app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));


app.use("/api/reservations", reservationRoutes);

app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await dbConnection();
    app.listen(PORT, () => console.log(`✅ SERVER STARTED ON PORT ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();