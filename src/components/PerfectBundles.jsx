import React from "react";

import "../styles/perfectBundles.css";

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

// Images
import dayNightCombo from "../assets/DayNightCombo.jpg";
import dailySkinCare from "../assets/daily-skin-care.jpg";
import skinlighteningpack from "../assets/SKIN LIGHTENING PACK.jpg";
import acnebundle from "../assets/acnebundle.jpg";
import antiagingbundle from "../assets/anti-aging.jpg";
import skinprotection from "../assets/skinprotection.jpg";
import poresbundle from "../assets/poresbundle.jpg";
import hydrationbundle from "../assets/hydration-bundle.jpg";


/* =====================================
   BUNDLES DATA
===================================== */

const bundles = [
  {
    id: 1,
    name: "Day & Night Combo Bundle",
    image: dayNightCombo,
    price: "Rs.2,999",
    oldPrice: "Rs.3,598",
  },

  {
    id: 2,
    name: "Daily Skin Care Bundle",
    image: dailySkinCare,
    price: "Rs.4,000",
    oldPrice: "Rs.13,000",
  },

  {
    id: 3,
    name: "SKIN LIGHTENING PACK",
    image: skinlighteningpack,
    price: "Rs.2,500",
    oldPrice: "Rs.6,750",
  },

  {
    id: 4,
    name: "ACNE PACK",
    image: acnebundle,
    price: "Rs.2,600",
    oldPrice: "Rs.6,530",
  },

  {
    id: 5,
    name: "ANTI AGING PACK",
    image: antiagingbundle,
    price: "Rs.2,750",
    oldPrice: "Rs.7,050",
  },

  {
    id: 6,
    name: "SKIN PROTECTION PACK",
    image: skinprotection,
    price: "Rs.2,700",
    oldPrice: "Rs.7,550",
  },

  {
    id: 7,
    name: "PORES PACK",
    image: poresbundle,
    price: "Rs.2,800",
    oldPrice: "Rs.6,530",
  },

  {
    id: 8,
    name: "HYDRATION PACK",
    image: hydrationbundle,
    price: "Rs.2,650",
    oldPrice: "Rs.6,300",
  },
];


function PerfectBundles() {

  return (
    <section className="perfect-bundles">


      {/* =====================================
          HEADING
      ===================================== */}

      <div className="bundles-header">

        <h2>
          <em>Perfect</em> Bundles
        </h2>

      </div>


      {/* =====================================
          SWIPER AREA
      ===================================== */}

      <div className="bundles-slider-area">


        {/* LEFT ARROW */}

        <button
          className="bundle-prev"
          aria-label="Previous bundles"
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

          spaceBetween={24}

          loop={true}

          speed={600}

          grabCursor={true}

          navigation={{
            prevEl: ".bundle-prev",
            nextEl: ".bundle-next",
          }}

          pagination={{
            el: ".bundle-pagination",
            clickable: true,
          }}

          breakpoints={{

            // Mobile
            0: {
              slidesPerView: 1,
              spaceBetween: 18,
            },

            // Small tablet / mobile
            500: {
              slidesPerView: 2,
              spaceBetween: 18,
            },

            // Tablet
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },

            // Desktop
            1100: {
              slidesPerView: 4,
              spaceBetween: 24,
            },

          }}

          className="perfect-bundles-swiper"
        >


          {/* =====================================
              BUNDLE CARDS
          ===================================== */}

          {bundles.map((bundle) => (

            <SwiperSlide key={bundle.id}>

              <article className="bundle-card">


                {/* IMAGE */}

                <div className="bundle-image-box">

                  <img
                    src={bundle.image}
                    alt={bundle.name}
                  />

                </div>


                {/* NAME */}

                <h3>
                  {bundle.name}
                </h3>


                {/* ORANGE LINE */}

                <div className="bundle-orange-line"></div>


                {/* PRICE */}

                <div className="bundle-price">

                  <strong>
                    {bundle.price}
                  </strong>

                  <del>
                    {bundle.oldPrice}
                  </del>

                </div>


                {/* ADD TO CART */}

                <button className="bundle-cart-btn">
                  ADD TO CART
                </button>


              </article>

            </SwiperSlide>

          ))}

        </Swiper>


        {/* RIGHT ARROW */}

        <button
          className="bundle-next"
          aria-label="Next bundles"
        >
          →
        </button>


      </div>


      {/* =====================================
          PAGINATION
      ===================================== */}

      <div className="bundle-pagination"></div>


    </section>
  );
}


export default PerfectBundles;