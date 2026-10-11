import React, { useEffect, useRef, useState } from "react";
import "./EventContent.css";

const eventContentServices = [
  {
    number: "01",
    title: "Event Concept & Theme",
    description:
      "We develop a visual direction around the event's purpose, audience and message. Theme, colour language, typography and creative elements work together to build a consistent event experience.",
    icon: "concept",
  },
  {
    number: "02",
    title: "Event Branding & Identity",
    description:
      "Event logos, visual systems, screen layouts, titles and branded graphics create a recognisable identity across the venue, presentations and digital event touchpoints.",
    icon: "branding",
  },
  {
    number: "03",
    title: "Stage & LED Screen Content",
    description:
      "Large-format stage visuals, LED wall compositions, animated backgrounds and screen transitions are designed around the venue layout and the live event's visual requirements.",
    icon: "stage",
  },
  {
    number: "04",
    title: "Event Motion Graphics",
    description:
      "Animated titles, speaker introductions, countdowns, transitions, name straps and graphical sequences bring visual rhythm and clarity to the event programme.",
    icon: "motion",
  },
  {
    number: "05",
    title: "Conference & Presentation Content",
    description:
      "Speaker decks, session openers, presentation graphics, data visuals and branded slides help communicate key messages clearly during conferences, seminars and corporate events.",
    icon: "presentation",
  },
  {
    number: "06",
    title: "Live Event & Social Content",
    description:
      "Event announcements, highlight graphics, audience-facing screen content and short-form promotional assets help maintain a consistent visual identity before, during and after an event.",
    icon: "live",
  },
];

const eventContentProcess = [
  {
    number: "01",
    title: "Brief & Event Direction",
    description:
      "We understand the event objective, audience, venue, programme, visual requirements and expected screen formats before defining the content direction.",
  },
  {
    number: "02",
    title: "Concept & Storyboarding",
    description:
      "Visual references, key frames, content sequences and design layouts establish how the event's identity and message will appear across the experience.",
  },
  {
    number: "03",
    title: "Design & Motion Production",
    description:
      "Graphics, presentation assets, animated sequences and screen compositions are created with consistent branding, readable typography and purposeful motion.",
  },
  {
    number: "04",
    title: "Review & Final Delivery",
    description:
      "Content is reviewed and organised for the required resolutions, aspect ratios, playback formats and event programme requirements.",
  },
];

const eventContentBenefits = [
  {
    number: "01",
    title: "One Consistent Event Identity",
    description:
      "A connected visual language keeps stage screens, presentations, event graphics and promotional content aligned.",
  },
  {
    number: "02",
    title: "Clearer Audience Communication",
    description:
      "Structured layouts, readable typography and purposeful visual hierarchy help audiences follow the programme and understand important messages.",
  },
  {
    number: "03",
    title: "Stronger Stage Presence",
    description:
      "Well-composed LED visuals, animated titles and coordinated transitions make the stage presentation feel more cohesive and considered.",
  },
  {
    number: "04",
    title: "Content Built for Its Format",
    description:
      "Visual assets can be planned for wide LED walls, presentation screens, social media, digital announcements and other specified event formats.",
  },
];

const eventContentFaqs = [
  {
    question: "What is included in event content creation?",
    answer:
      "Depending on the brief, event content can include visual themes, event branding, LED screen graphics, stage backgrounds, animated titles, speaker introductions, countdowns, presentation slides, transitions and promotional assets.",
  },
  {
    question: "Can content be designed for LED walls and large screens?",
    answer:
      "Yes. Content can be planned around the supplied screen dimensions, aspect ratio, resolution and layout requirements. Final specifications should be confirmed with the venue or technical production team.",
  },
  {
    question: "Can event branding and motion graphics work together?",
    answer:
      "Yes. Event identity elements such as typography, colours and graphic patterns can be carried into animated titles, transitions, stage visuals and presentation layouts.",
  },
  {
    question: "Can you create content for conferences and corporate events?",
    answer:
      "Yes. The content can include session openers, speaker title cards, branded presentations, agenda screens, information graphics and other visual assets appropriate to the event.",
  },
  {
    question: "What information is needed before production starts?",
    answer:
      "A useful starting brief includes the event objective, audience, theme, schedule, brand guidelines, venue or screen specifications, required deliverables and final delivery formats.",
  },
];

const eventContentPreviews = [
  {
    id: "stage",
    number: "01",
    label: "LED Stage",
    subtitle: "IMMERSIVE STAGE VISUALS",
    title: "A Stage That Speaks",
    description:
      "Large-format graphics, ambient motion and event-led visual compositions designed to complement the live stage.",
    tag: "STAGE / LED / MOTION",
    type: "stage",
  },
  {
    id: "conference",
    number: "02",
    label: "Conference",
    subtitle: "CORPORATE EVENT CONTENT",
    title: "Ideas in Focus",
    description:
      "Clear session screens, speaker titles, agenda layouts and presentation graphics built around the event identity.",
    tag: "SPEAKERS / SESSIONS / DATA",
    type: "conference",
  },
  {
    id: "launch",
    number: "03",
    label: "Brand Launch",
    subtitle: "BRAND REVEAL EXPERIENCE",
    title: "Make the Moment",
    description:
      "Bold reveal graphics, countdown sequences and branded motion designed to build anticipation around a launch.",
    tag: "REVEAL / IDENTITY / IMPACT",
    type: "launch",
  },
];

const EventContentIcon = ({ type }) => {
  return (
    <div
      className={`eventContent-icon eventContent-icon--${type}`}
      aria-hidden="true"
    >
      {type === "concept" && (
        <>
          <span className="eventContent-icon-concept-ring" />
          <span className="eventContent-icon-concept-core" />
          <span className="eventContent-icon-concept-dot eventContent-icon-concept-dot--one" />
          <span className="eventContent-icon-concept-dot eventContent-icon-concept-dot--two" />
          <span className="eventContent-icon-concept-dot eventContent-icon-concept-dot--three" />
        </>
      )}

      {type === "branding" && (
        <>
          <span className="eventContent-icon-brand-frame" />
          <span className="eventContent-icon-brand-letter">E</span>
          <span className="eventContent-icon-brand-line eventContent-icon-brand-line--one" />
          <span className="eventContent-icon-brand-line eventContent-icon-brand-line--two" />
        </>
      )}

      {type === "stage" && (
        <>
          <span className="eventContent-icon-stage-top" />
          <span className="eventContent-icon-stage-screen" />
          <span className="eventContent-icon-stage-base" />
          <span className="eventContent-icon-stage-light eventContent-icon-stage-light--one" />
          <span className="eventContent-icon-stage-light eventContent-icon-stage-light--two" />
        </>
      )}

      {type === "motion" && (
        <>
          <span className="eventContent-icon-motion-shape eventContent-icon-motion-shape--one" />
          <span className="eventContent-icon-motion-shape eventContent-icon-motion-shape--two" />
          <span className="eventContent-icon-motion-shape eventContent-icon-motion-shape--three" />
          <span className="eventContent-icon-motion-trail" />
        </>
      )}

      {type === "presentation" && (
        <>
          <span className="eventContent-icon-presentation-screen" />
          <span className="eventContent-icon-presentation-line eventContent-icon-presentation-line--one" />
          <span className="eventContent-icon-presentation-line eventContent-icon-presentation-line--two" />
          <span className="eventContent-icon-presentation-bar eventContent-icon-presentation-bar--one" />
          <span className="eventContent-icon-presentation-bar eventContent-icon-presentation-bar--two" />
          <span className="eventContent-icon-presentation-bar eventContent-icon-presentation-bar--three" />
          <span className="eventContent-icon-presentation-stand" />
        </>
      )}

      {type === "live" && (
        <>
          <span className="eventContent-icon-live-ring" />
          <span className="eventContent-icon-live-core" />
          <span className="eventContent-icon-live-wave eventContent-icon-live-wave--one" />
          <span className="eventContent-icon-live-wave eventContent-icon-live-wave--two" />
        </>
      )}
    </div>
  );
};

