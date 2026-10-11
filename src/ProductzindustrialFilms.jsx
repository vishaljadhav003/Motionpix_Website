import React, { useEffect, useRef, useState } from "react";
import "./ProductIndustrialFilms.css";

const filmServices = [
  {
    number: "01",
    title: "Product Films",
    description:
      "High-impact product films that showcase design, functionality, features and real-world value through cinematic visuals, controlled camera movement and purposeful storytelling.",
    icon: "product",
  },
  {
    number: "02",
    title: "Industrial Films",
    description:
      "Industrial environments, machinery, manufacturing systems and production workflows are transformed into clear visual stories that communicate scale, capability and precision.",
    icon: "industrial",
  },
  {
    number: "03",
    title: "Corporate Films",
    description:
      "Professional corporate films communicate an organisation's vision, people, capabilities, culture and achievements through structured storytelling and premium visual direction.",
    icon: "corporate",
  },
  {
    number: "04",
    title: "Brand Films",
    description:
      "Brand stories are developed into cinematic visual experiences that connect identity, values, people and purpose with a consistent and memorable communication style.",
    icon: "brand",
  },
  {
    number: "05",
    title: "Manufacturing Films",
    description:
      "Manufacturing processes, facilities, quality systems and production capabilities are documented and presented through precise visuals that make complex operations easier to understand.",
    icon: "manufacturing",
  },
  {
    number: "06",
    title: "Product Launch Films",
    description:
      "Launch-focused films combine product details, visual storytelling, motion, sound and brand language to create strong communication for new products and campaigns.",
    icon: "launch",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Concept & Direction",
    description:
      "We understand the product, organisation, audience and communication objective before defining the visual concept, film structure and creative direction.",
  },
  {
    number: "02",
    title: "Script & Storyboard",
    description:
      "The message is structured into scenes, shots and sequences so that every visual contributes to the story and the intended communication.",
  },
  {
    number: "03",
    title: "Production",
    description:
      "Cameras, lighting, locations, products, people and industrial environments are captured with a production approach suited to the film's visual language.",
  },
  {
    number: "04",
    title: "Post Production",
    description:
      "Editing, colour, motion graphics, sound design, music and finishing are brought together to create a polished final film ready for communication.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Show Products With Clarity",
    description:
      "A well-directed product film can demonstrate design, functionality, features and applications in a way that static communication cannot.",
  },
  {
    number: "02",
    title: "Communicate Industrial Capability",
    description:
      "Large-scale facilities, machinery, workflows and technical operations can be presented with visual clarity and professional storytelling.",
  },
  {
    number: "03",
    title: "Strengthen Brand Perception",
    description:
      "Cinematic production, consistent visual language and strong storytelling help create a professional and memorable brand impression.",
  },
  {
    number: "04",
    title: "Create Reusable Communication",
    description:
      "Films can be structured for websites, presentations, exhibitions, social media, sales communication, corporate communication and marketing campaigns.",
  },
];

const faqs = [
  {
    question: "What are Product & Industrial Films used for?",
    answer:
      "Product and industrial films can be used to showcase products, explain manufacturing processes, present facilities, communicate technical capabilities, support sales presentations, strengthen brand communication and create marketing content.",
  },
  {
    question: "Can you create films for manufacturing companies?",
    answer:
      "Yes. Manufacturing films can cover production facilities, machinery, assembly processes, quality systems, workflows, safety practices, engineering capabilities and overall industrial operations.",
  },
  {
    question: "Can corporate and product storytelling be combined?",
    answer:
      "Yes. A single film can combine the organisation's story, people, capabilities, product information, manufacturing processes and brand message into one structured visual narrative.",
  },
  {
    question: "Do you create product launch films?",
    answer:
      "Yes. Product launch films can combine product visuals, demonstrations, feature highlights, motion graphics, brand messaging, sound design and cinematic editing for launch communication.",
  },
  {
    question: "Where can the final films be used?",
    answer:
      "Films can be prepared for websites, exhibitions, presentations, social media, digital campaigns, sales communication, corporate events, product launches and other required communication formats.",
  },
];

