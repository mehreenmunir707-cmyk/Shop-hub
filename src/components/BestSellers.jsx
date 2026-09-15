import React from "react";
import "./bestSellers.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  A11y,
} from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Product Images
import dayNightCombo from "../assets/DayNightCombo.jpg";
import brighteningSerum from "../assets/brightening-serum.jpg";
import multiActionNightRepair from "../assets/multi-action-night-repair.jpg";
import dailySkinCare from "../assets/daily-skin-care.jpg";


const products = [
  {
    id: 1,
    name: "Day & Night Combo Bundle",
    image: dayNightCombo,
    price: "Rs.2,999",
    oldPrice: "Rs.3,598",
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
    name: "Multi-Action Night Repair Face Serum - 30 ML",
    image: multiActionNightRepair,
    price: "Rs.1,799",
    oldPrice: "Rs.3,550",
  },

  {
    id: 4,
    name: "Daily Skin Care Bundle",
    image: dailySkinCare,
    price: "Rs.4,000",
    oldPrice: "Rs.13,000",
  },

  {
    id: 5,
    name: "Vitamin C Face Serum",
    image: brighteningSerum,
    price: "Rs.1,999",
    oldPrice: "Rs.3,200",
  },

  {
    id: 6,
    name: "Clear Skin Bundle",
    image: dailySkinCare,
    price: "Rs.3,499",
    oldPrice: "Rs.6,500",
  },

  {
    id: 7,
    name: "Hydrating Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,899",
    oldPrice: "Rs.3,000",
  },

  {
    id: 8,
    name: "Anti-Aging Face Serum - 30 ML",
    image: multiActionNightRepair,
    price: "Rs.2,199",
    oldPrice: "Rs.4,000",
  },

  {
    id: 9,
    name: "Glow Boost Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,699",
    oldPrice: "Rs.3,000",
  },

  {
    id: 10,
    name: "Pore Minimizing Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,799",
    oldPrice: "Rs.3,200",
  },

  {
    id: 11,
    name: "Soothing Face Serum - 30 ML",
    image: multiActionNightRepair,
    price: "Rs.1,899",
    oldPrice: "Rs.3,500",
  },

  {
    id: 12,
    name: "Revitalizing Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.2,099",
    oldPrice: "Rs.3,800",
  },

  {
    id: 13,
    name: "Nourishing Face Serum - 30 ML",
    image: dailySkinCare,
    price: "Rs.1,999",
    oldPrice: "Rs.3,500",
  },

  {
    id: 14,
    name: "Firming Face Serum - 30 ML",
    image: multiActionNightRepair,
    price: "Rs.2,299",
    oldPrice: "Rs.4,000",
  },

  {
    id: 15,
    name: "Calming Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,799",
    oldPrice: "Rs.3,200",
  },

  {
    id: 16,
    name: "Brightening Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,899",
    oldPrice: "Rs.3,500",
  },

  {
    id: 17,
    name: "Hydrating Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,999",
    oldPrice: "Rs.3,500",
  },

  {
    id: 18,
    name: "Anti-Aging Face Serum - 30 ML",
    image: multiActionNightRepair,
    price: "Rs.2,199",
    oldPrice: "Rs.4,000",
  },

  {
    id: 19,
    name: "Glow Boost Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,699",
    oldPrice: "Rs.3,000",
  },

  {
    id: 20,
    name: "Pore Minimizing Face Serum - 30 ML",
    image: brighteningSerum,
    price: "Rs.1,799",
    oldPrice: "Rs.3,200",
  },
];


function BestSellers() {

  return (
    <section className="best-sellers">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="best-sellers-header">

        <h2>
          <em>Best</em> Sellers
        </h2>


        <a
          href="/best-sellers"
          className="view-all-btn"
        >
          VIEW ALL
          <span>→</span>
        </a>

      </div>


      {/* =====================================
          SWIPER AREA
      ===================================== */}

      <div className="best-sellers-slider-area">


        {/* LEFT ARROW */}

        <button
          className="best-seller-prev"
          aria-label="Previous products"
        >
          ←
        </button>


        {/* =====================================
            SWIPER
        ===================================== */}

        <Swiper
          modules={[
            Navigation,
            Pagination,
            A11y,
          ]}

          slidesPerView={4}

          spaceBetween={25}

          loop={true}

          speed={600}

          grabCursor={true}

          navigation={{
            prevEl: ".best-seller-prev",
            nextEl: ".best-seller-next",
          }}

          pagination={{
            el: ".best-seller-pagination",
            clickable: true,
          }}

          breakpoints={{

            // Small mobile
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },

            // Mobile
            500: {
              slidesPerView: 2,
              spaceBetween: 15,
            },

            // Tablet
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },

            // Desktop
            1100: {
              slidesPerView: 4,
              spaceBetween: 25,
            },

          }}

          className="best-sellers-swiper"
        >


          {/* =====================================
              PRODUCTS
          ===================================== */}

          {products.map((product) => (

            <SwiperSlide key={product.id}>

              <article className="best-product-card">


                {/* IMAGE */}

                <div className="product-image-box">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                </div>


                {/* PRODUCT NAME */}

                <h3>
                  {product.name}
                </h3>


                {/* ORANGE LINE */}

                <div className="orange-line"></div>


                {/* PRICE */}

                <div className="product-price">

                  <strong>
                    {product.price}
                  </strong>

                  <del>
                    {product.oldPrice}
                  </del>

                </div>


                {/* ADD TO CART */}

                <button className="add-cart-btn">
                  ADD TO CART
                </button>


              </article>

            </SwiperSlide>

          ))}

        </Swiper>


        {/* RIGHT ARROW */}

        <button
          className="best-seller-next"
          aria-label="Next products"
        >
          →
        </button>


      </div>


      {/* =====================================
          PAGINATION
      ===================================== */}

      <div className="best-seller-pagination"></div>


    </section>
  );
}


export default BestSellers;