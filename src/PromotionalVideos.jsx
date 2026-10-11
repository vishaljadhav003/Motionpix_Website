import React, { useEffect, useRef, useState } from "react";
import "./PromotionalVideos.css";

const promotionalServices = [
  {
    number: "01",
    title: "Product Promotion",
    description:
      "High-impact promotional videos that present products through polished visuals, feature highlights, dynamic transitions and benefit-driven storytelling.",
    icon: "product",
  },
  {
    number: "02",
    title: "Brand Promotion",
    description:
      "Brand-focused videos that combine visual identity, messaging, motion and storytelling to create stronger recognition and memorable communication.",
    icon: "brand",
  },
  {
    number: "03",
    title: "Corporate Promotion",
    description:
      "Professional promotional films designed to communicate company capabilities, services, achievements and value propositions with clarity and impact.",
    icon: "corporate",
  },
  {
    number: "04",
    title: "Launch Videos",
    description:
      "Attention-driven launch videos built around anticipation, feature reveals, visual pacing and strong messaging for new products, services and campaigns.",
    icon: "launch",
  },
  {
    number: "05",
    title: "Social Media Promos",
    description:
      "Short-form promotional content created for digital platforms with fast visual hooks, concise messaging, engaging motion and platform-friendly compositions.",
    icon: "social",
  },
  {
    number: "06",
    title: "Campaign Videos",
    description:
      "Promotional campaign videos that connect creative visuals, messaging and brand objectives into a consistent communication experience across multiple touchpoints.",
    icon: "campaign",
  },
];

const promotionalProcess = [
  {
    number: "01",
    title: "Objective & Strategy",
    description:
      "We identify the campaign objective, target audience, key message and desired audience response before developing the creative direction.",
  },
  {
    number: "02",
    title: "Concept & Storyboard",
    description:
      "The promotional idea is shaped into a visual concept with scene planning, messaging, transitions and a clear storytelling structure.",
  },
  {
    number: "03",
    title: "Visual Production",
    description:
      "Graphics, footage, motion elements, typography, product visuals and brand assets are brought together into the promotional sequence.",
  },
  {
    number: "04",
    title: "Edit & Delivery",
    description:
      "Timing, transitions, sound, visual rhythm and final presentation are refined before preparing the video for its intended platforms.",
  },
];

const promotionalBenefits = [
  {
    number: "01",
    title: "Capture Attention Quickly",
    description:
      "Strong visual openings and purposeful pacing help promotional content communicate its core message within the first few moments.",
  },
  {
    number: "02",
    title: "Show Product Value",
    description:
      "Features, benefits and differentiators can be presented visually so audiences can understand what makes the product or service valuable.",
  },
  {
    number: "03",
    title: "Strengthen Brand Recall",
    description:
      "Consistent typography, colours, motion language and storytelling help promotional videos build a recognisable brand presence.",
  },
  {
    number: "04",
    title: "Adapt Across Platforms",
    description:
      "Promotional concepts can be structured for websites, presentations, social media, campaigns, digital advertising and other communication channels.",
  },
];

const promotionalFaqs = [
  {
    question: "What is a promotional video?",
    answer:
      "A promotional video is a visual communication piece created to promote a product, service, brand, campaign, event or specific business message.",
  },
  {
    question: "Can promotional videos include product animation?",
    answer:
      "Yes. Product animation, motion graphics, typography, live footage, 3D visuals and other visual elements can be combined depending on the communication objective.",
  },
  {
    question: "Can the same video be adapted for social media?",
    answer:
      "Yes. A promotional concept can be prepared in different aspect ratios, durations and compositions for platforms such as websites, social media and digital campaigns.",
  },
  {
    question: "How long should a promotional video be?",
    answer:
      "The ideal duration depends on the message, platform and audience. Short promotional videos focus on a strong hook and concise communication, while longer videos can provide more context.",
  },
  {
    question: "What makes a promotional video effective?",
    answer:
      "Clear messaging, strong visual direction, engaging pacing, relevant storytelling, consistent branding and a focused communication objective all contribute to an effective promotional video.",
  },
];

