import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./ImmersiveTechnology.css";

const immersiveServices = [
  {
    title: "AR / VR / MR / XR Experiences",
    path: "ar-vr-mr-xr",
    icon: "bi-globe2",
    number: "01",
    description:
      "Create immersive digital experiences that blend real and virtual environments through interactive spatial storytelling.",
    tags: ["AR / VR / MR / XR", "Spatial Design", "Interaction"],
  },
  {
    title: "Virtual Showrooms",
    path: "virtual-showrooms",
    icon: "bi-house-door",
    number: "02",
    description:
      "Present products and spaces through virtual environments where audiences can explore details from different perspectives.",
    tags: ["Virtual Spaces", "Product Display", "Exploration"],
  },
  {
    title: "Interactive 3D",
    path: "interactive-3d",
    icon: "bi-box",
    number: "03",
    description:
      "Bring digital models to life with interactive product views, configurable details and engaging 3D exploration.",
    tags: ["3D Models", "Product Views", "Interaction"],
  },
  {
    title: "Immersive Training",
    path: "immersive-training",
    icon: "bi-mortarboard",
    number: "04",
    description:
      "Support learning through simulated environments, guided practice and immersive experiences designed around real-world tasks.",
    tags: ["Simulation", "Practice", "Learning"],
  },
];

