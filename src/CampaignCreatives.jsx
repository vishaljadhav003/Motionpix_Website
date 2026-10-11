import React, { useEffect, useRef, useState } from "react";
import "./CampaignCreatives.css";

const campaignCreativeServices = [
  {
    number: "01",
    title: "Social Media Creatives",
    description:
      "Platform-ready campaign posts, carousel designs, stories and promotional visuals built around a clear message, consistent brand styling and a strong visual hierarchy.",
    icon: "social",
  },
  {
    number: "02",
    title: "Digital Advertising Creatives",
    description:
      "Visual assets for digital advertising campaigns, including display banners, offer-led ads and promotional variations designed to communicate the message quickly.",
    icon: "ads",
  },
  {
    number: "03",
    title: "Campaign Key Visuals",
    description:
      "A distinctive central visual direction that connects campaign headlines, imagery, typography, colour and supporting graphic elements across multiple executions.",
    icon: "keyvisual",
  },
  {
    number: "04",
    title: "Promotional & Offer Creatives",
    description:
      "Sale announcements, seasonal promotions, discount graphics and offer highlights arranged to make key information clear without overwhelming the design.",
    icon: "promotion",
  },
  {
    number: "05",
    title: "Product Launch Creatives",
    description:
      "Teaser graphics, launch announcements, feature highlights and release-day visuals that introduce a product, service or new brand initiative with consistency.",
    icon: "launch",
  },
  {
    number: "06",
    title: "Print & Outdoor Adaptations",
    description:
      "Campaign artwork adapted for posters, flyers, standees, hoardings and other approved print or outdoor formats while preserving the core visual direction.",
    icon: "outdoor",
  },
];

const campaignProcessSteps = [
  {
    number: "01",
    title: "Brief & Campaign Objective",
    description:
      "We define the audience, campaign goal, key message, required deliverables, brand guidelines and intended placements before developing the creative direction.",
  },
  {
    number: "02",
    title: "Concept & Visual Direction",
    description:
      "The headline, colour palette, typography, layout, imagery and supporting graphic language are planned as one coherent campaign concept.",
  },
  {
    number: "03",
    title: "Creative Design & Adaptation",
    description:
      "The approved direction is developed into individual assets, with the composition adjusted for each required platform, size and communication format.",
  },
  {
    number: "04",
    title: "Review & Final Delivery",
    description:
      "The artwork is checked for layout consistency, legibility, content accuracy and output requirements before final files are prepared in the agreed formats.",
  },
];

const campaignBenefits = [
  {
    number: "01",
    title: "One Consistent Campaign Identity",
    description:
      "A shared visual language helps posts, banners, launch graphics and promotional assets feel connected rather than unrelated.",
  },
  {
    number: "02",
    title: "Clearer Visual Communication",
    description:
      "Purposeful layouts and visual hierarchy help audiences identify the campaign message, key offer and supporting information more easily.",
  },
  {
    number: "03",
    title: "Flexible Creative Adaptations",
    description:
      "A central design direction can be adapted into multiple sizes and placements while retaining recognisable campaign elements.",
  },
  {
    number: "04",
    title: "Brand-Focused Design",
    description:
      "Typography, colour, imagery and graphic details can be aligned with the brand's visual identity and the intended campaign tone.",
  },
];

const campaignFaqs = [
  {
    question: "What are campaign creatives?",
    answer:
      "Campaign creatives are visual assets developed to communicate a specific promotion, launch, announcement or marketing message. They can include social posts, digital ad banners, campaign key visuals, offer graphics, posters and other campaign-related formats.",
  },
  {
    question: "Which types of campaign creatives can be designed?",
    answer:
      "The scope can include social media posts and carousels, stories, display ads, promotional graphics, seasonal campaign artwork, product launch visuals, posters, flyers and selected outdoor advertising adaptations.",
  },
  {
    question: "Can one campaign design be adapted for different platforms?",
    answer:
      "Yes. A core campaign visual can be adapted for different placements and dimensions. Layout, text size, cropping and visual emphasis should be adjusted for each format instead of simply stretching the same artwork.",
  },
  {
    question: "What information is needed to start a campaign?",
    answer:
      "Useful inputs include the campaign objective, target audience, key message, offer details if applicable, brand assets, preferred platforms, required dimensions, content and delivery requirements.",
  },
  {
    question: "Can campaign creatives follow existing brand guidelines?",
    answer:
      "Yes. Existing brand colours, typography, logos, image direction and layout guidelines can be used as the foundation for a cohesive campaign visual system.",
  },
  {
    question: "Which file formats can be delivered?",
    answer:
      "Delivery formats depend on the agreed scope and intended use. Common requirements include web-ready image formats such as PNG or JPEG, with print-ready exports prepared according to the printer's specifications when needed.",
  },
];

