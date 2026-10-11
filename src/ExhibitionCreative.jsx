import React, { useEffect, useRef, useState } from "react";
import "./ExhibitionCreative.css";

const exhibitionServices = [
  {
    number: "01",
    title: "Exhibition Booth Design",
    description:
      "Distinctive booth layouts shape visitor flow, product visibility and brand presence, balancing strong visual architecture with practical space planning.",
    icon: "booth",
  },
  {
    number: "02",
    title: "3D Stall Visualization",
    description:
      "Photorealistic 3D concepts help teams review materials, lighting, signage, furniture and spatial proportions before fabrication begins.",
    icon: "visualization",
  },
  {
    number: "03",
    title: "Custom Fabrication",
    description:
      "Display structures, counters, wall systems and branded elements are planned around the venue, event requirements and intended visitor experience.",
    icon: "fabrication",
  },
  {
    number: "04",
    title: "Brand Experience Zones",
    description:
      "Purpose-built product, demonstration and meeting zones guide visitors through a cohesive brand story from first impression to deeper engagement.",
    icon: "experience",
  },
  {
    number: "05",
    title: "Interactive Display Areas",
    description:
      "Touchscreens, digital signage and product demonstration points give visitors a hands-on way to explore features, services and brand information.",
    icon: "interactive",
  },
  {
    number: "06",
    title: "Modular Exhibition Systems",
    description:
      "Adaptable components and reusable display systems make it easier to reconfigure a stand for different venues, footprints and event objectives.",
    icon: "modular",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Brief & Space Study",
    description:
      "We understand the event, audience, brand priorities, floor area, venue rules and practical requirements before defining the concept.",
  },
  {
    number: "02",
    title: "Concept & 3D Design",
    description:
      "The layout, circulation, display hierarchy, finishes, lighting and branded elements are developed into a coordinated visual direction.",
  },
  {
    number: "03",
    title: "Detailing & Production",
    description:
      "Approved concepts are translated into material selections, dimensions, fabrication details and installation planning.",
  },
  {
    number: "04",
    title: "Installation & Handover",
    description:
      "The stand is assembled and checked for presentation, visitor movement, display visibility and readiness for the exhibition opening.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Make the Brand Stand Out",
    description:
      "A considered architectural form, clear signage and consistent visual language help a booth remain recognisable in a busy exhibition hall.",
  },
  {
    number: "02",
    title: "Guide Visitor Movement",
    description:
      "Thoughtful zoning gives visitors intuitive routes between welcome points, products, demonstrations and conversation areas.",
  },
  {
    number: "03",
    title: "Present Products Clearly",
    description:
      "Purposeful lighting, sightlines and display heights make important products and messages easier to notice and understand.",
  },
  {
    number: "04",
    title: "Balance Impact with Function",
    description:
      "Storage, staff circulation, meeting space and technical requirements are considered alongside the visual experience.",
  },
];

const faqs = [
  {
    question: "What is included in exhibition creative design?",
    answer:
      "Depending on the project scope, it can include concept development, space planning, booth design, 3D visualisation, signage and graphics, material direction, display zones and fabrication or installation coordination.",
  },
  {
    question: "Can the booth be designed for a specific floor area?",
    answer:
      "Yes. The design can be planned around the allocated footprint, booth position, height restrictions, venue guidelines, access points and expected visitor flow.",
  },
  {
    question: "Why create a 3D visualisation before fabrication?",
    answer:
      "A 3D view helps stakeholders review layout, proportions, finishes, lighting, graphics and display placement early, so design decisions can be refined before physical production.",
  },
  {
    question: "Can interactive screens or product demonstrations be included?",
    answer:
      "Yes. Digital signage, touch-enabled displays and demonstration areas can be integrated when they support the audience, product and event objectives. Power, placement and visitor access should be planned as part of the layout.",
  },
  {
    question: "Can an exhibition stand be reused for other events?",
    answer:
      "A modular approach can make selected structures and display components adaptable for future events. Reuse depends on the dimensions, venue requirements, condition of the components and the new event's branding needs.",
  },
];

