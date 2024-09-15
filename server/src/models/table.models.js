import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    tableNumber: Number,
    // seats: Number,
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
export default Table;
