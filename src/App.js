import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar"; // Ensure this import is correct and only appears once
import LoginPage from "./login";
import DepositPage from "./deposit";
import WithdrawalPage from "./withdrawal";
import DashboardPage from "./dashboard"; // Corrected spelling from "deshboard" to "dashboard"
import HomePage from "./home";
import TransactionsPage from "./transactions";
import SignupPage from "./signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Logout from './Logout';
import Footer from "./footer";

import AdminPage from "./AdminPage";

const App = () => {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* Corrected path */}
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/withdraw" element={<WithdrawalPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="transactions" element={<TransactionsPage/>}/>
           
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;