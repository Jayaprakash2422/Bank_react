// HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import './home.css';
import Footer from "./footer";
import logo from './images/logo.png'; // Ensure the correct path to your logo

const HomePage = () => {
  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="bluesky Logo" className="logo" />
      </div>
      
      <div className="container">
      <h1 className="heading">Bank of Blue$ky </h1>
        <div>
          <div className="button-container">
            <Link to="/login">
              <button className="primary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="secondary">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;