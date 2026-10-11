
import React, { useEffect, useRef, useState } from "react";
import "./DigitalProductExperiences.css";

const dpxServices = [
  {
    number: "01",
    icon: "ux",
    title: "UI/UX Design",
    description:
      "User interfaces are planned around real user needs, clear navigation, visual hierarchy and accessible interactions. Every screen helps users understand what to do next.",
    tags: ["USER FLOW", "USABILITY"],
  },
  {
    number: "02",
    icon: "prototype",
    title: "Interactive Prototypes",
    description:
      "Clickable prototypes connect screens and actions into a realistic product journey, allowing teams to explore ideas and validate interactions before development.",
    tags: ["CLICKABLE", "VALIDATION"],
  },
  {
    number: "03",
    icon: "interface",
    title: "Digital Product Interfaces",
    description:
      "Web applications, dashboards and mobile experiences are organised into consistent interface systems that make information easy to scan and everyday tasks easier to complete.",
    tags: ["WEB APP", "DASHBOARD"],
  },
  {
    number: "04",
    icon: "micro",
    title: "Micro-interactions",
    description:
      "Thoughtful feedback for clicks, loading, toggles, form validation and completed actions helps users understand how the product responds to them.",
    tags: ["FEEDBACK", "MOTION"],
  },
  {
    number: "05",
    icon: "responsive",
    title: "Responsive Experiences",
    description:
      "Layouts and interactions adapt across desktop, tablet and mobile so the product remains usable, readable and consistent on different screen sizes.",
    tags: ["ADAPTIVE", "MULTI-DEVICE"],
  },
  {
    number: "06",
    icon: "system",
    title: "Design Systems",
    description:
      "Reusable components, typography, colours, spacing and interaction rules create a consistent product experience and help teams design and build more efficiently.",
    tags: ["COMPONENTS", "CONSISTENCY"],
  },
];

const dpxProcess = [
  {
    number: "01",
    title: "Discover",
    detail: "Understand the user",
    description:
      "Define the product goals, intended audience, user needs and main problems the experience must solve.",
  },
  {
    number: "02",
    title: "Design",
    detail: "Structure the journey",
    description:
      "Organise content, map user flows and design the screens, visual hierarchy and navigation.",
  },
  {
    number: "03",
    title: "Prototype",
    detail: "Connect the interactions",
    description:
      "Link screens into a clickable journey and demonstrate how important controls and actions behave.",
  },
  {
    number: "04",
    title: "Refine",
    detail: "Improve the experience",
    description:
      "Review usability, consistency, responsive layouts and interaction feedback before development handoff.",
  },
];

const dpxBenefits = [
  {
    number: "01",
    title: "Make Products Easier to Use",
    description:
      "Clear navigation, familiar patterns and meaningful feedback help users complete tasks with less confusion.",
  },
  {
    number: "02",
    title: "Create Consistent Experiences",
    description:
      "A shared visual language keeps screens, components and interactions connected across the product.",
  },
  {
    number: "03",
    title: "Validate Ideas Earlier",
    description:
      "Interactive prototypes help teams review user journeys and discover design problems before implementation.",
  },
  {
    number: "04",
    title: "Design for Every Screen",
    description:
      "Responsive layouts help the experience remain practical across desktop, tablet and mobile devices.",
  },
];

const dpxFaqs = [
  {
    question: "What are Digital Product Experiences?",
    answer:
      "Digital Product Experiences cover how people interact with a digital product, including its interface, navigation, content structure, usability, responsiveness and interaction feedback. The goal is to make the product useful, understandable and consistent.",
  },
  {
    question: "How are UI and UX different?",
    answer:
      "UI focuses on the visual interface, including layouts, typography, colours and controls. UX focuses on the overall journey: how users find information, complete tasks and experience the product. They work together to create a coherent product.",
  },
  {
    question: "Why create a prototype before development?",
    answer:
      "A prototype demonstrates the intended screens and interactions before the complete product is built. It helps teams discuss ideas, review navigation and identify usability issues earlier.",
  },
  {
    question: "Are digital product experiences only for mobile apps?",
    answer:
      "No. They can be designed for websites, web applications, dashboards, mobile apps, portals, digital tools and other interactive products.",
  },
  {
    question: "What does responsive product design mean?",
    answer:
      "Responsive design adapts layouts, content and controls to different screen sizes and input methods while keeping the product readable and usable.",
  },
];

function DpxIcon({ type }) {
  return (
    <div className={`dpx-icon dpx-icon--${type}`} aria-hidden="true">
      {type === "ux" && (
        <>
          <span className="dpx-ux-window" />
          <span className="dpx-ux-line dpx-ux-line--one" />
          <span className="dpx-ux-line dpx-ux-line--two" />
          <span className="dpx-ux-dot" />
        </>
      )}

      {type === "prototype" && (
        <>
          <span className="dpx-proto-screen dpx-proto-screen--one" />
          <span className="dpx-proto-screen dpx-proto-screen--two" />
          <span className="dpx-proto-link" />
          <span className="dpx-proto-node" />
        </>
      )}

      {type === "interface" && (
        <>
          <span className="dpx-interface-window" />
          <span className="dpx-interface-sidebar" />
          <span className="dpx-interface-block dpx-interface-block--one" />
          <span className="dpx-interface-block dpx-interface-block--two" />
          <span className="dpx-interface-block dpx-interface-block--three" />
        </>
      )}

      {type === "micro" && (
        <>
          <span className="dpx-micro-ring" />
          <span className="dpx-micro-core" />
          <span className="dpx-micro-spark dpx-micro-spark--one" />
          <span className="dpx-micro-spark dpx-micro-spark--two" />
        </>
      )}

      {type === "responsive" && (
        <>
          <span className="dpx-device dpx-device--desktop" />
          <span className="dpx-device dpx-device--tablet" />
          <span className="dpx-device dpx-device--mobile" />
        </>
      )}

      {type === "system" && (
        <>
          <span className="dpx-system-cell dpx-system-cell--one" />
          <span className="dpx-system-cell dpx-system-cell--two" />
          <span className="dpx-system-cell dpx-system-cell--three" />
          <span className="dpx-system-cell dpx-system-cell--four" />
        </>
      )}
    </div>
  );
}

function DpxReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("dpx-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("dpx-is-visible");
        } else {
          element.classList.remove("dpx-is-visible");
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`dpx-reveal dpx-reveal--${direction} ${className}`}
      style={{ "--dpx-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function DpxProductVisual() {
  return (
    <div className="dpx-product-visual">
      <div className="dpx-visual-topbar">
        <div className="dpx-window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="dpx-visual-label">PRODUCT / OVERVIEW</span>
        <span className="dpx-live-status">
          <i />
          LIVE UI
        </span>
      </div>

      <div className="dpx-dashboard">
        <aside className="dpx-dashboard-sidebar" aria-label="Illustrative dashboard navigation">
          <div className="dpx-brand-mark">P.</div>
          <span className="dpx-side-icon dpx-side-icon--active">⌂</span>
          <span className="dpx-side-icon">▦</span>
          <span className="dpx-side-icon">◷</span>
          <span className="dpx-side-icon">⚙</span>
        </aside>

        <div className="dpx-dashboard-main">
          <div className="dpx-dashboard-heading">
            <div>
              <span className="dpx-mini-label">YOUR WORKSPACE</span>
              <h3>Product overview</h3>
              <p>Everything in one clear view.</p>
            </div>
            <span className="dpx-avatar">V</span>
          </div>

          <div className="dpx-metric-grid">
            <div className="dpx-metric-card">
              <span>Projects</span>
              <strong>12</strong>
              <i className="dpx-metric-line dpx-metric-line--one" />
            </div>
            <div className="dpx-metric-card">
              <span>Completion</span>
              <strong>84%</strong>
              <div className="dpx-progress-track">
                <i />
              </div>
            </div>
          </div>

          <div className="dpx-dashboard-panel">
            <div className="dpx-panel-heading">
              <span>Recent activity</span>
              <span className="dpx-panel-menu">•••</span>
            </div>

            <div className="dpx-activity-row">
              <span className="dpx-activity-symbol dpx-activity-symbol--red">↗</span>
              <span className="dpx-activity-copy">
                <strong>Website redesign</strong>
                <small>Interface updated</small>
              </span>
              <span className="dpx-activity-status">Done</span>
            </div>

            <div className="dpx-activity-row">
              <span className="dpx-activity-symbol dpx-activity-symbol--blue">◈</span>
              <span className="dpx-activity-copy">
                <strong>Mobile prototype</strong>
                <small>Interaction review</small>
              </span>
              <span className="dpx-activity-status dpx-activity-status--review">
                Review
              </span>
            </div>

            <div className="dpx-activity-row">
              <span className="dpx-activity-symbol dpx-activity-symbol--gold">⌘</span>
              <span className="dpx-activity-copy">
                <strong>Design system</strong>
                <small>Components organised</small>
              </span>
              <span className="dpx-activity-status">Ready</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dpx-floating-note dpx-floating-note--top">
        <span className="dpx-note-check">✓</span>
        <span>
          <strong>Clear navigation</strong>
          <small>Find the next step</small>
        </span>
      </div>

      <div className="dpx-floating-note dpx-floating-note--bottom">
        <span className="dpx-note-pulse" />
        <span>
          <strong>Responsive by design</strong>
          <small>Desktop · Tablet · Mobile</small>
        </span>
      </div>

      <div className="dpx-visual-caption">
        <span>01 — INTERFACE</span>
        <span>02 — INTERACTION</span>
        <span>03 — EXPERIENCE</span>
      </div>
    </div>
  );
}

export default function DigitalProductExperiences() {
  const [activeFaq, setActiveFaq] = useState(0);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="dpx-page">
      <section className="dpx-hero">
        <div className="dpx-container dpx-hero-grid">
          <DpxReveal direction="left" className="dpx-hero-copy">
            <span className="dpx-eyebrow">
              DIGITAL PRODUCTS / UI / UX
            </span>

            <h1>
              Better journeys.
              <br />
              <span>Meaningful</span>
              <br />
              digital experiences.
            </h1>

            <p className="dpx-hero-description">
              We shape digital products around the people who use them.
              From clear interfaces and connected user journeys to interactive
              prototypes and responsive layouts, every detail is designed to
              make digital interactions feel intuitive, useful and consistent.
            </p>

            <div className="dpx-hero-meta" aria-label="Experience design principles">
              <span>Understand</span>
              <i />
              <span>Design</span>
              <i />
              <span>Interact</span>
              <i />
              <span>Improve</span>
            </div>

            <div className="dpx-hero-footnote">
              <span className="dpx-footnote-mark">✳</span>
              <p>
                Design is not just how a product looks.
                <strong> It is how the product works for people.</strong>
              </p>
            </div>
          </DpxReveal>

          <DpxReveal
            direction="right"
            delay={120}
            className="dpx-hero-art"
          >
            <DpxProductVisual />
          </DpxReveal>
        </div>
      </section>

      <section className="dpx-section dpx-services">
        <div className="dpx-container">
          <DpxReveal direction="left">
            <div className="dpx-section-heading">
              <span className="dpx-section-kicker">WHAT SHAPES THE EXPERIENCE</span>
              <h2>
                Every interaction has
                <strong> a purpose.</strong>
              </h2>
              <p>
                A digital product becomes easier to understand when its
                interface, content, interactions and responsive behaviour
                work together as one considered experience.
              </p>
            </div>
          </DpxReveal>

          <div className="dpx-service-list">
            {dpxServices.map((service, index) => (
              <DpxReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 65}
                className="dpx-service-wrap"
              >
                <article className="dpx-service-card">
                  <span className="dpx-service-number">{service.number}</span>
                  <DpxIcon type={service.icon} />

                  <div className="dpx-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="dpx-service-tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <span className="dpx-service-mark" aria-hidden="true">
                    ↗
                  </span>
                </article>
              </DpxReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dpx-section dpx-process">
        <div className="dpx-container">
          <DpxReveal direction="right">
            <div className="dpx-process-intro">
              <span className="dpx-section-kicker">FROM NEED TO EXPERIENCE</span>
              <h2>
                A thoughtful process.
                <strong> A clearer product.</strong>
              </h2>
              <p>
                Product experiences are developed step by step, keeping user
                needs, product goals and practical interactions connected
                throughout the design process.
              </p>
            </div>
          </DpxReveal>

          <div className="dpx-process-list">
            {dpxProcess.map((step, index) => (
              <DpxReveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 85}
                className="dpx-process-item"
              >
                <div className="dpx-process-marker">
                  <span>{step.number}</span>
                </div>
                <div className="dpx-process-content">
                  <span>{step.detail}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <div className="dpx-process-symbol" aria-hidden="true">
                  {index === 0 ? "⌕" : index === 1 ? "⌘" : index === 2 ? "↗" : "✓"}
                </div>
              </DpxReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dpx-section dpx-benefits">
        <div className="dpx-container dpx-benefits-grid">
          <DpxReveal direction="left" className="dpx-benefits-heading">
            <span className="dpx-section-kicker">WHY PRODUCT EXPERIENCE MATTERS</span>
            <h2>
              Make every
              <strong> step feel natural.</strong>
            </h2>
            <p>
              A well-considered digital experience helps people understand
              where they are, what they can do and what happens next.
            </p>
            <div className="dpx-principle">
              <span>THE PRINCIPLE</span>
              <strong>Clarity first. Complexity only when needed.</strong>
            </div>
          </DpxReveal>

          <div className="dpx-benefit-list">
            {dpxBenefits.map((benefit, index) => (
              <DpxReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 75}
              >
                <article className="dpx-benefit-card">
                  <span>{benefit.number}</span>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                  <i aria-hidden="true" />
                </article>
              </DpxReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dpx-section dpx-faq">
        <div className="dpx-container dpx-faq-grid">
          <DpxReveal direction="left" className="dpx-faq-heading">
            <span className="dpx-section-kicker">COMMON QUESTIONS</span>
            <h2>
              Understanding
              <strong> product experience.</strong>
            </h2>
            <p>
              Explore the foundations of user experience, interface design
              and interactive digital products.
            </p>
          </DpxReveal>

          <div className="dpx-faq-list">
            {dpxFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <DpxReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "right" : "left"}
                  delay={index * 55}
                >
                  <article className={`dpx-faq-item ${isActive ? "dpx-faq-item--active" : ""}`}>
                    <button
                      type="button"
                      className="dpx-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={`dpx-faq-answer-${index}`}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>
                      <b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>

                    <div
                      id={`dpx-faq-answer-${index}`}
                      className="dpx-faq-answer"
                      hidden={!isActive}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                </DpxReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="dpx-final">
        <DpxReveal direction="up">
          <div className="dpx-container dpx-final-inner">
            <span className="dpx-section-kicker">THE EXPERIENCE IS THE PRODUCT</span>
            <h2>
              Built around people.
              <br />
              <strong>Designed for real journeys.</strong>
            </h2>
            <p>
              The best digital products bring usefulness, clarity and
              interaction together — so every screen feels like part of
              one connected experience.
            </p>

            <div className="dpx-final-flow" aria-hidden="true">
              <span>USER NEED</span>
              <i />
              <span>INTERFACE</span>
              <i />
              <span>INTERACTION</span>
              <i />
              <span>EXPERIENCE</span>
            </div>
          </div>
        </DpxReveal>
      </section>
    </main>
  );
}