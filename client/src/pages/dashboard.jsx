import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Navbar,
  Nav,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getPropertyImage } from "../utils/randomImage.js";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);

      const [propRes, favRes] = await Promise.all([
        API.get("/properties"),
        API.get("/favorites"),
      ]);

      setProperties(propRes.data);
      setFavorites(favRes.data.map((p) => p.id));
    } catch (err) {
      setAlert({
        show: true,
        message: "Failed to load data",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleFavorite = async (id) => {
    try {
      if (favorites.includes(id)) {
        await API.delete(`/favorites/${id}`);
        setAlert({
          show: true,
          message: "Removed from favorites",
          variant: "warning",
        });
      } else {
        await API.post(`/favorites/${id}`);
        setAlert({
          show: true,
          message: "Added to favorites",
          variant: "success",
        });
      }

      fetchData();
    } catch (err) {
      setAlert({
        show: true,
        message: "Action failed",
        variant: "danger",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="px-3">
        <Navbar.Brand>Buyer Portal</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar>

      <Container className="mt-4">
        <h2 className="mb-4">Dashboard</h2>

        {/* Alert */}
        {alert.show && (
          <Alert
            variant={alert.variant}
            dismissible
            onClose={() => setAlert({ ...alert, show: false })}
          >
            {alert.message}
          </Alert>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {properties.map((p) => (
              <Col key={p.id}>
                <Card key={p.id}>
                  <Card.Img
                    variant="top"
                    src={getPropertyImage(p.id)}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {p.location}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ${p.price}
                    </Card.Text>

                    <Button
                      variant={favorites.includes(p.id) ? "danger" : "success"}
                      onClick={() => toggleFavorite(p.id)}
                    >
                      {favorites.includes(p.id) ? "💔 Remove" : "❤️ Add"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
