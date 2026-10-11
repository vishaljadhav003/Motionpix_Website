import React, { useEffect, useRef, useState } from "react";
import "./EngineeringIndustrialAnimation.css";

/* =========================================================
   ENGINEERING & INDUSTRIAL ANIMATION DATA
========================================================= */

const animationServices = [
  {
    number: "01",
    title: "Technical Product Animation",
    description:
      "Complex industrial products are transformed into clear visual sequences that explain construction, operation, features, movement and functionality.",
    icon: "product",
  },
  {
    number: "02",
    title: "Assembly & Exploded Views",
    description:
      "Components are separated, positioned and animated to clearly demonstrate assembly order, internal structure, part relationships and maintenance procedures.",
    icon: "assembly",
  },
  {
    number: "03",
    title: "Engineering Process Animation",
    description:
      "Manufacturing, production and engineering workflows are visualised step by step to make complex industrial processes easier to understand.",
    icon: "process",
  },
  {
    number: "04",
    title: "Machine & Mechanism Animation",
    description:
      "Moving parts, mechanical systems, linkages, gears and mechanisms are animated to demonstrate how engineering systems operate in real conditions.",
    icon: "mechanism",
  },
  {
    number: "05",
    title: "Technical Training Animation",
    description:
      "Detailed engineering information is converted into structured training visuals for operators, technicians, engineers and internal learning programs.",
    icon: "training",
  },
  {
    number: "06",
    title: "Maintenance & Service Animation",
    description:
      "Service procedures, component replacement, inspection points and maintenance workflows are explained through precise visual sequences.",
    icon: "maintenance",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Engineering Understanding",
    description:
      "We study product drawings, CAD references, technical documentation, specifications and engineering requirements to understand the system before animation begins.",
  },
  {
    number: "02",
    title: "Technical Visual Planning",
    description:
      "The required views, camera angles, component callouts, exploded positions, dimensions and animation sequences are planned according to the communication objective.",
  },
  {
    number: "03",
    title: "3D Animation & Motion",
    description:
      "Components, mechanisms and industrial systems are animated with controlled movement, camera transitions, material definition and technical visual cues.",
  },
  {
    number: "04",
    title: "Technical Review & Delivery",
    description:
      "The final animation is reviewed for visual clarity, technical accuracy and communication quality before being prepared for the required presentation, training or digital format.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Explain Complex Engineering",
    description:
      "Mechanical systems, products and industrial processes can be broken into clear visual sequences instead of relying only on technical drawings or written explanations.",
  },
  {
    number: "02",
    title: "Show Internal Mechanisms",
    description:
      "Internal components and hidden operations can be revealed through cutaways, exploded views, transparent materials and controlled camera movement.",
  },
  {
    number: "03",
    title: "Improve Technical Training",
    description:
      "Operators, technicians and engineering teams can understand procedures and machine operation through structured visual demonstrations.",
  },
  {
    number: "04",
    title: "Demonstrate Product Function",
    description:
      "Movement, assembly, operation, maintenance and product behaviour can be communicated before the physical product is handled or demonstrated.",
  },
];

const faqs = [
  {
    question: "What is engineering and industrial animation?",
    answer:
      "Engineering and industrial animation uses technical, 3D and motion-based visualisation to explain machines, products, mechanisms, manufacturing processes, assemblies, maintenance procedures and industrial workflows.",
  },
  {
    question: "Can you animate mechanical components and machines?",
    answer:
      "Yes. Mechanical components, assemblies, moving parts, gears, shafts, linkages, machines and industrial systems can be animated to demonstrate their operation and relationships.",
  },
  {
    question: "Can exploded views and assembly sequences be created?",
    answer:
      "Yes. Components can be separated into controlled positions and animated sequentially to explain assembly order, component relationships and internal product structure.",
  },
  {
    question: "Can existing CAD or engineering references be used?",
    answer:
      "Yes. Engineering drawings, CAD references, technical documentation and product information can be used as the foundation for planning the visualisation and animation.",
  },
  {
    question: "Where can industrial animations be used?",
    answer:
      "Industrial animations can be used for product demonstrations, engineering presentations, operator training, maintenance documentation, sales communication, exhibitions, websites and technical learning platforms.",
  },
];

/* =========================================================
   CUSTOM ENGINEERING ICONS
========================================================= */

