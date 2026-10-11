import React, { useEffect, useRef, useState } from "react";
import "./VirtualShowrooms.css";

const showroomTypes = [
  {
    id: "furniture",
    short: "Furniture",
    eyebrow: "LIVING / COLLECTION 01",
    title: "Design a space before you enter it.",
    description:
      "Explore furniture, finishes and room layouts in an interactive digital space. Visitors can inspect products, discover details and picture how a collection fits together.",
    points: [
      { label: "Modular sofa", detail: "Explore the shape, upholstery and proportions of a centrepiece product." },
      { label: "Material finish", detail: "Present fabric, colour and finish options in one clear product view." },
      { label: "Room layout", detail: "Show how key pieces work together inside a styled virtual interior." },
    ],
  },
  {
    id: "retail",
    short: "Retail",
    eyebrow: "RETAIL / COLLECTION 02",
    title: "Bring the store experience online.",
    description:
      "Create a branded virtual store where customers can browse product collections, explore featured displays and move through a curated shopping environment.",
    points: [
      { label: "Featured display", detail: "Give new arrivals and campaign collections a clear visual focal point." },
      { label: "Product details", detail: "Present specifications, product stories and useful shopping information." },
      { label: "Brand environment", detail: "Carry your visual identity through the store layout, lighting and displays." },
    ],
  },
  {
    id: "automotive",
    short: "Automotive",
    eyebrow: "AUTOMOTIVE / EXPERIENCE 03",
    title: "Explore every angle in one place.",
    description:
      "Present vehicles and mobility products in a digital showroom with exterior highlights, interior details and structured product information for remote discovery.",
    points: [
      { label: "Exterior design", detail: "Highlight signature styling, proportions and prominent vehicle features." },
      { label: "Interior details", detail: "Bring attention to the cabin, controls, seating and material choices." },
      { label: "Model information", detail: "Organise variants, specifications and feature summaries for comparison." },
    ],
  },
  {
    id: "property",
    short: "Real Estate",
    eyebrow: "PROPERTY / SPACE 04",
    title: "Help people imagine the place.",
    description:
      "Guide prospective buyers or tenants through a digital property presentation, from room layouts and finishes to important spaces and project information.",
    points: [
      { label: "Room exploration", detail: "Present room relationships and key spaces in a navigable visual experience." },
      { label: "Finish selection", detail: "Show selected material palettes and interior finish combinations." },
      { label: "Project overview", detail: "Organise layouts, amenities and property details in one location." },
    ],
  },
];

const showroomFeatures = [
  {
    number: "01",
    title: "Interactive 3D Product Views",
    description:
      "Present products from multiple angles with purposeful close-ups, visual detail and spatial context, helping visitors understand form and features.",
    icon: "product",
    tag: "PRODUCT EXPLORATION",
  },
  {
    number: "02",
    title: "Clickable Information Hotspots",
    description:
      "Place useful information directly inside the experience. Visitors can select a feature to reveal specifications, materials, benefits or supporting details.",
    icon: "hotspot",
    tag: "CONTEXTUAL DETAILS",
  },
  {
    number: "03",
    title: "Customisation & Variants",
    description:
      "Organise colours, materials, finishes and model variations into an easy-to-understand product presentation that supports informed exploration.",
    icon: "customise",
    tag: "PERSONALISED VIEWS",
  },
  {
    number: "04",
    title: "Branded Digital Environments",
    description:
      "Create a distinctive showroom through considered layout, visual hierarchy, lighting style, typography and brand-aligned design choices.",
    icon: "brand",
    tag: "BRAND EXPERIENCE",
  },
  {
    number: "05",
    title: "Guided Walkthroughs",
    description:
      "Help visitors move through collections, rooms or product zones using clear navigation, guided entry points and intuitive interactive controls.",
    icon: "walkthrough",
    tag: "EASY NAVIGATION",
  },
  {
    number: "06",
    title: "Multi-Device Experiences",
    description:
      "Plan the experience for compatible desktop, tablet and mobile screens, with interaction and content adapted to different viewport sizes.",
    icon: "devices",
    tag: "RESPONSIVE DELIVERY",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand the Space & Audience",
    description:
      "Define the showroom purpose, visitors, featured products, required content and the actions people should be able to take.",
  },
  {
    number: "02",
    title: "Plan the Digital Experience",
    description:
      "Map the environment, navigation, product hotspots, variant choices and the path visitors will follow through the showroom.",
  },
  {
    number: "03",
    title: "Build & Integrate the Experience",
    description:
      "Develop the visual environment, optimise 3D assets, implement interactions and connect relevant product information where required.",
  },
  {
    number: "04",
    title: "Test, Refine & Deliver",
    description:
      "Review usability, responsive behaviour, loading performance and interaction clarity before preparing the experience for deployment.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Make Products Easier to Explore",
    description:
      "Let visitors inspect important details and understand products within a visual setting rather than relying only on static images.",
  },
  {
    number: "02",
    title: "Create a Consistent Brand Experience",
    description:
      "Bring product presentation, visual identity and navigation together within one considered digital environment.",
  },
  {
    number: "03",
    title: "Support Remote Discovery",
    description:
      "Give audiences a way to explore collections and spaces without needing to be physically present in a showroom.",
  },
  {
    number: "04",
    title: "Present Complex Choices Clearly",
    description:
      "Structure product variants, room layouts and key specifications so people can compare options with less friction.",
  },
];

