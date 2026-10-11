import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Courses.css";

// Bidirectional scroll-reveal: `visible` flips true/false every time the
// section enters/exits the viewport, so the reveal replays both scrolling
// down AND scrolling back up. Applied to the whole carousel section as one
// block — the individual cards already have their own coverflow positioning
// via --coverflow-offset, so per-card reveal would fight that.
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const StickyServices = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [revealRef, revealVisible] = useScrollReveal();

  if (!data || data.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Card Direct Click Handler
  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  // Drag / Swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
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
      className={`services-carousel-section reveal ${revealVisible ? "reveal-active" : ""}`}
    >
      <div className="container">
        <div className="services-heading text-center mb-5">
          <h2 className="fw-bold">
            Our <span>Services</span>
          </h2>
        </div>

        {/* Coverflow Carousel Layout Container */}
        <div className="coverflow-carousel-wrapper">
          {/* Left Navigation Button (Prev Icon) */}
          <button
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
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Cards Track */}
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
              // Calculate relative position from center active card
              let offset = index - currentIndex;

              // Infinite wrap-around calculation
              if (offset > data.length / 2) offset -= data.length;
              if (offset < -data.length / 2) offset += data.length;

              const isActive = offset === 0;

              return (
                <div
                  key={index}
                  className={`coverflow-card-wrapper ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() => handleCardClick(index)}
                  style={{
                    "--coverflow-offset": offset,
                    "--coverflow-abs-offset": Math.abs(offset),
                    zIndex: data.length - Math.abs(offset),
                  }}
                >
                  <div className="service-card">
                    {/* Background Image Container */}
                    <div className="service-card-bg">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="service-img"
                      />
                    </div>

                    {/* Default Overlay (Title) */}
                    <div className="service-card-default-overlay">
                      <h3 className="service-default-title">{item.title}</h3>
                    </div>

                    {/* Hover Overlay */}
                    <div className="service-card-hover-overlay">
                      <h3 className="service-hover-title">{item.title}</h3>
                      <p className="service-hover-desc">
                        Explore our industry-leading {item.title} solutions
                        tailored for digital growth and visual impact.
                      </p>
                      <NavLink
                        to={item.link || "#"}
                        className="service-hover-btn"
                      >
                        <span>View Services</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Navigation Button (Next Icon) */}
          <button
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
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default StickyServices;