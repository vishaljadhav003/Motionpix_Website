import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./ServiceCategories.css";

// ============================================================
// SERVICE CATEGORIES DATA
// Fill each item `path` with the route slug. Final link: /services/<path>
// Items with an empty path are shown as "Soon" and are not clickable.
// A category can also have its own `path` (its overview page): /services/<path>
// ============================================================
const serviceCategories = [
  {
    title: "Animation & Visualization",
    path: "animation-visualization",
    description:
      "Industrial 3D and 2D animation, product visualization and technical explainers that turn complex machines and processes into clear, cinematic visuals.",
    image: "/3d animation1.jpg",
    items: [
      { title: "3D Animation", path: "3d-animation" },
      { title: "2D Animation", path: "2d-animation" },
      { title: "Product Visualization", path: "product-visualization" },
      { title: "Engineering & Industrial Animation", path: "engineering-industrial-animation" },
      { title: "Technical Visualization", path: "technical-visualization" },
      { title: "Motion Graphics", path: "motiongraphics" },
      { title: "Explainer Content", path: "explainer-content" },
    ],
  },
  {
    title: "Film & Visual Content",
    description:
      "Corporate films, product videos and social content produced with cinematic storytelling, sharp editing and polished visual effects.",
    image: "/2D Animation.jpg",
    items: [
     { title: "Corporate & Brand Films", path: "corporate-brand-films" },
      { title: "Product & Industrial Films", path: "product-industrial-films" },
      { title: "Promotional Videos", path: "promotional-videos" },
      // { title: "Social & Digital Content", path: "" },
      { title: "Photography & Videography", path: "photography-videography" },
      { title: "Editing & VFX", path: "editing-vfx" },
    ],
  },
  {
    title: "Branding & Creative",
    description:
      "Brand identities, logo systems and marketing collaterals designed to make your business look consistent, memorable and premium.",
    image: "/graphic design 1.jpg",
    items: [
      { title: "Brand Identity", path: "brand-identity" },
      // { title: "Logo & Brand Systems", path: "" },
      { title: "Graphic Design", path: "graphicsdesign" },
      { title: "Marketing Collaterals", path: "marketing-collaterals" },
      { title: "Presentation & Infographic Design", path: "presentation-infographic-design" },
      { title: "Campaign Creatives", path: "campaign-creatives" },
    ],
  },
  {
    title: "Web & Digital",
    description:
      "Modern websites, landing pages and interactive digital experiences designed around your brand and built to turn visitors into customers.",
    image: "/web d.webp",
    items: [
     { title: "Website Design", path: "web-design" },
      { title: "Mobile App Design (iOS & Android)", path: "mobile-app-design" },
      { title: "UI/UX Design", path: "ui-ux-design" },
      { title: "Landing Pages", path: "landing-pages" },
      { title: "Digital Presentations", path: "digital-presentations" },
      { title: "Digital Product Experiences", path: "digital-product-experiences" },
    ],
  },
  {
    title: "Learning & Training",
    description:
      "E-learning, interactive modules and safety training that make learning engaging, easy to follow and measurable for every team.",
    image: "/Elearning.webp",
    items: [
       { title: "E-Learning Development", path: "e-learning" },
      { title: "Interactive Learning", path: "interactive-learning" },
      { title: "Articulate Storyline", path: "articulate-storyline" },
      { title: "Product Training", path: "product-training" },
      { title: "Employee & Safety Training", path: "employee-safety-training" },
      { title: "Simulation & Assessment", path: "simulation-assessment" },
    ],
  },
  {
    title: "Immersive Technology",
    description:
      "AR, VR, MR and XR experiences, virtual showrooms and interactive 3D that let people explore your products in an immersive way.",
    image: "/ar.webp",
    items: [
     { title: "AR|VR|MR|XR Experineces", path: "ar-vr-mr-xr" },
      { title: "Virtual Showrooms", path: "virtual-showrooms" },
      { title: "Interactive 3D", path: "interactive-3d" },
      { title: "Immersive Training", path: "immersive-training" },
    ],
  },
  {
    title: "Exhibition & Experiences",
    description:
      "Exhibition creatives, 3D stand designs, interactive displays and event content that make your brand stand out on the show floor.",
    image: "/Digital m.webp",
    items: [
      { title: "Exhibition Creative", path: "exhibition-creative" },
      { title: "Exhibition 3D Design", path: "exhibition-3d-design" },
      { title: "Interactive Displays", path: "interactive-displays" },
      { title: "Digital Installations", path: "digital-installations" },
      { title: "Product Experiences", path: "product-experiences" },
      { title: "Event Content", path: "event-content" },
    ],
  },
];

// ============================================================
// ARROW ICON
// ============================================================
const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ============================================================
// BIDIRECTIONAL SCROLL REVEAL
// ============================================================
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

