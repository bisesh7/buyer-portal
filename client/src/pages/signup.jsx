import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setAlert({
        show: true,
        message: "Please fill all fields",
        variant: "warning",
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        show: true,
        message: "Passwords do not match",
        variant: "danger",
      });
      return;
    }

    try {
      await API.post("/register", { name, email, password, confirmPassword });
      setAlert({
        show: true,
        message: "Signup successful! Redirecting to login...",
        variant: "success",
      });

      // Redirect after short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setAlert({
        show: true,
        message: err.response?.data?.error || "Signup failed",
        variant: "danger",
      });
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "400px", padding: "20px" }}>
        <h2 className="mb-3 text-center">Signup</h2>

        {alert.show && (
          <Alert
            variant={alert.variant}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
          >
            {alert.message}
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSignup} className="w-100">
            Signup
          </Button>

          <p className="mt-3 text-center">
            Already have an account? <a href="/">Login</a>
          </p>
        </Form>
      </Card>
    </Container>
  );
}
