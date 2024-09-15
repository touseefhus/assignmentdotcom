// controllers/customerController.js
import Customer from "../models/customer.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register a new customer
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await customer.save();
    res.status(201).json({ message: "Customer registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error registering customer" });
  }
};

// Login a customer
const loginCustomer = async (req, res) => {
  try {
    console.log("Login request received:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
      console.log("Customer not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in customer:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { registerCustomer, loginCustomer };
