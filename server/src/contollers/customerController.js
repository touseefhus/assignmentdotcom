// controllers/customerController.js
import Customer from "../models/customer.models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Get customer profile
const getCustomerProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customerId = decoded.id;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const { password, ...customerData } = customer.toObject(); // Exclude password from response
    res.status(200).json(customerData);
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getCustomerProfile };
