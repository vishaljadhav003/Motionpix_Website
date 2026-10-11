import React, { useEffect, useRef, useState } from "react";
import "./ARVRMRXR.css";

const xrExperiences = [
  {
    number: "01",
    title: "Augmented Reality (AR)",
    description:
      "Overlay digital information, 3D objects or visual instructions onto the user's view of the real world. Useful for product previews, guided maintenance, packaging experiences and contextual information.",
    tag: "DIGITAL + REAL WORLD",
    icon: "ar",
  },
  {
    number: "02",
    title: "Virtual Reality (VR)",
    description:
      "Create a computer-generated environment for an immersive experience. VR can support virtual walkthroughs, safety practice, equipment familiarisation, architectural visualisation and interactive storytelling.",
    tag: "IMMERSIVE WORLDS",
    icon: "vr",
  },
  {
    number: "03",
    title: "Mixed Reality (MR)",
    description:
      "Blend digital content with the physical environment so spatially aware objects can appear anchored to real surfaces and interact with the user's surroundings on supported devices.",
    tag: "SPATIAL INTERACTION",
    icon: "mr",
  },
  {
    number: "04",
    title: "Extended Reality (XR)",
    description:
      "Use XR as an umbrella for immersive technologies including AR, VR and MR. The experience is planned around the audience, device capability, interaction model and business objective.",
    tag: "CONNECTED REALITIES",
    icon: "xr",
  },
  {
    number: "05",
    title: "Interactive 3D Product Experiences",
    description:
      "Let users inspect product models, explore features and understand complex designs through responsive 3D presentation, hotspots, animations and guided product journeys.",
    tag: "PRODUCT EXPLORATION",
    icon: "product",
  },
  {
    number: "06",
    title: "WebAR & Web-Based 3D",
    description:
      "Make lightweight interactive product and spatial experiences accessible through compatible web browsers, with capabilities determined by device, browser and chosen technology.",
    tag: "BROWSER-BASED ACCESS",
    icon: "web",
  },
];

const realityModes = {
  AR: {
    name: "Augmented Reality",
    short: "Add useful digital layers to the real world.",
    definition:
      "AR adds digital elements such as labels, animations, 3D product models or instructions to a view of the physical environment. The real world remains visible while digital content adds context.",
    examples: ["Try-before-you-buy product previews", "Interactive packaging and campaigns", "Visual instructions and guided steps"],
    startingPoint: "Start with a focused 3D object, a clear interaction and a compatible phone or tablet experience.",
    advanced: "Progress to tracking, occlusion, persistent placement or spatial interactions where supported by the selected platform.",
  },
  VR: {
    name: "Virtual Reality",
    short: "Step into a designed digital environment.",
    definition:
      "VR places the user inside a digital scene, usually through a headset. Users can look around and, depending on the hardware and design, move through spaces, handle virtual objects and interact with simulated activities.",
    examples: ["Virtual tours and digital showrooms", "Immersive learning and scenario practice", "Architectural and industrial walkthroughs"],
    startingPoint: "Begin with a navigable scene, comfortable movement, clear orientation and a small number of interactions.",
    advanced: "Expand into multi-step simulations, spatial interfaces, collaborative sessions and device-specific interaction systems.",
  },
  MR: {
    name: "Mixed Reality",
    short: "Make digital objects feel connected to physical space.",
    definition:
      "MR combines digital content with awareness of the user's physical surroundings. On supported devices, digital objects may be anchored to surfaces, respond to spatial understanding and coexist with real objects.",
    examples: ["Spatial product demonstrations", "Contextual equipment guidance", "Interactive design and spatial collaboration"],
    startingPoint: "Start by validating the target device, spatial tracking capabilities and the real-world environment in which the experience will run.",
    advanced: "Build spatially anchored workflows, environment-aware interactions and multi-object experiences where hardware and platform capabilities allow.",
  },
  XR: {
    name: "Extended Reality",
    short: "Choose the right immersive approach for the goal.",
    definition:
      "XR is a broad term covering AR, VR and MR experiences. It describes the wider spectrum of digitally enhanced and immersive experiences rather than one single device or feature set.",
    examples: ["Connected product and training experiences", "A mix of browser, mobile and headset delivery", "A consistent spatial experience across use cases"],
    startingPoint: "Define the audience, use case, environment, budget and supported devices before selecting the experience type.",
    advanced: "Plan an ecosystem of experiences, shared 3D assets, analytics and integrations across compatible platforms.",
  },
};

