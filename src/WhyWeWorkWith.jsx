import { useEffect, useRef, useState } from "react";
import "./WhyWeWorkWith.css";

const reasons = [
  {
    title: "Industry-Focused Expertise",
    description:
      "We understand complex industrial products, processes, systems, and technologies, allowing us to transform technical information into clear and engaging visual experiences.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Creative + Technical Approach",
    description:
      "Our approach combines creative storytelling with technical understanding to create visuals that are not only attractive but also accurate, meaningful, and easy to understand.",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Powerful Visual Storytelling",
    description:
      "We turn ideas, products, and complex concepts into powerful visual stories that help businesses communicate their message with clarity and impact.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Built for Business Impact",
    description:
      "Every visual experience is created with a business purpose in mind, whether it is marketing, sales, training, presentations, product communication, or digital branding.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "End-to-End Solutions",
    description:
      "From concept and scripting to design, animation, development, and final delivery, we provide integrated solutions under one roof.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Future-Ready Experiences",
    description:
      "We work with modern technologies and immersive formats to create digital experiences that help brands communicate effectively in a rapidly evolving world.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
  },
];

/*
  Scroll-driven modes. These queries must match the matching
  @media blocks at the end of WhyWeWorkWith.css.

  DESKTOP: the two-column stage pins and scroll progress steps through the list.
  COMPACT: the preview card pins on top and the list scrolls underneath it.
  Anything else (short landscape screens) keeps hover / tap only.
*/
const DESKTOP_QUERY = "(min-width: 901px) and (min-height: 601px)";
const COMPACT_QUERY = "(max-width: 900px) and (min-height: 520px)";

// Pinned offset, defined in the CSS as --why-work-pin-top
const getPinTop = (track) =>
  parseFloat(
    window.getComputedStyle(track).getPropertyValue("--why-work-pin-top")
  ) || 0;

// Where the pinned stage currently is inside its scroll track (desktop)
const getTrackMetrics = (track, stage) => ({
  distance: track.offsetHeight - stage.offsetHeight,
  scrolled: getPinTop(track) - track.getBoundingClientRect().top,
});

