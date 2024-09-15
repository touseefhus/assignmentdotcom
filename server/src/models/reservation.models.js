import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    reservationDate: Date,
    numberOfGuests: Number,
    specialRequest: String,
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
