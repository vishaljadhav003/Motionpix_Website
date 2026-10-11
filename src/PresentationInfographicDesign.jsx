import React, { useEffect, useRef, useState } from "react";
import "./PresentationInfographicDesign.css";

const presentationInfographicServices = [
  {
    number: "01",
    title: "Corporate Presentations",
    description:
      "Professional slide layouts, structured content, diagrams and visual hierarchy help teams communicate business information clearly in meetings, reviews and stakeholder presentations.",
    icon: "presentation",
  },
  {
    number: "02",
    title: "Pitch Decks & Business Proposals",
    description:
      "A consistent narrative, focused typography and purposeful visuals help organise business opportunities, proposals, strategies and key messages into a coherent presentation.",
    icon: "pitch",
  },
  {
    number: "03",
    title: "Infographics & Data Visualisation",
    description:
      "Charts, statistics, comparisons and visual summaries turn dense information into structured graphics that are easier to scan, interpret and explain.",
    icon: "infographic",
  },
  {
    number: "04",
    title: "Process Diagrams & Flowcharts",
    description:
      "Connected steps, decision points and clear directional cues explain workflows, systems and processes through organised visual structures.",
    icon: "process",
  },
  {
    number: "05",
    title: "Reports & Editorial Layouts",
    description:
      "Cover pages, section layouts, data summaries and information-rich pages establish a readable visual structure for reports, research documents and business publications.",
    icon: "report",
  },
  {
    number: "06",
    title: "Training & Educational Visuals",
    description:
      "Learning slides, instructional diagrams, timelines and concept maps help organise educational content into clear, progressive visual sequences.",
    icon: "education",
  },
];

const presentationInfographicProcess = [
  {
    number: "01",
    title: "Content & Objective",
    description:
      "We identify the presentation goal, target audience, key messages, source material and the information that needs the most attention.",
  },
  {
    number: "02",
    title: "Structure & Story",
    description:
      "The information is organised into a logical sequence, with a clear beginning, meaningful sections and a strong visual hierarchy.",
  },
  {
    number: "03",
    title: "Visual Design",
    description:
      "Typography, colour, charts, diagrams, layouts and supporting graphics are developed to make the content easy to follow.",
  },
  {
    number: "04",
    title: "Review & Delivery",
    description:
      "The final layouts are reviewed for consistency, readability and alignment with the agreed screen, presentation or document requirements.",
  },
];

const presentationInfographicBenefits = [
  {
    number: "01",
    title: "Make Information Easier to Understand",
    description:
      "Well-structured slides, diagrams and infographics help organise complex material into digestible visual sections.",
  },
  {
    number: "02",
    title: "Strengthen the Main Message",
    description:
      "Clear hierarchy and purposeful visual emphasis guide the audience towards the most relevant information.",
  },
  {
    number: "03",
    title: "Present Data with Context",
    description:
      "Charts and comparisons can make numbers easier to interpret when supported by accurate labels, units and explanations.",
  },
  {
    number: "04",
    title: "Maintain a Consistent Visual System",
    description:
      "Coordinated layouts, typography, colours and graphic elements keep a complete deck or document visually connected.",
  },
];

const presentationInfographicFaqs = [
  {
    question: "What is included in presentation and infographic design?",
    answer:
      "Depending on the brief, it can include corporate presentations, pitch decks, business proposals, data visualisations, infographics, process diagrams, report layouts and educational slides.",
  },
  {
    question: "Can you turn existing content into a professional presentation?",
    answer:
      "Yes. Existing text, documents, research, data and brand guidelines can be organised into a visual presentation. The final structure depends on the supplied material and the intended audience.",
  },
  {
    question: "Can infographics include charts and statistics?",
    answer:
      "Yes. Infographics can combine charts, comparisons, statistics, labels and explanatory graphics. They should be based on accurate source data and clearly identify relevant units and context.",
  },
  {
    question: "Can the design follow our existing brand guidelines?",
    answer:
      "Yes. Colours, fonts, logos and established brand styles can guide the visual direction so the presentation or infographic remains consistent with the organisation's identity.",
  },
  {
    question: "What formats can be delivered?",
    answer:
      "The delivery format depends on the project requirements. Common outputs include presentation files, PDFs and image exports. Editable source files and software-specific requirements should be agreed on before production.",
  },
];

