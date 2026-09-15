import React from "react";

import HeroSection from "../components/HeroSection";
import ShopByCategory from "../components/ShopByCategory";
import BestSellers from "../components/BestSellers";
import BrighteningFaceSerum from "../components/BrighteningFaceSerum";
import ExploreAllProducts from "../components/ExploreAllProducts";
import PerfectBundles from "../components/PerfectBundles";
import HappyCustomers from "../components/HappyCustomers";
import FAQ from "../components/FAQ.jsx";

import "../styles/home.css";


export default function Home() {
  return (
    <main className="home-page">

      {/* Hero Section */}
      <HeroSection />


      {/* Shop By Category */}
      <ShopByCategory />


      {/* Best Sellers */}
      <BestSellers />

      {/* Brightening Face Serum */}
      <BrighteningFaceSerum />

      {/* Explore All Products */}
      <ExploreAllProducts />

      {/* Perfect Bundles */}
      <PerfectBundles />

      {/* Happy Customers */}
      <HappyCustomers />

      {/* FAQ */}
      <FAQ />


    </main>
  );
}