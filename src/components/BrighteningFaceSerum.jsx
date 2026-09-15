import React from "react";
import "../styles/brighteningFaceSerum.css";

import brighteningSerum from "../assets/brightening-serum.jpg";

function BrighteningFaceSerum() {
  return (
    <section className="brightening-section">

      {/* LEFT IMAGE */}
      <div className="brightening-image-container">

        <img
          src={brighteningSerum}
          alt="Brightening Face Serum"
          className="brightening-image"
        />

      </div>


      {/* MOST LOVED BADGE */}
      {/* Image aur right content dono ke upar */}
      <div className="most-loved-badge">

        <div className="badge-text">
          MOST
          <br />
          LOVED
        </div>

        <div className="badge-heart">
          ♥
        </div>

      </div>


      {/* RIGHT CONTENT */}
      <div className="brightening-content">

        <h2 className="brightening-title">
          <em>Brightening Face Serum</em>
        </h2>


        <h3 className="brightening-subtitle">
          Radiance Boosting Face Serum
        </h3>


        <p className="brightening-description">
          Glow-Enhancing Formula for Brighter, Even-Toned Skin
        </p>


        <div className="serum-features">

          {/* Feature 1 */}
          <div className="serum-feature">

            <div className="feature-icon">
              ✨
            </div>

            <div className="feature-content">

              <h4>
                Brightens & Evens Tone
              </h4>

              <p>
                Reduces dullness and improves skin clarity
              </p>

            </div>

          </div>


          {/* Feature 2 */}
          <div className="serum-feature">

            <div className="feature-icon">
              💧
            </div>

            <div className="feature-content">

              <h4>
                Hydrating & Plumping
              </h4>

              <p>
                Infuses moisture for soft, supple skin
              </p>

            </div>

          </div>


          {/* Feature 3 */}
          <div className="serum-feature">

            <div className="feature-icon">
              ✨
            </div>

            <div className="feature-content">

              <h4>
                Lightweight & Fast Absorbing
              </h4>

              <p>
                Non-greasy formula perfect for daily use
              </p>

            </div>

          </div>

        </div>


        {/* BUTTON */}
        <button className="reveal-button">
          REVEAL YOUR RADIANCE
        </button>

      </div>

    </section>
  );
}

export default BrighteningFaceSerum;