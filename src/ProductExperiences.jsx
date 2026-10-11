import React, { useEffect, useRef, useState } from "react";
import "./ProductExperiences.css";

const productExperiencesServices = [
  {
    number: "01",
    title: "Interactive Product Configurators",
    description:
      "Let users explore product options through interactive selections, colour variations, components and feature combinations, creating a more personalised product discovery experience.",
    icon: "configurator",
  },
  {
    number: "02",
    title: "Interactive 3D Product Views",
    description:
      "Give users a closer look at product form, dimensions and details through 3D viewing experiences designed around intuitive navigation and visual clarity.",
    icon: "threeD",
  },
  {
    number: "03",
    title: "Product Feature Exploration",
    description:
      "Organise product features into interactive hotspots, detail panels and visual sections so users can discover important functions and specifications at their own pace.",
    icon: "features",
  },
  {
    number: "04",
    title: "Product Storytelling",
    description:
      "Present a product's design, purpose, functionality and key differentiators through connected visual scenes and structured interactive content.",
    icon: "story",
  },
  {
    number: "05",
    title: "Interactive Product Comparison",
    description:
      "Make product differences easier to understand with structured specification views, feature comparisons and clear visual highlighting of important details.",
    icon: "compare",
  },
  {
    number: "06",
    title: "Digital Product Showcases",
    description:
      "Create focused digital environments where product visuals, feature information and supporting content come together in a cohesive branded experience.",
    icon: "showcase",
  },
];

const productExperiencesProcess = [
  {
    number: "01",
    title: "Product Discovery",
    description:
      "We understand the product, its intended audience, key features, available assets and the questions users should be able to answer.",
  },
  {
    number: "02",
    title: "Experience Planning",
    description:
      "The information structure, interaction flow, visual direction and content hierarchy are planned to make product exploration intuitive.",
  },
  {
    number: "03",
    title: "Design & Interaction",
    description:
      "Product visuals, feature details, interactive controls and responsive layouts are developed to support a consistent user experience.",
  },
  {
    number: "04",
    title: "Review & Delivery",
    description:
      "The experience is reviewed across supported screen sizes, and interactions and assets are prepared for the agreed delivery environment.",
  },
];

const productExperiencesBenefits = [
  {
    number: "01",
    title: "Explore Products in More Detail",
    description:
      "Interactive views help users inspect product details, understand design choices and discover features beyond a static overview.",
  },
  {
    number: "02",
    title: "Make Product Information Clearer",
    description:
      "Organised specifications, focused explanations and visual feature highlights make important details easier to follow.",
  },
  {
    number: "03",
    title: "Support Informed Decisions",
    description:
      "Configurators and structured comparisons help users understand available options and differences between product variants.",
  },
  {
    number: "04",
    title: "Create a Connected Brand Experience",
    description:
      "Consistent product visuals, interaction patterns and content presentation create a cohesive experience across supported devices.",
  },
];

const productExperiencesFaqs = [
  {
    question: "What is a digital product experience?",
    answer:
      "A digital product experience is an interactive way for users to explore a product online. Depending on the project, it can include 3D views, product configuration, feature hotspots, detailed specifications and comparison tools.",
  },
  {
    question: "Can users interact with a product in 3D?",
    answer:
      "Yes. A suitable implementation can let users rotate, zoom and inspect a product model. The exact interactions depend on the model assets, performance requirements and selected web technology.",
  },
  {
    question: "Can users change product colours or configurations?",
    answer:
      "Yes. A configurator can expose available options such as colours, finishes, components or variants. The options shown should reflect the actual product data and supported combinations.",
  },
  {
    question: "Can product features be explained with interactive hotspots?",
    answer:
      "Yes. Hotspots can identify specific areas of a product and reveal supporting descriptions, diagrams or specifications when selected. Their placement and behaviour depend on the chosen product presentation.",
  },
  {
    question: "Can a product experience work on mobile devices?",
    answer:
      "Yes. The layout and controls can be adapted for touch input and smaller displays. Model complexity, loading performance and device capabilities should be considered during implementation.",
  },
];

