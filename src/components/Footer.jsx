import React from "react";
import "../styles/footer.css";

import logo from "../assets/logo.jpg";

function Footer() {
  return (
    <footer className="footer">

      {/* ==============================
          CTA SECTION
      ============================== */}

      <section className="footer-cta">

        <h2>
          <em>Reveal Your</em> Natural Glow
        </h2>

        <p>
          Elevate your skincare routine with formulas designed to
          <br />
          nourish, hydrate, and brighten.
        </p>

        <a
          href="/products"
          className="footer-shop-btn"
        >
          SHOP THE COLLECTION
        </a>

      </section>


      {/* ==============================
          FOOTER CONTENT
      ============================== */}

      <div className="footer-content">


        {/* ==============================
            BRAND
        ============================== */}

        <div className="footer-brand">

          <img
            src={logo}
            alt="MM Cosmetic"
            className="footer-logo-image"
          />


          <div className="footer-contact">

            <p>
              <span className="contact-icon">
                ✉
              </span>

              mmcosmetic@gmail.com
            </p>


            <p>
              <span className="contact-icon">
                ☎
              </span>

              0301 1124600
            </p>

          </div>

        </div>


        {/* ==============================
            QUICK LINKS
        ============================== */}

        <div className="footer-column">

          <h3>
            QUICK LINKS
          </h3>

          <a href="/">
            Home
          </a>

          <a href="/contact">
            Contact Us
          </a>

          <a href="/best-sellers">
            Best Seller
          </a>

          <a href="/products">
            Shop All
          </a>

          <a href="/bundles">
            Build Your Own Bundle
          </a>

        </div>


        {/* ==============================
            POLICIES
        ============================== */}

        <div className="footer-column">

          <h3>
            POLICIES
          </h3>

          <a href="/privacy-policy">
            Privacy Policy
          </a>

          <a href="/terms">
            Terms of Service
          </a>

          <a href="/affiliate">
            Affiliate Program
          </a>

          <a href="/refund-policy">
            Refund Policy
          </a>

          <a href="/shipping">
            Shipping & Return Policy
          </a>

        </div>


        {/* ==============================
            NEWSLETTER
        ============================== */}

        <div className="footer-newsletter">

          <h3>
            SIGN UP NEWSLETTER
          </h3>

          <p>
            Subscribe to receive science-backed tips,
            <br />
            access to special offers, and innovations.
          </p>


          <form className="newsletter-form">

            <input
              type="email"
              placeholder="Your email address"
            />

            <button type="submit">
              Subscribe
            </button>

          </form>


          {/* SOCIAL MEDIA */}

          <div className="social-links">

            <a
              href="#"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              ◎
            </a>

          </div>

        </div>

      </div>


      {/* ==============================
          COPYRIGHT
      ============================== */}

      <div className="footer-bottom">

        <p>
          Copyright © 2026 MM COSMETIC
          all rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;