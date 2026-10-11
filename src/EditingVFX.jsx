import React, { useEffect, useRef, useState } from "react";
import "./EditingVFX.css";

const editingServices = [
  {
    number: "01",
    title: "Video Editing",
    description:
      "Raw footage is transformed into a polished visual sequence through precise cuts, pacing, transitions and narrative structure that keeps every moment purposeful.",
    icon: "editing",
  },
  {
    number: "02",
    title: "Color Grading",
    description:
      "Colour, contrast, highlights and shadows are carefully refined to establish the right cinematic mood, visual consistency and brand identity.",
    icon: "color",
  },
  {
    number: "03",
    title: "Visual Effects",
    description:
      "VFX elements, compositing, screen replacements and visual enhancements are integrated naturally to create visuals that would be difficult or impossible to capture practically.",
    icon: "vfx",
  },
  {
    number: "04",
    title: "Motion Graphics",
    description:
      "Titles, typography, graphical elements, transitions and animated visual systems are designed to make information engaging without distracting from the story.",
    icon: "motion",
  },
  {
    number: "05",
    title: "Compositing",
    description:
      "Multiple visual layers are combined, refined and blended together with controlled lighting, depth, masking and effects to create a seamless final composition.",
    icon: "compositing",
  },
  {
    number: "06",
    title: "Cinematic Finishing",
    description:
      "The final sequence is refined through sound-aware timing, visual cleanup, colour consistency and export preparation for professional digital delivery.",
    icon: "finishing",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Footage & Direction",
    description:
      "We understand the footage, creative direction, audience, platform and desired visual language before the edit begins.",
  },
  {
    number: "02",
    title: "Edit & Structure",
    description:
      "Shots are selected, arranged and refined to establish rhythm, continuity, storytelling and the intended emotional progression.",
  },
  {
    number: "03",
    title: "Effects & Finish",
    description:
      "Visual effects, motion graphics, colour grading, compositing and detailed visual refinements are applied to strengthen the final sequence.",
  },
  {
    number: "04",
    title: "Review & Delivery",
    description:
      "The finished video is reviewed, refined and prepared in the required resolution, aspect ratio and delivery format.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Sharper Storytelling",
    description:
      "Strong editing removes distractions, controls pacing and gives every shot a clear purpose within the overall story.",
  },
  {
    number: "02",
    title: "Cinematic Visual Language",
    description:
      "Colour, composition, transitions, effects and timing work together to create a consistent and memorable visual experience.",
  },
  {
    number: "03",
    title: "Enhanced Production Value",
    description:
      "Professional editing, compositing and VFX can elevate raw footage into polished content with greater visual depth and impact.",
  },
  {
    number: "04",
    title: "Platform-Ready Content",
    description:
      "Final videos can be adapted for websites, campaigns, social platforms, presentations, corporate communication and digital media.",
  },
];

const faqs = [
  {
    question: "What type of videos can you edit?",
    answer:
      "We can work on corporate films, promotional videos, product videos, social media content, event films, brand stories, educational content, presentations and other digital video formats.",
  },
  {
    question: "Can editing, VFX and motion graphics be combined?",
    answer:
      "Yes. Editing, VFX, compositing, motion graphics and colour grading can be combined within the same project so that every visual element supports one consistent creative direction.",
  },
  {
    question: "Can you work with raw footage provided by the client?",
    answer:
      "Yes. Raw footage can be reviewed, organised and transformed into a structured final edit according to the required message, duration, platform and visual style.",
  },
  {
    question: "What type of VFX work can be included?",
    answer:
      "Depending on the project, VFX can include compositing, screen replacement, object removal, visual enhancements, atmospheric effects, graphic integration and other required visual treatments.",
  },
  {
    question: "Can the same video be prepared for different platforms?",
    answer:
      "Yes. The final content can be adapted into suitable resolutions and aspect ratios for websites, presentations, landscape video, vertical social content and other digital platforms.",
  },
];

