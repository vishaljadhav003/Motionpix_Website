
import React, { useEffect, useRef, useState } from "react";
import "./ProductTraining.css";

const trainingServices = [
  {
    number: "01",
    title: "Product Walkthroughs",
    description:
      "Guide learners through a product's interface, essential features and everyday workflows with clear, structured, step-by-step demonstrations.",
    icon: "walkthrough",
  },
  {
    number: "02",
    title: "Feature-Based Training",
    description:
      "Explain individual product features, tools, settings and capabilities so users understand what each feature does and when to use it.",
    icon: "features",
  },
  {
    number: "03",
    title: "Interactive Simulations",
    description:
      "Let learners explore simulated product screens, practise tasks and make decisions in a guided environment before using the actual product.",
    icon: "simulation",
  },
  {
    number: "04",
    title: "Scenario-Based Learning",
    description:
      "Build realistic product-use scenarios that help learners apply product knowledge to common tasks, customer needs and practical situations.",
    icon: "scenario",
  },
  {
    number: "05",
    title: "Knowledge Checks",
    description:
      "Reinforce important product concepts through quizzes, task-based questions and immediate feedback that helps learners identify knowledge gaps.",
    icon: "quiz",
  },
  {
    number: "06",
    title: "Onboarding & User Guides",
    description:
      "Create structured learning journeys, visual instructions and guided resources that help new users become familiar with a product.",
    icon: "onboarding",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand the Product",
    description:
      "Identify the product's purpose, target learners, core features, common workflows and the skills users need to develop.",
  },
  {
    number: "02",
    title: "Structure the Learning",
    description:
      "Organise product information into logical modules, practical learning objectives, clear instructions and manageable steps.",
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "Develop demonstrations, interactive activities, simulations and knowledge checks around realistic product-use tasks.",
  },
  {
    number: "04",
    title: "Test & Refine",
    description:
      "Review the learning flow, verify instructions, test interactions and refine the experience for clarity and usability across devices.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Faster Product Adoption",
    description:
      "A structured learning experience helps users become familiar with product features and workflows more efficiently.",
  },
  {
    number: "02",
    title: "Consistent Product Knowledge",
    description:
      "Standardised learning content helps teams and users receive the same core instructions, terminology and product information.",
  },
  {
    number: "03",
    title: "Practice Without Pressure",
    description:
      "Interactive demonstrations and simulations provide a guided space to practise tasks before performing them in a live product.",
  },
  {
    number: "04",
    title: "Better User Confidence",
    description:
      "Clear explanations, realistic practice and useful feedback help learners understand how to complete product-related tasks.",
  },
];

const faqs = [
  {
    question: "What is product training?",
    answer:
      "Product training is structured learning that teaches users, employees, partners or customers how a product works, what it offers and how to use its features and workflows effectively.",
  },
  {
    question: "What can be included in a product training module?",
    answer:
      "A module can include product introductions, feature explanations, guided walkthroughs, demonstrations, interactive simulations, practical scenarios, quizzes and reference material.",
  },
  {
    question: "Can learners practise using a simulated product?",
    answer:
      "Yes. Interactive simulations can recreate selected screens and workflows, allowing learners to practise steps and receive feedback in a controlled learning environment.",
  },
  {
    question: "Who can use product training?",
    answer:
      "Product training can support new customers, existing users, internal teams, sales representatives, customer-support staff, channel partners and other audiences who need product knowledge.",
  },
  {
    question: "Can product training work on mobile devices?",
    answer:
      "The learning experience can be designed responsively for desktop, tablet and mobile screens. Individual interactions should also be tested on the devices and browsers learners will use.",
  },
];

const demoSteps = [
  {
    label: "Discover",
    number: "01",
    title: "Explore the product",
    description:
      "Start with a guided overview. Identify the key areas of a product interface and understand what each area helps you accomplish.",
    instruction: "Select a product area to explore",
    feedback:
      "Great start! Exploring the interface helps you understand where important product tools and features are located.",
  },
  {
    label: "Practice",
    number: "02",
    title: "Complete a task",
    description:
      "Follow a simple task flow, choose the next action and see how guided practice can reinforce a product workflow.",
    instruction: "Choose the next learning action",
    feedback:
      "Nice work! Practising a workflow helps connect product knowledge with real actions.",
  },
  {
    label: "Review",
    number: "03",
    title: "Check your understanding",
    description:
      "Review what you have learned and use feedback to reinforce the purpose of each step before moving forward.",
    instruction: "Check what you have learned",
    feedback:
      "Well done! Reviewing the key steps reinforces learning and helps identify what to practise next.",
  },
];

