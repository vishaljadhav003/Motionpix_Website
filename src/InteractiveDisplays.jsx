import React, { useEffect, useRef, useState } from "react";
import "./InteractiveDisplays.css";

const displayServices = [
  {
    number: "01",
    title: "Interactive Touch Kiosks",
    description:
      "Self-service touch interfaces help visitors explore information, browse services, discover products and navigate digital experiences through clear, responsive on-screen controls.",
    icon: "kiosk",
  },
  {
    number: "02",
    title: "Interactive Video Walls",
    description:
      "Large-format interactive walls combine visual storytelling, touch interaction and dynamic content to create engaging experiences for showrooms, exhibitions and public spaces.",
    icon: "wall",
  },
  {
    number: "03",
    title: "Product Configurators",
    description:
      "Interactive product interfaces let users explore available models, colours, features and configurations through visual selections and structured product information.",
    icon: "product",
  },
  {
    number: "04",
    title: "Digital Wayfinding",
    description:
      "Interactive maps, location search and guided directions help visitors find departments, venues, facilities and destinations with less confusion.",
    icon: "wayfinding",
  },
  {
    number: "05",
    title: "Gamified Brand Experiences",
    description:
      "Touch-based quizzes, challenges, interactive storytelling and reward-led experiences encourage active participation while presenting brand messages in an engaging format.",
    icon: "gamified",
  },
  {
    number: "06",
    title: "Interactive Digital Signage",
    description:
      "Dynamic display interfaces combine useful information, media and selectable content so audiences can move beyond passive viewing and explore what matters to them.",
    icon: "signage",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Audience & Experience Planning",
    description:
      "We identify the audience, location, use case and interaction goals before defining how people will move through the digital experience.",
  },
  {
    number: "02",
    title: "Interface & Interaction Design",
    description:
      "Screen layouts, navigation, touch targets, visual hierarchy and interaction states are planned to make the experience intuitive and accessible.",
  },
  {
    number: "03",
    title: "Development & Integration",
    description:
      "The interface and its interaction logic are developed and connected with the required content, product information or supporting systems.",
  },
  {
    number: "04",
    title: "Testing & Deployment",
    description:
      "Touch behaviour, screen layouts, content loading and interaction flows are reviewed across the intended display sizes and operating environment.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Turn Viewers into Participants",
    description:
      "Touch-driven content gives people an active role in exploring information instead of relying only on passive screen viewing.",
  },
  {
    number: "02",
    title: "Make Information Easier to Explore",
    description:
      "Well-organised menus, visual choices and guided interactions help visitors find relevant details at their own pace.",
  },
  {
    number: "03",
    title: "Create Personalised Journeys",
    description:
      "Selectable options allow visitors to follow routes, compare products or explore content that matches their specific interests.",
  },
  {
    number: "04",
    title: "Adapt to Different Environments",
    description:
      "Interactive experiences can be designed for showrooms, exhibitions, retail spaces, corporate environments and visitor centres.",
  },
];

const faqs = [
  {
    question: "What are interactive displays used for?",
    answer:
      "Interactive displays can be used for product exploration, self-service kiosks, digital wayfinding, exhibition experiences, retail information, interactive presentations and touchscreen brand experiences.",
  },
  {
    question: "Can an interactive display work on a large touchscreen?",
    answer:
      "Yes. Interfaces can be adapted for large touchscreens and video walls. Screen dimensions, touch technology, viewing distance and the intended environment should be considered during design and testing.",
  },
  {
    question: "Can users explore different product options?",
    answer:
      "Yes. A product configurator can present selectable colours, models, features, specifications and other options, depending on the information and functionality available for the product.",
  },
  {
    question: "Can interactive displays be connected to existing systems?",
    answer:
      "They can be integrated with compatible content sources, product databases, APIs and other systems when the technical requirements and access permissions support the integration.",
  },
  {
    question: "How is the display interface tested?",
    answer:
      "Testing can cover touch accuracy, button sizing, screen resolution, navigation, content loading, accessibility, error states and the device or operating system used at the installation.",
  },
];

