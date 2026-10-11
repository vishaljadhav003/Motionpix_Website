import React, { useEffect, useRef, useState } from "react";
import "./LandingPages.css";

const landingPagesServices = [
  {
    number: "01",
    title: "Lead Generation Pages",
    description:
      "Focused landing pages built around a single offer, message and conversion path to capture qualified leads with minimal distraction.",
    icon: "lead",
  },
  {
    number: "02",
    title: "Product Landing Pages",
    description:
      "Product-focused pages that present features, value and supporting information through a clear visual hierarchy and structured experience.",
    icon: "product",
  },
  {
    number: "03",
    title: "Campaign Landing Pages",
    description:
      "Dedicated campaign pages designed around a specific promotion, audience or marketing message with focused content and consistent visual direction.",
    icon: "campaign",
  },
  {
    number: "04",
    title: "Service Landing Pages",
    description:
      "Service-specific pages that explain the offering, establish relevance and guide visitors through the information they need to understand the service.",
    icon: "service",
  },
  {
    number: "05",
    title: "Event Landing Pages",
    description:
      "Structured event pages that organise essential information such as event details, highlights, schedules and participation information.",
    icon: "event",
  },
  {
    number: "06",
    title: "Responsive Landing Pages",
    description:
      "Landing experiences designed to maintain hierarchy, readability and interaction quality across desktop, tablet and mobile screen sizes.",
    icon: "responsive",
  },
];

const landingPagesProcess = [
  {
    number: "01",
    title: "Goal & Audience",
    description:
      "We define the page objective, target audience, core message and the information visitors need before taking the intended next step.",
  },
  {
    number: "02",
    title: "Structure & Content",
    description:
      "Sections, hierarchy, headlines, supporting content and visual priorities are organised into a focused landing-page structure.",
  },
  {
    number: "03",
    title: "Design & Interaction",
    description:
      "The interface is developed with strong visual hierarchy, responsive layouts, purposeful interaction and a consistent visual language.",
  },
  {
    number: "04",
    title: "Refine & Deliver",
    description:
      "The complete page is reviewed across screen sizes and refined for clarity, consistency, spacing, interaction and presentation.",
  },
];

const landingPagesBenefits = [
  {
    number: "01",
    title: "Focused Communication",
    description:
      "A dedicated landing page keeps the message centred around one specific offer, product, service, campaign or objective.",
  },
  {
    number: "02",
    title: "Clear Information Hierarchy",
    description:
      "Content is organised so visitors can quickly understand what the page is about and find the information that matters.",
  },
  {
    number: "03",
    title: "Reduced Distraction",
    description:
      "Focused layouts remove unnecessary navigation and visual noise so the primary message remains easy to follow.",
  },
  {
    number: "04",
    title: "Responsive Experience",
    description:
      "The page adapts its layout, typography, spacing and interactive elements to provide a consistent experience across devices.",
  },
];

const landingPagesFaqs = [
  {
    question: "What is a landing page?",
    answer:
      "A landing page is a focused web page created around a specific objective, offer, campaign, product, service or audience. Its content and layout are structured around that particular purpose.",
  },
  {
    question: "What type of landing pages can be created?",
    answer:
      "Landing pages can be created for lead generation, products, services, marketing campaigns, events, promotions and other focused digital communication requirements.",
  },
  {
    question: "How is a landing page different from a normal website page?",
    answer:
      "A landing page is usually more focused around one objective and a defined audience or message, while a regular website page can contain broader navigation and multiple information areas.",
  },
  {
    question: "Are landing pages responsive?",
    answer:
      "Yes. The layout can be structured to adapt across desktop, tablet and mobile screen sizes while maintaining readable content, visual hierarchy and usable interactions.",
  },
  {
    question: "Can the landing page follow an existing brand style?",
    answer:
      "Yes. Typography, colour language, spacing, visual elements and content presentation can be structured to remain consistent with the required brand direction.",
  },
];

