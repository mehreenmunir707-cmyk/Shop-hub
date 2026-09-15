import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const destination = location.state?.from || "/";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setProcessing(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      navigate(destination, { replace: true });
    } catch (err) {
      console.error(err);

      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Login failed. Please check your email and password.");
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container className="auth-section">
      <div className="auth-card">
        <span className="eyebrow">Account</span>

        <h1>Welcome Back</h1>

        <p>Login to continue to MM Cosmetics.</p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </Form.Group>

          <Button
            className="w-100"
            variant="dark"
            type="submit"
            disabled={processing}
          >
            {processing ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <p className="mt-3 mb-0 text-center">
          Don't have an account?{" "}
          <Link to="/signup">Create one</Link>
        </p>
      </div>
    </Container>
  );
}