const PromotionalIcon = ({ type }) => {
  return (
    <div className={`promotionalvideos-icon promotionalvideos-icon--${type}`}>
      {type === "product" && (
        <>
          <span className="promotionalvideos-product-box" />
          <span className="promotionalvideos-product-highlight" />
          <span className="promotionalvideos-product-line line-one" />
          <span className="promotionalvideos-product-line line-two" />
        </>
      )}

      {type === "brand" && (
        <>
          <span className="promotionalvideos-brand-circle" />
          <span className="promotionalvideos-brand-ring" />
          <span className="promotionalvideos-brand-mark" />
        </>
      )}

      {type === "corporate" && (
        <>
          <span className="promotionalvideos-corporate-building building-one" />
          <span className="promotionalvideos-corporate-building building-two" />
          <span className="promotionalvideos-corporate-building building-three" />
          <span className="promotionalvideos-corporate-window" />
        </>
      )}

      {type === "launch" && (
        <>
          <span className="promotionalvideos-launch-circle" />
          <span className="promotionalvideos-launch-arrow" />
          <span className="promotionalvideos-launch-line line-one" />
          <span className="promotionalvideos-launch-line line-two" />
        </>
      )}

      {type === "social" && (
        <>
          <span className="promotionalvideos-social-phone" />
          <span className="promotionalvideos-social-play" />
          <span className="promotionalvideos-social-dot dot-one" />
          <span className="promotionalvideos-social-dot dot-two" />
        </>
      )}

      {type === "campaign" && (
        <>
          <span className="promotionalvideos-campaign-megaphone" />
          <span className="promotionalvideos-campaign-wave wave-one" />
          <span className="promotionalvideos-campaign-wave wave-two" />
          <span className="promotionalvideos-campaign-dot" />
        </>
      )}
    </div>
  );
};

