import React, { useEffect, useRef, useState } from "react";
import "./ImmersiveTraining.css";

const trainingModules = [
  {
    number: "01",
    title: "VR Safety Simulations",
    description:
      "Place learners inside carefully designed virtual scenarios where they can recognise hazards, practise decisions and understand procedures before facing real-world conditions.",
    icon: "vr",
    tag: "SAFE PRACTICE",
  },
  {
    number: "02",
    title: "Interactive 3D Walkthroughs",
    description:
      "Guide learners through digital workplaces, facilities and operational spaces with contextual information, visual cues and clearly structured learning checkpoints.",
    icon: "walkthrough",
    tag: "SPATIAL LEARNING",
  },
  {
    number: "03",
    title: "Scenario-Based Learning",
    description:
      "Build branching situations that ask learners to assess context, choose a response and explore the consequences of each decision with useful feedback.",
    icon: "scenario",
    tag: "DECISION PRACTICE",
  },
  {
    number: "04",
    title: "Equipment Familiarisation",
    description:
      "Introduce machines, tools and product systems through labelled components, guided procedures and repeatable practice in a controlled digital environment.",
    icon: "equipment",
    tag: "HANDS-ON LEARNING",
  },
  {
    number: "05",
    title: "Role-Play & Soft Skills",
    description:
      "Create realistic communication situations for practising customer conversations, teamwork, leadership and workplace interactions at a comfortable pace.",
    icon: "people",
    tag: "HUMAN SKILLS",
  },
  {
    number: "06",
    title: "Collaborative Learning Spaces",
    description:
      "Bring remote participants into shared digital learning environments for guided demonstrations, group discussion and instructor-led activities.",
    icon: "collaboration",
    tag: "SHARED EXPERIENCE",
  },
];

const trainingSteps = [
  {
    number: "01",
    title: "Understand the Learning Goal",
    description:
      "Define the audience, target competencies, expected behaviours and situations that learners need to understand or practise.",
  },
  {
    number: "02",
    title: "Design the Experience",
    description:
      "Plan the environment, narrative, learning checkpoints, interactions and feedback so each activity supports the intended objective.",
  },
  {
    number: "03",
    title: "Build & Test the Module",
    description:
      "Develop the digital experience and review usability, navigation, accessibility, performance and learning flow across supported devices.",
  },
  {
    number: "04",
    title: "Review Learning & Refine",
    description:
      "Use learner feedback and available completion or assessment data to identify improvements and keep the training experience relevant.",
  },
];

const trainingBenefits = [
  {
    number: "01",
    title: "Practise Without Real-World Pressure",
    description:
      "Learners can repeat activities, explore mistakes and build familiarity in a designed environment before applying their skills on the job.",
  },
  {
    number: "02",
    title: "Make Complex Topics Easier to Experience",
    description:
      "Spatial demonstrations and interactive sequences can make processes, equipment and unfamiliar environments easier to understand.",
  },
  {
    number: "03",
    title: "Keep Learning Active",
    description:
      "Purposeful choices, guided tasks and feedback invite learners to participate instead of only watching or reading information.",
  },
  {
    number: "04",
    title: "Create Repeatable Learning Experiences",
    description:
      "A structured digital module gives learners a consistent practice path that can be revisited and improved over time.",
  },
];

const trainingFaqs = [
  {
    question: "What is immersive training?",
    answer:
      "Immersive training uses interactive digital environments, simulations, 3D walkthroughs or scenario-based activities to help learners experience concepts and practise skills. The right format depends on the learning goal, audience and available devices.",
  },
  {
    question: "Does immersive training always require a VR headset?",
    answer:
      "No. Some experiences use a VR headset, while others run on a desktop, tablet or mobile browser. The interaction and device requirements should be selected to suit the content and the learners.",
  },
  {
    question: "Which subjects can be taught through immersive experiences?",
    answer:
      "Possible applications include workplace procedures, equipment familiarisation, safety scenarios, product education, customer interactions, spatial orientation and collaborative learning. Suitability depends on the topic and the experience design.",
  },
  {
    question: "Can learners receive feedback during a simulation?",
    answer:
      "Yes. A module can provide contextual hints, decision feedback, progress markers, knowledge checks and completion information when those features are included in the design.",
  },
  {
    question: "Can existing training material be reused?",
    answer:
      "Existing procedures, scripts, diagrams, product information and instructional content can be reviewed as source material. They may need to be reorganised into interactive activities that suit the target learning experience.",
  },
];

