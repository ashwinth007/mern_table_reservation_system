import express from "express";
const router = express.Router();
import { send_reservation } from "../controller/reservation.js";
import { getAllReservations } from "../controller/reservation.js";
import { updateReservation } from "../controller/reservation.js";
router.post("/", send_reservation);
router.get("/", getAllReservations);
router.put("/:id", updateReservation);

export default router;