const faqs = [
  {
    question: "What is a virtual showroom?",
    answer:
      "A virtual showroom is an interactive digital environment that presents products, collections or spaces online. Depending on the project, it may include 3D product views, room navigation, clickable hotspots, finish choices or guided walkthroughs.",
  },
  {
    question: "Does a virtual showroom always require VR equipment?",
    answer:
      "No. Many virtual showrooms run in a standard web browser on desktop or mobile. VR headset support can be considered when it fits the audience, hardware and project requirements.",
  },
  {
    question: "Can users explore product details and variants?",
    answer:
      "Yes. A showroom can include selectable hotspots, product specifications, colour or material options, model information and other interactions based on the available 3D assets and data.",
  },
  {
    question: "Can a virtual showroom work on mobile devices?",
    answer:
      "It can be designed for mobile screens with responsive layouts and touch-friendly controls. Final performance depends on the devices, browser support, scene complexity and optimisation of the 3D assets.",
  },
  {
    question: "What assets are needed to create a showroom?",
    answer:
      "Useful inputs may include product models or CAD files, product photos, dimensions, textures, finish references, branding assets and written specifications. The exact list depends on the showroom scope.",
  },
];

const iconContent = {
  product: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4.4 7.6 7.6 4.5 7.6-4.5M12 12.1V21" />
      <path d="m8.5 5 7.7 4.5" />
    </>
  ),
  hotspot: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
    </>
  ),
  customise: (
    <>
      <path d="M4 7h16M4 17h16" />
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="15" cy="17" r="2.5" />
      <path d="M9 9.5V12M15 14.5V12" />
    </>
  ),
  brand: (
    <>
      <path d="m12 3 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3Z" />
      <path d="M8.5 21h7" />
    </>
  ),
  walkthrough: (
    <>
      <path d="M4 20V4h16v16H4Z" />
      <path d="M8 20v-6h8v6M8 8h.01M12 8h.01M16 8h.01" />
      <path d="m10 11 2 2 3-3" />
    </>
  ),
  devices: (
    <>
      <rect x="3" y="4" width="13" height="11" rx="1.5" />
      <path d="M7 20h5M9.5 15v5" />
      <rect x="17" y="8" width="4" height="10" rx="1" />
    </>
  ),
};