const buildJourney = [
  {
    number: "01",
    level: "FOUNDATION",
    title: "Understand the Reality Spectrum",
    description:
      "Define AR, VR, MR and XR, learn the role of 3D assets and interaction design, and identify the audience, device and problem the experience should solve.",
    skills: "Concepts · Use cases · Device planning",
  },
  {
    number: "02",
    level: "INTERACTIVE PROTOTYPE",
    title: "Create the First Experience",
    description:
      "Develop a small product viewer, a simple AR concept or a navigable VR scene. Focus on clarity, usability, performance and a single meaningful interaction.",
    skills: "3D assets · UI/UX · Basic interactions",
  },
  {
    number: "03",
    level: "SPATIAL EXPERIENCE",
    title: "Add Context & Interaction",
    description:
      "Introduce device-aware interactions, spatial placement, scene logic, hotspots, animation and more complete user journeys based on target-platform support.",
    skills: "Tracking · Spatial UX · Interaction logic",
  },
  {
    number: "04",
    level: "ADVANCED DELIVERY",
    title: "Optimise, Test & Integrate",
    description:
      "Test on target devices, improve runtime performance, handle accessibility and comfort, and plan integrations, deployment, analytics and maintainability where needed.",
    skills: "Optimisation · QA · Deployment planning",
  },
];

const productionSteps = [
  {
    number: "01",
    title: "Discover & Define",
    description:
      "Clarify the business objective, audience, operating environment, device availability and the problem the experience should solve.",
  },
  {
    number: "02",
    title: "Design the Experience",
    description:
      "Map user journeys, interactions, spatial layout, visual direction and technical feasibility before committing to the full build.",
  },
  {
    number: "03",
    title: "Build & Validate",
    description:
      "Create and integrate 3D content, UI, interactions and device-specific behaviour, then test usability and performance on the intended platform.",
  },
  {
    number: "04",
    title: "Deploy & Improve",
    description:
      "Prepare the experience for its intended channel, document requirements and refine it using testing, feedback and observed usage where available.",
  },
];

const xrBenefits = [
  {
    number: "01",
    title: "Make Products Easier to Explore",
    description:
      "Interactive 3D and AR views can help audiences inspect details, understand scale and visualise a product in context.",
  },
  {
    number: "02",
    title: "Explain Complex Spaces & Systems",
    description:
      "Immersive environments can present spatial layouts, equipment and processes in ways that are difficult to convey through static visuals alone.",
  },
  {
    number: "03",
    title: "Support Experiential Learning",
    description:
      "Designed simulations can provide guided practice and repeatable scenarios, subject to the capabilities of the chosen device and platform.",
  },
  {
    number: "04",
    title: "Plan for the Right Devices",
    description:
      "A clear device and delivery strategy helps balance immersion, accessibility, performance, development effort and the needs of the audience.",
  },
];

const faqs = [
  {
    question: "What is the difference between AR, VR, MR and XR?",
    answer:
      "AR adds digital content to a view of the real world. VR places a user inside a virtual environment. MR connects digital content more closely to the physical environment using spatial capabilities available on supported devices. XR is the broader umbrella term that includes AR, VR and MR.",
  },
  {
    question: "Do AR and VR experiences always require a headset?",
    answer:
      "No. Many AR experiences can use compatible phones or tablets. VR typically uses a headset for immersion, while some 3D experiences can be previewed on ordinary screens. The suitable device depends on the intended experience and its technical requirements.",
  },
  {
    question: "Can an AR experience run on every mobile phone?",
    answer:
      "Not necessarily. Availability depends on operating-system version, browser or app support, hardware capabilities and the AR technology selected. Device compatibility should be checked during planning and testing.",
  },
  {
    question: "Can MotionPix create experiences from beginner level to advanced?",
    answer:
      "An experience can be scoped from a simple 3D viewer or guided demo through to more involved spatial interactions and immersive simulations. The final scope depends on the brief, devices, platform support, content and integrations required.",
  },
  {
    question: "Where can AR/VR/MR/XR be used?",
    answer:
      "Potential use cases include product visualisation, marketing, virtual tours, design reviews, training, education, architecture, manufacturing and interactive demonstrations. The best fit depends on the user's needs and the environment in which the experience will be used.",
  },
];

