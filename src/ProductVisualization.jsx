import React, { useEffect, useRef, useState } from "react";
import "./ProductVisualization.css";

const visualizationServices = [
  {
    number: "01",
    title: "3D Product Modeling",
    description:
      "Accurate digital product models are created with carefully defined proportions, forms, components and surface details to represent products with visual and technical clarity.",
    icon: "model",
  },
  {
    number: "02",
    title: "Product Rendering",
    description:
      "High-quality product renders combine lighting, materials, reflections and composition to create realistic visuals for presentations, websites, catalogues and marketing.",
    icon: "render",
  },
  {
    number: "03",
    title: "Product Configuration",
    description:
      "Different product variants, components, colours, materials and configurations can be visualized through structured 3D scenes designed for clear product comparison.",
    icon: "configuration",
  },
  {
    number: "04",
    title: "Technical Visualization",
    description:
      "Complex products, mechanisms and internal components are presented through detailed visualizations that make structure, operation and functionality easier to understand.",
    icon: "technical",
  },
  {
    number: "05",
    title: "Exploded Views",
    description:
      "Individual components are separated and arranged within controlled 3D compositions to clearly communicate assembly structure, component relationships and product architecture.",
    icon: "exploded",
  },
  {
    number: "06",
    title: "Interactive Product Views",
    description:
      "Interactive product experiences allow users to explore models, inspect details and understand products through controlled rotation, zoom, hotspots and visual interaction.",
    icon: "interactive",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Product Understanding",
    description:
      "We study product references, dimensions, components, materials, functions and the visual objective before building the visualization.",
  },
  {
    number: "02",
    title: "3D Modeling",
    description:
      "The product is constructed as a structured 3D model with attention to proportions, component relationships and surface details.",
  },
  {
    number: "03",
    title: "Materials & Lighting",
    description:
      "Materials, textures, reflections, lighting and camera composition are developed to establish the required level of realism and visual clarity.",
  },
  {
    number: "04",
    title: "Visualization & Delivery",
    description:
      "Final renders, animations, interactive views or technical visualizations are refined and prepared according to the required digital or presentation format.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Show Products Before Production",
    description:
      "Digital product visualization can communicate the appearance and functionality of a product before physical production or photography.",
  },
  {
    number: "02",
    title: "Explain Complex Products",
    description:
      "Detailed 3D views can make internal structures, mechanisms, components and technical relationships easier to understand.",
  },
  {
    number: "03",
    title: "Create Realistic Product Experiences",
    description:
      "Lighting, materials, reflections, camera movement and interaction can create a controlled and highly realistic product presentation.",
  },
  {
    number: "04",
    title: "Adapt Across Digital Platforms",
    description:
      "Product visualizations can be prepared for websites, catalogues, presentations, marketing campaigns, product demonstrations and interactive experiences.",
  },
];

const faqs = [
  {
    question: "What is product visualization?",
    answer:
      "Product visualization is the creation of digital 3D representations of products using modeling, materials, lighting, rendering, animation or interaction to communicate how a product looks, works or is structured.",
  },
  {
    question: "Can you create a 3D model from product references?",
    answer:
      "Yes. Product references such as drawings, photographs, dimensions and technical information can be used as the foundation for creating a structured 3D product model.",
  },
  {
    question: "Can product visualization show internal components?",
    answer:
      "Yes. Internal components can be visualized through cutaway views, transparent materials, exploded views and controlled camera compositions.",
  },
  {
    question: "Can the product be shown interactively?",
    answer:
      "Yes. Interactive product experiences can allow users to rotate, zoom, inspect and explore different areas of a 3D product depending on the required experience.",
  },
  {
    question: "Where can product visualizations be used?",
    answer:
      "Product visualizations can be used on websites, product catalogues, presentations, marketing campaigns, technical documentation, sales material, training content and interactive digital experiences.",
  },
];

