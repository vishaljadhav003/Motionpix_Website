import React, { useEffect, useRef, useState } from "react";
import "./BrandIdentity.css";

const brandServices = [
  {
    number: "01",
    title: "Brand Strategy",
    description:
      "A clear brand foundation is created by defining positioning, audience, personality, values and the visual direction that should shape every brand touchpoint.",
    icon: "strategy",
  },
  {
    number: "02",
    title: "Logo Design",
    description:
      "Distinctive logo systems are designed with meaningful forms, balanced proportions and strong visual recognition so the identity remains memorable across applications.",
    icon: "logo",
  },
  {
    number: "03",
    title: "Colour System",
    description:
      "A purposeful colour palette is developed to establish emotion, hierarchy and consistency while making the brand recognisable across digital and physical communication.",
    icon: "colour",
  },
  {
    number: "04",
    title: "Typography",
    description:
      "Typography is selected and structured to create a consistent voice through hierarchy, spacing, weight and readable type combinations.",
    icon: "type",
  },
  {
    number: "05",
    title: "Visual Language",
    description:
      "Shapes, graphic elements, imagery, patterns and supporting visual details are developed into a coherent system that gives the brand its own character.",
    icon: "visual",
  },
  {
    number: "06",
    title: "Brand Guidelines",
    description:
      "The complete identity is organised into practical guidelines that explain how the logo, colours, typography and visual elements should be used consistently.",
    icon: "guideline",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover & Define",
    description:
      "We understand the business, audience, market position, values and communication goals before establishing the creative direction.",
  },
  {
    number: "02",
    title: "Concept & Direction",
    description:
      "Logo concepts, colour direction, typography and visual references are explored to create a distinctive and meaningful identity route.",
  },
  {
    number: "03",
    title: "Design & System",
    description:
      "The selected direction is refined into a complete visual system where every element works together with consistency and purpose.",
  },
  {
    number: "04",
    title: "Guidelines & Delivery",
    description:
      "The final identity system is organised into usable brand guidelines and prepared for the required digital, print and communication applications.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Build Recognition",
    description:
      "A consistent identity helps people recognise the brand quickly and remember it across different communication channels.",
  },
  {
    number: "02",
    title: "Create Consistency",
    description:
      "A defined visual system keeps every touchpoint aligned, from digital interfaces and social media to presentations and printed material.",
  },
  {
    number: "03",
    title: "Express Brand Personality",
    description:
      "Colour, typography, shapes and visual language work together to communicate the character and feeling behind the brand.",
  },
  {
    number: "04",
    title: "Scale With Confidence",
    description:
      "A structured identity system gives teams a clear visual foundation that can grow with new campaigns, products and platforms.",
  },
];

const faqs = [
  {
    question: "What does a complete brand identity include?",
    answer:
      "A complete brand identity can include brand strategy, logo design, colour palette, typography, visual language, supporting graphic elements and practical brand guidelines.",
  },
  {
    question: "Is brand identity different from just designing a logo?",
    answer:
      "Yes. A logo is one part of the identity. Brand identity also defines how colours, typography, imagery, graphic elements and other visual components work together consistently.",
  },
  {
    question: "How is the visual style decided?",
    answer:
      "The visual direction is developed according to the brand's positioning, audience, personality, market context and communication objectives.",
  },
  {
    question: "Can the identity be used for both digital and print?",
    answer:
      "Yes. The identity system can be structured to work across websites, social media, presentations, packaging, stationery, marketing material and other required brand touchpoints.",
  },
  {
    question: "Why are brand guidelines important?",
    answer:
      "Brand guidelines provide a clear reference for using the identity correctly, helping maintain visual consistency as the brand grows across different teams, platforms and applications.",
  },
];