const EngineeringAnimationIcon = ({ type }) => {
  return (
    <div
      className={`engineeringAnimation-icon engineeringAnimation-icon--${type}`}
      aria-hidden="true"
    >
      {type === "product" && (
        <>
          <span className="eng-icon-product-body" />
          <span className="eng-icon-product-top" />
          <span className="eng-icon-product-detail detail-one" />
          <span className="eng-icon-product-detail detail-two" />
        </>
      )}

      {type === "assembly" && (
        <>
          <span className="eng-icon-assembly-part part-one" />
          <span className="eng-icon-assembly-part part-two" />
          <span className="eng-icon-assembly-part part-three" />
          <span className="eng-icon-assembly-axis" />
        </>
      )}

      {type === "process" && (
        <>
          <span className="eng-icon-process-box box-one" />
          <span className="eng-icon-process-box box-two" />
          <span className="eng-icon-process-box box-three" />
          <span className="eng-icon-process-arrow" />
        </>
      )}

      {type === "mechanism" && (
        <>
          <span className="eng-icon-gear gear-one" />
          <span className="eng-icon-gear gear-two" />
          <span className="eng-icon-gear-center" />
        </>
      )}

      {type === "training" && (
        <>
          <span className="eng-icon-training-screen" />
          <span className="eng-icon-training-line line-one" />
          <span className="eng-icon-training-line line-two" />
          <span className="eng-icon-training-play" />
        </>
      )}

      {type === "maintenance" && (
        <>
          <span className="eng-icon-maintenance-tool" />
          <span className="eng-icon-maintenance-ring" />
          <span className="eng-icon-maintenance-dot" />
        </>
      )}
    </div>
  );
};