const WhyWeWorkWith = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const cardRef = useRef(null);
  const itemRefs = useRef([]);

  const activeIndexRef = useRef(0);
  const isScrollingRef = useRef(false);
  const programmaticUntilRef = useRef(0);

  /*
    Moves the page scroll to the chosen step, so hover, click and scroll
    always share the same index and scrolling continues from that step.
    While the stage is pinned this move is not visible.
  */
  const alignScroll = (index) => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const card = cardRef.current;

    if (!track || !stage || !card) {
      return;
    }

    let target = null;

    if (window.matchMedia(DESKTOP_QUERY).matches) {
      const { distance, scrolled } = getTrackMetrics(track, stage);

      // Only while pinned, otherwise the page would visibly jump
      if (distance > 0 && scrolled >= 0 && scrolled <= distance) {
        target =
          window.scrollY -
          scrolled +
          ((index + 0.5) / reasons.length) * distance;
      }
    } else if (window.matchMedia(COMPACT_QUERY).matches) {
      const row = itemRefs.current[index];

      if (row) {
        // Put the row right under the pinned card
        const rowTop = window.scrollY + row.getBoundingClientRect().top;

        target = rowTop - (getPinTop(track) + card.offsetHeight + 20);
      }
    }

    if (target === null) {
      return;
    }

    programmaticUntilRef.current = performance.now() + 150;

    window.scrollTo({ top: Math.max(target, 0), behavior: "instant" });
  };

  const selectIndex = (index, { align = false } = {}) => {
    const hasChanged = index !== activeIndexRef.current;

    activeIndexRef.current = index;
    setActiveIndex(index);

    if (align && hasChanged) {
      alignScroll(index);
    }
  };

  // Hover is ignored while the page scrolls, so it never fights with scroll
  const handleHover = (index) => {
    if (isScrollingRef.current || window.matchMedia(COMPACT_QUERY).matches) {
      return;
    }

    selectIndex(index, { align: true });
  };

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle("why-work-visible", entry.isIntersecting);
      },
      {
        // The section can be very tall while the stage is pinned,
        // so a ratio threshold is not reliable here.
        threshold: 0,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* Scroll-driven active step */
  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const compactQuery = window.matchMedia(COMPACT_QUERY);

    let frame = 0;
    let scrollTimer = 0;

    const getScrollIndex = () => {
      const track = trackRef.current;
      const stage = stageRef.current;
      const card = cardRef.current;

      if (!track || !stage || !card) {
        return null;
      }

      if (desktopQuery.matches) {
        const { distance, scrolled } = getTrackMetrics(track, stage);

        // Outside the pinned range the current selection is kept
        if (distance <= 0 || scrolled < 0 || scrolled > distance) {
          return null;
        }

        return Math.min(
          reasons.length - 1,
          Math.floor((scrolled / distance) * reasons.length)
        );
      }

      if (compactQuery.matches) {
        // The row sitting right under the pinned card is the active one
        const focusY = card.getBoundingClientRect().bottom + 32;
        let current = 0;

        itemRefs.current.forEach((item, index) => {
          if (item && item.getBoundingClientRect().top <= focusY) {
            current = index;
          }
        });

        return current;
      }

      return null;
    };

    const syncWithScroll = () => {
      frame = 0;

      const nextIndex = getScrollIndex();

      if (nextIndex === null || nextIndex === activeIndexRef.current) {
        return;
      }

      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
    };

    const requestSync = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(syncWithScroll);
      }
    };

    const handleScroll = () => {
      // Scrolling done by alignScroll() is not a user scroll
      if (performance.now() >= programmaticUntilRef.current) {
        isScrollingRef.current = true;

        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => {
          isScrollingRef.current = false;
        }, 140);
      }

      requestSync();
    };

    requestSync();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", requestSync);
    desktopQuery.addEventListener("change", requestSync);
    compactQuery.addEventListener("change", requestSync);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.clearTimeout(scrollTimer);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestSync);
      desktopQuery.removeEventListener("change", requestSync);
      compactQuery.removeEventListener("change", requestSync);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="why-work-section"
    >
      {/* TOP CENTER TITLE */}
      <div className="why-work-main-heading">
        <p className="why-work-main-eyebrow">WHY MOTIONPIX</p>

        <h2>
          What <span>We Do.</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="why-work-track"
        style={{ "--why-work-steps": reasons.length }}
      >
        <div ref={stageRef} className="why-work-container">
          {/* LEFT SIDE */}
          <div className="why-work-left">
            <div className="why-work-heading">
              <p className="why-work-intro">
                We combine creativity, technology, and industry understanding to
                create meaningful visual experiences.
              </p>
            </div>

            <div className="why-work-list">
              {reasons.map((reason, index) => (
                <button
                  type="button"
                  key={reason.title}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  className={`why-work-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onMouseEnter={() => handleHover(index)}
                  onFocus={() => selectIndex(index, { align: true })}
                  onClick={() => selectIndex(index, { align: true })}
                >
                  <span className="why-work-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="why-work-item-title">
                    {reason.title}
                  </span>

                  <span className="why-work-arrow">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div ref={cardRef} className="why-work-right">
            <div className="why-work-card">
              {/* All images stay mounted and cross-fade, so nothing reloads or jumps */}
              <div className="why-work-image-wrapper">
                {reasons.map((reason, index) => (
                  <img
                    key={reason.image}
                    src={reason.image}
                    alt={activeIndex === index ? reason.title : ""}
                    className={`why-work-image ${
                      activeIndex === index ? "is-active" : ""
                    }`}
                    loading="lazy"
                  />
                ))}

                <div className="why-work-image-overlay"></div>

                <div className="why-work-card-number">
                  {String(activeIndex + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="why-work-content">
                <p className="why-work-content-label">
                  WHY WE WORK WITH
                </p>

                {/* All copy sits in one grid cell, so the card height never changes */}
                <div className="why-work-copy">
                  {reasons.map((reason, index) => (
                    <div
                      key={reason.title}
                      className={`why-work-copy-item ${
                        activeIndex === index ? "is-active" : ""
                      }`}
                      aria-hidden={activeIndex !== index}
                    >
                      <h3>{reason.title}</h3>

                      <p>{reason.description}</p>
                    </div>
                  ))}
                </div>

                <div className="why-work-progress">
                  <span
                    style={{
                      width: `${
                        ((activeIndex + 1) / reasons.length) * 100
                      }%`,
                    }}
                  ></span>
                </div>

                <div className="why-work-counter">
                  <span>
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>

                  <span>
                    {String(reasons.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeWorkWith;