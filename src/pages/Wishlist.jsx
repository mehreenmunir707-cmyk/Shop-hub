import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  // =========================
  // EMPTY WISHLIST
  // =========================

  if (wishlist.length === 0) {
    return (
      <Container className="section-space">
        <div className="empty-state text-center">
          <h1>Your Wishlist is Empty</h1>

          <p>
            Save products you love and find them here later.
          </p>

          <Button
            as={Link}
            to="/products"
            variant="dark"
          >
            Explore Products
          </Button>
        </div>
      </Container>
    );
  }

  // =========================
  // WISHLIST
  // =========================

  return (
    <Container className="section-space">

      <div className="page-heading">
        <span className="eyebrow">
          Saved Items
        </span>

        <h1>Wishlist</h1>

        <p>
          Your favorite products are saved here.
        </p>
      </div>

      <div className="row g-4">

        {wishlist.map((product) => {

          // =========================
          // PRICE
          // =========================

          const price =
            Number(product.price) || 0;

          // =========================
          // IMAGE
          // =========================

          const image =
            product.image ||
            product.thumbnail ||
            product.images?.[0] ||
            "";

          return (
            <div
              className="col-12 col-sm-6 col-lg-4"
              key={product.id}
            >

              <div className="wishlist-card h-100">

                {/* =====================
                    IMAGE
                ===================== */}

                <div className="wishlist-image-wrapper">

                  {image ? (
                    <img
                      src={image}
                      alt={product.title}
                      className="wishlist-image"
                    />
                  ) : (
                    <div className="product-no-image">
                      No Image Available
                    </div>
                  )}

                </div>

                {/* =====================
                    PRODUCT INFO
                ===================== */}

                <div className="p-3">

                  <p className="product-category mb-1">
                    {product.category ||
                      "Cosmetics"}
                  </p>

                  <h5>
                    {product.title}
                  </h5>

                  {/* PRICE */}

                  <div className="product-price">

                    <strong>
                      Rs.{" "}
                      {price.toLocaleString()}
                    </strong>

                  </div>

                  {/* =====================
                      BUTTONS
                  ===================== */}

                  <div className="d-grid gap-2 mt-3">

                    <Button
                      variant="dark"
                      onClick={() => {
                        addItem({
                          ...product,
                          price: price,
                          thumbnail: image,
                          stock:
                            Number(
                              product.stock
                            ) > 0
                              ? Number(
                                  product.stock
                                )
                              : 99,
                        });
                      }}
                    >
                      Move to Cart
                    </Button>

                    <Button
                      variant="outline-danger"
                      onClick={() =>
                        removeFromWishlist(
                          product.id
                        )
                      }
                    >
                      Remove
                    </Button>

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </Container>
  );
}