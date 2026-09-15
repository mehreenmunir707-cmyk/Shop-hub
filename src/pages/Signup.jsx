import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (form.name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setProcessing(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      // Save user's name in Firebase Authentication profile
      await updateProfile(userCredential.user, {
        displayName: form.name.trim(),
      });

      // Account created successfully
      navigate("/", { replace: true });
    } catch (err) {
  console.error("FIREBASE SIGNUP ERROR:", err);
  console.error("ERROR CODE:", err.code);
  console.error("ERROR MESSAGE:", err.message);

  setError(`${err.code}: ${err.message}`);
} finally {
  setProcessing(false);
}
  };

  return (
    <Container className="auth-section">
      <div className="auth-card">
        <span className="eyebrow">Account</span>

        <h1>Create Account</h1>

        <p>Create your MM Cosmetics account.</p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>

            <Form.Control
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </Form.Group>

          {/* Email */}
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

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              name="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
            />
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>

            <Form.Control
              type="password"
              name="confirmPassword"
              required
              minLength={6}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </Form.Group>

          <Button
            className="w-100"
            variant="dark"
            type="submit"
            disabled={processing}
          >
            {processing ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>

        <p className="mt-3 mb-0 text-center">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </Container>
  );
}