const ImmersiveTechnology = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const revealElements = page.querySelectorAll(".it-reveal");

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
      "--it-pointer-x",
      `${event.clientX - rect.left}px`
    );

    card.style.setProperty(
      "--it-pointer-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <main className="it-page page-transition" ref={pageRef}>
      {/* AMBIENT BACKGROUND */}
      <div className="it-atmosphere" aria-hidden="true">
        <span className="it-orb it-orb--one" />
        <span className="it-orb it-orb--two" />
        <span className="it-ring it-ring--one" />
        <span className="it-ring it-ring--two" />
      </div>

      {/* HERO */}
      <section className="it-hero">
        <div className="it-container it-hero__inner">
          <div className="it-hero__content it-reveal it-reveal--left">
            <span className="it-eyebrow">
              <i aria-hidden="true" />
              IMMERSIVE TECHNOLOGY
            </span>

            <h1 className="it-hero__title">
              Step beyond
              <br />
              <span>the real.</span>
            </h1>

            <p className="it-hero__description">
              Explore new ways to experience digital content. From augmented
              and virtual environments to interactive 3D and immersive
              training, discover experiences that connect people, products
              and spaces.
            </p>

            <div className="it-hero__meta">
              <span>01 — Explore</span>
              <span>02 — Interact</span>
              <span>03 — Experience</span>
            </div>

            <a className="it-explore-link" href="#it-disciplines">
              <span>Explore our services</span>

              <span className="it-explore-link__arrow" aria-hidden="true">
                <i className="bi bi-arrow-down-right" />
              </span>
            </a>
          </div>

          {/* CSS-BUILT IMMERSIVE VISUAL */}
          <div className="it-hero__visual it-reveal it-reveal--right">
            <div className="it-board">
              <div className="it-board__top">
                <span>
                  <i aria-hidden="true" />
                  IMMERSIVE EXPERIENCE
                </span>
                <span>STUDY / 001</span>
              </div>

              <div className="it-board__details">
                <span>SPATIAL DESIGN</span>
                <span>REALITY / DIGITAL / INTERACTION</span>
              </div>

              <div className="it-canvas">
                <div className="it-canvas__grid" aria-hidden="true" />

                <div className="it-canvas__orbit it-canvas__orbit--one" />
                <div className="it-canvas__orbit it-canvas__orbit--two" />
                <div className="it-canvas__orbit it-canvas__orbit--three" />

                {/* IMMERSIVE HEADSET ILLUSTRATION */}
                <div className="it-headset" aria-hidden="true">
                  <div className="it-headset__band" />

                  <div className="it-headset__body">
                    <span className="it-headset__lens it-headset__lens--left">
                      <i />
                    </span>

                    <span className="it-headset__bridge" />

                    <span className="it-headset__lens it-headset__lens--right">
                      <i />
                    </span>
                  </div>

                  <span className="it-headset__side it-headset__side--left" />
                  <span className="it-headset__side it-headset__side--right" />
                </div>

                {/* FLOATING SPATIAL PANELS */}
                <div className="it-spatial-panel it-spatial-panel--one">
                  <span className="it-spatial-panel__label">
                    SPATIAL VIEW
                  </span>

                  <div className="it-spatial-panel__shape">
                    <i />
                    <i />
                    <i />
                  </div>

                  <span className="it-spatial-panel__line" />
                  <span className="it-spatial-panel__line it-spatial-panel__line--short" />
                </div>

                <div className="it-spatial-panel it-spatial-panel--two">
                  <span className="it-spatial-panel__dot" />
                  <span>INTERACTIVE</span>
                  <i className="bi bi-bounding-box-circles" aria-hidden="true" />
                </div>

                <span className="it-canvas__cross it-canvas__cross--one">
                  +
                </span>

                <span className="it-canvas__cross it-canvas__cross--two">
                  +
                </span>

                <div className="it-canvas__caption">
                  <span>REALITY / REIMAGINED</span>

                  <strong>
                    EXPLORE
                    <br />
                    NEW WORLDS.
                  </strong>

                  <span>DESIGNED FOR DISCOVERY</span>
                </div>

                <span className="it-canvas__index">XR — 004</span>
              </div>

              <div className="it-board__footer">
                <span>IMMERSIVE DESIGN</span>

                <div className="it-palette" aria-label="Design palette">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <span>BEYOND THE SCREEN</span>
              </div>

              <div className="it-floating-note it-floating-note--one">
                <span className="it-floating-note__icon">
                  <i className="bi bi-eye" aria-hidden="true" />
                </span>

                <span>
                  <strong>SPATIAL EXPERIENCES</strong>
                  <small>Discover new perspectives</small>
                </span>
              </div>

              <div className="it-floating-note it-floating-note--two">
                <span className="it-floating-note__icon">
                  <i className="bi bi-box" aria-hidden="true" />
                </span>

                <span>
                  <strong>INTERACTIVE 3D</strong>
                  <small>Explore every detail</small>
                </span>
              </div>
            </div>

            <div className="it-visual-caption">
              <span>IMMERSIVE DESIGN STUDY — 2026</span>
              <span>EXPERIENCE A NEW DIMENSION.</span>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSIVE SERVICES */}
      <section className="it-disciplines" id="it-disciplines">
        <div className="it-container">
          <header className="it-section-heading it-reveal it-reveal--up">
            <div>
              <span className="it-eyebrow">
                <i aria-hidden="true" />
                EXPLORE THE POSSIBILITIES
              </span>

              <h2>
                Four disciplines.
                <br />
                <span>More ways to experience.</span>
              </h2>
            </div>

            <p>
              Discover immersive solutions that turn digital content into
              experiences people can explore, interact with and learn from.
            </p>
          </header>

          <div className="it-grid">
            {immersiveServices.map((service, index) => (
              <Link
                key={service.path}
                to={`/services/${service.path}`}
                className="it-card it-reveal"
                style={{
                  "--it-order": index,
                  "--it-reveal-delay": `${(index % 2) * 80}ms`,
                }}
                onPointerMove={handlePointerMove}
                aria-label={`Explore ${service.title}`}
              >
                <div className="it-card__top">
                  <span className="it-card__number">
                    {service.number}
                  </span>

                  <span className="it-card__arrow" aria-hidden="true">
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>

                <span className="it-card__icon" aria-hidden="true">
                  <i className={`bi ${service.icon}`} />
                </span>

                <div className="it-card__copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="it-card__tags" aria-label="Related topics">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="it-card__bottom">
                  <span>DISCOVER SERVICE</span>
                  <span className="it-card__bottom-line" />
                </div>
              </Link>
            ))}
          </div>

          <div className="it-grid-footnote it-reveal it-reveal--up">
            <span className="it-grid-footnote__mark" aria-hidden="true">
              +
            </span>

            <p>
              Connect the physical and digital worlds through purposeful
              interaction, exploration and immersive design.
            </p>

            <span className="it-grid-footnote__count">04 / 04</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ImmersiveTechnology;