import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ExhibitionExperiences.css";

const exhibitionServices = [
  {
    title: "Exhibition Creative",
    path: "exhibition-creative",
    icon: "bi-palette",
    number: "01",
    description:
      "Develop creative exhibition concepts, branded environments and cohesive visual experiences that help spaces communicate clearly.",
    tags: ["Creative Concepts", "Branding", "Space Design"],
  },
  {
    title: "Exhibition 3D Design",
    path: "exhibition-3d-design",
    icon: "bi-boxes",
    number: "02",
    description:
      "Visualise exhibition booths, layouts and spatial concepts through detailed 3D designs before execution.",
    tags: ["3D Design", "Visualisation", "Layouts"],
  },
  {
    title: "Interactive Displays",
    path: "interactive-displays",
    icon: "bi-display",
    number: "03",
    description:
      "Create engaging display experiences with interactive content, digital interfaces and audience-friendly navigation.",
    tags: ["Digital Displays", "Interaction", "Engagement"],
  },
  {
    title: "Digital Installations",
    path: "digital-installations",
    icon: "bi-lightbulb",
    number: "04",
    description:
      "Bring spaces to life with digital content, visual installations and technology-led experiences designed for the environment.",
    tags: ["Digital Art", "Spatial Media", "Technology"],
  },
  {
    title: "Product Experiences",
    path: "product-experiences",
    icon: "bi-box-seam",
    number: "05",
    description:
      "Showcase products through thoughtful visual storytelling, interactive demonstrations and detail-focused experiences.",
    tags: ["Product Storytelling", "Demonstration", "Discovery"],
  },
  {
    title: "Event Content",
    path: "event-content",
    icon: "bi-calendar-event",
    number: "06",
    description:
      "Design event-ready visual content for presentations, large displays, launches and branded live experiences.",
    tags: ["Event Visuals", "Screen Content", "Presentations"],
  },
];

