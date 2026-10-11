import React, { useEffect, useRef, useState } from "react";
import "./PhotographyVideography.css";

/* =========================================================
   SERVICES
========================================================= */

const photographyServices = [
  {
    number: "01",
    title: "Brand Photography",
    description:
      "Professional brand imagery created to communicate your identity, people, products and visual personality with a consistent photographic language.",
    icon: "camera",
  },
  {
    number: "02",
    title: "Product Photography",
    description:
      "Detailed product visuals with controlled composition, lighting and perspective that highlight features, finishes, details and overall product appeal.",
    icon: "product",
  },
  {
    number: "03",
    title: "Corporate Videography",
    description:
      "Purposeful corporate films, company stories and workplace visuals that present your organisation, people, culture and capabilities with clarity.",
    icon: "video",
  },
  {
    number: "04",
    title: "Event Coverage",
    description:
      "Photography and video coverage that captures important moments, audience energy, key interactions and memorable details throughout an event.",
    icon: "event",
  },
  {
    number: "05",
    title: "Commercial Shoots",
    description:
      "Concept-driven commercial visuals combining composition, camera movement, lighting and editing to create engaging promotional communication.",
    icon: "commercial",
  },
  {
    number: "06",
    title: "Social Media Content",
    description:
      "Platform-ready photo and video content designed for reels, stories, campaigns and digital communication while keeping the brand visually consistent.",
    icon: "social",
  },
];

/* =========================================================
   PROCESS
========================================================= */

const processSteps = [
  {
    number: "01",
    title: "Concept & Planning",
    description:
      "We understand the objective, audience, location, subject, visual direction and final platforms before the shoot begins.",
  },
  {
    number: "02",
    title: "Pre-Production",
    description:
      "Shot lists, references, schedules, locations, equipment, lighting requirements and production details are organised for a smooth shoot.",
  },
  {
    number: "03",
    title: "Shoot & Direction",
    description:
      "Photography and video are captured with controlled framing, lighting, camera movement and direction to achieve the intended visual story.",
  },
  {
    number: "04",
    title: "Edit & Delivery",
    description:
      "Selected photographs and video footage are refined through editing, colour treatment, sound and finishing before final delivery.",
  },
];

/* =========================================================
   BENEFITS
========================================================= */

