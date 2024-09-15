import React, { useState } from "react";
import api from "../../utitls/ApiEndPoint";
import "./Reservation.css"; // Import the CSS

const MakeReservation = () => {
  const [reservationData, setReservationData] = useState({
    tableId: "",
    reservationDate: "",
    numberOfGuests: "",
    specialRequest: "",
  });

  const handleChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const customerId = localStorage.getItem("customerId");

    const formattedData = {
      customerId,
      tableId: Number(reservationData.tableId),
      reservationDate: reservationData.reservationDate,
      numberOfGuests: Number(reservationData.numberOfGuests),
      specialRequest: reservationData.specialRequest,
    };

    try {
      await api.post("/reservations/reserve", formattedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Reservation made successfully");
    } catch (error) {
      console.error("Error reserving table:", error.response?.data || error);
      alert("Failed to make reservation");
    }
  };

  return (
    <div className="reservation-container">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tableId"
          placeholder="Table ID"
          value={reservationData.tableId}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="reservationDate"
          placeholder="Reservation Date"
          value={reservationData.reservationDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="numberOfGuests"
          placeholder="Number of Guests"
          value={reservationData.numberOfGuests}
          onChange={handleChange}
          required
        />
        <textarea
          name="specialRequest"
          placeholder="Special Request"
          value={reservationData.specialRequest}
          onChange={handleChange}
        />
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default MakeReservation;
