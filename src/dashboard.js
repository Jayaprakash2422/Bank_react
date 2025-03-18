import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png'; // Ensure the correct path to your logo
// import "./dashboard.css";

const DashboardPage = () => {
  const [user, setUser ] = useState(null);

  useEffect(() => {
    // Retrieve users from local storage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    // Assuming the last registered user is the current user
    const currentUser  = existingUsers[existingUsers.length - 1];
    setUser (currentUser );
  }, []);

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links">
          <Link to="/">Logout</Link>
        </div>
      </div>
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        {/* Welcome Message */}
        {user && (
          <div className="text-center mb-4">
            <h4>Welcome {user.name} {user.gender === "male" ? "Sir" : "Madam"}!</h4>
          </div>
        )}
        
        {/* Card for Banking Transactions */}
        <Card className="text-center">
          <Card.Body>
            <Card.Text>Manage your banking transactions easily.</Card.Text>
            <Link to="/deposit">
              <Button className="w-100 mt-2" variant="success">Deposit Funds</Button>
            </Link>
            <Link to="/withdraw">
              <Button className="w-100 mt-2" variant="danger">Withdraw Funds</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DashboardPage;