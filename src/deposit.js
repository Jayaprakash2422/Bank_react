import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import './deposit.css';

function Deposit() {
  const [depositAmount, setDepositAmount] = useState('');
  const [balance, setBalance] = useState(0.0);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser({
        ...user,
        transactions: user.transactions || [], // Ensure transactions is an array
      });
      setBalance(user.balance || 0.0);
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map((user) =>
        user.email === loggedInUser.email
          ? { ...user, balance, transactions: loggedInUser.transactions || [] }
          : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }
  }, [balance, loggedInUser]);

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const handleDeposit = () => {
    if (!loggedInUser) {
      alert('No user is logged in.');
      return;
    }

    const deposit = parseFloat(depositAmount);

    if (isNaN(deposit) || deposit <= 0) {
      alert('Please enter a valid deposit amount.');
      return;
    }

    if (deposit > 100000) {
      alert('Deposit limit exceeded! Maximum deposit per transaction is $100,000.');
      return;
    }

    const newBalance = (balance || 0) + deposit;
    const newTransaction = {
      date: new Date().toLocaleString(),
      type: 'Deposit',
      amount: deposit,
      balanceAfter: newBalance,
    };

    setBalance(newBalance);

    const updatedUser = {
      ...loggedInUser,
      balance: newBalance,
      transactions: [...(loggedInUser.transactions || []), newTransaction], // Ensure transactions is an array
    };

    setLoggedInUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.email === loggedInUser.email ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setDepositAmount('');
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links ms-auto">
          <Link to="/deposit" className="me-3">
            Deposit
          </Link>
          <Link to="/withdraw" className="me-3">
            Withdraw
          </Link>
          <Link to="/transactions" className="me-3">
            History
          </Link>
          <Link to="/">Logout</Link>
        </div>
      </div>

      <Container className="mt-3">
        <Card className="p-3 shadow-sm">
          <Card.Body>
            <h2 className="text-center">Bank Deposit</h2>
            <div className="text-center mb-4">
              <p>Current Balance: ${(balance || 0).toFixed(2)}</p>
            </div>

            <Form.Group>
              <Form.Label htmlFor="deposit-amount">Deposit Amount</Form.Label>
              <Form.Control
                type="number"
                id="deposit-amount"
                value={depositAmount}
                onChange={handleDepositChange}
                placeholder="Enter amount to deposit"
                min="1"
                max="100000"
              />
            </Form.Group>

            <Button onClick={handleDeposit} variant="success" className="w-100">
              Deposit
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Deposit;