const learningModes = [
  {
    id: "explore",
    step: "MODE 01",
    label: "Guided exploration",
    title: "Explore a digital environment",
    description:
      "Learners move through a designed space, inspect points of interest and uncover information in a sequence that supports spatial understanding.",
    prompt:
      "You have entered a new training environment. What is the most useful first action?",
    options: [
      {
        label: "Review the orientation and navigation cues",
        correct: true,
        feedback:
          "Good choice. Understanding the environment and navigation cues first helps learners move through the experience with greater clarity.",
      },
      {
        label: "Skip every checkpoint immediately",
        correct: false,
        feedback:
          "Try another response. Checkpoints provide context and help learners understand the environment before progressing.",
      },
      {
        label: "Select objects without reviewing their labels",
        correct: false,
        feedback:
          "Labels may explain what an object represents or what to do next. Review the relevant cues before interacting.",
      },
    ],
  },
  {
    id: "practice",
    step: "MODE 02",
    label: "Skills rehearsal",
    title: "Practise a structured procedure",
    description:
      "Learners work through a sequence of tasks with visual guidance, checkpoints and opportunities to review a step before continuing.",
    prompt:
      "During a practice module, you are unsure whether a required step is complete. What should you do?",
    options: [
      {
        label: "Continue without verifying the step",
        correct: false,
        feedback:
          "A skipped verification can leave a gap in the process. Review the instruction and confirm the step before moving on.",
      },
      {
        label: "Check the instruction and verify the step",
        correct: true,
        feedback:
          "Good choice. Checking the instruction and confirming the step supports careful, repeatable practice.",
      },
      {
        label: "Restart without checking the guidance",
        correct: false,
        feedback:
          "Restarting may not resolve the uncertainty. Review the relevant guidance first, then repeat the necessary action.",
      },
    ],
  },
  {
    id: "scenario",
    step: "MODE 03",
    label: "Decision scenario",
    title: "Respond to a changing situation",
    description:
      "Learners consider a contextual challenge, choose a response and review feedback that explains how the decision relates to the learning objective.",
    prompt:
      "A scenario changes and introduces information you did not expect. What is the best next step?",
    options: [
      {
        label: "Pause, assess the new information and choose a response",
        correct: true,
        feedback:
          "Good choice. Reviewing new information before acting keeps the decision connected to the scenario and its learning objective.",
      },
      {
        label: "Repeat the previous action automatically",
        correct: false,
        feedback:
          "The situation has changed, so the previous action may no longer fit. Reassess the available information first.",
      },
      {
        label: "Ignore the new information and finish quickly",
        correct: false,
        feedback:
          "The new information may be important. Review it and choose an action that responds to the current scenario.",
      },
    ],
  },
];

const iconPaths = {
  vr: (
    <>
      <path d="M3 9.5A2.5 2.5 0 0 1 5.5 7h13A2.5 2.5 0 0 1 21 9.5v5a2.5 2.5 0 0 1-2.5 2.5h-2.1l-2.2-2.2h-4.4L7.6 17H5.5A2.5 2.5 0 0 1 3 14.5v-5Z" />
      <path d="M7 11h3M14 11h3M12 10v4" />
    </>
  ),
  walkthrough: (
    <>
      <path d="M3 20V8l9-5 9 5v12" />
      <path d="M8 20v-6h8v6M3 8l9 5 9-5" />
      <path d="m10 10 2 1.2 2-1.2" />
    </>
  ),
  scenario: (
    <>
      <path d="M12 3 21 8v8l-9 5-9-5V8l9-5Z" />
      <path d="M12 12 21 8M12 12 3 8M12 12v9" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  equipment: (
    <>
      <path d="M14 6V4a2 2 0 0 0-4 0v2" />
      <rect x="4" y="6" width="16" height="15" rx="2" />
      <path d="M8 10h8M8 14h3M16 14h.01M10 18h4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1.5A4.5 4.5 0 0 1 7.5 14h3A4.5 4.5 0 0 1 15 18.5V20" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M18 14a4 4 0 0 1 3 3.9V20" />
    </>
  ),
  collaboration: (
    <>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="12" cy="16" r="2.5" />
      <path d="m8 9 2.5 4M16 9l-2.5 4M8.5 7h7" />
    </>
  ),
};

const ImmersiveTrainingIcon = ({ type }) => (
  <div className="immersiveTraining-icon" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[type]}
    </svg>
  </div>
);

