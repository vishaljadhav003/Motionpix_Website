import React, { useEffect, useRef, useState } from "react";
import "./Exhibition3DDesign.css";

const exhibition3DServices = [
  {
    number: "01",
    title: "3D Booth Concept Modelling",
    description:
      "Spatial ideas become detailed three-dimensional booth models, helping teams assess architecture, scale, circulation and the overall brand presence before production.",
    icon: "model",
  },
  {
    number: "02",
    title: "Photorealistic Rendering",
    description:
      "Carefully composed camera angles, realistic materials, shadows and reflections create presentation-ready views of the proposed exhibition environment.",
    icon: "render",
  },
  {
    number: "03",
    title: "Material & Lighting Studies",
    description:
      "Surface finishes, colour palettes, illuminated signage and exhibition lighting are explored in 3D to compare the atmosphere and visibility of each design choice.",
    icon: "lighting",
  },
  {
    number: "04",
    title: "Spatial Layout Visualisation",
    description:
      "Counters, display units, product zones and meeting areas are arranged in a coordinated model to review clearances, sightlines and visitor movement.",
    icon: "layout",
  },
  {
    number: "05",
    title: "Product & Display Integration",
    description:
      "Products, screens, shelving and branded display elements are positioned within the booth model so the complete presentation can be reviewed as one space.",
    icon: "display",
  },
  {
    number: "06",
    title: "Presentation & Technical Views",
    description:
      "Perspective views, elevations and layout illustrations help stakeholders understand the concept and communicate design intent to the production team.",
    icon: "technical",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Brief & Reference Review",
    description:
      "We review the brand guidelines, stand dimensions, event requirements, reference material and intended visitor experience before modelling begins.",
  },
  {
    number: "02",
    title: "Space Blockout & Model",
    description:
      "The main structure, walls, counters, product areas and circulation are built in 3D to establish proportion and spatial relationships.",
  },
  {
    number: "03",
    title: "Materials, Lighting & Views",
    description:
      "Finishes, brand graphics, lighting and camera composition are refined to communicate the design clearly and consistently.",
  },
  {
    number: "04",
    title: "Review & Final Visuals",
    description:
      "The model is reviewed and refined, then presentation views are prepared for design approvals, event planning and production discussions.",
  },
];

const benefits = [
  {
    number: "01",
    title: "See the Space Before It Exists",
    description:
      "Three-dimensional visuals help teams understand volume, proportions and the relationship between architectural elements before physical construction.",
  },
  {
    number: "02",
    title: "Review Design Decisions Earlier",
    description:
      "Layout, finishes, signage and display placement can be assessed visually while changes are still part of the design process.",
  },
  {
    number: "03",
    title: "Communicate One Clear Concept",
    description:
      "Consistent perspective views give clients, designers and production teams a shared understanding of the proposed exhibition stand.",
  },
  {
    number: "04",
    title: "Present with Greater Clarity",
    description:
      "Polished renders and technical views make it easier to explain the concept, compare options and support design approvals.",
  },
];

const faqs = [
  {
    question: "What is included in exhibition 3D design?",
    answer:
      "Depending on the project scope, it can include 3D booth modelling, spatial layout, material and lighting studies, branded graphics, product placement, perspective renders and selected technical views.",
  },
  {
    question: "Can the 3D design follow a specific booth size?",
    answer:
      "Yes. The model can be developed around the allocated floor area, booth position, height restrictions and available venue information supplied for the project.",
  },
  {
    question: "Can I review materials and lighting before fabrication?",
    answer:
      "Yes. Different surface finishes, colours, signage treatments and lighting directions can be visualised to support a more informed design review.",
  },
  {
    question: "Are 3D renders the same as fabrication drawings?",
    answer:
      "No. Renders communicate appearance and spatial intent. Fabrication drawings require appropriate dimensions, construction details and technical coordination; these can be scoped separately where needed.",
  },
  {
    question: "What information helps start a 3D exhibition project?",
    answer:
      "Useful inputs include the stand dimensions, event or venue guidelines, brand assets, product references, preferred materials, functional requirements and any inspiration images or existing layouts.",
  },
];