/* =========================================================
   BIDIRECTIONAL REVEAL
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
          element.classList.add("engineeringAnimation-reveal-visible");
        } else {
          element.classList.remove("engineeringAnimation-reveal-visible");
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
      className={`engineeringAnimation-reveal engineeringAnimation-reveal--${direction} ${className}`}
      style={{ "--engineeringAnimation-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

const EngineeringIndustrialAnimation = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="engineeringAnimation-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="engineeringAnimation-hero">
        <div className="engineeringAnimation-hero-inner">

          <Reveal
            direction="left"
            className="engineeringAnimation-hero-content"
          >
            <span className="engineeringAnimation-eyebrow">
              ENGINEERING / INDUSTRIAL ANIMATION
            </span>

            <h1>
              Engineering
              <span> in Motion.</span>
              <br />
              Industry
              <span> Explained.</span>
            </h1>

            <p>
              We transform complex engineering products, machines,
              mechanisms and industrial processes into precise visual
              experiences. From exploded assemblies to internal mechanisms,
              every sequence is designed to make technical information
              easier to understand, demonstrate and remember.
            </p>

            <div className="engineeringAnimation-hero-meta">
              <span>3D Models</span>
              <i />
              <span>Mechanisms</span>
              <i />
              <span>Processes</span>
              <i />
              <span>Technical Motion</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="engineeringAnimation-hero-visual"
          >
            <div className="engineeringAnimation-stage">

              <div className="engineeringAnimation-stage-label">
                <span>ENGINEERING MODEL</span>
                <strong>PX-024</strong>
              </div>

              <div className="engineeringAnimation-blueprint">
                <span className="blueprint-line blueprint-line-one" />
                <span className="blueprint-line blueprint-line-two" />
                <span className="blueprint-circle blueprint-circle-one" />
                <span className="blueprint-circle blueprint-circle-two" />
              </div>

              {/* Technical Product */}

              <div className="engineeringAnimation-machine">

                <div className="engineeringAnimation-machine-top">
                  <span />
                </div>

                <div className="engineeringAnimation-machine-body">

                  <div className="engineeringAnimation-machine-front">
                    <span className="machine-display" />
                    <span className="machine-button button-one" />
                    <span className="machine-button button-two" />
                  </div>

                  <div className="engineeringAnimation-machine-side">
                    <span className="machine-side-panel" />
                    <span className="machine-side-line line-one" />
                    <span className="machine-side-line line-two" />
                  </div>

                  <div className="engineeringAnimation-machine-inner">
                    <span className="machine-rotor" />
                    <span className="machine-axis" />
                    <span className="machine-gear gear-one" />
                    <span className="machine-gear gear-two" />
                  </div>

                </div>

                <div className="engineeringAnimation-machine-base">
                  <span />
                  <span />
                </div>

              </div>

              {/* Exploded Component */}

              <div className="engineeringAnimation-exploded">
                <span className="exploded-part exploded-one" />
                <span className="exploded-part exploded-two" />
                <span className="exploded-part exploded-three" />
                <span className="exploded-axis" />
              </div>

              {/* Technical Callouts */}

              <div className="engineeringAnimation-callout callout-one">
                <span />
                <strong>01</strong>
                <small>ROTARY UNIT</small>
              </div>

              <div className="engineeringAnimation-callout callout-two">
                <span />
                <strong>02</strong>
                <small>CONTROL PANEL</small>
              </div>

              <div className="engineeringAnimation-callout callout-three">
                <span />
                <strong>03</strong>
                <small>ASSEMBLY</small>
              </div>

              {/* Dimension Lines */}

              <div className="engineeringAnimation-dimension dimension-width">
                <span />
                <b>420 MM</b>
              </div>

              <div className="engineeringAnimation-dimension dimension-height">
                <span />
                <b>280 MM</b>
              </div>

              {/* Viewer Interface */}

              <div className="engineeringAnimation-viewer">

                <div className="engineeringAnimation-viewer-top">
                  <span>3D VIEWER</span>
                  <strong>360°</strong>
                </div>

                <div className="engineeringAnimation-viewer-track">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="engineeringAnimation-viewer-controls">
                  <i />
                  <i />
                  <i />
                </div>

              </div>

              <div className="engineeringAnimation-status">
                <span />
                TECHNICAL VISUALIZATION
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="engineeringAnimation-section engineeringAnimation-services"
        id="engineeringAnimation-services"
      >
        <div className="engineeringAnimation-container">

          <Reveal direction="up">
            <div className="engineeringAnimation-section-heading">

              <span>WHAT WE CREATE</span>

              <h2>
                Complex engineering,
                <strong> clearly explained.</strong>
              </h2>

              <p>
                We combine technical understanding, 3D visualisation,
                controlled motion and structured storytelling to explain
                products, machines and industrial systems.
              </p>

            </div>
          </Reveal>

          <div className="engineeringAnimation-services-list">

            {animationServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="engineeringAnimation-service-wrap"
              >
                <article className="engineeringAnimation-service-card">

                  <div className="engineeringAnimation-service-number">
                    {service.number}
                  </div>

                  <EngineeringAnimationIcon type={service.icon} />

                  <div className="engineeringAnimation-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="engineeringAnimation-service-arrow">
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

      <section className="engineeringAnimation-section engineeringAnimation-process">
        <div className="engineeringAnimation-container">

          <Reveal direction="left">
            <div className="engineeringAnimation-process-intro">

              <span>THE ENGINEERING ANIMATION PROCESS</span>

              <h2>
                From technical
                <strong> data </strong>
                to visual understanding.
              </h2>

              <p>
                Every project follows a structured workflow where engineering
                information is converted into an accurate and engaging visual
                sequence.
              </p>

            </div>
          </Reveal>

          <div className="engineeringAnimation-process-line">

            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="engineeringAnimation-process-item"
              >
                <div className="engineeringAnimation-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="engineeringAnimation-process-copy">
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

      <section className="engineeringAnimation-section engineeringAnimation-benefits">
        <div className="engineeringAnimation-container">

          <Reveal direction="right">
            <div className="engineeringAnimation-section-heading">

              <span>WHY INDUSTRIAL ANIMATION</span>

              <h2>
                Make engineering
                <strong> easier to see.</strong>
              </h2>

              <p>
                Visualisation makes hidden mechanisms, technical procedures
                and complex industrial systems easier to communicate across
                engineering, manufacturing, training and sales environments.
              </p>

            </div>
          </Reveal>

          <div className="engineeringAnimation-benefit-list">

            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="engineeringAnimation-benefit">

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

      <section className="engineeringAnimation-section engineeringAnimation-faq">
        <div className="engineeringAnimation-container">

          <Reveal direction="up">
            <div className="engineeringAnimation-section-heading">

              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding
                <strong> industrial animation.</strong>
              </h2>

              <p>
                Practical information about engineering visualisation,
                mechanical animation, technical training and industrial
                communication.
              </p>

            </div>
          </Reveal>

          <div className="engineeringAnimation-faq-list">

            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`engineeringAnimation-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="engineeringAnimation-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="engineeringAnimation-faq-answer">
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
          FINAL STATEMENT — NO CTA
      ===================================================== */}

      <section className="engineeringAnimation-final">

        <Reveal direction="up">

          <div className="engineeringAnimation-final-inner">

            <span>THE ENGINEERING VIEW</span>

            <h2>
              Don't just explain
              <br />
              <strong>how it works.</strong>
            </h2>

            <p>
              Visualise the product, reveal the mechanism and communicate
              engineering with clarity.
            </p>

            <div className="engineeringAnimation-final-line">
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

export default EngineeringIndustrialAnimation;