const BrandIdentityIcon = ({ type }) => {
  return (
    <div className={`brandidentity-icon brandidentity-icon--${type}`}>
      {type === "strategy" && (
        <>
          <span className="bi-strategy-circle circle-one" />
          <span className="bi-strategy-circle circle-two" />
          <span className="bi-strategy-line line-one" />
          <span className="bi-strategy-line line-two" />
          <span className="bi-strategy-dot" />
        </>
      )}

      {type === "logo" && (
        <>
          <span className="bi-logo-shape" />
          <span className="bi-logo-cut" />
          <span className="bi-logo-dot" />
        </>
      )}

      {type === "colour" && (
        <>
          <span className="bi-colour-circle colour-one" />
          <span className="bi-colour-circle colour-two" />
          <span className="bi-colour-circle colour-three" />
          <span className="bi-colour-circle colour-four" />
        </>
      )}

      {type === "type" && (
        <>
          <span className="bi-type-letter">A</span>
          <span className="bi-type-line type-line-one" />
          <span className="bi-type-line type-line-two" />
          <span className="bi-type-line type-line-three" />
        </>
      )}

      {type === "visual" && (
        <>
          <span className="bi-visual-square square-one" />
          <span className="bi-visual-square square-two" />
          <span className="bi-visual-ring" />
          <span className="bi-visual-line" />
        </>
      )}

      {type === "guideline" && (
        <>
          <span className="bi-guide-page" />
          <span className="bi-guide-line guide-one" />
          <span className="bi-guide-line guide-two" />
          <span className="bi-guide-line guide-three" />
          <span className="bi-guide-mark" />
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
      className={`brandidentity-reveal brandidentity-reveal--${direction} ${className}`}
      style={{ "--brandidentity-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const BrandIdentity = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="brandidentity-page">
      {/* HERO */}
      <section className="brandidentity-hero">
        <div className="brandidentity-hero-inner">
          <Reveal direction="left" className="brandidentity-hero-content">
            <span className="brandidentity-eyebrow">
              BRAND / IDENTITY STUDIO
            </span>

            <h1>
              Brands That
              <span> Stand.</span>
              <br />
              Identities That
              <span> Stay.</span>
            </h1>

            <p>
              We build purposeful brand identities that turn strategy into
              visual language. From logos and colour systems to typography,
              visual elements and brand guidelines, every detail is designed
              to make the brand clear, recognisable and memorable.
            </p>

            <div className="brandidentity-hero-meta">
              <span>Strategy</span>
              <i />
              <span>Identity</span>
              <i />
              <span>Design</span>
              <i />
              <span>Consistency</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="brandidentity-hero-visual"
          >
            <div className="brandidentity-stage">
              <div className="brandidentity-stage-label">
                <span>IDENTITY</span>
                <strong>01</strong>
              </div>

              <div className="brandidentity-grid" />

              <div className="brandidentity-mark">
                <span className="mark-ring ring-one" />
                <span className="mark-ring ring-two" />
                <span className="mark-core" />
                <span className="mark-cut cut-one" />
                <span className="mark-cut cut-two" />
              </div>

              <div className="brandidentity-card card-logo">
                <span>LOGO</span>
                <strong>MARK</strong>
              </div>

              <div className="brandidentity-card card-colour">
                <span>COLOUR</span>
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="brandidentity-card card-type">
                <span>TYPE</span>
                <strong>Aa</strong>
              </div>

              <div className="brandidentity-ruler">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
              </div>

              <div className="brandidentity-cursor">
                <span />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="brandidentity-section brandidentity-services"
        id="brandidentity-services"
      >
        <div className="brandidentity-container">
          <Reveal direction="up">
            <div className="brandidentity-section-heading">
              <span>WHAT WE BUILD</span>

              <h2>
                Every element has
                <strong> a role.</strong>
              </h2>

              <p>
                A strong identity is more than a logo. We combine strategy,
                design and visual systems to create a brand language that
                remains clear and consistent wherever it appears.
              </p>
            </div>
          </Reveal>

          <div className="brandidentity-services-list">
            {brandServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="brandidentity-service-wrap"
              >
                <article className="brandidentity-service-card">
                  <div className="brandidentity-service-number">
                    {service.number}
                  </div>

                  <BrandIdentityIcon type={service.icon} />

                  <div className="brandidentity-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="brandidentity-service-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="brandidentity-section brandidentity-process">
        <div className="brandidentity-container">
          <Reveal direction="left">
            <div className="brandidentity-process-intro">
              <span>THE BRAND PROCESS</span>

              <h2>
                From a clear
                <strong> idea </strong>
                to a complete identity.
              </h2>

              <p>
                A structured identity process helps transform business
                strategy into a visual system that is distinctive,
                understandable and consistent.
              </p>
            </div>
          </Reveal>

          <div className="brandidentity-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="brandidentity-process-item"
              >
                <div className="brandidentity-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="brandidentity-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="brandidentity-section brandidentity-benefits">
        <div className="brandidentity-container">
          <Reveal direction="right">
            <div className="brandidentity-section-heading">
              <span>WHY BRAND IDENTITY</span>

              <h2>
                Designed to make
                <strong> brands recognisable.</strong>
              </h2>

              <p>
                A thoughtful identity gives a business a consistent visual
                language, helping audiences understand who the brand is and
                remember what makes it different.
              </p>
            </div>
          </Reveal>

          <div className="brandidentity-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="brandidentity-benefit">
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
      <section className="brandidentity-section brandidentity-faq">
        <div className="brandidentity-container">
          <Reveal direction="up">
            <div className="brandidentity-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> identity.</strong>
              </h2>

              <p>
                A few practical details about creating, developing and
                maintaining a complete brand identity system.
              </p>
            </div>
          </Reveal>

          <div className="brandidentity-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`brandidentity-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="brandidentity-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="brandidentity-faq-answer">
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
      <section className="brandidentity-final">
        <Reveal direction="up">
          <div className="brandidentity-final-inner">
            <span>THE BRAND SYSTEM</span>

            <h2>
              Great identity
              <br />
              <strong>doesn't just look good.</strong>
            </h2>

            <p>
              It creates recognition, communicates personality and gives every
              brand touchpoint a consistent visual voice.
            </p>

            <div className="brandidentity-final-line">
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

export default BrandIdentity;