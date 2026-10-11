import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./FilmVisualContent.css";

const filmServices = [
  {
    title: "Corporate & Brand Films",
    path: "corporate-brand-films",
    icon: "bi-building",
    number: "01",
    description:
      "Build a strong brand identity through cinematic stories, company profiles and purposeful brand films.",
    tags: ["Brand Story", "Corporate", "Identity"],
  },
  {
    title: "Product & Industrial Films",
    path: "product-industrial-films",
    icon: "bi-camera-reels",
    number: "02",
    description:
      "Present products, machinery and industrial processes through detailed visuals and engaging demonstrations.",
    tags: ["Products", "Industry", "Detail"],
  },
  {
    title: "Promotional Videos",
    path: "promotional-videos",
    icon: "bi-play-btn",
    number: "03",
    description:
      "Communicate campaigns, launches and key messages with focused storytelling and compelling visuals.",
    tags: ["Campaigns", "Launches", "Impact"],
  },
  {
    title: "Photography & Videography",
    path: "photography-videography",
    icon: "bi-camera",
    number: "04",
    description:
      "Capture people, products, places and events with thoughtful composition, lighting and visual direction.",
    tags: ["Photography", "Filming", "Composition"],
  },
  {
    title: "Editing & VFX",
    path: "editing-vfx",
    icon: "bi-sliders",
    number: "05",
    description:
      "Shape footage into polished visual stories with precise editing, colour treatment and visual effects.",
    tags: ["Editing", "Colour", "VFX"],
  },
];

