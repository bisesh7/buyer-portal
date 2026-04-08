import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AppNavbar({ title, navLinks = [] }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Buyer Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {title && <Navbar.Text className="me-3">{title}</Navbar.Text>}
          <Nav className="me-3">
            {navLinks.map((link) => (
              <Nav.Link
                key={link.path}
                onClick={() => navigate(link.path)}
                style={{ color: "white" }}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