const LandingPagesIcon = ({ type }) => {
  return (
    <div className={`landingpages-icon landingpages-icon--${type}`}>
      {type === "lead" && (
        <>
          <span className="landingpages-lead-sheet" />
          <span className="landingpages-lead-line line-one" />
          <span className="landingpages-lead-line line-two" />
          <span className="landingpages-lead-target" />
        </>
      )}

      {type === "product" && (
        <>
          <span className="landingpages-product-screen" />
          <span className="landingpages-product-image" />
          <span className="landingpages-product-line line-one" />
          <span className="landingpages-product-line line-two" />
        </>
      )}

      {type === "campaign" && (
        <>
          <span className="landingpages-campaign-card" />
          <span className="landingpages-campaign-star" />
          <span className="landingpages-campaign-line line-one" />
          <span className="landingpages-campaign-line line-two" />
        </>
      )}

      {type === "service" && (
        <>
          <span className="landingpages-service-circle" />
          <span className="landingpages-service-node node-one" />
          <span className="landingpages-service-node node-two" />
          <span className="landingpages-service-node node-three" />
          <span className="landingpages-service-line line-one" />
          <span className="landingpages-service-line line-two" />
        </>
      )}

      {type === "event" && (
        <>
          <span className="landingpages-event-calendar" />
          <span className="landingpages-event-top" />
          <span className="landingpages-event-dot dot-one" />
          <span className="landingpages-event-dot dot-two" />
          <span className="landingpages-event-dot dot-three" />
        </>
      )}

      {type === "responsive" && (
        <>
          <span className="landingpages-responsive-desktop" />
          <span className="landingpages-responsive-mobile" />
          <span className="landingpages-responsive-line" />
        </>
      )}
    </div>
  );
};

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
      className={`landingpages-reveal landingpages-reveal--${direction} ${className}`}
      style={{
        "--landingpages-reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const LandingPages = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="landingpages-page">
      {/* HERO */}
      <section className="landingpages-hero">
        <div className="landingpages-hero-inner">
          <Reveal
            direction="left"
            className="landingpages-hero-content"
          >
            <span className="landingpages-eyebrow">
              LANDING PAGE DESIGN STUDIO
            </span>

            <h1>
              Pages Built
              <span> With Purpose.</span>
              <br />
              Experiences Built
              <span> To Focus.</span>
            </h1>

            <p>
              We create focused landing pages for products, services,
              campaigns, events and lead generation. Every section is
              structured around clear communication, strong hierarchy,
              responsive behaviour and a purposeful visitor experience.
            </p>

            <div className="landingpages-hero-meta">
              <span>Structure</span>
              <i />
              <span>Content</span>
              <i />
              <span>Design</span>
              <i />
              <span>Responsive</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="landingpages-hero-visual"
          >
            <div className="landingpages-browser">
              <div className="landingpages-browser-top">
                <div className="landingpages-browser-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="landingpages-browser-address">
                  landing-page / preview
                </div>

                <span className="landingpages-browser-index">
                  01
                </span>
              </div>

              <div className="landingpages-browser-content">
                <div className="landingpages-browser-nav">
                  <span className="landingpages-browser-logo" />

                  <div className="landingpages-browser-nav-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="landingpages-browser-hero">
                  <div className="landingpages-browser-copy">
                    <span className="landingpages-browser-kicker">
                      FOCUSED EXPERIENCE
                    </span>

                    <span className="landingpages-browser-title">
                      <i />
                      <i />
                      <i />
                    </span>

                    <span className="landingpages-browser-text">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>

                    <div className="landingpages-browser-action">
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="landingpages-browser-visual-card">
                    <div className="landingpages-browser-orbit" />
                    <div className="landingpages-browser-card-main">
                      <span />
                      <i />
                      <b />
                    </div>
                  </div>
                </div>

                <div className="landingpages-browser-sections">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="landingpages-browser-scroll">
                  <span />
                </div>
              </div>

              <div className="landingpages-browser-tag">
                <span>LANDING</span>
                <strong>PAGE</strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="landingpages-section landingpages-services"
        id="landingpages-services"
      >
        <div className="landingpages-container">
          <Reveal direction="up">
            <div className="landingpages-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Every landing page has
                <strong> one clear purpose.</strong>
              </h2>

              <p>
                From lead generation to product communication, each landing
                page is structured around a specific audience, message and
                digital objective.
              </p>
            </div>
          </Reveal>

          <div className="landingpages-services-list">
            {landingPagesServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="landingpages-service-wrap"
              >
                <article className="landingpages-service-card">
                  <div className="landingpages-service-number">
                    {service.number}
                  </div>

                  <LandingPagesIcon type={service.icon} />

                  <div className="landingpages-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="landingpages-service-arrow">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="landingpages-section landingpages-process">
        <div className="landingpages-container">
          <Reveal direction="left">
            <div className="landingpages-process-intro">
              <span>THE LANDING PAGE PROCESS</span>

              <h2>
                From the first
                <strong> objective </strong>
                to the final experience.
              </h2>

              <p>
                A focused process keeps the landing page clear, relevant,
                visually consistent and aligned with its intended audience
                and purpose.
              </p>
            </div>
          </Reveal>

          <div className="landingpages-process-line">
            {landingPagesProcess.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="landingpages-process-item"
              >
                <div className="landingpages-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="landingpages-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="landingpages-section landingpages-benefits">
        <div className="landingpages-container">
          <Reveal direction="right">
            <div className="landingpages-section-heading landingpages-section-heading--right">
              <span>WHY LANDING PAGES</span>

              <h2>
                Designed around
                <strong> focus.</strong>
              </h2>

              <p>
                A dedicated landing page creates a controlled environment
                where content, visual hierarchy and responsive behaviour work
                together around one specific purpose.
              </p>
            </div>
          </Reveal>

          <div className="landingpages-benefit-list">
            {landingPagesBenefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="landingpages-benefit">
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
      <section className="landingpages-section landingpages-faq">
        <div className="landingpages-container">
          <Reveal direction="up">
            <div className="landingpages-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> landing page.</strong>
              </h2>

              <p>
                A few practical details about planning, designing and
                delivering a focused landing-page experience.
              </p>
            </div>
          </Reveal>

          <div className="landingpages-faq-list">
            {landingPagesFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`landingpages-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="landingpages-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="landingpages-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="landingpages-final">
        <Reveal direction="up">
          <div className="landingpages-final-inner">
            <span>THE FINAL SECTION</span>

            <h2>
              A landing page
              <br />
              <strong>should stay focused.</strong>
            </h2>

            <p>
              When structure, content, design and responsive behaviour work
              together, every section has a reason to be there.
            </p>

            <div className="landingpages-final-line">
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

export default LandingPages;