const campaignPreviewContent = {
  social: {
    label: "SOCIAL CAMPAIGN",
    code: "SOC / 01",
    eyebrow: "MAKE IT",
    title: "MOTIONPIX.",
    detail: "A scroll-stopping visual direction",
    footer: "SOCIAL / CAROUSEL / STORIES",
  },
  ads: {
    label: "DIGITAL AD CAMPAIGN",
    code: "ADS / 02",
    eyebrow: "BIG IDEAS.",
    title: "CLEAR IMPACT.",
    detail: "A message built for quick recognition",
    footer: "DISPLAY / PROMOTION / DIGITAL",
  },
  launch: {
    label: "PRODUCT LAUNCH",
    code: "NEW / 03",
    eyebrow: "A NEW",
    title: "CHAPTER.",
    detail: "A connected look for launch day",
    footer: "TEASER / REVEAL / ANNOUNCEMENT",
  },
};

const CampaignCreativeIcon = ({ type }) => {
  return (
    <div
      className={`campaignCreatives-icon campaignCreatives-icon--${type}`}
      aria-hidden="true"
    >
      {type === "social" && (
        <>
          <span className="campaignCreatives-social-frame" />
          <span className="campaignCreatives-social-sun" />
          <span className="campaignCreatives-social-hill campaignCreatives-social-hill--one" />
          <span className="campaignCreatives-social-hill campaignCreatives-social-hill--two" />
          <span className="campaignCreatives-social-caption" />
        </>
      )}

      {type === "ads" && (
        <>
          <span className="campaignCreatives-ad-window" />
          <span className="campaignCreatives-ad-line campaignCreatives-ad-line--one" />
          <span className="campaignCreatives-ad-line campaignCreatives-ad-line--two" />
          <span className="campaignCreatives-ad-button" />
        </>
      )}

      {type === "keyvisual" && (
        <>
          <span className="campaignCreatives-keyvisual-ring" />
          <span className="campaignCreatives-keyvisual-core" />
          <span className="campaignCreatives-keyvisual-cross campaignCreatives-keyvisual-cross--one" />
          <span className="campaignCreatives-keyvisual-cross campaignCreatives-keyvisual-cross--two" />
        </>
      )}

      {type === "promotion" && (
        <>
          <span className="campaignCreatives-promo-tag" />
          <span className="campaignCreatives-promo-percent">%</span>
          <span className="campaignCreatives-promo-spark campaignCreatives-promo-spark--one" />
          <span className="campaignCreatives-promo-spark campaignCreatives-promo-spark--two" />
        </>
      )}

      {type === "launch" && (
        <>
          <span className="campaignCreatives-launch-core" />
          <span className="campaignCreatives-launch-ray campaignCreatives-launch-ray--one" />
          <span className="campaignCreatives-launch-ray campaignCreatives-launch-ray--two" />
          <span className="campaignCreatives-launch-ray campaignCreatives-launch-ray--three" />
          <span className="campaignCreatives-launch-ray campaignCreatives-launch-ray--four" />
        </>
      )}

      {type === "outdoor" && (
        <>
          <span className="campaignCreatives-outdoor-stand" />
          <span className="campaignCreatives-outdoor-board">
            <span />
            <span />
            <span />
          </span>
          <span className="campaignCreatives-outdoor-base" />
        </>
      )}
    </div>
  );
};