const designViews = [
  {
    id: "perspective",
    label: "Perspective",
    heading: "Read the complete spatial idea.",
    description:
      "A three-quarter view brings the structure, signage, product zones, finishes and lighting together in one presentation view.",
    points: ["Overall form and scale", "Material and lighting feel", "Brand and product hierarchy"],
  },
  {
    id: "front",
    label: "Front Elevation",
    heading: "Check the main brand elevation.",
    description:
      "A front-facing view makes the back wall, visual hierarchy, display heights and the relationship between key elements easier to review.",
    points: ["Signage placement", "Display alignment", "Front-facing proportions"],
  },
  {
    id: "top",
    label: "Top Plan",
    heading: "Understand the space from above.",
    description:
      "A plan view clarifies the footprint, entrance, counter position and spacing between visitor zones before the stand is built.",
    points: ["Footprint and clearances", "Visitor circulation", "Counter and display positions"],
  },
];

const Exhibition3DIcon = ({ type }) => (
  <div className={`exhibition3dDesign-icon exhibition3dDesign-icon--${type}`} aria-hidden="true">
    {type === "model" && <><span className="exhibition3dDesign-icon-cube" /><i /><b /></>}
    {type === "render" && <><span className="exhibition3dDesign-icon-render-frame" /><i /><b /></>}
    {type === "lighting" && <><span className="exhibition3dDesign-icon-light-bulb" /><i /><b /></>}
    {type === "layout" && <><span className="exhibition3dDesign-icon-layout-base" /><i /><b /><em /></>}
    {type === "display" && <><span className="exhibition3dDesign-icon-display-screen" /><i /><b /></>}
    {type === "technical" && <><span className="exhibition3dDesign-icon-blueprint" /><i /><b /></>}
  </div>
);