const presentationInfographicPreviews = [
  {
    id: "presentation",
    number: "01",
    label: "Presentation",
    subtitle: "SLIDE DESIGN / BUSINESS STORY",
    title: "A Story Across Slides.",
    description:
      "A clean slide concept combining a strong headline, key metrics and supporting visual information in a structured layout.",
    tag: "SLIDES / HIERARCHY / NARRATIVE",
    type: "presentation",
    details: [
      { label: "Structure", value: "Slide-based" },
      { label: "Focus", value: "Key messages" },
      { label: "Use", value: "Business & pitch" },
    ],
  },
  {
    id: "infographic",
    number: "02",
    label: "Infographic",
    subtitle: "INFORMATION / VISUAL SUMMARY",
    title: "Complexity, Made Clear.",
    description:
      "A visual summary concept showing how facts, process steps and concise labels can be connected on one canvas.",
    tag: "FACTS / PROCESS / EXPLANATION",
    type: "infographic",
    details: [
      { label: "Structure", value: "Visual sections" },
      { label: "Focus", value: "Understanding" },
      { label: "Use", value: "Reports & education" },
    ],
  },
  {
    id: "data",
    number: "03",
    label: "Data Story",
    subtitle: "CHARTS / METRICS / COMPARISON",
    title: "Numbers with Context.",
    description:
      "A data-focused layout concept combining highlighted metrics, chart elements and concise explanatory labels.",
    tag: "METRICS / CHARTS / COMPARISON",
    type: "data",
    details: [
      { label: "Structure", value: "Data-led" },
      { label: "Focus", value: "Patterns & context" },
      { label: "Use", value: "Reviews & reports" },
    ],
  },
];

const PresentationInfographicIcon = ({ type }) => {
  return (
    <div
      className={`presentationInfographic-icon presentationInfographic-icon--${type}`}
      aria-hidden="true"
    >
      {type === "presentation" && (
        <>
          <span className="presentationInfographic-icon-screen" />
          <span className="presentationInfographic-icon-screen-line presentationInfographic-icon-icon-line--one" />
          <span className="presentationInfographic-icon-screen-line presentationInfographic-icon-icon-line--two" />
          <span className="presentationInfographic-icon-screen-bar presentationInfographic-icon-screen-bar--one" />
          <span className="presentationInfographic-icon-screen-bar presentationInfographic-icon-screen-bar--two" />
          <span className="presentationInfographic-icon-screen-stand" />
        </>
      )}

      {type === "pitch" && (
        <>
          <span className="presentationInfographic-icon-pitch-page" />
          <span className="presentationInfographic-icon-pitch-mark">01</span>
          <span className="presentationInfographic-icon-pitch-line presentationInfographic-icon-pitch-line--one" />
          <span className="presentationInfographic-icon-pitch-line presentationInfographic-icon-pitch-line--two" />
          <span className="presentationInfographic-icon-pitch-line presentationInfographic-icon-pitch-line--three" />
        </>
      )}

      {type === "infographic" && (
        <>
          <span className="presentationInfographic-icon-info-ring" />
          <span className="presentationInfographic-icon-info-bar presentationInfographic-icon-info-bar--one" />
          <span className="presentationInfographic-icon-info-bar presentationInfographic-icon-info-bar--two" />
          <span className="presentationInfographic-icon-info-bar presentationInfographic-icon-info-bar--three" />
          <span className="presentationInfographic-icon-info-dot" />
        </>
      )}

      {type === "process" && (
        <>
          <span className="presentationInfographic-icon-flow-node presentationInfographic-icon-flow-node--one" />
          <span className="presentationInfographic-icon-flow-node presentationInfographic-icon-flow-node--two" />
          <span className="presentationInfographic-icon-flow-node presentationInfographic-icon-flow-node--three" />
          <span className="presentationInfographic-icon-flow-line presentationInfographic-icon-flow-line--one" />
          <span className="presentationInfographic-icon-flow-line presentationInfographic-icon-flow-line--two" />
        </>
      )}

      {type === "report" && (
        <>
          <span className="presentationInfographic-icon-report-page" />
          <span className="presentationInfographic-icon-report-heading" />
          <span className="presentationInfographic-icon-report-line presentationInfographic-icon-report-line--one" />
          <span className="presentationInfographic-icon-report-line presentationInfographic-icon-report-line--two" />
          <span className="presentationInfographic-icon-report-chart">
            <i />
            <i />
            <i />
          </span>
        </>
      )}

      {type === "education" && (
        <>
          <span className="presentationInfographic-icon-education-board" />
          <span className="presentationInfographic-icon-education-point presentationInfographic-icon-education-point--one" />
          <span className="presentationInfographic-icon-education-point presentationInfographic-icon-education-point--two" />
          <span className="presentationInfographic-icon-education-line presentationInfographic-icon-education-line--one" />
          <span className="presentationInfographic-icon-education-line presentationInfographic-icon-education-line--two" />
        </>
      )}
    </div>
  );
};

