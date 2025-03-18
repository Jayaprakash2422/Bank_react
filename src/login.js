import React, { useState } from "react";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const adminCredentials = {
    email: "admin@gmail.com",
    password: "Admin@123"
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem("loggedInUser", JSON.stringify({ email, role: "admin" }));
        navigate("/Admin");
      } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.email === email);

        if (!user) {
          setError("User not found. Please sign up.");
        } else if (user.password !== password) {
          setError("Incorrect password. Try again.");
        } else {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          navigate("/dashboard");
        }
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center">Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={error ? "is-invalid" : ""}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={error ? "is-invalid" : ""}
              />
            </Form.Group>
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
            <Button className="w-100 mt-3" variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
