import React, { useEffect, useRef, useState } from "react";
import "./GraphicsDesign.css";

const graphicsdesignServices = [
  {
    number: "01",
    title: "Social Media Design",
    description:
      "Scroll-stopping social media creatives are designed with strong composition, typography, colour hierarchy and visual consistency for posts, campaigns and digital communication.",
    icon: "social",
  },
  {
    number: "02",
    title: "Poster & Campaign Design",
    description:
      "Promotional posters and campaign creatives combine typography, imagery, shapes and layout to communicate the core message clearly and create immediate visual impact.",
    icon: "poster",
  },
  {
    number: "03",
    title: "Brochure & Catalogue Design",
    description:
      "Information-rich brochures and catalogues are structured through grids, visual hierarchy and balanced layouts so products, services and technical information remain easy to explore.",
    icon: "brochure",
  },
  {
    number: "04",
    title: "Presentation Design",
    description:
      "Professional presentations transform information into visually organised slides using consistent layouts, typography, diagrams, icons and carefully controlled content hierarchy.",
    icon: "presentation",
  },
  {
    number: "05",
    title: "Marketing Creative Design",
    description:
      "Digital marketing creatives are developed around campaign objectives, audience attention and message clarity while maintaining a consistent visual language across communication.",
    icon: "marketing",
  },
  {
    number: "06",
    title: "Infographic Design",
    description:
      "Data, statistics, processes and complex information are converted into structured visual compositions using icons, diagrams, typography and clear information hierarchy.",
    icon: "infographic",
  },
];

const graphicsdesignProcess = [
  {
    number: "01",
    title: "Brief & Direction",
    description:
      "We understand the objective, audience, message, required format and communication context before defining the creative direction.",
  },
  {
    number: "02",
    title: "Concept & Layout",
    description:
      "The visual concept, composition, grid, typography, colour relationship and information hierarchy are planned to create a strong design foundation.",
  },
  {
    number: "03",
    title: "Design Development",
    description:
      "Visual elements, imagery, icons, shapes and typography are refined together to create a polished and balanced graphic composition.",
  },
  {
    number: "04",
    title: "Final Artwork",
    description:
      "The completed design is reviewed, refined and prepared in the required dimensions, resolution and format for its intended application.",
  },
];

const graphicsdesignBenefits = [
  {
    number: "01",
    title: "Communicate Clearly",
    description:
      "Strong visual hierarchy helps audiences understand the main message quickly without making the design feel overloaded.",
  },
  {
    number: "02",
    title: "Create Visual Impact",
    description:
      "Composition, typography, colour and imagery are combined to create designs that attract attention and make communication more memorable.",
  },
  {
    number: "03",
    title: "Organise Information",
    description:
      "Complex content can be structured into readable visual sections so important information becomes easier to scan, understand and retain.",
  },
  {
    number: "04",
    title: "Maintain Consistency",
    description:
      "A consistent design language across creatives, presentations and marketing materials creates a more professional and recognisable visual presence.",
  },
];

const graphicsdesignFaqs = [
  {
    question: "What types of graphics can be designed?",
    answer:
      "Graphics design can cover social media creatives, posters, campaign artwork, brochures, catalogues, presentations, marketing creatives, infographics and other digital or print communication materials.",
  },
  {
    question: "Can graphics be created for both digital and print use?",
    answer:
      "Yes. Designs can be planned according to their final medium, including digital screens, social platforms, websites, presentations and print applications, with suitable dimensions and output formats.",
  },
  {
    question: "How is the visual style decided?",
    answer:
      "The visual direction is based on the communication objective, target audience, content type and required design format. Typography, colour, imagery, spacing and composition are planned together.",
  },
  {
    question: "Can complex information be converted into graphics?",
    answer:
      "Yes. Data, statistics, processes and information-heavy content can be organised using diagrams, icons, visual hierarchy and structured layouts to make the information easier to understand.",
  },
  {
    question: "Can multiple designs follow the same visual system?",
    answer:
      "Yes. Multiple creatives can follow consistent typography, colour relationships, spacing, composition and graphic elements so that the overall communication feels visually connected.",
  },
];