const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("exhibition3dDesign-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("exhibition3dDesign-is-visible");
        } else {
          element.classList.remove("exhibition3dDesign-is-visible");
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
      className={`exhibition3dDesign-reveal exhibition3dDesign-reveal--${direction} ${className}`.trim()}
      style={{ "--exhibition3dDesign-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Exhibition3DDesign = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeView, setActiveView] = useState("perspective");
  const selectedView = designViews.find((view) => view.id === activeView) || designViews[0];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="exhibition3dDesign-page">
      {/* HERO */}
      <section className="exhibition3dDesign-hero">
        <div className="exhibition3dDesign-hero-inner">
          <Reveal direction="left" className="exhibition3dDesign-hero-content">
            <span className="exhibition3dDesign-eyebrow">EXHIBITION / 3D DESIGN STUDIO</span>
            <h1>
              See the Space.
              <span> Shape the Experience.</span>
            </h1>
            <p>
              We turn exhibition concepts into clear three-dimensional visuals. From booth structure and product placement to materials, lighting and camera views, every element is modelled to help teams understand the proposed space before it is built.
            </p>
            <div className="exhibition3dDesign-hero-meta" aria-label="Exhibition 3D design stages">
              <span>Model</span><i /><span>Materials</span><i /><span>Lighting</span><i /><span>Render</span>
            </div>
            <div className="exhibition3dDesign-hero-stats">
              <div><strong>01</strong><span>Spatial clarity</span></div>
              <div><strong>02</strong><span>Material studies</span></div>
              <div><strong>03</strong><span>Presentation views</span></div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120} className="exhibition3dDesign-hero-visual">
            <div className="exhibition3dDesign-stage" role="img" aria-label="Stylised three-dimensional exhibition booth with branded back wall, lighting, display plinths and welcome counter">
              <div className="exhibition3dDesign-stage-label"><span>3D BOOTH STUDY</span><strong>VIEW / 026</strong></div>
              <div className="exhibition3dDesign-stage-orbit exhibition3dDesign-orbit-one" />
              <div className="exhibition3dDesign-stage-orbit exhibition3dDesign-orbit-two" />
              <div className="exhibition3dDesign-stage-grid" />
              <div className="exhibition3dDesign-model">
                <div className="exhibition3dDesign-model-ceiling"><i /><i /><i /></div>
                <div className="exhibition3dDesign-model-backwall">
                  <div className="exhibition3dDesign-model-logo"><i /><i /><i /></div>
                  <div className="exhibition3dDesign-model-copy"><i /><i /><i /></div>
                  <div className="exhibition3dDesign-model-screen"><span /></div>
                  <div className="exhibition3dDesign-model-shelf exhibition3dDesign-shelf-one" />
                  <div className="exhibition3dDesign-model-shelf exhibition3dDesign-shelf-two" />
                </div>
                <div className="exhibition3dDesign-model-sidewall"><i /><i /></div>
                <div className="exhibition3dDesign-model-floor" />
                <div className="exhibition3dDesign-model-counter"><i /><b /></div>
                <div className="exhibition3dDesign-model-plinth exhibition3dDesign-plinth-one"><span /></div>
                <div className="exhibition3dDesign-model-plinth exhibition3dDesign-plinth-two"><span /></div>
                <div className="exhibition3dDesign-model-product exhibition3dDesign-product-one" />
                <div className="exhibition3dDesign-model-product exhibition3dDesign-product-two" />
                <div className="exhibition3dDesign-model-light exhibition3dDesign-light-one" />
                <div className="exhibition3dDesign-model-light exhibition3dDesign-light-two" />
              </div>
              <div className="exhibition3dDesign-stage-axis"><span>X</span><span>Y</span><span>Z</span></div>
              <div className="exhibition3dDesign-stage-caption"><i /> MATERIAL / LIGHT / FORM <b>RENDER PREVIEW</b></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="exhibition3dDesign-section exhibition3dDesign-services" id="exhibition3dDesign-services">
        <div className="exhibition3dDesign-container">
          <Reveal direction="up">
            <div className="exhibition3dDesign-section-heading">
              <span>WHAT WE VISUALISE</span>
              <h2>Designed in 3D. <strong>Understood in detail.</strong></h2>
              <p>3D exhibition design connects spatial planning with materials, lighting and presentation, making the proposed stand easier to review from every important angle.</p>
            </div>
          </Reveal>
          <div className="exhibition3dDesign-services-list">
            {exhibition3DServices.map((service, index) => (
              <Reveal key={service.number} direction={index % 2 === 0 ? "left" : "right"} delay={index * 65} className="exhibition3dDesign-service-wrap">
                <article className="exhibition3dDesign-service-card">
                  <div className="exhibition3dDesign-service-number">{service.number}</div>
                  <Exhibition3DIcon type={service.icon} />
                  <div className="exhibition3dDesign-service-content"><h3>{service.title}</h3><p>{service.description}</p></div>
                  <span className="exhibition3dDesign-service-arrow" aria-hidden="true">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE 3D VIEW STUDIO */}
      <section className="exhibition3dDesign-section exhibition3dDesign-view-studio">
        <div className="exhibition3dDesign-container">
          <Reveal direction="left">
            <div className="exhibition3dDesign-view-intro">
              <span>EXPLORE THE MODEL</span>
              <h2>One booth. <strong>Three useful views.</strong></h2>
              <p>Change the view to see how a 3D concept can communicate the overall look, the main elevation and the practical footprint.</p>
            </div>
          </Reveal>
          <div className="exhibition3dDesign-view-lab">
            <Reveal direction="left" className="exhibition3dDesign-view-controls">
              <span className="exhibition3dDesign-control-label">SELECT A VIEW</span>
              <div className="exhibition3dDesign-view-tabs" role="group" aria-label="Select exhibition 3D model view">
                {designViews.map((view) => (
                  <button key={view.id} type="button" className={`exhibition3dDesign-view-tab ${activeView === view.id ? "exhibition3dDesign-is-active" : ""}`} onClick={() => setActiveView(view.id)} aria-pressed={activeView === view.id}>
                    <span>{view.label}</span><b>{activeView === view.id ? "−" : "+"}</b>
                  </button>
                ))}
              </div>
              <div className="exhibition3dDesign-view-detail" aria-live="polite">
                <span className="exhibition3dDesign-view-tag">{selectedView.label}</span>
                <h3>{selectedView.heading}</h3>
                <p>{selectedView.description}</p>
                <ul>{selectedView.points.map((point) => <li key={point}><i />{point}</li>)}</ul>
              </div>
            </Reveal>
            <Reveal direction="right" delay={100} className="exhibition3dDesign-view-visual-wrap">
              <div className={`exhibition3dDesign-viewer exhibition3dDesign-viewer--${activeView}`} role="img" aria-label={`${selectedView.label} view of a conceptual exhibition booth`}>
                <div className="exhibition3dDesign-viewer-topline"><span>MODEL PREVIEW</span><b>{selectedView.id.toUpperCase()} / 03</b></div>
                <div className="exhibition3dDesign-viewer-ruler exhibition3dDesign-ruler-top"><span>0</span><i /><span>2m</span><i /><span>4m</span><i /><span>6m</span></div>
                <div className="exhibition3dDesign-viewer-model">
                  <div className="exhibition3dDesign-viewer-floor" />
                  <div className="exhibition3dDesign-viewer-backwall"><span className="exhibition3dDesign-viewer-brand"><i /><i /><i /></span><span className="exhibition3dDesign-viewer-headline"><i /><i /><i /></span><span className="exhibition3dDesign-viewer-screen" /><span className="exhibition3dDesign-viewer-shelf exhibition3dDesign-viewer-shelf-one" /><span className="exhibition3dDesign-viewer-shelf exhibition3dDesign-viewer-shelf-two" /></div>
                  <div className="exhibition3dDesign-viewer-sidewall"><i /><i /></div>
                  <div className="exhibition3dDesign-viewer-counter"><i /><b /></div>
                  <div className="exhibition3dDesign-viewer-plinth exhibition3dDesign-viewer-plinth-one"><i /></div>
                  <div className="exhibition3dDesign-viewer-plinth exhibition3dDesign-viewer-plinth-two"><i /></div>
                  <div className="exhibition3dDesign-viewer-product exhibition3dDesign-viewer-product-one" />
                  <div className="exhibition3dDesign-viewer-product exhibition3dDesign-viewer-product-two" />
                  <div className="exhibition3dDesign-viewer-measure exhibition3dDesign-measure-one"><span>4.0 m</span></div>
                  <div className="exhibition3dDesign-viewer-measure exhibition3dDesign-measure-two"><span>3.0 m</span></div>
                </div>
                <div className="exhibition3dDesign-viewer-ruler exhibition3dDesign-ruler-bottom"><span>FOOTPRINT</span><b>12 m² CONCEPT</b></div>
                <div className="exhibition3dDesign-viewer-legend"><span><i className="exhibition3dDesign-legend-structure" />Structure</span><span><i className="exhibition3dDesign-legend-display" />Display element</span><span><i className="exhibition3dDesign-legend-brand" />Brand graphics</span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="exhibition3dDesign-section exhibition3dDesign-process">
        <div className="exhibition3dDesign-container">
          <Reveal direction="right">
            <div className="exhibition3dDesign-process-intro">
              <span>THE 3D DESIGN PROCESS</span>
              <h2>From dimensions <strong>to design-ready visuals.</strong></h2>
              <p>A clear workflow develops the booth from its core geometry into a coherent visual presentation that teams can review together.</p>
            </div>
          </Reveal>
          <div className="exhibition3dDesign-process-line">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} direction={index % 2 === 0 ? "left" : "right"} delay={index * 85} className="exhibition3dDesign-process-item">
                <div className="exhibition3dDesign-process-marker"><span>{step.number}</span></div>
                <div className="exhibition3dDesign-process-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="exhibition3dDesign-section exhibition3dDesign-benefits">
        <div className="exhibition3dDesign-container">
          <Reveal direction="left">
            <div className="exhibition3dDesign-section-heading">
              <span>WHY EXHIBITION 3D DESIGN</span>
              <h2>Make design decisions <strong>visible earlier.</strong></h2>
              <p>A 3D view adds context to a drawing, helping stakeholders evaluate the proposed environment before moving into physical execution.</p>
            </div>
          </Reveal>
          <div className="exhibition3dDesign-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.number} direction={index % 2 === 0 ? "right" : "left"} delay={index * 75}>
                <article className="exhibition3dDesign-benefit"><span>{benefit.number}</span><div><h3>{benefit.title}</h3><p>{benefit.description}</p></div><i aria-hidden="true" /></article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="exhibition3dDesign-section exhibition3dDesign-faq">
        <div className="exhibition3dDesign-container">
          <Reveal direction="up">
            <div className="exhibition3dDesign-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>Understanding the <strong>3D design process.</strong></h2>
              <p>Practical details about modelling, visualisation and reviewing an exhibition design concept.</p>
            </div>
          </Reveal>
          <div className="exhibition3dDesign-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              return (
                <Reveal key={faq.question} direction={index % 2 === 0 ? "left" : "right"} delay={index * 55}>
                  <div className={`exhibition3dDesign-faq-item ${isActive ? "exhibition3dDesign-is-active" : ""}`}>
                    <button type="button" className="exhibition3dDesign-faq-question" onClick={() => toggleFaq(index)} aria-expanded={isActive}>
                      <span><small>0{index + 1}</small>{faq.question}</span><b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>
                    <div className="exhibition3dDesign-faq-answer"><p>{faq.answer}</p></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="exhibition3dDesign-final">
        <Reveal direction="up">
          <div className="exhibition3dDesign-final-inner">
            <span>FROM MODEL TO EXPERIENCE</span>
            <h2>Visualise the idea.<br /><strong>Understand every angle.</strong></h2>
            <p>Thoughtful exhibition 3D design turns dimensions, materials and brand intent into a visual plan people can review with confidence.</p>
            <div className="exhibition3dDesign-final-lines" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default Exhibition3DDesign;
