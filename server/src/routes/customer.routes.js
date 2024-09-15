// routes/customer.js
import express from "express";
import {
  registerCustomer,
  loginCustomer,
} from "../contollers/customer.controller.js";
import authenticateToken from "../middleware/auth.js";
import { getCustomerProfile } from "../contollers/customerController.js";
const router = express.Router();

// Register a new customer
router.post("/register", registerCustomer);
router.get("/profile", authenticateToken, getCustomerProfile);

// Login customer
router.post("/login", loginCustomer);

export default router;
