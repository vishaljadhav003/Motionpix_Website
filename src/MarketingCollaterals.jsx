import React, { useEffect, useRef, useState } from "react";
import "./MarketingCollaterals.css";

const marketingCollateralServices = [
  {
    number: "01",
    title: "Brochures & Product Catalogues",
    description:
      "Structured layouts, product imagery, specifications and brand messaging are organised into polished brochures and catalogues that make information easy to browse and understand.",
    icon: "brochure",
  },
  {
    number: "02",
    title: "Flyers, Posters & Leaflets",
    description:
      "Purposeful typography, visual hierarchy and focused messaging help promotional flyers, event posters and informational leaflets communicate their message at a glance.",
    icon: "flyer",
  },
  {
    number: "03",
    title: "Business Cards & Brand Stationery",
    description:
      "Coordinated business cards, letterheads, envelopes and stationery layouts bring consistency to everyday brand communication and printed business materials.",
    icon: "stationery",
  },
  {
    number: "04",
    title: "Social Media Creatives",
    description:
      "Platform-conscious promotional graphics, announcement posts, campaign creatives and branded templates create a consistent visual presence across digital channels.",
    icon: "social",
  },
  {
    number: "05",
    title: "Presentations & Pitch Decks",
    description:
      "Branded presentation layouts, data slides, title pages and visual storytelling structures help businesses present ideas, products and proposals with clarity.",
    icon: "presentation",
  },
  {
    number: "06",
    title: "Integrated Marketing Campaign Kits",
    description:
      "A connected collection of print and digital assets keeps campaign visuals, key messages, typography and colour language consistent across marketing touchpoints.",
    icon: "campaign",
  },
];

const marketingCollateralProcess = [
  {
    number: "01",
    title: "Brief & Message",
    description:
      "We identify the target audience, communication objective, key message, required collateral formats and essential brand guidelines.",
  },
  {
    number: "02",
    title: "Concept & Layout",
    description:
      "Visual direction, layout structure, typography, colour use and image placement are planned around the purpose of each marketing asset.",
  },
  {
    number: "03",
    title: "Design & Refinement",
    description:
      "The collateral designs are developed, reviewed and refined to improve readability, visual consistency and communication impact.",
  },
  {
    number: "04",
    title: "Format & Delivery",
    description:
      "Approved assets are prepared for the agreed print or digital requirements, with dimensions, export settings and file formats checked against the brief.",
  },
];

const marketingCollateralBenefits = [
  {
    number: "01",
    title: "Maintain Brand Consistency",
    description:
      "A connected visual system helps brochures, social posts, presentations and other brand materials feel like part of the same identity.",
  },
  {
    number: "02",
    title: "Communicate Information Clearly",
    description:
      "Thoughtful hierarchy, typography and layout help readers find important information without unnecessary visual clutter.",
  },
  {
    number: "03",
    title: "Support Campaign Recognition",
    description:
      "Consistent colours, visual elements and message structure make related campaign assets easier to recognise across touchpoints.",
  },
  {
    number: "04",
    title: "Design for the Intended Format",
    description:
      "Print layouts and digital creatives can be developed with their intended dimensions, viewing context and usage requirements in mind.",
  },
];

const marketingCollateralFaqs = [
  {
    question: "What are marketing collaterals?",
    answer:
      "Marketing collaterals are branded materials used to communicate a business, product, service or campaign. They can include brochures, catalogues, flyers, posters, business stationery, social media creatives and presentations.",
  },
  {
    question: "Can print and digital collaterals share one design style?",
    answer:
      "Yes. Both can follow a shared brand system with coordinated colours, typography, imagery and messaging. Individual layouts should still be adapted to the dimensions and purpose of each format.",
  },
  {
    question: "Can brochures and product catalogues include detailed information?",
    answer:
      "Yes. Content such as product descriptions, specifications, feature highlights, imagery and contact information can be organised into a clear layout based on the provided content and intended audience.",
  },
  {
    question: "What information is needed before design starts?",
    answer:
      "A useful brief includes the target audience, communication goal, text and images, brand guidelines, required dimensions, delivery formats and any printing or platform specifications.",
  },
  {
    question: "Which file formats can be prepared?",
    answer:
      "The final formats depend on the brief and production requirements. Common deliverables can include print-ready PDFs and digital image or PDF exports. Editable source files should be agreed upon as part of the project scope.",
  },
];

