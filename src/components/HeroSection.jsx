import React from "react";
import banner from "../assets/banner.jpg";

function HeroSection() {
  return (
    <section style={styles.heroSection}>

      {/* Banner Image */}
      <img
        src={banner}
        alt="Beauty Banner"
        style={styles.bannerImage}
      />

      {/* Hero Content */}
      <div style={styles.contentContainer}>

        {/* Title */}
        <h1 style={styles.mainTitle}>
          Beauty That Speaks <br />

          <span style={styles.italicText}>
            Your Skin
          </span>
        </h1>

        {/* Description */}
        <p style={styles.description}>
          Crafted for the Pakistani woman with luxurious formulas that
          celebrate every shade, every texture, every mood. Discover
          cosmetics that are as bold as you are.
        </p>

        {/* Buttons */}
        <div style={styles.buttonGroup}>

          {/* Shop Collection Button */}
          <a
            href="/products?type=collection"
            style={styles.btnPrimary}

            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#000000";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fca311";
              e.currentTarget.style.color = "#000000";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            SHOP COLLECTION
          </a>


          {/* Shop Bestsellers Button */}
<a
  href="/best-sellers"
  style={styles.btnSecondary}

  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#000000";
    e.currentTarget.style.color = "#ffffff";
    e.currentTarget.style.transform = "translateY(-3px)";
  }}

  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = "#000000";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  SHOP BESTSELLERS
</a>

        </div>

      </div>

    </section>
  );
}


const styles = {

  /* Hero Section */
  heroSection: {
    position: "relative",
    width: "100%",
    height: "500px",
    overflow: "hidden",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },


  /* Banner */
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },


  /* Content */
  contentContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: "90%",
    maxWidth: "750px",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    textAlign: "center",
  },


  /* Main Heading */
  mainTitle: {
    fontSize: "56px",
    fontWeight: "400",

    fontFamily:
      'Georgia, "Times New Roman", serif',

    color: "#000000",

    lineHeight: "1.15",

    margin: "0 0 24px 0",

    letterSpacing: "-0.5px",
  },


  /* Your Skin */
  italicText: {
    fontStyle: "italic",
    fontWeight: "600",

    color: "#fca311",
  },


  /* Description */
  description: {
    fontSize: "18px",

    color: "#000000",

    lineHeight: "1.6",

    maxWidth: "620px",

    margin: "0 0 36px 0",

    fontWeight: "400",
  },


  /* Button Container */
  buttonGroup: {
    display: "flex",

    gap: "16px",

    justifyContent: "center",

    flexWrap: "wrap",
  },


  /* Primary Button */
  btnPrimary: {
    backgroundColor: "#fca311",

    color: "#000000",

    padding: "14px 32px",

    borderRadius: "8px",

    fontSize: "13px",

    fontWeight: "600",

    letterSpacing: "1px",

    textDecoration: "none",

    display: "inline-block",

    cursor: "pointer",

    border: "none",

    transition: "all 0.3s ease",
  },


  /* Secondary Button */
  btnSecondary: {
    backgroundColor: "transparent",

    color: "#000000",

    padding: "14px 32px",

    borderRadius: "8px",

    border: "2px solid #000000",

    fontSize: "13px",

    fontWeight: "600",

    letterSpacing: "1px",

    textDecoration: "none",

    display: "inline-block",

    cursor: "pointer",

    transition: "all 0.3s ease",
  },

};


export default HeroSection;
