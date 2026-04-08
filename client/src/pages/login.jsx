import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setAlert({
        show: true,
        message: "Please fill all fields",
        variant: "warning",
      });
      return;
    }

    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);

      setAlert({
        show: true,
        message: "Login successful! Redirecting...",
        variant: "success",
      });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setAlert({
        show: true,
        message: err.response?.data?.message || "Login failed",
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
        <h2 className="mb-3 text-center">Login</h2>

        {/* Alert */}
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

          <Button variant="primary" onClick={handleLogin} className="w-100">
            Login
          </Button>

          <p className="mt-3 text-center">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </Form>
      </Card>
    </Container>
  );
}