const displayConcepts = [
  {
    id: "kiosk",
    label: "Touch Kiosk",
    category: "SELF-SERVICE INTERFACE",
    title: "Information, one touch away.",
    description:
      "A focused vertical interface helps visitors browse categories, select content and access information without navigating a complicated menu.",
    features: ["Guided navigation", "Large touch targets", "Self-service discovery"],
    screenTitle: "Explore the experience",
    screenSubtitle: "Choose what you would like to discover.",
    screenItems: ["Products", "Information", "Locations"],
    status: "KIOSK INTERFACE",
  },
  {
    id: "wall",
    label: "Touch Wall",
    category: "LARGE-FORMAT INTERACTION",
    title: "A bigger canvas for discovery.",
    description:
      "A broad interactive canvas brings visual content, selectable topics and multiple information zones together in a shared experience.",
    features: ["Large interactive canvas", "Multi-zone content", "Visual storytelling"],
    screenTitle: "Discover more together",
    screenSubtitle: "Explore featured topics across a larger canvas.",
    screenItems: ["Discover", "Explore", "Learn"],
    status: "INTERACTIVE WALL",
  },
  {
    id: "configurator",
    label: "Product Configurator",
    category: "PRODUCT EXPLORATION",
    title: "Explore every available option.",
    description:
      "A visual product interface helps visitors compare choices, select features and understand product variations through a guided flow.",
    features: ["Selectable options", "Feature comparison", "Product details"],
    screenTitle: "Build your selection",
    screenSubtitle: "Choose the features you want to explore.",
    screenItems: ["Model", "Finish", "Features"],
    status: "PRODUCT CONFIGURATOR",
  },
];

