import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LearningTraining.css";

const learningServices = [
  {
    title: "E-Learning Development",
    path: "e-learning",
    icon: "bi-journal-richtext",
    number: "01",
    description:
      "Transform learning content into structured digital courses with clear visuals, engaging lessons and learner-friendly navigation.",
    tags: ["Digital Courses", "Content", "Learning"],
  },
  {
    title: "Interactive Learning",
    path: "interactive-learning",
    icon: "bi-cursor",
    number: "02",
    description:
      "Encourage active participation through clickable content, guided activities and meaningful learning interactions.",
    tags: ["Interaction", "Activities", "Engagement"],
  },
  {
    title: "Articulate Storyline",
    path: "articulate-storyline",
    icon: "bi-easel",
    number: "03",
    description:
      "Develop scenario-based courses, interactive slides and knowledge checks using Articulate Storyline.",
    tags: ["Storyline", "Scenarios", "Quizzes"],
  },
  {
    title: "Product Training",
    path: "product-training",
    icon: "bi-box-seam",
    number: "04",
    description:
      "Explain product features, workflows and operating procedures through structured, easy-to-follow training content.",
    tags: ["Product", "Workflows", "Guidance"],
  },
  {
    title: "Employee & Safety Training",
    path: "employee-safety-training",
    icon: "bi-shield-check",
    number: "05",
    description:
      "Communicate workplace procedures, safety practices and employee learning materials through clear training experiences.",
    tags: ["Workplace", "Safety", "Compliance"],
  },
  {
    title: "Simulation & Assessment",
    path: "simulation-assessment",
    icon: "bi-clipboard2-check",
    number: "06",
    description:
      "Reinforce understanding with scenario simulations, knowledge checks and structured assessment experiences.",
    tags: ["Simulation", "Assessment", "Feedback"],
  },
];

