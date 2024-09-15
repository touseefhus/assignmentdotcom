// controllers/reservationController.js
import Reservation from "../models/reservation.models.js";
import Table from "../models/table.models.js";

// Create a new reservation
const makeReservation = async (req, res) => {
  try {
    console.log("Reservation request data:", req.body); // Log incoming request data

    const { customerId, date, time, guests, specialRequest } = req.body;

    // Check if all fields are provided and valid
    // if (!customerId || !date || !time || !guests) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }

    const reservation = new Reservation({
      customerId,
      date,
      time,
      guests,
      specialRequest,
    });
    await reservation.save();

    res.status(201).json({ message: "Reservation made successfully" });
  } catch (error) {
    console.error("Error making reservation:", error); // Log the error
    res.status(500).json({ error: "Error making reservation" });
  }
};

// Get all reservations for a customer
const getReservationsByCustomer = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      customer: req.params.customerId,
    }).populate("table");
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error reserving table:", error.response?.data || error); // Display backend error
    alert("Failed to make reservation");
  }
};

export { makeReservation, getReservationsByCustomer };