const productExperiencesPreviews = [
  {
    id: "explore",
    number: "01",
    label: "Product Explorer",
    subtitle: "INTERACTIVE PRODUCT VIEW",
    title: "Look Closer.",
    description:
      "Explore the product presentation, inspect highlighted details and navigate a focused visual experience.",
    tag: "VIEW / DISCOVER / INSPECT",
    type: "explore",
    details: [
      { label: "Visual detail", value: "Focused view" },
      { label: "Navigation", value: "Explore points" },
      { label: "Experience", value: "Interactive" },
    ],
  },
  {
    id: "configure",
    number: "02",
    label: "Product Configurator",
    subtitle: "PERSONALISED PRODUCT OPTIONS",
    title: "Make It Yours.",
    description:
      "Preview a configuration-led experience built around product choices, variant selection and visual feedback.",
    tag: "OPTIONS / VARIANTS / CUSTOMISE",
    type: "configure",
    details: [
      { label: "Product options", value: "Selectable" },
      { label: "Visual feedback", value: "Option based" },
      { label: "Experience", value: "Personalised" },
    ],
  },
  {
    id: "compare",
    number: "03",
    label: "Feature Comparison",
    subtitle: "CLEAR PRODUCT DIFFERENCES",
    title: "See What Matters.",
    description:
      "Review product variants and their defining attributes through a structured, easy-to-scan comparison.",
    tag: "FEATURES / SPECS / DIFFERENCES",
    type: "compare",
    details: [
      { label: "Information", value: "Structured" },
      { label: "Product variants", value: "Comparable" },
      { label: "Experience", value: "Decision support" },
    ],
  },
];

const ProductExperiencesIcon = ({ type }) => {
  return (
    <div
      className={`productExperiences-icon productExperiences-icon--${type}`}
      aria-hidden="true"
    >
      {type === "configurator" && (
        <>
          <span className="productExperiences-icon-configurator-frame" />
          <span className="productExperiences-icon-configurator-knob productExperiences-icon-configurator-knob--one" />
          <span className="productExperiences-icon-configurator-knob productExperiences-icon-configurator-knob--two" />
          <span className="productExperiences-icon-configurator-knob productExperiences-icon-configurator-knob--three" />
          <span className="productExperiences-icon-configurator-check" />
        </>
      )}

      {type === "threeD" && (
        <>
          <span className="productExperiences-icon-3d-cube" />
          <span className="productExperiences-icon-3d-cube-face" />
          <span className="productExperiences-icon-3d-orbit" />
          <span className="productExperiences-icon-3d-dot" />
        </>
      )}

      {type === "features" && (
        <>
          <span className="productExperiences-icon-feature-product" />
          <span className="productExperiences-icon-feature-point productExperiences-icon-feature-point--one" />
          <span className="productExperiences-icon-feature-point productExperiences-icon-feature-point--two" />
          <span className="productExperiences-icon-feature-point productExperiences-icon-feature-point--three" />
          <span className="productExperiences-icon-feature-line productExperiences-icon-feature-line--one" />
          <span className="productExperiences-icon-feature-line productExperiences-icon-feature-line--two" />
        </>
      )}

      {type === "story" && (
        <>
          <span className="productExperiences-icon-story-frame" />
          <span className="productExperiences-icon-story-play" />
          <span className="productExperiences-icon-story-line productExperiences-icon-story-line--one" />
          <span className="productExperiences-icon-story-line productExperiences-icon-story-line--two" />
        </>
      )}

      {type === "compare" && (
        <>
          <span className="productExperiences-icon-compare-panel productExperiences-icon-compare-panel--one" />
          <span className="productExperiences-icon-compare-panel productExperiences-icon-compare-panel--two" />
          <span className="productExperiences-icon-compare-check productExperiences-icon-compare-check--one" />
          <span className="productExperiences-icon-compare-check productExperiences-icon-compare-check--two" />
          <span className="productExperiences-icon-compare-line" />
        </>
      )}

      {type === "showcase" && (
        <>
          <span className="productExperiences-icon-showcase-platform" />
          <span className="productExperiences-icon-showcase-product" />
          <span className="productExperiences-icon-showcase-glow" />
          <span className="productExperiences-icon-showcase-spark productExperiences-icon-showcase-spark--one" />
          <span className="productExperiences-icon-showcase-spark productExperiences-icon-showcase-spark--two" />
        </>
      )}
    </div>
  );
};