const CampaignReveal = ({
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

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("campaignCreatives-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("campaignCreatives-is-visible");
        } else {
          element.classList.remove("campaignCreatives-is-visible");
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`campaignCreatives-reveal campaignCreatives-reveal--${direction} ${className}`}
      style={{ "--campaignCreatives-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CampaignCreatives = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePreview, setActivePreview] = useState("social");

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  const preview = campaignPreviewContent[activePreview];

  return (
    <main className="campaignCreatives-page">
      {/* HERO */}
      <section className="campaignCreatives-hero">
        <div className="campaignCreatives-hero-inner">
          <CampaignReveal
            direction="left"
            className="campaignCreatives-hero-content"
          >
            <span className="campaignCreatives-eyebrow">
              CAMPAIGN / CREATIVE STUDIO
            </span>

            <h1>
              Make Your
              <span> Message.</span>
              <br />
              Make It
              <span> Matter.</span>
            </h1>

            <p>
              We create campaign-focused visual designs that bring promotions,
              product launches and brand messages into one clear visual
              direction. From digital ads to social posts and campaign key
              visuals, every creative is built around the message it needs to
              communicate.
            </p>

            <div className="campaignCreatives-hero-meta">
              <span>Concept</span>
              <i />
              <span>Design</span>
              <i />
              <span>Adaptation</span>
              <i />
              <span>Delivery</span>
            </div>

            <div className="campaignCreatives-hero-note">
              <span className="campaignCreatives-note-indicator" />
              <span>One campaign idea. A connected visual language.</span>
            </div>
          </CampaignReveal>

          <CampaignReveal
            direction="right"
            delay={120}
            className="campaignCreatives-hero-visual"
          >
            <div
              className={`campaignCreatives-stage campaignCreatives-stage--${activePreview}`}
            >
              <div className="campaignCreatives-stage-top">
                <span className="campaignCreatives-stage-brand">
                  <i />
                  CREATIVE / LAB
                </span>
                <span className="campaignCreatives-stage-code">
                  {preview.code}
                </span>
              </div>

              <div className="campaignCreatives-stage-ruler campaignCreatives-stage-ruler--top">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
              </div>

              <div className="campaignCreatives-artwork">
                <div className="campaignCreatives-artwork-grid" />

                <div className="campaignCreatives-artwork-stamp">
                  <span>CAMPAIGN</span>
                  <strong>CREATIVE</strong>
                </div>

                <div className="campaignCreatives-artwork-orbit campaignCreatives-artwork-orbit--one" />
                <div className="campaignCreatives-artwork-orbit campaignCreatives-artwork-orbit--two" />

                <div className="campaignCreatives-artwork-sun" />

                <div className="campaignCreatives-artwork-shape">
                  <span />
                </div>

                <div className="campaignCreatives-artwork-copy">
                  <span>{preview.eyebrow}</span>
                  <h2>{preview.title}</h2>
                  <p>{preview.detail}</p>
                </div>

                <div className="campaignCreatives-artwork-footer">
                  <span>{preview.label}</span>
                  <span>CC / 2026</span>
                </div>

                <span className="campaignCreatives-artwork-plus campaignCreatives-artwork-plus--one">
                  +
                </span>
                <span className="campaignCreatives-artwork-plus campaignCreatives-artwork-plus--two">
                  +
                </span>
              </div>

              <div className="campaignCreatives-stage-bottom">
                <span>VISUAL DIRECTION</span>
                <div className="campaignCreatives-stage-colors">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span>RGB / CMYK</span>
              </div>

              <div className="campaignCreatives-floating-card campaignCreatives-floating-card--left">
                <span className="campaignCreatives-floating-dot" />
                <div>
                  <strong>01 / CONCEPT</strong>
                  <small>Visual direction</small>
                </div>
              </div>

              <div className="campaignCreatives-floating-card campaignCreatives-floating-card--right">
                <span className="campaignCreatives-format-icon">Aa</span>
                <div>
                  <strong>DESIGN SYSTEM</strong>
                  <small>Type / Colour / Layout</small>
                </div>
              </div>
            </div>

            <div className="campaignCreatives-preview-controls">
              <span className="campaignCreatives-preview-label">
                EXPLORE THE FORMAT
              </span>

              <div
                className="campaignCreatives-preview-tabs"
                role="group"
                aria-label="Campaign creative preview"
              >
                <button
                  type="button"
                  className={
                    activePreview === "social" ? "is-active" : ""
                  }
                  onClick={() => setActivePreview("social")}
                  aria-pressed={activePreview === "social"}
                >
                  Social
                </button>

                <button
                  type="button"
                  className={activePreview === "ads" ? "is-active" : ""}
                  onClick={() => setActivePreview("ads")}
                  aria-pressed={activePreview === "ads"}
                >
                  Digital Ads
                </button>

                <button
                  type="button"
                  className={activePreview === "launch" ? "is-active" : ""}
                  onClick={() => setActivePreview("launch")}
                  aria-pressed={activePreview === "launch"}
                >
                  Launch
                </button>
              </div>
            </div>
          </CampaignReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="campaignCreatives-section campaignCreatives-services"
        id="campaignCreatives-services"
      >
        <div className="campaignCreatives-container">
          <CampaignReveal direction="up">
            <div className="campaignCreatives-section-heading">
              <span>WHAT WE DESIGN</span>
              <h2>
                One message.
                <strong> Many creative possibilities.</strong>
              </h2>
              <p>
                Campaign assets need to work together while respecting the
                context and dimensions of each placement. We design around the
                central campaign idea and its individual deliverables.
              </p>
            </div>
          </CampaignReveal>

          <div className="campaignCreatives-service-list">
            {campaignCreativeServices.map((service, index) => (
              <CampaignReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 65}
                className="campaignCreatives-service-wrap"
              >
                <article className="campaignCreatives-service-card">
                  <div className="campaignCreatives-service-number">
                    {service.number}
                  </div>

                  <CampaignCreativeIcon type={service.icon} />

                  <div className="campaignCreatives-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span
                    className="campaignCreatives-service-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              </CampaignReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="campaignCreatives-section campaignCreatives-process">
        <div className="campaignCreatives-container">
          <CampaignReveal direction="left">
            <div className="campaignCreatives-process-intro">
              <span>THE CREATIVE PROCESS</span>
              <h2>
                From the campaign brief
                <strong> to the final asset.</strong>
              </h2>
              <p>
                A defined workflow connects the campaign objective with its
                concept, individual designs and final delivery requirements.
              </p>
            </div>
          </CampaignReveal>

          <div className="campaignCreatives-process-line">
            {campaignProcessSteps.map((step, index) => (
              <CampaignReveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
                className="campaignCreatives-process-item"
              >
                <div className="campaignCreatives-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="campaignCreatives-process-copy">
                  <div className="campaignCreatives-process-topline">
                    <span>STAGE {step.number}</span>
                    <i />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </CampaignReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="campaignCreatives-section campaignCreatives-benefits">
        <div className="campaignCreatives-container">
          <CampaignReveal direction="right">
            <div className="campaignCreatives-section-heading">
              <span>WHY CAMPAIGN DESIGN MATTERS</span>
              <h2>
                Creative consistency.
                <strong> Clear communication.</strong>
              </h2>
              <p>
                A well-planned campaign visual system helps keep the message
                recognisable across different formats without forcing every
                asset into an identical layout.
              </p>
            </div>
          </CampaignReveal>

          <div className="campaignCreatives-benefit-list">
            {campaignBenefits.map((benefit, index) => (
              <CampaignReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 80}
              >
                <article className="campaignCreatives-benefit">
                  <span>{benefit.number}</span>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <i aria-hidden="true" />
                </article>
              </CampaignReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="campaignCreatives-section campaignCreatives-faq">
        <div className="campaignCreatives-container">
          <CampaignReveal direction="up">
            <div className="campaignCreatives-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Before the creative
                <strong> goes live.</strong>
              </h2>
              <p>
                A few practical details about campaign planning, creative
                formats, adaptations and file delivery.
              </p>
            </div>
          </CampaignReveal>

          <div className="campaignCreatives-faq-list">
            {campaignFaqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `campaignCreatives-faq-answer-${index}`;

              return (
                <CampaignReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 55}
                >
                  <div
                    className={`campaignCreatives-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="campaignCreatives-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span>
                        <small>
                          {String(index + 1).padStart(2, "0")}
                        </small>
                        {faq.question}
                      </span>

                      <b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>

                    <div
                      className="campaignCreatives-faq-answer"
                      id={answerId}
                      aria-hidden={!isActive}
                    >
                      <div className="campaignCreatives-faq-answer-inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </CampaignReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="campaignCreatives-final">
        <CampaignReveal direction="up">
          <div className="campaignCreatives-final-inner">
            <span>THE CAMPAIGN IDEA</span>

            <h2>
              Every creative
              <br />
              <strong>has a message.</strong>
            </h2>

            <p>
              Bring the message, the visual direction and the campaign
              experience together through design that feels considered,
              consistent and distinctly on-brand.
            </p>

            <div
              className="campaignCreatives-final-mark"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </CampaignReveal>
      </section>
    </main>
  );
};

export default CampaignCreatives;