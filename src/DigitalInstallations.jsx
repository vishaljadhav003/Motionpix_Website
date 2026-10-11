import React, { useEffect, useRef, useState } from "react";
import "./DigitalInstallations.css";

const installationServices = [
  {
    number: "01",
    title: "Projection Mapping",
    description:
      "Transform walls, architectural surfaces, objects and structures with precisely aligned projected visuals. Content is designed around the shape, scale and character of the physical surface.",
    icon: "projection",
  },
  {
    number: "02",
    title: "LED & Screen Installations",
    description:
      "Create large visual environments using LED walls, panoramic screens and coordinated display surfaces that present high-impact visuals for events, brand spaces and public environments.",
    icon: "led",
  },
  {
    number: "03",
    title: "Architectural Media Installations",
    description:
      "Bring buildings, structural elements and interior surfaces to life through carefully planned visual compositions, mapped content and coordinated media playback.",
    icon: "architecture",
  },
  {
    number: "04",
    title: "Immersive Environments",
    description:
      "Develop room-scale visual experiences that surround visitors with coordinated imagery, environmental transitions and spatial storytelling across multiple surfaces.",
    icon: "immersive",
  },
  {
    number: "05",
    title: "Spatial Audio Integration",
    description:
      "Coordinate sound placement, audio transitions and visual timing to create a more coherent experience in which the acoustic environment supports the installation's narrative.",
    icon: "audio",
  },
  {
    number: "06",
    title: "Synchronized Media Systems",
    description:
      "Bring multiple projectors, LED surfaces, playback systems and content sequences into a coordinated installation with planned timing, alignment and system testing.",
    icon: "media",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Site & Technical Survey",
    description:
      "We assess the physical space, surface geometry, ambient lighting, projection distances, power requirements and installation constraints before defining the technical direction.",
  },
  {
    number: "02",
    title: "Concept & Content Design",
    description:
      "Visual storytelling, surface layouts, content proportions, transition timing and the creative direction are developed around the physical environment.",
  },
  {
    number: "03",
    title: "System Integration",
    description:
      "The selected display or projection equipment, playback hardware, audio components and installation structure are coordinated according to the approved design.",
  },
  {
    number: "04",
    title: "Calibration & Testing",
    description:
      "Visual alignment, image blending, content playback, colour consistency, audio timing and system reliability are checked before handover or the scheduled presentation.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Transform Physical Spaces",
    description:
      "Walls, rooms, objects and architectural surfaces can become active visual environments rather than remaining passive backgrounds.",
  },
  {
    number: "02",
    title: "Create Memorable Experiences",
    description:
      "Coordinated visuals, sound and spatial composition help audiences experience a story through the environment around them.",
  },
  {
    number: "03",
    title: "Connect Content with Architecture",
    description:
      "Visuals can be designed around the shape and structure of a venue, helping the installation feel intentional and connected to its surroundings.",
  },
  {
    number: "04",
    title: "Coordinate Complex Systems",
    description:
      "A planned technical workflow helps keep equipment placement, content playback, projection alignment and media timing working together.",
  },
];

const faqs = [
  {
    question: "What is a digital installation?",
    answer:
      "A digital installation is a physical environment enhanced with technologies such as projection mapping, LED surfaces, coordinated visual content, audio systems and media playback equipment. The exact configuration depends on the space and creative objective.",
  },
  {
    question: "What surfaces can projection mapping use?",
    answer:
      "Projection mapping can be designed for suitable walls, buildings, stage structures, sculptural objects and other surfaces. Surface geometry, projection distance, ambient light and projector placement affect the final result.",
  },
  {
    question: "Can multiple projectors or screens work together?",
    answer:
      "Yes. Multiple devices can be coordinated using compatible playback and synchronisation systems. The technical design should account for resolution, timing, signal routing, image alignment and the requirements of the installation.",
  },
  {
    question: "Can visuals and audio be synchronised?",
    answer:
      "Yes. Visual sequences and audio can be planned together so that sound cues, transitions and important moments align. The available synchronisation method depends on the playback equipment and system configuration.",
  },
  {
    question: "What is required before installation begins?",
    answer:
      "A site survey, surface measurements, lighting assessment, equipment and power planning, content specifications, mounting considerations and an installation schedule help determine the appropriate technical setup.",
  },
];

