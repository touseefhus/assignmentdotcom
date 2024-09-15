// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRegister from "./component/Auth/CustomerRegister";
import CustomerLogin from "./component/Auth/CustomerLogin";
import MakeReservation from "./component/Reservation/MakeReservation";
import Feedback from "./component/Feedback/Feedback";
import Home from "./component/Home/Home";
import Chat from "./component/Chat/Chat";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<CustomerLogin />} />
          <Route path="/register" element={<CustomerRegister />} />
          <Route path="/reserve" element={<MakeReservation />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