const LearningTraining = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const revealElements = page.querySelectorAll(".lt-reveal");

    if (typeof IntersectionObserver === "undefined") {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      "--lt-pointer-x",
      `${event.clientX - rect.left}px`
    );

    card.style.setProperty(
      "--lt-pointer-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <main className="lt-page page-transition" ref={pageRef}>
      {/* AMBIENT BACKGROUND */}
      <div className="lt-atmosphere" aria-hidden="true">
        <span className="lt-orb lt-orb--one" />
        <span className="lt-orb lt-orb--two" />
        <span className="lt-ring lt-ring--one" />
        <span className="lt-ring lt-ring--two" />
      </div>

      {/* HERO */}
      <section className="lt-hero">
        <div className="lt-container lt-hero__inner">
          <div className="lt-hero__content lt-reveal lt-reveal--left">
            <span className="lt-eyebrow">
              <i aria-hidden="true" />
              LEARNING / TRAINING
            </span>

            <h1 className="lt-hero__title">
              Learning that
              <br />
              <span>moves you forward.</span>
            </h1>

            <p className="lt-hero__description">
              Make learning clearer, more engaging and easier to follow.
              Explore digital courses, interactive learning, product
              training and assessment experiences designed to turn
              information into practical understanding.
            </p>

            <div className="lt-hero__meta">
              <span>01 — Learn</span>
              <span>02 — Practise</span>
              <span>03 — Progress</span>
            </div>

            <a className="lt-explore-link" href="#lt-disciplines">
              <span>Explore our services</span>

              <span className="lt-explore-link__arrow" aria-hidden="true">
                <i className="bi bi-arrow-down-right" />
              </span>
            </a>
          </div>

          {/* CSS-BUILT LEARNING DASHBOARD */}
          <div className="lt-hero__visual lt-reveal lt-reveal--right">
            <div className="lt-board">
              <div className="lt-board__top">
                <span>
                  <i aria-hidden="true" />
                  LEARNING EXPERIENCE
                </span>
                <span>STUDY / 001</span>
              </div>

              <div className="lt-board__details">
                <span>COURSE DESIGN</span>
                <span>LEARN / PRACTISE / APPLY</span>
              </div>

              <div className="lt-dashboard">
                <div className="lt-dashboard__grid" aria-hidden="true" />

                {/* DASHBOARD HEADER */}
                <div className="lt-dashboard__header">
                  <div>
                    <span className="lt-dashboard__overline">
                      YOUR LEARNING SPACE
                    </span>

                    <strong>
                      Learn something
                      <br />
                      meaningful.
                    </strong>

                    <span className="lt-dashboard__subtitle">
                      Knowledge starts with curiosity.
                    </span>
                  </div>

                  <span className="lt-dashboard__avatar" aria-hidden="true">
                    <i className="bi bi-person-fill" />
                  </span>
                </div>

                {/* COURSE PROGRESS */}
                <div className="lt-course">
                  <div className="lt-course__visual" aria-hidden="true">
                    <span className="lt-course__circle">
                      <i className="bi bi-play-fill" />
                    </span>

                    <span className="lt-course__visual-index">01</span>
                  </div>

                  <div className="lt-course__content">
                    <span className="lt-course__label">
                      FEATURED COURSE
                    </span>

                    <strong>Learning essentials</strong>

                    <span className="lt-course__description">
                      Build skills step by step
                    </span>

                    <div
                      className="lt-progress"
                      role="img"
                      aria-label="Illustrative course progress: 70 percent"
                    >
                      <span>
                        <i />
                      </span>
                      <small>70% complete</small>
                    </div>
                  </div>
                </div>

                {/* LEARNING MODULES */}
                <div className="lt-modules">
                  <div className="lt-modules__heading">
                    <strong>Learning modules</strong>
                    <span>VIEW ALL</span>
                  </div>

                  <div className="lt-module-list">
                    <div className="lt-module">
                      <span className="lt-module__icon">
                        <i className="bi bi-book" aria-hidden="true" />
                      </span>

                      <span className="lt-module__copy">
                        <strong>Explore the basics</strong>
                        <small>Lesson 01 · Introduction</small>
                      </span>

                      <i
                        className="bi bi-check-circle-fill lt-module__status"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="lt-module">
                      <span className="lt-module__icon lt-module__icon--alt">
                        <i
                          className="bi bi-lightbulb"
                          aria-hidden="true"
                        />
                      </span>

                      <span className="lt-module__copy">
                        <strong>Apply your knowledge</strong>
                        <small>Lesson 02 · Practice</small>
                      </span>

                      <i
                        className="bi bi-arrow-up-right lt-module__next"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                <span className="lt-dashboard__index">LEARNING / 006</span>
              </div>

              <div className="lt-board__footer">
                <span>LEARNER-CENTRED DESIGN</span>

                <div className="lt-palette" aria-label="Design palette">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <span>KNOWLEDGE IN ACTION</span>
              </div>

              <div className="lt-floating-note lt-floating-note--one">
                <span className="lt-floating-note__icon">
                  <i className="bi bi-mortarboard" aria-hidden="true" />
                </span>

                <span>
                  <strong>STRUCTURED LEARNING</strong>
                  <small>Clear learning journeys</small>
                </span>
              </div>

              <div className="lt-floating-note lt-floating-note--two">
                <span className="lt-floating-note__icon">
                  <i
                    className="bi bi-check2-square"
                    aria-hidden="true"
                  />
                </span>

                <span>
                  <strong>MEASURE PROGRESS</strong>
                  <small>Practice &amp; assessment</small>
                </span>
              </div>
            </div>

            <div className="lt-visual-caption">
              <span>LEARNING DESIGN STUDY — 2026</span>
              <span>KNOWLEDGE BUILT TO LAST.</span>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING SERVICES */}
      <section className="lt-disciplines" id="lt-disciplines">
        <div className="lt-container">
          <header className="lt-section-heading lt-reveal lt-reveal--up">
            <div>
              <span className="lt-eyebrow">
                <i aria-hidden="true" />
                EXPLORE THE POSSIBILITIES
              </span>

              <h2>
                Six ways to learn.
                <br />
                <span>One step at a time.</span>
              </h2>
            </div>

            <p>
              From e-learning development to simulations and assessments,
              explore training solutions that make complex information
              easier to understand, practise and apply.
            </p>
          </header>

          <div className="lt-grid">
            {learningServices.map((service, index) => (
              <Link
                key={service.path}
                to={`/services/${service.path}`}
                className={`lt-card lt-reveal ${
                  index === learningServices.length - 1
                    ? "lt-card--featured"
                    : ""
                }`}
                style={{
                  "--lt-order": index,
                  "--lt-reveal-delay": `${(index % 3) * 70}ms`,
                }}
                onPointerMove={handlePointerMove}
                aria-label={`Explore ${service.title}`}
              >
                <div className="lt-card__top">
                  <span className="lt-card__number">
                    {service.number}
                  </span>

                  <span className="lt-card__arrow" aria-hidden="true">
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>

                <span className="lt-card__icon" aria-hidden="true">
                  <i className={`bi ${service.icon}`} />
                </span>

                <div className="lt-card__copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="lt-card__tags" aria-label="Related topics">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="lt-card__bottom">
                  <span>DISCOVER SERVICE</span>
                  <span className="lt-card__bottom-line" />
                </div>
              </Link>
            ))}
          </div>

          <div className="lt-grid-footnote lt-reveal lt-reveal--up">
            <span className="lt-grid-footnote__mark" aria-hidden="true">
              +
            </span>

            <p>
              Create meaningful learning experiences through clear content,
              guided practice and purposeful assessment.
            </p>

            <span className="lt-grid-footnote__count">06 / 06</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LearningTraining;