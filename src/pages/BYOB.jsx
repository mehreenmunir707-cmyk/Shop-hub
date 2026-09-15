import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import Loader from "../components/Loader";
import { getProducts } from "../services/products";

export default function Bundles() {
  // ==========================================
  // STATES
  // ==========================================

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [bundleItems, setBundleItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        // Sirf image wale products
        const productsWithImages =
          data.filter(
            (product) => product.image
          );

        setProducts(productsWithImages);
      } catch (err) {
        console.error(
          "Bundle API Error:",
          err
        );

        setError(
          "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);


  // ==========================================
  // SEARCH
  // ==========================================

  const filteredProducts = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    if (!searchText) {
      return products;
    }

    return products.filter(
      (product) =>
        product.title
          ?.toLowerCase()
          .includes(searchText)
    );
  }, [products, search]);


  // ==========================================
  // ADD TO BUNDLE
  // ==========================================

  const addToBundle = (product) => {
    setBundleItems((currentItems) => {
      const alreadyAdded =
        currentItems.some(
          (item) =>
            item.id === product.id
        );

      if (alreadyAdded) {
        return currentItems;
      }

      return [
        ...currentItems,
        product,
      ];
    });
  };


  // ==========================================
  // REMOVE FROM BUNDLE
  // ==========================================

  const removeFromBundle = (id) => {
    setBundleItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };


  // ==========================================
  // DISCOUNT
  // ==========================================

  const getDiscountPercent = () => {
    const count =
      bundleItems.length;

    if (count >= 5) {
      return 20;
    }

    if (count === 4) {
      return 15;
    }

    if (count === 3) {
      return 10;
    }

    if (count === 2) {
      return 5;
    }

    return 0;
  };


  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = bundleItems.reduce(
    (total, product) =>
      total +
      Number(product.price || 0),
    0
  );


  // ==========================================
  // DISCOUNT AMOUNT
  // ==========================================

  const discountPercent =
    getDiscountPercent();

  const discountAmount =
    (subtotal * discountPercent) /
    100;


  // ==========================================
  // TOTAL
  // ==========================================

  const total =
    subtotal - discountAmount;


  // ==========================================
  // FORMAT PRICE
  // ==========================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString(
      "en-PK"
    );
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="bundle-page">

        <div className="bundle-loading">
          <Loader
            text="Loading bundle products..."
          />
        </div>

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="bundle-page">

        <Container className="section-space">

          <div className="empty-state">

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

          </div>

        </Container>

      </div>
    );
  }


  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <div className="bundle-page">

      {/* ======================================
          BREADCRUMB
      ====================================== */}

      <div className="bundle-breadcrumb-bar">

        <div className="bundle-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>›</span>

          <strong>
            Build Your Own Bundle
          </strong>

        </div>

      </div>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <Container className="bundle-container">

        <div className="bundle-layout">

          {/* ==================================
              LEFT SIDE
          ================================== */}

          <main className="bundle-products-area">

            {/* TITLE */}

            <div className="bundle-heading">

              <h1>
                Build Your Perfect Bundle
              </h1>

              <p>
                Choose your favorites and
                unlock exclusive discounts!
              </p>

            </div>


            {/* SEARCH */}

            <div className="bundle-search">

              <span>
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search products..."
              />

            </div>


            {/* PRODUCTS */}

            <div className="bundle-product-grid">

              {filteredProducts.map(
                (product) => {

                  const added =
                    bundleItems.some(
                      (item) =>
                        item.id ===
                        product.id
                    );

                  return (
                    <div
                      className="bundle-product-card"
                      key={product.id}
                    >

                      {/* IMAGE */}

                      <Link
                        to={`/products/${product.id}`}
                        className="bundle-product-image"
                      >

                        <img
                          src={product.image}
                          alt={product.title}
                        />

                      </Link>


                      {/* INFO */}

                      <div className="bundle-product-info">

                        <h3>
                          {product.title}
                        </h3>


                        {/* PRICE */}

                        <div className="bundle-price">

                          {product.oldPrice >
                            product.price && (
                            <del>
                              PKR{" "}
                              {formatPrice(
                                product.oldPrice
                              )}
                            </del>
                          )}

                          <span>
                            PKR{" "}
                            {formatPrice(
                              product.price
                            )}
                          </span>

                        </div>


                        {/* BUTTON */}

                        <button
                          type="button"
                          className={
                            added
                              ? "bundle-add-button added"
                              : "bundle-add-button"
                          }
                          onClick={() =>
                            addToBundle(
                              product
                            )
                          }
                          disabled={added}
                        >

                          {added
                            ? "Added to Bundle"
                            : "Add to Bundle"}

                        </button>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </main>


          {/* ==================================
              RIGHT SUMMARY
          ================================== */}

          <aside className="bundle-summary">

            <div className="bundle-summary-title">

              <h2>
                Bundle summary
                {" "}
                ({bundleItems.length})
              </h2>

            </div>


            {/* DISCOUNT OPTIONS */}

            <div className="bundle-discounts">

              <div>
                <strong>
                  2 items
                </strong>

                <span>
                  5% off
                </span>
              </div>

              <div>
                <strong>
                  3 items
                </strong>

                <span>
                  10% off
                </span>
              </div>

              <div>
                <strong>
                  4 items
                </strong>

                <span>
                  15% off
                </span>
              </div>

              <div>
                <strong>
                  5 items
                </strong>

                <span>
                  20% off
                </span>
              </div>

            </div>


            {/* SELECTED PRODUCTS */}

            <div className="bundle-selected">

              {bundleItems.length === 0 ? (

                <div className="bundle-empty">

                  <p>
                    Your bundle is empty.
                  </p>

                  <span>
                    Add products to create
                    your bundle.
                  </span>

                </div>

              ) : (

                bundleItems.map(
                  (product) => (

                    <div
                      className="bundle-selected-item"
                      key={product.id}
                    >

                      <img
                        src={product.image}
                        alt={product.title}
                      />

                      <div className="bundle-selected-info">

                        <h4>
                          {product.title}
                        </h4>

                        <span>
                          PKR{" "}
                          {formatPrice(
                            product.price
                          )}
                        </span>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromBundle(
                            product.id
                          )
                        }
                        className="bundle-remove"
                      >
                        ×
                      </button>

                    </div>

                  )
                )

              )}

            </div>


            {/* TOTALS */}

            <div className="bundle-totals">

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  PKR{" "}
                  {formatPrice(
                    subtotal
                  )}
                </strong>

              </div>


              <div>

                <span>
                  Bundle discount
                </span>

                <strong>
                  -PKR{" "}
                  {formatPrice(
                    discountAmount
                  )}
                </strong>

              </div>


              <div className="bundle-total">

                <span>
                  Total
                </span>

                <strong>
                  PKR{" "}
                  {formatPrice(
                    total
                  )}
                </strong>

              </div>

            </div>


            {/* CART BUTTON */}

            <button
              type="button"
              className="bundle-cart-button"
              disabled={
                bundleItems.length === 0
              }
            >
              Add Bundle to cart
            </button>

          </aside>

        </div>

      </Container>

    </div>
  );
}