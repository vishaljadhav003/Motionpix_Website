import React, { useEffect, useRef, useState } from "react";
import "./InteractiveLearning.css";

const learningServices = [
  {
    number: "01",
    title: "Interactive Course Design",
    description:
      "Learning content is organised into focused screens, visual explanations and meaningful activities that help learners explore concepts at their own pace.",
    icon: "course",
  },
  {
    number: "02",
    title: "Clickable Learning Experiences",
    description:
      "Clickable tabs, hotspots, markers and reveal interactions let learners discover information actively instead of passively reading through slides.",
    icon: "click",
  },
  {
    number: "03",
    title: "Scenario-Based Learning",
    description:
      "Realistic situations, decision points and alternative outcomes help learners practise judgement and understand the consequences of their choices.",
    icon: "scenario",
  },
  {
    number: "04",
    title: "Knowledge Checks & Quizzes",
    description:
      "Knowledge checks, question types, hints and contextual feedback help learners test understanding throughout the learning experience.",
    icon: "quiz",
  },
  {
    number: "05",
    title: "Guided Learning Activities",
    description:
      "Step-by-step demonstrations, guided exploration and practical exercises break complex topics into manageable learning activities.",
    icon: "activity",
  },
  {
    number: "06",
    title: "Responsive Digital Learning",
    description:
      "Content layouts and interactions are planned for different screen sizes so learners can access the experience across supported devices.",
    icon: "responsive",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand the Learner",
    description:
      "Identify the audience, learning objectives, existing knowledge and the skills learners should gain from the experience.",
  },
  {
    number: "02",
    title: "Structure the Experience",
    description:
      "Organise the content into logical learning paths, concise screens, activities and decision points with a clear progression.",
  },
  {
    number: "03",
    title: "Build Interactions",
    description:
      "Combine clickable elements, knowledge checks, feedback and guided activities to give learners meaningful ways to participate.",
  },
  {
    number: "04",
    title: "Test the Learning Flow",
    description:
      "Review navigation, interaction states, feedback, readability and responsive behaviour before preparing the final learning experience.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Active Participation",
    description:
      "Learners interact with content through choices, exploration and activities instead of relying only on passive viewing.",
  },
  {
    number: "02",
    title: "Clear Learning Progression",
    description:
      "Structured screens and guided navigation help learners understand where they are and what to do next.",
  },
  {
    number: "03",
    title: "Immediate Feedback",
    description:
      "Helpful responses to answers and decisions can reinforce correct understanding and clarify mistakes.",
  },
  {
    number: "04",
    title: "Practice Through Decisions",
    description:
      "Scenarios and simulations create opportunities to apply knowledge in a structured learning environment.",
  },
];

const faqs = [
  {
    question: "What is interactive learning?",
    answer:
      "Interactive learning is an approach in which learners actively participate through activities, choices, questions, clickable content, feedback and guided exploration rather than only consuming information.",
  },
  {
    question: "What interactions can be included?",
    answer:
      "Depending on the learning objectives, an experience can include clickable tabs, hotspots, labelled graphics, drag-and-drop activities, quizzes, branching scenarios, guided steps and feedback.",
  },
  {
    question: "How is interactive learning different from a presentation?",
    answer:
      "A conventional presentation is often designed mainly for viewing. An interactive learning experience adds purposeful learner actions, navigation choices, knowledge checks and responses that support participation.",
  },
  {
    question: "Can interactive activities include quizzes and feedback?",
    answer:
      "Yes. Knowledge checks can provide feedback after a response, explain an answer and help learners revisit important concepts. The activity should match the learning objective.",
  },
  {
    question: "Can interactive learning work on mobile devices?",
    answer:
      "It can be designed for supported mobile and desktop environments. Layouts, text size, navigation and interaction methods should be tested at different screen sizes.",
  },
  {
    question: "How do you evaluate an interactive learning experience?",
    answer:
      "Review the clarity of the learning objectives, accuracy of the content, usability of the interactions, quality of feedback, navigation flow and behaviour across supported devices.",
  },
];