const PromotionalReveal = ({
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
      className={`promotionalvideos-reveal promotionalvideos-reveal--${direction} ${className}`}
      style={{ "--promotionalvideos-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const PromotionalVideos = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="promotionalvideos-page">
      {/* HERO */}
      <section className="promotionalvideos-hero">
        <div className="promotionalvideos-hero-inner">
          <PromotionalReveal
            direction="left"
            className="promotionalvideos-hero-content"
          >
            <span className="promotionalvideos-eyebrow">
              PROMOTIONAL VIDEO STUDIO
            </span>

            <h1>
              Make Your
              <span> Message.</span>
              <br />
              Move Your
              <span> Audience.</span>
            </h1>

            <p>
              We create premium promotional videos that turn products,
              services, brands and campaigns into engaging visual experiences.
              From the first visual hook to the final frame, every element is
              designed around attention, clarity and brand impact.
            </p>

            <div className="promotionalvideos-hero-meta">
              <span>Concept</span>
              <i />
              <span>Visuals</span>
              <i />
              <span>Motion</span>
              <i />
              <span>Impact</span>
            </div>
          </PromotionalReveal>

          <PromotionalReveal
            direction="right"
            delay={120}
            className="promotionalvideos-hero-visual"
          >
            <div className="promotionalvideos-stage">
              <div className="promotionalvideos-stage-label">
                <span>PROMO</span>
                <strong>PLAY / 024</strong>
              </div>

              <div className="promotionalvideos-stage-screen">
                <div className="promotionalvideos-screen-header">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="promotionalvideos-screen-content">
                  <span className="promotionalvideos-screen-kicker">
                    NEW CAMPAIGN
                  </span>

                  <strong>
                    MAKE
                    <br />
                    AN
                    <br />
                    IMPACT.
                  </strong>

                  <div className="promotionalvideos-screen-line" />

                  <span className="promotionalvideos-screen-number">
                    01 / 06
                  </span>
                </div>

                <div className="promotionalvideos-play">
                  <span />
                </div>
              </div>

              <div className="promotionalvideos-floating-card card-one">
                <span>PRODUCT</span>
                <strong>01</strong>
              </div>

              <div className="promotionalvideos-floating-card card-two">
                <span>BRAND</span>
                <strong>02</strong>
              </div>

              <div className="promotionalvideos-orbit orbit-one" />
              <div className="promotionalvideos-orbit orbit-two" />

              <div className="promotionalvideos-timeline">
                <div className="promotionalvideos-timeline-labels">
                  <span>HOOK</span>
                  <span>MESSAGE</span>
                  <span>REVEAL</span>
                  <span>IMPACT</span>
                </div>

                <div className="promotionalvideos-timeline-track">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="promotionalvideos-playhead" />
              </div>
            </div>
          </PromotionalReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="promotionalvideos-section promotionalvideos-services"
        id="promotionalvideos-services"
      >
        <div className="promotionalvideos-container">
          <PromotionalReveal direction="left">
            <div className="promotionalvideos-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Promotions designed
                <strong> to be remembered.</strong>
              </h2>

              <p>
                From product launches to brand campaigns, we create promotional
                videos that combine strategy, visual storytelling, motion and
                purposeful pacing.
              </p>
            </div>
          </PromotionalReveal>

          <div className="promotionalvideos-services-list">
            {promotionalServices.map((service, index) => (
              <PromotionalReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="promotionalvideos-service-wrap"
              >
                <article className="promotionalvideos-service-card">
                  <div className="promotionalvideos-service-number">
                    {service.number}
                  </div>

                  <PromotionalIcon type={service.icon} />

                  <div className="promotionalvideos-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="promotionalvideos-service-arrow">↗</span>
                </article>
              </PromotionalReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="promotionalvideos-section promotionalvideos-process">
        <div className="promotionalvideos-container">
          <PromotionalReveal direction="right">
            <div className="promotionalvideos-process-intro">
              <span>THE PROMOTIONAL PROCESS</span>

              <h2>
                From an idea to
                <strong> audience impact.</strong>
              </h2>

              <p>
                Every promotional video follows a focused production process
                where strategy, storytelling, design and motion work together
                to deliver a clear message.
              </p>
            </div>
          </PromotionalReveal>

          <div className="promotionalvideos-process-line">
            {promotionalProcess.map((step, index) => (
              <PromotionalReveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="promotionalvideos-process-item"
              >
                <div className="promotionalvideos-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="promotionalvideos-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </PromotionalReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="promotionalvideos-section promotionalvideos-benefits">
        <div className="promotionalvideos-container">
          <PromotionalReveal direction="left">
            <div className="promotionalvideos-section-heading">
              <span>WHY PROMOTIONAL VIDEO</span>

              <h2>
                Turn attention into
                <strong> action.</strong>
              </h2>

              <p>
                Promotional videos bring together visual storytelling,
                messaging and motion to help brands communicate faster,
                stronger and more memorably.
              </p>
            </div>
          </PromotionalReveal>

          <div className="promotionalvideos-benefit-list">
            {promotionalBenefits.map((benefit, index) => (
              <PromotionalReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
              >
                <article className="promotionalvideos-benefit">
                  <span>{benefit.number}</span>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <i />
                </article>
              </PromotionalReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="promotionalvideos-section promotionalvideos-faq">
        <div className="promotionalvideos-container">
          <PromotionalReveal direction="right">
            <div className="promotionalvideos-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding
                <strong> promotional videos.</strong>
              </h2>

              <p>
                A few practical details about planning, producing and using
                promotional video content.
              </p>
            </div>
          </PromotionalReveal>

          <div className="promotionalvideos-faq-list">
            {promotionalFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <PromotionalReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`promotionalvideos-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="promotionalvideos-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="promotionalvideos-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </PromotionalReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT */}
      <section className="promotionalvideos-final">
        <PromotionalReveal direction="left">
          <div className="promotionalvideos-final-inner">
            <span>THE FINAL FRAME</span>

            <h2>
              Don't just
              <br />
              <strong>promote it.</strong>
            </h2>

            <p>
              Give your message movement, personality and visual impact that
              stays with the audience.
            </p>

            <div className="promotionalvideos-final-line">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </PromotionalReveal>
      </section>
    </main>
  );
};

export default PromotionalVideos;