const boothConcepts = [
  {
    id: "island",
    label: "Island Stand",
    footprint: "Open on four sides",
    title: "An open, panoramic brand space.",
    description:
      "Designed for high visibility, multiple entry points and flexible visitor movement around a central brand or product feature.",
    features: ["360° approach", "Central feature wall", "Open circulation"],
  },
  {
    id: "corner",
    label: "Corner Stand",
    footprint: "Open on two sides",
    title: "Two sides. One connected story.",
    description:
      "A corner layout uses two visible elevations to attract passing visitors while keeping demonstrations and conversations easy to navigate.",
    features: ["Dual-facing graphics", "Clear product zones", "Compact meeting area"],
  },
  {
    id: "inline",
    label: "Inline Stand",
    footprint: "Open on one side",
    title: "A focused, forward-facing display.",
    description:
      "A streamlined layout makes effective use of a linear footprint, with a strong back wall, readable messaging and efficient visitor entry.",
    features: ["Strong front elevation", "Vertical product display", "Space-efficient planning"],
  },
];

const ExhibitionIcon = ({ type }) => (
  <div className={`exhibitionCreative-icon exhibitionCreative-icon--${type}`} aria-hidden="true">
    {type === "booth" && (
      <>
        <span className="exhibitionCreative-icon-booth-back" />
        <span className="exhibitionCreative-icon-booth-side" />
        <span className="exhibitionCreative-icon-booth-floor" />
        <span className="exhibitionCreative-icon-booth-counter" />
      </>
    )}
    {type === "visualization" && (
      <>
        <span className="exhibitionCreative-icon-screen" />
        <span className="exhibitionCreative-icon-screen-line exhibitionCreative-line-one" />
        <span className="exhibitionCreative-icon-screen-line exhibitionCreative-line-two" />
        <span className="exhibitionCreative-icon-screen-base" />
      </>
    )}
    {type === "fabrication" && (
      <>
        <span className="exhibitionCreative-icon-build-frame" />
        <span className="exhibitionCreative-icon-build-joint exhibitionCreative-joint-one" />
        <span className="exhibitionCreative-icon-build-joint exhibitionCreative-joint-two" />
        <span className="exhibitionCreative-icon-build-beam" />
      </>
    )}
    {type === "experience" && (
      <>
        <span className="exhibitionCreative-icon-zone exhibitionCreative-zone-one" />
        <span className="exhibitionCreative-icon-zone exhibitionCreative-zone-two" />
        <span className="exhibitionCreative-icon-zone exhibitionCreative-zone-three" />
        <span className="exhibitionCreative-icon-zone-core" />
      </>
    )}
    {type === "interactive" && (
      <>
        <span className="exhibitionCreative-icon-touch-screen" />
        <span className="exhibitionCreative-icon-touch-dot" />
        <span className="exhibitionCreative-icon-touch-ring" />
        <span className="exhibitionCreative-icon-touch-base" />
      </>
    )}
    {type === "modular" && (
      <>
        <span className="exhibitionCreative-icon-module exhibitionCreative-module-one" />
        <span className="exhibitionCreative-icon-module exhibitionCreative-module-two" />
        <span className="exhibitionCreative-icon-module exhibitionCreative-module-three" />
        <span className="exhibitionCreative-icon-module exhibitionCreative-module-four" />
      </>
    )}
  </div>
);

