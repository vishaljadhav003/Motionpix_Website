import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./BrandingCreative.css";

const brandingServices = [
  {
    title: "Brand Identity",
    path: "brand-identity",
    icon: "bi-fingerprint",
    number: "01",
    description:
      "Build a distinctive brand presence with a consistent visual identity, colours and design language.",
    tags: ["Identity", "Consistency", "Recognition"],
  },
  {
    title: "Graphic Design",
    path: "graphicsdesign",
    icon: "bi-bezier2",
    number: "02",
    description:
      "Communicate ideas through considered layouts, typography and purposeful visual composition.",
    tags: ["Layout", "Typography", "Visuals"],
  },
  {
    title: "Marketing Collaterals",
    path: "marketing-collaterals",
    icon: "bi-layers",
    number: "03",
    description:
      "Create cohesive brochures, flyers, business materials and branded communication assets.",
    tags: ["Brochures", "Print", "Brand Assets"],
  },
  {
    title: "Presentation & Infographic Design",
    path: "presentation-infographic-design",
    icon: "bi-bar-chart-line",
    number: "04",
    description:
      "Turn complex information into structured presentations, meaningful graphics and clear visual stories.",
    tags: ["Data", "Presentations", "Clarity"],
  },
  {
    title: "Campaign Creatives",
    path: "campaign-creatives",
    icon: "bi-megaphone",
    number: "05",
    description:
      "Develop campaign-ready creative assets that maintain visual consistency across brand touchpoints.",
    tags: ["Campaigns", "Promotion", "Engagement"],
  },
];

const BrandingCreative = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const revealElements = page.querySelectorAll(".bc-reveal");

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
      "--bc-pointer-x",
      `${event.clientX - rect.left}px`
    );
    card.style.setProperty(
      "--bc-pointer-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <main className="bc-page page-transition" ref={pageRef}>
      {/* AMBIENT BACKGROUND */}
      <div className="bc-atmosphere" aria-hidden="true">
        <span className="bc-orb bc-orb--one" />
        <span className="bc-orb bc-orb--two" />
        <span className="bc-ring bc-ring--one" />
        <span className="bc-ring bc-ring--two" />
      </div>

      {/* HERO */}
      <section className="bc-hero">
        <div className="bc-container bc-hero__inner">
          <div className="bc-hero__content bc-reveal bc-reveal--left">
            <span className="bc-eyebrow">
              <i aria-hidden="true" />
              BRANDING / CREATIVE
            </span>

            <h1 className="bc-hero__title">
              Make your
              <br />
              brand <span>distinct.</span>
            </h1>

            <p className="bc-hero__description">
              Thoughtful design creates recognisable brands. Explore identity
              design, creative communication and visual systems that help your
              brand express its personality with clarity and consistency.
            </p>

            <div className="bc-hero__meta">
              <span>01 — Identity</span>
              <span>02 — Design</span>
              <span>03 — Communication</span>
            </div>

            <a className="bc-explore-link" href="#bc-disciplines">
              <span>Explore our services</span>
              <span className="bc-explore-link__arrow" aria-hidden="true">
                <i className="bi bi-arrow-down-right" />
              </span>
            </a>
          </div>

          {/* CSS-BUILT BRAND IDENTITY VISUAL */}
          <div className="bc-hero__visual bc-reveal bc-reveal--right">
            <div className="bc-board">
              <div className="bc-board__top">
                <span>
                  <i aria-hidden="true" />
                  BRAND IDENTITY SYSTEM
                </span>
                <span>STUDY / 001</span>
              </div>

              <div className="bc-board__details">
                <span>VISUAL LANGUAGE</span>
                <span>COLOUR / TYPE / FORM</span>
              </div>

              <div className="bc-artwork">
                <div className="bc-artwork__grid" aria-hidden="true" />

                <div className="bc-artwork__orbit bc-artwork__orbit--one" />
                <div className="bc-artwork__orbit bc-artwork__orbit--two" />

                <div className="bc-artwork__mark" aria-hidden="true">
                  <span className="bc-artwork__mark-shape">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="bc-artwork__mark-dot" />
                </div>

                <span className="bc-artwork__plus bc-artwork__plus--one">
                  +
                </span>
                <span className="bc-artwork__plus bc-artwork__plus--two">
                  +
                </span>

                <div className="bc-artwork__title">
                  <span>DESIGNED TO BE RECOGNISED</span>
                  <strong>
                    BUILD
                    <br />
                    YOUR MARK.
                  </strong>
                  <span>STRATEGY MEETS CREATIVITY</span>
                </div>

                <span className="bc-artwork__index">BC — 001</span>
              </div>

              <div className="bc-board__footer">
                <span>COLOUR PALETTE</span>
                <div className="bc-palette" aria-label="Brand colour palette">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span>DESIGN SYSTEM</span>
              </div>

              <div className="bc-floating-note bc-floating-note--one">
                <span className="bc-floating-note__icon">
                  <i className="bi bi-palette2" aria-hidden="true" />
                </span>
                <span>
                  <strong>VISUAL IDENTITY</strong>
                  <small>Colour &amp; character</small>
                </span>
              </div>

              <div className="bc-floating-note bc-floating-note--two">
                <span className="bc-floating-note__symbol">Aa</span>
                <span>
                  <strong>TYPOGRAPHY</strong>
                  <small>Voice &amp; expression</small>
                </span>
              </div>
            </div>

            <div className="bc-visual-caption">
              <span>CREATIVE STUDY — 2026</span>
              <span>DESIGN WITH PURPOSE.</span>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDING SERVICES */}
      <section className="bc-disciplines" id="bc-disciplines">
        <div className="bc-container">
          <header className="bc-section-heading bc-reveal bc-reveal--up">
            <div>
              <span className="bc-eyebrow">
                <i aria-hidden="true" />
                EXPLORE THE POSSIBILITIES
              </span>

              <h2>
                One brand.
                <br />
                <span>Many ways to express it.</span>
              </h2>
            </div>

            <p>
              From brand identity to campaign creatives, explore design
              services that bring your message together through a clear,
              considered and consistent visual language.
            </p>
          </header>

          <div className="bc-grid">
            {brandingServices.map((service, index) => (
              <Link
                key={service.path}
                to={`/services/${service.path}`}
                className={`bc-card bc-reveal ${
                  index === 4 ? "bc-card--featured" : ""
                }`}
                style={{
                  "--bc-order": index,
                  "--bc-reveal-delay": `${(index % 3) * 70}ms`,
                }}
                onPointerMove={handlePointerMove}
                aria-label={`Explore ${service.title}`}
              >
                <div className="bc-card__top">
                  <span className="bc-card__number">{service.number}</span>

                  <span className="bc-card__arrow" aria-hidden="true">
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>

                <span className="bc-card__icon" aria-hidden="true">
                  <i className={`bi ${service.icon}`} />
                </span>

                <div className="bc-card__copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="bc-card__tags" aria-label="Related topics">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="bc-card__bottom">
                  <span>DISCOVER SERVICE</span>
                  <span className="bc-card__bottom-line" />
                </div>
              </Link>
            ))}
          </div>

          <div className="bc-grid-footnote bc-reveal bc-reveal--up">
            <span className="bc-grid-footnote__mark" aria-hidden="true">
              +
            </span>
            <p>
              Create a cohesive brand experience with thoughtful design,
              distinctive visuals and consistent communication.
            </p>
            <span className="bc-grid-footnote__count">05 / 05</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BrandingCreative;