const GraphicsDesignIcon = ({ type }) => {
  return (
    <div
      className={`graphicsdesign-icon graphicsdesign-icon--${type}`}
      aria-hidden="true"
    >
      {type === "social" && (
        <>
          <span className="graphicsdesign-social-frame" />
          <span className="graphicsdesign-social-circle" />
          <span className="graphicsdesign-social-line line-one" />
          <span className="graphicsdesign-social-line line-two" />
          <span className="graphicsdesign-social-dot" />
        </>
      )}

      {type === "poster" && (
        <>
          <span className="graphicsdesign-poster-sheet" />
          <span className="graphicsdesign-poster-title" />
          <span className="graphicsdesign-poster-line line-one" />
          <span className="graphicsdesign-poster-line line-two" />
          <span className="graphicsdesign-poster-shape" />
        </>
      )}

      {type === "brochure" && (
        <>
          <span className="graphicsdesign-brochure-left" />
          <span className="graphicsdesign-brochure-right" />
          <span className="graphicsdesign-brochure-line line-one" />
          <span className="graphicsdesign-brochure-line line-two" />
          <span className="graphicsdesign-brochure-dot" />
        </>
      )}

      {type === "presentation" && (
        <>
          <span className="graphicsdesign-presentation-screen" />
          <span className="graphicsdesign-presentation-bar bar-one" />
          <span className="graphicsdesign-presentation-bar bar-two" />
          <span className="graphicsdesign-presentation-bar bar-three" />
          <span className="graphicsdesign-presentation-stand" />
        </>
      )}

      {type === "marketing" && (
        <>
          <span className="graphicsdesign-marketing-shape shape-one" />
          <span className="graphicsdesign-marketing-shape shape-two" />
          <span className="graphicsdesign-marketing-shape shape-three" />
          <span className="graphicsdesign-marketing-line" />
        </>
      )}

      {type === "infographic" && (
        <>
          <span className="graphicsdesign-info-bar bar-one" />
          <span className="graphicsdesign-info-bar bar-two" />
          <span className="graphicsdesign-info-bar bar-three" />
          <span className="graphicsdesign-info-axis" />
          <span className="graphicsdesign-info-dot" />
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
      className={`graphicsdesign-reveal graphicsdesign-reveal--${direction} ${className}`}
      style={{
        "--graphicsdesign-reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const GraphicsDesign = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="graphicsdesign-page">
      {/* HERO */}
      <section className="graphicsdesign-hero">
        <div className="graphicsdesign-hero-inner">
          <Reveal
            direction="left"
            className="graphicsdesign-hero-content"
          >
            <span className="graphicsdesign-eyebrow">
              GRAPHICS / DESIGN STUDIO
            </span>

            <h1>
              Visuals That
              <span> Speak.</span>
              <br />
              Designs That
              <span> Connect.</span>
            </h1>

            <p>
              We create purposeful graphic design for digital communication,
              marketing, presentations, publications and visual information.
              Every composition is built around hierarchy, typography,
              balance and visual clarity — turning ideas into graphics that
              communicate with impact.
            </p>

            <div className="graphicsdesign-hero-meta">
              <span>Concept</span>
              <i />
              <span>Layout</span>
              <i />
              <span>Typography</span>
              <i />
              <span>Visuals</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="graphicsdesign-hero-visual"
          >
            <div className="graphicsdesign-design-board">
              <div className="graphicsdesign-board-label">
                <span>DESIGN BOARD</span>
                <strong>GD / 024</strong>
              </div>

              <div className="graphicsdesign-board-grid" />

              <div className="graphicsdesign-layout-frame">
                <span className="layout-frame-title" />
                <span className="layout-frame-line line-one" />
                <span className="layout-frame-line line-two" />
                <span className="layout-frame-line line-three" />
                <span className="layout-frame-shape" />
              </div>

              <div className="graphicsdesign-type-card">
                <small>TYPE</small>
                <strong>Ag</strong>
                <span>HEADLINE / BODY</span>
              </div>

              <div className="graphicsdesign-colour-card">
                <small>COLOUR</small>
                <span />
                <span />
                <span />
              </div>

              <div className="graphicsdesign-image-card">
                <div className="image-card-circle" />
                <div className="image-card-line line-one" />
                <div className="image-card-line line-two" />
              </div>

              <div className="graphicsdesign-ruler">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
              </div>

              <div className="graphicsdesign-cursor">
                <span />
              </div>

              <div className="graphicsdesign-board-mark">
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
        className="graphicsdesign-section graphicsdesign-services"
        id="graphicsdesign-services"
      >
        <div className="graphicsdesign-container">
          <Reveal direction="left">
            <div className="graphicsdesign-section-heading">
              <span>WHAT WE DESIGN</span>

              <h2>
                Every visual has
                <strong> a purpose.</strong>
              </h2>

              <p>
                From campaign artwork to information-heavy layouts, our
                graphics design approach combines composition, typography,
                visual hierarchy and creative direction to communicate with
                clarity.
              </p>
            </div>
          </Reveal>

          <div className="graphicsdesign-services-list">
            {graphicsdesignServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="graphicsdesign-service-wrap"
              >
                <article className="graphicsdesign-service-card">
                  <div className="graphicsdesign-service-number">
                    {service.number}
                  </div>

                  <GraphicsDesignIcon type={service.icon} />

                  <div className="graphicsdesign-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="graphicsdesign-service-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="graphicsdesign-section graphicsdesign-process">
        <div className="graphicsdesign-container">
          <Reveal direction="right">
            <div className="graphicsdesign-process-intro">
              <span>THE GRAPHICS DESIGN PROCESS</span>

              <h2>
                From the first
                <strong> concept </strong>
                to the final artwork.
              </h2>

              <p>
                A structured design process keeps the message clear, the
                composition balanced and every visual element intentional.
              </p>
            </div>
          </Reveal>

          <div className="graphicsdesign-process-line">
            {graphicsdesignProcess.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="graphicsdesign-process-item"
              >
                <div className="graphicsdesign-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="graphicsdesign-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="graphicsdesign-section graphicsdesign-benefits">
        <div className="graphicsdesign-container">
          <Reveal direction="left">
            <div className="graphicsdesign-section-heading">
              <span>WHY GRAPHICS DESIGN</span>

              <h2>
                Designed to make
                <strong> ideas visible.</strong>
              </h2>

              <p>
                Effective graphic design gives information structure,
                establishes visual hierarchy and creates a stronger connection
                between the message and the audience.
              </p>
            </div>
          </Reveal>

          <div className="graphicsdesign-benefit-list">
            {graphicsdesignBenefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
              >
                <article className="graphicsdesign-benefit">
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
      <section className="graphicsdesign-section graphicsdesign-faq">
        <div className="graphicsdesign-container">
          <Reveal direction="right">
            <div className="graphicsdesign-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> design process.</strong>
              </h2>

              <p>
                A few practical details about planning, designing and
                delivering professional graphic communication.
              </p>
            </div>
          </Reveal>

          <div className="graphicsdesign-faq-list">
            {graphicsdesignFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`graphicsdesign-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="graphicsdesign-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="graphicsdesign-faq-answer">
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
      <section className="graphicsdesign-final">
        <Reveal direction="left">
          <div className="graphicsdesign-final-inner">
            <span>THE FINAL DESIGN</span>

            <h2>
              Great design
              <br />
              <strong>doesn't just look good.</strong>
            </h2>

            <p>
              It gives information structure, creates visual focus and turns
              an idea into something people can see, understand and remember.
            </p>

            <div className="graphicsdesign-final-line">
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

export default GraphicsDesign;