const ProductExperiencesReveal = ({
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

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("productExperiences-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("productExperiences-is-visible");
        } else {
          element.classList.remove("productExperiences-is-visible");
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
      className={[
        "productExperiences-reveal",
        `productExperiences-reveal--${direction}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--productExperiences-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ProductExperiences = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePreview, setActivePreview] = useState("explore");
  const [selectedFinish, setSelectedFinish] = useState("red");

  const selectedExperience =
    productExperiencesPreviews.find(
      (preview) => preview.id === activePreview
    ) || productExperiencesPreviews[0];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="productExperiences-page">
      {/* HERO */}
      <section className="productExperiences-hero">
        <div className="productExperiences-hero-inner">
          <ProductExperiencesReveal
            direction="left"
            className="productExperiences-hero-copy"
          >
            <span className="productExperiences-eyebrow">
              PRODUCT EXPERIENCES / DIGITAL STUDIO
            </span>

            <h1>
              Products
              <br />
              <span>Worth</span> Exploring.
            </h1>

            <p>
              We create interactive digital product experiences that help
              people discover features, explore designs and understand product
              value. By connecting clear information with purposeful visual
              interaction, we turn product browsing into a more engaging
              experience.
            </p>

            <div className="productExperiences-hero-meta">
              <span>Explore</span>
              <i />
              <span>Interact</span>
              <i />
              <span>Configure</span>
              <i />
              <span>Discover</span>
            </div>
          </ProductExperiencesReveal>

          <ProductExperiencesReveal
            direction="right"
            delay={120}
            className="productExperiences-hero-visual"
          >
            <div className="productExperiences-product-stage">
              <div className="productExperiences-stage-header">
                <span>PRODUCT EXPERIENCE / 001</span>

                <span className="productExperiences-stage-status">
                  <i />
                  INTERACTIVE
                </span>
              </div>

              <div className="productExperiences-stage-orbit productExperiences-stage-orbit--one" />
              <div className="productExperiences-stage-orbit productExperiences-stage-orbit--two" />
              <div className="productExperiences-stage-crosshair productExperiences-stage-crosshair--one" />
              <div className="productExperiences-stage-crosshair productExperiences-stage-crosshair--two" />

              <div
                className={`productExperiences-hero-device productExperiences-hero-device--${selectedFinish}`}
              >
                <div className="productExperiences-device-top" />
                <div className="productExperiences-device-side" />
                <div className="productExperiences-device-front">
                  <span className="productExperiences-device-sensor" />
                  <span className="productExperiences-device-detail productExperiences-device-detail--one" />
                  <span className="productExperiences-device-detail productExperiences-device-detail--two" />
                  <span className="productExperiences-device-detail productExperiences-device-detail--three" />
                  <span className="productExperiences-device-logo">PX</span>
                </div>
              </div>

              <span className="productExperiences-stage-hotspot productExperiences-stage-hotspot--one">
                <i />
              </span>

              <span className="productExperiences-stage-hotspot productExperiences-stage-hotspot--two">
                <i />
              </span>

              <div className="productExperiences-stage-callout productExperiences-stage-callout--one">
                <span>01</span>
                <div>
                  <strong>Product form</strong>
                  <small>DESIGN DETAILS</small>
                </div>
              </div>

              <div className="productExperiences-stage-callout productExperiences-stage-callout--two">
                <span>02</span>
                <div>
                  <strong>Finish options</strong>
                  <small>VISUAL VARIANTS</small>
                </div>
              </div>

              <div className="productExperiences-stage-platform">
                <span />
                <span />
                <span />
              </div>

              <div className="productExperiences-stage-finish">
                <span>CHOOSE A FINISH</span>

                <div
                  className="productExperiences-finish-options"
                  role="group"
                  aria-label="Choose product preview finish"
                >
                  <button
                    type="button"
                    className={
                      selectedFinish === "red"
                        ? "productExperiences-finish-swatch productExperiences-finish-swatch--red is-active"
                        : "productExperiences-finish-swatch productExperiences-finish-swatch--red"
                    }
                    onClick={() => setSelectedFinish("red")}
                    aria-label="Red finish"
                    aria-pressed={selectedFinish === "red"}
                  />

                  <button
                    type="button"
                    className={
                      selectedFinish === "silver"
                        ? "productExperiences-finish-swatch productExperiences-finish-swatch--silver is-active"
                        : "productExperiences-finish-swatch productExperiences-finish-swatch--silver"
                    }
                    onClick={() => setSelectedFinish("silver")}
                    aria-label="Silver finish"
                    aria-pressed={selectedFinish === "silver"}
                  />

                  <button
                    type="button"
                    className={
                      selectedFinish === "graphite"
                        ? "productExperiences-finish-swatch productExperiences-finish-swatch--graphite is-active"
                        : "productExperiences-finish-swatch productExperiences-finish-swatch--graphite"
                    }
                    onClick={() => setSelectedFinish("graphite")}
                    aria-label="Graphite finish"
                    aria-pressed={selectedFinish === "graphite"}
                  />
                </div>
              </div>

              <div className="productExperiences-stage-footer">
                <span>FORM / FINISH / FUNCTION</span>
                <span>PX—001</span>
              </div>
            </div>
          </ProductExperiencesReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="productExperiences-section productExperiences-services"
        id="product-experiences-services"
      >
        <div className="productExperiences-container">
          <ProductExperiencesReveal direction="up">
            <div className="productExperiences-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                More than a product.
                <strong> An experience.</strong>
              </h2>

              <p>
                From interactive product viewing to feature discovery and
                configuration, each experience is designed to help users
                understand the product through clear visuals and useful
                interactions.
              </p>
            </div>
          </ProductExperiencesReveal>

          <div className="productExperiences-services-list">
            {productExperiencesServices.map((service, index) => (
              <ProductExperiencesReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="productExperiences-service-wrap"
              >
                <article className="productExperiences-service-card">
                  <span className="productExperiences-service-number">
                    {service.number}
                  </span>

                  <ProductExperiencesIcon type={service.icon} />

                  <div className="productExperiences-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span
                    className="productExperiences-service-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              </ProductExperiencesReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE EXPERIENCE EXPLORER */}
      <section className="productExperiences-section productExperiences-explorer-section">
        <div className="productExperiences-container">
          <ProductExperiencesReveal direction="right">
            <div className="productExperiences-section-heading">
              <span>EXPLORE THE EXPERIENCE</span>

              <h2>
                Every detail.
                <strong> Within reach.</strong>
              </h2>

              <p>
                Different products call for different ways of exploring.
                Select an experience type to preview how product information
                and interaction can work together.
              </p>
            </div>
          </ProductExperiencesReveal>

          <div className="productExperiences-explorer">
            <ProductExperiencesReveal
              direction="left"
              className="productExperiences-explorer-controls"
            >
              <span className="productExperiences-explorer-label">
                CHOOSE AN EXPERIENCE
              </span>

              <div
                className="productExperiences-preview-tabs"
                role="tablist"
                aria-label="Product experience types"
              >
                {productExperiencesPreviews.map((preview) => (
                  <button
                    key={preview.id}
                    type="button"
                    role="tab"
                    id={`productExperiences-tab-${preview.id}`}
                    aria-selected={activePreview === preview.id}
                    aria-controls="productExperiences-preview-panel"
                    className={
                      activePreview === preview.id
                        ? "productExperiences-preview-tab is-active"
                        : "productExperiences-preview-tab"
                    }
                    onClick={() => setActivePreview(preview.id)}
                  >
                    <span>{preview.number}</span>
                    <strong>{preview.label}</strong>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>

              <div className="productExperiences-explorer-note">
                <span>+</span>
                <p>
                  Every interaction should help users learn something useful
                  about the product—not add complexity without purpose.
                </p>
              </div>
            </ProductExperiencesReveal>

            <ProductExperiencesReveal
              direction="right"
              delay={100}
              className="productExperiences-explorer-preview"
            >
              <div
                id="productExperiences-preview-panel"
                role="tabpanel"
                aria-labelledby={`productExperiences-tab-${selectedExperience.id}`}
                className={`productExperiences-preview productExperiences-preview--${selectedExperience.type}`}
                key={selectedExperience.id}
              >
                <div className="productExperiences-preview-top">
                  <span>{selectedExperience.subtitle}</span>
                  <span>{selectedExperience.number} / 03</span>
                </div>

                <div className="productExperiences-preview-art">
                  <span className="productExperiences-preview-orbit productExperiences-preview-orbit--one" />
                  <span className="productExperiences-preview-orbit productExperiences-preview-orbit--two" />

                  <span className="productExperiences-preview-corner productExperiences-preview-corner--tl" />
                  <span className="productExperiences-preview-corner productExperiences-preview-corner--tr" />
                  <span className="productExperiences-preview-corner productExperiences-preview-corner--bl" />
                  <span className="productExperiences-preview-corner productExperiences-preview-corner--br" />

                  <div className="productExperiences-preview-object">
                    <span className="productExperiences-preview-object-top" />
                    <span className="productExperiences-preview-object-front">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="productExperiences-preview-object-side" />
                  </div>

                  {selectedExperience.type === "explore" && (
                    <>
                      <span className="productExperiences-preview-hotspot productExperiences-preview-hotspot--one">
                        <i />
                      </span>
                      <span className="productExperiences-preview-hotspot productExperiences-preview-hotspot--two">
                        <i />
                      </span>
                      <span className="productExperiences-preview-hotspot productExperiences-preview-hotspot--three">
                        <i />
                      </span>
                    </>
                  )}

                  {selectedExperience.type === "configure" && (
                    <div className="productExperiences-preview-configurator">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}

                  {selectedExperience.type === "compare" && (
                    <div className="productExperiences-preview-compare">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}

                  <div className="productExperiences-preview-art-label">
                    <span>PRODUCT / DETAIL VIEW</span>
                    <span>01—03</span>
                  </div>
                </div>

                <div className="productExperiences-preview-description">
                  <span>{selectedExperience.number}</span>

                  <div>
                    <h3>{selectedExperience.title}</h3>
                    <p>{selectedExperience.description}</p>
                  </div>
                </div>

                <div className="productExperiences-preview-details">
                  {selectedExperience.details.map((detail) => (
                    <div key={detail.label}>
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="productExperiences-preview-footer">
                  <span>CONCEPT PREVIEW</span>
                  <span className="productExperiences-preview-footer-dot" />
                  <span>PRODUCT EXPERIENCE</span>
                </div>
              </div>
            </ProductExperiencesReveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="productExperiences-section productExperiences-process">
        <div className="productExperiences-container">
          <ProductExperiencesReveal direction="left">
            <div className="productExperiences-process-intro">
              <span>THE EXPERIENCE PROCESS</span>

              <h2>
                From product insight
                <strong> to interaction.</strong>
              </h2>

              <p>
                Each stage connects product understanding with experience
                planning, visual execution and a considered final delivery.
              </p>
            </div>
          </ProductExperiencesReveal>

          <div className="productExperiences-process-line">
            {productExperiencesProcess.map((step, index) => (
              <ProductExperiencesReveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 80}
                className="productExperiences-process-item"
              >
                <div className="productExperiences-process-marker">
                  <span>{step.number}</span>
                </div>

                <article className="productExperiences-process-card">
                  <div className="productExperiences-process-card-top">
                    <span>PHASE {step.number}</span>
                    <span aria-hidden="true">↗</span>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </ProductExperiencesReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="productExperiences-section productExperiences-benefits">
        <div className="productExperiences-container">
          <ProductExperiencesReveal direction="right">
            <div className="productExperiences-section-heading">
              <span>WHY PRODUCT EXPERIENCES</span>

              <h2>
                Built around
                <strong> product discovery.</strong>
              </h2>

              <p>
                Useful interactions let users focus on the product, find
                relevant information and explore details according to their
                needs.
              </p>
            </div>
          </ProductExperiencesReveal>

          <div className="productExperiences-benefit-list">
            {productExperiencesBenefits.map((benefit, index) => (
              <ProductExperiencesReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="productExperiences-benefit">
                  <span className="productExperiences-benefit-number">
                    {benefit.number}
                  </span>

                  <div className="productExperiences-benefit-copy">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <span
                    className="productExperiences-benefit-mark"
                    aria-hidden="true"
                  />
                </article>
              </ProductExperiencesReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="productExperiences-section productExperiences-faq">
        <div className="productExperiences-container">
          <ProductExperiencesReveal direction="up">
            <div className="productExperiences-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding
                <strong> product interaction.</strong>
              </h2>

              <p>
                Answers to common questions about designing interactive
                product views, configurable options and feature exploration.
              </p>
            </div>
          </ProductExperiencesReveal>

          <div className="productExperiences-faq-list">
            {productExperiencesFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <ProductExperiencesReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={(index % 3) * 60}
                >
                  <article
                    className={
                      isActive
                        ? "productExperiences-faq-item is-active"
                        : "productExperiences-faq-item"
                    }
                  >
                    <button
                      type="button"
                      className="productExperiences-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={`productExperiences-faq-answer-${index}`}
                    >
                      <span className="productExperiences-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        <span>{faq.question}</span>
                      </span>

                      <span
                        className="productExperiences-faq-toggle"
                        aria-hidden="true"
                      >
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      id={`productExperiences-faq-answer-${index}`}
                      className="productExperiences-faq-answer"
                      aria-hidden={!isActive}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                </ProductExperiencesReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="productExperiences-final">
        <ProductExperiencesReveal direction="up">
          <div className="productExperiences-final-inner">
            <span>THE PRODUCT EXPERIENCE</span>

            <h2>
              Don't just show
              <br />
              <strong>the product.</strong>
              <br />
              Let them explore.
            </h2>

            <p>
              A considered product experience turns details into discovery,
              interactions into understanding and product information into a
              more meaningful digital journey.
            </p>

            <div
              className="productExperiences-final-sequence"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </ProductExperiencesReveal>
      </section>
    </main>
  );
};

export default ProductExperiences;