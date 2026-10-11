import React, { useEffect, useRef, useState } from "react";
import "./TechnicalVisualization.css";

const technicalServices = [
  {
    number: "01",
    title: "3D Technical Visualization",
    description:
      "Complex products, machines and engineering systems are converted into clear visual representations that explain structure, operation and technical relationships.",
    icon: "model",
  },
  {
    number: "02",
    title: "Exploded View",
    description:
      "Individual components are separated and positioned with controlled spacing to clearly communicate assembly structure, component relationships and internal construction.",
    icon: "exploded",
  },
  {
    number: "03",
    title: "Technical Illustration",
    description:
      "Detailed technical illustrations combine geometry, annotations, callouts and controlled visual hierarchy to communicate engineering information accurately.",
    icon: "illustration",
  },
  {
    number: "04",
    title: "Assembly Visualization",
    description:
      "Assembly sequences and component interactions are visualized step by step to make installation, maintenance and product structure easier to understand.",
    icon: "assembly",
  },
  {
    number: "05",
    title: "Section & Cutaway Views",
    description:
      "Internal mechanisms and hidden components are revealed through section and cutaway visualizations without losing the overall understanding of the product.",
    icon: "section",
  },
  {
    number: "06",
    title: "Technical Motion",
    description:
      "Mechanical movement, workflows and operating sequences are animated to demonstrate how components interact during real-world operation.",
    icon: "motion",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Technical Understanding",
    description:
      "We study available drawings, CAD data, product references, specifications and technical documentation to understand the system before visualization begins.",
  },
  {
    number: "02",
    title: "Model & Structure",
    description:
      "Product geometry, components, assemblies and technical relationships are organised into a structured visualization system.",
  },
  {
    number: "03",
    title: "Visual Explanation",
    description:
      "Dimensions, callouts, section views, exploded relationships and motion are introduced according to the communication requirement.",
  },
  {
    number: "04",
    title: "Review & Delivery",
    description:
      "The visualization is refined, technically reviewed and prepared for documentation, training, presentation, web or interactive communication.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Explain Complex Systems",
    description:
      "Technical visualization breaks complicated assemblies and mechanisms into visual structures that are easier to understand.",
  },
  {
    number: "02",
    title: "Reveal Internal Components",
    description:
      "Exploded, section and cutaway views make hidden parts and internal relationships visually accessible.",
  },
  {
    number: "03",
    title: "Improve Technical Communication",
    description:
      "Dimensions, annotations, callouts and visual hierarchy help communicate engineering information with greater clarity.",
  },
  {
    number: "04",
    title: "Support Multiple Applications",
    description:
      "Technical visuals can support manuals, training, product presentations, maintenance communication, websites and interactive documentation.",
  },
];

const faqs = [
  {
    question: "What is technical visualization?",
    answer:
      "Technical visualization is the process of representing products, machines, systems and engineering information through detailed visual models, illustrations, diagrams, animations and interactive views.",
  },
  {
    question: "Can you create exploded views of products?",
    answer:
      "Yes. Components can be separated and arranged spatially to explain assembly structure, component relationships and the way individual parts come together.",
  },
  {
    question: "Can internal mechanisms be shown?",
    answer:
      "Yes. Section views, cutaway views and controlled component separation can be used to reveal internal mechanisms while maintaining the overall product context.",
  },
  {
    question: "Can technical visualization include animation?",
    answer:
      "Yes. Mechanical movement, assembly sequences, workflows and operating principles can be represented through controlled technical motion.",
  },
  {
    question: "Where can technical visualizations be used?",
    answer:
      "They can be used for technical documentation, product presentations, training, maintenance communication, websites, digital manuals and interactive technical publications.",
  },
];