const ProductIndustrialIcon = ({ type }) => {
  return (
    <div
      className={`productindustrial-icon productindustrial-icon--${type}`}
      aria-hidden="true"
    >
      {type === "product" && (
        <>
          <span className="productindustrial-product-box" />
          <span className="productindustrial-product-top" />
          <span className="productindustrial-product-line productindustrial-product-line-one" />
          <span className="productindustrial-product-line productindustrial-product-line-two" />
          <span className="productindustrial-product-lens" />
        </>
      )}

      {type === "industrial" && (
        <>
          <span className="productindustrial-industrial-building" />
          <span className="productindustrial-industrial-window window-one" />
          <span className="productindustrial-industrial-window window-two" />
          <span className="productindustrial-industrial-window window-three" />
          <span className="productindustrial-industrial-smoke" />
          <span className="productindustrial-industrial-ground" />
        </>
      )}

      {type === "corporate" && (
        <>
          <span className="productindustrial-corporate-frame" />
          <span className="productindustrial-corporate-person person-one" />
          <span className="productindustrial-corporate-person person-two" />
          <span className="productindustrial-corporate-line" />
        </>
      )}

      {type === "brand" && (
        <>
          <span className="productindustrial-brand-ring" />
          <span className="productindustrial-brand-core" />
          <span className="productindustrial-brand-line brand-line-one" />
          <span className="productindustrial-brand-line brand-line-two" />
        </>
      )}

      {type === "manufacturing" && (
        <>
          <span className="productindustrial-manufacturing-gear gear-one" />
          <span className="productindustrial-manufacturing-gear gear-two" />
          <span className="productindustrial-manufacturing-line" />
          <span className="productindustrial-manufacturing-dot" />
        </>
      )}

      {type === "launch" && (
        <>
          <span className="productindustrial-launch-product" />
          <span className="productindustrial-launch-orbit orbit-one" />
          <span className="productindustrial-launch-orbit orbit-two" />
          <span className="productindustrial-launch-dot" />
        </>
      )}
    </div>
  );
};

