import React, { useEffect, useRef, useState } from "react";
import "./EmployeeSafetyTraining.css";

const trainingAreas = [
  {
    number: "01",
    title: "Workplace Safety",
    description:
      "Build awareness of workplace hazards, safe working practices, risk prevention and everyday responsibilities that help create a safer working environment.",
    icon: "workplace",
  },
  {
    number: "02",
    title: "Employee Onboarding",
    description:
      "Help new employees understand workplace procedures, company policies, team responsibilities and the essential practices needed to start confidently.",
    icon: "onboarding",
  },
  {
    number: "03",
    title: "PPE & Equipment Safety",
    description:
      "Understand how to select, inspect and correctly use personal protective equipment and workplace tools according to the relevant safety procedures.",
    icon: "ppe",
  },
  {
    number: "04",
    title: "Emergency Response",
    description:
      "Prepare employees to recognise emergency situations, understand evacuation procedures, locate safety equipment and follow their assigned response roles.",
    icon: "emergency",
  },
  {
    number: "05",
    title: "Hazard & Risk Awareness",
    description:
      "Identify potential hazards, understand risk assessment basics and learn how to report unsafe conditions before they lead to incidents.",
    icon: "hazard",
  },
  {
    number: "06",
    title: "Compliance & Conduct",
    description:
      "Reinforce workplace policies, professional conduct, required procedures and role-specific responsibilities through clear, structured learning.",
    icon: "compliance",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Identify Training Needs",
    description:
      "Understand employee roles, workplace risks, existing knowledge and the training outcomes required.",
  },
  {
    number: "02",
    title: "Build Learning Modules",
    description:
      "Organise the content into clear lessons, visual demonstrations, practical scenarios and knowledge checks.",
  },
  {
    number: "03",
    title: "Deliver & Practise",
    description:
      "Guide employees through procedures and realistic situations using suitable digital or instructor-led methods.",
  },
  {
    number: "04",
    title: "Review & Improve",
    description:
      "Use assessment results, feedback and completion records to identify gaps and plan further learning.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Reduce Preventable Risks",
    description:
      "Help employees recognise hazards, follow procedures and make safer decisions during daily work.",
    icon: "shield",
  },
  {
    number: "02",
    title: "Build Employee Confidence",
    description:
      "Give people a clearer understanding of their roles, equipment, responsibilities and workplace expectations.",
    icon: "people",
  },
  {
    number: "03",
    title: "Strengthen Safety Culture",
    description:
      "Encourage accountability, communication, hazard reporting and shared responsibility across teams.",
    icon: "culture",
  },
  {
    number: "04",
    title: "Support Compliance",
    description:
      "Organise role-specific learning and reinforce the policies and procedures relevant to the workplace.",
    icon: "check",
  },
];

const faqs = [
  {
    question: "What topics can Employee & Safety Training cover?",
    answer:
      "Training may cover employee onboarding, workplace safety, PPE use, hazard awareness, emergency procedures, compliance, workplace conduct and role-specific processes.",
  },
  {
    question: "Can training be customised for different job roles?",
    answer:
      "Yes. Learning modules can be organised around job responsibilities, workplace conditions, equipment, relevant procedures and the experience level of each employee group.",
  },
  {
    question: "Can the training be delivered online?",
    answer:
      "Training content can be designed for digital learning platforms, instructor-led sessions or a blended approach, depending on the subject and practical requirements.",
  },
  {
    question: "How can employee understanding be assessed?",
    answer:
      "Knowledge checks, scenario-based questions, practical demonstrations and feedback can help assess understanding. High-risk tasks may also require supervised practical verification.",
  },
  {
    question: "Does online training replace practical safety instruction?",
    answer:
      "Not always. Online learning can support awareness and knowledge, but hands-on demonstrations, site-specific instruction and competency checks may still be necessary.",
  },
];

const Reveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      element?.classList.add("employee-safety-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle(
          "employee-safety-is-visible",
          entry.isIntersecting
        );
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`employee-safety-reveal employee-safety-reveal--${direction} ${className}`}
      style={{ "--employee-safety-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const TrainingIcon = ({ type }) => (
  <div
    className={`employee-safety-icon employee-safety-icon--${type}`}
    aria-hidden="true"
  >
    {type === "workplace" && (
      <>
        <span className="es-icon-hardhat" />
        <span className="es-icon-hardhat-brim" />
        <span className="es-icon-hardhat-stripe" />
      </>
    )}

    {type === "onboarding" && (
      <>
        <span className="es-icon-person es-icon-person--one" />
        <span className="es-icon-person es-icon-person--two" />
        <span className="es-icon-person es-icon-person--three" />
        <span className="es-icon-team-base" />
      </>
    )}

    {type === "ppe" && (
      <>
        <span className="es-icon-shield">
          <span />
        </span>
        <span className="es-icon-shield-check" />
      </>
    )}

    {type === "emergency" && (
      <>
        <span className="es-icon-alert-ring" />
        <span className="es-icon-alert-mark" />
        <span className="es-icon-alert-dot" />
      </>
    )}

    {type === "hazard" && (
      <>
        <span className="es-icon-hazard-triangle" />
        <span className="es-icon-hazard-mark" />
        <span className="es-icon-hazard-dot" />
      </>
    )}

    {type === "compliance" && (
      <>
        <span className="es-icon-document" />
        <span className="es-icon-document-line es-icon-document-line--one" />
        <span className="es-icon-document-line es-icon-document-line--two" />
        <span className="es-icon-document-check" />
      </>
    )}

    {type === "shield" && (
      <>
        <span className="es-icon-mini-shield" />
        <span className="es-icon-mini-check" />
      </>
    )}

    {type === "people" && (
      <>
        <span className="es-icon-mini-person es-icon-mini-person--one" />
        <span className="es-icon-mini-person es-icon-mini-person--two" />
        <span className="es-icon-mini-person es-icon-mini-person--three" />
      </>
    )}

    {type === "culture" && (
      <>
        <span className="es-icon-culture-circle" />
        <span className="es-icon-culture-star">✦</span>
      </>
    )}

    {type === "check" && (
      <>
        <span className="es-icon-check-ring" />
        <span className="es-icon-check-mark" />
      </>
    )}
  </div>
);

const EmployeeSafetyTraining = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeDemo, setActiveDemo] = useState("hazard");
  const [demoChecked, setDemoChecked] = useState(false);

  const demoContent = {
    hazard: {
      index: "01 / AWARENESS",
      label: "Spot the hazard",
      title: "Notice what could go wrong.",
      description:
        "A clear walkway is part of a safer workplace. Identify the obstruction and consider the appropriate reporting procedure.",
      prompt: "A box is blocking an emergency exit. What should you do?",
      options: [
        "Ignore it until later",
        "Follow site procedure and report it",
        "Walk around it without reporting",
      ],
      answer: 1,
      feedback:
        "Correct. Keep the exit accessible and follow the workplace procedure for reporting and resolving the hazard.",
    },
    ppe: {
      index: "02 / SAFE PRACTICE",
      label: "Choose the right PPE",
      title: "Match protection to the task.",
      description:
        "Personal protective equipment depends on the task, identified hazards and workplace requirements.",
      prompt: "Before using required protective equipment, you should:",
      options: [
        "Check its condition and correct fit",
        "Use any available equipment",
        "Skip checks if the task is short",
      ],
      answer: 0,
      feedback:
        "Correct. Inspect the required PPE, confirm it fits correctly and follow the relevant instructions before starting work.",
    },
    emergency: {
      index: "03 / PREPAREDNESS",
      label: "Respond appropriately",
      title: "Know the response before it happens.",
      description:
        "Emergency readiness includes recognising alerts, knowing the evacuation route and following your assigned responsibilities.",
      prompt: "When an evacuation alarm sounds, you should:",
      options: [
        "Finish your task first",
        "Use the lift as usual",
        "Follow the site's evacuation procedure",
      ],
      answer: 2,
      feedback:
        "Correct. Follow the site-specific evacuation procedure, use designated routes and proceed to the assigned assembly area.",
    },
  };

  const currentDemo = demoContent[activeDemo];

  const handleDemoChange = (key) => {
    setActiveDemo(key);
    setDemoChecked(false);
  };

  return (
    <main className="employee-safety-page">
      {/* HERO */}
      <section className="employee-safety-hero">
        <div className="employee-safety-hero-inner">
          <Reveal
            direction="left"
            className="employee-safety-hero-content"
          >
            <span className="employee-safety-eyebrow">
              EMPLOYEE &amp; SAFETY TRAINING
            </span>

            <h1>
              Safer People.
              <br />
              <span>Stronger</span>
              <br />
              Workplaces.
            </h1>

            <p>
              Build employee confidence, strengthen workplace awareness and
              make essential procedures easier to understand. Structured
              training helps teams recognise risks, work responsibly and
              prepare for real-world situations.
            </p>

            <div className="employee-safety-hero-meta">
              <span>Awareness</span>
              <i />
              <span>Prevention</span>
              <i />
              <span>Preparedness</span>
              <i />
              <span>Responsibility</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="employee-safety-hero-visual"
          >
            <div className="employee-safety-hero-stage">
              <div className="es-stage-topline">
                <span>LEARNING MODULE</span>
                <strong>ES / 01</strong>
              </div>

              <div className="es-stage-orbit es-stage-orbit--one" />
              <div className="es-stage-orbit es-stage-orbit--two" />

              <div className="es-stage-board">
                <div className="es-board-top">
                  <span className="es-board-light" />
                  <span className="es-board-light" />
                  <span className="es-board-light" />
                  <span>SAFETY CHECKLIST</span>
                </div>

                <div className="es-board-shield">
                  <span className="es-board-shield-check" />
                </div>

                <div className="es-board-lines">
                  <span><i /> Hazard awareness</span>
                  <span><i /> PPE inspection</span>
                  <span><i /> Emergency plan</span>
                  <span><i /> Safe procedures</span>
                </div>
              </div>

              <div className="es-training-person">
                <div className="es-person-head">
                  <span className="es-person-hair" />
                  <span className="es-person-eye" />
                  <span className="es-person-smile" />
                </div>
                <div className="es-person-neck" />
                <div className="es-person-body">
                  <span className="es-person-vest-line es-person-vest-line--one" />
                  <span className="es-person-vest-line es-person-vest-line--two" />
                </div>
                <span className="es-person-arm es-person-arm--left" />
                <span className="es-person-arm es-person-arm--right" />
                <span className="es-person-tablet" />
              </div>

              <div className="es-stage-worker es-stage-worker--one">
                <span className="es-worker-helmet" />
                <span className="es-worker-head" />
                <span className="es-worker-body" />
              </div>

              <div className="es-stage-worker es-stage-worker--two">
                <span className="es-worker-helmet" />
                <span className="es-worker-head" />
                <span className="es-worker-body" />
              </div>

              <div className="es-stage-worker es-stage-worker--three">
                <span className="es-worker-helmet" />
                <span className="es-worker-head" />
                <span className="es-worker-body" />
              </div>

              <div className="es-stage-callout es-stage-callout--one">
                <span className="es-callout-check">✓</span>
                <span>
                  <strong>Awareness</strong>
                  <small>Recognise the risk</small>
                </span>
              </div>

              <div className="es-stage-callout es-stage-callout--two">
                <span className="es-callout-dot" />
                <span>
                  <strong>Preparedness</strong>
                  <small>Know the procedure</small>
                </span>
              </div>

              <div className="es-stage-footer">
                <span>LEARN</span>
                <i />
                <span>PRACTISE</span>
                <i />
                <span>APPLY</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRAINING AREAS */}
      <section className="employee-safety-section employee-safety-areas">
        <div className="employee-safety-container">
          <Reveal direction="up">
            <div className="employee-safety-section-heading">
              <span>KEY TRAINING AREAS</span>
              <h2>
                Knowledge that
                <br />
                <strong>protects people.</strong>
              </h2>
              <p>
                Create a consistent learning experience for new employees,
                experienced teams and people working in different roles.
                Each area focuses on practical understanding and responsible
                workplace behaviour.
              </p>
            </div>
          </Reveal>

          <div className="employee-safety-services-list">
            {trainingAreas.map((area, index) => (
              <Reveal
                key={area.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 65}
                className="employee-safety-service-wrap"
              >
                <article className="employee-safety-service-card">
                  <div className="employee-safety-service-top">
                    <span className="employee-safety-service-number">
                      {area.number}
                    </span>
                    <TrainingIcon type={area.icon} />
                  </div>

                  <div className="employee-safety-service-content">
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>

                  <span
                    className="employee-safety-service-mark"
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

      {/* INTERACTIVE TRAINING DEMO */}
      <section className="employee-safety-section employee-safety-demo-section">
        <div className="employee-safety-container">
          <Reveal direction="right">
            <div className="employee-safety-section-heading employee-safety-section-heading--wide">
              <span>LEARNING IN ACTION</span>
              <h2>
                Learn it.
                <strong> Recognise it.</strong>
                <br />
                Apply it.
              </h2>
              <p>
                Scenario-based learning lets employees think through common
                workplace situations and practise choosing an appropriate
                response.
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={100}>
            <div className="employee-safety-demo">
              <div className="employee-safety-demo-sidebar">
                <span className="es-demo-sidebar-label">TRAINING PATH</span>

                <button
                  type="button"
                  className={`es-demo-nav-item ${
                    activeDemo === "hazard" ? "is-active" : ""
                  }`}
                  onClick={() => handleDemoChange("hazard")}
                  aria-pressed={activeDemo === "hazard"}
                >
                  <span className="es-demo-nav-number">01</span>
                  <span>
                    <strong>Hazard Awareness</strong>
                    <small>Identify the risk</small>
                  </span>
                  <i />
                </button>

                <button
                  type="button"
                  className={`es-demo-nav-item ${
                    activeDemo === "ppe" ? "is-active" : ""
                  }`}
                  onClick={() => handleDemoChange("ppe")}
                  aria-pressed={activeDemo === "ppe"}
                >
                  <span className="es-demo-nav-number">02</span>
                  <span>
                    <strong>PPE &amp; Protection</strong>
                    <small>Choose safely</small>
                  </span>
                  <i />
                </button>

                <button
                  type="button"
                  className={`es-demo-nav-item ${
                    activeDemo === "emergency" ? "is-active" : ""
                  }`}
                  onClick={() => handleDemoChange("emergency")}
                  aria-pressed={activeDemo === "emergency"}
                >
                  <span className="es-demo-nav-number">03</span>
                  <span>
                    <strong>Emergency Readiness</strong>
                    <small>Respond correctly</small>
                  </span>
                  <i />
                </button>

                <div className="es-demo-sidebar-note">
                  <span className="es-demo-note-icon">i</span>
                  <p>
                    Training scenarios support learning. Always follow
                    your organisation's approved safety procedures.
                  </p>
                </div>
              </div>

              <div className="employee-safety-demo-main">
                <div className="es-demo-main-header">
                  <span>{currentDemo.index}</span>
                  <span className="es-demo-status">
                    <i />
                    INTERACTIVE SCENARIO
                  </span>
                </div>

                <div className="es-demo-content">
                  <div className="es-demo-illustration">
                    <div className="es-demo-illustration-ring" />

                    {activeDemo === "hazard" && (
                      <div className="es-demo-hazard-scene">
                        <div className="es-demo-exit-sign">
                          <span>EXIT</span>
                          <i>↗</i>
                        </div>
                        <div className="es-demo-door">
                          <span />
                          <i />
                        </div>
                        <div className="es-demo-box">
                          <span />
                          <span />
                        </div>
                        <div className="es-demo-warning">!</div>
                        <div className="es-demo-floor-line" />
                      </div>
                    )}

                    {activeDemo === "ppe" && (
                      <div className="es-demo-ppe-scene">
                        <div className="es-demo-helmet">
                          <span />
                          <i />
                        </div>
                        <div className="es-demo-vest">
                          <span />
                          <i />
                          <b />
                        </div>
                        <div className="es-demo-glove">
                          <span />
                        </div>
                        <div className="es-demo-ppe-label">PPE CHECK</div>
                      </div>
                    )}

                    {activeDemo === "emergency" && (
                      <div className="es-demo-emergency-scene">
                        <div className="es-demo-alarm">
                          <span />
                        </div>
                        <div className="es-demo-emergency-arrow">➜</div>
                        <div className="es-demo-assembly">
                          <span>SAFE</span>
                          <i>✓</i>
                        </div>
                        <div className="es-demo-emergency-label">
                          FOLLOW THE PLAN
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="es-demo-question">
                    <span className="es-demo-kicker">{currentDemo.label}</span>
                    <h3>{currentDemo.title}</h3>
                    <p>{currentDemo.description}</p>

                    <div className="es-demo-quiz">
                      <strong>{currentDemo.prompt}</strong>

                      <div className="es-demo-options">
                        {currentDemo.options.map((option, index) => {
                          const isCorrect = index === currentDemo.answer;

                          return (
                            <div
                              key={option}
                              className={`es-demo-option ${
                                demoChecked && isCorrect
                                  ? "is-correct"
                                  : ""
                              }`}
                            >
                              <span className="es-demo-option-letter">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span>{option}</span>
                              {demoChecked && isCorrect && (
                                <b aria-label="Correct answer">✓</b>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        className="es-demo-action"
                        onClick={() => setDemoChecked((checked) => !checked)}
                        aria-expanded={demoChecked}
                      >
                        {demoChecked ? "Hide explanation" : "Reveal explanation"}
                        <span>{demoChecked ? "−" : "↗"}</span>
                      </button>

                      {demoChecked && (
                        <p
                          className="es-demo-feedback"
                          aria-live="polite"
                        >
                          <span>✓</span>
                          {currentDemo.feedback}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="es-demo-main-footer">
                  <span>LEARNING THROUGH REAL-WORLD SCENARIOS</span>
                  <span>MODULE {activeDemo === "hazard" ? "01" : activeDemo === "ppe" ? "02" : "03"}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="employee-safety-section employee-safety-process">
        <div className="employee-safety-container">
          <Reveal direction="left">
            <div className="employee-safety-process-intro">
              <span>OUR TRAINING PROCESS</span>
              <h2>
                From learning needs
                <br />
                to <strong>safer habits.</strong>
              </h2>
              <p>
                A structured approach keeps training relevant, understandable
                and connected to employees' everyday responsibilities.
              </p>
            </div>
          </Reveal>

          <div className="employee-safety-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
                className="employee-safety-process-item"
              >
                <div className="employee-safety-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="employee-safety-process-copy">
                  <span className="es-process-label">
                    STEP {step.number}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal direction="right" delay={100}>
            <div className="employee-safety-process-note">
              <div className="es-process-note-visual">
                <span className="es-process-note-shield">
                  <i />
                </span>
                <span className="es-process-note-ring es-process-note-ring--one" />
                <span className="es-process-note-ring es-process-note-ring--two" />
              </div>

              <div>
                <span>THE GOAL</span>
                <h3>Make safe practice part of everyday work.</h3>
                <p>
                  Training works best when learning is reinforced by clear
                  procedures, suitable equipment, supervision and a workplace
                  culture that supports reporting and improvement.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="employee-safety-section employee-safety-benefits">
        <div className="employee-safety-container">
          <Reveal direction="up">
            <div className="employee-safety-section-heading">
              <span>WHY TRAINING MATTERS</span>
              <h2>
                Better awareness.
                <br />
                <strong>Better decisions.</strong>
              </h2>
              <p>
                Well-organised training can help employees understand
                expectations, identify potential risks and contribute to
                a more responsible workplace.
              </p>
            </div>
          </Reveal>

          <div className="employee-safety-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="employee-safety-benefit">
                  <span className="employee-safety-benefit-number">
                    {benefit.number}
                  </span>

                  <TrainingIcon type={benefit.icon} />

                  <div className="employee-safety-benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <span className="employee-safety-benefit-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="employee-safety-section employee-safety-faq">
        <div className="employee-safety-container">
          <Reveal direction="up">
            <div className="employee-safety-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                A clearer view of
                <br />
                <strong>employee training.</strong>
              </h2>
              <p>
                Understand how employee learning, workplace awareness and
                safety training can be structured for different needs.
              </p>
            </div>
          </Reveal>

          <div className="employee-safety-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `employee-safety-faq-answer-${index}`;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 55}
                >
                  <article
                    className={`employee-safety-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="employee-safety-faq-question"
                      onClick={() =>
                        setActiveFaq((current) =>
                          current === index ? null : index
                        )
                      }
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span className="es-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        {faq.question}
                      </span>

                      <span className="es-faq-toggle" aria-hidden="true">
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      className="employee-safety-faq-answer"
                      id={answerId}
                      aria-hidden={!isActive}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="employee-safety-final">
        <Reveal direction="up">
          <div className="employee-safety-final-inner">
            <span>THE BIGGER PICTURE</span>

            <h2>
              Safety is not
              <br />
              just a <strong>lesson.</strong>
            </h2>

            <p>
              It is the knowledge, awareness and everyday decisions that help
              people work responsibly, look out for one another and build
              safer workplaces together.
            </p>

            <div className="employee-safety-final-line" aria-hidden="true">
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

export default EmployeeSafetyTraining;