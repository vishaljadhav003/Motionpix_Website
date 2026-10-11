import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./AnimationVisualization.css";

const animationServices = [
  {
    title: "3D Animation",
    path: "3d-animation",
    icon: "bi-badge-3d",
    number: "01",
    description:
      "Dimensional storytelling, cinematic movement and carefully crafted 3D scenes.",
    tags: ["Depth", "Movement", "Rendering"],
  },
  {
    title: "2D Animation",
    path: "2d-animation",
    icon: "bi-vector-pen",
    number: "02",
    description:
      "Expressive illustration, character movement and purposeful visual storytelling.",
    tags: ["Illustration", "Characters", "Motion"],
  },
  {
    title: "Product Visualization",
    path: "product-visualization",
    icon: "bi-box-seam",
    number: "03",
    description:
      "Detailed product forms, considered materials and refined digital presentation.",
    tags: ["Form", "Materials", "Detail"],
  },
  {
    title: "Engineering & Industrial Animation",
    path: "engineering-industrial-animation",
    icon: "bi-gear-wide-connected",
    number: "04",
    description:
      "Mechanical assemblies, industrial equipment and engineering processes brought to life.",
    tags: ["Mechanisms", "Assembly", "Industry"],
  },
  {
    title: "Technical Visualization",
    path: "technical-visualization",
    icon: "bi-diagram-3",
    number: "05",
    description:
      "Complex systems, technical structures and workflows made visually understandable.",
    tags: ["Systems", "Structure", "Clarity"],
  },
  {
    title: "Motion Graphics",
    path: "motiongraphics",
    icon: "bi-film",
    number: "06",
    description:
      "Typography, shapes and graphic elements combined through rhythm and movement.",
    tags: ["Typography", "Transitions", "Rhythm"],
  },
  {
    title: "Explainer Content",
    path: "explainer-content",
    icon: "bi-lightbulb",
    number: "07",
    description:
      "Products, services and complex ideas explained through structured visual storytelling.",
    tags: ["Ideas", "Storytelling", "Communication"],
  },
];