const FilmVisualContent = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return undefined;

    const revealElements = page.querySelectorAll(".fvc-reveal");

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
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty(
      "--fvc-pointer-x",
      `${event.clientX - rect.left}px`
    );
    card.style.setProperty(
      "--fvc-pointer-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <main className="fvc-page page-transition" ref={pageRef}>
      {/* AMBIENT BACKGROUND */}
      <div className="fvc-atmosphere" aria-hidden="true">
        <span className="fvc-orb fvc-orb--one" />
        <span className="fvc-orb fvc-orb--two" />
        <span className="fvc-ring fvc-ring--one" />
        <span className="fvc-ring fvc-ring--two" />
      </div>

      {/* HERO */}
      <section className="fvc-hero">
        <div className="fvc-container fvc-hero__inner">
          <div className="fvc-hero__content fvc-reveal fvc-reveal--left">
            <span className="fvc-eyebrow">
              <i />
              FILM / VISUAL CONTENT
            </span>

            <h1 className="fvc-hero__title">
              Stories made
              <br />
              <span>to be seen.</span>
            </h1>

            <p className="fvc-hero__description">
              From the first frame to the final cut, discover cinematic
              storytelling, professional production and refined visuals that
              bring brands, products and ideas to life.
            </p>

            <div className="fvc-hero__meta">
              <span>01 — Capture</span>
              <span>02 — Create</span>
              <span>03 — Connect</span>
            </div>

            <a className="fvc-explore-link" href="#fvc-disciplines">
              <span>Explore our services</span>
              <span className="fvc-explore-link__arrow" aria-hidden="true">
                <i className="bi bi-arrow-down-right" />
              </span>
            </a>
          </div>

          {/* CINEMATIC CSS VISUAL */}
          <div className="fvc-hero__visual fvc-reveal fvc-reveal--right">
            <div className="fvc-film-board">
              <div className="fvc-film-board__top">
                <span>
                  <i />
                  CINEMATIC STUDY
                </span>
                <span>FRAME 001 / 005</span>
              </div>

              <div className="fvc-film-board__details">
                <span>CAM 01</span>
                <span>24 FPS</span>
                <span>4K / UHD</span>
              </div>

              <div className="fvc-screen">
                <div className="fvc-screen__grid" />
                <div className="fvc-screen__sun" />
                <div className="fvc-screen__horizon" />
                <div className="fvc-screen__mountain fvc-screen__mountain--back" />
                <div className="fvc-screen__mountain fvc-screen__mountain--front" />
                <div className="fvc-screen__light" />

                <div className="fvc-screen__cross fvc-screen__cross--one">
                  +
                </div>
                <div className="fvc-screen__cross fvc-screen__cross--two">
                  +
                </div>

                <div className="fvc-screen__corner fvc-screen__corner--tl" />
                <div className="fvc-screen__corner fvc-screen__corner--tr" />
                <div className="fvc-screen__corner fvc-screen__corner--bl" />
                <div className="fvc-screen__corner fvc-screen__corner--br" />

                <div className="fvc-screen__record">
                  <i />
                  REC
                </div>

                <div className="fvc-screen__caption">
                  <span>EVERY FRAME TELLS A STORY</span>
                  <strong>
                    SEE THE
                    <br />
                    DIFFERENCE.
                  </strong>
                  <span>VISUALS WITH PURPOSE</span>
                </div>

                <span className="fvc-screen__timecode">00:01:24:08</span>
              </div>

              <div className="fvc-timeline">
                <div className="fvc-timeline__label">
                  <span>EDIT TIMELINE</span>
                  <span>SEQUENCE 01</span>
                </div>

                <div className="fvc-timeline__tracks">
                  <div className="fvc-timeline__track fvc-timeline__track--video">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="fvc-timeline__track fvc-timeline__track--audio">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="fvc-timeline__playhead" />
                </div>
              </div>

              <div className="fvc-film-board__footer">
                <span>STORY / LIGHT / MOTION</span>
                <span className="fvc-film-board__dots">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span>FRAME BY FRAME</span>
              </div>

              <div className="fvc-floating-note fvc-floating-note--one">
                <span className="fvc-floating-note__icon">
                  <i className="bi bi-camera-reels" />
                </span>
                <span>
                  <strong>CINEMATIC</strong>
                  <small>Story in motion</small>
                </span>
              </div>

              <div className="fvc-floating-note fvc-floating-note--two">
                <span className="fvc-floating-note__icon">
                  <i className="bi bi-scissors" />
                </span>
                <span>
                  <strong>POST-PRODUCTION</strong>
                  <small>Every frame refined</small>
                </span>
              </div>
            </div>

            <div className="fvc-visual-caption">
              <span>VISUAL DIRECTION — 2026</span>
              <span>CRAFTED TO COMMUNICATE.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DISCIPLINES */}
      <section className="fvc-disciplines" id="fvc-disciplines">
        <div className="fvc-container">
          <header className="fvc-section-heading fvc-reveal fvc-reveal--up">
            <div>
              <span className="fvc-eyebrow">
                <i />
                EXPLORE THE POSSIBILITIES
              </span>

              <h2>
                Five disciplines.
                <br />
                <span>One visual story.</span>
              </h2>
            </div>

            <p>
              Every project deserves the right visual approach. Explore our
              film and content services to find the craft that best fits your
              message.
            </p>
          </header>

          <div className="fvc-grid">
            {filmServices.map((service, index) => (
              <Link
                key={service.path}
                to={`/services/${service.path}`}
                className={`fvc-card fvc-reveal ${
                  index === 4 ? "fvc-card--featured" : ""
                }`}
                style={{
                  "--fvc-order": index,
                  "--fvc-reveal-delay": `${(index % 3) * 70}ms`,
                }}
                onPointerMove={handlePointerMove}
                aria-label={`Explore ${service.title}`}
              >
                <div className="fvc-card__top">
                  <span className="fvc-card__number">{service.number}</span>

                  <span className="fvc-card__arrow" aria-hidden="true">
                    <i className="bi bi-arrow-up-right" />
                  </span>
                </div>

                <span className="fvc-card__icon" aria-hidden="true">
                  <i className={`bi ${service.icon}`} />
                </span>

                <div className="fvc-card__copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <div className="fvc-card__tags" aria-label="Related topics">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="fvc-card__bottom">
                  <span>DISCOVER SERVICE</span>
                  <span className="fvc-card__bottom-line" />
                </div>
              </Link>
            ))}
          </div>

          <div className="fvc-grid-footnote fvc-reveal fvc-reveal--up">
            <span className="fvc-grid-footnote__mark" aria-hidden="true">
              +
            </span>
            <p>
              From capturing the moment to refining the final frame, every
              detail helps tell your story.
            </p>
            <span className="fvc-grid-footnote__count">05 / 05</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FilmVisualContent;