const EditingVFXIcon = ({ type }) => {
  return (
    <div className={`editingvfx-icon editingvfx-icon--${type}`}>
      {type === "editing" && (
        <>
          <span className="editingvfx-icon-film" />
          <span className="editingvfx-icon-cut" />
          <span className="editingvfx-icon-track editingvfx-icon-track-one" />
          <span className="editingvfx-icon-track editingvfx-icon-track-two" />
        </>
      )}

      {type === "color" && (
        <>
          <span className="editingvfx-color-wheel" />
          <span className="editingvfx-color-dot editingvfx-color-dot-one" />
          <span className="editingvfx-color-dot editingvfx-color-dot-two" />
          <span className="editingvfx-color-dot editingvfx-color-dot-three" />
        </>
      )}

      {type === "vfx" && (
        <>
          <span className="editingvfx-vfx-frame" />
          <span className="editingvfx-vfx-spark editingvfx-vfx-spark-one" />
          <span className="editingvfx-vfx-spark editingvfx-vfx-spark-two" />
          <span className="editingvfx-vfx-spark editingvfx-vfx-spark-three" />
        </>
      )}

      {type === "motion" && (
        <>
          <span className="editingvfx-motion-box editingvfx-motion-box-one" />
          <span className="editingvfx-motion-box editingvfx-motion-box-two" />
          <span className="editingvfx-motion-line" />
          <span className="editingvfx-motion-dot" />
        </>
      )}

      {type === "compositing" && (
        <>
          <span className="editingvfx-comp-layer editingvfx-comp-layer-one" />
          <span className="editingvfx-comp-layer editingvfx-comp-layer-two" />
          <span className="editingvfx-comp-layer editingvfx-comp-layer-three" />
          <span className="editingvfx-comp-cross" />
        </>
      )}

      {type === "finishing" && (
        <>
          <span className="editingvfx-finish-circle" />
          <span className="editingvfx-finish-check" />
          <span className="editingvfx-finish-line editingvfx-finish-line-one" />
          <span className="editingvfx-finish-line editingvfx-finish-line-two" />
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
      className={`editingvfx-reveal editingvfx-reveal--${direction} ${className}`}
      style={{ "--editingvfx-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const EditingVFX = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="editingvfx-page">
      {/* HERO */}
      <section className="editingvfx-hero">
        <div className="editingvfx-hero-inner">
          <Reveal
            direction="left"
            className="editingvfx-hero-content"
          >
            <span className="editingvfx-eyebrow">
              EDITING / VFX STUDIO
            </span>

            <h1>
              Cut With
              <span> Purpose.</span>
              <br />
              Finish With
              <span> Impact.</span>
            </h1>

            <p>
              We transform raw footage into polished visual experiences
              through precise editing, cinematic colour, motion graphics,
              compositing and visual effects. Every cut, frame and effect is
              designed to strengthen the story.
            </p>

            <div className="editingvfx-hero-meta">
              <span>Edit</span>
              <i />
              <span>Colour</span>
              <i />
              <span>Effects</span>
              <i />
              <span>Finish</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="editingvfx-hero-visual"
          >
            <div className="editingvfx-stage">
              <div className="editingvfx-stage-label">
                <span>EDIT / VFX</span>
                <strong>024</strong>
              </div>

              <div className="editingvfx-viewfinder">
                <span className="editingvfx-corner editingvfx-corner-tl" />
                <span className="editingvfx-corner editingvfx-corner-tr" />
                <span className="editingvfx-corner editingvfx-corner-bl" />
                <span className="editingvfx-corner editingvfx-corner-br" />

                <div className="editingvfx-subject">
                  <div className="editingvfx-subject-head" />
                  <div className="editingvfx-subject-body" />
                </div>

                <div className="editingvfx-focus-ring">
                  <span />
                </div>

                <div className="editingvfx-focus-crosshair">
                  <i />
                  <i />
                </div>
              </div>

              <div className="editingvfx-rec">
                <span />
                REC
              </div>

              <div className="editingvfx-timecode">
                00:24:18:07
              </div>

              <div className="editingvfx-layer-card editingvfx-layer-card-one">
                <span>VFX</span>
                <i />
              </div>

              <div className="editingvfx-layer-card editingvfx-layer-card-two">
                <span>COLOR</span>
                <i />
              </div>

              <div className="editingvfx-timeline">
                <div className="editingvfx-timeline-head">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                  <span>06</span>
                </div>

                <div className="editingvfx-timeline-track">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="editingvfx-timeline-playhead" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="editingvfx-section editingvfx-services"
        id="editingvfx-services"
      >
        <div className="editingvfx-container">
          <Reveal direction="left">
            <div className="editingvfx-section-heading">
              <span>WHAT WE CREATE</span>

              <h2>
                Every cut creates
                <strong> meaning.</strong>
              </h2>

              <p>
                From raw footage to the final master, our editing and VFX
                workflow combines storytelling, visual design, effects and
                technical precision to create polished content.
              </p>
            </div>
          </Reveal>

          <div className="editingvfx-services-list">
            {editingServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="editingvfx-service-wrap"
              >
                <article className="editingvfx-service-card">
                  <div className="editingvfx-service-number">
                    {service.number}
                  </div>

                  <EditingVFXIcon type={service.icon} />

                  <div className="editingvfx-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="editingvfx-service-arrow">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="editingvfx-section editingvfx-process">
        <div className="editingvfx-container">
          <Reveal direction="right">
            <div className="editingvfx-process-intro">
              <span>THE EDITING & VFX PROCESS</span>

              <h2>
                From raw footage
                <strong> to final frame.</strong>
              </h2>

              <p>
                A structured post-production workflow keeps the story focused,
                the visuals consistent and every finishing decision
                intentional.
              </p>
            </div>
          </Reveal>

          <div className="editingvfx-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 100}
                className="editingvfx-process-item"
              >
                <div className="editingvfx-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="editingvfx-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="editingvfx-section editingvfx-benefits">
        <div className="editingvfx-container">
          <Reveal direction="left">
            <div className="editingvfx-section-heading">
              <span>WHY EDITING & VFX</span>

              <h2>
                Built to make
                <strong> visuals matter.</strong>
              </h2>

              <p>
                Professional post-production gives control over pacing,
                atmosphere, visual hierarchy and storytelling — turning
                footage into communication with stronger impact.
              </p>
            </div>
          </Reveal>

          <div className="editingvfx-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
              >
                <article className="editingvfx-benefit">
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
      <section className="editingvfx-section editingvfx-faq">
        <div className="editingvfx-container">
          <Reveal direction="right">
            <div className="editingvfx-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> workflow.</strong>
              </h2>

              <p>
                A few practical details about editing, visual effects,
                compositing and final delivery.
              </p>
            </div>
          </Reveal>

          <div className="editingvfx-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`editingvfx-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="editingvfx-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="editingvfx-faq-answer">
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
      <section className="editingvfx-final">
        <Reveal direction="left">
          <div className="editingvfx-final-inner">
            <span>THE FINAL CUT</span>

            <h2>
              Great post-production
              <br />
              <strong>makes every frame count.</strong>
            </h2>

            <p>
              It is not only about cutting footage or adding effects. It is
              about controlling rhythm, emotion, atmosphere and visual impact
              until the story feels complete.
            </p>

            <div className="editingvfx-final-line">
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

export default EditingVFX;