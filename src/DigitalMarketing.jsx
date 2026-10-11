import React, { useEffect, useRef, useState } from "react";
import "./DigitalPresentations.css";

const presentationServices = [
  {
    number: "01",
    title: "Corporate Presentations",
    description:
      "Structured presentation decks that organise company information, achievements, capabilities and key messages into a clear professional visual flow.",
    icon: "corporate",
  },
  {
    number: "02",
    title: "Business & Sales Decks",
    description:
      "Focused presentation layouts that highlight business propositions, offerings, key points and supporting information without overwhelming the audience.",
    icon: "sales",
  },
  {
    number: "03",
    title: "Product Presentations",
    description:
      "Product-focused slides that visually explain features, specifications, workflows and value through clear layouts, diagrams and information hierarchy.",
    icon: "product",
  },
  {
    number: "04",
    title: "Pitch Decks",
    description:
      "Concise and visually structured decks that organise an idea, opportunity, solution, market information and key numbers into a compelling presentation sequence.",
    icon: "pitch",
  },
  {
    number: "05",
    title: "Data & Infographic Slides",
    description:
      "Complex data, statistics and information are transformed into readable charts, visual comparisons, diagrams and infographic-based presentation slides.",
    icon: "data",
  },
  {
    number: "06",
    title: "Interactive Presentation Design",
    description:
      "Presentation experiences are designed with visual navigation, progressive information flow and interactive elements to make important content easier to explore.",
    icon: "interactive",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Content & Objective",
    description:
      "We identify the presentation objective, audience, key information and communication priorities before defining the slide structure.",
  },
  {
    number: "02",
    title: "Structure & Story",
    description:
      "Content is organised into a logical sequence where every slide has a clear purpose and naturally connects to the next.",
  },
  {
    number: "03",
    title: "Visual Design",
    description:
      "Typography, layouts, diagrams, charts, spacing and visual hierarchy are developed into a consistent presentation system.",
  },
  {
    number: "04",
    title: "Refine & Deliver",
    description:
      "The complete deck is reviewed for consistency, readability, alignment and presentation flow before final delivery.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Communicate Clearly",
    description:
      "A strong presentation structure makes important information easier to understand without unnecessary visual complexity.",
  },
  {
    number: "02",
    title: "Build Visual Consistency",
    description:
      "Consistent typography, spacing, layouts and visual elements create a professional presentation experience from the first slide to the last.",
  },
  {
    number: "03",
    title: "Present Information Better",
    description:
      "Charts, diagrams, comparisons and structured layouts help turn dense information into content that is easier to read and explain.",
  },
  {
    number: "04",
    title: "Keep Attention Focused",
    description:
      "Controlled visual hierarchy guides the audience toward the most important message on every slide.",
  },
];

const faqs = [
  {
    question: "What types of digital presentations can be designed?",
    answer:
      "Digital presentations can include corporate decks, business presentations, sales decks, product presentations, pitch decks, data presentations, infographic slides and interactive presentation experiences.",
  },
  {
    question: "Can complex information be converted into presentation slides?",
    answer:
      "Yes. Dense information can be organised into structured slides using diagrams, comparisons, charts, visual hierarchy and concise content blocks.",
  },
  {
    question: "How is the presentation structure decided?",
    answer:
      "The structure is based on the presentation objective, audience, available content and the sequence in which the information needs to be understood.",
  },
  {
    question: "Can charts and infographics be included?",
    answer:
      "Yes. Data can be represented through charts, visual comparisons, diagrams, timelines and infographic-style layouts wherever they improve understanding.",
  },
  {
    question: "What makes a digital presentation effective?",
    answer:
      "An effective presentation combines clear structure, readable typography, purposeful layouts, visual hierarchy and consistent design so the audience can follow the message easily.",
  },
];

