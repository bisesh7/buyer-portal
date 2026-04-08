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
import AppNavbar from "../components/navbar.jsx";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await API.get("/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data);
    } catch (err) {
      setAlert({
        show: true,
        message: "Failed to load favorites",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (propertyId) => {
    try {
      await API.delete(`/favorites/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({
        show: true,
        message: "Removed from favorites",
        variant: "warning",
      });
      fetchFavorites();
    } catch (err) {
      setAlert({ show: true, message: "Action failed", variant: "danger" });
    }
  };

  return (
    <>
      <AppNavbar navLinks={[{ label: "Dashboard", path: "/dashboard" }]} />

      <Container className="mt-4">
        <h2 className="mb-4">My Favorites</h2>

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

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : favorites.length === 0 ? (
          <p>You have no favorite properties yet.</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {favorites.map((p) => (
              <Col key={p.id}>
                <Card>
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
                      variant="danger"
                      className="w-100"
                      onClick={() => removeFavorite(p.id)}
                    >
                      💔 Remove
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
