import React, { useEffect, useRef, useState } from "react";
import "./SimulationAssessment.css";

const simulationModules = [
  {
    number: "01",
    title: "Virtual Environment Simulation",
    description:
      "Create interactive digital environments where learners can explore processes, practise tasks and understand complex workflows through realistic, controlled scenarios.",
    icon: "environment",
    tag: "IMMERSIVE LEARNING",
  },
  {
    number: "02",
    title: "Scenario-Based Training",
    description:
      "Present practical situations, branching decisions and real-world challenges that help learners apply knowledge instead of relying only on theory.",
    icon: "scenario",
    tag: "DECISION MAKING",
  },
  {
    number: "03",
    title: "Skills & Competency Assessment",
    description:
      "Evaluate task execution, procedural understanding and decision-making against clearly defined competencies and assessment criteria.",
    icon: "assessment",
    tag: "SKILL VALIDATION",
  },
  {
    number: "04",
    title: "Interactive Knowledge Checks",
    description:
      "Use quizzes, decision points, question banks and knowledge checks to identify understanding and reinforce important learning objectives.",
    icon: "knowledge",
    tag: "KNOWLEDGE RETENTION",
  },
  {
    number: "05",
    title: "Performance Analytics",
    description:
      "Organise assessment results, response patterns, completion progress and identified learning gaps into structured, easy-to-understand reports.",
    icon: "analytics",
    tag: "DATA-DRIVEN INSIGHT",
  },
  {
    number: "06",
    title: "Feedback & Improvement",
    description:
      "Provide contextual feedback and repeatable practice opportunities so learners can understand their decisions and work towards improved performance.",
    icon: "feedback",
    tag: "CONTINUOUS LEARNING",
  },
];

const simulationSteps = [
  {
    number: "01",
    title: "Define Learning Objectives",
    description:
      "Identify the skills, knowledge, procedures and measurable outcomes that the simulation or assessment needs to evaluate.",
  },
  {
    number: "02",
    title: "Design the Scenario",
    description:
      "Build the scenario flow, decision points, tasks, assessment criteria and relevant feedback around the intended learning experience.",
  },
  {
    number: "03",
    title: "Run & Evaluate",
    description:
      "Let learners interact with the scenario, make decisions, complete tasks and demonstrate their understanding in a structured environment.",
  },
  {
    number: "04",
    title: "Review & Improve",
    description:
      "Review the assessment results, identify gaps and refine the training experience based on learner performance and feedback.",
  },
];

const simulationBenefits = [
  {
    number: "01",
    title: "Practise in a Controlled Environment",
    description:
      "Learners can explore scenarios and practise decisions in a designed environment before applying their knowledge in real situations.",
  },
  {
    number: "02",
    title: "Measure Learning Outcomes",
    description:
      "Clearly defined criteria make it easier to evaluate knowledge, task completion, decision-making and demonstrated competencies.",
  },
  {
    number: "03",
    title: "Identify Learning Gaps",
    description:
      "Assessment responses can highlight areas that need further explanation, additional practice or a revised learning approach.",
  },
  {
    number: "04",
    title: "Support Repeatable Practice",
    description:
      "Structured scenarios provide a consistent learning experience that can be repeated, reviewed and improved over time.",
  },
];

const faqs = [
  {
    question: "What is simulation-based learning?",
    answer:
      "Simulation-based learning uses designed digital environments or scenarios to help learners practise procedures, explore decisions and apply knowledge in a controlled setting.",
  },
  {
    question: "How is an assessment different from a simulation?",
    answer:
      "A simulation focuses on practising or experiencing a situation, while an assessment evaluates understanding, task performance or decisions against defined criteria. Both can be combined in one learning experience.",
  },
  {
    question: "Can simulations include interactive decisions?",
    answer:
      "Yes. A simulation can include branching scenarios, selectable responses, task sequences, immediate feedback and different outcomes based on learner decisions.",
  },
  {
    question: "What can be measured in an assessment?",
    answer:
      "Depending on the design, assessments can measure answer accuracy, task completion, decision quality, completion status and progress against specific learning objectives.",
  },
  {
    question: "Can simulations and assessments be used for employee training?",
    answer:
      "Yes. They can support product knowledge, operational procedures, customer interactions, safety scenarios, equipment familiarisation and other role-specific learning needs.",
  },
];