const TechnicalIcon = ({ type }) => {
  return (
    <div className={`technicalviz-icon technicalviz-icon--${type}`}>
      {type === "model" && (
        <>
          <span className="technicalviz-model-cube" />
          <span className="technicalviz-model-edge edge-one" />
          <span className="technicalviz-model-edge edge-two" />
          <span className="technicalviz-model-dot dot-one" />
          <span className="technicalviz-model-dot dot-two" />
        </>
      )}

      {type === "exploded" && (
        <>
          <span className="technicalviz-exploded-part part-one" />
          <span className="technicalviz-exploded-part part-two" />
          <span className="technicalviz-exploded-part part-three" />
          <span className="technicalviz-exploded-line" />
        </>
      )}

      {type === "illustration" && (
        <>
          <span className="technicalviz-illustration-box" />
          <span className="technicalviz-illustration-line line-one" />
          <span className="technicalviz-illustration-line line-two" />
          <span className="technicalviz-illustration-line line-three" />
          <span className="technicalviz-illustration-dot" />
        </>
      )}

      {type === "assembly" && (
        <>
          <span className="technicalviz-assembly-circle circle-one" />
          <span className="technicalviz-assembly-circle circle-two" />
          <span className="technicalviz-assembly-line line-one" />
          <span className="technicalviz-assembly-line line-two" />
          <span className="technicalviz-assembly-node" />
        </>
      )}

      {type === "section" && (
        <>
          <span className="technicalviz-section-ring" />
          <span className="technicalviz-section-cut" />
          <span className="technicalviz-section-center" />
          <span className="technicalviz-section-line" />
        </>
      )}

      {type === "motion" && (
        <>
          <span className="technicalviz-motion-ring" />
          <span className="technicalviz-motion-arrow" />
          <span className="technicalviz-motion-center" />
          <span className="technicalviz-motion-trail trail-one" />
          <span className="technicalviz-motion-trail trail-two" />
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
      className={`technicalviz-reveal technicalviz-reveal--${direction} ${className}`}
      style={{ "--technicalviz-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const TechnicalVisualization = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="technicalviz-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="technicalviz-hero">
        <div className="technicalviz-hero-inner">
          <Reveal
            direction="left"
            className="technicalviz-hero-content"
          >
            <span className="technicalviz-eyebrow">
              TECHNICAL VISUALIZATION
            </span>

            <h1>
              Engineering
              <span> Made Visible.</span>
              <br />
              Complexity
              <span> Explained.</span>
            </h1>

            <p>
              We transform complex products, machines, assemblies and
              engineering information into precise technical visualizations.
              From detailed product structures to exploded views, section
              views and technical motion, every visual is designed for
              clarity, accuracy and understanding.
            </p>

            <div className="technicalviz-hero-meta">
              <span>Structure</span>
              <i />
              <span>Detail</span>
              <i />
              <span>Motion</span>
              <i />
              <span>Clarity</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="technicalviz-hero-visual"
          >
            <div className="technicalviz-stage">
              <div className="technicalviz-stage-header">
                <span>TECHNICAL VIEW</span>

                <strong>
                  <i />
                  LIVE
                </strong>
              </div>

              <div className="technicalviz-axis axis-x">
                <span>X</span>
              </div>

              <div className="technicalviz-axis axis-y">
                <span>Y</span>
              </div>

              <div className="technicalviz-axis axis-z">
                <span>Z</span>
              </div>

              <div className="technicalviz-orbit orbit-one" />
              <div className="technicalviz-orbit orbit-two" />

              <div className="technicalviz-product">
                <div className="technicalviz-product-top" />
                <div className="technicalviz-product-body">
                  <span className="product-panel panel-one" />
                  <span className="product-panel panel-two" />
                  <span className="product-panel panel-three" />
                </div>
                <div className="technicalviz-product-base" />
                <div className="technicalviz-product-core" />
              </div>

              <div className="technicalviz-exploded">
                <span className="exploded-component component-one" />
                <span className="exploded-component component-two" />
                <span className="exploded-component component-three" />
              </div>

              <div className="technicalviz-callout callout-one">
                <span className="callout-line" />
                <strong>01</strong>
                <small>PRIMARY UNIT</small>
              </div>

              <div className="technicalviz-callout callout-two">
                <span className="callout-line" />
                <strong>02</strong>
                <small>INTERNAL CORE</small>
              </div>

              <div className="technicalviz-callout callout-three">
                <span className="callout-line" />
                <strong>03</strong>
                <small>ASSEMBLY BASE</small>
              </div>

              <div className="technicalviz-dimension dimension-width">
                <span />
                <strong>240 mm</strong>
              </div>

              <div className="technicalviz-dimension dimension-height">
                <span />
                <strong>180 mm</strong>
              </div>

              <div className="technicalviz-status">
                <span>MODEL</span>
                <strong>ACTIVE</strong>

                <i />

                <span>SECTION</span>
                <strong>A-A</strong>
              </div>

              <div className="technicalviz-view-indicator">
                <span>FRONT</span>
                <span>TOP</span>
                <span>SIDE</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="technicalviz-section technicalviz-services"
        id="technicalviz-services"
      >
        <div className="technicalviz-container">
          <Reveal direction="left">
            <div className="technicalviz-section-heading">
              <span>WHAT WE VISUALIZE</span>

              <h2>
                Technical information,
                <strong> made understandable.</strong>
              </h2>

              <p>
                From individual components to complete engineering systems,
                our visualization approach combines technical structure,
                visual hierarchy and controlled detail to communicate how
                products work and how their parts relate to each other.
              </p>
            </div>
          </Reveal>

          <div className="technicalviz-services-list">
            {technicalServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="technicalviz-service-wrap"
              >
                <article className="technicalviz-service-card">
                  <div className="technicalviz-service-number">
                    {service.number}
                  </div>

                  <TechnicalIcon type={service.icon} />

                  <div className="technicalviz-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="technicalviz-service-arrow">
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

      <section className="technicalviz-section technicalviz-process">
        <div className="technicalviz-container">
          <Reveal direction="right">
            <div className="technicalviz-process-intro">
              <span>THE TECHNICAL PROCESS</span>

              <h2>
                From technical
                <strong> data </strong>
                to visual understanding.
              </h2>

              <p>
                Every visualization follows a structured process where
                technical information is understood first and then translated
                into a clear visual communication system.
              </p>
            </div>
          </Reveal>

          <div className="technicalviz-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="technicalviz-process-item"
              >
                <div className="technicalviz-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="technicalviz-process-copy">
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

      <section className="technicalviz-section technicalviz-benefits">
        <div className="technicalviz-container">
          <Reveal direction="left">
            <div className="technicalviz-section-heading">
              <span>WHY TECHNICAL VISUALIZATION</span>

              <h2>
                Make engineering
                <strong> easier to understand.</strong>
              </h2>

              <p>
                Technical visualization creates a visual bridge between
                engineering information and the people who need to understand,
                operate, maintain or communicate that information.
              </p>
            </div>
          </Reveal>

          <div className="technicalviz-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
              >
                <article className="technicalviz-benefit">
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

      <section className="technicalviz-section technicalviz-faq">
        <div className="technicalviz-container">
          <Reveal direction="right">
            <div className="technicalviz-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding
                <strong> technical visualization.</strong>
              </h2>

              <p>
                A few practical details about technical models, exploded
                views, internal structures, animation and visualization
                delivery.
              </p>
            </div>
          </Reveal>

          <div className="technicalviz-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`technicalviz-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="technicalviz-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="technicalviz-faq-answer">
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
      ===================================================== */}

      <section className="technicalviz-final">
        <Reveal direction="up">
          <div className="technicalviz-final-inner">
            <span>THE FINAL VIEW</span>

            <h2>
              Complex systems
              <br />
              <strong>deserve clear visuals.</strong>
            </h2>

            <p>
              Technical visualization turns structure, engineering data and
              product behaviour into visual communication that people can
              understand, explore and remember.
            </p>

            <div className="technicalviz-final-line">
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

export default TechnicalVisualization;