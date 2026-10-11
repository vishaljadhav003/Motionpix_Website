
import React, { useEffect, useRef, useState } from "react";
import "./ExplainerContent.css";

const explainerServices = [
  {
    number: "01",
    title: "Product & Service Explainers",
    icon: "product",
    description:
      "Explain what a product or service does, how it works, and why it matters through a sequence of simple, connected visual scenes.",
    tags: ["PRODUCT", "FEATURES", "BENEFITS"],
  },
  {
    number: "02",
    title: "Business & Corporate Explainers",
    icon: "business",
    description:
      "Turn business models, company services, strategies and processes into structured stories that audiences can follow easily.",
    tags: ["BUSINESS", "PROCESS", "CLARITY"],
  },
  {
    number: "03",
    title: "Technical Explainer Animation",
    icon: "technical",
    description:
      "Break complex systems, technical workflows and abstract concepts into visual steps, diagrams and understandable demonstrations.",
    tags: ["SYSTEMS", "WORKFLOWS", "DETAILS"],
  },
  {
    number: "04",
    title: "Educational Explainers",
    icon: "education",
    description:
      "Present lessons, ideas and difficult subjects in logical visual sequences that support understanding and knowledge retention.",
    tags: ["LEARNING", "CONCEPTS", "KNOWLEDGE"],
  },
  {
    number: "05",
    title: "Character-Led Explainers",
    icon: "character",
    description:
      "Use characters, expressions and relatable situations to introduce a problem, demonstrate a solution and guide the audience through a story.",
    tags: ["CHARACTERS", "STORY", "EMOTION"],
  },
  {
    number: "06",
    title: "Infographic & Process Explainers",
    icon: "infographic",
    description:
      "Combine icons, labels, charts, diagrams and animated transitions to show relationships, stages, comparisons and important information.",
    tags: ["DATA", "DIAGRAMS", "STEPS"],
  },
];

const explainerProcess = [
  {
    number: "01",
    title: "Understand the Message",
    label: "DISCOVER",
    icon: "discover",
    description:
      "Identify the audience, the problem being explained, the key message and the action or understanding the story should communicate.",
    output: "Clear communication objective",
  },
  {
    number: "02",
    title: "Script & Storyboard",
    label: "PLAN",
    icon: "storyboard",
    description:
      "Organise the information into a beginning, middle and conclusion. Plan narration, scene order, visual examples and transitions.",
    output: "Script and scene-by-scene plan",
  },
  {
    number: "03",
    title: "Illustrate & Animate",
    label: "CREATE",
    icon: "animate",
    description:
      "Create the visual assets and animate them with purposeful movement, readable pacing, transitions and visual emphasis.",
    output: "Animated explainer sequence",
  },
  {
    number: "04",
    title: "Sound & Final Delivery",
    label: "REFINE",
    icon: "delivery",
    description:
      "Refine the timing, narration, music and sound effects, then prepare the finished video for its intended platform and format.",
    output: "Polished final video",
  },
];

const explainerBenefits = [
  {
    number: "01",
    title: "Make Complex Ideas Easier",
    description:
      "Turn unfamiliar concepts into smaller visual steps so viewers can understand how the parts connect.",
    icon: "clarity",
  },
  {
    number: "02",
    title: "Keep the Story Structured",
    description:
      "A clear beginning, explanation and conclusion help viewers follow the message without unnecessary detail.",
    icon: "story",
  },
  {
    number: "03",
    title: "Show What Words Cannot",
    description:
      "Visual demonstrations can reveal internal processes, invisible systems and product functions that are difficult to show in real life.",
    icon: "visual",
  },
  {
    number: "04",
    title: "Adapt to Different Audiences",
    description:
      "The script, visual style, pacing and level of detail can be adjusted for customers, employees, students or technical audiences.",
    icon: "audience",
  },
];