const PresentationInfographicReveal = ({
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

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("presentationInfographic-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("presentationInfographic-is-visible");
        } else {
          element.classList.remove("presentationInfographic-is-visible");
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
      className={[
        "presentationInfographic-reveal",
        `presentationInfographic-reveal--${direction}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--presentationInfographic-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const PresentationInfographicDesign = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePreview, setActivePreview] = useState("presentation");

  const selectedPreview =
    presentationInfographicPreviews.find(
      (preview) => preview.id === activePreview
    ) || presentationInfographicPreviews[0];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="presentationInfographic-page">
      {/* HERO */}
      <section className="presentationInfographic-hero">
        <div className="presentationInfographic-hero-inner">
          <PresentationInfographicReveal
            direction="left"
            className="presentationInfographic-hero-copy"
          >
            <span className="presentationInfographic-eyebrow">
              PRESENTATION & INFOGRAPHIC DESIGN
            </span>

            <h1>
              Information,
              <br />
              <span>Designed</span>
              to Make Sense.
            </h1>

            <p>
              We transform ideas, information and data into purposeful visual
              communication. From corporate presentations and pitch decks to
              infographics, process diagrams and reports, every layout is
              designed to make the message clear and the story easier to
              follow.
            </p>

            <div className="presentationInfographic-hero-meta">
              <span>Structure</span>
              <i />
              <span>Visualise</span>
              <i />
              <span>Explain</span>
              <i />
              <span>Present</span>
            </div>
          </PresentationInfographicReveal>

          <PresentationInfographicReveal
            direction="right"
            delay={120}
            className="presentationInfographic-hero-visual"
          >
            <div className="presentationInfographic-design-stage">
              <div className="presentationInfographic-stage-header">
                <span>VISUAL COMMUNICATION / 001</span>
                <span className="presentationInfographic-stage-status">
                  <i />
                  DESIGN SYSTEM
                </span>
              </div>

              <div className="presentationInfographic-stage-orbit presentationInfographic-stage-orbit--one" />
              <div className="presentationInfographic-stage-orbit presentationInfographic-stage-orbit--two" />

              <div className="presentationInfographic-stage-slide presentationInfographic-stage-slide--back">
                <span className="presentationInfographic-slide-kicker">
                  STRATEGY / OVERVIEW
                </span>
                <span className="presentationInfographic-slide-title">
                  Clear direction.
                </span>
                <span className="presentationInfographic-slide-line presentationInfographic-slide-line--one" />
                <span className="presentationInfographic-slide-line presentationInfographic-slide-line--two" />
                <div className="presentationInfographic-slide-mini-chart">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="presentationInfographic-stage-slide presentationInfographic-stage-slide--front">
                <div className="presentationInfographic-slide-top">
                  <span>REPORT / 026</span>
                  <span>PI.</span>
                </div>

                <h2>
                  Make
                  <br />
                  Sense.
                </h2>

                <p>Ideas become clearer when information is structured.</p>

                <div className="presentationInfographic-slide-chart">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="presentationInfographic-slide-bottom">
                  <span>INSIGHT / STRUCTURE / CLARITY</span>
                </div>
              </div>

              <div className="presentationInfographic-stage-data-card">
                <span className="presentationInfographic-data-card-number">
                  04
                </span>
                <span className="presentationInfographic-data-card-title">
                  Key insights
                </span>
                <div className="presentationInfographic-data-card-bars">
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="presentationInfographic-stage-footer">
                <span>SLIDES / CHARTS / DIAGRAMS</span>
                <span>PI—001</span>
              </div>
            </div>
          </PresentationInfographicReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="presentationInfographic-section presentationInfographic-services"
        id="presentation-infographic-services"
      >
        <div className="presentationInfographic-container">
          <PresentationInfographicReveal direction="up">
            <div className="presentationInfographic-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Every detail has
                <strong> a clear role.</strong>
              </h2>

              <p>
                Different communication formats need different visual
                structures. We align content, hierarchy and visual language
                with the purpose of the presentation or information graphic.
              </p>
            </div>
          </PresentationInfographicReveal>

          <div className="presentationInfographic-services-list">
            {presentationInfographicServices.map((service, index) => (
              <PresentationInfographicReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="presentationInfographic-service-wrap"
              >
                <article className="presentationInfographic-service-card">
                  <span className="presentationInfographic-service-number">
                    {service.number}
                  </span>

                  <PresentationInfographicIcon type={service.icon} />

                  <div className="presentationInfographic-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span
                    className="presentationInfographic-service-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              </PresentationInfographicReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE VISUAL PREVIEW */}
      <section className="presentationInfographic-section presentationInfographic-explorer-section">
        <div className="presentationInfographic-container">
          <PresentationInfographicReveal direction="right">
            <div className="presentationInfographic-section-heading">
              <span>EXPLORE THE DESIGN APPROACH</span>

              <h2>
                Different formats.
                <strong> One clear message.</strong>
              </h2>

              <p>
                Select a design format to preview how structured content,
                visual hierarchy and graphic elements can work together to
                explain information.
              </p>
            </div>
          </PresentationInfographicReveal>

          <div className="presentationInfographic-explorer">
            <PresentationInfographicReveal
              direction="left"
              className="presentationInfographic-explorer-controls"
            >
              <span className="presentationInfographic-explorer-label">
                CHOOSE A DESIGN FORMAT
              </span>

              <div
                className="presentationInfographic-preview-tabs"
                role="tablist"
                aria-label="Presentation and infographic formats"
              >
                {presentationInfographicPreviews.map((preview) => (
                  <button
                    key={preview.id}
                    type="button"
                    role="tab"
                    id={`presentationInfographic-tab-${preview.id}`}
                    aria-selected={activePreview === preview.id}
                    aria-controls="presentationInfographic-preview-panel"
                    className={
                      activePreview === preview.id
                        ? "presentationInfographic-preview-tab is-active"
                        : "presentationInfographic-preview-tab"
                    }
                    onClick={() => setActivePreview(preview.id)}
                  >
                    <span>{preview.number}</span>
                    <strong>{preview.label}</strong>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>

              <div className="presentationInfographic-explorer-note">
                <span>+</span>
                <p>
                  Good visualisation does not add noise. It helps the audience
                  understand the information that matters.
                </p>
              </div>
            </PresentationInfographicReveal>

            <PresentationInfographicReveal
              direction="right"
              delay={100}
              className="presentationInfographic-explorer-preview"
            >
              <div
                id="presentationInfographic-preview-panel"
                role="tabpanel"
                aria-labelledby={`presentationInfographic-tab-${selectedPreview.id}`}
                className={`presentationInfographic-preview presentationInfographic-preview--${selectedPreview.type}`}
                key={selectedPreview.id}
              >
                <div className="presentationInfographic-preview-top">
                  <span>{selectedPreview.subtitle}</span>
                  <span>{selectedPreview.number} / 03</span>
                </div>

                <div className="presentationInfographic-preview-art">
                  <span className="presentationInfographic-preview-grid" />
                  <span className="presentationInfographic-preview-corner presentationInfographic-preview-corner--tl" />
                  <span className="presentationInfographic-preview-corner presentationInfographic-preview-corner--tr" />
                  <span className="presentationInfographic-preview-corner presentationInfographic-preview-corner--bl" />
                  <span className="presentationInfographic-preview-corner presentationInfographic-preview-corner--br" />

                  {selectedPreview.type === "presentation" && (
                    <div className="presentationInfographic-mockup-slides">
                      <div className="presentationInfographic-mockup-slide presentationInfographic-mockup-slide--back">
                        <span>AGENDA / OVERVIEW</span>
                        <i />
                        <i />
                        <i />
                        <div>
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>

                      <div className="presentationInfographic-mockup-slide presentationInfographic-mockup-slide--front">
                        <span className="presentationInfographic-mockup-kicker">
                          BUSINESS REVIEW / 026
                        </span>

                        <strong>
                          The next
                          <br />
                          chapter.
                        </strong>

                        <p>Turning strategic thinking into clear action.</p>

                        <div className="presentationInfographic-mockup-slide-chart">
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPreview.type === "infographic" && (
                    <div className="presentationInfographic-mockup-infographic">
                      <div className="presentationInfographic-mockup-info-header">
                        <span>INFOGRAPHIC / 026</span>
                        <strong>HOW IT WORKS</strong>
                      </div>

                      <div className="presentationInfographic-mockup-info-flow">
                        <div>
                          <span>01</span>
                          <i />
                          <strong>Discover</strong>
                          <small>Gather insight</small>
                        </div>
                        <b aria-hidden="true">→</b>
                        <div>
                          <span>02</span>
                          <i />
                          <strong>Organise</strong>
                          <small>Find patterns</small>
                        </div>
                        <b aria-hidden="true">→</b>
                        <div>
                          <span>03</span>
                          <i />
                          <strong>Explain</strong>
                          <small>Show meaning</small>
                        </div>
                      </div>

                      <div className="presentationInfographic-mockup-info-footer">
                        <span />
                        <span />
                      </div>
                    </div>
                  )}

                  {selectedPreview.type === "data" && (
                    <div className="presentationInfographic-mockup-data">
                      <div className="presentationInfographic-mockup-data-header">
                        <span>DATA SUMMARY / 026</span>
                        <span>OVERVIEW</span>
                      </div>

                      <div className="presentationInfographic-mockup-data-metrics">
                        <div>
                          <strong>04</strong>
                          <span>KEY POINTS</span>
                        </div>
                        <div>
                          <strong>03</strong>
                          <span>DATA GROUPS</span>
                        </div>
                      </div>

                      <div className="presentationInfographic-mockup-data-chart">
                        <div className="presentationInfographic-mockup-data-y">
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>

                        <div className="presentationInfographic-mockup-data-bars">
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>

                      <div className="presentationInfographic-mockup-data-legend">
                        <i />
                        <span>Category A</span>
                        <i />
                        <span>Category B</span>
                      </div>
                    </div>
                  )}

                  <div className="presentationInfographic-preview-art-label">
                    <span>{selectedPreview.tag}</span>
                    <span>PI / {selectedPreview.number}</span>
                  </div>
                </div>

                <div className="presentationInfographic-preview-description">
                  <span>{selectedPreview.number}</span>

                  <div>
                    <h3>{selectedPreview.title}</h3>
                    <p>{selectedPreview.description}</p>
                  </div>
                </div>

                <div className="presentationInfographic-preview-details">
                  {selectedPreview.details.map((detail) => (
                    <div key={detail.label}>
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="presentationInfographic-preview-footer">
                  <span>CONCEPT PREVIEW</span>
                  <span className="presentationInfographic-preview-footer-dot" />
                  <span>VISUAL COMMUNICATION</span>
                </div>
              </div>
            </PresentationInfographicReveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="presentationInfographic-section presentationInfographic-process">
        <div className="presentationInfographic-container">
          <PresentationInfographicReveal direction="left">
            <div className="presentationInfographic-process-intro">
              <span>THE DESIGN PROCESS</span>

              <h2>
                From raw information
                <strong> to clear visuals.</strong>
              </h2>

              <p>
                A structured process connects content planning, narrative
                organisation, visual design and careful final review.
              </p>
            </div>
          </PresentationInfographicReveal>

          <div className="presentationInfographic-process-line">
            {presentationInfographicProcess.map((step, index) => (
              <PresentationInfographicReveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 80}
                className="presentationInfographic-process-item"
              >
                <div className="presentationInfographic-process-marker">
                  <span>{step.number}</span>
                </div>

                <article className="presentationInfographic-process-card">
                  <div className="presentationInfographic-process-card-top">
                    <span>PHASE {step.number}</span>
                    <span aria-hidden="true">↗</span>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </PresentationInfographicReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="presentationInfographic-section presentationInfographic-benefits">
        <div className="presentationInfographic-container">
          <PresentationInfographicReveal direction="right">
            <div className="presentationInfographic-section-heading">
              <span>WHY VISUAL COMMUNICATION</span>

              <h2>
                Clearer information.
                <strong> Stronger understanding.</strong>
              </h2>

              <p>
                Presentations and infographics work best when each element
                supports the message, explains a relationship or highlights
                information that deserves attention.
              </p>
            </div>
          </PresentationInfographicReveal>

          <div className="presentationInfographic-benefit-list">
            {presentationInfographicBenefits.map((benefit, index) => (
              <PresentationInfographicReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="presentationInfographic-benefit">
                  <span className="presentationInfographic-benefit-number">
                    {benefit.number}
                  </span>

                  <div className="presentationInfographic-benefit-copy">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <span
                    className="presentationInfographic-benefit-mark"
                    aria-hidden="true"
                  />
                </article>
              </PresentationInfographicReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="presentationInfographic-section presentationInfographic-faq">
        <div className="presentationInfographic-container">
          <PresentationInfographicReveal direction="up">
            <div className="presentationInfographic-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding
                <strong> visual design.</strong>
              </h2>

              <p>
                Practical details about presentation structure, infographic
                content, brand consistency and delivery formats.
              </p>
            </div>
          </PresentationInfographicReveal>

          <div className="presentationInfographic-faq-list">
            {presentationInfographicFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <PresentationInfographicReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={(index % 3) * 60}
                >
                  <article
                    className={
                      isActive
                        ? "presentationInfographic-faq-item is-active"
                        : "presentationInfographic-faq-item"
                    }
                  >
                    <button
                      type="button"
                      className="presentationInfographic-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={`presentationInfographic-faq-answer-${index}`}
                    >
                      <span className="presentationInfographic-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        <span>{faq.question}</span>
                      </span>

                      <span
                        className="presentationInfographic-faq-toggle"
                        aria-hidden="true"
                      >
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      id={`presentationInfographic-faq-answer-${index}`}
                      className="presentationInfographic-faq-answer"
                      aria-hidden={!isActive}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                </PresentationInfographicReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="presentationInfographic-final">
        <PresentationInfographicReveal direction="up">
          <div className="presentationInfographic-final-inner">
            <span>THE POWER OF VISUAL CLARITY</span>

            <h2>
              Make the complex
              <br />
              <strong>clear and meaningful.</strong>
            </h2>

            <p>
              When information is structured with purpose, every slide,
              diagram and visual summary helps the audience focus on what
              matters.
            </p>

            <div
              className="presentationInfographic-final-sequence"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </PresentationInfographicReveal>
      </section>
    </main>
  );
};

export default PresentationInfographicDesign;