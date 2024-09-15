// src/components/CustomerProfile.js
import React, { useEffect, useState } from "react";
import api from "../utitls/ApiEndPoint";

const CustomerProfile = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await api.get("/customers/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!customerData) return <p>Error loading profile</p>;

  return (
    <div>
      <h2>Customer Profile</h2>
      <p>Name: {customerData.name}</p>
      <p>Email: {customerData.email}</p>
      <p>Phone: {customerData.phone}</p>
    </div>
  );
};

export default CustomerProfile;
