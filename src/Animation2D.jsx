import React, { useEffect, useRef, useState } from "react";
import "./Animation2D.css";

const animationServices = [
  {
    number: "01",
    title: "Explainer Animation",
    description:
      "Complex products, services and technical ideas are transformed into clear visual stories using purposeful scenes, character movement, transitions and controlled pacing.",
    icon: "explainer",
  },
  {
    number: "02",
    title: "Character Animation",
    description:
      "Expressive 2D characters are designed with strong silhouettes, readable poses and natural movement to communicate personality, emotion and narrative.",
    icon: "character",
  },
  {
    number: "03",
    title: "Motion Graphics",
    description:
      "Typography, shapes, icons, diagrams and graphical elements are animated with precise timing to create engaging brand, corporate and promotional communication.",
    icon: "motion",
  },
  {
    number: "04",
    title: "Educational Animation",
    description:
      "Learning concepts are converted into structured visual sequences that make complicated subjects easier to understand, remember and communicate.",
    icon: "education",
  },
  {
    number: "05",
    title: "Brand Storytelling",
    description:
      "Brand messages are developed into visual narratives where composition, movement, character, colour and timing work together to build a memorable story.",
    icon: "story",
  },
  {
    number: "06",
    title: "Product Animation",
    description:
      "Product features, workflows and benefits are presented through controlled 2D sequences that clearly show how a product works and why it matters.",
    icon: "product",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Story & Script",
    description:
      "We define the message, audience, narrative structure and scene progression before visual production begins.",
  },
  {
    number: "02",
    title: "Design Direction",
    description:
      "Characters, environments, typography, colour language and visual style are established to create a consistent animation system.",
  },
  {
    number: "03",
    title: "Motion & Timing",
    description:
      "Every transition, character action and graphic movement is timed to create rhythm, clarity and visual continuity.",
  },
  {
    number: "04",
    title: "Final Delivery",
    description:
      "The completed animation is refined, reviewed and prepared for the required digital, presentation, social or marketing format.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Simplify Complex Ideas",
    description:
      "Visual storytelling can break down complicated products, processes and concepts into understandable scenes.",
  },
  {
    number: "02",
    title: "Create Visual Identity",
    description:
      "A consistent illustration and motion language helps organisations communicate with a recognisable visual style.",
  },
  {
    number: "03",
    title: "Control Emotion & Pace",
    description:
      "Timing, expressions, transitions and composition can be carefully controlled to guide how the audience experiences the story.",
  },
  {
    number: "04",
    title: "Adapt Across Platforms",
    description:
      "The animation approach can be structured for websites, presentations, social content, campaigns, training and digital communication.",
  },
];

const faqs = [
  {
    question: "What type of projects can be created with 2D animation?",
    answer:
      "2D animation can be used for explainer videos, corporate communication, product demonstrations, educational content, training material, brand storytelling, promotional campaigns and motion graphic sequences.",
  },
  {
    question: "Can character animation and motion graphics be combined?",
    answer:
      "Yes. Character-driven storytelling can be combined with typography, diagrams, icons, transitions and other motion-graphic elements within the same animation.",
  },
  {
    question: "How is the animation style decided?",
    answer:
      "The visual direction is selected according to the message, audience, brand identity and communication objective. Character style, illustration language, typography and movement are planned together.",
  },
  {
    question: "Can complex technical information be animated?",
    answer:
      "Yes. Technical workflows, product functions and processes can be broken into smaller visual scenes so that each step is easier to understand.",
  },
  {
    question: "Where can the final animation be used?",
    answer:
      "The final animation can be prepared for websites, presentations, social media, digital campaigns, internal communication, training platforms and other required digital formats.",
  },
];

