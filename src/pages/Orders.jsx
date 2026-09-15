import { useEffect, useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================================
  // LOAD ORDERS
  // ================================

  useEffect(() => {
    let active = true;

    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const ordersQuery = query(
          collection(
            db,
            "users",
            user.uid,
            "orders"
          ),
          orderBy("createdAt", "desc")
        );

        const snapshot =
          await getDocs(ordersQuery);

        if (!active) return;

        const orderList = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setOrders(orderList);

      } catch (err) {
        console.error(
          "Orders Error:",
          err
        );

        if (active) {
          setError(
            err.message ||
              "Unable to load order history."
          );
        }

      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      active = false;
    };
  }, [user.uid]);

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <Container className="section-space">
        <Loader text="Loading orders..." />
      </Container>
    );
  }

  // ================================
  // PAGE
  // ================================

  return (
    <Container className="section-space">

      {/* HEADING */}

      <div className="page-heading">

        <span className="eyebrow">
          Account
        </span>

        <h1>
          Order History
        </h1>

        <p>
          Your orders are stored under your
          own Firebase user path.
        </p>

      </div>

      {/* ERROR */}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {/* NO ORDERS */}

      {!error && orders.length === 0 && (
        <div className="empty-state">

          <h3>
            No orders yet
          </h3>

          <p>
            Your completed orders will
            appear here.
          </p>

        </div>
      )}

      {/* ORDERS */}

      {!error && orders.length > 0 && (

        <div className="orders-list">

          {orders.map((order) => (

            <Card
              className="order-card mb-3"
              key={order.id}
            >

              <Card.Body>

                {/* ORDER HEADER */}

                <div className="d-flex flex-wrap justify-content-between gap-2">

                  <div>

                    <h5>
                      Order #{order.id}
                    </h5>

                    <p className="mb-1">
                      Status:{" "}
                      <strong>
                        {order.status}
                      </strong>
                    </p>

                    <p className="text-muted mb-3">

                      {order.createdAt?.toDate
                        ? order.createdAt
                            .toDate()
                            .toLocaleString()
                        : "Date pending"}

                    </p>

                  </div>

                  {/* TOTAL */}

                  <h4>
                    Rs.{" "}
                    {Number(
                      order.total || 0
                    ).toLocaleString()}
                  </h4>

                </div>

                {/* PRODUCTS */}

                <ul className="mb-0">

                  {(order.items || []).map(
                    (item, index) => (

                      <li
                        key={`${item.id}-${index}`}
                      >

                        {item.title} ×{" "}
                        {item.quantity}

                        {" — "}

                        Rs.{" "}
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString()}

                      </li>

                    )
                  )}

                </ul>

              </Card.Body>

            </Card>

          ))}

        </div>

      )}

    </Container>
  );
}