import React from "react";
import "../styles/exploreAllProducts.css";

// Images
import underEye from "../assets/under-eye.jpg";
import multiActionNightRepair from "../assets/multi-action-night-repair.jpg";
import brighteningSerum from "../assets/brightening-serum.jpg";
import glowingSkinSerum from "../assets/glowing-skin-serum.jpg";
import riceSerum from "../assets/rice-serum.jpg";


const products = [
  {
    id: 1,
    name: "Multi-Action Night Repair Face Serum - 30 ML",
    image: multiActionNightRepair,
    price: "Rs.1,799",
    oldPrice: "Rs.3,550",
  },

  {
    id: 2,
    name: "Brightening Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,799",
    oldPrice: "Rs.3,550",
  },

  {
    id: 3,
    name: "Glowing Skin Serum - 30 ML",
    image: glowingSkinSerum,
    price: "Rs.1,799",
    oldPrice: "Rs.3,550",
  },

  {
    id: 4,
    name: "Rice Serum",
    image: riceSerum,
    price: "Rs.1,899",
    oldPrice: "Rs.4,000",
  },
];


function ExploreAllProducts() {
  return (
    <section className="explore-products-section">

      {/* =========================
          HEADER
      ========================= */}

      <div className="explore-header">

        <h2>
          <em>Explore all</em> Products
        </h2>

        <a
          href="/products"
          className="explore-view-all"
        >
          View All Products
          <span>→</span>
        </a>

      </div>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="explore-products-layout">


        {/* =========================
            LARGE FEATURED CARD
        ========================= */}

        <div className="explore-featured-card">

          <img
            src={underEye}
            alt="Explore skincare products"
          />

          <div className="explore-featured-overlay">

            <p>
              Discover skincare crafted to
              <br />
              nourish, restore, and elevate your
              <br />
              everyday routine.
            </p>

          </div>

        </div>


        {/* =========================
            PRODUCT GRID
        ========================= */}

        <div className="explore-product-grid">

          {products.map((product) => (

            <div
              className="explore-product-card"
              key={product.id}
            >

              {/* Product Image */}

              <div className="explore-product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>


              {/* Product Name */}

              <h3>
                {product.name}
              </h3>


              {/* Orange Line */}

              <div className="explore-orange-line"></div>


              {/* Price */}

              <div className="explore-price">

                <span>
                  {product.price}
                </span>

                <del>
                  {product.oldPrice}
                </del>

              </div>


              {/* Cart Button */}

              <button className="explore-cart-btn">
                ADD TO CART
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}


export default ExploreAllProducts;