const ProductIcon = ({ type }) => {
  return (
    <div
      className={`productviz-icon productviz-icon--${type}`}
      aria-hidden="true"
    >
      {type === "model" && (
        <>
          <span className="productviz-model-cube" />
          <span className="productviz-model-line line-one" />
          <span className="productviz-model-line line-two" />
          <span className="productviz-model-dot" />
        </>
      )}

      {type === "render" && (
        <>
          <span className="productviz-render-object" />
          <span className="productviz-render-light" />
          <span className="productviz-render-shadow" />
          <span className="productviz-render-ring" />
        </>
      )}

      {type === "configuration" && (
        <>
          <span className="productviz-config-main" />
          <span className="productviz-config-dot dot-one" />
          <span className="productviz-config-dot dot-two" />
          <span className="productviz-config-dot dot-three" />
          <span className="productviz-config-line" />
        </>
      )}

      {type === "technical" && (
        <>
          <span className="productviz-tech-gear" />
          <span className="productviz-tech-center" />
          <span className="productviz-tech-line line-one" />
          <span className="productviz-tech-line line-two" />
        </>
      )}

      {type === "exploded" && (
        <>
          <span className="productviz-exploded-part part-one" />
          <span className="productviz-exploded-part part-two" />
          <span className="productviz-exploded-part part-three" />
          <span className="productviz-exploded-axis" />
        </>
      )}

      {type === "interactive" && (
        <>
          <span className="productviz-interactive-object" />
          <span className="productviz-interactive-ring ring-one" />
          <span className="productviz-interactive-ring ring-two" />
          <span className="productviz-interactive-cursor" />
        </>
      )}
    </div>
  );
};