const InteractiveDisplaysIcon = ({ type }) => (
  <div
    className={`interactiveDisplays-icon interactiveDisplays-icon--${type}`}
    aria-hidden="true"
  >
    {type === "kiosk" && (
      <>
        <span className="interactiveDisplays-icon-screen" />
        <span className="interactiveDisplays-icon-screen-line interactiveDisplays-icon-line-one" />
        <span className="interactiveDisplays-icon-screen-line interactiveDisplays-icon-line-two" />
        <span className="interactiveDisplays-icon-touch" />
        <span className="interactiveDisplays-icon-stand" />
        <span className="interactiveDisplays-icon-base" />
      </>
    )}

    {type === "wall" && (
      <>
        <span className="interactiveDisplays-icon-wall" />
        <span className="interactiveDisplays-icon-wall-tile interactiveDisplays-wall-tile-one" />
        <span className="interactiveDisplays-icon-wall-tile interactiveDisplays-wall-tile-two" />
        <span className="interactiveDisplays-icon-wall-tile interactiveDisplays-wall-tile-three" />
        <span className="interactiveDisplays-icon-wall-tile interactiveDisplays-wall-tile-four" />
        <span className="interactiveDisplays-icon-wall-glow" />
      </>
    )}

    {type === "product" && (
      <>
        <span className="interactiveDisplays-icon-product-box" />
        <span className="interactiveDisplays-icon-product-top" />
        <span className="interactiveDisplays-icon-product-side" />
        <span className="interactiveDisplays-icon-product-dot" />
      </>
    )}

    {type === "wayfinding" && (
      <>
        <span className="interactiveDisplays-icon-map" />
        <span className="interactiveDisplays-icon-map-route" />
        <span className="interactiveDisplays-icon-map-pin" />
        <span className="interactiveDisplays-icon-map-dot" />
      </>
    )}

    {type === "gamified" && (
      <>
        <span className="interactiveDisplays-icon-game-ring" />
        <span className="interactiveDisplays-icon-game-target" />
        <span className="interactiveDisplays-icon-game-dot" />
        <span className="interactiveDisplays-icon-game-spark" />
      </>
    )}

    {type === "signage" && (
      <>
        <span className="interactiveDisplays-icon-signage-screen" />
        <span className="interactiveDisplays-icon-signage-line interactiveDisplays-signage-line-one" />
        <span className="interactiveDisplays-icon-signage-line interactiveDisplays-signage-line-two" />
        <span className="interactiveDisplays-icon-signage-line interactiveDisplays-signage-line-three" />
        <span className="interactiveDisplays-icon-signage-stand" />
      </>
    )}
  </div>
);

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

    if (!("IntersectionObserver" in window)) {
      element.classList.add("interactiveDisplays-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("interactiveDisplays-is-visible");
        } else {
          element.classList.remove("interactiveDisplays-is-visible");
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`interactiveDisplays-reveal interactiveDisplays-reveal--${direction} ${className}`.trim()}
      style={{ "--interactiveDisplays-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const InteractiveDisplays = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeConcept, setActiveConcept] = useState("kiosk");

  const selectedConcept =
    displayConcepts.find((concept) => concept.id === activeConcept) ||
    displayConcepts[0];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="interactiveDisplays-page">
      {/* HERO */}
      <section className="interactiveDisplays-hero">
        <div className="interactiveDisplays-hero-inner">
          <Reveal
            direction="left"
            className="interactiveDisplays-hero-content"
          >
            <span className="interactiveDisplays-eyebrow">
              INTERACTIVE / DISPLAY STUDIO
            </span>

            <h1>
              Screens That
              <span> Respond.</span>
              <br />
              Experiences That
              <span> Engage.</span>
            </h1>

            <p>
              We design interactive display experiences that make information
              easier to explore and products easier to understand. By combining
              purposeful interfaces, touch interactions and visual storytelling,
              we turn digital screens into useful experiences for real people.
            </p>

            <div
              className="interactiveDisplays-hero-meta"
              aria-label="Interactive display design stages"
            >
              <span>Interface</span>
              <i />
              <span>Interaction</span>
              <i />
              <span>Content</span>
              <i />
              <span>Experience</span>
            </div>

            <div className="interactiveDisplays-hero-stats">
              <div>
                <strong>01</strong>
                <span>Intuitive navigation</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Touch-led discovery</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Purposeful content</span>
              </div>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="interactiveDisplays-hero-visual"
          >
            <div
              className="interactiveDisplays-stage"
              role="img"
              aria-label="Illustration of an interactive touchscreen display with selectable content cards"
            >
              <div className="interactiveDisplays-stage-topline">
                <span>INTERACTION STUDY</span>
                <strong>ID / 026</strong>
              </div>

              <div className="interactiveDisplays-stage-orbit interactiveDisplays-orbit-one" />
              <div className="interactiveDisplays-stage-orbit interactiveDisplays-orbit-two" />

              <div className="interactiveDisplays-stage-screen">
                <div className="interactiveDisplays-stage-screen-top">
                  <span className="interactiveDisplays-stage-brand">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="interactiveDisplays-stage-menu">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>

                <div className="interactiveDisplays-stage-screen-heading">
                  <span>DISCOVER SOMETHING NEW</span>
                  <strong>Explore your world.</strong>
                  <i />
                </div>

                <div className="interactiveDisplays-stage-screen-cards">
                  <div className="interactiveDisplays-stage-card interactiveDisplays-stage-card-one">
                    <span className="interactiveDisplays-card-art interactiveDisplays-card-art-one">
                      <i />
                      <b />
                    </span>
                    <i className="interactiveDisplays-card-line" />
                    <i className="interactiveDisplays-card-line interactiveDisplays-card-line-short" />
                  </div>

                  <div className="interactiveDisplays-stage-card interactiveDisplays-stage-card-two">
                    <span className="interactiveDisplays-card-art interactiveDisplays-card-art-two">
                      <i />
                      <b />
                    </span>
                    <i className="interactiveDisplays-card-line" />
                    <i className="interactiveDisplays-card-line interactiveDisplays-card-line-short" />
                  </div>

                  <div className="interactiveDisplays-stage-card interactiveDisplays-stage-card-three">
                    <span className="interactiveDisplays-card-art interactiveDisplays-card-art-three">
                      <i />
                      <b />
                    </span>
                    <i className="interactiveDisplays-card-line" />
                    <i className="interactiveDisplays-card-line interactiveDisplays-card-line-short" />
                  </div>
                </div>

                <div className="interactiveDisplays-stage-screen-footer">
                  <i />
                  <span>SELECT TO EXPLORE</span>
                  <b>↗</b>
                </div>

                <div className="interactiveDisplays-stage-touch">
                  <span />
                </div>
              </div>

              <div className="interactiveDisplays-stage-screen-side" />

              <div className="interactiveDisplays-stage-stand">
                <span />
              </div>

              <div className="interactiveDisplays-stage-base" />

              <div className="interactiveDisplays-stage-chip interactiveDisplays-stage-chip-one">
                <span />
                TOUCH TO EXPLORE
              </div>

              <div className="interactiveDisplays-stage-chip interactiveDisplays-stage-chip-two">
                <span>+</span>
                LIVE CONTENT
              </div>

              <div className="interactiveDisplays-stage-caption">
                <span className="interactiveDisplays-stage-live-dot" />
                INTERACTIVE DISPLAY
                <b>PREVIEW</b>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="interactiveDisplays-section interactiveDisplays-services"
        id="interactiveDisplays-services"
      >
        <div className="interactiveDisplays-container">
          <Reveal direction="up">
            <div className="interactiveDisplays-section-heading">
              <span>WHAT WE CREATE</span>
              <h2>
                Every touch opens
                <strong> a possibility.</strong>
              </h2>
              <p>
                From self-service kiosks to large interactive surfaces, we
                bring content, navigation and meaningful interactions together
                in one coherent digital experience.
              </p>
            </div>
          </Reveal>

          <div className="interactiveDisplays-services-list">
            {displayServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 65}
                className="interactiveDisplays-service-wrap"
              >
                <article className="interactiveDisplays-service-card">
                  <div className="interactiveDisplays-service-number">
                    {service.number}
                  </div>

                  <InteractiveDisplaysIcon type={service.icon} />

                  <div className="interactiveDisplays-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span
                    className="interactiveDisplays-service-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DISPLAY EXPLORER */}
      <section className="interactiveDisplays-section interactiveDisplays-lab">
        <div className="interactiveDisplays-container">
          <Reveal direction="right">
            <div className="interactiveDisplays-lab-intro">
              <span>EXPLORE THE INTERACTION</span>
              <h2>
                Different screens.
                <strong> One connected experience.</strong>
              </h2>
              <p>
                Select a display type to preview how its layout, content and
                interaction priorities can change according to the environment
                and the people using it.
              </p>
            </div>
          </Reveal>

          <div className="interactiveDisplays-lab-layout">
            <Reveal
              direction="left"
              className="interactiveDisplays-lab-controls"
            >
              <span className="interactiveDisplays-control-label">
                SELECT A DISPLAY TYPE
              </span>

              <div
                className="interactiveDisplays-concept-tabs"
                role="group"
                aria-label="Choose an interactive display type"
              >
                {displayConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    type="button"
                    className={`interactiveDisplays-concept-tab ${
                      activeConcept === concept.id
                        ? "interactiveDisplays-is-active"
                        : ""
                    }`}
                    onClick={() => setActiveConcept(concept.id)}
                    aria-pressed={activeConcept === concept.id}
                  >
                    <span>{concept.label}</span>
                    <b aria-hidden="true">
                      {activeConcept === concept.id ? "−" : "+"}
                    </b>
                  </button>
                ))}
              </div>

              <div
                className="interactiveDisplays-concept-detail"
                aria-live="polite"
              >
                <span className="interactiveDisplays-concept-category">
                  {selectedConcept.category}
                </span>

                <h3>{selectedConcept.title}</h3>

                <p>{selectedConcept.description}</p>

                <ul>
                  {selectedConcept.features.map((feature) => (
                    <li key={feature}>
                      <span />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal
              direction="right"
              delay={100}
              className="interactiveDisplays-preview-wrap"
            >
              <div
                className={`interactiveDisplays-preview interactiveDisplays-preview--${activeConcept}`}
                role="img"
                aria-label={`${selectedConcept.label} interface preview`}
              >
                <div className="interactiveDisplays-preview-topline">
                  <span>INTERACTION PREVIEW</span>
                  <b>MODE / {activeConcept.toUpperCase()}</b>
                </div>

                <div className="interactiveDisplays-preview-halo" />

                <div className="interactiveDisplays-demo-device">
                  <div className="interactiveDisplays-demo-camera" />

                  <div className="interactiveDisplays-demo-screen">
                    <div className="interactiveDisplays-demo-header">
                      <span className="interactiveDisplays-demo-brand">
                        <i />
                        <b>EXPLORE</b>
                      </span>
                      <span className="interactiveDisplays-demo-menu">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>

                    <div className="interactiveDisplays-demo-copy">
                      <span>{selectedConcept.status}</span>
                      <h3>{selectedConcept.screenTitle}</h3>
                      <p>{selectedConcept.screenSubtitle}</p>
                    </div>

                    <div className="interactiveDisplays-demo-options">
                      {selectedConcept.screenItems.map((item, index) => (
                        <div
                          key={item}
                          className={`interactiveDisplays-demo-option interactiveDisplays-demo-option-${index + 1}`}
                        >
                          <span className="interactiveDisplays-demo-option-art">
                            <i />
                            <b />
                          </span>
                          <strong>{item}</strong>
                          <small>Explore ↗</small>
                        </div>
                      ))}
                    </div>

                    <div className="interactiveDisplays-demo-progress">
                      <span />
                      <i />
                      <i />
                      <i />
                    </div>

                    <div className="interactiveDisplays-demo-cursor">
                      <span />
                    </div>
                  </div>
                </div>

                <div className="interactiveDisplays-demo-device-side" />
                <div className="interactiveDisplays-demo-device-stand" />
                <div className="interactiveDisplays-demo-device-base" />

                <div className="interactiveDisplays-demo-info interactiveDisplays-demo-info-one">
                  <span className="interactiveDisplays-info-dot" />
                  Responsive UI
                </div>

                <div className="interactiveDisplays-demo-info interactiveDisplays-demo-info-two">
                  <span className="interactiveDisplays-info-dot" />
                  Touch feedback
                </div>

                <div className="interactiveDisplays-preview-legend">
                  <span>
                    <i />
                    Content area
                  </span>
                  <span>
                    <i />
                    Interaction point
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="interactiveDisplays-section interactiveDisplays-process">
        <div className="interactiveDisplays-container">
          <Reveal direction="left">
            <div className="interactiveDisplays-process-intro">
              <span>THE INTERACTION WORKFLOW</span>
              <h2>
                From the first tap
                <strong> to a complete experience.</strong>
              </h2>
              <p>
                A considered workflow connects the user journey, interface
                design, interaction logic and device testing into one reliable
                display experience.
              </p>
            </div>
          </Reveal>

          <div className="interactiveDisplays-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
                className="interactiveDisplays-process-item"
              >
                <div className="interactiveDisplays-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="interactiveDisplays-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="interactiveDisplays-section interactiveDisplays-benefits">
        <div className="interactiveDisplays-container">
          <Reveal direction="right">
            <div className="interactiveDisplays-section-heading">
              <span>WHY INTERACTIVE DISPLAYS</span>
              <h2>
                Don't just show information.
                <strong> Invite discovery.</strong>
              </h2>
              <p>
                Useful interactive experiences give visitors control over how
                they navigate information, learn about products and engage
                with a brand or environment.
              </p>
            </div>
          </Reveal>

          <div className="interactiveDisplays-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 80}
              >
                <article className="interactiveDisplays-benefit">
                  <span>{benefit.number}</span>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <i aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="interactiveDisplays-section interactiveDisplays-faq">
        <div className="interactiveDisplays-container">
          <Reveal direction="up">
            <div className="interactiveDisplays-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Understanding
                <strong> interactive displays.</strong>
              </h2>
              <p>
                Practical details about display types, user interaction,
                integrations and deployment.
              </p>
            </div>
          </Reveal>

          <div className="interactiveDisplays-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `interactive-displays-faq-answer-${index}`;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 55}
                >
                  <div
                    className={`interactiveDisplays-faq-item ${
                      isActive ? "interactiveDisplays-is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="interactiveDisplays-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>

                    <div
                      className="interactiveDisplays-faq-answer"
                      id={answerId}
                      aria-hidden={!isActive}
                    >
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
      <section className="interactiveDisplays-final">
        <Reveal direction="up">
          <div className="interactiveDisplays-final-inner">
            <span>THE EXPERIENCE BEYOND THE SCREEN</span>

            <h2>
              Every touch
              <br />
              <strong>should mean something.</strong>
            </h2>

            <p>
              When intuitive interaction meets purposeful content, a digital
              display becomes a place to explore, understand and connect.
            </p>

            <div
              className="interactiveDisplays-final-dots"
              aria-hidden="true"
            >
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

export default InteractiveDisplays;