const EventContentReveal = ({
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
      element.classList.add("eventContent-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("eventContent-is-visible");
        } else {
          element.classList.remove("eventContent-is-visible");
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
        "eventContent-reveal",
        `eventContent-reveal--${direction}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--eventContent-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const EventContent = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activePreview, setActivePreview] = useState("stage");

  const selectedPreview =
    eventContentPreviews.find((preview) => preview.id === activePreview) ||
    eventContentPreviews[0];

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="eventContent-page">
      {/* HERO */}
      <section className="eventContent-hero">
        <div className="eventContent-hero-inner">
          <EventContentReveal
            direction="left"
            className="eventContent-hero-copy"
          >
            <span className="eventContent-eyebrow">
              EVENT CONTENT / CREATIVE STUDIO
            </span>

            <h1>
              Every Event.
              <br />
              <span>One Visual</span>
              <br />
              Experience.
            </h1>

            <p>
              We create event-focused visual content that connects a theme,
              brand and live audience through thoughtful design, screen
              graphics and motion. From stage visuals to speaker presentations,
              every asset is created to support the event's message and
              atmosphere.
            </p>

            <div className="eventContent-hero-meta">
              <span>Concept</span>
              <i />
              <span>Design</span>
              <i />
              <span>Motion</span>
              <i />
              <span>Delivery</span>
            </div>
          </EventContentReveal>

          <EventContentReveal
            direction="right"
            delay={120}
            className="eventContent-hero-visual"
          >
            <div className="eventContent-stage">
              <div className="eventContent-stage-topline">
                <span>EVENT VISUAL SYSTEM</span>
                <span className="eventContent-stage-live">
                  <i />
                  LIVE READY
                </span>
              </div>

              <div className="eventContent-stage-halo eventContent-stage-halo--one" />
              <div className="eventContent-stage-halo eventContent-stage-halo--two" />

              <div className="eventContent-stage-beam eventContent-stage-beam--one" />
              <div className="eventContent-stage-beam eventContent-stage-beam--two" />

              <div className="eventContent-stage-screen">
                <span className="eventContent-stage-screen-kicker">
                  THE EXPERIENCE
                </span>

                <div className="eventContent-stage-screen-mark">
                  <span />
                  <span />
                  <span />
                </div>

                <h2>
                  CREATE
                  <br />
                  <strong>THE MOMENT</strong>
                </h2>

                <div className="eventContent-stage-screen-bottom">
                  <span>DESIGN / VISUALS / STORY</span>
                  <span>EC—024</span>
                </div>
              </div>

              <div className="eventContent-stage-side eventContent-stage-side--left">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="eventContent-stage-side eventContent-stage-side--right">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="eventContent-stage-platform">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="eventContent-stage-audience">
                {Array.from({ length: 13 }, (_, index) => (
                  <span key={index} />
                ))}
              </div>

              <div className="eventContent-stage-caption">
                <span>01 / VISUAL DIRECTION</span>
                <span>BUILT FOR THE ROOM</span>
              </div>
            </div>
          </EventContentReveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="eventContent-section eventContent-services"
        id="event-content-services"
      >
        <div className="eventContent-container">
          <EventContentReveal direction="up">
            <div className="eventContent-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Content built
                <strong> for the occasion.</strong>
              </h2>

              <p>
                Every event has a different audience, environment and message.
                We create visual content that reflects the brief and connects
                the full event experience through a consistent design language.
              </p>
            </div>
          </EventContentReveal>

          <div className="eventContent-services-list">
            {eventContentServices.map((service, index) => (
              <EventContentReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="eventContent-service-wrap"
              >
                <article className="eventContent-service-card">
                  <span className="eventContent-service-number">
                    {service.number}
                  </span>

                  <EventContentIcon type={service.icon} />

                  <div className="eventContent-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span
                    className="eventContent-service-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              </EventContentReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE CONTENT PREVIEW */}
      <section className="eventContent-section eventContent-experience">
        <div className="eventContent-container">
          <EventContentReveal direction="right">
            <div className="eventContent-section-heading">
              <span>EXPLORE THE EXPERIENCE</span>

              <h2>
                One creative approach.
                <strong> Different stages.</strong>
              </h2>

              <p>
                Explore how the visual direction changes across different
                event settings. Select a format to preview a conceptual
                content direction.
              </p>
            </div>
          </EventContentReveal>

          <div className="eventContent-explorer">
            <EventContentReveal
              direction="left"
              className="eventContent-explorer-controls"
            >
              <span className="eventContent-explorer-label">
                CHOOSE AN EVENT FORMAT
              </span>

              <div
                className="eventContent-preview-tabs"
                role="tablist"
                aria-label="Event content formats"
              >
                {eventContentPreviews.map((preview) => (
                  <button
                    key={preview.id}
                    type="button"
                    role="tab"
                    id={`eventContent-tab-${preview.id}`}
                    aria-selected={activePreview === preview.id}
                    aria-controls="eventContent-preview-panel"
                    className={
                      activePreview === preview.id
                        ? "eventContent-preview-tab is-active"
                        : "eventContent-preview-tab"
                    }
                    onClick={() => setActivePreview(preview.id)}
                  >
                    <span>{preview.number}</span>
                    <strong>{preview.label}</strong>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>

              <div className="eventContent-explorer-note">
                <span className="eventContent-explorer-note-mark">+</span>
                <p>
                  Each format is planned around its screen layout, audience,
                  event identity and content requirements.
                </p>
              </div>
            </EventContentReveal>

            <EventContentReveal
              direction="right"
              delay={100}
              className="eventContent-explorer-preview"
            >
              <div
                id="eventContent-preview-panel"
                role="tabpanel"
                aria-labelledby={`eventContent-tab-${selectedPreview.id}`}
                className={`eventContent-preview eventContent-preview--${selectedPreview.type}`}
                key={selectedPreview.id}
              >
                <div className="eventContent-preview-top">
                  <span>{selectedPreview.subtitle}</span>
                  <span>{selectedPreview.number} / 03</span>
                </div>

                <div className="eventContent-preview-art">
                  <span className="eventContent-preview-orbit eventContent-preview-orbit--one" />
                  <span className="eventContent-preview-orbit eventContent-preview-orbit--two" />

                  <span className="eventContent-preview-corner eventContent-preview-corner--tl" />
                  <span className="eventContent-preview-corner eventContent-preview-corner--tr" />
                  <span className="eventContent-preview-corner eventContent-preview-corner--bl" />
                  <span className="eventContent-preview-corner eventContent-preview-corner--br" />

                  <div className="eventContent-preview-content">
                    <span className="eventContent-preview-kicker">
                      {selectedPreview.tag}
                    </span>

                    <h3>{selectedPreview.title}</h3>

                    <div className="eventContent-preview-rule">
                      <span />
                      <span />
                      <span />
                    </div>

                    <span className="eventContent-preview-edition">
                      EVENT CONTENT / CREATIVE DIRECTION
                    </span>
                  </div>

                  <div className="eventContent-preview-grid-lines" />
                </div>

                <div className="eventContent-preview-description">
                  <span className="eventContent-preview-index">
                    {selectedPreview.number}
                  </span>

                  <p>{selectedPreview.description}</p>
                </div>

                <div className="eventContent-preview-footer">
                  <span>CONCEPT PREVIEW</span>
                  <span className="eventContent-preview-footer-dot" />
                  <span>VISUAL SYSTEM</span>
                </div>
              </div>
            </EventContentReveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="eventContent-section eventContent-process">
        <div className="eventContent-container">
          <EventContentReveal direction="left">
            <div className="eventContent-process-intro">
              <span>THE CREATIVE PROCESS</span>

              <h2>
                From the brief
                <strong> to the big moment.</strong>
              </h2>

              <p>
                A clear production workflow helps keep event content aligned
                with the creative direction, venue specifications and final
                delivery requirements.
              </p>
            </div>
          </EventContentReveal>

          <div className="eventContent-process-line">
            {eventContentProcess.map((step, index) => (
              <EventContentReveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 80}
                className="eventContent-process-item"
              >
                <div className="eventContent-process-marker">
                  <span>{step.number}</span>
                </div>

                <article className="eventContent-process-card">
                  <div className="eventContent-process-card-top">
                    <span>PHASE {step.number}</span>
                    <span aria-hidden="true">↗</span>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </EventContentReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="eventContent-section eventContent-benefits">
        <div className="eventContent-container">
          <EventContentReveal direction="right">
            <div className="eventContent-section-heading">
              <span>WHY EVENT CONTENT MATTERS</span>

              <h2>
                Details that shape
                <strong> the experience.</strong>
              </h2>

              <p>
                Thoughtful event content brings structure to visual
                communication and helps each on-screen element support the
                event's purpose.
              </p>
            </div>
          </EventContentReveal>

          <div className="eventContent-benefit-list">
            {eventContentBenefits.map((benefit, index) => (
              <EventContentReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="eventContent-benefit">
                  <span className="eventContent-benefit-number">
                    {benefit.number}
                  </span>

                  <div className="eventContent-benefit-copy">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <span
                    className="eventContent-benefit-mark"
                    aria-hidden="true"
                  />
                </article>
              </EventContentReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="eventContent-section eventContent-faq">
        <div className="eventContent-container">
          <EventContentReveal direction="up">
            <div className="eventContent-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                The details behind
                <strong> event content.</strong>
              </h2>

              <p>
                Helpful information about planning, designing and preparing
                visual content for event environments.
              </p>
            </div>
          </EventContentReveal>

          <div className="eventContent-faq-list">
            {eventContentFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <EventContentReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={(index % 3) * 60}
                >
                  <article
                    className={
                      isActive
                        ? "eventContent-faq-item is-active"
                        : "eventContent-faq-item"
                    }
                  >
                    <button
                      type="button"
                      className="eventContent-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={`eventContent-faq-answer-${index}`}
                    >
                      <span className="eventContent-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        <span>{faq.question}</span>
                      </span>

                      <span
                        className="eventContent-faq-toggle"
                        aria-hidden="true"
                      >
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      id={`eventContent-faq-answer-${index}`}
                      className="eventContent-faq-answer"
                      aria-hidden={!isActive}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                </EventContentReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="eventContent-final">
        <EventContentReveal direction="up">
          <div className="eventContent-final-inner">
            <span>THE EVENT EXPERIENCE</span>

            <h2>
              Make every
              <br />
              <strong>moment meaningful.</strong>
            </h2>

            <p>
              Great event content does more than fill a screen. It connects
              the message, the environment and the audience into one
              considered visual experience.
            </p>

            <div className="eventContent-final-sequence" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </EventContentReveal>
      </section>
    </main>
  );
};

export default EventContent;