const iconContent = {
  ar: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 16 12 8l4 8M9.5 13h5" />
      <path d="M17 4V2M7 4V2" />
    </>
  ),
  vr: (
    <>
      <path d="M3 9.5A3.5 3.5 0 0 1 6.5 6h11A3.5 3.5 0 0 1 21 9.5v4a3 3 0 0 1-3 3h-2l-2-2h-4l-2 2H6a3 3 0 0 1-3-3v-4Z" />
      <circle cx="8" cy="11" r="1.5" />
      <circle cx="16" cy="11" r="1.5" />
    </>
  ),
  mr: (
    <>
      <path d="M12 3 21 8v8l-9 5-9-5V8l9-5Z" />
      <path d="M12 12 21 8M12 12 3 8M12 12v9" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  xr: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18M5.5 6.5h13M5.5 17.5h13" />
    </>
  ),
  product: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      <path d="M5 6h14" />
    </>
  ),
};

const XRIcon = ({ type }) => (
  <div className="arxr-icon" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconContent[type]}
    </svg>
  </div>
);

const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!("IntersectionObserver" in window) || reduceMotion) {
      element.classList.add("arxr-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("arxr-is-visible");
        } else {
          element.classList.remove("arxr-is-visible");
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
      className={`arxr-reveal arxr-reveal--${direction} ${className}`}
      style={{ "--arxr-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ARVRMRXR = () => {
  const [activeMode, setActiveMode] = useState("AR");
  const [activeFaq, setActiveFaq] = useState(null);
  const selectedMode = realityModes[activeMode];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="arxr-page">
      {/* HERO */}
      <section className="arxr-hero">
        <div className="arxr-hero-inner">
          <Reveal direction="left" className="arxr-hero-content">
            <span className="arxr-eyebrow">IMMERSIVE TECHNOLOGY / XR STUDIO</span>

            <h1>
              Reality,
              <br />
              <span>reimagined.</span>
              <br />
              Experiences,
              <br />
              <span>redefined.</span>
            </h1>

            <p>
              MotionPix explores AR, VR, MR and XR to connect digital content
              with real spaces and immersive worlds. From first concepts and
              interactive 3D prototypes to advanced spatial experiences, each
              project starts with the audience, the device and the purpose.
            </p>

            <div className="arxr-hero-meta">
              <span>Augmented</span>
              <i />
              <span>Virtual</span>
              <i />
              <span>Mixed</span>
              <i />
              <span>Extended</span>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="arxr-hero-visual">
            <div className="arxr-spatial-stage">
              <div className="arxr-stage-topline">
                <span><i /> SPATIAL INTERFACE</span>
                <strong>XR / 001</strong>
              </div>

              <div className="arxr-stage-scene">
                <div className="arxr-orbit arxr-orbit--one" />
                <div className="arxr-orbit arxr-orbit--two" />
                <div className="arxr-crosshair arxr-crosshair--one" />
                <div className="arxr-crosshair arxr-crosshair--two" />

                <div className="arxr-hologram-card arxr-hologram-card--left">
                  <span>OBJECT TRACKED</span>
                  <strong>3D / 01</strong>
                  <div className="arxr-card-lines"><i /><i /><i /></div>
                </div>

                <div className="arxr-hologram-object">
                  <div className="arxr-cube-face arxr-cube-face--front" />
                  <div className="arxr-cube-face arxr-cube-face--side" />
                  <div className="arxr-cube-face arxr-cube-face--top" />
                  <span className="arxr-object-point arxr-object-point--one" />
                  <span className="arxr-object-point arxr-object-point--two" />
                </div>

                <div className="arxr-hologram-card arxr-hologram-card--right">
                  <span>SPATIAL ANCHOR</span>
                  <strong>XYZ / 04</strong>
                  <div className="arxr-anchor-graphic"><i /><i /><i /></div>
                </div>

                <div className="arxr-stage-caption">
                  <span>REAL WORLD</span>
                  <i />
                  <span>DIGITAL LAYER</span>
                </div>
              </div>

              <div className="arxr-stage-footer">
                <span>TRACKING</span>
                <div className="arxr-stage-progress"><i /><i /><i /><i /><i /><i /></div>
                <span>ACTIVE</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECHNOLOGY CAPABILITIES */}
      <section className="arxr-section arxr-capabilities">
        <div className="arxr-container">
          <Reveal direction="up">
            <div className="arxr-section-heading">
              <span>THE REALITY SPECTRUM</span>
              <h2>
                Four realities.
                <strong> More ways to experience.</strong>
              </h2>
              <p>
                Each technology offers a different relationship between the
                physical world and digital content. The right approach depends
                on the experience you need to create.
              </p>
            </div>
          </Reveal>

          <div className="arxr-capability-list">
            {xrExperiences.map((experience, index) => (
              <Reveal
                key={experience.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="arxr-capability-wrap"
              >
                <article className="arxr-capability-card">
                  <div className="arxr-capability-top">
                    <span>{experience.number}</span>
                    <small>{experience.tag}</small>
                  </div>

                  <XRIcon type={experience.icon} />

                  <div className="arxr-capability-copy">
                    <h3>{experience.title}</h3>
                    <p>{experience.description}</p>
                  </div>

                  <span className="arxr-capability-arrow" aria-hidden="true">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE REALITY EXPLORER */}
      <section className="arxr-section arxr-explorer">
        <div className="arxr-container">
          <Reveal direction="left">
            <div className="arxr-explorer-intro">
              <span>EXPLORE THE TECHNOLOGIES</span>
              <h2>
                Pick a reality.
                <strong> Discover the possibilities.</strong>
              </h2>
              <p>
                Select a technology to see what it means, where it can be used
                and how a project can evolve from a starting concept to a more
                advanced experience.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="arxr-explorer-panel">
              <div className="arxr-explorer-nav">
                <div className="arxr-explorer-nav-heading">
                  <span className="arxr-live-dot" />
                  <span>REALITY SELECTOR</span>
                </div>

                <div className="arxr-mode-buttons" role="group" aria-label="Choose an immersive technology">
                  {Object.entries(realityModes).map(([key, mode], index) => (
                    <button
                      key={key}
                      type="button"
                      className={`arxr-mode-button ${activeMode === key ? "is-active" : ""}`}
                      aria-pressed={activeMode === key}
                      aria-controls="arxr-mode-detail"
                      onClick={() => setActiveMode(key)}
                    >
                      <span className="arxr-mode-code">0{index + 1}</span>
                      <span className="arxr-mode-label">
                        <strong>{key}</strong>
                        <small>{mode.name}</small>
                      </span>
                      <span className="arxr-mode-chevron" aria-hidden="true">→</span>
                    </button>
                  ))}
                </div>

                <div className="arxr-explorer-note">
                  <span>DESIGN PRINCIPLE</span>
                  <p>Start with the user need, then select the technology and device.</p>
                </div>
              </div>

              <div className="arxr-mode-detail" id="arxr-mode-detail" aria-live="polite">
                <div className={`arxr-mode-emblem arxr-mode-emblem--${activeMode.toLowerCase()}`}>
                  <div className="arxr-emblem-ring arxr-emblem-ring--one" />
                  <div className="arxr-emblem-ring arxr-emblem-ring--two" />
                  <span>{activeMode}</span>
                  <i />
                </div>

                <div className="arxr-mode-detail-heading">
                  <span className="arxr-mode-kicker">{activeMode} / TECHNOLOGY OVERVIEW</span>
                  <h3>{selectedMode.name}</h3>
                  <p className="arxr-mode-summary">{selectedMode.short}</p>
                </div>

                <p className="arxr-mode-definition">{selectedMode.definition}</p>

                <div className="arxr-example-block">
                  <h4>WHERE IT CAN BE USED</h4>
                  <ul>
                    {selectedMode.examples.map((example) => (
                      <li key={example}><span aria-hidden="true">↗</span>{example}</li>
                    ))}
                  </ul>
                </div>

                <div className="arxr-mode-levels">
                  <div>
                    <span>STARTING POINT</span>
                    <p>{selectedMode.startingPoint}</p>
                  </div>
                  <div>
                    <span>ADVANCED DIRECTION</span>
                    <p>{selectedMode.advanced}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEGINNER TO ADVANCED JOURNEY */}
      <section className="arxr-section arxr-journey">
        <div className="arxr-container">
          <Reveal direction="left">
            <div className="arxr-journey-intro">
              <span>FROM FIRST CONCEPT TO ADVANCED XR</span>
              <h2>
                Start with the basics.
                <strong> Build towards immersion.</strong>
              </h2>
              <p>
                An effective development journey progresses from understanding
                the technology to prototyping, spatial interaction, device
                testing and a delivery approach suited to the project.
              </p>
            </div>
          </Reveal>

          <div className="arxr-journey-list">
            {buildJourney.map((stage, index) => (
              <Reveal
                key={stage.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 75}
                className="arxr-journey-item"
              >
                <div className="arxr-journey-marker"><span>{stage.number}</span></div>
                <article className="arxr-journey-card">
                  <span className="arxr-journey-level">{stage.level}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                  <div className="arxr-journey-skills">{stage.skills}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTION PROCESS */}
      <section className="arxr-section arxr-process">
        <div className="arxr-container">
          <Reveal direction="right">
            <div className="arxr-section-heading">
              <span>THE MOTIONPIX APPROACH</span>
              <h2>
                From a practical brief
                <strong> to a spatial experience.</strong>
              </h2>
              <p>
                A clear production process helps align design, technical
                feasibility, device support and user experience from the start.
              </p>
            </div>
          </Reveal>

          <div className="arxr-process-line">
            {productionSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 80}
                className="arxr-process-item"
              >
                <div className="arxr-process-marker"><span>{step.number}</span></div>
                <article className="arxr-process-copy">
                  <span>PHASE {step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="arxr-section arxr-benefits">
        <div className="arxr-container">
          <Reveal direction="right">
            <div className="arxr-section-heading">
              <span>WHY IMMERSIVE TECHNOLOGY</span>
              <h2>
                Make complex ideas
                <strong> easier to experience.</strong>
              </h2>
              <p>
                AR, VR, MR and XR can create useful new ways to explore products,
                understand environments and engage with digital information when
                matched to the right audience and use case.
              </p>
            </div>
          </Reveal>

          <div className="arxr-benefit-list">
            {xrBenefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="arxr-benefit">
                  <span className="arxr-benefit-number">{benefit.number}</span>
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
      <section className="arxr-section arxr-faq">
        <div className="arxr-container">
          <Reveal direction="up">
            <div className="arxr-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Get to know
                <strong> immersive reality.</strong>
              </h2>
              <p>
                The essential distinctions, platform considerations and project
                questions around AR, VR, MR and XR experiences.
              </p>
            </div>
          </Reveal>

          <div className="arxr-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `arxr-faq-answer-${index}`;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 55}
                >
                  <article className={`arxr-faq-item ${isActive ? "is-active" : ""}`}>
                    <button
                      type="button"
                      className="arxr-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span className="arxr-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        {faq.question}
                      </span>
                      <b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>
                    <div
                      id={answerId}
                      className="arxr-faq-answer"
                      aria-hidden={!isActive}
                    >
                      <div className="arxr-faq-answer-inner"><p>{faq.answer}</p></div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="arxr-final">
        <Reveal direction="up">
          <div className="arxr-final-inner">
            <span>BEYOND THE SCREEN</span>
            <h2>
              Imagine the
              <br />
              <strong>experience.</strong>
              <br />
              Explore the
              <br />
              <strong>possible.</strong>
            </h2>
            <p>
              The future of interaction is not only about what people see on a
              screen. It is also about how digital experiences connect with the
              world around them.
            </p>
            <div className="arxr-final-indicator" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default ARVRMRXR;