const PresentationIcon = ({ type }) => {
  return (
    <div
      className={`digitalpresentations-icon digitalpresentations-icon--${type}`}
    >
      {type === "corporate" && (
        <>
          <span className="dp-corporate-screen" />
          <span className="dp-corporate-line line-one" />
          <span className="dp-corporate-line line-two" />
          <span className="dp-corporate-dot" />
        </>
      )}

      {type === "sales" && (
        <>
          <span className="dp-sales-bar bar-one" />
          <span className="dp-sales-bar bar-two" />
          <span className="dp-sales-bar bar-three" />
          <span className="dp-sales-arrow" />
        </>
      )}

      {type === "product" && (
        <>
          <span className="dp-product-screen" />
          <span className="dp-product-image" />
          <span className="dp-product-line line-one" />
          <span className="dp-product-line line-two" />
        </>
      )}

      {type === "pitch" && (
        <>
          <span className="dp-pitch-card" />
          <span className="dp-pitch-ring" />
          <span className="dp-pitch-line line-one" />
          <span className="dp-pitch-line line-two" />
        </>
      )}

      {type === "data" && (
        <>
          <span className="dp-data-column column-one" />
          <span className="dp-data-column column-two" />
          <span className="dp-data-column column-three" />
          <span className="dp-data-line" />
        </>
      )}

      {type === "interactive" && (
        <>
          <span className="dp-interactive-frame" />
          <span className="dp-interactive-cursor" />
          <span className="dp-interactive-point point-one" />
          <span className="dp-interactive-point point-two" />
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
      className={`digitalpresentations-reveal digitalpresentations-reveal--${direction} ${className}`}
      style={{
        "--digitalpresentations-reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const DigitalPresentations = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="digitalpresentations-page">
      {/* HERO */}
      <section className="digitalpresentations-hero">
        <div className="digitalpresentations-hero-inner">
          <Reveal
            direction="left"
            className="digitalpresentations-hero-content"
          >
            <span className="digitalpresentations-eyebrow">
              DIGITAL / PRESENTATION DESIGN
            </span>

            <h1>
              Ideas That
              <span> Connect.</span>
              <br />
              Slides That
              <span> Speak.</span>
            </h1>

            <p>
              We create purposeful digital presentations that transform
              information into clear visual communication. Every slide is
              structured around hierarchy, readability, consistency and a
              focused presentation flow.
            </p>

            <div className="digitalpresentations-hero-meta">
              <span>Structure</span>
              <i />
              <span>Design</span>
              <i />
              <span>Data</span>
              <i />
              <span>Flow</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="digitalpresentations-hero-visual"
          >
            <div className="digitalpresentations-stage">
              <div className="digitalpresentations-stage-label">
                <span>SLIDE</span>
                <strong>024</strong>
              </div>

              <div className="digitalpresentations-slide slide-back">
                <span className="slide-title" />
                <span className="slide-line line-one" />
                <span className="slide-line line-two" />
                <span className="slide-chart chart-one" />
                <span className="slide-chart chart-two" />
              </div>

              <div className="digitalpresentations-slide slide-main">
                <div className="main-slide-top">
                  <span />
                  <strong>KEY MESSAGE</strong>
                </div>

                <div className="main-slide-content">
                  <div className="main-slide-copy">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="main-slide-visual">
                    <span className="visual-circle" />
                    <span className="visual-bar bar-one" />
                    <span className="visual-bar bar-two" />
                    <span className="visual-bar bar-three" />
                  </div>
                </div>

                <div className="main-slide-footer">
                  <span>01</span>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="digitalpresentations-slide slide-front">
                <span />
                <span />
                <span />
              </div>

              <div className="digitalpresentations-cursor">
                <span />
              </div>

              <div className="digitalpresentations-flow">
                <span />
                <span />
                <span />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="digitalpresentations-section digitalpresentations-services"
        id="digitalpresentations-services"
      >
        <div className="digitalpresentations-container">
          <Reveal direction="up">
            <div className="digitalpresentations-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Every slide has
                <strong> a purpose.</strong>
              </h2>

              <p>
                From business communication to data-heavy presentations, every
                digital deck is structured to make information clear, readable
                and visually engaging.
              </p>
            </div>
          </Reveal>

          <div className="digitalpresentations-services-list">
            {presentationServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="digitalpresentations-service-wrap"
              >
                <article className="digitalpresentations-service-card">
                  <div className="digitalpresentations-service-number">
                    {service.number}
                  </div>

                  <PresentationIcon type={service.icon} />

                  <div className="digitalpresentations-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="digitalpresentations-service-arrow">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="digitalpresentations-section digitalpresentations-process">
        <div className="digitalpresentations-container">
          <Reveal direction="left">
            <div className="digitalpresentations-process-intro">
              <span>THE PRESENTATION PROCESS</span>

              <h2>
                From the first
                <strong> idea </strong>
                to the final slide.
              </h2>

              <p>
                A structured presentation process keeps information organised,
                visual hierarchy consistent and every slide connected to the
                overall message.
              </p>
            </div>
          </Reveal>

          <div className="digitalpresentations-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="digitalpresentations-process-item"
              >
                <div className="digitalpresentations-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="digitalpresentations-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="digitalpresentations-section digitalpresentations-benefits">
        <div className="digitalpresentations-container">
          <Reveal direction="right">
            <div className="digitalpresentations-section-heading">
              <span>WHY DIGITAL PRESENTATIONS</span>

              <h2>
                Designed to make
                <strong> information clear.</strong>
              </h2>

              <p>
                A well-designed digital presentation creates a visual path
                through information, helping the audience understand the
                message without unnecessary complexity.
              </p>
            </div>
          </Reveal>

          <div className="digitalpresentations-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="digitalpresentations-benefit">
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
      <section className="digitalpresentations-section digitalpresentations-faq">
        <div className="digitalpresentations-container">
          <Reveal direction="up">
            <div className="digitalpresentations-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> process.</strong>
              </h2>

              <p>
                A few practical details about planning, designing and
                delivering a digital presentation.
              </p>
            </div>
          </Reveal>

          <div className="digitalpresentations-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`digitalpresentations-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="digitalpresentations-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="digitalpresentations-faq-answer">
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
      <section className="digitalpresentations-final">
        <Reveal direction="up">
          <div className="digitalpresentations-final-inner">
            <span>THE FINAL SLIDE</span>

            <h2>
              Great presentations
              <br />
              <strong>don't just show.</strong>
            </h2>

            <p>
              They organise ideas, create visual clarity and help people
              understand the message one slide at a time.
            </p>

            <div className="digitalpresentations-final-line">
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

export default DigitalPresentations;