import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import "../styles/productCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [added, setAdded] = useState(false);

  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;

  const image =
    product.image ||
    product.thumbnail ||
    product.images?.[0] ||
    "";

  const saved = wishlist.some(
    (item) =>
      String(item.id) === String(product.id)
  );

  // =========================
  // OPEN PRODUCT DETAILS
  // =========================

  const openDetails = () => {
    navigate(`/products/${product.id}`);
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (e) => {
    // Card click ko stop karega
    e.stopPropagation();

    addItem(
      {
        ...product,
        price,
        thumbnail: image,
        stock:
          Number(product.stock) > 0
            ? Number(product.stock)
            : 99,
      },
      1
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  // =========================
  // WISHLIST
  // =========================

  const handleWishlist = (e) => {
    // Card click ko stop karega
    e.stopPropagation();

    toggleWishlist({
      ...product,
      price,
      thumbnail: image,
      stock:
        Number(product.stock) > 0
          ? Number(product.stock)
          : 99,
    });
  };

  // =========================
  // UI
  // =========================

  return (
    <div
      className="product-card"
      onClick={openDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          openDetails();
        }
      }}
    >

      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <div className="product-image-wrapper">

        {/* WISHLIST ICON */}

        <button
          type="button"
          className={`wishlist-icon ${
            saved ? "saved" : ""
          }`}
          onClick={handleWishlist}
          aria-label={
            saved
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          {saved ? "♥" : "♡"}
        </button>

        {/* IMAGE */}

        {image ? (
          <img
            src={image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        ) : (
          <div className="product-no-image">
            No Image Available
          </div>
        )}

      </div>

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}

      <div className="product-card-body">

        <p className="product-category">
          {product.category || "Cosmetics"}
        </p>

        <h3 className="product-title">
          {product.title}
        </h3>

        <div className="product-price">

          <strong>
            Rs. {price.toLocaleString()}
          </strong>

          {oldPrice > price && (
            <del>
              Rs. {oldPrice.toLocaleString()}
            </del>
          )}

        </div>

        {/* ADD TO CART */}

        <Button
          variant="dark"
          className="w-100 mt-3"
          onClick={handleAddToCart}
        >
          {added
            ? "✓ Added to Cart"
            : "Add to Cart"}
        </Button>

      </div>

    </div>
  );
}