const marketingCollateralPreviews = [
  {
    id: "print",
    number: "01",
    label: "Print Collateral",
    subtitle: "EDITORIAL / PRINT DESIGN",
    title: "Designed to Be Seen.",
    description:
      "A coordinated brochure and stationery direction using clear hierarchy, structured layouts and purposeful brand elements.",
    tag: "BROCHURE / FLYER / STATIONERY",
    type: "print",
    details: [
      { label: "Layout", value: "Editorial" },
      { label: "Purpose", value: "Inform & promote" },
      { label: "Format", value: "Print-ready" },
    ],
  },
  {
    id: "digital",
    number: "02",
    label: "Digital Creatives",
    subtitle: "DIGITAL / SOCIAL CONTENT",
    title: "Made for Every Feed.",
    description:
      "A branded digital creative direction for product announcements, promotional posts and campaign communication.",
    tag: "SOCIAL / PROMOTION / CAMPAIGN",
    type: "digital",
    details: [
      { label: "Layout", value: "Screen-focused" },
      { label: "Purpose", value: "Engage & inform" },
      { label: "Format", value: "Digital assets" },
    ],
  },
  {
    id: "campaign",
    number: "03",
    label: "Campaign Kit",
    subtitle: "INTEGRATED BRAND ASSETS",
    title: "One Brand. One Story.",
    description:
      "A coordinated visual direction connecting campaign graphics, presentation materials and promotional collateral.",
    tag: "IDENTITY / MESSAGE / CONSISTENCY",
    type: "campaign",
    details: [
      { label: "Visual system", value: "Coordinated" },
      { label: "Purpose", value: "Campaign support" },
      { label: "Format", value: "Multi-format" },
    ],
  },
];

const MarketingCollateralIcon = ({ type }) => {
  return (
    <div
      className={`marketingCollaterals-icon marketingCollaterals-icon--${type}`}
      aria-hidden="true"
    >
      {type === "brochure" && (
        <>
          <span className="marketingCollaterals-icon-brochure-page marketingCollaterals-icon-brochure-page--one" />
          <span className="marketingCollaterals-icon-brochure-page marketingCollaterals-icon-brochure-page--two" />
          <span className="marketingCollaterals-icon-brochure-block" />
          <span className="marketingCollaterals-icon-brochure-line marketingCollaterals-icon-brochure-line--one" />
          <span className="marketingCollaterals-icon-brochure-line marketingCollaterals-icon-brochure-line--two" />
        </>
      )}

      {type === "flyer" && (
        <>
          <span className="marketingCollaterals-icon-flyer-sheet" />
          <span className="marketingCollaterals-icon-flyer-heading" />
          <span className="marketingCollaterals-icon-flyer-art" />
          <span className="marketingCollaterals-icon-flyer-line marketingCollaterals-icon-flyer-line--one" />
          <span className="marketingCollaterals-icon-flyer-line marketingCollaterals-icon-flyer-line--two" />
        </>
      )}

      {type === "stationery" && (
        <>
          <span className="marketingCollaterals-icon-stationery-card" />
          <span className="marketingCollaterals-icon-stationery-mark">M</span>
          <span className="marketingCollaterals-icon-stationery-line marketingCollaterals-icon-stationery-line--one" />
          <span className="marketingCollaterals-icon-stationery-line marketingCollaterals-icon-stationery-line--two" />
        </>
      )}

      {type === "social" && (
        <>
          <span className="marketingCollaterals-icon-social-frame" />
          <span className="marketingCollaterals-icon-social-shape marketingCollaterals-icon-social-shape--one" />
          <span className="marketingCollaterals-icon-social-shape marketingCollaterals-icon-social-shape--two" />
          <span className="marketingCollaterals-icon-social-line" />
        </>
      )}

      {type === "presentation" && (
        <>
          <span className="marketingCollaterals-icon-presentation-screen" />
          <span className="marketingCollaterals-icon-presentation-line marketingCollaterals-icon-presentation-line--one" />
          <span className="marketingCollaterals-icon-presentation-line marketingCollaterals-icon-presentation-line--two" />
          <span className="marketingCollaterals-icon-presentation-bar marketingCollaterals-icon-presentation-bar--one" />
          <span className="marketingCollaterals-icon-presentation-bar marketingCollaterals-icon-presentation-bar--two" />
          <span className="marketingCollaterals-icon-presentation-bar marketingCollaterals-icon-presentation-bar--three" />
          <span className="marketingCollaterals-icon-presentation-stand" />
        </>
      )}

      {type === "campaign" && (
        <>
          <span className="marketingCollaterals-icon-campaign-core" />
          <span className="marketingCollaterals-icon-campaign-ring marketingCollaterals-icon-campaign-ring--one" />
          <span className="marketingCollaterals-icon-campaign-ring marketingCollaterals-icon-campaign-ring--two" />
          <span className="marketingCollaterals-icon-campaign-dot marketingCollaterals-icon-campaign-dot--one" />
          <span className="marketingCollaterals-icon-campaign-dot marketingCollaterals-icon-campaign-dot--two" />
        </>
      )}
    </div>
  );
};

