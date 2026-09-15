import React from "react";

import "../styles/happyCustomers.css";

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
import brighteningSerum from "../assets/brightening-serum.jpg";
import dailySkinCare from "../assets/daily-skin-care.jpg";
import multiActionNightRepair from "../assets/multi-action-night-repair.jpg";


// =====================================
// CUSTOMER REVIEWS DATA
// =====================================

const reviews = [
  {
    id: 1,
    name: "Aqeedat Butt",
    title: "Brightening serum vitamin c",
    review:
      "I really like your vitamin C serum and this is my second bottle. I have used it before this too, and it is my favorite",
    product: "Brightening Face Serum",
    image: brighteningSerum,
  },

  {
    id: 2,
    name: "Mahnoor Siddiqui",
    title: "Super hydrating",
    review:
      "My skin feels hydrated and fresh all day. Doesn’t feel greasy at all. Packaging is also very cute.",
    product: "Nano White Serum",
    image: dailySkinCare,
  },

  {
    id: 3,
    name: "Fatima Noor",
    title: "Natural and gentle",
    review:
      "Finally found something that suits my sensitive skin. No harsh chemicals feel, very gentle and effective. Will definitely repurchase.",
    product: "Brightening Clay Mask",
    image: multiActionNightRepair,
  },

  {
    id: 4,
    name: "Ayesha Khan",
    title: "Amazing product",
    review:
      "The quality is really good and my skin feels soft and fresh after using it. I will definitely buy it again.",
    product: "Daily Skin Care Bundle",
    image: dailySkinCare,
  },

  {
    id: 5,
    name: "Sana Ali",
    title: "Highly recommended",
    review:
      "I loved the texture and results. It feels light on the skin and gives a beautiful glow.",
    product: "Brightening Face Serum",
    image: brighteningSerum,
  },

  {
    id: 6,
    name: "Hira Ahmed",
    title: "Very happy with it",
    review:
      "The product arrived safely and the quality exceeded my expectations. Definitely recommended.",
    product: "Night Repair Serum",
    image: multiActionNightRepair,
  },
];


// =====================================
// STAR RATING
// =====================================

function StarRating() {
  return (
    <div className="customer-stars">

      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>

    </div>
  );
}


// =====================================
// VERIFIED BADGE
// =====================================

function VerifiedBadge() {
  return (
    <span className="verified-badge">

      <span className="verified-icon">
        ✓
      </span>

      Verified

    </span>
  );
}


// =====================================
// HAPPY CUSTOMERS COMPONENT
// =====================================

function HappyCustomers() {

  return (
    <section className="happy-customers">


      {/* =====================================
          SECTION HEADING
      ===================================== */}

      <div className="happy-customers-header">

        <h2>
          <em>Hear From Our</em> Happy Customers
        </h2>

      </div>


      {/* =====================================
          SLIDER CONTAINER
      ===================================== */}

      <div className="customers-slider-container">


        {/* =====================================
            LEFT ARROW
        ===================================== */}

        <button
          className="customer-prev"
          aria-label="Previous customer reviews"
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

          slidesPerView={3}

          spaceBetween={25}

          speed={600}

          grabCursor={true}

          navigation={{
            prevEl: ".customer-prev",
            nextEl: ".customer-next",
          }}

          pagination={{
            el: ".customer-pagination",
            clickable: true,
          }}

          breakpoints={{

            // Mobile
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },

            // Tablet
            650: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            // Desktop
            1000: {
              slidesPerView: 3,
              spaceBetween: 25,
            },

          }}

          className="customers-swiper"
        >


          {/* =====================================
              CUSTOMER CARDS
          ===================================== */}

          {reviews.map((review) => (

            <SwiperSlide key={review.id}>

              <article className="customer-card">


                {/* CUSTOMER NAME */}

                <div className="customer-name-row">

                  <h3>
                    {review.name}
                  </h3>

                  <VerifiedBadge />

                </div>


                {/* STARS */}

                <StarRating />


                {/* REVIEW TITLE */}

                <h4>
                  {review.title}
                </h4>


                {/* REVIEW */}

                <p className="customer-review">
                  {review.review}
                </p>


                {/* PRODUCT */}

                <div className="review-product">

                  <div className="review-product-image">

                    <img
                      src={review.image}
                      alt={review.product}
                    />

                  </div>


                  <span>
                    {review.product}
                  </span>

                </div>


              </article>

            </SwiperSlide>

          ))}


        </Swiper>


        {/* =====================================
            RIGHT ARROW
        ===================================== */}

        <button
          className="customer-next"
          aria-label="Next customer reviews"
        >
          →
        </button>


        {/* =====================================
            PAGINATION DOTS
        ===================================== */}

        <div className="customer-pagination"></div>


      </div>

    </section>
  );
}


export default HappyCustomers;