const practiceScenarios = [
  {
    id: "operations",
    number: "SCENARIO 01",
    category: "Operational decision",
    title: "Unexpected equipment behaviour",
    prompt:
      "During a simulated equipment inspection, you notice an unexpected warning indicator. What should you do first?",
    options: [
      {
        label: "Ignore the warning and continue",
        correct: false,
        feedback:
          "Not the best choice. Continuing without checking an unexpected warning may increase the risk. Review the warning and follow the established procedure.",
      },
      {
        label: "Pause the task and follow the inspection procedure",
        correct: true,
        feedback:
          "Good decision. Pausing to assess the warning and following the applicable procedure is a structured way to respond to an unexpected condition.",
      },
      {
        label: "Reset the equipment without checking",
        correct: false,
        feedback:
          "Try again. Resetting without understanding the warning may hide the issue. First assess the situation and follow the documented procedure.",
      },
    ],
  },
  {
    id: "customer",
    number: "SCENARIO 02",
    category: "Communication decision",
    title: "A customer reports a problem",
    prompt:
      "A customer explains that a feature is not working as expected. What is the most useful first response?",
    options: [
      {
        label: "Immediately blame the customer's setup",
        correct: false,
        feedback:
          "This can create confusion and reduce trust. First understand the issue and collect the details needed to investigate it.",
      },
      {
        label: "Listen, clarify the issue and confirm the details",
        correct: true,
        feedback:
          "Good decision. Active listening and clarification help establish the actual issue before selecting an appropriate next step.",
      },
      {
        label: "Close the conversation without investigation",
        correct: false,
        feedback:
          "The issue has not been understood yet. Gather relevant details first, then explain the appropriate next step.",
      },
    ],
  },
  {
    id: "process",
    number: "SCENARIO 03",
    category: "Process decision",
    title: "A required step was missed",
    prompt:
      "While reviewing a simulated workflow, you discover that a required verification step was skipped. What should happen next?",
    options: [
      {
        label: "Mark the workflow complete anyway",
        correct: false,
        feedback:
          "A missing verification step should not be treated as completed. Check the applicable workflow and resolve the gap before proceeding.",
      },
      {
        label: "Identify the gap and complete the required verification",
        correct: true,
        feedback:
          "Good decision. Identifying the missed step and following the required verification process helps maintain consistency and traceability.",
      },
      {
        label: "Remove the step from the checklist",
        correct: false,
        feedback:
          "Removing a required step does not resolve the issue. Refer to the approved process and complete the verification as required.",
      },
    ],
  },
];

const moduleIconPaths = {
  environment: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M8 20v-5h8v5" />
      <path d="M7 9h.01M12 9h.01M17 9h.01" />
      <path d="m9 13 2 2 4-4" />
    </>
  ),
  scenario: (
    <>
      <path d="M12 3 21 8v8l-9 5-9-5V8l9-5Z" />
      <path d="M12 12 21 8M12 12 3 8M12 12v9" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  assessment: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h2M9 16h2" />
      <path d="m13 13 1.5 1.5L17 12" />
    </>
  ),
  knowledge: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
      <path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20M9 7h7M9 10h5" />
    </>
  ),
  analytics: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      <path d="m3 7 6-3 6 5 6-5" />
    </>
  ),
  feedback: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      <path d="m8 12 2.5 2.5L16 9" />
    </>
  ),
};

