import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

import logo from "../assets/logo.jpg";
import { getProducts } from "../services/products";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const { itemCount } = useCart();

  const { wishlist } = useWishlist();

  const [collectionOpen, setCollectionOpen] =
    useState(false);

  const [accountOpen, setAccountOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchText, setSearchText] =
    useState("");

  const [products, setProducts] = useState([]);

  const [searchLoading, setSearchLoading] =
    useState(false);

  // ================================
  // COLLECTIONS
  // ================================

  const collections = [
    "Face Serums",
    "Sunscreen",
    "Liquid Blush",
    "Creams",
    "Face Masks",
    "Face Wash & Cleanser",
    "Body Butter",
    "Body Wash",
    "Body Milk",
    "Lip & Cheek Tint",
    "Illuminator",
    "Hair Products",
    "Make-up",
  ];

  // ================================
  // LOAD PRODUCTS FOR SEARCH
  // ================================

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const loadSearchProducts = async () => {
      try {
        setSearchLoading(true);

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "Search products error:",
          error
        );
      } finally {
        setSearchLoading(false);
      }
    };

    loadSearchProducts();
  }, [searchOpen]);

  // ================================
  // SEARCH RESULTS
  // ================================

  const searchResults = searchText.trim()
    ? products
        .filter((product) => {
          const text =
            searchText.trim().toLowerCase();

          const title =
            product.title?.toLowerCase() || "";

          const category =
            product.category?.toLowerCase() || "";

          const tags =
            product.tags
              ?.join(" ")
              .toLowerCase() || "";

          return (
            title.includes(text) ||
            category.includes(text) ||
            tags.includes(text)
          );
        })
        .slice(0, 8)
    : [];

  // ================================
  // CLOSE SEARCH
  // ================================

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchText("");
  };

  // ================================
  // LOGOUT
  // ================================

  const handleLogout = async () => {
    try {
      await logout();

      setAccountOpen(false);
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }
  };

  // ================================
  // ESC KEY
  // ================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSearch();
        setAccountOpen(false);
        setCollectionOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  return (
    <>
      <header className="header-container">

        {/* ======================================
            TOP BANNER
        ====================================== */}

        <div className="navbar-top-banner">
          Free Shipping on Orders Over PKR 4000
        </div>

        {/* ======================================
            MAIN NAVBAR
        ====================================== */}

        <nav className="navbar-main">

          {/* LOGO */}

          <Link
            to="/"
            className="navbar-logo-container"
          >
            <img
              src={logo}
              alt="MM Cosmetics"
              className="navbar-logo-image"
            />
          </Link>

          {/* ====================================
              NAVIGATION
          ==================================== */}

          <ul className="navbar-nav-links">

            {/* BESTSELLERS */}

            <li>
              <Link
                to="/best-sellers"
                className="navbar-nav-link"
              >
                Bestsellers
              </Link>
            </li>

            {/* BUNDLES */}

            <li>
              <Link
                to="/bundles"
                className="navbar-nav-link"
              >
                Bundles
              </Link>
            </li>

            {/* SHOP ALL */}

            <li>
              <Link
                to="/products"
                className="navbar-nav-link"
              >
                Shop All
              </Link>
            </li>

            {/* SHOP BY COLLECTION */}

            <li className="collection-menu">

              <button
                type="button"
                className="collection-menu-button"
                onClick={() =>
                  setCollectionOpen(
                    (previous) => !previous
                  )
                }
              >
                Shop By Collection
              </button>

              {collectionOpen && (
                <div className="collection-dropdown">

                  {collections.map(
                    (collection) => (
                      <Link
                        key={collection}
                        to={`/products?collection=${encodeURIComponent(
                          collection
                        )}`}
                        className="collection-dropdown-item"
                        onClick={() =>
                          setCollectionOpen(false)
                        }
                      >
                        {collection}
                      </Link>
                    )
                  )}

                </div>
              )}

            </li>

            {/* BYOB */}

            <li>
              <Link
                to="/byob"
                className="navbar-nav-link"
              >
                BYOB
              </Link>
            </li>

          </ul>

          {/* ====================================
              ICONS
          ==================================== */}

          <div className="navbar-icons">

            {/* ====================================
                SEARCH
            ==================================== */}

            <button
              type="button"
              className="navbar-icon-btn"
              aria-label="Search"
              onClick={() =>
                setSearchOpen(true)
              }
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />
              </svg>
            </button>

            {/* ====================================
                WISHLIST
            ==================================== */}

            <Link
              to="/wishlist"
              className="navbar-icon-btn wishlist-navbar-icon"
              aria-label="Wishlist"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>

              {wishlist.length > 0 && (
                <span className="wishlist-badge">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* ====================================
                ACCOUNT
            ==================================== */}

            <div className="navbar-account-wrapper">

              <button
                type="button"
                className="navbar-icon-btn"
                aria-label="Account"
                onClick={() =>
                  setAccountOpen(
                    (previous) => !previous
                  )
                }
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  />

                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                  />
                </svg>
              </button>

              {/* ACCOUNT DROPDOWN */}

              {accountOpen && (
                <div className="account-dropdown">

                  {user ? (
                    <>
                      <div className="account-user-info">

                        <strong>
                          {user.displayName ||
                            "My Account"}
                        </strong>

                        <span>
                          {user.email}
                        </span>

                      </div>

                      <Link
                        to="/orders"
                        className="account-dropdown-item"
                        onClick={() =>
                          setAccountOpen(false)
                        }
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/wishlist"
                        className="account-dropdown-item"
                        onClick={() =>
                          setAccountOpen(false)
                        }
                      >
                        My Wishlist
                      </Link>

                      <button
                        type="button"
                        className="account-logout-button"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="account-user-info">

                        <strong>
                          Welcome
                        </strong>

                        <span>
                          Login to your account
                        </span>

                      </div>

                      <Link
                        to="/login"
                        className="account-dropdown-item"
                        onClick={() =>
                          setAccountOpen(false)
                        }
                      >
                        Login
                      </Link>

                      <Link
                        to="/signup"
                        className="account-dropdown-item"
                        onClick={() =>
                          setAccountOpen(false)
                        }
                      >
                        Create Account
                      </Link>
                    </>
                  )}

                </div>
              )}

            </div>

            {/* ====================================
                CART
            ==================================== */}

            <Link
              to="/cart"
              className="navbar-icon-btn cart-icon"
              aria-label="Cart"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="9"
                  cy="21"
                  r="1"
                />

                <circle
                  cx="20"
                  cy="21"
                  r="1"
                />

                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                />
              </svg>

              {itemCount > 0 && (
                <span className="cart-badge">
                  {itemCount}
                </span>
              )}
            </Link>

          </div>

        </nav>

      </header>

      {/* ========================================
          SEARCH OVERLAY
      ======================================== */}

      {searchOpen && (
        <div className="search-overlay">

          {/* DARK BACKGROUND */}

          <div
            className="search-overlay-background"
            onClick={closeSearch}
          />

          {/* SEARCH DRAWER */}

          <aside className="search-drawer">

            {/* HEADER */}

            <div className="search-drawer-header">

              <h2>
                SEARCH OUR SITE
              </h2>

              <button
                type="button"
                className="search-close-btn"
                onClick={closeSearch}
                aria-label="Close search"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <line
                    x1="5"
                    y1="5"
                    x2="19"
                    y2="19"
                  />

                  <line
                    x1="19"
                    y1="5"
                    x2="5"
                    y2="19"
                  />
                </svg>
              </button>

            </div>

            {/* CONTENT */}

            <div className="search-drawer-content">

              {/* CATEGORY */}

              <div className="search-category-box">
                <span>
                  All Categories
                </span>

                <span className="search-chevron">
                  ⌄
                </span>
              </div>

              {/* SEARCH INPUT */}

              <div className="search-input-box">

                <input
                  type="text"
                  autoFocus
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(
                      e.target.value
                    )
                  }
                  placeholder="Search"
                />

                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                  />

                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                  />
                </svg>

              </div>

              {/* SEARCH RESULTS */}

              {searchText.trim() && (
                <div className="search-results">

                  {searchLoading ? (
                    <p className="search-message">
                      Searching...
                    </p>
                  ) : searchResults.length >
                    0 ? (
                    searchResults.map(
                      (product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          className="search-result-item"
                          onClick={closeSearch}
                        >

                          <div className="search-result-image">

                            {product.image ? (
                              <img
                                src={
                                  product.image
                                }
                                alt={
                                  product.title
                                }
                              />
                            ) : (
                              <span>
                                No Image
                              </span>
                            )}

                          </div>

                          <div className="search-result-info">

                            <h3>
                              {product.title}
                            </h3>

                            <p>
                              Rs.{" "}
                              {Number(
                                product.price ||
                                  0
                              ).toLocaleString()}
                            </p>

                          </div>

                        </Link>
                      )
                    )
                  ) : (
                    <p className="search-message">
                      No products found.
                    </p>
                  )}

                </div>
              )}

            </div>

          </aside>

        </div>
      )}
    </>
  );
}