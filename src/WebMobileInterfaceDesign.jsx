import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./WebMobileInterfaceDesign.css";

const interfaceServices = [
  {
    title: "Website Design",
    path: "web-design",
    icon: "bi-window",
    number: "01",
    description:
      "Create polished, responsive website layouts with clear visual hierarchy and a consistent brand experience.",
    tags: ["Responsive", "Layout", "Visual Design"],
  },
  {
    title: "Mobile App Design (iOS & Android)",
    path: "mobile-app-design",
    icon: "bi-phone",
    number: "02",
    description:
      "Design intuitive mobile interfaces that make everyday tasks simpler across iOS and Android devices.",
    tags: ["Mobile", "Navigation", "Usability"],
  },
  {
    title: "UI/UX Design",
    path: "ui-ux-design",
    icon: "bi-bezier2",
    number: "03",
    description:
      "Combine user journeys, wireframes and interface styling to make digital products easier to understand and use.",
    tags: ["Research", "Wireframes", "Interaction"],
  },
  {
    title: "Landing Pages",
    path: "landing-pages",
    icon: "bi-layout-text-window",
    number: "04",
    description:
      "Structure focused landing pages with compelling content hierarchy and clear paths to key information.",
    tags: ["Hierarchy", "Content", "Conversion"],
  },
  {
    title: "Digital Presentations",
    path: "digital-presentations",
    icon: "bi-easel2",
    number: "05",
    description:
      "Present ideas through carefully designed digital slides, visual storytelling and consistent layouts.",
    tags: ["Slides", "Storytelling", "Clarity"],
  },
  {
    title: "Digital Product Experiences",
    path: "digital-product-experiences",
    icon: "bi-box-seam",
    number: "06",
    description:
      "Shape connected product journeys through consistent interfaces, clear interactions and thoughtful user flows.",
    tags: ["Products", "User Flows", "Interaction"],
  },
];