const SimulationIcon = ({ type }) => (
  <div className="employeeSimulation-icon" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {moduleIconPaths[type]}
    </svg>
  </div>
);

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

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("employeeSimulation-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("employeeSimulation-is-visible");
        } else {
          element.classList.remove("employeeSimulation-is-visible");
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
      className={`employeeSimulation-reveal employeeSimulation-reveal--${direction} ${className}`}
      style={{ "--employeeSimulation-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SimulationAssessment = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeScenario, setActiveScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentScenario = practiceScenarios[activeScenario];

  const handleScenarioChange = (index) => {
    setActiveScenario(index);
    setSelectedOption(null);
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleFaqToggle = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="employeeSimulation-page">
      {/* HERO */}
      <section className="employeeSimulation-hero">
        <div className="employeeSimulation-hero-inner">
          <Reveal
            direction="left"
            className="employeeSimulation-hero-content"
          >
            <span className="employeeSimulation-eyebrow">
              SIMULATION / ASSESSMENT
            </span>

            <h1>
              Learn by
              <br />
              <span>doing.</span>
              <br />
              Improve by
              <br />
              <span>measuring.</span>
            </h1>

            <p>
              We design interactive simulation and assessment experiences
              that help learners practise decisions, demonstrate skills and
              understand their progress through structured digital learning.
            </p>

            <div className="employeeSimulation-hero-meta">
              <span>Simulate</span>
              <i />
              <span>Evaluate</span>
              <i />
              <span>Improve</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="employeeSimulation-hero-visual"
          >
            <div className="employeeSimulation-dashboard">
              <div className="employeeSimulation-dashboard-top">
                <div className="employeeSimulation-dashboard-brand">
                  <span className="employeeSimulation-live-dot" />
                  <span>SIMULATION LAB</span>
                </div>

                <span className="employeeSimulation-dashboard-index">
                  SESSION / 001
                </span>
              </div>

              <div className="employeeSimulation-dashboard-title">
                <div>
                  <span>LEARNING ENVIRONMENT</span>
                  <h2>Performance overview</h2>
                </div>

                <div className="employeeSimulation-dashboard-symbol">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M12 3 21 8v8l-9 5-9-5V8l9-5Z" />
                    <path d="M12 12 21 8M12 12 3 8M12 12v9" />
                  </svg>
                </div>
              </div>

              <div className="employeeSimulation-score-panel">
                <div className="employeeSimulation-score-copy">
                  <span>ASSESSMENT STATUS</span>
                  <strong>Ready to practise</strong>
                  <small>Scenario-based learning module</small>
                </div>

                <div className="employeeSimulation-score-ring">
                  <div className="employeeSimulation-score-ring-inner">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="employeeSimulation-metric-grid">
                <div className="employeeSimulation-metric">
                  <span>01 / INPUT</span>
                  <div className="employeeSimulation-metric-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 5h16v14H4zM8 9h8M8 13h5" />
                    </svg>
                  </div>
                  <strong>Scenario</strong>
                  <small>Defined context</small>
                </div>

                <div className="employeeSimulation-metric">
                  <span>02 / ACTION</span>
                  <div className="employeeSimulation-metric-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m8 12 3 3 6-7" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                  <strong>Decision</strong>
                  <small>Active response</small>
                </div>

                <div className="employeeSimulation-metric">
                  <span>03 / OUTPUT</span>
                  <div className="employeeSimulation-metric-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 19V5M4 19h16M8 15v-4M12 15V7M16 15V9" />
                    </svg>
                  </div>
                  <strong>Evaluation</strong>
                  <small>Feedback ready</small>
                </div>
              </div>

              <div className="employeeSimulation-dashboard-bottom">
                <span>SIMULATE</span>
                <div className="employeeSimulation-dashboard-track">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <span>ASSESS</span>
              </div>

              <span className="employeeSimulation-dashboard-orbit employeeSimulation-dashboard-orbit--one" />
              <span className="employeeSimulation-dashboard-orbit employeeSimulation-dashboard-orbit--two" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIMULATION CAPABILITIES */}
      <section className="employeeSimulation-section employeeSimulation-modules">
        <div className="employeeSimulation-container">
          <Reveal direction="up">
            <div className="employeeSimulation-section-heading">
              <span>WHAT WE BUILD</span>

              <h2>
                Turn learning into
                <strong> experience.</strong>
              </h2>

              <p>
                Connect realistic situations with interactive practice and
                meaningful evaluation to create a more structured learning
                experience.
              </p>
            </div>
          </Reveal>

          <div className="employeeSimulation-module-list">
            {simulationModules.map((module, index) => (
              <Reveal
                key={module.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 80}
                className="employeeSimulation-module-wrap"
              >
                <article className="employeeSimulation-module-card">
                  <div className="employeeSimulation-module-top">
                    <span className="employeeSimulation-module-number">
                      {module.number}
                    </span>

                    <span className="employeeSimulation-module-tag">
                      {module.tag}
                    </span>
                  </div>

                  <SimulationIcon type={module.icon} />

                  <div className="employeeSimulation-module-content">
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </div>

                  <span
                    className="employeeSimulation-module-mark"
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

      {/* INTERACTIVE SCENARIO LAB */}
      <section className="employeeSimulation-section employeeSimulation-lab">
        <div className="employeeSimulation-container">
          <Reveal direction="left">
            <div className="employeeSimulation-lab-intro">
              <span>INTERACTIVE EXPERIENCE</span>

              <h2>
                Step inside the
                <strong> scenario lab.</strong>
              </h2>

              <p>
                Explore a sample decision-based assessment. Choose a scenario,
                review the situation and select the response you consider most
                appropriate.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="employeeSimulation-lab-panel">
              <div className="employeeSimulation-lab-sidebar">
                <div className="employeeSimulation-lab-sidebar-heading">
                  <span className="employeeSimulation-live-dot" />
                  <span>SCENARIO LIBRARY</span>
                </div>

                <div
                  className="employeeSimulation-scenario-tabs"
                  role="tablist"
                  aria-label="Choose a sample scenario"
                >
                  {practiceScenarios.map((scenario, index) => (
                    <button
                      key={scenario.id}
                      id={`employeeSimulation-tab-${scenario.id}`}
                      type="button"
                      role="tab"
                      aria-selected={activeScenario === index}
                      aria-controls="employeeSimulation-scenario-content"
                      className={`employeeSimulation-scenario-tab ${
                        activeScenario === index ? "is-active" : ""
                      }`}
                      onClick={() => handleScenarioChange(index)}
                    >
                      <span className="employeeSimulation-tab-number">
                        0{index + 1}
                      </span>

                      <span className="employeeSimulation-tab-copy">
                        <strong>{scenario.title}</strong>
                        <small>{scenario.category}</small>
                      </span>

                      <span
                        className="employeeSimulation-tab-arrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  ))}
                </div>

                <div className="employeeSimulation-lab-sidebar-note">
                  <span>LEARNING MODE</span>
                  <p>
                    Sample scenarios for demonstrating interactive decision
                    feedback.
                  </p>
                </div>
              </div>

              <div
                className="employeeSimulation-lab-workspace"
                id="employeeSimulation-scenario-content"
                role="tabpanel"
                aria-labelledby={`employeeSimulation-tab-${currentScenario.id}`}
              >
                <div className="employeeSimulation-workspace-top">
                  <span>{currentScenario.number}</span>
                  <span className="employeeSimulation-workspace-status">
                    <i />
                    INTERACTIVE
                  </span>
                </div>

                <div className="employeeSimulation-question">
                  <span className="employeeSimulation-question-label">
                    THE SITUATION
                  </span>

                  <h3>{currentScenario.title}</h3>

                  <p>{currentScenario.prompt}</p>
                </div>

                <div className="employeeSimulation-answer-heading">
                  <span>SELECT YOUR RESPONSE</span>
                  <small>{currentScenario.options.length} OPTIONS</small>
                </div>

                <div className="employeeSimulation-answer-list">
                  {currentScenario.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const showResult = selectedOption !== null;
                    const isCorrect = option.correct;

                    let optionClass = "";

                    if (showResult && isSelected) {
                      optionClass = isCorrect
                        ? "is-correct"
                        : "is-incorrect";
                    }

                    if (showResult && isCorrect && !isSelected) {
                      optionClass = "is-correct-answer";
                    }

                    return (
                      <button
                        key={option.label}
                        type="button"
                        className={`employeeSimulation-answer-option ${optionClass}`}
                        onClick={() => handleOptionSelect(index)}
                        aria-pressed={isSelected}
                      >
                        <span className="employeeSimulation-answer-letter">
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span className="employeeSimulation-answer-label">
                          {option.label}
                        </span>

                        <span className="employeeSimulation-answer-indicator">
                          {showResult && isCorrect
                            ? "✓"
                            : isSelected
                              ? "×"
                              : "+"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div
                    className={`employeeSimulation-feedback ${
                      currentScenario.options[selectedOption].correct
                        ? "employeeSimulation-feedback--success"
                        : "employeeSimulation-feedback--review"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    <span className="employeeSimulation-feedback-icon">
                      {currentScenario.options[selectedOption].correct
                        ? "✓"
                        : "!"}
                    </span>

                    <div>
                      <strong>
                        {currentScenario.options[selectedOption].correct
                          ? "Response reviewed"
                          : "Review the decision"}
                      </strong>

                      <p>
                        {
                          currentScenario.options[selectedOption]
                            .feedback
                        }
                      </p>
                    </div>
                  </div>
                )}

                <div className="employeeSimulation-workspace-bottom">
                  <span>
                    SCENARIO {String(activeScenario + 1).padStart(2, "0")} / 03
                  </span>

                  <span>
                    {selectedOption === null
                      ? "AWAITING RESPONSE"
                      : "RESPONSE RECORDED"}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up">
            <p className="employeeSimulation-lab-disclaimer">
              This is a sample interactive experience. Real simulations and
              assessment criteria can be customised to the intended learning
              objectives and project requirements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="employeeSimulation-section employeeSimulation-process">
        <div className="employeeSimulation-container">
          <Reveal direction="left">
            <div className="employeeSimulation-process-intro">
              <span>OUR APPROACH</span>

              <h2>
                From a learning goal
                <strong> to measurable insight.</strong>
              </h2>

              <p>
                A defined process connects the learning objective, scenario
                design, learner interaction and assessment review.
              </p>
            </div>
          </Reveal>

          <div className="employeeSimulation-process-line">
            {simulationSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 75}
                className="employeeSimulation-process-item"
              >
                <div className="employeeSimulation-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="employeeSimulation-process-copy">
                  <span className="employeeSimulation-process-label">
                    PHASE {step.number}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="employeeSimulation-section employeeSimulation-benefits">
        <div className="employeeSimulation-container">
          <Reveal direction="right">
            <div className="employeeSimulation-section-heading">
              <span>THE VALUE OF SIMULATION</span>

              <h2>
                Practice with purpose.
                <strong> Measure with clarity.</strong>
              </h2>

              <p>
                Well-defined simulations and assessments can make learning
                activities more practical, observable and easier to review.
              </p>
            </div>
          </Reveal>

          <div className="employeeSimulation-benefit-list">
            {simulationBenefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="employeeSimulation-benefit">
                  <span className="employeeSimulation-benefit-number">
                    {benefit.number}
                  </span>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>

                  <span
                    className="employeeSimulation-benefit-line"
                    aria-hidden="true"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="employeeSimulation-section employeeSimulation-faq">
        <div className="employeeSimulation-container">
          <Reveal direction="up">
            <div className="employeeSimulation-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understand the
                <strong> learning experience.</strong>
              </h2>

              <p>
                Learn more about scenario design, performance evaluation and
                simulation-based learning.
              </p>
            </div>
          </Reveal>

          <div className="employeeSimulation-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `employeeSimulation-faq-answer-${index}`;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 50}
                >
                  <article
                    className={`employeeSimulation-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="employeeSimulation-faq-question"
                      onClick={() => handleFaqToggle(index)}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span className="employeeSimulation-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        {faq.question}
                      </span>

                      <span
                        className="employeeSimulation-faq-toggle"
                        aria-hidden="true"
                      >
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div
                      id={answerId}
                      className="employeeSimulation-faq-answer"
                      aria-hidden={!isActive}
                    >
                      <div className="employeeSimulation-faq-answer-inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT — NO CTA */}
      <section className="employeeSimulation-final">
        <Reveal direction="up">
          <div className="employeeSimulation-final-inner">
            <span>THE LEARNING OUTCOME</span>

            <h2>
              Practise the
              <br />
              <strong>possibilities.</strong>
              <br />
              Measure the
              <br />
              <strong>progress.</strong>
            </h2>

            <p>
              Meaningful simulation turns decisions into practice. Structured
              assessment turns that practice into insight for continuous
              learning and improvement.
            </p>

            <div
              className="employeeSimulation-final-indicator"
              aria-hidden="true"
            >
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

export default SimulationAssessment;