import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/reservationRoute.js";
import ErrorHandler from "./middlewares/error.js";
const app = express();
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use("/api/v1/reservation", router);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

app.use(ErrorHandler);

export default app;