const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!("IntersectionObserver" in window) || reduceMotion) {
      element.classList.add("immersiveTraining-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle(
          "immersiveTraining-is-visible",
          entry.isIntersecting
        );
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`immersiveTraining-reveal immersiveTraining-reveal--${direction} ${className}`}
      style={{ "--immersiveTraining-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ImmersiveTraining = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeMode, setActiveMode] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const currentMode = learningModes[activeMode];

  const handleModeChange = (index) => {
    setActiveMode(index);
    setSelectedOption(null);
  };

  return (
    <main className="immersiveTraining-page">
      {/* HERO */}
      <section className="immersiveTraining-hero">
        <div className="immersiveTraining-hero-inner">
          <Reveal direction="left" className="immersiveTraining-hero-content">
            <span className="immersiveTraining-eyebrow">
              IMMERSIVE / LEARNING STUDIO
            </span>

            <h1>
              Learn by
              <span> experiencing.</span>
              <br />
              Practise with
              <span> purpose.</span>
            </h1>

            <p>
              We create immersive training experiences that turn concepts into
              guided exploration, realistic practice and meaningful decisions.
              Learners engage with digital environments, follow tasks and build
              understanding through active participation.
            </p>

            <div className="immersiveTraining-hero-meta">
              <span>Explore</span>
              <i />
              <span>Practise</span>
              <i />
              <span>Improve</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="immersiveTraining-hero-visual"
          >
            <div className="immersiveTraining-training-stage" aria-label="Illustration of an immersive digital training environment">
              <div className="immersiveTraining-stage-header">
                <div className="immersiveTraining-stage-brand">
                  <span className="immersiveTraining-live-dot" />
                  <span>IMMERSIVE LAB</span>
                </div>
                <span className="immersiveTraining-stage-code">MODULE / 001</span>
              </div>

              <div className="immersiveTraining-stage-title">
                <div>
                  <span>LEARNING ENVIRONMENT</span>
                  <h2>Experience in progress</h2>
                </div>
                <span className="immersiveTraining-stage-index">XR</span>
              </div>

              <div className="immersiveTraining-virtual-room">
                <div className="immersiveTraining-room-backwall">
                  <span className="immersiveTraining-room-window" />
                  <span className="immersiveTraining-room-screen">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="immersiveTraining-room-light" />
                </div>
                <div className="immersiveTraining-room-floor" />
                <div className="immersiveTraining-room-platform" />

                <div className="immersiveTraining-headset" aria-hidden="true">
                  <span className="immersiveTraining-headset-strap" />
                  <span className="immersiveTraining-headset-body">
                    <i />
                    <i />
                  </span>
                  <span className="immersiveTraining-headset-glow" />
                </div>

                <span className="immersiveTraining-scene-pin immersiveTraining-scene-pin--one">
                  <i />
                  <b>01</b>
                </span>
                <span className="immersiveTraining-scene-pin immersiveTraining-scene-pin--two">
                  <i />
                  <b>02</b>
                </span>
                <span className="immersiveTraining-scene-crosshair" />
                <span className="immersiveTraining-scene-label">INTERACTIVE SPACE</span>
              </div>

              <div className="immersiveTraining-stage-footer">
                <div className="immersiveTraining-stage-progress-copy">
                  <span>LEARNING PATH</span>
                  <strong>Explore · Practise · Review</strong>
                </div>
                <div className="immersiveTraining-stage-progress" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <span className="immersiveTraining-stage-orbit immersiveTraining-stage-orbit--one" />
              <span className="immersiveTraining-stage-orbit immersiveTraining-stage-orbit--two" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRAINING FORMATS */}
      <section className="immersiveTraining-section immersiveTraining-modules" id="immersiveTraining-modules">
        <div className="immersiveTraining-container">
          <Reveal direction="up">
            <div className="immersiveTraining-section-heading">
              <span>WHAT WE CREATE</span>
              <h2>
                Training that feels
                <strong> hands-on.</strong>
              </h2>
              <p>
                From virtual procedures to interactive role-play, each format is
                shaped around the skills, context and decisions learners need to
                practise.
              </p>
            </div>
          </Reveal>

          <div className="immersiveTraining-module-list">
            {trainingModules.map((module, index) => (
              <Reveal
                key={module.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="immersiveTraining-module-wrap"
              >
                <article className="immersiveTraining-module-card">
                  <div className="immersiveTraining-module-number">{module.number}</div>
                  <ImmersiveTrainingIcon type={module.icon} />
                  <div className="immersiveTraining-module-content">
                    <span className="immersiveTraining-module-tag">{module.tag}</span>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                  </div>
                  <span className="immersiveTraining-module-arrow" aria-hidden="true">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE LEARNING LAB */}
      <section className="immersiveTraining-section immersiveTraining-lab">
        <div className="immersiveTraining-container">
          <Reveal direction="left">
            <div className="immersiveTraining-lab-intro">
              <span>INTERACTIVE LEARNING LAB</span>
              <h2>
                Experience the
                <strong> learning flow.</strong>
              </h2>
              <p>
                Choose a training mode and respond to a sample learning
                situation. The activity demonstrates how a module can combine
                context, decisions and instructional feedback.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="immersiveTraining-lab-panel">
              <aside className="immersiveTraining-lab-sidebar">
                <div className="immersiveTraining-lab-sidebar-heading">
                  <span className="immersiveTraining-live-dot" />
                  <span>TRAINING MODES</span>
                </div>

                <div className="immersiveTraining-mode-list" role="tablist" aria-label="Select a training mode">
                  {learningModes.map((mode, index) => (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      id={`immersiveTraining-tab-${mode.id}`}
                      aria-selected={activeMode === index}
                      aria-controls="immersiveTraining-learning-panel"
                      className={`immersiveTraining-mode-button ${activeMode === index ? "is-active" : ""}`}
                      onClick={() => handleModeChange(index)}
                    >
                      <span className="immersiveTraining-mode-number">0{index + 1}</span>
                      <span className="immersiveTraining-mode-copy">
                        <strong>{mode.label}</strong>
                        <small>{mode.step}</small>
                      </span>
                      <span className="immersiveTraining-mode-arrow" aria-hidden="true">→</span>
                    </button>
                  ))}
                </div>

                <div className="immersiveTraining-lab-note">
                  <span>DESIGNED FOR PRACTICE</span>
                  <p>Example content only. Learning scenarios can be adapted to a training objective.</p>
                </div>
              </aside>

              <div
                className="immersiveTraining-lab-workspace"
                id="immersiveTraining-learning-panel"
                role="tabpanel"
                aria-labelledby={`immersiveTraining-tab-${currentMode.id}`}
              >
                <div className="immersiveTraining-workspace-top">
                  <span>{currentMode.step}</span>
                  <span className="immersiveTraining-workspace-status"><i /> ACTIVE MODULE</span>
                </div>

                <div className="immersiveTraining-learning-context">
                  <span>LEARNING OBJECTIVE</span>
                  <h3>{currentMode.title}</h3>
                  <p>{currentMode.description}</p>
                </div>

                <div className="immersiveTraining-question">
                  <span>YOUR TASK</span>
                  <p>{currentMode.prompt}</p>
                </div>

                <div className="immersiveTraining-answer-heading">
                  <span>CHOOSE A RESPONSE</span>
                  <small>{currentMode.options.length} OPTIONS</small>
                </div>

                <div className="immersiveTraining-answer-list">
                  {currentMode.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const showFeedback = selectedOption !== null;
                    let optionState = "";

                    if (showFeedback && isSelected) {
                      optionState = option.correct ? "is-correct" : "is-incorrect";
                    } else if (showFeedback && option.correct) {
                      optionState = "is-correct-answer";
                    }

                    return (
                      <button
                        key={option.label}
                        type="button"
                        className={`immersiveTraining-answer-option ${optionState}`}
                        onClick={() => setSelectedOption(index)}
                        aria-pressed={isSelected}
                      >
                        <span className="immersiveTraining-answer-letter">{String.fromCharCode(65 + index)}</span>
                        <span className="immersiveTraining-answer-text">{option.label}</span>
                        <span className="immersiveTraining-answer-mark" aria-hidden="true">
                          {showFeedback && option.correct ? "✓" : isSelected ? "×" : "+"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div
                    className={`immersiveTraining-feedback ${currentMode.options[selectedOption].correct ? "is-success" : "is-review"}`}
                    role="status"
                    aria-live="polite"
                  >
                    <span className="immersiveTraining-feedback-symbol" aria-hidden="true">
                      {currentMode.options[selectedOption].correct ? "✓" : "!"}
                    </span>
                    <div>
                      <strong>{currentMode.options[selectedOption].correct ? "Good decision" : "Review the situation"}</strong>
                      <p>{currentMode.options[selectedOption].feedback}</p>
                    </div>
                  </div>
                )}

                <div className="immersiveTraining-workspace-footer">
                  <span>MODE {String(activeMode + 1).padStart(2, "0")} / 03</span>
                  <span>{selectedOption === null ? "AWAITING RESPONSE" : "RESPONSE REVIEWED"}</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up">
            <p className="immersiveTraining-lab-disclaimer">
              This is a sample learning interaction, not a certification or a substitute for role-specific instruction.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="immersiveTraining-section immersiveTraining-process">
        <div className="immersiveTraining-container">
          <Reveal direction="left">
            <div className="immersiveTraining-process-intro">
              <span>THE DEVELOPMENT PROCESS</span>
              <h2>
                From learning goal
                <strong> to immersive experience.</strong>
              </h2>
              <p>
                A structured workflow keeps the experience relevant, usable and
                aligned with the intended learning outcome.
              </p>
            </div>
          </Reveal>

          <div className="immersiveTraining-process-line">
            {trainingSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 80}
                className="immersiveTraining-process-item"
              >
                <div className="immersiveTraining-process-marker"><span>{step.number}</span></div>
                <div className="immersiveTraining-process-copy">
                  <span className="immersiveTraining-process-label">PHASE {step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="immersiveTraining-section immersiveTraining-benefits">
        <div className="immersiveTraining-container">
          <Reveal direction="right">
            <div className="immersiveTraining-section-heading">
              <span>WHY IMMERSIVE TRAINING</span>
              <h2>
                Less passive viewing.
                <strong> More active learning.</strong>
              </h2>
              <p>
                Immersive experiences can create opportunities to explore,
                practise and review information in ways that suit the learning
                objective.
              </p>
            </div>
          </Reveal>

          <div className="immersiveTraining-benefit-list">
            {trainingBenefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="immersiveTraining-benefit">
                  <span className="immersiveTraining-benefit-number">{benefit.number}</span>
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
      <section className="immersiveTraining-section immersiveTraining-faq">
        <div className="immersiveTraining-container">
          <Reveal direction="up">
            <div className="immersiveTraining-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Understand the
                <strong> experience.</strong>
              </h2>
              <p>
                Practical answers about immersive formats, devices and the way
                training modules are designed.
              </p>
            </div>
          </Reveal>

          <div className="immersiveTraining-faq-list">
            {trainingFaqs.map((faq, index) => {
              const isActive = activeFaq === index;
              const answerId = `immersiveTraining-faq-answer-${index}`;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 55}
                >
                  <article className={`immersiveTraining-faq-item ${isActive ? "is-active" : ""}`}>
                    <button
                      type="button"
                      className="immersiveTraining-faq-question"
                      onClick={() => setActiveFaq((current) => current === index ? null : index)}
                      aria-expanded={isActive}
                      aria-controls={answerId}
                    >
                      <span className="immersiveTraining-faq-question-text">
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        {faq.question}
                      </span>
                      <b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>
                    <div id={answerId} className="immersiveTraining-faq-answer" aria-hidden={!isActive}>
                      <div className="immersiveTraining-faq-answer-inner">
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
      <section className="immersiveTraining-final">
        <Reveal direction="up">
          <div className="immersiveTraining-final-inner">
            <span>THE LEARNING OUTCOME</span>
            <h2>
              Don't just
              <br />
              <strong>learn the steps.</strong>
              <br />
              Experience the
              <br />
              <strong>process.</strong>
            </h2>
            <p>
              Immersive training brings context, interaction and purposeful
              practice together to create a learning experience people can
              explore and revisit.
            </p>
            <div className="immersiveTraining-final-indicator" aria-hidden="true">
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

export default ImmersiveTraining;
