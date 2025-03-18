import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

const WithdrawalPage = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
      setBalance(user.balance);
    }
  }, []);

  const handleWithdrawal = (e) => {
    e.preventDefault();
    const withdrawalAmount = parseFloat(amount);

    if (!withdrawalAmount || withdrawalAmount <= 0) {
      setMessage({ type: 'danger', text: 'Enter a valid amount' });
      return;
    }

    if (withdrawalAmount > loggedInUser.balance) {
      setMessage({ type: 'danger', text: 'Insufficient balance' });
      return;
    }

    if (withdrawalAmount > 10000) {
      setMessage({ type: 'danger', text: 'Maximum withdrawal $10,000' });
      return;
    }

    const newBalance = loggedInUser.balance - withdrawalAmount;
    const newTransaction = {
      date: new Date().toLocaleString(),
      type: 'Withdrawal',
      amount: withdrawalAmount,
      balanceAfter: newBalance,
    };

    const updatedUser = {
      ...loggedInUser,
      balance: newBalance,
      transactions: [...(loggedInUser.transactions || []), newTransaction],
    };

    setLoggedInUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user =>
      user.email === loggedInUser.email ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setBalance(newBalance);
    setAmount('');
    setMessage({ type: 'success', text: `$${withdrawalAmount} withdrawn successfully!` });
    setTimeout(() => setMessage(''), 3000);
  };

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

      <Container className="withdraw-container">
        <Card className="withdraw-card">
          <Card.Body>
            <Card.Title className="text-center">Withdraw Funds</Card.Title>
            <h5 className="text-center">Current Balance: ${balance}</h5>
            <Form onSubmit={handleWithdrawal}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter withdrawal amount"
                  min="1"
                />
              </Form.Group>
              {message && <Alert variant={message.type} className="mt-2">{message.text}</Alert>}
              <Button className="w-100 mt-3" variant="danger" type="submit">
                Withdraw
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default WithdrawalPage;
