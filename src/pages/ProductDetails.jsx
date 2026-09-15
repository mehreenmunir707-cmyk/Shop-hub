import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { getProductById } from "../services/products";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import { getCustomProductById } from "../data/customProducts";

import "../styles/productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const { addItem } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  // =====================================
  // LOAD PRODUCT
  // =====================================

  useEffect(() => {
    const controller = new AbortController();

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setQuantity(1);

        // ---------------------------------
        // 1. FIRST CHECK CUSTOM PRODUCTS
        // ---------------------------------

        const customProduct = getCustomProductById(id);

        if (customProduct) {
          console.log("CUSTOM PRODUCT:", customProduct);

          setProduct(customProduct);
          setLoading(false);

          return;
        }

        // ---------------------------------
        // 2. IF NOT CUSTOM, CHECK API
        // ---------------------------------

        const data = await getProductById(
          id,
          controller.signal
        );

        if (!data) {
          throw new Error("Product not found");
        }

        console.log("API PRODUCT:", data);

        setProduct(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(
            "Product Details Error:",
            err
          );

          setError(
            err.message ||
              "Product could not be loaded."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

    return () => controller.abort();
  }, [id]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <Container className="section-space">
        <Loader text="Loading product..." />
      </Container>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (error || !product) {
    return (
      <Container className="section-space">
        <div className="empty-state text-center">

          <h2>Product Not Found</h2>

          <p>
            {error ||
              "This product could not be found."}
          </p>

          <Button
            as={Link}
            to="/products"
            variant="dark"
          >
            Back to Products
          </Button>

        </div>
      </Container>
    );
  }

  // =====================================
  // PRODUCT DATA
  // =====================================

  const price =
    Number(product.price) || 0;

  const oldPrice =
    Number(product.oldPrice) || 0;

  const stock =
    Number(product.stock);

  const maxQuantity =
    stock > 0
      ? stock
      : product.available
      ? 10
      : 0;

  const category =
    product.category ||
    "Cosmetics";

  const brand =
    product.brand ||
    "MM Cosmetics";

  const description =
    product.description ||
    "A quality product from MM Cosmetics.";

  const mainImage =
    product.images?.[0] ||
    product.image ||
    product.thumbnail ||
    "";

  // =====================================
  // WISHLIST STATUS
  // =====================================

  const saved = wishlist.some(
    (item) =>
      String(item.id) ===
      String(product.id)
  );

  // =====================================
  // QUANTITY
  // =====================================

  const increase = () => {
    setQuantity((current) =>
      Math.min(
        current + 1,
        maxQuantity
      )
    );
  };

  const decrease = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  // =====================================
  // ADD TO CART
  // =====================================

  const handleAddToCart = () => {
    addItem(
      {
        ...product,

        // IMPORTANT
        // Custom products use "name"
        // API products use "title"
        title:
          product.title ||
          product.name ||
          "Product",

        price,

        thumbnail:
          product.thumbnail ||
          product.image ||
          mainImage,

        stock:
          stock > 0
            ? stock
            : 99,
      },
      quantity
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  // =====================================
  // UI
  // =====================================

  return (
    <Container className="section-space">

      {/* BACK */}

      <Link
        to="/products"
        className="back-link"
      >
        ← Back to Products
      </Link>

      {/* DETAILS CARD */}

      <div className="details-card mt-4">

        <div className="row g-5">

          {/* ================================= */}
          {/* IMAGE */}
          {/* ================================= */}

          <div className="col-12 col-lg-6">

            <div className="details-image-wrapper">

              {mainImage ? (
                <img
                  src={mainImage}
                  alt={
                    product.title ||
                    product.name
                  }
                  className="details-image"
                />
              ) : (
                <div className="product-no-image">
                  No Image Available
                </div>
              )}

            </div>

          </div>

          {/* ================================= */}
          {/* INFORMATION */}
          {/* ================================= */}

          <div className="col-12 col-lg-6">

            {/* CATEGORY */}

            <span className="eyebrow text-capitalize">
              {category}
            </span>

            {/* TITLE */}

            <h1 className="mt-2">
              {product.title ||
                product.name}
            </h1>

            {/* PRICE */}

            <div className="details-price-box">

              <strong>
                Rs.{" "}
                {price.toLocaleString()}
              </strong>

              {oldPrice > price && (
                <del>
                  Rs.{" "}
                  {oldPrice.toLocaleString()}
                </del>
              )}

            </div>

            {/* BRAND */}

            <p>
              <strong>
                Brand:
              </strong>{" "}
              {brand}
            </p>

            {/* CATEGORY */}

            <p>
              <strong>
                Category:
              </strong>{" "}
              {category}
            </p>

            {/* AVAILABILITY */}

            <p>
              <strong>
                Availability:
              </strong>{" "}

              {maxQuantity > 0 ? (
                <span className="text-success">
                  In Stock
                </span>
              ) : (
                <span className="text-danger">
                  Out of Stock
                </span>
              )}
            </p>

            {/* ================================= */}
            {/* OUT OF STOCK */}
            {/* ================================= */}

            {maxQuantity === 0 ? (

              <div className="alert alert-warning mt-4">
                This product is currently
                out of stock.
              </div>

            ) : (

              <>

                {/* ================================= */}
                {/* QUANTITY */}
                {/* ================================= */}

                <div className="quantity-control mt-4">

                  <Button
                    variant="outline-dark"
                    onClick={decrease}
                    disabled={
                      quantity <= 1
                    }
                  >
                    −
                  </Button>

                  <span>
                    {quantity}
                  </span>

                  <Button
                    variant="outline-dark"
                    onClick={increase}
                    disabled={
                      quantity >=
                      maxQuantity
                    }
                  >
                    +
                  </Button>

                </div>

                {/* ================================= */}
                {/* BUTTONS */}
                {/* ================================= */}

                <div className="d-flex flex-wrap gap-2 mt-4">

                  {/* ADD TO CART */}

                  <Button
                    variant="dark"
                    size="lg"
                    onClick={
                      handleAddToCart
                    }
                  >
                    {added
                      ? "✓ Added to Cart"
                      : "Add to Cart"}
                  </Button>

                  {/* WISHLIST */}

                  <Button
                    variant={
                      saved
                        ? "danger"
                        : "outline-danger"
                    }
                    size="lg"
                    onClick={() =>
                      toggleWishlist({
                        ...product,

                        title:
                          product.title ||
                          product.name,

                        price,

                        thumbnail:
                          product.thumbnail ||
                          product.image ||
                          mainImage,

                        stock:
                          stock > 0
                            ? stock
                            : 99,
                      })
                    }
                  >
                    {saved
                      ? "♥ Saved"
                      : "♡ Add to Wishlist"}
                  </Button>
                             
                        </div>     
            {/* DESCRIPTION */}

            <div className="details-description">

              <h5>
                Product Description
              </h5>

              <div
                dangerouslySetInnerHTML={{
                  __html:
                    description,
                }}
              />

            </div>
                

              </>

            )}

          </div>

        </div>

      </div>

    </Container>
  );
}