function ProductTrainingIcon({ type }) {
  return (
    <div
      className={`product-training-icon product-training-icon--${type}`}
      aria-hidden="true"
    >
      {type === "walkthrough" && (
        <>
          <span className="pt-screen">
            <i />
            <i />
            <i />
          </span>
          <span className="pt-pointer" />
          <span className="pt-pointer-dot" />
        </>
      )}

      {type === "features" && (
        <>
          <span className="pt-feature-core" />
          <span className="pt-feature-node pt-feature-node-one" />
          <span className="pt-feature-node pt-feature-node-two" />
          <span className="pt-feature-node pt-feature-node-three" />
          <span className="pt-feature-link pt-feature-link-one" />
          <span className="pt-feature-link pt-feature-link-two" />
          <span className="pt-feature-link pt-feature-link-three" />
        </>
      )}

      {type === "simulation" && (
        <>
          <span className="pt-simulation-window">
            <i />
            <i />
            <i />
          </span>
          <span className="pt-simulation-play" />
          <span className="pt-simulation-cursor" />
        </>
      )}

      {type === "scenario" && (
        <>
          <span className="pt-scenario-node pt-scenario-start" />
          <span className="pt-scenario-node pt-scenario-choice-one" />
          <span className="pt-scenario-node pt-scenario-choice-two" />
          <span className="pt-scenario-path pt-scenario-path-one" />
          <span className="pt-scenario-path pt-scenario-path-two" />
        </>
      )}

      {type === "quiz" && (
        <>
          <span className="pt-quiz-sheet" />
          <span className="pt-quiz-line pt-quiz-line-one" />
          <span className="pt-quiz-line pt-quiz-line-two" />
          <span className="pt-quiz-check">✓</span>
        </>
      )}

      {type === "onboarding" && (
        <>
          <span className="pt-onboard-person" />
          <span className="pt-onboard-path" />
          <span className="pt-onboard-step pt-onboard-step-one">1</span>
          <span className="pt-onboard-step pt-onboard-step-two">2</span>
          <span className="pt-onboard-step pt-onboard-step-three">3</span>
        </>
      )}
    </div>
  );
}

function ProductTrainingReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    if (
      typeof IntersectionObserver === "undefined"
    ) {
      element.classList.add("product-training-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("product-training-is-visible");
        } else {
          element.classList.remove("product-training-is-visible");
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`product-training-reveal product-training-reveal--${direction} ${className}`}
      style={{ "--pt-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ProductTraining() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeDemo, setActiveDemo] = useState(0);
  const [demoFeedback, setDemoFeedback] = useState(false);

  const currentDemo = demoSteps[activeDemo];

  const selectDemo = (index) => {
    setActiveDemo(index);
    setDemoFeedback(false);
  };

  return (
    <main className="product-training-page">
      {/* HERO */}
      <section className="product-training-hero">
        <div className="product-training-hero-inner">
          <ProductTrainingReveal
            direction="left"
            className="product-training-hero-content"
          >
            <span className="product-training-eyebrow">
              PRODUCT TRAINING / LEARNING EXPERIENCE
            </span>

            <h1>
              Understand
              <br />
              the product.
              <br />
              <span>Master the experience.</span>
            </h1>

            <p>
              We transform product information into structured,
              interactive learning experiences. From feature
              walkthroughs to practical simulations, every step is
              designed to help learners understand the product and
              use it with confidence.
            </p>

            <div className="product-training-hero-meta">
              <span>Explore</span>
              <i />
              <span>Practise</span>
              <i />
              <span>Apply</span>
              <i />
              <span>Master</span>
            </div>
          </ProductTrainingReveal>

          <ProductTrainingReveal
            direction="right"
            delay={120}
            className="product-training-hero-visual"
          >
            <div className="product-training-stage">
              <div className="pt-stage-top">
                <span className="pt-stage-brand">
                  <i />
                  PRODUCT LAB
                </span>
                <span className="pt-stage-status">
                  LEARNING MODE
                </span>
              </div>

              <div className="pt-stage-orbit pt-stage-orbit-one" />
              <div className="pt-stage-orbit pt-stage-orbit-two" />

              <div className="pt-stage-product">
                <div className="pt-product-window">
                  <div className="pt-product-window-top">
                    <span />
                    <span />
                    <span />
                    <b>PRODUCT OVERVIEW</b>
                  </div>

                  <div className="pt-product-window-body">
                    <div className="pt-product-sidebar">
                      <i className="pt-sidebar-active" />
                      <i />
                      <i />
                      <i />
                    </div>

                    <div className="pt-product-content">
                      <span className="pt-product-label">
                        YOUR WORKSPACE
                      </span>
                      <strong>Everything, in one place.</strong>
                      <div className="pt-product-stats">
                        <span>
                          <i />
                          <b />
                          <small />
                        </span>
                        <span>
                          <i />
                          <b />
                          <small />
                        </span>
                      </div>
                      <div className="pt-product-chart">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-stage-callout pt-stage-callout-one">
                <span className="pt-callout-number">01</span>
                <div>
                  <b>Guided tour</b>
                  <small>Learn the interface</small>
                </div>
              </div>

              <div className="pt-stage-callout pt-stage-callout-two">
                <span className="pt-callout-check">✓</span>
                <div>
                  <b>Feature mastered</b>
                  <small>Progress updated</small>
                </div>
              </div>

              <div className="pt-stage-bottom">
                <span>LEARN BY DOING</span>
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <strong>01 — 06</strong>
              </div>
            </div>
          </ProductTrainingReveal>
        </div>
      </section>

      {/* TRAINING SERVICES */}
      <section
        className="product-training-section product-training-services"
        id="product-training-services"
      >
        <div className="product-training-container">
          <ProductTrainingReveal direction="up">
            <div className="product-training-section-heading">
              <span>WHAT WE BUILD</span>
              <h2>
                Product knowledge,
                <br />
                <strong>made practical.</strong>
              </h2>
              <p>
                Purpose-built training content helps learners move
                from understanding a product to applying that
                knowledge in practical situations.
              </p>
            </div>
          </ProductTrainingReveal>

          <div className="product-training-services-list">
            {trainingServices.map((service, index) => (
              <ProductTrainingReveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="product-training-service-wrap"
              >
                <article className="product-training-service-card">
                  <span className="product-training-service-number">
                    {service.number}
                  </span>

                  <ProductTrainingIcon type={service.icon} />

                  <div className="product-training-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span
                    className="product-training-service-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              </ProductTrainingReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE LEARNING DEMO */}
      <section className="product-training-section product-training-demo">
        <div className="product-training-container">
          <div className="product-training-demo-layout">
            <ProductTrainingReveal
              direction="left"
              className="product-training-demo-intro"
            >
              <span className="product-training-eyebrow">
                LEARNING IN ACTION
              </span>

              <h2>
                Don't just read it.
                <br />
                <strong>Experience it.</strong>
              </h2>

              <p>
                Product training becomes more engaging when learners
                can explore, practise and review. Switch between
                these learning stages to preview a simple guided
                experience.
              </p>

              <div className="pt-demo-legend">
                <span>
                  <i className="pt-legend-dot" />
                  Guided learning
                </span>
                <span>
                  <i className="pt-legend-dot pt-legend-dot-muted" />
                  Practical feedback
                </span>
              </div>
            </ProductTrainingReveal>

            <ProductTrainingReveal
              direction="right"
              delay={100}
              className="product-training-demo-panel"
            >
              <div className="pt-demo-header">
                <div>
                  <span className="pt-demo-kicker">
                    INTERACTIVE PREVIEW
                  </span>
                  <h3>Product learning journey</h3>
                </div>
                <span className="pt-demo-index">
                  {currentDemo.number} / 03
                </span>
              </div>

              <div
                className="pt-demo-tabs"
                role="tablist"
                aria-label="Product learning stages"
              >
                {demoSteps.map((step, index) => (
                  <button
                    key={step.number}
                    type="button"
                    role="tab"
                    id={`pt-demo-tab-${index}`}
                    aria-selected={activeDemo === index}
                    aria-controls="pt-demo-panel"
                    className={
                      activeDemo === index ? "is-active" : ""
                    }
                    onClick={() => selectDemo(index)}
                  >
                    <span>{step.number}</span>
                    {step.label}
                  </button>
                ))}
              </div>

              <div
                className="pt-demo-content"
                id="pt-demo-panel"
                role="tabpanel"
                aria-labelledby={`pt-demo-tab-${activeDemo}`}
              >
                <div className={`pt-demo-visual pt-demo-visual--${activeDemo}`}>
                  <div className="pt-demo-visual-ring pt-demo-ring-one" />
                  <div className="pt-demo-visual-ring pt-demo-ring-two" />

                  <div className="pt-demo-interface">
                    <div className="pt-demo-interface-top">
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="pt-demo-interface-body">
                      <div className="pt-demo-interface-side">
                        <i className="pt-demo-side-active" />
                        <i />
                        <i />
                      </div>

                      <div className="pt-demo-interface-main">
                        <b />
                        <span />
                        <span />
                        <div className="pt-demo-interface-tile">
                          {activeDemo === 0 && (
                            <span className="pt-demo-book">i</span>
                          )}
                          {activeDemo === 1 && (
                            <span className="pt-demo-task-check">✓</span>
                          )}
                          {activeDemo === 2 && (
                            <span className="pt-demo-review-check">✓</span>
                          )}
                        </div>
                        <span />
                      </div>
                    </div>
                  </div>

                  <span className="pt-demo-visual-dot pt-demo-dot-one" />
                  <span className="pt-demo-visual-dot pt-demo-dot-two" />
                  <span className="pt-demo-visual-dot pt-demo-dot-three" />
                </div>

                <div className="pt-demo-copy">
                  <span className="pt-demo-step-label">
                    STEP {currentDemo.number}
                  </span>
                  <h4>{currentDemo.title}</h4>
                  <p>{currentDemo.description}</p>
                  <span className="pt-demo-instruction">
                    {currentDemo.instruction}
                  </span>

                  <button
                    type="button"
                    className="pt-demo-action"
                    onClick={() => setDemoFeedback((shown) => !shown)}
                    aria-expanded={demoFeedback}
                    aria-controls="pt-demo-feedback"
                  >
                    {demoFeedback ? "Hide feedback" : "Reveal feedback"}
                    <span aria-hidden="true">
                      {demoFeedback ? "−" : "↗"}
                    </span>
                  </button>

                  {demoFeedback && (
                    <p
                      className="pt-demo-feedback"
                      id="pt-demo-feedback"
                      aria-live="polite"
                    >
                      {currentDemo.feedback}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-demo-footer">
                <span>LEARN</span>
                <i />
                <span>PRACTISE</span>
                <i />
                <span>REVIEW</span>
              </div>
            </ProductTrainingReveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="product-training-section product-training-process">
        <div className="product-training-container">
          <ProductTrainingReveal
            direction="left"
            className="product-training-process-intro"
          >
            <span>THE DEVELOPMENT PROCESS</span>
            <h2>
              From product details
              <br />
              to <strong>learning that works.</strong>
            </h2>
            <p>
              A structured process keeps product information accurate,
              the learning journey organised and every interaction
              aligned with the learner's needs.
            </p>
          </ProductTrainingReveal>

          <div className="product-training-process-line">
            {processSteps.map((step, index) => (
              <ProductTrainingReveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 80}
                className="product-training-process-item"
              >
                <div className="product-training-process-marker">
                  <span>{step.number}</span>
                </div>

                <article className="product-training-process-copy">
                  <span className="pt-process-label">
                    PHASE {step.number}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              </ProductTrainingReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="product-training-section product-training-benefits">
        <div className="product-training-container">
          <ProductTrainingReveal direction="right">
            <div className="product-training-section-heading">
              <span>WHY PRODUCT TRAINING</span>
              <h2>
                Help people use products
                <br />
                <strong>with confidence.</strong>
              </h2>
              <p>
                Well-structured product learning makes important
                information easier to follow, practise and apply
                across different user journeys.
              </p>
            </div>
          </ProductTrainingReveal>

          <div className="product-training-benefit-list">
            {benefits.map((benefit, index) => (
              <ProductTrainingReveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="product-training-benefit">
                  <span>{benefit.number}</span>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <i aria-hidden="true" />
                </article>
              </ProductTrainingReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="product-training-section product-training-faq">
        <div className="product-training-container">
          <ProductTrainingReveal direction="up">
            <div className="product-training-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Product training,
                <strong> explained.</strong>
              </h2>
              <p>
                Useful details about product-learning content,
                simulations and learner experiences.
              </p>
            </div>
          </ProductTrainingReveal>

          <div className="product-training-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `product-training-faq-answer-${index}`;

              return (
                <ProductTrainingReveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 50}
                >
                  <div
                    className={`product-training-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="product-training-faq-question"
                      onClick={() =>
                        setActiveFaq((current) =>
                          current === index ? null : index
                        )
                      }
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span>
                        <small>
                          {String(index + 1).padStart(2, "0")}
                        </small>
                        {faq.question}
                      </span>
                      <b aria-hidden="true">
                        {isActive ? "−" : "+"}
                      </b>
                    </button>

                    <div
                      className="product-training-faq-answer"
                      id={answerId}
                      aria-hidden={!isActive}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </ProductTrainingReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="product-training-final">
        <ProductTrainingReveal direction="up">
          <div className="product-training-final-inner">
            <span>THE LEARNING OUTCOME</span>

            <h2>
              Know the product.
              <br />
              <strong>Know how to use it.</strong>
            </h2>

            <p>
              Great product training turns information into
              understanding, understanding into practice and practice
              into confident product use.
            </p>

            <div className="product-training-final-line" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </ProductTrainingReveal>
      </section>
    </main>
  );
}