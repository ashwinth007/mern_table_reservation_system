
import { Reservation } from "../models/reservation.js";

import ErrorHandler from "../middlewares/error.js";

export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please fill the full reservation form!", 400));
  }

  try {
    const reservation = await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
      reservation,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return next(new ErrorHandler(`Validation Error: ${messages.join(", ")}`, 400));
    }
    console.error("Reservation creation failed:", error);
    return next(new ErrorHandler(error.message || "Reservation creation failed", 500));
  }
};


export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.error("Fetching reservations failed:", error);
    return next(new ErrorHandler("Failed to fetch reservations", 500));
  }
};


export const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Reservation.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updated) return next(new ErrorHandler("Reservation not found", 404));

    res.status(200).json({ success: true, message: "Reservation Updated Successfully!", updated });
  } catch (error) {
    console.error("Reservation update failed:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return next(new ErrorHandler(`Validation Error: ${messages.join(", ")}`, 400));
    }
    return next(new ErrorHandler("Update failed", 500));
  }
};