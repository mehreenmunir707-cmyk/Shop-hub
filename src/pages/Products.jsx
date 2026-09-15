import { useEffect, useMemo, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import { getProducts } from "../services/products";

export default function Products() {
  // ==========================================
  // STATES
  // ==========================================

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [sort, setSort] = useState("default");

  const [maxPrice, setMaxPrice] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchParams, setSearchParams] =
    useSearchParams();


  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      console.error(
        "Products API Error:",
        err
      );

      setError(
        "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOAD WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    loadProducts();
  }, []);


  // ==========================================
  // READ COLLECTION FROM URL
  // ==========================================

  useEffect(() => {
    const collection =
      searchParams.get("collection");

    if (collection) {
      setCategory(collection);
    } else {
      setCategory("all");
    }
  }, [searchParams]);


  // ==========================================
  // CREATE CATEGORIES
  // ==========================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map(
            (product) =>
              product.category
          )
          .filter(Boolean)
      ),
    ];

    return [
      "all",
      ...uniqueCategories,
    ];
  }, [products]);


  // ==========================================
  // FILTER + SEARCH + SORT
  // ==========================================

  const visibleProducts = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    let filteredProducts =
      products.filter((product) => {
        const title =
          product.title
            ?.toLowerCase() || "";

        const description =
          product.description
            ?.toLowerCase() || "";

        const tags =
          product.tags
            ?.join(" ")
            .toLowerCase() || "";

        // SEARCH
        const matchesSearch =
          !searchText ||
          title.includes(searchText) ||
          description.includes(searchText) ||
          tags.includes(searchText);

        // CATEGORY
        const matchesCategory =
          category === "all" ||
          product.category === category;

        // PRICE
        const matchesPrice =
          !maxPrice ||
          product.price <=
            Number(maxPrice);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice
        );
      });

    // ========================================
    // SORT
    // ========================================

    if (sort === "low") {
      filteredProducts.sort(
        (a, b) =>
          a.price - b.price
      );
    }

    if (sort === "high") {
      filteredProducts.sort(
        (a, b) =>
          b.price - a.price
      );
    }

    if (sort === "az") {
      filteredProducts.sort(
        (a, b) =>
          a.title.localeCompare(
            b.title
          )
      );
    }

    if (sort === "za") {
      filteredProducts.sort(
        (a, b) =>
          b.title.localeCompare(
            a.title
          )
      );
    }

    return filteredProducts;
  }, [
    products,
    search,
    category,
    sort,
    maxPrice,
  ]);


  // ==========================================
  // CATEGORY CHANGE
  // ==========================================

  const handleCategoryChange = (
    value
  ) => {
    setCategory(value);

    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({
        collection: value,
      });
    }
  };


  // ==========================================
  // RESET FILTERS
  // ==========================================

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
    setMaxPrice("");

    setSearchParams({});
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Container className="section-space">
        <Loader
          text="Loading products..."
        />
      </Container>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <Container className="section-space">

        <div className="empty-state">

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <Button
            variant="dark"
            onClick={loadProducts}
          >
            Try Again
          </Button>

        </div>

      </Container>
    );
  }


  // ==========================================
  // MAIN PAGE
  // ==========================================

  return (
    <div className="shop-all-page">

      {/* ======================================
          SHOP ALL HEADER
      ====================================== */}

      <section className="shop-all-header">

        <h1>
          SHOP ALL
        </h1>

        <div className="shop-all-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>
            ›
          </span>

          <strong>
            SHOP ALL
          </strong>

        </div>

      </section>


      {/* ======================================
          PRODUCTS AREA
      ====================================== */}

      <Container
        fluid
        className="shop-all-content"
      >

        {/* ====================================
            TOOLBAR
        ==================================== */}

        <div className="shop-all-toolbar">

          {/* FILTER */}

          <div className="shop-filter">

            <span className="filter-symbol">
              ☷
            </span>

            <span>
              Filter
            </span>

          </div>


          {/* VIEW BUTTONS */}

          <div className="view-buttons">

            <button
              type="button"
              className="view-btn active"
            >
              ▤
            </button>

            <button
              type="button"
              className="view-btn"
            >
              ▥
            </button>

            <button
              type="button"
              className="view-btn"
            >
              ▦
            </button>

            <button
              type="button"
              className="view-btn"
            >
              ▦
            </button>

            <button
              type="button"
              className="view-btn"
            >
              ▦
            </button>

            <button
              type="button"
              className="view-btn"
            >
              ▦
            </button>

          </div>


          {/* SORT */}

          <Form.Select
            className="shop-all-sort"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >

            <option value="default">
              Best selling
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="az">
              Alphabetically, A-Z
            </option>

            <option value="za">
              Alphabetically, Z-A
            </option>

          </Form.Select>

        </div>


        {/* ====================================
            FILTER BOX
        ==================================== */}

        <div className="shop-all-filter-box">

          <div className="row g-3">

            {/* SEARCH */}

            <div className="col-12 col-lg-4">

              <Form.Label>
                Search Products
              </Form.Label>

              <Form.Control
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search by product name..."
              />

            </div>


            {/* CATEGORY */}

            <div className="col-12 col-md-6 col-lg-3">

              <Form.Label>
                Category
              </Form.Label>

              <Form.Select
                value={category}
                onChange={(e) =>
                  handleCategoryChange(
                    e.target.value
                  )
                }
              >

                {categories.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item === "all"
                        ? "All Categories"
                        : item}
                    </option>
                  )
                )}

              </Form.Select>

            </div>


            {/* MAX PRICE */}

            <div className="col-12 col-md-6 col-lg-3">

              <Form.Label>
                Maximum Price
              </Form.Label>

              <Form.Control
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value
                  )
                }
                placeholder="e.g. 3000"
              />

            </div>


            {/* RESET */}

            <div className="col-12 col-lg-2 d-flex align-items-end">

              <Button
                variant="outline-dark"
                className="w-100"
                onClick={
                  resetFilters
                }
              >
                Reset
              </Button>

            </div>

          </div>

        </div>


        {/* ====================================
            RESULT COUNT
        ==================================== */}

        <div className="result-count shop-result-count">

          Showing{" "}

          <strong>
            {visibleProducts.length}
          </strong>

          {" "}of{" "}

          <strong>
            {products.length}
          </strong>

          {" "}products

        </div>


        {/* ====================================
            NO PRODUCTS
        ==================================== */}

        {visibleProducts.length === 0 ? (

          <div className="empty-state">

            <h3>
              No products found
            </h3>

            <p>
              Try another search or
              reset your filters.
            </p>

            <Button
              variant="dark"
              onClick={
                resetFilters
              }
            >
              Reset Filters
            </Button>

          </div>

        ) : (

          /* ==================================
             PRODUCT GRID
          ================================== */

          <div className="shop-product-grid">

            {visibleProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="shop-product-item"
                >

                  <ProductCard
                    product={product}
                  />

                </div>

              )
            )}

          </div>

        )}

      </Container>


      {/* ======================================
          WHATSAPP
      ====================================== */}

      <a
        href="https://wa.me/923453242436"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
      >
        <span>
          ☎
        </span>
      </a>

    </div>
  );
}