const AnimationVisualization = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const revealElements = page.querySelectorAll(".av-reveal");

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

    card.style.setProperty("--av-pointer-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--av-pointer-y", `${event.clientY - rect.top}px`);
  };

  return (
    <main className="av-page page-transition" ref={pageRef}>
      {/* AMBIENT BACKGROUND */}
      <div className="av-atmosphere" aria-hidden="true">
        <span className="av-orb av-orb--one" />
        <span className="av-orb av-orb--two" />
        <span className="av-background-ring av-background-ring--one" />
        <span className="av-background-ring av-background-ring--two" />
      </div>

      {/* HERO */}
      <section className="av-hero">
        <div className="av-container av-hero__inner">
          <div className="av-hero__content av-reveal av-reveal--left">
            <span className="av-eyebrow">
              <i />
              ANIMATION / VISUALIZATION
            </span>

            <h1 className="av-hero__title">
              Ideas take
              <br />
              <span>visual form.</span>
            </h1>

            <p className="av-hero__description">
              Explore a world of dimensional design, purposeful movement and
              technical storytelling. Discover the creative disciplines that
              turn ideas into visual experiences.
            </p>

            <div className="av-hero__meta">
              <span>01 — Form</span>
              <span>02 — Motion</span>
              <span>03 — Experience</span>
            </div>

            <a className="av-explore-link" href="#av-disciplines">
              <span>Explore our disciplines</span>
              <span className="av-explore-link__arrow" aria-hidden="true">
                <i className="bi bi-arrow-down-right" />
              </span>
            </a>
          </div>

          {/* CSS-BUILT VISUAL */}
          <div className="av-hero__visual av-reveal av-reveal--right">
            <div className="av-artboard">
              <div className="av-artboard__top">
                <span>
                  <i />
                  VISUAL STUDY
                </span>
                <span>FIG. 001 / 007</span>
              </div>

              <div className="av-artboard__coordinates">
                <span>X 240.00</span>
                <span>Y 120.00</span>
                <span>Z 080.00</span>
              </div>

              <div className="av-artwork">
                <div className="av-artwork__grid" />

                <div className="av-artwork__orbit av-artwork__orbit--one" />
                <div className="av-artwork__orbit av-artwork__orbit--two" />
                <div className="av-artwork__orbit av-artwork__orbit--three" />

                <div className="av-artwork__sphere">
                  <span />
                </div>

                <div className="av-artwork__cube">
                  <span className="av-artwork__cube-face av-artwork__cube-face--front" />
                  <span className="av-artwork__cube-face av-artwork__cube-face--side" />
                  <span className="av-artwork__cube-face av-artwork__cube-face--top" />
                </div>

                <div className="av-artwork__cross av-artwork__cross--one">
                  +
                </div>
                <div className="av-artwork__cross av-artwork__cross--two">
                  +
                </div>

                <div className="av-artwork__caption">
                  <span>FORM / MOVEMENT / SPACE</span>
                  <strong>
                    CREATE
                    <br />
                    IN DIMENSION.
                  </strong>
                  <span>DESIGNING THE INVISIBLE</span>
                </div>

                <div className="av-artwork__index">A—V / 07</div>
              </div>

              <div className="av-artboard__footer">
                <span>CREATIVE DIRECTIONS</span>
                <div className="av-artboard__palette">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span>EST. IN MOTION</span>
              </div>

              <div className="av-floating-note av-floating-note--one">
                <span className="av-floating-note__symbol">3D</span>
                <span>
                  <strong>DIMENSION</strong>
                  <small>Shape &amp; depth</small>
                </span>
              </div>

              <div className="av-floating-note av-floating-note--two">
                <span className="av-floating-note__symbol">
                  <i className="bi bi-bezier2" />
                </span>
                <span>
                  <strong>MOVEMENT</strong>
                  <small>Frame &amp; rhythm</small>
                </span>
              </div>
            </div>

            <div className="av-visual-caption">
              <span>DESIGN STUDY — 2026</span>
              <span>FORM FOLLOWS IMAGINATION.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DISCIPLINES */}
      <section className="av-disciplines" id="av-disciplines">
        <div className="av-container">
          <header className="av-section-heading av-reveal av-reveal--up">
            <div>
              <span className="av-eyebrow">
                <i />
                EXPLORE THE POSSIBILITIES
              </span>

              <h2>
                Seven disciplines.
                <br />
                <span>Endless perspectives.</span>
              </h2>
            </div>

            <p>
              Every discipline has its own visual language. Choose an area to
              explore the work, techniques and possibilities behind it.
            </p>
          </header>

          <div className="av-grid">
            {animationServices.map((service, index) => (
              <Link
                key={service.path}
                to={`/services/${service.path}`}
                className={`av-card av-reveal ${
                  index === 6 ? "av-card--featured" : ""
                }`}
                style={{
                  "--av-order": index,
                  "--av-reveal-delay": `${(index % 3) * 70}ms`,
                }}
                onPointerMove={handlePointerMove}
                aria-label={`Explore ${service.title}`}
              >
                <div className="av-card__top">
                  <span className="av-card__number">{service.number}</span>

                  <span className="av-card__arrow" aria-hidden="true">
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>

                <span className="av-card__icon" aria-hidden="true">
                  <i className={`bi ${service.icon}`} />
                </span>

                <div className="av-card__copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="av-card__tags" aria-label="Related topics">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="av-card__bottom">
                  <span>DISCOVER SERVICE</span>
                  <span className="av-card__bottom-line" />
                </div>
              </Link>
            ))}
          </div>

          <div className="av-grid-footnote av-reveal av-reveal--up">
            <span className="av-grid-footnote__mark" aria-hidden="true">
              +
            </span>
            <p>
              From the first concept to the final frame, discover the right
              visual discipline for your project.
            </p>
            <span className="av-grid-footnote__count">07 / 07</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AnimationVisualization;