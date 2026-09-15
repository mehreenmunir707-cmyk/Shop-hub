import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="section-space">
      <div className="empty-state not-found">
        <div className="display-1 fw-bold">404</div>
        <h1>Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <Button as={Link} to="/" variant="dark">Return Home</Button>
      </div>
    </Container>
  );
}