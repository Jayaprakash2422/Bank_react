import React, { useEffect, useState } from "react";
import { Container, Card, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./images/logo.png";
import "./adminpage.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser || loggedInUser.role !== "admin") {
      navigate("/");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(existingUsers);

    const userTransactions = {};
    existingUsers.forEach((user) => {
      userTransactions[user.email] = user.transactions || [];
    });
    setTransactions(userTransactions);
  }, [navigate]);

  const calculateBalance = (email) => {
    const userTransactions = transactions[email] || [];
    return userTransactions
      .reduce((total, txn) => {
        const amount = txn.amount || 0; // Safeguard for undefined amount
        return txn.type === "deposit" ? total + amount : total - amount;
      }, 0)
      .toFixed(2);
  };

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
        <Card className="p-4 shadow-lg text-center" style={{ width: "800px" }}>
          <Card.Body>
            <Card.Title>Admin Dashboard</Card.Title>
            <Card.Text>Manage the application settings and users.</Card.Text>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Current Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>₹{user.balance ? user.balance.toFixed(2) : calculateBalance(user.email)}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => setSelectedUser(user.email)}
                      >
                        View History
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {selectedUser && (
          <Card className="mt-4 p-4 shadow-lg text-center" style={{ width: "800px" }}>
            <Card.Body>
              <Card.Title>Transaction History for {selectedUser}</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Balance After Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions[selectedUser]?.map((txn, index) => (
                    <tr key={index}>
                      <td>{txn.date}</td>
                      <td>{txn.type}</td>
                      <td>₹{(txn.amount || 0).toFixed(2)}</td>
                      <td>₹{(txn.balanceAfter || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="secondary" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default AdminPage;