// ============================================================
// SINGLE CATEGORY CARD
// ============================================================
const ServiceCategoryCard = ({ category, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [revealRef, revealVisible] = useScrollReveal(0.12);

  const hasHintedRef = useRef(false);

  const panelId = `service-category-panel-${index}`;
  const tooltipId = `service-category-tooltip-${index}`;
  const number = String(index + 1).padStart(2, "0");

  // The tooltip shows once, shortly after the card first scrolls into view
  useEffect(() => {
    if (!revealVisible || hasHintedRef.current) {
      return undefined;
    }

    let hideTimer = 0;

    const showTimer = window.setTimeout(() => {
      hasHintedRef.current = true;
      setIsHintVisible(true);

      hideTimer = window.setTimeout(() => setIsHintVisible(false), 3200);
    }, 900);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      setIsHintVisible(false);
    };
  }, [revealVisible]);

  // Only keyboard focus shows the tooltip, a mouse click does not
  const handleTriggerFocus = (event) => {
    if (event.currentTarget.matches(":focus-visible")) {
      setIsHintVisible(true);
    }
  };

  // The spotlight glow follows the pointer through CSS variables
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - rect.left}px`
    );
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <article
      ref={revealRef}
      className={`service-category-card ${
        index % 2 === 1 ? "is-reversed" : ""
      } ${revealVisible ? "is-visible" : ""} ${isOpen ? "is-open" : ""} ${
        isHintVisible ? "is-hinting" : ""
      }`}
      onPointerMove={handlePointerMove}
    >
      {/* =====================================================
          CARD HEADER (the whole area opens the sub-services)
      ===================================================== */}
      <div className="service-category-header">
        <div className="service-category-media">
          <img src={category.image} alt="" loading="lazy" />

          <span className="service-category-media-overlay" aria-hidden="true" />

          <span className="service-category-index" aria-hidden="true">
            {number}
          </span>
        </div>

        <div className="service-category-info">
          <span className="service-category-count">
            {category.items.length} Services
          </span>

          <h3 className="service-category-title">
            <button
              type="button"
              className="service-category-trigger"
              onClick={() => setIsOpen((prev) => !prev)}
              onFocus={handleTriggerFocus}
              onBlur={() => setIsHintVisible(false)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              aria-describedby={tooltipId}
            >
              {category.title}
            </button>
          </h3>

          <p className="service-category-desc">{category.description}</p>

          <div className="service-category-action">
            <span
              id={tooltipId}
              role="tooltip"
              className="service-category-tooltip"
            >
              Click to explore all {category.items.length} services
            </span>

            <span className="service-category-cta" aria-hidden="true">
              <span className="service-category-cta-label">
                {isOpen ? "Hide services" : "Explore services"}
              </span>

              <span className="service-category-toggle">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUB-SERVICES
      ===================================================== */}
      <div
        id={panelId}
        className="service-category-panel"
        role="region"
        aria-label={`${category.title} services`}
      >
        <div className="service-category-panel-inner">
          <ul className="service-category-items">
            {category.path && (
              <li
                className="service-category-item-all"
                style={{ "--item-index": 0 }}
              >
                <NavLink
                  to={`/services/${category.path}`}
                  className="service-category-item is-overview"
                >
                  <span className="service-category-item-number">ALL</span>

                  <span className="service-category-item-title">
                    View all {category.title}
                  </span>

                  <span
                    className="service-category-item-arrow"
                    aria-hidden="true"
                  >
                    <ArrowIcon />
                  </span>
                </NavLink>
              </li>
            )}

            {category.items.map((item, itemIndex) => {
              const content = (
                <>
                  <span className="service-category-item-number">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>

                  <span className="service-category-item-title">
                    {item.title}
                  </span>

                  {item.path ? (
                    <span
                      className="service-category-item-arrow"
                      aria-hidden="true"
                    >
                      <ArrowIcon />
                    </span>
                  ) : (
                    <span className="service-category-item-soon">Soon</span>
                  )}
                </>
              );

              return (
                <li key={item.title} style={{ "--item-index": itemIndex }}>
                  {item.path ? (
                    <NavLink
                      to={`/services/${item.path}`}
                      className="service-category-item"
                    >
                      {content}
                    </NavLink>
                  ) : (
                    <span
                      className="service-category-item is-disabled"
                      aria-disabled="true"
                    >
                      {content}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
};

// ============================================================
// SERVICE CATEGORIES SECTION
// ============================================================
const ServiceCategories = () => {
  const [headingRef, headingVisible] = useScrollReveal();

  return (
    <section
      className="service-categories-section"
      aria-labelledby="service-categories-title"
    >
      <div className="container">
        <div
          ref={headingRef}
          className={`service-categories-heading ${
            headingVisible ? "is-visible" : ""
          }`}
        >
          <p className="service-categories-eyebrow">WHAT WE OFFER</p>

          <h2 id="service-categories-title" className="fw-bold">
            Explore by <span>Category</span>
          </h2>

          <p className="service-categories-subtitle">
            Choose a category to see every service inside it.
          </p>
        </div>

        <div className="service-categories-list">
          {serviceCategories.map((category, index) => (
            <ServiceCategoryCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;