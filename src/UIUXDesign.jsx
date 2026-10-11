import React, { useEffect, useRef, useState } from "react";
import "./UIUXDesign.css";

/* =========================================================
   UI / UX SERVICES
========================================================= */

const uiuxdesignServices = [
  {
    number: "01",
    title: "User Research",
    description:
      "User behaviour, needs, goals and pain points are studied to understand who the product is being designed for and what users actually need.",
    icon: "research",
  },
  {
    number: "02",
    title: "Information Architecture",
    description:
      "Content, navigation and functionality are organised into a clear structure so users can understand where they are and where they need to go.",
    icon: "architecture",
  },
  {
    number: "03",
    title: "Wireframing",
    description:
      "Low and mid-fidelity wireframes define layout, hierarchy, navigation and interaction patterns before visual styling is introduced.",
    icon: "wireframe",
  },
  {
    number: "04",
    title: "Interface Design",
    description:
      "Interfaces are designed with purposeful typography, spacing, colour, components and visual hierarchy to create a clear and consistent experience.",
    icon: "interface",
  },
  {
    number: "05",
    title: "Interactive Prototyping",
    description:
      "Clickable prototypes demonstrate navigation, transitions and user flows, making interactions easier to evaluate before development.",
    icon: "prototype",
  },
  {
    number: "06",
    title: "Usability Testing",
    description:
      "Key user flows are evaluated to identify friction, confusing interactions and usability issues before the final interface is implemented.",
    icon: "testing",
  },
];

/* =========================================================
   UI / UX PROCESS
========================================================= */

const uiuxdesignProcess = [
  {
    number: "01",
    title: "Discover & Research",
    description:
      "We understand the product, target users, business objectives, existing problems and expected user outcomes before defining the experience.",
  },
  {
    number: "02",
    title: "Structure & Wireframe",
    description:
      "User journeys, information architecture and wireframes are developed to establish the structure and functionality of each important screen.",
  },
  {
    number: "03",
    title: "Design & Prototype",
    description:
      "The interface receives its visual system while interactions, states and navigation are connected into a realistic clickable prototype.",
  },
  {
    number: "04",
    title: "Test & Refine",
    description:
      "Important flows are reviewed, usability problems are identified and the experience is refined for clarity, consistency and ease of use.",
  },
];

/* =========================================================
   UI / UX BENEFITS
========================================================= */

const uiuxdesignBenefits = [
  {
    number: "01",
    title: "Understand Users",
    description:
      "Research-led design helps create experiences around real user needs, expectations and behaviours instead of assumptions.",
  },
  {
    number: "02",
    title: "Improve Usability",
    description:
      "Clear hierarchy, navigation and interaction patterns make digital products easier to understand and use.",
  },
  {
    number: "03",
    title: "Create Consistency",
    description:
      "A structured interface system keeps screens, components, spacing and interactions visually and functionally consistent.",
  },
  {
    number: "04",
    title: "Reduce User Friction",
    description:
      "Thoughtful user flows and interaction decisions help remove unnecessary steps, confusion and avoidable usability problems.",
  },
];

/* =========================================================
   UI / UX FAQ
========================================================= */

const uiuxdesignFaqs = [
  {
    question: "What is included in UI/UX design?",
    answer:
      "UI/UX design can include user research, user flows, information architecture, wireframes, interface design, interactive prototypes and usability evaluation depending on the project requirements.",
  },
  {
    question: "What is the difference between UI and UX?",
    answer:
      "UX focuses on the overall user experience, including research, structure, navigation and usability. UI focuses on the visual interface, including typography, colour, spacing, components and visual hierarchy.",
  },
  {
    question: "Why are wireframes important?",
    answer:
      "Wireframes help define the structure and functionality of a screen before detailed visual design begins. They make it easier to identify layout and navigation problems early.",
  },
  {
    question: "Can you create interactive prototypes?",
    answer:
      "Yes. Interactive prototypes can connect screens and demonstrate navigation, user flows, interactions and important interface states before development starts.",
  },
  {
    question: "Is usability testing part of the design process?",
    answer:
      "Usability testing can be included to evaluate important user journeys, identify friction points and refine the interface before final implementation.",
  },
];

