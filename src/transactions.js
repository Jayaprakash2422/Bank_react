import React, { useState, useEffect } from 'react';
import { Table, Container, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import "./trans.css";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
      setTransactions(user.transactions || []);
    }
  }, []);

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links ms-auto">
          <Link to="/deposit" className="me-3">Deposit</Link>
          <Link to="/withdraw" className="me-3">Withdraw</Link>
          <Link to="/transactions" className="me-3">History</Link>
          <Link to="/">Logout</Link>
        </div>
      </div>

      <Container className="mt-3">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="text-center">Transaction History</Card.Title>
            {transactions.length === 0 ? (
              <Alert variant="info" className="text-center">
                No transactions found.
              </Alert>
            ) : (
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
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.date}</td>
                      <td>{transaction.type}</td>
                      <td>${transaction.amount ? transaction.amount.toFixed(2) : 'N/A'}</td>
                      <td>${transaction.balanceAfter ? transaction.balanceAfter.toFixed(2) : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default TransactionsPage;