const AnimationIcon = ({ type }) => {
  return (
    <div className={`animation2d-icon animation2d-icon--${type}`}>
      {type === "explainer" && (
        <>
          <span className="icon-paper" />
          <span className="icon-line icon-line-one" />
          <span className="icon-line icon-line-two" />
          <span className="icon-play" />
        </>
      )}

      {type === "character" && (
        <>
          <span className="icon-head" />
          <span className="icon-eye icon-eye-one" />
          <span className="icon-eye icon-eye-two" />
          <span className="icon-mouth" />
          <span className="icon-body" />
        </>
      )}

      {type === "motion" && (
        <>
          <span className="icon-motion-shape shape-one" />
          <span className="icon-motion-shape shape-two" />
          <span className="icon-motion-shape shape-three" />
          <span className="icon-motion-line" />
        </>
      )}

      {type === "education" && (
        <>
          <span className="icon-book" />
          <span className="icon-book-line line-one" />
          <span className="icon-book-line line-two" />
          <span className="icon-book-dot" />
        </>
      )}

      {type === "story" && (
        <>
          <span className="icon-story-circle" />
          <span className="icon-story-ring" />
          <span className="icon-story-line line-one" />
          <span className="icon-story-line line-two" />
        </>
      )}

      {type === "product" && (
        <>
          <span className="icon-product-box" />
          <span className="icon-product-top" />
          <span className="icon-product-line line-one" />
          <span className="icon-product-line line-two" />
        </>
      )}
    </div>
  );
};

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
      className={`animation2d-reveal animation2d-reveal--${direction} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Animation2D = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="animation2d-page">
      {/* HERO */}
      <section className="animation2d-hero">
        <div className="animation2d-hero-inner">
          <Reveal direction="left" className="animation2d-hero-content">
            <span className="animation2d-eyebrow">
              02D / ANIMATION STUDIO
            </span>

            <h1>
              Ideas That
              <span> Move.</span>
              <br />
              Stories That
              <span> Stay.</span>
            </h1>

            <p>
              We create purposeful 2D animation for brands, products,
              technical communication and storytelling. Every frame is
              designed around clarity, timing and visual impact — turning
              information into movement and movement into memorable
              communication.
            </p>

            <div className="animation2d-hero-meta">
              <span>Story</span>
              <i />
              <span>Design</span>
              <i />
              <span>Motion</span>
              <i />
              <span>Sound</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="animation2d-hero-visual"
          >
            <div className="animation2d-stage">
              <div className="animation2d-stage-label">
                <span>FRAME</span>
                <strong>024</strong>
              </div>

              <div className="animation2d-frame frame-one">
                <span />
              </div>

              <div className="animation2d-frame frame-two">
                <span />
              </div>

              <div className="animation2d-character">
                <div className="character-head">
                  <span className="character-eye eye-one" />
                  <span className="character-eye eye-two" />
                  <span className="character-mouth" />
                </div>

                <div className="character-body">
                  <span className="character-arm arm-left" />
                  <span className="character-arm arm-right" />
                </div>

                <div className="character-leg leg-left" />
                <div className="character-leg leg-right" />
              </div>

              <div className="animation2d-motion-path">
                <span />
                <span />
                <span />
              </div>

              <div className="animation2d-timeline">
                <div className="timeline-head">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                  <span>06</span>
                </div>

                <div className="timeline-track">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="timeline-playhead" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="animation2d-section animation2d-services"
        id="animation2d-services"
      >
        <div className="animation2d-container">
          <Reveal direction="up">
            <div className="animation2d-section-heading">
              <span>WHAT WE CREATE</span>
              <h2>
                Every frame has
                <strong> a purpose.</strong>
              </h2>
              <p>
                From a single product feature to a complete visual narrative,
                our 2D animation approach combines design, storytelling and
                movement to communicate with precision.
              </p>
            </div>
          </Reveal>

          <div className="animation2d-services-list">
            {animationServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="animation2d-service-wrap"
              >
                <article className="animation2d-service-card">
                  <div className="animation2d-service-number">
                    {service.number}
                  </div>

                  <AnimationIcon type={service.icon} />

                  <div className="animation2d-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="animation2d-service-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="animation2d-section animation2d-process">
        <div className="animation2d-container">
          <Reveal direction="left">
            <div className="animation2d-process-intro">
              <span>THE ANIMATION PROCESS</span>
              <h2>
                From the first
                <strong> idea </strong>
                to the final frame.
              </h2>
              <p>
                A structured production process keeps the story clear, the
                visual language consistent and every movement intentional.
              </p>
            </div>
          </Reveal>

          <div className="animation2d-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="animation2d-process-item"
              >
                <div className="animation2d-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="animation2d-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="animation2d-section animation2d-benefits">
        <div className="animation2d-container">
          <Reveal direction="right">
            <div className="animation2d-section-heading">
              <span>WHY 2D ANIMATION</span>
              <h2>
                Designed to make
                <strong> information move.</strong>
              </h2>
              <p>
                2D animation gives control over visual hierarchy, timing and
                storytelling, making it suitable for communication that needs
                both clarity and personality.
              </p>
            </div>
          </Reveal>

          <div className="animation2d-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="animation2d-benefit">
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

      {/* FAQ */}
      <section className="animation2d-section animation2d-faq">
        <div className="animation2d-container">
          <Reveal direction="up">
            <div className="animation2d-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Understanding the
                <strong> process.</strong>
              </h2>
              <p>
                A few practical details about planning, designing and
                delivering a 2D animation project.
              </p>
            </div>
          </Reveal>

          <div className="animation2d-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`animation2d-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="animation2d-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="animation2d-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA BUTTON */}
      <section className="animation2d-final">
        <Reveal direction="up">
          <div className="animation2d-final-inner">
            <span>THE FINAL FRAME</span>

            <h2>
              Good animation
              <br />
              <strong>doesn't just move.</strong>
            </h2>

            <p>
              It gives an idea rhythm, emotion and a visual language that
              people can understand and remember.
            </p>

            <div className="animation2d-final-line">
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

export default Animation2D;