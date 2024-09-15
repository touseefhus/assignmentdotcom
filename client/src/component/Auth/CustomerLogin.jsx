// src/components/CustomerLogin.js
import React, { useState } from "react";
import api from "../../utitls/ApiEndPoint";
import "./Auth.css";
import { Link } from "react-router-dom";
const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/customers/login", formData);
      alert("Login successful!");
      // Save JWT token for future authenticated requests
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to login.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account
          <Link to="/register">Register now</Link>
        </p>
      </form>
    </div>
  );
};

export default CustomerLogin;
