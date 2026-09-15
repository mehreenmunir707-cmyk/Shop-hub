import React, { useState } from "react";
import "../styles/bestSeller.css";

import ProductCard from "../components/ProductCard";
import { customBestSellers } from "../data/customProducts";

function BestSeller() {
  const [sort, setSort] = useState("Featured");
  const [category, setCategory] = useState("All");

  // =====================================
  // FILTER
  // =====================================

  let filteredProducts =
    category === "All"
      ? [...customBestSellers]
      : customBestSellers.filter(
          (product) =>
            product.category === category
        );

  // =====================================
  // SORT
  // =====================================

  if (sort === "Price: Low to High") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "Price: High to Low") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "Name: A-Z") {
    filteredProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <main className="best-seller-page">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <section className="best-seller-header">

        <h1>
          <em>Best</em> Seller
        </h1>

        <div className="best-seller-breadcrumb">
          <a href="/">Home</a>

          <span>›</span>

          <strong>
            Best Seller
          </strong>
        </div>

      </section>

      {/* ================================= */}
      {/* PRODUCTS */}
      {/* ================================= */}

      <section className="best-products-section">

        {/* TOOLBAR */}

        <div className="best-products-toolbar">

          {/* FILTER */}

          <div className="best-filter-area">

            <span className="best-filter-icon">
              ☷
            </span>

            <span>
              Filter
            </span>

            <div className="best-filter-buttons">

              <button
                className={
                  category === "All"
                    ? "best-filter-active"
                    : ""
                }
                onClick={() =>
                  setCategory("All")
                }
              >
                All
              </button>

              <button
                className={
                  category === "Face Care"
                    ? "best-filter-active"
                    : ""
                }
                onClick={() =>
                  setCategory("Face Care")
                }
              >
                Face Care
              </button>

              <button
                className={
                  category === "Bundles"
                    ? "best-filter-active"
                    : ""
                }
                onClick={() =>
                  setCategory("Bundles")
                }
              >
                Bundles
              </button>

            </div>

          </div>

          {/* VIEW */}

          <div className="best-view-buttons">

            <button className="best-view-button active">
              ▦
            </button>

            <button className="best-view-button">
              ▦
            </button>

            <button className="best-view-button">
              ▦
            </button>

          </div>

          {/* SORT */}

          <select
            className="best-sort-select"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="Featured">
              Featured
            </option>

            <option value="Price: Low to High">
              Price:Low to High
            </option>

            <option value="Price: High to Low">
              Price:High to Low
            </option>

            <option value="Name: A-Z">
              Name:A-Z
            </option>

          </select>

        </div>

        {/* COUNT */}

        <div className="best-product-count">
          Showing{" "}
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          product(s)
        </div>

        {/* ================================= */}
        {/* PRODUCT GRID */}
        {/* ================================= */}

        <div className="best-products-grid">

          {filteredProducts.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )}

        </div>

      </section>

    </main>
  );
}

export default BestSeller;