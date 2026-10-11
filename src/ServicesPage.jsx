import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./ServicesPage.css";
import ServiceCategories from "./ServiceCategories";

// ============================================================
// SERVICES DATA
// ============================================================
const servicesData = [
  {
    title: "2D Animation",
    image: "/2D Animation.jpg",
    link: "/services/2d-animation",
  },
  {
    title: "3D Animation",
    image: "/3d animation1.jpg",
    link: "/services/3d-animation",
  },
  {
    title: "Graphics Design",
    image: "/graphic design 1.jpg",
    link: "/services/graphicsdesign",
  },
  {
    title: "Web Design",
    image: "/web d.webp",
    link: "/services/web-design",
  },
  {
    title: "Digital Marketing",
    image: "/Digital m.webp",
    link: "/services/digitalmarketing",
  },
  {
    title: "E-Learning",
    image: "/Elearning.webp",
    link: "/services/e-learning",
  },
  {
    title: "AR/VR",
    image: "/ar.webp",
    link: "/services/ar-vr",
  },
];

// ============================================================
// BIDIRECTIONAL SCROLL REVEAL
// ============================================================
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

// ============================================================
// Touch screens have no hover, so they open the card details with a tap
// ============================================================
const canHover = () => window.matchMedia("(hover: hover)").matches;

// ============================================================
// STICKY SERVICES / COVERFLOW CAROUSEL
// ============================================================
const ServicesCarousel = ({ data = servicesData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [revealRef, revealVisible] = useScrollReveal();

  if (!data || data.length === 0) {
    return null;
  }

  // ==========================================================
  // PREVIOUS SERVICE
  // ==========================================================
  const handlePrev = () => {
    setRevealedIndex(null);

    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  // ==========================================================
  // NEXT SERVICE
  // ==========================================================
  const handleNext = () => {
    setRevealedIndex(null);

    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  // ==========================================================
  // DIRECT CARD CLICK
  // ==========================================================
  const handleCardClick = (index) => {
    // Tapping the centre card opens / closes its details on touch screens
    if (index === currentIndex) {
      if (!canHover()) {
        setRevealedIndex((prevIndex) => (prevIndex === index ? null : index));
      }

      return;
    }

    setRevealedIndex(null);
    setCurrentIndex(index);
  };

  // ==========================================================
  // TOUCH / MOUSE START
  // ==========================================================
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches
      ? event.touches[0].clientX
      : event.clientX;

    touchEndX.current = touchStartX.current;
  };

  // ==========================================================
  // TOUCH / MOUSE MOVE
  // ==========================================================
  const handleTouchMove = (event) => {
    touchEndX.current = event.touches
      ? event.touches[0].clientX
      : event.clientX;
  };

  // ==========================================================
  // TOUCH / MOUSE END
  // ==========================================================
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      return;
    }

    const difference = touchStartX.current - touchEndX.current;

    if (Math.abs(difference) > 40) {
      if (difference > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section
      ref={revealRef}
      className={`services-carousel-section reveal ${
        revealVisible ? "reveal-active" : ""
      }`}
    >
      <div className="container">
        {/* =====================================================
            HEADING
        ===================================================== */}
        <div className="services-heading text-center mb-5">
          <h2 className="fw-bold">
            Our <span>Services</span>
          </h2>
        </div>

        {/* =====================================================
            COVERFLOW CAROUSEL
        ===================================================== */}
        <div className="coverflow-carousel-wrapper">
          {/* =================================================
              PREVIOUS BUTTON
          ================================================= */}
          <button
            type="button"
            className="coverflow-nav-btn coverflow-prev-btn"
            onClick={handlePrev}
            aria-label="Previous Service"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* =================================================
              CARDS TRACK
          ================================================= */}
          <div
            className="coverflow-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
          >
            {data.map((item, index) => {
              // Calculate relative position from active card.
              let offset = index - currentIndex;

              // Infinite wrap-around.
              if (offset > data.length / 2) {
                offset -= data.length;
              }

              if (offset < -data.length / 2) {
                offset += data.length;
              }

              const isActive = offset === 0;

              return (
                <div
                  key={item.title || index}
                  className={`coverflow-card-wrapper ${
                    isActive ? "active" : ""
                  } ${revealedIndex === index ? "is-revealed" : ""}`}
                  onClick={() => handleCardClick(index)}
                  style={{
                    "--coverflow-offset": offset,
                    "--coverflow-abs-offset": Math.abs(offset),
                    zIndex: data.length - Math.abs(offset),
                  }}
                >
                  <div className="service-card">
                    {/* =========================================
                        BACKGROUND IMAGE
                    ========================================= */}
                    <div className="service-card-bg">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="service-img"
                      />
                    </div>

                    {/* =========================================
                        DEFAULT TITLE
                    ========================================= */}
                    <div className="service-card-default-overlay">
                      <h3 className="service-default-title">
                        {item.title}
                      </h3>
                    </div>

                    {/* =========================================
                        HOVER OVERLAY
                    ========================================= */}
                    <div className="service-card-hover-overlay">
                      <h3 className="service-hover-title">
                        {item.title}
                      </h3>

                      <p className="service-hover-desc">
                        Explore our industry-leading {item.title} solutions
                        tailored for digital growth and visual impact.
                      </p>

                      <NavLink
                        to={item.link || "#"}
                        className="service-hover-btn"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <span>View Services</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =================================================
              NEXT BUTTON
          ================================================= */}
          <button
            type="button"
            className="coverflow-nav-btn coverflow-next-btn"
            onClick={handleNext}
            aria-label="Next Service"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// SERVICES PAGE
// The categories live next to the carousel (not inside its section),
// so the carousel's own reveal never hides them.
// ============================================================
const ServicesPage = ({ data = servicesData }) => (
  <>
    <ServicesCarousel data={data} />

    <ServiceCategories />
  </>
);

export default ServicesPage;