function ShowroomIcon({ type }) {
  return (
    <div className="virtualShowrooms-icon" aria-hidden="true">
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
}

function Reveal({ children, className = "", direction = "up", delay = 0 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("virtualShowrooms-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle(
          "virtualShowrooms-is-visible",
          entry.isIntersecting
        );
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`virtualShowrooms-reveal virtualShowrooms-reveal--${direction} ${className}`}
      style={{ "--virtualShowrooms-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ShowroomScene({ type, activePoint, onSelectPoint }) {
  const active = showroomTypes.find((item) => item.id === type) ?? showroomTypes[0];

  return (
    <div className={`virtualShowrooms-scene virtualShowrooms-scene--${type}`}>
      <div className="virtualShowrooms-scene-sky" />
      <div className="virtualShowrooms-scene-window">
        <span />
        <span />
        <span />
      </div>
      <div className="virtualShowrooms-scene-wall-line" />

      {type === "furniture" && (
        <>
          <div className="virtualShowrooms-art-frame"><span /></div>
          <div className="virtualShowrooms-plant"><i /><i /><i /><b /></div>
          <div className="virtualShowrooms-sofa">
            <span className="virtualShowrooms-sofa-back" />
            <span className="virtualShowrooms-sofa-cushion" />
            <span className="virtualShowrooms-sofa-seat" />
            <span className="virtualShowrooms-sofa-arm virtualShowrooms-sofa-arm--left" />
            <span className="virtualShowrooms-sofa-arm virtualShowrooms-sofa-arm--right" />
            <span className="virtualShowrooms-sofa-leg virtualShowrooms-sofa-leg--left" />
            <span className="virtualShowrooms-sofa-leg virtualShowrooms-sofa-leg--right" />
          </div>
          <div className="virtualShowrooms-table"><span /></div>
          <div className="virtualShowrooms-rug" />
          <div className="virtualShowrooms-lamp"><i /><span /></div>
        </>
      )}

      {type === "retail" && (
        <>
          <div className="virtualShowrooms-retail-shelf virtualShowrooms-retail-shelf--one">
            <i /><i /><i /><b /><b />
          </div>
          <div className="virtualShowrooms-retail-shelf virtualShowrooms-retail-shelf--two">
            <i /><i /><i /><b /><b />
          </div>
          <div className="virtualShowrooms-retail-display">
            <span /><span /><span />
          </div>
          <div className="virtualShowrooms-retail-counter"><i /></div>
          <div className="virtualShowrooms-retail-sign">THE EDIT / 01</div>
        </>
      )}

      {type === "automotive" && (
        <>
          <div className="virtualShowrooms-auto-panel"><span>DESIGN / PERFORMANCE</span><b>01</b></div>
          <div className="virtualShowrooms-car">
            <span className="virtualShowrooms-car-roof" />
            <span className="virtualShowrooms-car-window" />
            <span className="virtualShowrooms-car-body" />
            <span className="virtualShowrooms-car-light" />
            <span className="virtualShowrooms-car-wheel virtualShowrooms-car-wheel--left" />
            <span className="virtualShowrooms-car-wheel virtualShowrooms-car-wheel--right" />
          </div>
          <div className="virtualShowrooms-auto-spec"><span>FORM / FUNCTION</span><b>Explore the details</b></div>
          <div className="virtualShowrooms-auto-orbit" />
        </>
      )}

      {type === "property" && (
        <>
          <div className="virtualShowrooms-property-wall" />
          <div className="virtualShowrooms-property-art"><span /></div>
          <div className="virtualShowrooms-property-sofa"><i /><i /><b /></div>
          <div className="virtualShowrooms-property-table" />
          <div className="virtualShowrooms-property-plant"><i /><i /><i /><b /></div>
          <div className="virtualShowrooms-property-label"><span>RESIDENCE / 04</span><b>Spatial preview</b></div>
        </>
      )}

      <div className="virtualShowrooms-scene-vignette" />

      <div className="virtualShowrooms-scene-label">
        <span className="virtualShowrooms-live-dot" />
        <span>{active.eyebrow}</span>
      </div>

      <div className="virtualShowrooms-scene-controls" aria-label="Sample product details">
        {active.points.map((point, index) => (
          <button
            type="button"
            key={point.label}
            className={`virtualShowrooms-hotspot virtualShowrooms-hotspot--${index + 1} ${activePoint === index ? "is-active" : ""}`}
            onClick={() => onSelectPoint(index)}
            aria-label={`Show details: ${point.label}`}
            aria-pressed={activePoint === index}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div className="virtualShowrooms-scene-caption">
        <span>VIRTUAL SHOWROOM</span>
        <strong>{active.short} / Interactive preview</strong>
      </div>
    </div>
  );
}

function VirtualShowrooms() {
  const [activeShowroom, setActiveShowroom] = useState("furniture");
  const [activePoint, setActivePoint] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const currentShowroom = showroomTypes.find(
    (item) => item.id === activeShowroom
  ) ?? showroomTypes[0];
  const currentPoint = currentShowroom.points[activePoint] ?? currentShowroom.points[0];

  const handleShowroomChange = (id) => {
    setActiveShowroom(id);
    setActivePoint(0);
  };

  return (
    <main className="virtualShowrooms-page">
      {/* HERO */}
      <section className="virtualShowrooms-hero">
        <div className="virtualShowrooms-hero-inner">
          <Reveal direction="left" className="virtualShowrooms-hero-content">
            <span className="virtualShowrooms-eyebrow">VIRTUAL SHOWROOMS / DIGITAL SPACES</span>
            <h1>
              Enter a new
              <br />
              <span>dimension.</span>
              <br />
              Explore without
              <br />
              boundaries.
            </h1>
            <p>
              We create interactive virtual showrooms that bring products,
              collections and spaces into engaging digital environments. Explore
              the details, discover possibilities and experience a brand beyond
              the traditional display.
            </p>
            <div className="virtualShowrooms-hero-meta">
              <span>Explore</span><i /><span>Interact</span><i /><span>Discover</span>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="virtualShowrooms-hero-visual">
            <div className="virtualShowrooms-preview-shell">
              <div className="virtualShowrooms-preview-topbar">
                <div className="virtualShowrooms-preview-brand"><span /> DIGITAL SPACE / 001</div>
                <span className="virtualShowrooms-preview-status">LIVE PREVIEW</span>
              </div>

              <ShowroomScene
                type={activeShowroom}
                activePoint={activePoint}
                onSelectPoint={setActivePoint}
              />

              <div className="virtualShowrooms-preview-bottom">
                <div className="virtualShowrooms-preview-bottom-copy">
                  <span>SELECTED DETAIL</span>
                  <strong>{currentPoint.label}</strong>
                  <p>{currentPoint.detail}</p>
                </div>
                <span className="virtualShowrooms-preview-index">0{activePoint + 1} / 03</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SHOWROOM EXPLORER */}
      <section className="virtualShowrooms-section virtualShowrooms-explorer" id="virtual-showroom-explorer">
        <div className="virtualShowrooms-container">
          <Reveal direction="up">
            <div className="virtualShowrooms-section-heading">
              <span>EXPLORE THE POSSIBILITIES</span>
              <h2>One digital world.<strong> Many experiences.</strong></h2>
              <p>
                The environment can be shaped around the product, audience and
                story. Select a showroom type to preview a different use case
                and explore its sample interactive details.
              </p>
            </div>
          </Reveal>

          <div className="virtualShowrooms-explorer-layout">
            <Reveal direction="left" className="virtualShowrooms-explorer-menu-wrap">
              <div className="virtualShowrooms-explorer-menu" role="tablist" aria-label="Virtual showroom types">
                {showroomTypes.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    role="tab"
                    id={`virtualShowrooms-tab-${item.id}`}
                    aria-selected={activeShowroom === item.id}
                    aria-controls="virtualShowrooms-explorer-content"
                    className={`virtualShowrooms-explorer-tab ${activeShowroom === item.id ? "is-active" : ""}`}
                    onClick={() => handleShowroomChange(item.id)}
                  >
                    <span className="virtualShowrooms-explorer-number">0{index + 1}</span>
                    <span className="virtualShowrooms-explorer-tab-copy">
                      <strong>{item.short}</strong>
                      <small>{item.eyebrow.split(" / ")[0]}</small>
                    </span>
                    <span className="virtualShowrooms-explorer-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              <div className="virtualShowrooms-explorer-note">
                <span>DESIGNED AROUND YOU</span>
                <p>Layouts, product detail and navigation can be adapted to each showroom's purpose.</p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={90} className="virtualShowrooms-explorer-content-wrap">
              <article
                className="virtualShowrooms-explorer-content"
                id="virtualShowrooms-explorer-content"
                role="tabpanel"
                aria-labelledby={`virtualShowrooms-tab-${currentShowroom.id}`}
              >
                <div className="virtualShowrooms-explorer-content-top">
                  <span>{currentShowroom.eyebrow}</span>
                  <span className="virtualShowrooms-content-dot" />
                </div>
                <h3>{currentShowroom.title}</h3>
                <p>{currentShowroom.description}</p>
                <div className="virtualShowrooms-detail-list">
                  {currentShowroom.points.map((point, index) => (
                    <button
                      type="button"
                      key={point.label}
                      className={`virtualShowrooms-detail-row ${activePoint === index ? "is-active" : ""}`}
                      onClick={() => setActivePoint(index)}
                      aria-pressed={activePoint === index}
                    >
                      <span className="virtualShowrooms-detail-number">0{index + 1}</span>
                      <span className="virtualShowrooms-detail-copy">
                        <strong>{point.label}</strong>
                        <small>{point.detail}</small>
                      </span>
                      <span className="virtualShowrooms-detail-mark" aria-hidden="true">{activePoint === index ? "−" : "+"}</span>
                    </button>
                  ))}
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="virtualShowrooms-section virtualShowrooms-capabilities">
        <div className="virtualShowrooms-container">
          <Reveal direction="right">
            <div className="virtualShowrooms-section-heading">
              <span>WHAT WE CREATE</span>
              <h2>Designed to make every detail<strong> feel closer.</strong></h2>
              <p>
                Combine spatial design, product information and intuitive
                interactions to make a virtual showroom useful as well as
                visually engaging.
              </p>
            </div>
          </Reveal>

          <div className="virtualShowrooms-feature-list">
            {showroomFeatures.map((feature, index) => (
              <Reveal
                key={feature.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="virtualShowrooms-feature-wrap"
              >
                <article className="virtualShowrooms-feature-card">
                  <div className="virtualShowrooms-feature-top">
                    <span>{feature.number}</span>
                    <small>{feature.tag}</small>
                  </div>
                  <ShowroomIcon type={feature.icon} />
                  <div className="virtualShowrooms-feature-copy">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                  <span className="virtualShowrooms-feature-mark" aria-hidden="true">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="virtualShowrooms-section virtualShowrooms-process">
        <div className="virtualShowrooms-container">
          <Reveal direction="left">
            <div className="virtualShowrooms-process-intro">
              <span>FROM CONCEPT TO DIGITAL SPACE</span>
              <h2>Plan the experience.<strong> Build the world.</strong></h2>
              <p>
                A structured workflow connects your business goals with spatial
                design, practical interaction and a reliable digital delivery.
              </p>
            </div>
          </Reveal>

          <div className="virtualShowrooms-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 80}
                className="virtualShowrooms-process-item"
              >
                <div className="virtualShowrooms-process-marker"><span>{step.number}</span></div>
                <div className="virtualShowrooms-process-copy">
                  <span>PHASE {step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="virtualShowrooms-section virtualShowrooms-benefits">
        <div className="virtualShowrooms-container">
          <Reveal direction="right">
            <div className="virtualShowrooms-section-heading">
              <span>WHY VIRTUAL SHOWROOMS</span>
              <h2>More than a display.<strong> A digital experience.</strong></h2>
              <p>
                Bring product understanding, brand storytelling and remote
                exploration together through an interactive showroom journey.
              </p>
            </div>
          </Reveal>

          <div className="virtualShowrooms-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.number} direction={index % 2 === 0 ? "left" : "right"} delay={index * 70}>
                <article className="virtualShowrooms-benefit">
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
      <section className="virtualShowrooms-section virtualShowrooms-faq">
        <div className="virtualShowrooms-container">
          <Reveal direction="up">
            <div className="virtualShowrooms-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>Everything about the<strong> virtual space.</strong></h2>
              <p>Helpful details about virtual showroom planning, interaction and delivery.</p>
            </div>
          </Reveal>

          <div className="virtualShowrooms-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `virtualShowrooms-faq-answer-${index}`;

              return (
                <Reveal key={faq.question} direction={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
                  <article className={`virtualShowrooms-faq-item ${isActive ? "is-active" : ""}`}>
                    <button
                      type="button"
                      className="virtualShowrooms-faq-question"
                      onClick={() => setActiveFaq((current) => current === index ? null : index)}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span><small>{String(index + 1).padStart(2, "0")}</small>{faq.question}</span>
                      <b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>
                    <div id={answerId} className="virtualShowrooms-faq-answer" aria-hidden={!isActive}>
                      <div><p>{faq.answer}</p></div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="virtualShowrooms-final">
        <Reveal direction="up">
          <div className="virtualShowrooms-final-inner">
            <span>THE NEXT WAY TO EXPERIENCE PRODUCTS</span>
            <h2>
              Bring the space
              <br />
              <strong>to the screen.</strong>
            </h2>
            <p>
              A thoughtfully designed virtual showroom turns digital browsing
              into an opportunity to explore, understand and connect with a
              product or place.
            </p>
            <div className="virtualShowrooms-final-line" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

export default VirtualShowrooms;