const benefits = [
  {
    number: "01",
    title: "Create Strong Visual Identity",
    description:
      "Consistent photography and videography help your brand look recognisable, professional and visually distinctive across communication channels.",
  },
  {
    number: "02",
    title: "Show Instead of Tell",
    description:
      "High-quality visuals communicate products, people, environments and experiences quickly through authentic imagery and visual storytelling.",
  },
  {
    number: "03",
    title: "Control the Visual Experience",
    description:
      "Lighting, composition, camera movement, colour and editing work together to control how your brand, product or story is experienced.",
  },
  {
    number: "04",
    title: "Adapt Across Platforms",
    description:
      "Content can be structured for websites, campaigns, social media, presentations, advertisements, corporate communication and digital platforms.",
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqs = [
  {
    question: "What type of photography projects can you handle?",
    answer:
      "Photography can be planned for products, brands, corporate environments, people, events, campaigns, social media content and other commercial visual requirements.",
  },
  {
    question: "What type of videos can be produced?",
    answer:
      "We can create corporate films, commercial videos, event coverage, product videos, promotional content, social media reels and other brand-focused video communication.",
  },
  {
    question: "Do you handle the complete shoot process?",
    answer:
      "Yes. The production can include concept planning, shot lists, location and production planning, shooting, direction, editing, colour treatment and final delivery.",
  },
  {
    question: "Can content be created for social media?",
    answer:
      "Yes. Photography and video can be planned specifically for reels, stories, posts and campaign formats while maintaining the visual language of the brand.",
  },
  {
    question: "Can photography and videography be combined in one project?",
    answer:
      "Yes. A single production can combine still photography and video coverage so that both formats share the same concept, lighting direction, styling and visual identity.",
  },
];

/* =========================================================
   CUSTOM PHOTOGRAPHY / VIDEOGRAPHY ICONS
========================================================= */

const PhotographyIcon = ({ type }) => {
  return (
    <div className={`photography-icon photography-icon--${type}`}>
      {type === "camera" && (
        <>
          <span className="photography-icon-camera-body" />
          <span className="photography-icon-camera-top" />
          <span className="photography-icon-camera-lens" />
          <span className="photography-icon-camera-dot" />
        </>
      )}

      {type === "product" && (
        <>
          <span className="photography-icon-product-box" />
          <span className="photography-icon-product-top" />
          <span className="photography-icon-product-line photography-icon-product-line-one" />
          <span className="photography-icon-product-line photography-icon-product-line-two" />
        </>
      )}

      {type === "video" && (
        <>
          <span className="photography-icon-video-screen" />
          <span className="photography-icon-video-play" />
          <span className="photography-icon-video-bar" />
        </>
      )}

      {type === "event" && (
        <>
          <span className="photography-icon-event-frame" />
          <span className="photography-icon-event-person photography-icon-event-person-one" />
          <span className="photography-icon-event-person photography-icon-event-person-two" />
          <span className="photography-icon-event-flash" />
        </>
      )}

      {type === "commercial" && (
        <>
          <span className="photography-icon-commercial-light" />
          <span className="photography-icon-commercial-beam" />
          <span className="photography-icon-commercial-subject" />
        </>
      )}

      {type === "social" && (
        <>
          <span className="photography-icon-social-phone" />
          <span className="photography-icon-social-play" />
          <span className="photography-icon-social-dot" />
          <span className="photography-icon-social-line" />
        </>
      )}
    </div>
  );
};

/* =========================================================
   BIDIRECTIONAL SCROLL REVEAL
========================================================= */

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
      className={`photography-reveal photography-reveal--${direction} ${className}`}
      style={{ "--photography-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* =========================================================
   HERO VISUAL
========================================================= */

const PhotographyHeroVisual = () => {
  return (
    <div className="photography-hero-visual">
      <div className="photography-camera-stage">
        <div className="photography-stage-label">
          <span>CAPTURE</span>
          <strong>FRAME 024</strong>
        </div>

        <div className="photography-viewfinder">
          <span className="photography-focus-corner photography-focus-top-left" />
          <span className="photography-focus-corner photography-focus-top-right" />
          <span className="photography-focus-corner photography-focus-bottom-left" />
          <span className="photography-focus-corner photography-focus-bottom-right" />

          <div className="photography-subject">
            <div className="photography-subject-head" />
            <div className="photography-subject-body" />
          </div>

          <div className="photography-focus-ring">
            <span />
          </div>
        </div>

        <div className="photography-floating-frame photography-floating-frame-one">
          <span className="photography-frame-camera" />
          <i />
          <b />
        </div>

        <div className="photography-floating-frame photography-floating-frame-two">
          <span className="photography-frame-play" />
          <i />
          <b />
        </div>

        <div className="photography-light-beam" />

        <div className="photography-camera-controls">
          <div className="photography-control-top">
            <span>ISO</span>
            <strong>400</strong>
            <span>F/2.8</span>
            <strong>1/125</strong>
          </div>

          <div className="photography-control-track">
            <span />
            <span />
            <span />
            <span />
            <span />
            <i />
          </div>
        </div>

        <div className="photography-record">
          <span />
          REC
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const PhotographyVideography = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="photography-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="photography-hero">
        <div className="photography-hero-inner">
          <Reveal
            direction="left"
            className="photography-hero-content"
          >
            <span className="photography-eyebrow">
              PHOTOGRAPHY / VIDEOGRAPHY STUDIO
            </span>

            <h1>
              Moments That
              <span> Matter.</span>
              <br />
              Stories That
              <span> Stay.</span>
            </h1>

            <p>
              We create purposeful photography and videography for brands,
              products, people, events and campaigns. Every frame is shaped
              through thoughtful composition, lighting, direction and editing
              to create visuals that communicate, connect and remain
              memorable.
            </p>

            <div className="photography-hero-meta">
              <span>Concept</span>
              <i />
              <span>Light</span>
              <i />
              <span>Capture</span>
              <i />
              <span>Story</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="photography-hero-visual-wrap"
          >
            <PhotographyHeroVisual />
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="photography-section photography-services"
        id="photography-services"
      >
        <div className="photography-container">
          <Reveal direction="left">
            <div className="photography-section-heading">
              <span>WHAT WE CAPTURE</span>

              <h2>
                Every frame has
                <strong> a reason.</strong>
              </h2>

              <p>
                From controlled product imagery to dynamic commercial films,
                our photography and videography approach combines visual
                direction, technical precision and storytelling.
              </p>
            </div>
          </Reveal>

          <div className="photography-services-list">
            {photographyServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="photography-service-wrap"
              >
                <article className="photography-service-card">
                  <div className="photography-service-number">
                    {service.number}
                  </div>

                  <PhotographyIcon type={service.icon} />

                  <div className="photography-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="photography-service-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="photography-section photography-process">
        <div className="photography-container">
          <Reveal direction="right">
            <div className="photography-process-intro">
              <span>THE PRODUCTION PROCESS</span>

              <h2>
                From the first
                <strong> concept </strong>
                to the final frame.
              </h2>

              <p>
                A structured production workflow keeps the visual direction
                clear, the shoot organised and every frame intentional.
              </p>
            </div>
          </Reveal>

          <div className="photography-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="photography-process-item"
              >
                <div className="photography-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="photography-process-copy">
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

      <section className="photography-section photography-benefits">
        <div className="photography-container">
          <Reveal direction="left">
            <div className="photography-section-heading">
              <span>WHY VISUAL STORYTELLING</span>

              <h2>
                Designed to make
                <strong> visuals speak.</strong>
              </h2>

              <p>
                Strong photography and videography give brands a visual
                language that can communicate emotion, quality, identity and
                experience before a single word is read.
              </p>
            </div>
          </Reveal>

          <div className="photography-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
              >
                <article className="photography-benefit">
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

      <section className="photography-section photography-faq">
        <div className="photography-container">
          <Reveal direction="right">
            <div className="photography-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> production.</strong>
              </h2>

              <p>
                A few practical details about planning, shooting, editing and
                delivering photography and videography projects.
              </p>
            </div>
          </Reveal>

          <div className="photography-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`photography-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="photography-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="photography-faq-answer">
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

      <section className="photography-final">
        <Reveal direction="left">
          <div className="photography-final-inner">
            <span>THE FINAL FRAME</span>

            <h2>
              Great visuals
              <br />
              <strong>don't just capture.</strong>
            </h2>

            <p>
              They preserve a feeling, communicate a story and give people a
              reason to remember what they saw.
            </p>

            <div className="photography-final-line">
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

export default PhotographyVideography;