const ProductIndustrialReveal = ({
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
      className={`productindustrial-reveal productindustrial-reveal--${direction} ${className}`}
      style={{ "--productindustrial-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ProductIndustrialFilms = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="productindustrial-page">
      {/* HERO */}
      <section className="productindustrial-hero">
        <div className="productindustrial-hero-inner">
          <ProductIndustrialReveal
            direction="left"
            className="productindustrial-hero-content"
          >
            <span className="productindustrial-eyebrow">
              PRODUCT / INDUSTRIAL FILMS
            </span>

            <h1>
              Products That
              <span> Perform.</span>
              <br />
              Stories That
              <span> Matter.</span>
            </h1>

            <p>
              We create cinematic Product & Industrial Films that transform
              products, manufacturing environments, corporate capabilities and
              brand stories into clear, engaging visual experiences. Every
              shot is planned around purpose, precision and visual impact.
            </p>

            <div className="productindustrial-hero-meta">
              <span>Concept</span>
              <i />
              <span>Production</span>
              <i />
              <span>Direction</span>
              <i />
              <span>Post</span>
            </div>
          </ProductIndustrialReveal>

          <ProductIndustrialReveal
            direction="right"
            delay={120}
            className="productindustrial-hero-visual"
          >
            <div className="productindustrial-stage">
              <div className="productindustrial-stage-label">
                <span>PROJECT</span>
                <strong>FILM 024</strong>
              </div>

              <div className="productindustrial-camera">
                <div className="camera-top" />
                <div className="camera-body">
                  <span className="camera-screen" />
                  <span className="camera-lens" />
                </div>
                <div className="camera-base" />
              </div>

              <div className="productindustrial-product-model">
                <div className="product-model-top" />
                <div className="product-model-body">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="product-model-base" />
              </div>

              <div className="productindustrial-film-frame frame-one">
                <span className="frame-title">PRODUCT</span>
                <span className="frame-line line-one" />
                <span className="frame-line line-two" />
                <span className="frame-dot" />
              </div>

              <div className="productindustrial-film-frame frame-two">
                <span className="frame-title">PROCESS</span>
                <span className="frame-line line-one" />
                <span className="frame-line line-two" />
                <span className="frame-dot" />
              </div>

              <div className="productindustrial-focus-ring">
                <span />
              </div>

              <div className="productindustrial-timeline">
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
          </ProductIndustrialReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="productindustrial-section productindustrial-services"
        id="productindustrial-services"
      >
        <div className="productindustrial-container">
          <ProductIndustrialReveal direction="up">
            <div className="productindustrial-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Films built around
                <strong> purpose.</strong>
              </h2>

              <p>
                From product showcases to large-scale industrial environments,
                we combine visual direction, production and storytelling to
                create films that communicate with clarity and impact.
              </p>
            </div>
          </ProductIndustrialReveal>

          <div className="productindustrial-services-list">
            {filmServices.map((service, index) => (
              <ProductIndustrialReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="productindustrial-service-wrap"
              >
                <article className="productindustrial-service-card">
                  <div className="productindustrial-service-number">
                    {service.number}
                  </div>

                  <ProductIndustrialIcon type={service.icon} />

                  <div className="productindustrial-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="productindustrial-service-arrow">
                    ↗
                  </span>
                </article>
              </ProductIndustrialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="productindustrial-section productindustrial-process">
        <div className="productindustrial-container">
          <ProductIndustrialReveal direction="left">
            <div className="productindustrial-process-intro">
              <span>THE FILM PRODUCTION PROCESS</span>

              <h2>
                From the first
                <strong> concept </strong>
                to the final cut.
              </h2>

              <p>
                A structured production process keeps the communication
                focused, the visual language consistent and every shot
                purposeful.
              </p>
            </div>
          </ProductIndustrialReveal>

          <div className="productindustrial-process-line">
            {processSteps.map((step, index) => (
              <ProductIndustrialReveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="productindustrial-process-item"
              >
                <div className="productindustrial-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="productindustrial-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </ProductIndustrialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="productindustrial-section productindustrial-benefits">
        <div className="productindustrial-container">
          <ProductIndustrialReveal direction="right">
            <div className="productindustrial-section-heading">
              <span>WHY PRODUCT & INDUSTRIAL FILMS</span>

              <h2>
                Make your
                <strong> capability visible.</strong>
              </h2>

              <p>
                Professional films help organisations communicate products,
                processes, people and capabilities with stronger visual
                clarity and a more memorable brand presence.
              </p>
            </div>
          </ProductIndustrialReveal>

          <div className="productindustrial-benefit-list">
            {benefits.map((benefit, index) => (
              <ProductIndustrialReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="productindustrial-benefit">
                  <span>{benefit.number}</span>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <i />
                </article>
              </ProductIndustrialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="productindustrial-section productindustrial-faq">
        <div className="productindustrial-container">
          <ProductIndustrialReveal direction="up">
            <div className="productindustrial-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> film.</strong>
              </h2>

              <p>
                A few practical details about planning, producing and
                delivering Product & Industrial Films.
              </p>
            </div>
          </ProductIndustrialReveal>

          <div className="productindustrial-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <ProductIndustrialReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`productindustrial-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="productindustrial-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="productindustrial-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </ProductIndustrialReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="productindustrial-final">
        <ProductIndustrialReveal direction="up">
          <div className="productindustrial-final-inner">
            <span>THE FINAL CUT</span>

            <h2>
              Good films
              <br />
              <strong>make capability visible.</strong>
            </h2>

            <p>
              The right visual story can turn products, processes and brand
              identity into communication that people can see, understand and
              remember.
            </p>

            <div className="productindustrial-final-line">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </ProductIndustrialReveal>
      </section>
    </main>
  );
};

export default ProductIndustrialFilms;