const Reveal = ({
  children,
  className = "",
  direction = "left",
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
          element.classList.add("productviz-reveal-visible");
        } else {
          element.classList.remove("productviz-reveal-visible");
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
      className={`productviz-reveal productviz-reveal--${direction} ${className}`}
      style={{ "--productviz-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ProductVisualization = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="productviz-page">
      {/* HERO */}
      <section className="productviz-hero">
        <div className="productviz-hero-inner">
          <Reveal direction="left" className="productviz-hero-content">
            <span className="productviz-eyebrow">
              PRODUCT VISUALIZATION STUDIO
            </span>

            <h1>
              Products
              <span> Reimagined.</span>
              <br />
              Details
              <span> Revealed.</span>
            </h1>

            <p>
              We create detailed product visualizations that combine 3D
              modeling, realistic materials, controlled lighting and
              interactive experiences. From a single product component to a
              complete digital experience, every detail is designed to make
              the product easier to understand, explore and remember.
            </p>

            <div className="productviz-hero-meta">
              <span>Model</span>
              <i />
              <span>Material</span>
              <i />
              <span>Light</span>
              <i />
              <span>Interact</span>
            </div>
          </Reveal>

          <Reveal
  direction="right"
  delay={120}
  className="productviz-hero-visual"
>
  <div className="productviz-stage">
    <div className="productviz-stage-label">
      <span>3D PRODUCT</span>
      <strong>MODEL 024</strong>
    </div>

    <div className="productviz-stage-grid" />

    {/* Technical construction lines */}
    <div className="productviz-tech-line tech-line-one" />
    <div className="productviz-tech-line tech-line-two" />
    <div className="productviz-tech-line tech-line-three" />

    {/* Product orbit */}
    <div className="productviz-orbit orbit-one" />
    <div className="productviz-orbit orbit-two" />

    {/* Main 3D Product */}
    <div className="productviz-product">
      <div className="productviz-product-top">
        <span className="productviz-product-top-detail" />
      </div>

      <div className="productviz-product-body">
        <div className="productviz-product-front">
          <span className="productviz-product-screen" />
          <span className="productviz-product-button button-one" />
          <span className="productviz-product-button button-two" />
          <span className="productviz-product-detail detail-one" />
          <span className="productviz-product-detail detail-two" />
        </div>

        <div className="productviz-product-side" />

        <div className="productviz-product-highlight" />
      </div>

      <div className="productviz-product-base">
        <span />
        <span />
      </div>
    </div>

    {/* Wireframe / construction overlay */}
    <div className="productviz-wireframe">
      <span className="wireframe-line wireframe-one" />
      <span className="wireframe-line wireframe-two" />
      <span className="wireframe-line wireframe-three" />
      <span className="wireframe-line wireframe-four" />
    </div>

    {/* Product hotspots */}
    <div className="productviz-hotspot hotspot-one">
      <span />
      <strong>01</strong>
      <small>FORM</small>
    </div>

    <div className="productviz-hotspot hotspot-two">
      <span />
      <strong>02</strong>
      <small>DETAIL</small>
    </div>

    <div className="productviz-hotspot hotspot-three">
      <span />
      <strong>03</strong>
      <small>MATERIAL</small>
    </div>

    {/* Measurements */}
    <div className="productviz-measure measure-one">
      <span />
      <b>120 mm</b>
    </div>

    <div className="productviz-measure measure-two">
      <span />
      <b>360°</b>
    </div>

    {/* Material information */}
    <div className="productviz-material">
      <span className="productviz-material-swatch" />

      <div>
        <small>MATERIAL</small>
        <strong>MATTE / METAL</strong>
      </div>
    </div>

    {/* 3D model interface */}
    <div className="productviz-interface">
      <div className="productviz-interface-top">
        <span>PRODUCT MODEL</span>
        <strong>PX-024</strong>
      </div>

      <div className="productviz-interface-track">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="productviz-interface-controls">
        <i />
        <i />
        <i />
        <span>ROTATE</span>
        <span>ZOOM</span>
        <span>INSPECT</span>
      </div>
    </div>
  </div>
</Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="productviz-section productviz-services"
        id="productviz-services"
      >
        <div className="productviz-container">
          <Reveal direction="left">
            <div className="productviz-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Make every product
                <strong> worth exploring.</strong>
              </h2>

              <p>
                From realistic product renders to interactive 3D experiences,
                our visualization approach combines technical accuracy,
                design and visual storytelling.
              </p>
            </div>
          </Reveal>

          <div className="productviz-services-list">
            {visualizationServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="productviz-service-wrap"
              >
                <article className="productviz-service-card">
                  <div className="productviz-service-number">
                    {service.number}
                  </div>

                  <ProductIcon type={service.icon} />

                  <div className="productviz-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="productviz-service-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="productviz-section productviz-process">
        <div className="productviz-container">
          <Reveal direction="right">
            <div className="productviz-process-intro">
              <span>THE VISUALIZATION PROCESS</span>

              <h2>
                From product
                <strong> data </strong>
                to visual experience.
              </h2>

              <p>
                A structured workflow keeps the product accurate, the visual
                language consistent and every detail purposeful.
              </p>
            </div>
          </Reveal>

          <div className="productviz-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="productviz-process-item"
              >
                <div className="productviz-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="productviz-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="productviz-section productviz-benefits">
        <div className="productviz-container">
          <Reveal direction="left">
            <div className="productviz-section-heading">
              <span>WHY PRODUCT VISUALIZATION</span>

              <h2>
                See the product
                <strong> before it exists.</strong>
              </h2>

              <p>
                Digital visualization gives teams control over how products
                are presented, explained and experienced across different
                platforms.
              </p>
            </div>
          </Reveal>

          <div className="productviz-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
              >
                <article className="productviz-benefit">
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
      <section className="productviz-section productviz-faq">
        <div className="productviz-container">
          <Reveal direction="right">
            <div className="productviz-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> experience.</strong>
              </h2>

              <p>
                A few practical details about planning, creating and
                delivering a product visualization project.
              </p>
            </div>
          </Reveal>

          <div className="productviz-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`productviz-faq-item ${
                      isActive ? "productviz-faq-item--active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="productviz-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="productviz-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT */}
      <section className="productviz-final">
        <Reveal direction="left">
          <div className="productviz-final-inner">
            <span>THE FINAL VIEW</span>

            <h2>
              Good visualization
              <br />
              <strong>makes products visible.</strong>
            </h2>

            <p>
              It transforms product data, design and engineering into a
              visual experience that people can see, understand and explore.
            </p>

            <div className="productviz-final-line">
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

export default ProductVisualization;