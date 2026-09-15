import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { user } = useAuth();

  const {
    cart,
    subtotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
  });

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  // ================================
  // INPUT CHANGE
  // ================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ================================
  // PLACE ORDER
  // ================================

 
   const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("========== ORDER START ==========");

  setError("");

  if (!user) {
    setError("Please login before placing your order.");
    return;
  }

  if (
    !form.fullName.trim() ||
    !form.phone.trim() ||
    !form.address.trim() ||
    !form.city.trim()
  ) {
    setError("Please fill in all delivery information.");
    return;
  }

  if (cart.length === 0) {
    setError("Your cart is empty.");
    return;
  }

  setProcessing(true);

  try {
    console.log("USER:", user.uid);
    console.log("EMAIL:", user.email);
    console.log("CART:", cart);
    console.log("SUBTOTAL:", subtotal);

    const orderData = {
      customer: {
        name: form.fullName.trim(),
        phone: form.phone.trim(),
        email: user.email || "",
      },

      delivery: {
        address: form.address.trim(),
        city: form.city.trim(),
      },

      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),

      subtotal: Number(subtotal),
      total: Number(subtotal),

      status: "placed",

      createdAt: serverTimestamp(),
    };

    console.log("ORDER DATA:", orderData);
    console.log("SENDING TO FIRESTORE...");

    console.log("DB OBJECT:", db);
console.log("DB PROJECT:", db.app.options.projectId);

    const orderRef = await addDoc(
      collection(
        db,
        "users",
        user.uid,
        "orders"
      ),
      orderData
    );

    console.log(
      "✅ ORDER SAVED:",
      orderRef.id
    );

    clearCart();

    console.log("✅ CART CLEARED");

    navigate("/orders");

  } catch (err) {
    console.error(
      "❌ REAL FIREBASE ERROR:"
    );

    console.error(err);

    console.error(
      "ERROR CODE:",
      err.code
    );

    console.error(
      "ERROR MESSAGE:",
      err.message
    );

    setError(
      `${err.code || "Firebase Error"}: ${
        err.message || "Unable to place order."
      }`
    );

  } finally {
    setProcessing(false);

    console.log(
      "========== ORDER FINISHED =========="
    );
  }
};

  // ================================
  // EMPTY CART
  // ================================

  if (cart.length === 0) {
    return (
      <Container className="section-space">

        <div className="empty-state text-center">

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            Please add products before
            going to checkout.
          </p>

          <Button
            variant="dark"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </Button>

        </div>

      </Container>
    );
  }

  // ================================
  // CHECKOUT UI
  // ================================

  return (
    <Container className="section-space">

      <div className="page-heading">

        <span className="eyebrow">
          MM Cosmetics
        </span>

        <h1>
          Checkout
        </h1>

        <p>
          Enter your delivery information
          to place your order.
        </p>

      </div>

      <div className="checkout-card">

        {error && (
          <Alert variant="danger">
            <strong>
              Order could not be placed:
            </strong>

            <br />

            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>

          <div className="row g-3">

            {/* NAME */}

            <div className="col-12 col-md-6">

              <Form.Label>
                Full Name
              </Form.Label>

              <Form.Control
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>

            {/* PHONE */}

            <div className="col-12 col-md-6">

              <Form.Label>
                Phone Number
              </Form.Label>

              <Form.Control
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                required
              />

            </div>

            {/* ADDRESS */}

            <div className="col-12">

              <Form.Label>
                Delivery Address
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your complete delivery address"
                required
              />

            </div>

            {/* CITY */}

            <div className="col-12 col-md-6">

              <Form.Label>
                City
              </Form.Label>

              <Form.Control
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
              />

            </div>

          </div>

          {/* TOTAL */}

          <div className="checkout-total mt-4">

            <span>
              Order Total
            </span>

            <strong>
              Rs.{" "}
              {Number(subtotal).toLocaleString()}
            </strong>

          </div>

          {/* PAYMENT */}

          <div className="alert alert-light mt-3">

            <strong>
              Payment:
            </strong>{" "}
            Demo checkout — no real payment
            will be taken.

          </div>

          {/* BUTTON */}

          <Button
            className="w-100 mt-3"
            variant="dark"
            type="submit"
            disabled={processing}
          >
            {processing
              ? "Placing Order..."
              : "Place Order"}
          </Button>

        </Form>

      </div>

    </Container>
  );
}