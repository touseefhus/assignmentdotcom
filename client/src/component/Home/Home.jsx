import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <div className="header-container">
        <ul className="navbar">
          <li className="nav-item">
            <Link to="/reserve" className="nav-link">
              Make Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/feedback" className="nav-link">
              Share Feedback
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/auth">
              Get Started
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chat">
              chat
            </Link>
          </li>
        </ul>{" "}
      </div>
    </div>
  );
};

export default Home;
