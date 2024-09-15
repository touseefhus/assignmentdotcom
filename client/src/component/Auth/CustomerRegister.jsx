// src/components/CustomerRegister.js
import React, { useState } from "react";
import api from "../../utitls/ApiEndPoint";
import { useNavigate } from "react-router-dom";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
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
      await api.post("/customers/register", formData);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Failed to register.");
    }
    useNavigate("/auth");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="off"
        />
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
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomerRegister;