/* =========================================================
   UI / UX CUSTOM ICONS
========================================================= */

const UIUXDesignIcon = ({ type }) => {
  return (
    <div className={`uiuxdesign-icon uiuxdesign-icon--${type}`}>
      {type === "research" && (
        <>
          <span className="uiuxdesign-icon-user" />
          <span className="uiuxdesign-icon-search" />
          <span className="uiuxdesign-icon-search-handle" />
        </>
      )}

      {type === "architecture" && (
        <>
          <span className="uiuxdesign-icon-node node-top" />
          <span className="uiuxdesign-icon-node node-left" />
          <span className="uiuxdesign-icon-node node-right" />
          <span className="uiuxdesign-icon-branch branch-one" />
          <span className="uiuxdesign-icon-branch branch-two" />
        </>
      )}

      {type === "wireframe" && (
        <>
          <span className="uiuxdesign-wireframe-box" />
          <span className="uiuxdesign-wireframe-line line-one" />
          <span className="uiuxdesign-wireframe-line line-two" />
          <span className="uiuxdesign-wireframe-line line-three" />
          <span className="uiuxdesign-wireframe-button" />
        </>
      )}

      {type === "interface" && (
        <>
          <span className="uiuxdesign-interface-window" />
          <span className="uiuxdesign-interface-header" />
          <span className="uiuxdesign-interface-card card-one" />
          <span className="uiuxdesign-interface-card card-two" />
          <span className="uiuxdesign-interface-dot" />
        </>
      )}

      {type === "prototype" && (
        <>
          <span className="uiuxdesign-prototype-screen" />
          <span className="uiuxdesign-prototype-cursor" />
          <span className="uiuxdesign-prototype-click" />
          <span className="uiuxdesign-prototype-line" />
        </>
      )}

      {type === "testing" && (
        <>
          <span className="uiuxdesign-testing-circle" />
          <span className="uiuxdesign-testing-check" />
          <span className="uiuxdesign-testing-line line-one" />
          <span className="uiuxdesign-testing-line line-two" />
        </>
      )}
    </div>
  );
};

/* =========================================================
   BIDIRECTIONAL SCROLL REVEAL
========================================================= */

const Reveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) => {
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
      className={`uiuxdesign-reveal uiuxdesign-reveal--${direction} ${className}`}
      style={{
        "--uiuxdesign-reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* =========================================================
   UI / UX DESIGN PAGE
========================================================= */

const UIUXDesign = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="uiuxdesign-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="uiuxdesign-hero">
        <div className="uiuxdesign-hero-inner">
          <Reveal
            direction="left"
            className="uiuxdesign-hero-content"
          >
            <span className="uiuxdesign-eyebrow">
              UI / UX DESIGN STUDIO
            </span>

            <h1>
              Experiences
              <span> Designed.</span>
              <br />
              Interfaces
              <span> Understood.</span>
            </h1>

            <p>
              We design user-centred digital experiences by combining
              research, structure, interaction and visual design. Every
              screen is planned to make the product easier to understand,
              navigate and use.
            </p>

            <div className="uiuxdesign-hero-meta">
              <span>Research</span>
              <i />
              <span>Structure</span>
              <i />
              <span>Interface</span>
              <i />
              <span>Interaction</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="uiuxdesign-hero-visual"
          >
            <div className="uiuxdesign-design-board">
              <div className="uiuxdesign-board-top">
                <span>USER FLOW</span>
                <strong>UX / 024</strong>
              </div>

              <div className="uiuxdesign-flow">
                <div className="uiuxdesign-flow-node node-start">
                  <small>01</small>
                  <span>Discover</span>
                </div>

                <div className="uiuxdesign-flow-connector">
                  <span />
                </div>

                <div className="uiuxdesign-flow-node node-middle">
                  <small>02</small>
                  <span>Explore</span>
                </div>

                <div className="uiuxdesign-flow-connector">
                  <span />
                </div>

                <div className="uiuxdesign-flow-node node-end">
                  <small>03</small>
                  <span>Complete</span>
                </div>
              </div>

              <div className="uiuxdesign-wireframe-preview">
                <div className="uiuxdesign-preview-sidebar">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="uiuxdesign-preview-main">
                  <div className="uiuxdesign-preview-heading">
                    <span />
                    <span />
                  </div>

                  <div className="uiuxdesign-preview-cards">
                    <div />
                    <div />
                    <div />
                  </div>

                  <div className="uiuxdesign-preview-content">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>

              <div className="uiuxdesign-cursor">
                <span />
              </div>

              <div className="uiuxdesign-board-label label-one">
                WIREFRAME
              </div>

              <div className="uiuxdesign-board-label label-two">
                INTERACTION
              </div>

              <div className="uiuxdesign-board-grid" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="uiuxdesign-section uiuxdesign-services"
        id="uiuxdesign-services"
      >
        <div className="uiuxdesign-container">
          <Reveal direction="up">
            <div className="uiuxdesign-section-heading">
              <span>WHAT WE DESIGN</span>

              <h2>
                Every interaction has
                <strong> a reason.</strong>
              </h2>

              <p>
                From understanding users to refining interactions, our
                UI/UX design approach connects research, structure and
                interface decisions into one clear digital experience.
              </p>
            </div>
          </Reveal>

          <div className="uiuxdesign-services-list">
            {uiuxdesignServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="uiuxdesign-service-wrap"
              >
                <article className="uiuxdesign-service-card">
                  <div className="uiuxdesign-service-number">
                    {service.number}
                  </div>

                  <UIUXDesignIcon type={service.icon} />

                  <div className="uiuxdesign-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="uiuxdesign-service-arrow">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="uiuxdesign-section uiuxdesign-process">
        <div className="uiuxdesign-container">
          <Reveal direction="left">
            <div className="uiuxdesign-process-intro">
              <span>THE UI / UX PROCESS</span>

              <h2>
                From user
                <strong> needs </strong>
                to useful experiences.
              </h2>

              <p>
                A structured design process helps transform user needs
                into clear journeys, meaningful interfaces and
                purposeful interactions.
              </p>
            </div>
          </Reveal>

          <div className="uiuxdesign-process-line">
            {uiuxdesignProcess.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="uiuxdesign-process-item"
              >
                <div className="uiuxdesign-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="uiuxdesign-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="uiuxdesign-section uiuxdesign-benefits">
        <div className="uiuxdesign-container">
          <Reveal direction="right">
            <div className="uiuxdesign-section-heading">
              <span>WHY UI / UX DESIGN</span>

              <h2>
                Designed around
                <strong> the user.</strong>
              </h2>

              <p>
                Good UI/UX design creates a clear relationship between
                users, information and functionality so digital products
                feel easier and more natural to use.
              </p>
            </div>
          </Reveal>

          <div className="uiuxdesign-benefit-list">
            {uiuxdesignBenefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="uiuxdesign-benefit">
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

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="uiuxdesign-section uiuxdesign-faq">
        <div className="uiuxdesign-container">
          <Reveal direction="up">
            <div className="uiuxdesign-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> experience.</strong>
              </h2>

              <p>
                A few practical details about planning, designing and
                evaluating a UI/UX project.
              </p>
            </div>
          </Reveal>

          <div className="uiuxdesign-faq-list">
            {uiuxdesignFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`uiuxdesign-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="uiuxdesign-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="uiuxdesign-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL STATEMENT
          NO CTA
      ===================================================== */}

      <section className="uiuxdesign-final">
        <Reveal direction="up">
          <div className="uiuxdesign-final-inner">
            <span>THE FINAL EXPERIENCE</span>

            <h2>
              Great interfaces
              <br />
              <strong>feel effortless.</strong>
            </h2>

            <p>
              UI/UX design is not only about how a screen looks. It is
              about how naturally users understand, navigate and interact
              with the product.
            </p>

            <div className="uiuxdesign-final-line">
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

export default UIUXDesign;