const MarketingCollateralsReveal = ({
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
      element.classList.add("marketingCollaterals-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("marketingCollaterals-is-visible");
        } else {
          element.classList.remove("marketingCollaterals-is-visible");
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
        "marketingCollaterals-reveal",
        `marketingCollaterals-reveal--${direction}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--marketingCollaterals-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const MarketingCollaterals = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePreview, setActivePreview] = useState("print");

  const selectedPreview =
    marketingCollateralPreviews.find(
      (preview) => preview.id === activePreview
    ) || marketingCollateralPreviews[0];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="marketingCollaterals-page">
      {/* HERO */}
      <section className="marketingCollaterals-hero">
        <div className="marketingCollaterals-hero-inner">
          <MarketingCollateralsReveal
            direction="left"
            className="marketingCollaterals-hero-copy"
          >
            <span className="marketingCollaterals-eyebrow">
              MARKETING COLLATERALS / DESIGN STUDIO
            </span>

            <h1>
              Every Message.
              <br />
              <span>Designed</span>
              to Connect.
            </h1>

            <p>
              We create purposeful marketing materials that bring brand
              identity, information and visual communication together. From
              brochures and business stationery to digital campaign graphics,
              every layout is designed for its audience, message and intended
              format.
            </p>

            <div className="marketingCollaterals-hero-meta">
              <span>Brand</span>
              <i />
              <span>Layout</span>
              <i />
              <span>Message</span>
              <i />
              <span>Consistency</span>
            </div>
          </MarketingCollateralsReveal>

          <MarketingCollateralsReveal
            direction="right"
            delay={120}
            className="marketingCollaterals-hero-visual"
          >
            <div className="marketingCollaterals-design-stage">
              <div className="marketingCollaterals-stage-header">
                <span>BRAND MATERIALS / 001</span>
                <span className="marketingCollaterals-stage-status">
                  <i />
                  DESIGN SYSTEM
                </span>
              </div>

              <div className="marketingCollaterals-stage-orbit marketingCollaterals-stage-orbit--one" />
              <div className="marketingCollaterals-stage-orbit marketingCollaterals-stage-orbit--two" />

              <div className="marketingCollaterals-stage-paper marketingCollaterals-stage-paper--back">
                <span className="marketingCollaterals-paper-kicker">
                  CREATIVE DIRECTION
                </span>
                <span className="marketingCollaterals-paper-line marketingCollaterals-paper-line--one" />
                <span className="marketingCollaterals-paper-line marketingCollaterals-paper-line--two" />
                <span className="marketingCollaterals-paper-block" />
              </div>

              <div className="marketingCollaterals-stage-brochure">
                <div className="marketingCollaterals-brochure-top">
                  <span>STUDIO / 026</span>
                  <span>M.</span>
                </div>

                <div className="marketingCollaterals-brochure-art">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="marketingCollaterals-brochure-copy">
                  <span>MAKE YOUR MARK.</span>
                  <i />
                  <i />
                </div>

                <div className="marketingCollaterals-brochure-bottom">
                  <span>BRAND / DESIGN / IMPACT</span>
                </div>
              </div>

              <div className="marketingCollaterals-stage-card">
                <span className="marketingCollaterals-stage-card-mark">M.</span>
                <span className="marketingCollaterals-stage-card-rule" />
                <span className="marketingCollaterals-stage-card-small">
                  CREATIVE STUDIO
                </span>
              </div>

              <div className="marketingCollaterals-stage-palette">
                <span>VISUAL PALETTE</span>
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="marketingCollaterals-stage-footer">
                <span>PRINT / DIGITAL / CAMPAIGN</span>
                <span>MC—001</span>
              </div>
            </div>
          </MarketingCollateralsReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="marketingCollaterals-section marketingCollaterals-services"
        id="marketing-collaterals-services"
      >
        <div className="marketingCollaterals-container">
          <MarketingCollateralsReveal direction="up">
            <div className="marketingCollaterals-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Materials with
                <strong> a clear purpose.</strong>
              </h2>

              <p>
                Each collateral format has a different role. We align layout,
                messaging and visual identity to create materials that inform,
                promote and represent the brand consistently.
              </p>
            </div>
          </MarketingCollateralsReveal>

          <div className="marketingCollaterals-services-list">
            {marketingCollateralServices.map((service, index) => (
              <MarketingCollateralsReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="marketingCollaterals-service-wrap"
              >
                <article className="marketingCollaterals-service-card">
                  <span className="marketingCollaterals-service-number">
                    {service.number}
                  </span>

                  <MarketingCollateralIcon type={service.icon} />

                  <div className="marketingCollaterals-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span
                    className="marketingCollaterals-service-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              </MarketingCollateralsReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE COLLATERAL PREVIEW */}
      <section className="marketingCollaterals-section marketingCollaterals-explorer-section">
        <div className="marketingCollaterals-container">
          <MarketingCollateralsReveal direction="right">
            <div className="marketingCollaterals-section-heading">
              <span>EXPLORE THE DESIGN SYSTEM</span>

              <h2>
                One identity.
                <strong> Multiple formats.</strong>
              </h2>

              <p>
                Explore how a connected visual direction can translate into
                print collateral, digital creatives and coordinated campaign
                materials while respecting each format's purpose.
              </p>
            </div>
          </MarketingCollateralsReveal>

          <div className="marketingCollaterals-explorer">
            <MarketingCollateralsReveal
              direction="left"
              className="marketingCollaterals-explorer-controls"
            >
              <span className="marketingCollaterals-explorer-label">
                CHOOSE A COLLATERAL TYPE
              </span>

              <div
                className="marketingCollaterals-preview-tabs"
                role="tablist"
                aria-label="Marketing collateral types"
              >
                {marketingCollateralPreviews.map((preview) => (
                  <button
                    key={preview.id}
                    type="button"
                    role="tab"
                    id={`marketingCollaterals-tab-${preview.id}`}
                    aria-selected={activePreview === preview.id}
                    aria-controls="marketingCollaterals-preview-panel"
                    className={
                      activePreview === preview.id
                        ? "marketingCollaterals-preview-tab is-active"
                        : "marketingCollaterals-preview-tab"
                    }
                    onClick={() => setActivePreview(preview.id)}
                  >
                    <span>{preview.number}</span>
                    <strong>{preview.label}</strong>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>

              <div className="marketingCollaterals-explorer-note">
                <span>+</span>
                <p>
                  Every asset should feel connected to the brand while being
                  designed for the way its audience will read or view it.
                </p>
              </div>
            </MarketingCollateralsReveal>

            <MarketingCollateralsReveal
              direction="right"
              delay={100}
              className="marketingCollaterals-explorer-preview"
            >
              <div
                id="marketingCollaterals-preview-panel"
                role="tabpanel"
                aria-labelledby={`marketingCollaterals-tab-${selectedPreview.id}`}
                className={`marketingCollaterals-preview marketingCollaterals-preview--${selectedPreview.type}`}
                key={selectedPreview.id}
              >
                <div className="marketingCollaterals-preview-top">
                  <span>{selectedPreview.subtitle}</span>
                  <span>{selectedPreview.number} / 03</span>
                </div>

                <div className="marketingCollaterals-preview-art">
                  <span className="marketingCollaterals-preview-grid" />
                  <span className="marketingCollaterals-preview-corner marketingCollaterals-preview-corner--tl" />
                  <span className="marketingCollaterals-preview-corner marketingCollaterals-preview-corner--tr" />
                  <span className="marketingCollaterals-preview-corner marketingCollaterals-preview-corner--bl" />
                  <span className="marketingCollaterals-preview-corner marketingCollaterals-preview-corner--br" />

                  {selectedPreview.type === "print" && (
                    <div className="marketingCollaterals-mockup-print">
                      <div className="marketingCollaterals-mockup-print-back">
                        <span>DESIGN WITH PURPOSE</span>
                        <i />
                        <i />
                        <i />
                      </div>

                      <div className="marketingCollaterals-mockup-print-front">
                        <span className="marketingCollaterals-mockup-kicker">
                          BRAND / 026
                        </span>
                        <div className="marketingCollaterals-mockup-graphic">
                          <span />
                          <span />
                          <span />
                        </div>
                        <strong>MAKE IT MATTER.</strong>
                        <i />
                        <i />
                      </div>
                    </div>
                  )}

                  {selectedPreview.type === "digital" && (
                    <div className="marketingCollaterals-mockup-social">
                      <div className="marketingCollaterals-mockup-social-header">
                        <span>M.</span>
                        <i />
                        <i />
                      </div>

                      <div className="marketingCollaterals-mockup-social-art">
                        <span>NEW</span>
                        <strong>
                          IDEAS
                          <br />
                          IN FOCUS.
                        </strong>
                        <i />
                        <i />
                      </div>

                      <div className="marketingCollaterals-mockup-social-footer">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  )}

                  {selectedPreview.type === "campaign" && (
                    <div className="marketingCollaterals-mockup-campaign">
                      <div className="marketingCollaterals-campaign-poster">
                        <span>CAMPAIGN / 026</span>
                        <strong>
                          ONE
                          <br />
                          STORY.
                        </strong>
                        <i />
                        <i />
                      </div>

                      <div className="marketingCollaterals-campaign-card">
                        <span>M.</span>
                        <i />
                        <i />
                      </div>

                      <div className="marketingCollaterals-campaign-mini">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  )}

                  <div className="marketingCollaterals-preview-art-label">
                    <span>{selectedPreview.tag}</span>
                    <span>MC / {selectedPreview.number}</span>
                  </div>
                </div>

                <div className="marketingCollaterals-preview-description">
                  <span>{selectedPreview.number}</span>

                  <div>
                    <h3>{selectedPreview.title}</h3>
                    <p>{selectedPreview.description}</p>
                  </div>
                </div>

                <div className="marketingCollaterals-preview-details">
                  {selectedPreview.details.map((detail) => (
                    <div key={detail.label}>
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="marketingCollaterals-preview-footer">
                  <span>CONCEPT PREVIEW</span>
                  <span className="marketingCollaterals-preview-footer-dot" />
                  <span>MARKETING COLLATERALS</span>
                </div>
              </div>
            </MarketingCollateralsReveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="marketingCollaterals-section marketingCollaterals-process">
        <div className="marketingCollaterals-container">
          <MarketingCollateralsReveal direction="left">
            <div className="marketingCollaterals-process-intro">
              <span>THE DESIGN PROCESS</span>

              <h2>
                From the brief
                <strong> to the final asset.</strong>
              </h2>

              <p>
                A structured design workflow keeps the message focused, the
                visual system consistent and the final files aligned with
                their intended purpose.
              </p>
            </div>
          </MarketingCollateralsReveal>

          <div className="marketingCollaterals-process-line">
            {marketingCollateralProcess.map((step, index) => (
              <MarketingCollateralsReveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 80}
                className="marketingCollaterals-process-item"
              >
                <div className="marketingCollaterals-process-marker">
                  <span>{step.number}</span>
                </div>

                <article className="marketingCollaterals-process-card">
                  <div className="marketingCollaterals-process-card-top">
                    <span>PHASE {step.number}</span>
                    <span aria-hidden="true">↗</span>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </MarketingCollateralsReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="marketingCollaterals-section marketingCollaterals-benefits">
        <div className="marketingCollaterals-container">
          <MarketingCollateralsReveal direction="right">
            <div className="marketingCollaterals-section-heading">
              <span>WHY MARKETING COLLATERALS</span>

              <h2>
                Designed for
                <strong> consistent communication.</strong>
              </h2>

              <p>
                Well-planned collateral helps a business present information,
                reinforce its visual identity and adapt its message for
                different audiences and channels.
              </p>
            </div>
          </MarketingCollateralsReveal>

          <div className="marketingCollaterals-benefit-list">
            {marketingCollateralBenefits.map((benefit, index) => (
              <MarketingCollateralsReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="marketingCollaterals-benefit">
                  <span className="marketingCollaterals-benefit-number">
                    {benefit.number}
                  </span>

                  <div className="marketingCollaterals-benefit-copy">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <span
                    className="marketingCollaterals-benefit-mark"
                    aria-hidden="true"
                  />
                </article>
              </MarketingCollateralsReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="marketingCollaterals-section marketingCollaterals-faq">
        <div className="marketingCollaterals-container">
          <MarketingCollateralsReveal direction="up">
            <div className="marketingCollaterals-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding
                <strong> marketing collateral design.</strong>
              </h2>

              <p>
                A few practical details about formats, design consistency and
                preparing marketing materials for print or digital use.
              </p>
            </div>
          </MarketingCollateralsReveal>

          <div className="marketingCollaterals-faq-list">
            {marketingCollateralFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <MarketingCollateralsReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={(index % 3) * 60}
                >
                  <article
                    className={
                      isActive
                        ? "marketingCollaterals-faq-item is-active"
                        : "marketingCollaterals-faq-item"
                    }
                  >
                    <button
                      type="button"
                      className="marketingCollaterals-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={`marketingCollaterals-faq-answer-${index}`}
                    >
                      <span className="marketingCollaterals-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        <span>{faq.question}</span>
                      </span>

                      <span
                        className="marketingCollaterals-faq-toggle"
                        aria-hidden="true"
                      >
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      id={`marketingCollaterals-faq-answer-${index}`}
                      className="marketingCollaterals-faq-answer"
                      aria-hidden={!isActive}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                </MarketingCollateralsReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="marketingCollaterals-final">
        <MarketingCollateralsReveal direction="up">
          <div className="marketingCollaterals-final-inner">
            <span>THE POWER OF PRESENTATION</span>

            <h2>
              Every detail
              <br />
              <strong>has a message.</strong>
            </h2>

            <p>
              Great marketing collateral gives that message structure,
              consistency and a visual identity people can recognise across
              every intended touchpoint.
            </p>

            <div
              className="marketingCollaterals-final-sequence"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </MarketingCollateralsReveal>
      </section>
    </main>
  );
};

export default MarketingCollaterals;