const WebMobileInterfaceDesign = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const revealElements = page.querySelectorAll(".wmi-reveal");

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
      "--wmi-pointer-x",
      `${event.clientX - rect.left}px`
    );

    card.style.setProperty(
      "--wmi-pointer-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <main className="wmi-page page-transition" ref={pageRef}>
      {/* AMBIENT BACKGROUND */}
      <div className="wmi-atmosphere" aria-hidden="true">
        <span className="wmi-orb wmi-orb--one" />
        <span className="wmi-orb wmi-orb--two" />
        <span className="wmi-ring wmi-ring--one" />
        <span className="wmi-ring wmi-ring--two" />
      </div>

      {/* HERO */}
      <section className="wmi-hero">
        <div className="wmi-container wmi-hero__inner">
          <div className="wmi-hero__content wmi-reveal wmi-reveal--left">
            <span className="wmi-eyebrow">
              <i aria-hidden="true" />
              WEB / MOBILE / INTERFACE DESIGN
            </span>

            <h1 className="wmi-hero__title">
              Design digital
              <br />
              <span>experiences.</span>
            </h1>

            <p className="wmi-hero__description">
              Thoughtful digital design brings clarity to every interaction.
              Explore website layouts, mobile interfaces and user-focused
              experiences designed to make digital products feel intuitive,
              consistent and easy to navigate.
            </p>

            <div className="wmi-hero__meta">
              <span>01 — Structure</span>
              <span>02 — Interaction</span>
              <span>03 — Experience</span>
            </div>

            <a className="wmi-explore-link" href="#wmi-disciplines">
              <span>Explore our services</span>
              <span className="wmi-explore-link__arrow" aria-hidden="true">
                <i className="bi bi-arrow-down-right" />
              </span>
            </a>
          </div>

          {/* CSS-BUILT DIGITAL INTERFACE VISUAL */}
          <div className="wmi-hero__visual wmi-reveal wmi-reveal--right">
            <div className="wmi-board">
              <div className="wmi-board__top">
                <span>
                  <i aria-hidden="true" />
                  DIGITAL DESIGN SYSTEM
                </span>
                <span>STUDY / 001</span>
              </div>

              <div className="wmi-board__details">
                <span>INTERFACE STUDY</span>
                <span>WEB / APP / PRODUCT</span>
              </div>

              <div className="wmi-canvas">
                <div className="wmi-canvas__grid" aria-hidden="true" />

                {/* BROWSER WINDOW */}
                <div className="wmi-browser">
                  <div className="wmi-browser__top">
                    <span className="wmi-browser__dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>

                    <span className="wmi-browser__address">
                      yourbrand.design
                    </span>

                    <i className="bi bi-three-dots" aria-hidden="true" />
                  </div>

                  <div className="wmi-browser__body">
                    <div className="wmi-browser__nav">
                      <span className="wmi-browser__logo">M.</span>

                      <span className="wmi-browser__nav-lines">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>

                    <div className="wmi-browser__hero">
                      <span>DESIGNED AROUND YOU</span>

                      <strong>
                        Ideas into
                        <br />
                        experiences.
                      </strong>

                      <span className="wmi-browser__description">
                        A clear path from concept to interaction.
                      </span>

                      <span className="wmi-browser__button">
                        Explore design
                        <i
                          className="bi bi-arrow-up-right"
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <div className="wmi-browser__cards">
                      <span>
                        <i className="bi bi-grid-1x2" aria-hidden="true" />
                        <i />
                        <i />
                      </span>

                      <span>
                        <i className="bi bi-layers" aria-hidden="true" />
                        <i />
                        <i />
                      </span>

                      <span>
                        <i className="bi bi-stars" aria-hidden="true" />
                        <i />
                        <i />
                      </span>
                    </div>
                  </div>
                </div>

                {/* MOBILE DEVICE */}
                <div className="wmi-phone">
                  <div className="wmi-phone__speaker" />

                  <div className="wmi-phone__screen">
                    <div className="wmi-phone__top">
                      <span>9:41</span>
                      <span aria-hidden="true">
                        <i className="bi bi-reception-4" />
                        <i className="bi bi-wifi" />
                        <i className="bi bi-battery-full" />
                      </span>
                    </div>

                    <div className="wmi-phone__brand">
                      <span>M.</span>
                      <i className="bi bi-list" aria-hidden="true" />
                    </div>

                    <div className="wmi-phone__content">
                      <span>MADE FOR WHAT'S NEXT</span>
                      <strong>
                        Better
                        <br />
                        by design.
                      </strong>
                      <i className="wmi-phone__accent" aria-hidden="true" />
                      <span className="wmi-phone__line" />
                      <span className="wmi-phone__line wmi-phone__line--short" />
                    </div>

                    <div className="wmi-phone__bottom">
                      <span>
                        <i className="bi bi-house" aria-hidden="true" />
                      </span>
                      <span>
                        <i className="bi bi-grid" aria-hidden="true" />
                      </span>
                      <span>
                        <i className="bi bi-person" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>

                <span className="wmi-canvas__cross wmi-canvas__cross--one">
                  +
                </span>

                <span className="wmi-canvas__cross wmi-canvas__cross--two">
                  +
                </span>

                <span className="wmi-canvas__index">UI — 006</span>
              </div>

              <div className="wmi-board__footer">
                <span>DESIGN PRINCIPLES</span>

                <div className="wmi-palette" aria-label="Design palette">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <span>BUILT FOR PEOPLE</span>
              </div>

              <div className="wmi-floating-note wmi-floating-note--one">
                <span className="wmi-floating-note__icon">
                  <i className="bi bi-display" aria-hidden="true" />
                </span>

                <span>
                  <strong>WEB INTERFACES</strong>
                  <small>Structure &amp; clarity</small>
                </span>
              </div>

              <div className="wmi-floating-note wmi-floating-note--two">
                <span className="wmi-floating-note__icon">
                  <i className="bi bi-phone" aria-hidden="true" />
                </span>

                <span>
                  <strong>MOBILE FIRST</strong>
                  <small>Designed to adapt</small>
                </span>
              </div>
            </div>

            <div className="wmi-visual-caption">
              <span>DIGITAL DESIGN STUDY — 2026</span>
              <span>EVERY DETAIL HAS A PURPOSE.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DISCIPLINES */}
      <section className="wmi-disciplines" id="wmi-disciplines">
        <div className="wmi-container">
          <header className="wmi-section-heading wmi-reveal wmi-reveal--up">
            <div>
              <span className="wmi-eyebrow">
                <i aria-hidden="true" />
                EXPLORE THE POSSIBILITIES
              </span>

              <h2>
                Six disciplines.
                <br />
                <span>One seamless experience.</span>
              </h2>
            </div>

            <p>
              From websites and mobile apps to digital presentations, explore
              design services that connect information, visual consistency
              and user interactions across digital touchpoints.
            </p>
          </header>

          <div className="wmi-grid">
            {interfaceServices.map((service, index) => (
              <Link
                key={service.path}
                to={`/services/${service.path}`}
                className={`wmi-card wmi-reveal ${
                  index === interfaceServices.length - 1
                    ? "wmi-card--featured"
                    : ""
                }`}
                style={{
                  "--wmi-order": index,
                  "--wmi-reveal-delay": `${(index % 3) * 70}ms`,
                }}
                onPointerMove={handlePointerMove}
                aria-label={`Explore ${service.title}`}
              >
                <div className="wmi-card__top">
                  <span className="wmi-card__number">
                    {service.number}
                  </span>

                  <span className="wmi-card__arrow" aria-hidden="true">
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>

                <span className="wmi-card__icon" aria-hidden="true">
                  <i className={`bi ${service.icon}`} />
                </span>

                <div className="wmi-card__copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="wmi-card__tags" aria-label="Related topics">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="wmi-card__bottom">
                  <span>DISCOVER SERVICE</span>
                  <span className="wmi-card__bottom-line" />
                </div>
              </Link>
            ))}
          </div>

          <div className="wmi-grid-footnote wmi-reveal wmi-reveal--up">
            <span className="wmi-grid-footnote__mark" aria-hidden="true">
              +
            </span>

            <p>
              Design connected digital experiences that bring together
              usability, clear communication and visual consistency.
            </p>

            <span className="wmi-grid-footnote__count">06 / 06</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WebMobileInterfaceDesign;