const installationConcepts = [
  {
    id: "projection",
    label: "Projection Mapping",
    category: "SURFACE-ALIGNED VISUALS",
    title: "Make the surface part of the story.",
    description:
      "Projected imagery is aligned to architectural shapes and physical details, allowing walls, structural features and objects to become part of the visual composition.",
    features: [
      "Surface alignment",
      "Mapped visual sequences",
      "Architectural detailing",
    ],
    screenTitle: "Architecture in motion",
    screenSubtitle: "Visual content shaped around physical structures.",
    status: "PROJECTION STUDY",
  },
  {
    id: "immersive",
    label: "Immersive Room",
    category: "ROOM-SCALE EXPERIENCE",
    title: "Step inside the visual environment.",
    description:
      "Connected wall and floor visuals create an enveloping environment in which scene composition and transitions extend across the surrounding space.",
    features: [
      "Multi-surface visuals",
      "Room-scale composition",
      "Coordinated transitions",
    ],
    screenTitle: "Enter another world",
    screenSubtitle: "A connected visual experience across surfaces.",
    status: "IMMERSIVE ENVIRONMENT",
  },
  {
    id: "led",
    label: "LED Environment",
    category: "SYNCHRONIZED SCREENS",
    title: "Bring multiple displays together.",
    description:
      "Coordinated LED surfaces create a continuous visual canvas for large-format content, structured scene changes and consistent presentation across screens.",
    features: [
      "Multi-screen coordination",
      "Large-format visuals",
      "Synchronized playback",
    ],
    screenTitle: "One visual canvas",
    screenSubtitle: "Coordinated content across display surfaces.",
    status: "LED SYSTEM STUDY",
  },
];