const ExhibitionExperiences = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const revealElements = page.querySelectorAll(".ee-reveal");

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

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      "--ee-pointer-x",
      `${event.clientX - rect.left}px`
    );

    card.style.setProperty(
      "--ee-pointer-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <main className="ee-page page-transition" ref={pageRef}>
      {/* AMBIENT BACKGROUND */}
      <div className="ee-atmosphere" aria-hidden="true">
        <span className="ee-orb ee-orb--one" />
        <span className="ee-orb ee-orb--two" />
        <span className="ee-ring ee-ring--one" />
        <span className="ee-ring ee-ring--two" />
      </div>

      {/* HERO */}
      <section className="ee-hero">
        <div className="ee-container ee-hero__inner">
          <div className="ee-hero__content ee-reveal ee-reveal--left">
            <span className="ee-eyebrow">
              <i aria-hidden="true" />
              EXHIBITION / EXPERIENCES
            </span>

            <h1 className="ee-hero__title">
              Spaces made
              <br />
              <span>memorable.</span>
            </h1>

            <p className="ee-hero__description">
              Bring ideas to life through considered spaces, immersive
              installations and engaging event content. Explore exhibition
              and experience design that connects brands, products and
              audiences through visual storytelling.
            </p>

            <div className="ee-hero__meta">
              <span>01 — Imagine</span>
              <span>02 — Experience</span>
              <span>03 — Connect</span>
            </div>

            <a className="ee-explore-link" href="#ee-disciplines">
              <span>Explore our services</span>

              <span className="ee-explore-link__arrow" aria-hidden="true">
                <i className="bi bi-arrow-down-right" />
              </span>
            </a>
          </div>

          {/* CSS-BUILT EXHIBITION VISUAL */}
          <div className="ee-hero__visual ee-reveal ee-reveal--right">
            <div className="ee-board">
              <div className="ee-board__top">
                <span>
                  <i aria-hidden="true" />
                  EXPERIENCE DESIGN
                </span>
                <span>STUDY / 001</span>
              </div>

              <div className="ee-board__details">
                <span>EXHIBITION CONCEPT</span>
                <span>SPACE / BRAND / AUDIENCE</span>
              </div>

              <div className="ee-canvas">
                <div className="ee-canvas__grid" aria-hidden="true" />

                {/* EXHIBITION BOOTH STRUCTURE */}
                <div className="ee-booth" aria-hidden="true">
                  <div className="ee-booth__back">
                    <span className="ee-booth__brand">YOUR BRAND.</span>
                    <span className="ee-booth__back-line" />
                    <span className="ee-booth__back-line ee-booth__back-line--short" />
                    <span className="ee-booth__back-mark" />
                  </div>

                  <div className="ee-booth__side" />

                  <div className="ee-booth__screen">
                    <span className="ee-booth__screen-label">
                      EXPERIENCE
                    </span>

                    <span className="ee-booth__screen-shape">
                      <i />
                      <i />
                      <i />
                    </span>

                    <span className="ee-booth__screen-line" />
                    <span className="ee-booth__screen-line ee-booth__screen-line--short" />
                  </div>

                  <div className="ee-booth__counter">
                    <span />
                    <span />
                  </div>

                  <div className="ee-booth__floor" />
                </div>

                {/* SPATIAL MARKERS */}
                <span className="ee-canvas__cross ee-canvas__cross--one">
                  +
                </span>

                <span className="ee-canvas__cross ee-canvas__cross--two">
                  +
                </span>

                <span className="ee-canvas__marker ee-canvas__marker--one">
                  <i />
                  BOOTH / 01
                </span>

                <span className="ee-canvas__marker ee-canvas__marker--two">
                  <i />
                  DISPLAY / 02
                </span>

                {/* CAPTION PANEL */}
                <div className="ee-canvas__caption">
                  <span>IDEAS INTO ENVIRONMENTS</span>

                  <strong>
                    DESIGN
                    <br />
                    THE MOMENT.
                  </strong>

                  <span>BUILT AROUND EXPERIENCE</span>
                </div>

                <span className="ee-canvas__index">EX — 006</span>
              </div>

              <div className="ee-board__footer">
                <span>EXPERIENCE DESIGN</span>

                <div className="ee-palette" aria-label="Design palette">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <span>SPACES THAT CONNECT</span>
              </div>

              <div className="ee-floating-note ee-floating-note--one">
                <span className="ee-floating-note__icon">
                  <i className="bi bi-grid-1x2" aria-hidden="true" />
                </span>

                <span>
                  <strong>SPATIAL DESIGN</strong>
                  <small>Plan the experience</small>
                </span>
              </div>

              <div className="ee-floating-note ee-floating-note--two">
                <span className="ee-floating-note__icon">
                  <i className="bi bi-display" aria-hidden="true" />
                </span>

                <span>
                  <strong>DIGITAL CONTENT</strong>
                  <small>Engage every audience</small>
                </span>
              </div>
            </div>

            <div className="ee-visual-caption">
              <span>EXPERIENCE DESIGN STUDY — 2026</span>
              <span>MAKE EVERY MOMENT COUNT.</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXHIBITION SERVICES */}
      <section className="ee-disciplines" id="ee-disciplines">
        <div className="ee-container">
          <header className="ee-section-heading ee-reveal ee-reveal--up">
            <div>
              <span className="ee-eyebrow">
                <i aria-hidden="true" />
                EXPLORE THE POSSIBILITIES
              </span>

              <h2>
                Six disciplines.
                <br />
                <span>Experiences that connect.</span>
              </h2>
            </div>

            <p>
              From exhibition concepts and 3D booth design to interactive
              displays and event content, discover ways to bring spaces
              and stories together.
            </p>
          </header>

          <div className="ee-grid">
            {exhibitionServices.map((service, index) => (
              <Link
                key={service.path}
                to={`/services/${service.path}`}
                className={`ee-card ee-reveal ${
                  index === exhibitionServices.length - 1
                    ? "ee-card--featured"
                    : ""
                }`}
                style={{
                  "--ee-order": index,
                  "--ee-reveal-delay": `${(index % 3) * 70}ms`,
                }}
                onPointerMove={handlePointerMove}
                aria-label={`Explore ${service.title}`}
              >
                <div className="ee-card__top">
                  <span className="ee-card__number">
                    {service.number}
                  </span>

                  <span className="ee-card__arrow" aria-hidden="true">
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>

                <span className="ee-card__icon" aria-hidden="true">
                  <i className={`bi ${service.icon}`} />
                </span>

                <div className="ee-card__copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="ee-card__tags" aria-label="Related topics">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="ee-card__bottom">
                  <span>DISCOVER SERVICE</span>
                  <span className="ee-card__bottom-line" />
                </div>
              </Link>
            ))}
          </div>

          <div className="ee-grid-footnote ee-reveal ee-reveal--up">
            <span className="ee-grid-footnote__mark" aria-hidden="true">
              +
            </span>

            <p>
              Connect creative concepts, physical spaces and digital content
              to create a more engaging audience experience.
            </p>

            <span className="ee-grid-footnote__count">06 / 06</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExhibitionExperiences;