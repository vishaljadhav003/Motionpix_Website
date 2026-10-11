import React, { useEffect, useRef, useState } from "react";
import "./MotionGraphics.css";

const motionServices = [
  {
    number: "01",
    title: "Kinetic Typography",
    description:
      "Words are treated as visual elements — animated with rhythm, weight, scale and timing so that text itself becomes the moving image and carries the message with impact.",
    icon: "kinetic",
  },
  {
    number: "02",
    title: "Logo Animation & Idents",
    description:
      "Static logos are brought to life through purposeful movement — reveals, morphs, loops and transitions that give a brand a signature motion identity across every screen.",
    icon: "logoanim",
  },
  {
    number: "03",
    title: "Infographic & Data Motion",
    description:
      "Numbers, charts and statistics are animated into flowing visual sequences that make data easier to read, compare and remember within seconds.",
    icon: "data",
  },
  {
    number: "04",
    title: "Title & Broadcast Graphics",
    description:
      "Opening titles, lower-thirds, transitions and channel packaging designed with cinematic timing for films, series, events and broadcast content.",
    icon: "title",
  },
  {
    number: "05",
    title: "UI / UX Motion Design",
    description:
      "Micro-interactions, screen transitions, loading states and product UI animations that make digital interfaces feel responsive, alive and intuitive.",
    icon: "ui",
  },
  {
    number: "06",
    title: "Promo & Social Motion",
    description:
      "High-energy promos, product teasers and platform-optimised social motion graphics engineered to stop the scroll and hold attention in the first three seconds.",
    icon: "promo",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Concept & Storyboard",
    description:
      "The message, rhythm and visual flow are mapped frame by frame before animation begins — so every movement has a reason to exist.",
  },
  {
    number: "02",
    title: "Style Frames & Design",
    description:
      "Typography, colour language, graphic elements and composition are locked into style frames that define the look and feel of the motion.",
  },
  {
    number: "03",
    title: "Animation & Timing",
    description:
      "Elements are animated with precise easing, pacing and transitions — where timing curves and frame-by-frame control create the signature feel.",
  },
  {
    number: "04",
    title: "Sound Sync & Delivery",
    description:
      "Motion is synchronised with music, voice or sound effects, then exported in optimised formats for web, broadcast, social or presentation use.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Instant Attention",
    description:
      "Moving type, shapes and graphics capture the eye far faster than static visuals — critical for feeds, ads and crowded digital spaces.",
  },
  {
    number: "02",
    title: "Clearer Communication",
    description:
      "Sequential motion breaks information into digestible moments, guiding the viewer's eye exactly where it needs to go.",
  },
  {
    number: "03",
    title: "Consistent Brand Motion",
    description:
      "A defined motion language — easing, speed, transitions — makes every brand touchpoint feel engineered and recognisable.",
  },
  {
    number: "04",
    title: "Built for Every Platform",
    description:
      "Motion graphic systems scale cleanly from a 6-second reel to a full broadcast package without losing visual identity.",
  },
];

const faqs = [
  {
    question: "What exactly is motion graphics?",
    answer:
      "Motion graphics is the art of animating graphic elements — typography, shapes, icons, logos and illustrations — to communicate ideas, emotions and information through movement, rather than filming real-world footage.",
  },
  {
    question: "How is motion graphics different from 2D character animation?",
    answer:
      "2D character animation focuses on characters acting out a story, while motion graphics focuses on animated graphic design — text, shapes, logos and data — often without characters at all. Both can be combined in one project.",
  },
  {
    question: "Can my existing logo be animated?",
    answer:
      "Yes. Any logo can be converted into an animated ident — from a simple clean reveal to a complex multi-element animation. We design the movement around your brand's personality.",
  },
  {
    question: "How long should a motion graphics video be?",
    answer:
      "It depends on the platform. Social content typically works best at 6–30 seconds, explainers at 60–90 seconds, and title sequences or brand idents between 5–15 seconds. We design pacing accordingly.",
  },
  {
    question: "Do you also add sound and music?",
    answer:
      "Yes. Sound design, music syncing and voice-over timing are integral parts of the motion graphics process — movement and audio are composed together for maximum impact.",
  },
];

/* ---------- Custom CSS-Only Motion Graphic Icons ---------- */

const MotionIcon = ({ type }) => {
  return (
    <div className={`mpg-icon mpg-icon--${type}`}>
      {type === "kinetic" && (
        <>
          <span className="mpg-kinetic-a">A</span>
          <span className="mpg-kinetic-g">G</span>
          <span className="mpg-kinetic-line" />
          <span className="mpg-kinetic-dot" />
        </>
      )}

      {type === "logoanim" && (
        <>
          <span className="mpg-ident-star" />
          <span className="mpg-ident-ring" />
          <span className="mpg-ident-sweep" />
        </>
      )}

      {type === "data" && (
        <>
          <span className="mpg-bar mpg-bar-one" />
          <span className="mpg-bar mpg-bar-two" />
          <span className="mpg-bar mpg-bar-three" />
          <span className="mpg-data-axis" />
          <span className="mpg-data-dot" />
        </>
      )}

      {type === "title" && (
        <>
          <span className="mpg-title-frame" />
          <span className="mpg-title-bar" />
          <span className="mpg-title-play" />
          <span className="mpg-title-tick tick-one" />
          <span className="mpg-title-tick tick-two" />
        </>
      )}

      {type === "ui" && (
        <>
          <span className="mpg-ui-window" />
          <span className="mpg-ui-cursor" />
          <span className="mpg-ui-click" />
          <span className="mpg-ui-dot dot-one" />
          <span className="mpg-ui-dot dot-two" />
          <span className="mpg-ui-dot dot-three" />
        </>
      )}

      {type === "promo" && (
        <>
          <span className="mpg-promo-play" />
          <span className="mpg-promo-ring ring-one" />
          <span className="mpg-promo-ring ring-two" />
          <span className="mpg-promo-spark spark-one" />
          <span className="mpg-promo-spark spark-two" />
        </>
      )}
    </div>
  );
};

/* ---------- Bi-directional Scroll Reveal ---------- */

const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
        } else {
          element.classList.remove("is-visible");
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`mpg-reveal mpg-reveal--${direction} ${className}`}
      style={{ "--mpg-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const MotionGraphics = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="mpg-page">
      {/* ========================= HERO ========================= */}
      <section className="mpg-hero">
        <div className="mpg-hero-inner">
          <Reveal direction="left" className="mpg-hero-content">
            <span className="mpg-eyebrow">MOTION / GRAPHICS STUDIO</span>

            <h1>
              Design In
              <span> Motion.</span>
              <br />
              Graphics That
              <span> Speak.</span>
            </h1>

            <p>
              We craft high-impact motion graphics — kinetic typography,
              animated logos, data visualisation, broadcast titles and UI
              motion. Every frame is engineered around timing, rhythm and
              visual hierarchy, turning static design into communication
              that moves, breathes and holds attention.
            </p>

            <div className="mpg-hero-meta">
              <span>Type</span>
              <i />
              <span>Shape</span>
              <i />
              <span>Rhythm</span>
              <i />
              <span>Motion</span>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="mpg-hero-visual">
            <div className="mpg-stage">
              <div className="mpg-stage-label">
                <span>SEQ</span>
                <strong>048</strong>
              </div>

              {/* Floating graphic layers */}
              <div className="mpg-layer layer-one">
                <span className="layer-glyph">M</span>
              </div>

              <div className="mpg-layer layer-two">
                <span className="layer-ring" />
              </div>

              {/* Central kinetic word */}
              <div className="mpg-kinetic-word">
                <span className="kw-letter kw-a">M</span>
                <span className="kw-letter kw-b">O</span>
                <span className="kw-letter kw-c">T</span>
                <span className="kw-letter kw-d">I</span>
                <span className="kw-letter kw-e">O</span>
                <span className="kw-letter kw-f">N</span>
              </div>

              {/* Easing curve path */}
              <div className="mpg-ease-path">
                <svg viewBox="0 0 200 100" aria-hidden="true">
                  <path
                    d="M5 95 C 60 95, 70 10, 195 10"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
                <span className="ease-dot" />
              </div>

              {/* Bezier / playhead timeline */}
              <div className="mpg-timeline">
                <div className="mpg-timeline-head">
                  <span>KF</span>
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                </div>

                <div className="mpg-timeline-track">
                  <span className="kf kf-active" />
                  <span className="kf" />
                  <span className="kf kf-ease" />
                  <span className="kf" />
                  <span className="kf kf-active" />
                </div>

                <div className="mpg-playhead" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================= SERVICES ========================= */}
      <section className="mpg-section mpg-services" id="motiongraphics-services">
        <div className="mpg-container">
          <Reveal direction="up">
            <div className="mpg-section-heading">
              <span>WHAT WE ANIMATE</span>
              <h2>
                Every movement has
                <strong> a rhythm.</strong>
              </h2>
              <p>
                From a single animated logo to a full multi-platform motion
                system, our motion graphics work combines typography,
                geometry and timing into communication that performs.
              </p>
            </div>
          </Reveal>

          <div className="mpg-services-list">
            {motionServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="mpg-service-wrap"
              >
                <article className="mpg-service-card">
                  <div className="mpg-service-number">{service.number}</div>

                  <MotionIcon type={service.icon} />

                  <div className="mpg-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="mpg-service-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= PROCESS ========================= */}
      <section className="mpg-section mpg-process">
        <div className="mpg-container">
          <Reveal direction="left">
            <div className="mpg-process-intro">
              <span>THE MOTION PROCESS</span>
              <h2>
                From a static frame
                <strong> to fluid motion.</strong>
              </h2>
              <p>
                A disciplined production pipeline keeps every animation
                purposeful — each easing curve, transition and beat
                designed before a single keyframe is set.
              </p>
            </div>
          </Reveal>

          <div className="mpg-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="mpg-process-item"
              >
                <div className="mpg-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="mpg-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= BENEFITS ========================= */}
      <section className="mpg-section mpg-benefits">
        <div className="mpg-container">
          <Reveal direction="right">
            <div className="mpg-section-heading">
              <span>WHY MOTION GRAPHICS</span>
              <h2>
                Static design
                <strong> can't keep up.</strong>
              </h2>
              <p>
                Motion graphics turn passive viewing into guided
                experience — the eye follows movement, and movement
                follows the message.
              </p>
            </div>
          </Reveal>

          <div className="mpg-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="mpg-benefit">
                  <span>{benefit.number}</span>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <i />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FAQ ========================= */}
      <section className="mpg-section mpg-faq">
        <div className="mpg-container">
          <Reveal direction="up">
            <div className="mpg-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Understanding the
                <strong> craft.</strong>
              </h2>
              <p>
                Practical answers about what motion graphics are, how
                projects run and where they deliver the most value.
              </p>
            </div>
          </Reveal>

          <div className="mpg-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`mpg-faq-item ${isActive ? "is-active" : ""}`}
                  >
                    <button
                      type="button"
                      className="mpg-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="mpg-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================= FINAL STATEMENT (NO CTA) ========================= */}
      <section className="mpg-final">
        <Reveal direction="up">
          <div className="mpg-final-inner">
            <span>THE LAST FRAME</span>

            <h2>
              Design was never
              <br />
              <strong>meant to sit still.</strong>
            </h2>

            <p>
              Motion gives design a pulse — a rhythm the eye follows and
              the mind remembers long after the screen goes dark.
            </p>

            <div className="mpg-final-line">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default MotionGraphics;