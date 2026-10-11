import React, { useEffect, useRef, useState } from "react";
import "./CorporateBrandFilms.css";

const filmServices = [
  {
    number: "01",
    title: "Corporate Films",
    description:
      "Purpose-driven films that communicate an organisation's vision, capabilities, culture, milestones and business story with a polished cinematic language.",
    icon: "corporate",
  },
  {
    number: "02",
    title: "Brand Films",
    description:
      "Emotion-led brand stories that transform brand values, identity and positioning into memorable visual narratives designed to create stronger audience connection.",
    icon: "brand",
  },
  {
    number: "03",
    title: "Product Films",
    description:
      "Cinematic product presentations that highlight design, functionality, technology and key differentiators through carefully planned visuals and storytelling.",
    icon: "product",
  },
  {
    number: "04",
    title: "Company Profile Films",
    description:
      "Structured visual profiles that present an organisation, its people, infrastructure, expertise and achievements in a clear and credible format.",
    icon: "profile",
  },
  {
    number: "05",
    title: "Culture & People Films",
    description:
      "Human-focused films that showcase workplace culture, leadership, teams and everyday experiences to give audiences a genuine view of the organisation.",
    icon: "culture",
  },
  {
    number: "06",
    title: "Campaign & Promotional Films",
    description:
      "High-impact promotional films created around campaign objectives, brand messaging and audience attention for digital, social and marketing communication.",
    icon: "campaign",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Direction",
    description:
      "We understand the organisation, audience, brand positioning and communication objective before defining the creative direction.",
  },
  {
    number: "02",
    title: "Concept & Story",
    description:
      "The core message is shaped into a narrative with scripting, visual references, story structure and a clear cinematic approach.",
  },
  {
    number: "03",
    title: "Production",
    description:
      "Cinematography, interviews, locations, people, products and supporting visuals are captured with attention to composition, lighting and movement.",
  },
  {
    number: "04",
    title: "Post-Production",
    description:
      "Editing, motion graphics, colour grading, sound design and finishing bring the complete film together into a consistent brand experience.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Build Brand Perception",
    description:
      "A well-crafted film helps communicate professionalism, values and positioning through a consistent visual language.",
  },
  {
    number: "02",
    title: "Humanise the Organisation",
    description:
      "People, leadership, culture and real experiences create a more authentic connection between organisations and their audiences.",
  },
  {
    number: "03",
    title: "Communicate with Impact",
    description:
      "Visual storytelling combines image, sound, movement and narrative to make important messages easier to understand and remember.",
  },
  {
    number: "04",
    title: "Create Reusable Content",
    description:
      "A corporate film can be structured into communication assets for websites, presentations, campaigns, social media and other brand touchpoints.",
  },
];

const faqs = [
  {
    question: "What is a corporate film?",
    answer:
      "A corporate film is a professionally produced visual story created to communicate an organisation's identity, vision, capabilities, culture, achievements, products or business message.",
  },
  {
    question: "What is the difference between a corporate film and a brand film?",
    answer:
      "Corporate films generally focus on the organisation, its people, capabilities and business story, while brand films are often more emotional and narrative-driven, focusing on brand values, identity and audience connection.",
  },
  {
    question: "Can interviews be included in a corporate film?",
    answer:
      "Yes. Leadership interviews, employee stories, customer perspectives and expert conversations can be combined with cinematic footage, motion graphics and supporting visuals.",
  },
  {
    question: "Can products and manufacturing processes be shown?",
    answer:
      "Yes. Product details, facilities, machinery, workflows, manufacturing processes and technology can all be incorporated into the visual narrative.",
  },
  {
    question: "Where can corporate and brand films be used?",
    answer:
      "Films can be used on company websites, presentations, exhibitions, investor communication, social media, digital campaigns, internal communication and other professional brand platforms.",
  },
];

const CorporateFilmIcon = ({ type }) => {
  return (
    <div className={`corporatefilm-icon corporatefilm-icon--${type}`}>
      {type === "corporate" && (
        <>
          <span className="film-building building-one" />
          <span className="film-building building-two" />
          <span className="film-building building-three" />
          <span className="film-camera-dot" />
        </>
      )}

      {type === "brand" && (
        <>
          <span className="film-brand-ring" />
          <span className="film-brand-core" />
          <span className="film-brand-line line-one" />
          <span className="film-brand-line line-two" />
        </>
      )}

      {type === "product" && (
        <>
          <span className="film-product-box" />
          <span className="film-product-top" />
          <span className="film-product-highlight" />
        </>
      )}

      {type === "profile" && (
        <>
          <span className="film-profile-head" />
          <span className="film-profile-body" />
          <span className="film-profile-line line-one" />
          <span className="film-profile-line line-two" />
        </>
      )}

      {type === "culture" && (
        <>
          <span className="film-culture-person person-one" />
          <span className="film-culture-person person-two" />
          <span className="film-culture-person person-three" />
          <span className="film-culture-arc" />
        </>
      )}

      {type === "campaign" && (
        <>
          <span className="film-campaign-play" />
          <span className="film-campaign-line line-one" />
          <span className="film-campaign-line line-two" />
          <span className="film-campaign-line line-three" />
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
      className={`corporatefilm-reveal corporatefilm-reveal--${direction} ${className}`}
      style={{ "--corporatefilm-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CorporateBrandFilms = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="corporatefilm-page">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="corporatefilm-hero">
        <div className="corporatefilm-hero-inner">
          <Reveal
            direction="left"
            className="corporatefilm-hero-content"
          >
            <span className="corporatefilm-eyebrow">
              CORPORATE & BRAND FILMS
            </span>

            <h1>
              Stories That
              <span> Represent.</span>
              <br />
              Brands That
              <span> Connect.</span>
            </h1>

            <p>
              We create cinematic corporate and brand films that turn
              organisations, people, products and ideas into meaningful
              visual stories. From concept and scripting to production,
              editing and finishing, every frame is built around the
              brand's identity and communication objective.
            </p>

            <div className="corporatefilm-hero-meta">
              <span>Strategy</span>
              <i />
              <span>Story</span>
              <i />
              <span>Production</span>
              <i />
              <span>Film</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="corporatefilm-hero-visual"
          >
            <div className="corporatefilm-stage">
              <div className="corporatefilm-stage-top">
                <span>BRAND FILM</span>
                <strong>REC 04</strong>
              </div>

              <div className="corporatefilm-viewfinder">
                <span className="viewfinder-corner corner-top-left" />
                <span className="viewfinder-corner corner-top-right" />
                <span className="viewfinder-corner corner-bottom-left" />
                <span className="viewfinder-corner corner-bottom-right" />

                <div className="corporatefilm-building-scene">
                  <span className="scene-building building-back" />
                  <span className="scene-building building-main" />
                  <span className="scene-window window-one" />
                  <span className="scene-window window-two" />
                  <span className="scene-window window-three" />

                  <div className="scene-person person-left">
                    <span className="person-head" />
                    <span className="person-body" />
                  </div>

                  <div className="scene-person person-right">
                    <span className="person-head" />
                    <span className="person-body" />
                  </div>

                  <div className="scene-product">
                    <span />
                  </div>
                </div>

                <div className="corporatefilm-focus-ring">
                  <span />
                </div>

                <div className="corporatefilm-record">
                  <span />
                  REC
                </div>

                <div className="corporatefilm-timecode">
                  00:24:18:07
                </div>
              </div>

              <div className="corporatefilm-camera-base">
                <span className="camera-control control-one" />
                <span className="camera-control control-two" />
                <span className="camera-control control-three" />
                <div className="camera-track">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======================================================
          SERVICES
      ====================================================== */}

      <section
        className="corporatefilm-section corporatefilm-services"
        id="corporatefilm-services"
      >
        <div className="corporatefilm-container">
          <Reveal direction="left">
            <div className="corporatefilm-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Films built around
                <strong> your story.</strong>
              </h2>

              <p>
                From corporate identity to brand emotion, every film is
                planned to communicate with clarity while maintaining a
                distinctive cinematic character.
              </p>
            </div>
          </Reveal>

          <div className="corporatefilm-services-list">
            {filmServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="corporatefilm-service-wrap"
              >
                <article className="corporatefilm-service-card">
                  <div className="corporatefilm-service-number">
                    {service.number}
                  </div>

                  <CorporateFilmIcon type={service.icon} />

                  <div className="corporatefilm-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="corporatefilm-service-arrow">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          PROCESS
      ====================================================== */}

      <section className="corporatefilm-section corporatefilm-process">
        <div className="corporatefilm-container">
          <Reveal direction="right">
            <div className="corporatefilm-process-intro">
              <span>THE FILMMAKING PROCESS</span>

              <h2>
                From the first
                <strong> idea </strong>
                to the final cut.
              </h2>

              <p>
                A focused production workflow brings strategy, storytelling,
                cinematography and post-production together to create a
                coherent brand film.
              </p>
            </div>
          </Reveal>

          <div className="corporatefilm-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="corporatefilm-process-item"
              >
                <div className="corporatefilm-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="corporatefilm-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          BENEFITS
      ====================================================== */}

      <section className="corporatefilm-section corporatefilm-benefits">
        <div className="corporatefilm-container">
          <Reveal direction="left">
            <div className="corporatefilm-section-heading">
              <span>WHY CORPORATE FILMS</span>

              <h2>
                More than a film.
                <strong> A brand experience.</strong>
              </h2>

              <p>
                Corporate and brand films combine visual storytelling,
                authentic people and cinematic communication to create
                stronger and more memorable brand experiences.
              </p>
            </div>
          </Reveal>

          <div className="corporatefilm-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
              >
                <article className="corporatefilm-benefit">
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

      {/* ======================================================
          FAQ
      ====================================================== */}

      <section className="corporatefilm-section corporatefilm-faq">
        <div className="corporatefilm-container">
          <Reveal direction="right">
            <div className="corporatefilm-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> film process.</strong>
              </h2>

              <p>
                A few practical details about corporate films, brand
                storytelling and production.
              </p>
            </div>
          </Reveal>

          <div className="corporatefilm-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`corporatefilm-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="corporatefilm-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="corporatefilm-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL STATEMENT
      ====================================================== */}

      <section className="corporatefilm-final">
        <Reveal direction="left">
          <div className="corporatefilm-final-inner">
            <span>THE FINAL CUT</span>

            <h2>
              Your brand has
              <br />
              <strong>a story worth seeing.</strong>
            </h2>

            <p>
              The strongest corporate films do more than show what a
              company does. They create a visual impression of who the
              brand is, what it believes and why it matters.
            </p>

            <div className="corporatefilm-final-line">
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

export default CorporateBrandFilms;