const explainerFaqs = [
  {
    question: "What is an explainer animation?",
    answer:
      "An explainer animation is a short, structured visual story designed to explain a product, service, process or idea. It can combine illustrations, text, icons, characters, narration, sound and movement to make the message easier to follow.",
  },
  {
    question: "How is an explainer different from a promotional video?",
    answer:
      "An explainer primarily focuses on understanding: what something is, how it works or why it matters. A promotional video primarily focuses on creating interest in a brand, product or offer. The two approaches can overlap when a project needs both explanation and promotion.",
  },
  {
    question: "What information is needed before production?",
    answer:
      "Useful inputs include the topic, target audience, communication goal, important facts, brand guidelines and preferred output format. Existing scripts, product information or reference material can also help establish the direction.",
  },
  {
    question: "Can technical or complicated subjects be explained?",
    answer:
      "Yes. A complex topic can be divided into logical stages, with each scene focusing on one idea. Diagrams, labels, visual comparisons and carefully paced narration can help communicate the relationships between those stages.",
  },
  {
    question: "Can narration, music and sound effects be included?",
    answer:
      "Yes. Narration can guide the explanation, while music and sound effects can support the pacing and transitions. They should reinforce the message rather than compete with the visual information.",
  },
  {
    question: "Where can explainer videos be used?",
    answer:
      "Explainer videos can be used on websites, in product demonstrations, presentations, training resources, educational platforms, internal communications and digital marketing campaigns.",
  },
];

function ExplainerIcon({ type }) {
  return (
    <span
      className={`explainer-content-icon explainer-content-icon--${type}`}
      aria-hidden="true"
    >
      {type === "product" && (
        <>
          <i className="eci-box" />
          <i className="eci-box-top" />
          <i className="eci-box-line" />
        </>
      )}

      {type === "business" && (
        <>
          <i className="eci-building" />
          <i className="eci-building-window eci-window-one" />
          <i className="eci-building-window eci-window-two" />
          <i className="eci-building-window eci-window-three" />
          <i className="eci-building-door" />
        </>
      )}

      {type === "technical" && (
        <>
          <i className="eci-node eci-node-one" />
          <i className="eci-node eci-node-two" />
          <i className="eci-node eci-node-three" />
          <i className="eci-connector eci-connector-one" />
          <i className="eci-connector eci-connector-two" />
        </>
      )}

      {type === "education" && (
        <>
          <i className="eci-book" />
          <i className="eci-book-center" />
          <i className="eci-book-line eci-book-line-one" />
          <i className="eci-book-line eci-book-line-two" />
        </>
      )}

      {type === "character" && (
        <>
          <i className="eci-face" />
          <i className="eci-eye eci-eye-one" />
          <i className="eci-eye eci-eye-two" />
          <i className="eci-smile" />
          <i className="eci-person-body" />
        </>
      )}

      {type === "infographic" && (
        <>
          <i className="eci-chart-bar eci-chart-bar-one" />
          <i className="eci-chart-bar eci-chart-bar-two" />
          <i className="eci-chart-bar eci-chart-bar-three" />
          <i className="eci-chart-line" />
        </>
      )}

      {type === "discover" && (
        <>
          <i className="eci-target-ring" />
          <i className="eci-target-dot" />
        </>
      )}

      {type === "storyboard" && (
        <>
          <i className="eci-story-frame eci-story-frame-one" />
          <i className="eci-story-frame eci-story-frame-two" />
          <i className="eci-story-play" />
        </>
      )}

      {type === "animate" && (
        <>
          <i className="eci-motion-circle" />
          <i className="eci-motion-square" />
          <i className="eci-motion-trail" />
        </>
      )}

      {type === "delivery" && (
        <>
          <i className="eci-delivery-screen" />
          <i className="eci-delivery-check" />
        </>
      )}

      {type === "clarity" && (
        <>
          <i className="eci-benefit-bulb" />
          <i className="eci-benefit-bulb-base" />
        </>
      )}

      {type === "story" && (
        <>
          <i className="eci-story-dot" />
          <i className="eci-story-path" />
          <i className="eci-story-end" />
        </>
      )}

      {type === "visual" && (
        <>
          <i className="eci-visual-eye" />
          <i className="eci-visual-center" />
        </>
      )}

      {type === "audience" && (
        <>
          <i className="eci-audience-head eci-audience-head-one" />
          <i className="eci-audience-head eci-audience-head-two" />
          <i className="eci-audience-head eci-audience-head-three" />
          <i className="eci-audience-body" />
        </>
      )}
    </span>
  );
}

function ExplainerReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("explainer-content-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("explainer-content-is-visible");
        } else {
          element.classList.remove("explainer-content-is-visible");
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
        "explainer-content-reveal",
        `explainer-content-reveal--${direction}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ "--explainer-content-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ExplainerHeroVisual() {
  return (
    <div
      className="explainer-content-visual"
      role="img"
      aria-label="Animated explainer illustration showing a problem, a visual explanation, a solution, and a production timeline"
    >
      <div className="explainer-content-visual-top">
        <span className="explainer-content-live">
          <i />
          EXPLAINER LAB
        </span>
        <span className="explainer-content-scene-count">
          STORY / 001
        </span>
      </div>

      <div className="explainer-content-scene">
        <div className="explainer-content-scene-grid" />

        <div className="explainer-content-scene-heading">
          <span>FROM QUESTION</span>
          <i />
          <span>TO CLARITY</span>
        </div>

        <div className="explainer-content-story">
          <div className="explainer-content-story-card explainer-content-problem">
            <span className="explainer-content-card-index">01</span>
            <span className="explainer-content-question">?</span>
            <strong>THE PROBLEM</strong>
            <small>Understand the challenge</small>
          </div>

          <div className="explainer-content-story-connector">
            <i />
            <span>EXPLAIN</span>
            <i />
          </div>

          <div className="explainer-content-story-card explainer-content-solution">
            <span className="explainer-content-card-index">02</span>
            <div className="explainer-content-solution-mark">
              <i />
              <i />
              <i />
            </div>
            <strong>THE SOLUTION</strong>
            <small>Show how it works</small>
          </div>
        </div>

        <div className="explainer-content-scene-caption">
          <span className="explainer-content-caption-dot" />
          ONE IDEA. CLEAR VISUAL STEPS.
        </div>
      </div>

      <div className="explainer-content-visual-footer">
        <div className="explainer-content-timeline-label">
          <span>SCENE TIMELINE</span>
          <span>00:00 — 00:30</span>
        </div>

        <div className="explainer-content-timeline">
          <span className="explainer-content-track-block track-problem" />
          <span className="explainer-content-track-block track-explain" />
          <span className="explainer-content-track-block track-solution" />
          <span className="explainer-content-track-block track-finish" />
          <i className="explainer-content-playhead" />
        </div>

        <div className="explainer-content-timeline-legend">
          <span>PROBLEM</span>
          <span>EXPLANATION</span>
          <span>SOLUTION</span>
        </div>
      </div>
    </div>
  );
}

export default function ExplainerContent() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="explainer-content-page">
      <section className="explainer-content-hero">
        <div className="explainer-content-hero-inner">
          <ExplainerReveal
            direction="left"
            className="explainer-content-hero-copy"
          >
            <span className="explainer-content-eyebrow">
              EXPLAIN / SIMPLIFY / CONNECT
            </span>

            <h1>
              Complex ideas.
              <br />
              <span>Clear stories.</span>
            </h1>

            <p>
              Explainer animation transforms products, services,
              processes and complex concepts into clear visual stories.
              Through planned scenes, illustrations, movement and sound,
              it helps an audience understand not just what something is,
              but how it works and why it matters.
            </p>

            <div className="explainer-content-hero-tags">
              <span>Understand</span>
              <i />
              <span>Visualise</span>
              <i />
              <span>Explain</span>
            </div>

            <div className="explainer-content-hero-note">
              <span className="explainer-content-note-symbol">↳</span>
              <p>
                Every scene has a purpose. Every movement supports
                the message.
              </p>
            </div>
          </ExplainerReveal>

          <ExplainerReveal
            direction="right"
            delay={120}
            className="explainer-content-hero-art"
          >
            <ExplainerHeroVisual />
          </ExplainerReveal>
        </div>
      </section>

      <section className="explainer-content-section explainer-content-services">
        <div className="explainer-content-container">
          <ExplainerReveal direction="up">
            <div className="explainer-content-section-heading">
              <span>WHAT CAN BE EXPLAINED</span>
              <h2>
                Give every idea
                <br />
                <strong>a visual language.</strong>
              </h2>
              <p>
                Different subjects need different ways of explaining.
                The visual approach follows the topic, the audience and
                the information that needs to be understood.
              </p>
            </div>
          </ExplainerReveal>

          <div className="explainer-content-service-list">
            {explainerServices.map((service, index) => (
              <ExplainerReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="explainer-content-service-wrap"
              >
                <article className="explainer-content-service-card">
                  <span className="explainer-content-service-number">
                    {service.number}
                  </span>

                  <ExplainerIcon type={service.icon} />

                  <div className="explainer-content-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="explainer-content-tags">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <span
                    className="explainer-content-service-mark"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              </ExplainerReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="explainer-content-section explainer-content-process">
        <div className="explainer-content-container">
          <ExplainerReveal direction="left">
            <div className="explainer-content-process-intro">
              <span>HOW AN EXPLAINER IS BUILT</span>
              <h2>
                From a question
                <br />
                <strong>to understanding.</strong>
              </h2>
              <p>
                A clear explainer is built in stages. The message is
                defined first, then organised into a story, visualised,
                animated and refined for delivery.
              </p>
            </div>
          </ExplainerReveal>

          <div className="explainer-content-process-list">
            {explainerProcess.map((step, index) => (
              <ExplainerReveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 75}
                className="explainer-content-process-item"
              >
                <div className="explainer-content-process-marker">
                  <span>{step.number}</span>
                </div>

                <article className="explainer-content-process-card">
                  <div className="explainer-content-process-topline">
                    <span>{step.label}</span>
                    <ExplainerIcon type={step.icon} />
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <div className="explainer-content-process-output">
                    <span>OUTPUT</span>
                    <strong>{step.output}</strong>
                  </div>
                </article>
              </ExplainerReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="explainer-content-section explainer-content-benefits">
        <div className="explainer-content-container">
          <ExplainerReveal direction="right">
            <div className="explainer-content-section-heading">
              <span>WHY EXPLAINER ANIMATION</span>
              <h2>
                Clarity is the
                <br />
                <strong>real outcome.</strong>
              </h2>
              <p>
                Animation is more than movement. When every visual,
                transition and sentence serves a purpose, the explanation
                becomes easier to follow.
              </p>
            </div>
          </ExplainerReveal>

          <div className="explainer-content-benefit-list">
            {explainerBenefits.map((benefit, index) => (
              <ExplainerReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="explainer-content-benefit">
                  <span className="explainer-content-benefit-number">
                    {benefit.number}
                  </span>

                  <ExplainerIcon type={benefit.icon} />

                  <div className="explainer-content-benefit-copy">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <span
                    className="explainer-content-benefit-line"
                    aria-hidden="true"
                  />
                </article>
              </ExplainerReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="explainer-content-section explainer-content-faq">
        <div className="explainer-content-container">
          <ExplainerReveal direction="up">
            <div className="explainer-content-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Understand the
                <br />
                <strong>explainer process.</strong>
              </h2>
              <p>
                Answers to common questions about planning, creating
                and using explainer animations.
              </p>
            </div>
          </ExplainerReveal>

          <div className="explainer-content-faq-list">
            {explainerFaqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `explainer-content-answer-${index}`;

              return (
                <ExplainerReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={(index % 3) * 60}
                >
                  <article
                    className={`explainer-content-faq-item ${
                      isActive ? "explainer-content-faq-item--active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="explainer-content-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span className="explainer-content-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        {faq.question}
                      </span>
                      <span
                        className="explainer-content-faq-toggle"
                        aria-hidden="true"
                      >
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className="explainer-content-faq-answer"
                      id={answerId}
                      aria-hidden={!isActive}
                    >
                      <div>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </article>
                </ExplainerReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="explainer-content-final">
        <ExplainerReveal direction="up">
          <div className="explainer-content-final-inner">
            <span>THE IDEA BEHIND EVERY EXPLAINER</span>

            <h2>
              Less confusion.
              <br />
              <strong>More understanding.</strong>
            </h2>

            <p>
              When a story is structured well and every scene explains
              something meaningful, complicated information becomes a
              visual experience people can follow.
            </p>

            <div className="explainer-content-final-sequence" aria-hidden="true">
              <span />
              <i>IDEA</i>
              <span />
              <i>VISUAL</i>
              <span />
              <i>CLARITY</i>
              <span />
            </div>
          </div>
        </ExplainerReveal>
      </section>
    </main>
  );
}