const DigitalInstallationsIcon = ({ type }) => (
  <div
    className={`digitalInstallations-icon digitalInstallations-icon--${type}`}
    aria-hidden="true"
  >
    {type === "projection" && (
      <>
        <span className="digitalInstallations-icon-projector" />
        <span className="digitalInstallations-icon-projector-lens" />
        <span className="digitalInstallations-icon-projector-beam" />
        <span className="digitalInstallations-icon-projector-target" />
      </>
    )}

    {type === "led" && (
      <>
        <span className="digitalInstallations-icon-led-wall" />
        <span className="digitalInstallations-icon-led-tile digitalInstallations-led-tile-one" />
        <span className="digitalInstallations-icon-led-tile digitalInstallations-led-tile-two" />
        <span className="digitalInstallations-icon-led-tile digitalInstallations-led-tile-three" />
        <span className="digitalInstallations-icon-led-tile digitalInstallations-led-tile-four" />
      </>
    )}

    {type === "architecture" && (
      <>
        <span className="digitalInstallations-icon-arch-outer" />
        <span className="digitalInstallations-icon-arch-inner" />
        <span className="digitalInstallations-icon-arch-light" />
        <span className="digitalInstallations-icon-arch-floor" />
      </>
    )}

    {type === "immersive" && (
      <>
        <span className="digitalInstallations-icon-immersive-room" />
        <span className="digitalInstallations-icon-immersive-wall" />
        <span className="digitalInstallations-icon-immersive-floor" />
        <span className="digitalInstallations-icon-immersive-glow" />
      </>
    )}

    {type === "audio" && (
      <>
        <span className="digitalInstallations-icon-audio-wave digitalInstallations-audio-wave-one" />
        <span className="digitalInstallations-icon-audio-wave digitalInstallations-audio-wave-two" />
        <span className="digitalInstallations-icon-audio-wave digitalInstallations-audio-wave-three" />
        <span className="digitalInstallations-icon-audio-core" />
      </>
    )}

    {type === "media" && (
      <>
        <span className="digitalInstallations-icon-media-screen digitalInstallations-media-screen-one" />
        <span className="digitalInstallations-icon-media-screen digitalInstallations-media-screen-two" />
        <span className="digitalInstallations-icon-media-screen digitalInstallations-media-screen-three" />
        <span className="digitalInstallations-icon-media-node" />
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
      element.classList.add("digitalInstallations-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("digitalInstallations-is-visible");
        } else {
          element.classList.remove("digitalInstallations-is-visible");
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
      className={`digitalInstallations-reveal digitalInstallations-reveal--${direction} ${className}`.trim()}
      style={{ "--digitalInstallations-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const DigitalInstallations = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeConcept, setActiveConcept] = useState("projection");

  const selectedConcept =
    installationConcepts.find((concept) => concept.id === activeConcept) ||
    installationConcepts[0];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="digitalInstallations-page">
      {/* HERO */}
      <section className="digitalInstallations-hero">
        <div className="digitalInstallations-hero-inner">
          <Reveal
            direction="left"
            className="digitalInstallations-hero-content"
          >
            <span className="digitalInstallations-eyebrow">
              DIGITAL / INSTALLATION STUDIO
            </span>

            <h1>
              Spaces That
              <span> Transform.</span>
              <br />
              Stories That
              <span> Surround.</span>
            </h1>

            <p>
              We create digital installations that connect physical spaces
              with carefully designed visual and audio experiences. From
              projection-mapped architecture to coordinated LED environments,
              every element is planned to work with the space, the technology
              and the story being presented.
            </p>

            <div
              className="digitalInstallations-hero-meta"
              aria-label="Digital installation stages"
            >
              <span>Space</span>
              <i />
              <span>Visuals</span>
              <i />
              <span>Technology</span>
              <i />
              <span>Experience</span>
            </div>

            <div className="digitalInstallations-hero-stats">
              <div>
                <strong>01</strong>
                <span>Spatial storytelling</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Connected surfaces</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Coordinated media</span>
              </div>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="digitalInstallations-hero-visual"
          >
            <div
              className="digitalInstallations-stage"
              role="img"
              aria-label="Illustration of an immersive digital installation with projected architectural surfaces, coordinated light panels and a visitor silhouette"
            >
              <div className="digitalInstallations-stage-topline">
                <span>SPATIAL MEDIA STUDY</span>
                <strong>DI / 026</strong>
              </div>

              <div className="digitalInstallations-stage-orbit digitalInstallations-orbit-one" />
              <div className="digitalInstallations-stage-orbit digitalInstallations-orbit-two" />

              <div className="digitalInstallations-stage-ceiling">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="digitalInstallations-stage-backwall">
                <div className="digitalInstallations-stage-visual digitalInstallations-visual-one">
                  <span />
                  <i />
                  <b />
                </div>

                <div className="digitalInstallations-stage-visual digitalInstallations-visual-two">
                  <span />
                  <i />
                  <b />
                </div>

                <div className="digitalInstallations-stage-visual digitalInstallations-visual-three">
                  <span />
                  <i />
                  <b />
                </div>

                <div className="digitalInstallations-stage-content">
                  <span>IMMERSIVE MEDIA</span>
                  <i />
                  <i />
                  <b />
                </div>
              </div>

              <div className="digitalInstallations-stage-sidewall">
                <span />
                <i />
                <b />
              </div>

              <div className="digitalInstallations-stage-floor">
                <span />
                <span />
                <span />
              </div>

              <div className="digitalInstallations-stage-projection digitalInstallations-projection-one" />
              <div className="digitalInstallations-stage-projection digitalInstallations-projection-two" />

              <div className="digitalInstallations-stage-visitor">
                <span className="digitalInstallations-visitor-head" />
                <span className="digitalInstallations-visitor-body" />
                <span className="digitalInstallations-visitor-leg digitalInstallations-visitor-leg-one" />
                <span className="digitalInstallations-visitor-leg digitalInstallations-visitor-leg-two" />
              </div>

              <div className="digitalInstallations-stage-marker digitalInstallations-stage-marker-one">
                <span />
                SURFACE MAPPING
              </div>

              <div className="digitalInstallations-stage-marker digitalInstallations-stage-marker-two">
                <span />
                MEDIA SYNC
              </div>

              <div className="digitalInstallations-stage-caption">
                <span className="digitalInstallations-stage-live-dot" />
                IMMERSIVE ENVIRONMENT
                <b>PREVIEW</b>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="digitalInstallations-section digitalInstallations-services"
        id="digitalInstallations-services"
      >
        <div className="digitalInstallations-container">
          <Reveal direction="up">
            <div className="digitalInstallations-section-heading">
              <span>WHAT WE CREATE</span>
              <h2>
                Where physical space meets
                <strong> digital imagination.</strong>
              </h2>
              <p>
                Every installation brings a physical environment and a digital
                layer together. Surface, content, equipment and timing are
                considered as connected parts of the experience.
              </p>
            </div>
          </Reveal>

          <div className="digitalInstallations-services-list">
            {installationServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 65}
                className="digitalInstallations-service-wrap"
              >
                <article className="digitalInstallations-service-card">
                  <div className="digitalInstallations-service-number">
                    {service.number}
                  </div>

                  <DigitalInstallationsIcon type={service.icon} />

                  <div className="digitalInstallations-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span
                    className="digitalInstallations-service-arrow"
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

      {/* INTERACTIVE INSTALLATION EXPLORER */}
      <section className="digitalInstallations-section digitalInstallations-explorer">
        <div className="digitalInstallations-container">
          <Reveal direction="right">
            <div className="digitalInstallations-explorer-intro">
              <span>EXPLORE THE INSTALLATION</span>
              <h2>
                Different environments.
                <strong> One spatial vision.</strong>
              </h2>
              <p>
                Select an installation concept to see how the visual layout,
                surface arrangement and creative priorities adapt to the
                environment.
              </p>
            </div>
          </Reveal>

          <div className="digitalInstallations-explorer-layout">
            <Reveal
              direction="left"
              className="digitalInstallations-explorer-controls"
            >
              <span className="digitalInstallations-control-label">
                SELECT AN INSTALLATION TYPE
              </span>

              <div
                className="digitalInstallations-concept-tabs"
                role="group"
                aria-label="Choose digital installation type"
              >
                {installationConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    type="button"
                    className={`digitalInstallations-concept-tab ${
                      activeConcept === concept.id
                        ? "digitalInstallations-is-active"
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
                className="digitalInstallations-concept-detail"
                aria-live="polite"
              >
                <span className="digitalInstallations-concept-category">
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
              className="digitalInstallations-preview-wrap"
            >
              <div
                className={`digitalInstallations-preview digitalInstallations-preview--${activeConcept}`}
                role="img"
                aria-label={`${selectedConcept.label} spatial installation preview`}
              >
                <div className="digitalInstallations-preview-topline">
                  <span>SPATIAL LAYOUT PREVIEW</span>
                  <b>{activeConcept.toUpperCase()} / 01</b>
                </div>

                <div className="digitalInstallations-preview-halo" />

                <div className="digitalInstallations-preview-room">
                  <div className="digitalInstallations-preview-ceiling">
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="digitalInstallations-preview-backwall">
                    <div className="digitalInstallations-preview-screen">
                      <span>{selectedConcept.status}</span>
                      <strong>{selectedConcept.screenTitle}</strong>
                      <i />
                      <i />
                      <b />
                      <div className="digitalInstallations-preview-art">
                        <span />
                        <i />
                        <b />
                      </div>
                    </div>

                    <div className="digitalInstallations-preview-panels">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="digitalInstallations-preview-sidewall">
                    <span />
                    <i />
                    <b />
                  </div>

                  <div className="digitalInstallations-preview-floor">
                    <i />
                    <i />
                    <i />
                    <span />
                  </div>

                  <div className="digitalInstallations-preview-visitor">
                    <span />
                    <i />
                    <b />
                  </div>
                </div>

                <div className="digitalInstallations-preview-callout digitalInstallations-callout-one">
                  <span />
                  SURFACE CONTENT
                </div>

                <div className="digitalInstallations-preview-callout digitalInstallations-callout-two">
                  <span />
                  SPATIAL ALIGNMENT
                </div>

                <div className="digitalInstallations-preview-legend">
                  <span>
                    <i className="digitalInstallations-legend-surface" />
                    Media surface
                  </span>
                  <span>
                    <i className="digitalInstallations-legend-light" />
                    Light / projection
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="digitalInstallations-section digitalInstallations-process">
        <div className="digitalInstallations-container">
          <Reveal direction="left">
            <div className="digitalInstallations-process-intro">
              <span>THE INSTALLATION WORKFLOW</span>
              <h2>
                From spatial concept
                <strong> to a coordinated environment.</strong>
              </h2>
              <p>
                A structured production process connects creative direction,
                site conditions, system setup and calibration so that the
                physical and digital elements work together.
              </p>
            </div>
          </Reveal>

          <div className="digitalInstallations-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
                className="digitalInstallations-process-item"
              >
                <div className="digitalInstallations-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="digitalInstallations-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="digitalInstallations-section digitalInstallations-benefits">
        <div className="digitalInstallations-container">
          <Reveal direction="right">
            <div className="digitalInstallations-section-heading">
              <span>WHY DIGITAL INSTALLATIONS</span>
              <h2>
                More than a display.
                <strong> A transformed environment.</strong>
              </h2>
              <p>
                Digital installations bring together space, technology and
                content to create a coordinated experience that can reshape
                the way an audience sees and experiences a physical location.
              </p>
            </div>
          </Reveal>

          <div className="digitalInstallations-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 80}
              >
                <article className="digitalInstallations-benefit">
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
      <section className="digitalInstallations-section digitalInstallations-faq">
        <div className="digitalInstallations-container">
          <Reveal direction="up">
            <div className="digitalInstallations-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Understanding
                <strong> digital installations.</strong>
              </h2>
              <p>
                Practical information about physical surfaces, equipment,
                synchronisation and installation planning.
              </p>
            </div>
          </Reveal>

          <div className="digitalInstallations-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `digital-installations-faq-answer-${index}`;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 55}
                >
                  <div
                    className={`digitalInstallations-faq-item ${
                      isActive ? "digitalInstallations-is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="digitalInstallations-faq-question"
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
                      className="digitalInstallations-faq-answer"
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
      <section className="digitalInstallations-final">
        <Reveal direction="up">
          <div className="digitalInstallations-final-inner">
            <span>BEYOND THE PHYSICAL SURFACE</span>

            <h2>
              Give space
              <br />
              <strong>a new dimension.</strong>
            </h2>

            <p>
              When architecture, visual content and technology work together,
              a physical environment becomes an experience that surrounds the
              audience and gives the story a place to live.
            </p>

            <div
              className="digitalInstallations-final-dots"
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

export default DigitalInstallations;