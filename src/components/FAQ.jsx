import React, { useState } from "react";

import "../styles/faq.css";

// FAQ Image
import faqImage from "../assets/aphrodite.jpg";


const questions = [
  {
    id: 1,
    question: "Are your products suitable for all skin types?",
    answer:
      "Yes, our products are carefully formulated for different skin types. However, we recommend checking the product details before use.",
  },

  {
    id: 2,
    question: "Are your products safe for sensitive skin?",
    answer:
      "Most of our products are gentle and suitable for sensitive skin. If you have very sensitive skin, we recommend doing a patch test first.",
  },

  {
    id: 3,
    question: "How long does it take to see results?",
    answer:
      "Results can vary from person to person. With regular use, you may start noticing improvements within a few weeks.",
  },

  {
    id: 4,
    question: "Can I use multiple products together?",
    answer:
      "Yes, many of our products can be used together. Always follow the recommended usage instructions for each product.",
  },

  {
    id: 5,
    question: "Are your products tested on animals?",
    answer:
      "We do not support animal testing and aim to provide beauty products that are safe and responsibly produced.",
  },

  {
    id: 6,
    question: "How do I choose the right product for my skin?",
    answer:
      "You can choose products according to your skin type and concerns. Our product descriptions can also help you find the right option.",
  },

  {
    id: 7,
    question: "Do you offer nationwide delivery?",
    answer:
      "Yes, we deliver our products across Pakistan. Delivery time may vary depending on your location.",
  },

  {
    id: 8,
    question: "What if a product doesn't suit my skin?",
    answer:
      "If a product does not suit your skin, stop using it and contact our support team for assistance.",
  },
];


function FAQ() {

  const [openQuestion, setOpenQuestion] = useState(null);


  const toggleQuestion = (id) => {

    setOpenQuestion(
      openQuestion === id ? null : id
    );

  };


  return (
    <section className="faq-section">


      {/* =====================================
          LEFT IMAGE
      ===================================== */}

      <div className="faq-image-container">

        <img
          src={faqImage}
          alt="MM Cosmetic Product"
          className="faq-image"
        />

      </div>


      {/* =====================================
          RIGHT FAQ
      ===================================== */}

      <div className="faq-content">


        {/* Heading */}

        <h2 className="faq-heading">

          <em>Frequently Asked</em>

          <span>Questions</span>

        </h2>


        {/* Questions */}

        <div className="faq-list">

          {questions.map((item) => (

            <div
              className={`faq-item ${
                openQuestion === item.id
                  ? "faq-open"
                  : ""
              }`}
              key={item.id}
            >


              {/* Question Button */}

              <button
                className="faq-question"
                onClick={() =>
                  toggleQuestion(item.id)
                }
              >

                <span>
                  {item.question}
                </span>

                <span className="faq-arrow">

                  {openQuestion === item.id
                    ? "−"
                    : "›"}

                </span>

              </button>


              {/* Answer */}

              {openQuestion === item.id && (

                <div className="faq-answer">

                  <p>
                    {item.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}


export default FAQ;