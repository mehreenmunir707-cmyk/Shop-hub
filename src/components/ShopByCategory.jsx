import React from "react";

import facecare from "../assets/facecare.jpg";
import bodycare from "../assets/bodycare.jpg";
import makeup from "../assets/makeup.jpg";
import haircare from "../assets/haircare.jpg";
import glow from "../assets/glow.jpg";


const categories = [
  {
    id: 1,
    title: "Face Care",
    image: facecare,
    link: "/products?category=face-care",
    featured: true,
  },
  {
    id: 2,
    title: "Body Care",
    image: bodycare,
    link: "/products?category=body-care",
  },
  {
    id: 3,
    title: "Makeup",
    image: makeup,
    link: "/products?category=makeup",
  },
  {
    id: 4,
    title: "Hair Care",
    image: haircare,
    link: "/products?category=hair-care",
  },
  {
    id: 5,
    title: "Glow Essentials",
    image: glow,
    link: "/products?category=glow-essentials",
  },
];


function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function CategoryCard({ category }) {
  return (
    <a
      href={category.link}
      className="category-card"
    >

      <img
        src={category.image}
        alt={category.title}
        className="category-image"
      />

      <div className="category-overlay"></div>

      <div className="category-content">

        <h3>{category.title}</h3>

        <span className="arrow-icon">
          <ArrowIcon />
        </span>

      </div>

    </a>
  );
}


export default function ShopByCategory() {

  const featured = categories.find(
    (category) => category.featured
  );

  const secondary = categories.filter(
    (category) => !category.featured
  );


  return (
    <section className="shop-category-section">

      {/* Section Heading */}
      <div className="section-heading">

        <h2>
          <span>Shop by</span> Category
        </h2>

      </div>


      {/* Category Grid */}
      <div className="category-grid">

        {/* Big Face Care Card */}
        <div className="featured-category">

          <CategoryCard
            category={featured}
          />

        </div>


        {/* Four Small Cards */}
        <div className="secondary-categories">

          {secondary.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>

    </section>
  );
}