import { useEffect, useRef, useState } from "react";
import "./MotionPixJourney.css";

const journeyStats = [
  {
    value: 15,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    value: 75,
    suffix: "%",
    label: "Audience Engagement",
  },
  {
    value: 2500,
    suffix: "+",
    label: "Minutes of Content",
  },
  {
    value: 500,
    suffix: "+",
    label: "Videos Created",
  },
  {
    value: 20,
    suffix: "+",
    label: "Team of Experts",
  },
  {
    value: 100,
    suffix: "+",
    label: "Clients Served",
  },
];

const easeInOutCubic = (t) =>
  t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;

const MotionPixJourney = () => {
  const sectionRef = useRef(null);
  const animationRef = useRef(null);

  const [isInView, setIsInView] = useState(false);
  const [counts, setCounts] = useState(
    journeyStats.map(() => 0)
  );

  /* ============================================================
     BIDIRECTIONAL SCROLL REVEAL
     ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ============================================================
     NUMBER COUNT ANIMATION
     ============================================================ */

  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startValues = [...counts];

    const targetValues = isInView
      ? journeyStats.map((item) => item.value)
      : journeyStats.map(() => 0);

    const duration = 1300;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = easeInOutCubic(progress);

      const nextValues = startValues.map(
        (startValue, index) => {
          const targetValue = targetValues[index];

          return Math.round(
            startValue +
              (targetValue - startValue) *
                easedProgress
          );
        }
      );

      setCounts(nextValues);

      if (progress < 1) {
        animationRef.current =
          requestAnimationFrame(animate);
      }
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className={`premium-journey ${
        isInView ? "reveal-active" : ""
      }`}
    >
      <div className="journey-container">

        {/* ======================================================
            HEADER
            ====================================================== */}

        <header className="journey-header">
          <span className="journey-badge">
            OUR GROWTH STORY
          </span>

          <h2 className="journey-heading">
            MotionPix <span>Journey</span>
          </h2>

          <p className="journey-subtitle">
            From experience to execution, every milestone
            represents a step in our creative journey.
          </p>
        </header>

        {/* ======================================================
            JOURNEY TIMELINE
            ====================================================== */}

        <div className="journey-timeline">

          {/* Animated Journey Line */}
          <div className="journey-line">
            <span className="journey-line-progress"></span>
          </div>

          <div className="journey-grid">
            {journeyStats.map((item, index) => (
              <article
                key={item.label}
                className="journey-card"
                style={{
                  "--card-delay": `${index * 0.1}s`,
                }}
              >
                <div className="journey-card-inner">

                  {/* Top Number */}
                  <div className="journey-card-top">
                    <span className="journey-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="journey-dot"></span>
                  </div>

                  {/* Main Number */}
                  <h3 className="journey-value">
                    {counts[index]}
                    <span>{item.suffix}</span>
                  </h3>

                  {/* Label */}
                  <p className="journey-label">
                    {item.label}
                  </p>

                  {/* Bottom Accent */}
                  <div className="journey-card-accent"></div>

                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotionPixJourney;