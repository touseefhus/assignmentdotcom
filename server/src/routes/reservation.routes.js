// routes/reservation.js
import express from "express";
import {
  makeReservation,
  getReservationsByCustomer,
} from "../contollers/reservation.controller.js";
const router = express.Router();

// Make a reservation
router.post("/reserve", makeReservation);

// Get reservations by customer ID
router.get("/customer/:customerId", getReservationsByCustomer);

export default router;