const LearningIcon = ({ type }) => (
  <div
    className={`interactive-learning-icon interactive-learning-icon--${type}`}
    aria-hidden="true"
  >
    {type === "course" && (
      <>
        <span className="il-course-sheet" />
        <span className="il-course-line il-course-line-one" />
        <span className="il-course-line il-course-line-two" />
        <span className="il-course-check">✓</span>
      </>
    )}

    {type === "click" && (
      <>
        <span className="il-click-target" />
        <span className="il-click-pointer" />
        <span className="il-click-ripple il-click-ripple-one" />
        <span className="il-click-ripple il-click-ripple-two" />
      </>
    )}

    {type === "scenario" && (
      <>
        <span className="il-scenario-node il-scenario-node-one" />
        <span className="il-scenario-node il-scenario-node-two" />
        <span className="il-scenario-node il-scenario-node-three" />
        <span className="il-scenario-path il-scenario-path-one" />
        <span className="il-scenario-path il-scenario-path-two" />
      </>
    )}

    {type === "quiz" && (
      <>
        <span className="il-quiz-sheet" />
        <span className="il-quiz-option il-quiz-option-one" />
        <span className="il-quiz-option il-quiz-option-two" />
        <span className="il-quiz-option il-quiz-option-three" />
        <span className="il-quiz-check">✓</span>
      </>
    )}

    {type === "activity" && (
      <>
        <span className="il-activity-card il-activity-card-one" />
        <span className="il-activity-card il-activity-card-two" />
        <span className="il-activity-arrow">↗</span>
      </>
    )}

    {type === "responsive" && (
      <>
        <span className="il-responsive-screen" />
        <span className="il-responsive-phone" />
        <span className="il-responsive-screen-line" />
      </>
    )}
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

    if (!element) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("interactive-learning-is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("interactive-learning-is-visible");
        } else {
          element.classList.remove("interactive-learning-is-visible");
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
      className={`interactive-learning-reveal interactive-learning-reveal--${direction} ${className}`}
      style={{ "--il-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const InteractiveLearning = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [showLessonFeedback, setShowLessonFeedback] = useState(false);

  const lessonSteps = [
    {
      label: "Explore",
      title: "Discover the concept",
      description:
        "Select a learning point to reveal information and explore the topic.",
      detail: "Explore each point before moving to the next step.",
    },
    {
      label: "Practice",
      title: "Make a decision",
      description:
        "Choose an answer and see how feedback supports your understanding.",
      detail: "Your choice becomes an opportunity to learn and improve.",
    },
    {
      label: "Reflect",
      title: "Check your understanding",
      description:
        "Review the explanation and connect it to the learning objective.",
      detail: "Reflection helps connect the activity to the main concept.",
    },
  ];

  const currentLesson = lessonSteps[activeLesson];

  const handleLessonChange = (index) => {
    setActiveLesson(index);
    setShowLessonFeedback(false);
  };

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="interactive-learning-page">
      {/* HERO */}
      <section className="interactive-learning-hero">
        <div className="interactive-learning-hero-inner">
          <Reveal
            direction="left"
            className="interactive-learning-hero-content"
          >
            <span className="interactive-learning-eyebrow">
              LEARNING / INTERACTION DESIGN
            </span>

            <h1>
              Learn by
              <span> Doing.</span>
              <br />
              Understand by
              <span> Exploring.</span>
            </h1>

            <p>
              We shape digital learning experiences around participation,
              exploration and meaningful feedback. From clickable content
              to scenario-based activities, every interaction gives learners
              a purposeful way to engage with ideas and build understanding.
            </p>

            <div className="interactive-learning-hero-meta">
              <span>Explore</span>
              <i />
              <span>Interact</span>
              <i />
              <span>Practice</span>
              <i />
              <span>Understand</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="interactive-learning-hero-visual"
          >
            <div className="interactive-learning-stage">
              <div className="il-stage-topbar">
                <span className="il-stage-brand">
                  <i />
                  LEARNING LAB
                </span>
                <span className="il-stage-status">INTERACTIVE MODULE</span>
              </div>

              <div className="il-stage-progress">
                <span />
                <span />
                <span />
              </div>

              <div className="il-stage-main">
                <div className="il-stage-side-label">
                  <span>MODULE 01</span>
                  <strong>Explore a concept</strong>
                </div>

                <div className="il-learning-illustration">
                  <div className="il-orbit il-orbit-one" />
                  <div className="il-orbit il-orbit-two" />

                  <div className="il-learning-core">
                    <span className="il-core-symbol">✦</span>
                  </div>

                  <div className="il-learning-point il-point-one">
                    <span>01</span>
                  </div>
                  <div className="il-learning-point il-point-two">
                    <span>02</span>
                  </div>
                  <div className="il-learning-point il-point-three">
                    <span>03</span>
                  </div>

                  <span className="il-learning-connector il-connector-one" />
                  <span className="il-learning-connector il-connector-two" />
                  <span className="il-learning-connector il-connector-three" />
                </div>

                <div className="il-stage-caption">
                  <span className="il-caption-indicator" />
                  Select a point to explore
                </div>
              </div>

              <div className="il-stage-bottom">
                <div className="il-stage-bottom-copy">
                  <span>LEARNING FLOW</span>
                  <strong>Explore → Practice → Reflect</strong>
                </div>
                <div className="il-stage-bottom-mark">IL / 01</div>
              </div>

              <div className="il-floating-note il-floating-note-one">
                <span>✓</span>
                Active participation
              </div>

              <div className="il-floating-note il-floating-note-two">
                <span>↗</span>
                Meaningful feedback
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTERACTIVE LEARNING SERVICES */}
      <section
        className="interactive-learning-section interactive-learning-services"
        id="interactive-learning-services"
      >
        <div className="interactive-learning-container">
          <Reveal direction="up">
            <div className="interactive-learning-section-heading">
              <span>WHAT WE CREATE</span>
              <h2>
                Designed for
                <strong> active learning.</strong>
              </h2>
              <p>
                Interactive learning combines structured content with
                purposeful learner actions, giving every activity a clear
                role in the learning journey.
              </p>
            </div>
          </Reveal>

          <div className="interactive-learning-services-list">
            {learningServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={(index % 3) * 70}
                className="interactive-learning-service-wrap"
              >
                <article className="interactive-learning-service-card">
                  <div className="interactive-learning-service-number">
                    {service.number}
                  </div>

                  <LearningIcon type={service.icon} />

                  <div className="interactive-learning-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="interactive-learning-service-arrow">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section className="interactive-learning-section interactive-learning-demo">
        <div className="interactive-learning-container">
          <Reveal direction="left">
            <div className="interactive-learning-demo-intro">
              <span>EXPERIENCE THE FLOW</span>
              <h2>
                Learning becomes meaningful when
                <strong> you take part.</strong>
              </h2>
              <p>
                Explore this small learning-flow demonstration. Switch
                between the steps to see how an interactive experience
                can guide a learner from discovery to reflection.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="interactive-learning-demo-panel">
              <div className="il-demo-header">
                <div>
                  <span className="il-demo-kicker">SAMPLE MODULE</span>
                  <h3>How interactive learning works</h3>
                </div>
                <span className="il-demo-index">
                  0{activeLesson + 1} / 03
                </span>
              </div>

              <div
                className="il-demo-tabs"
                role="tablist"
                aria-label="Learning steps"
              >
                {lessonSteps.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    role="tab"
                    id={`il-step-tab-${index}`}
                    aria-selected={activeLesson === index}
                    aria-controls="il-step-panel"
                    className={
                      activeLesson === index ? "is-active" : ""
                    }
                    onClick={() => handleLessonChange(index)}
                  >
                    <span>0{index + 1}</span>
                    {step.label}
                  </button>
                ))}
              </div>

              <div
                className="il-demo-content"
                id="il-step-panel"
                role="tabpanel"
                aria-labelledby={`il-step-tab-${activeLesson}`}
              >
                <div className="il-demo-visual">
                  <div className="il-demo-visual-ring il-demo-ring-one" />
                  <div className="il-demo-visual-ring il-demo-ring-two" />

                  <div className="il-demo-visual-icon">
                    {activeLesson === 0 && <span className="il-demo-book">↗</span>}
                    {activeLesson === 1 && <span className="il-demo-choice">?</span>}
                    {activeLesson === 2 && <span className="il-demo-check">✓</span>}
                  </div>

                  <span className="il-demo-visual-dot il-demo-dot-one" />
                  <span className="il-demo-visual-dot il-demo-dot-two" />
                  <span className="il-demo-visual-dot il-demo-dot-three" />
                </div>

                <div className="il-demo-copy">
                  <span className="il-demo-step-label">
                    STEP 0{activeLesson + 1}
                  </span>
                  <h4>{currentLesson.title}</h4>
                  <p>{currentLesson.description}</p>

                  {!showLessonFeedback ? (
                    <button
                      type="button"
                      className="il-demo-action"
                      onClick={() => setShowLessonFeedback(true)}
                    >
                      Reveal learning insight
                      <span>↗</span>
                    </button>
                  ) : (
                    <div className="il-demo-feedback" role="status">
                      <span>✓</span>
                      <p>{currentLesson.detail}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="il-demo-footer">
                <span>
                  <i />
                  INTERACTIVE PREVIEW
                </span>
                <span>Explore at your own pace</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="interactive-learning-section interactive-learning-process">
        <div className="interactive-learning-container">
          <Reveal direction="right">
            <div className="interactive-learning-process-intro">
              <span>THE LEARNING DESIGN PROCESS</span>
              <h2>
                From learning objectives
                <strong> to meaningful interaction.</strong>
              </h2>
              <p>
                Each stage connects the learning goal with the content,
                interaction and feedback needed to create a coherent experience.
              </p>
            </div>
          </Reveal>

          <div className="interactive-learning-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 80}
                className="interactive-learning-process-item"
              >
                <div className="interactive-learning-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="interactive-learning-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="interactive-learning-section interactive-learning-benefits">
        <div className="interactive-learning-container">
          <Reveal direction="left">
            <div className="interactive-learning-section-heading">
              <span>WHY INTERACTIVE LEARNING</span>
              <h2>
                Participation with
                <strong> a purpose.</strong>
              </h2>
              <p>
                The right interaction supports the learning objective,
                encourages active thinking and makes the experience easier
                to navigate and understand.
              </p>
            </div>
          </Reveal>

          <div className="interactive-learning-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 80}
              >
                <article className="interactive-learning-benefit">
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
      <section className="interactive-learning-section interactive-learning-faq">
        <div className="interactive-learning-container">
          <Reveal direction="up">
            <div className="interactive-learning-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Understanding
                <strong> interactive learning.</strong>
              </h2>
              <p>
                Helpful answers about interactions, learning activities,
                feedback and responsive learning experiences.
              </p>
            </div>
          </Reveal>

          <div className="interactive-learning-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={(index % 3) * 50}
                >
                  <div
                    className={`interactive-learning-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="interactive-learning-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>
                          {String(index + 1).padStart(2, "0")}
                        </small>
                        {faq.question}
                      </span>

                      <b aria-hidden="true">{isActive ? "−" : "+"}</b>
                    </button>

                    <div
                      className="interactive-learning-faq-answer"
                      aria-hidden={!isActive}
                    >
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
      <section className="interactive-learning-final">
        <Reveal direction="up">
          <div className="interactive-learning-final-inner">
            <span>THE LEARNING EXPERIENCE</span>

            <h2>
              Don't just show
              <br />
              <strong>the knowledge. Activate it.</strong>
            </h2>

            <p>
              Meaningful interactive learning turns information into
              exploration, choices into practice and feedback into
              opportunities to understand.
            </p>

            <div className="interactive-learning-final-line" aria-hidden="true">
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

export default InteractiveLearning;