const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("exhibitionCreative-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("exhibitionCreative-is-visible");
        } else {
          element.classList.remove("exhibitionCreative-is-visible");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`exhibitionCreative-reveal exhibitionCreative-reveal--${direction} ${className}`.trim()}
      style={{ "--exhibitionCreative-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ExhibitionCreative = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeConcept, setActiveConcept] = useState("island");
  const selectedConcept = boothConcepts.find((concept) => concept.id === activeConcept) || boothConcepts[0];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="exhibitionCreative-page">
      {/* HERO */}
      <section className="exhibitionCreative-hero">
        <div className="exhibitionCreative-hero-inner">
          <Reveal direction="left" className="exhibitionCreative-hero-content">
            <span className="exhibitionCreative-eyebrow">EXHIBITION / CREATIVE STUDIO</span>
            <h1>
              Spaces That
              <span> Speak.</span>
              <br />
              Brands That
              <span> Connect.</span>
            </h1>
            <p>
              We shape exhibition environments where architecture, graphics, lighting and visitor flow work as one. From the first spatial idea to the final installation, every detail is planned to express the brand and make the experience easy to explore.
            </p>
            <div className="exhibitionCreative-hero-meta" aria-label="Exhibition design stages">
              <span>Concept</span><i /><span>Space</span><i /><span>Experience</span><i /><span>Build</span>
            </div>
            <div className="exhibitionCreative-hero-stats">
              <div><strong>01</strong><span>Clear brand story</span></div>
              <div><strong>02</strong><span>Purposeful space</span></div>
              <div><strong>03</strong><span>Visitor-first design</span></div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="exhibitionCreative-hero-visual">
            <div className="exhibitionCreative-stage" aria-label="Illustrated exhibition stand concept" role="img">
              <div className="exhibitionCreative-stage-topline">
                <span>EXHIBITION BOOTH / 3D CONCEPT</span>
                <strong>EC / 026</strong>
              </div>
              <div className="exhibitionCreative-showfloor" aria-hidden="true">
                <div className="exhibitionCreative-showfloor-grid" />
                <div className="exhibitionCreative-booth-canopy">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="exhibitionCreative-booth-side exhibitionCreative-booth-side--left" />
                <div className="exhibitionCreative-booth-side exhibitionCreative-booth-side--right" />
                <div className="exhibitionCreative-booth-backwall">
                  <div className="exhibitionCreative-booth-brand">
                    <span className="exhibitionCreative-booth-brand-mark"><i /><i /><i /></span>
                    <span className="exhibitionCreative-booth-brand-copy"><b>EXHIBIT</b><small>BRAND EXPERIENCE</small></span>
                  </div>
                  <div className="exhibitionCreative-booth-message"><span>DESIGN THAT</span><strong>CONNECTS.</strong></div>
                  <div className="exhibitionCreative-booth-screen exhibitionCreative-booth-screen--one"><span>PRODUCT</span><i /><i /></div>
                  <div className="exhibitionCreative-booth-screen exhibitionCreative-booth-screen--two"><span>INNOVATION</span><i /><i /></div>
                  <div className="exhibitionCreative-booth-shelf exhibitionCreative-booth-shelf--one"><i /><i /><i /></div>
                  <div className="exhibitionCreative-booth-shelf exhibitionCreative-booth-shelf--two"><i /><i /><i /></div>
                </div>
                <div className="exhibitionCreative-booth-floor" />
                <div className="exhibitionCreative-booth-pedestal exhibitionCreative-booth-pedestal--one"><span /></div>
                <div className="exhibitionCreative-booth-pedestal exhibitionCreative-booth-pedestal--two"><span /></div>
                <div className="exhibitionCreative-booth-counter"><span>WELCOME</span><i /></div>
                <div className="exhibitionCreative-booth-visitor exhibitionCreative-booth-visitor--one"><i /><span /><b /><b /></div>
                <div className="exhibitionCreative-booth-visitor exhibitionCreative-booth-visitor--two"><i /><span /><b /><b /></div>
                <div className="exhibitionCreative-booth-callout exhibitionCreative-booth-callout--wall">BRAND WALL</div>
                <div className="exhibitionCreative-booth-callout exhibitionCreative-booth-callout--display">PRODUCT ZONE</div>
              </div>
              <div className="exhibitionCreative-stage-caption"><span className="exhibitionCreative-stage-live-dot" /> SPATIAL CONCEPT <b>PREVIEW</b></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXHIBITION SERVICES */}
      <section className="exhibitionCreative-section exhibitionCreative-services" id="exhibitionCreative-services">
        <div className="exhibitionCreative-container">
          <Reveal direction="up">
            <div className="exhibitionCreative-section-heading">
              <span>WHAT WE CREATE</span>
              <h2>Built around the <strong>experience.</strong></h2>
              <p>Every exhibition element has a role: attract attention, organise the space, make the offer clear or help visitors engage with the brand.</p>
            </div>
          </Reveal>

          <div className="exhibitionCreative-services-list">
            {exhibitionServices.map((service, index) => (
              <Reveal key={service.number} direction={index % 2 === 0 ? "left" : "right"} delay={index * 65} className="exhibitionCreative-service-wrap">
                <article className="exhibitionCreative-service-card">
                  <div className="exhibitionCreative-service-number">{service.number}</div>
                  <ExhibitionIcon type={service.icon} />
                  <div className="exhibitionCreative-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <span className="exhibitionCreative-service-arrow" aria-hidden="true">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE BOOTH CONCEPT STUDIO */}
      <section className="exhibitionCreative-section exhibitionCreative-concept">
        <div className="exhibitionCreative-container">
          <Reveal direction="left">
            <div className="exhibitionCreative-concept-intro">
              <span>EXPLORE THE LAYOUT</span>
              <h2>One brief. <strong>Different ways to welcome.</strong></h2>
              <p>Choose a common exhibition footprint to explore how access, focal points and visitor circulation can shape the creative direction.</p>
            </div>
          </Reveal>

          <div className="exhibitionCreative-concept-lab">
            <Reveal direction="left" className="exhibitionCreative-concept-controls">
              <span className="exhibitionCreative-control-label">SELECT A STAND TYPE</span>
              <div className="exhibitionCreative-concept-tabs" role="group" aria-label="Choose exhibition stand type">
                {boothConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    type="button"
                    className={`exhibitionCreative-concept-tab ${activeConcept === concept.id ? "exhibitionCreative-is-active" : ""}`}
                    onClick={() => setActiveConcept(concept.id)}
                    aria-pressed={activeConcept === concept.id}
                  >
                    <span>{concept.label}</span><b>{activeConcept === concept.id ? "−" : "+"}</b>
                  </button>
                ))}
              </div>
              <div className="exhibitionCreative-concept-detail" aria-live="polite">
                <span className="exhibitionCreative-concept-footprint">{selectedConcept.footprint}</span>
                <h3>{selectedConcept.title}</h3>
                <p>{selectedConcept.description}</p>
                <ul>
                  {selectedConcept.features.map((feature) => <li key={feature}><span />{feature}</li>)}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="right" delay={100} className="exhibitionCreative-concept-visual-wrap">
              <div className={`exhibitionCreative-plan exhibitionCreative-plan--${activeConcept}`} aria-label={`${selectedConcept.label} illustrated exhibition floor plan`} role="img">
                <div className="exhibitionCreative-plan-topline">
                  <span>EXHIBITION FLOOR PLAN</span>
                  <b>{selectedConcept.id.toUpperCase()} / 01</b>
                </div>
                <div className="exhibitionCreative-layout-map">
                  <div className="exhibitionCreative-layout-map-note">ILLUSTRATIVE FOOTPRINT · NOT TO SCALE</div>
                  <div className={`exhibitionCreative-layout-edge exhibitionCreative-layout-edge--back ${activeConcept === "island" ? "is-open" : "is-closed"}`}>
                    <span>{activeConcept === "island" ? "OPEN ACCESS" : "BACK WALL"}</span>
                  </div>
                  <div className={`exhibitionCreative-layout-edge exhibitionCreative-layout-edge--left ${activeConcept === "island" ? "is-open" : "is-closed"}`}>
                    <span>{activeConcept === "island" ? "OPEN" : "SIDE WALL"}</span>
                  </div>
                  <div className={`exhibitionCreative-layout-edge exhibitionCreative-layout-edge--right ${activeConcept === "inline" ? "is-closed" : "is-open"}`}>
                    <span>{activeConcept === "inline" ? "SIDE WALL" : "OPEN ACCESS"}</span>
                  </div>
                  <div className="exhibitionCreative-layout-edge exhibitionCreative-layout-edge--front is-open">
                    <span>OPEN FRONT / ENTRY</span>
                  </div>
                  <div className={`exhibitionCreative-layout-footprint exhibitionCreative-layout-footprint--${activeConcept}`}>
                    <div className="exhibitionCreative-layout-floor-grid" />
                    <div className="exhibitionCreative-layout-wall exhibitionCreative-layout-wall--back" />
                    <div className="exhibitionCreative-layout-wall exhibitionCreative-layout-wall--left" />
                    <div className="exhibitionCreative-layout-wall exhibitionCreative-layout-wall--right" />
                    <div className="exhibitionCreative-layout-wall exhibitionCreative-layout-wall--front" />
                    <div className="exhibitionCreative-layout-brand-feature"><span className="exhibitionCreative-layout-brand-icon">M</span><b>BRAND FEATURE</b></div>
                    <div className="exhibitionCreative-layout-display exhibitionCreative-layout-display--one"><i /><span>PRODUCT 01</span></div>
                    <div className="exhibitionCreative-layout-display exhibitionCreative-layout-display--two"><i /><span>PRODUCT 02</span></div>
                    <div className="exhibitionCreative-layout-display exhibitionCreative-layout-display--three"><i /><span>DEMO ZONE</span></div>
                    <div className="exhibitionCreative-layout-counter"><span>WELCOME</span></div>
                    <div className="exhibitionCreative-layout-meeting"><span>MEETING</span><i /><i /><i /><i /></div>
                    <div className="exhibitionCreative-layout-route exhibitionCreative-layout-route--one" />
                    <div className="exhibitionCreative-layout-route exhibitionCreative-layout-route--two" />
                    <div className="exhibitionCreative-layout-route exhibitionCreative-layout-route--three" />
                    <div className="exhibitionCreative-layout-entry exhibitionCreative-layout-entry--back">↓</div>
                    <div className="exhibitionCreative-layout-entry exhibitionCreative-layout-entry--left">→</div>
                    <div className="exhibitionCreative-layout-entry exhibitionCreative-layout-entry--right">←</div>
                    <div className="exhibitionCreative-layout-entry exhibitionCreative-layout-entry--front">↑</div>
                  </div>
                  <div className="exhibitionCreative-layout-legend">
                    <span><i className="exhibitionCreative-layout-key-wall" />Wall / partition</span>
                    <span><i className="exhibitionCreative-layout-key-open" />Open visitor access</span>
                    <span><i className="exhibitionCreative-layout-key-display" />Display / activity zone</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="exhibitionCreative-section exhibitionCreative-process">
        <div className="exhibitionCreative-container">
          <Reveal direction="right">
            <div className="exhibitionCreative-process-intro">
              <span>THE CREATIVE WORKFLOW</span>
              <h2>From a blank floor plan <strong>to an event-ready space.</strong></h2>
              <p>A coordinated workflow connects the visual idea to the physical environment, helping keep design intent and practical requirements aligned.</p>
            </div>
          </Reveal>
          <div className="exhibitionCreative-process-line">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} direction={index % 2 === 0 ? "left" : "right"} delay={index * 85} className="exhibitionCreative-process-item">
                <div className="exhibitionCreative-process-marker"><span>{step.number}</span></div>
                <div className="exhibitionCreative-process-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="exhibitionCreative-section exhibitionCreative-benefits">
        <div className="exhibitionCreative-container">
          <Reveal direction="left">
            <div className="exhibitionCreative-section-heading">
              <span>WHY EXHIBITION CREATIVE</span>
              <h2>More than a stand. <strong>A brand experience.</strong></h2>
              <p>Strong exhibition design brings brand expression and real-world usability together, making the space work as well as it looks.</p>
            </div>
          </Reveal>
          <div className="exhibitionCreative-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.number} direction={index % 2 === 0 ? "right" : "left"} delay={index * 75}>
                <article className="exhibitionCreative-benefit">
                  <span>{benefit.number}</span>
                  <div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
                  <i aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="exhibitionCreative-section exhibitionCreative-faq">
        <div className="exhibitionCreative-container">
          <Reveal direction="up">
            <div className="exhibitionCreative-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>Planning an exhibition <strong>space.</strong></h2>
              <p>Useful details about designing, visualising and preparing a branded exhibition environment.</p>
            </div>
          </Reveal>
          <div className="exhibitionCreative-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              return (
                <Reveal key={faq.question} direction={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
                  <div className={`exhibitionCreative-faq-item ${isActive ? "exhibitionCreative-is-active" : ""}`}>
                    <button type="button" className="exhibitionCreative-faq-question" onClick={() => toggleFaq(index)} aria-expanded={isActive}>
                      <span><small>0{index + 1}</small>{faq.question}</span>
                      <b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>
                    <div className="exhibitionCreative-faq-answer"><p>{faq.answer}</p></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="exhibitionCreative-final">
        <Reveal direction="up">
          <div className="exhibitionCreative-final-inner">
            <span>THE SPACE MAKES THE FIRST IMPRESSION</span>
            <h2>A space with purpose.<br /><strong>A story worth stepping into.</strong></h2>
            <p>When design, detail and visitor experience work together, an exhibition becomes more than a display — it becomes a memorable place to connect with a brand.</p>
            <div className="exhibitionCreative-final-lines" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default ExhibitionCreative;
