import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeItem,
    subtotal,
  } = useCart();

  // Empty cart
  if (cart.length === 0) {
    return (
      <Container className="section-space">
        <div className="empty-state">
          <h1>Your Cart is Empty</h1>

          <p>
            Add some products to your cart before
            checkout.
          </p>

          <Button
            as={Link}
            to="/products"
            variant="dark"
          >
            Browse Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="section-space">

      {/* Heading */}
      <div className="page-heading">
        <span className="eyebrow">
          Shopping Bag
        </span>

        <h1>Your Cart</h1>

        <p>
          Review your products before checkout.
        </p>
      </div>

      {/* Cart table */}
      <div className="table-responsive">
        <Table
          hover
          className="align-middle cart-table"
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>

                {/* Product */}
                <td>
                  <div className="cart-product">

                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    ) : (
                      <div
                        style={{
                          width: "70px",
                          height: "70px",
                          background: "#f3f3f3",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "8px",
                        }}
                      >
                        No Image
                      </div>
                    )}

                    <span>
                      {item.title}
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td>
                  Rs.{" "}
                  {Number(item.price).toLocaleString()}
                </td>

                {/* Quantity */}
                <td>
                  <input
                    className="quantity-input"
                    type="number"
                    min="1"
                    max={item.stock || 99}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        e.target.value
                      )
                    }
                  />
                </td>

                {/* Total */}
                <td>
                  Rs.{" "}
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toLocaleString()}
                </td>

                {/* Remove */}
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Remove
                  </Button>
                </td>

              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Summary */}
      <div className="cart-summary">

        <div>
          <span>Subtotal</span>

          <strong>
            Rs. {subtotal.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Delivery</span>

          <strong>Free</strong>
        </div>

        <hr />

        <div className="summary-total">
          <span>Total</span>

          <strong>
            Rs. {subtotal.toLocaleString()}
          </strong>
        </div>

        <Button
          as={Link}
          to="/checkout"
          variant="dark"
          className="w-100 mt-3"
        >
          Proceed to Checkout
        </Button>

      </div>

    </Container>
  );
}