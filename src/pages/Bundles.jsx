import React, { useState } from "react";

import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

import { customBundles } from "../data/customProducts";

import "../styles/bundles.css";

export default function Bundles() {
  const [sort, setSort] = useState("Featured");

  // =====================================
  // COPY BUNDLES
  // =====================================

  let displayedBundles = [
    ...customBundles,
  ];

  // =====================================
  // SORT
  // =====================================

  if (sort === "Price: Low to High") {
    displayedBundles.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "Price: High to Low") {
    displayedBundles.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "Name: A-Z") {
    displayedBundles.sort(
      (a, b) =>
        a.title.localeCompare(b.title)
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <main className="bundles-page">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <section className="bundles-header">

        <h1>
          SKIN CARE BUNDLES
        </h1>

        <div className="bundles-breadcrumb">

          <Link to="/">
            Home
          </Link>

          <span>
            ›
          </span>

          <strong>
            SKIN CARE BUNDLES
          </strong>

        </div>

      </section>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <section className="bundles-content">

        {/* ================================= */}
        {/* TOOLBAR */}
        {/* ================================= */}

        <div className="bundles-toolbar">

          {/* FILTER */}

          <div className="bundles-filter">

            <span className="filter-symbol">
              ♧
            </span>

            <span>
              Filter
            </span>

          </div>

          {/* VIEW ICONS */}

          <div className="bundles-view-icons">

            <button className="view-icon active">
              ▬
            </button>

            <button className="view-icon">
              ▮▮
            </button>

            <button className="view-icon">
              ▮▮▮
            </button>

            <button className="view-icon">
              ▮▮▮▮
            </button>

            <button className="view-icon">
              ▮▮▮▮▮
            </button>

            <button className="view-icon">
              ▮▮▮▮▮▮
            </button>

          </div>

          {/* SORT */}

          <select
            className="bundles-sort"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >

            <option value="Featured">
              Featured
            </option>

            <option value="Price: Low to High">
              Price: Low to High
            </option>

            <option value="Price: High to Low">
              Price: High to Low
            </option>

            <option value="Name: A-Z">
              Name: A-Z
            </option>

          </select>

        </div>

        {/* ================================= */}
        {/* PRODUCT COUNT */}
        {/* ================================= */}

        <div className="bundles-product-count">
          Showing{" "}
          <strong>
            {displayedBundles.length}
          </strong>{" "}
          product(s)
        </div>

        {/* ================================= */}
        {/* BUNDLE GRID */}
        {/* ================================= */}

        <div className="bundles-grid">

          {displayedBundles.map(
            (bundle) => (

              <ProductCard
                key={bundle.id}
                product={bundle}
              />

            )
          )}

        </div>

      </section>

    </main>
  );
}