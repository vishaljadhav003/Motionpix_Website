import "./WebsiteDesign.css";
import { useEffect, useRef, useState } from "react";
import SEO from "./Seo";

import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaDatabase,
  FaShieldAlt,
  FaSearch,
  FaRocket,
  FaPalette,
  FaSitemap,
  FaCogs,
  FaCloud,
  FaBug,
  FaChartLine,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";

const WebsiteDesign = () => {
  const revealRefs = useRef(new Set());
  const [activeFaq, setActiveFaq] = useState(null);

  const addRevealRef = (element) => {
    if (element) {
      revealRefs.current.add(element);
    }
  };
  useEffect(() => {
    const elements = Array.from(revealRefs.current);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "website-reveal-visible",
            entry.isIntersecting
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const capabilities = [
    {
      icon: <FaLaptopCode />,
      number: "01",
      title: "Business Websites",
      description:
        "Responsive corporate websites designed to communicate your brand, services, products and business information clearly across every screen.",
    },
    {
      icon: <FaCode />,
      number: "02",
      title: "Web Applications",
      description:
        "Interactive web applications with reusable components, dynamic interfaces, authentication, dashboards and API-driven functionality.",
    },
    {
      icon: <FaMobileAlt />,
      number: "03",
      title: "Responsive Experiences",
      description:
        "Layouts engineered for desktops, laptops, tablets and mobile devices with consistent usability across different screen sizes.",
    },
    {
      icon: <FaServer />,
      number: "04",
      title: "Backend Development",
      description:
        "Structured backend systems with APIs, business logic, authentication, validation and reliable communication between frontend and database.",
    },
    {
      icon: <FaDatabase />,
      number: "05",
      title: "Database Systems",
      description:
        "Well-structured database architecture for storing users, products, inquiries, applications, content and application data efficiently.",
    },
    {
      icon: <FaShieldAlt />,
      number: "06",
      title: "Security & Reliability",
      description:
        "Secure application practices including protected routes, input validation, authentication controls and safer API communication.",
    },
  ];

  const processSteps = [
    {
      number: "01",
      icon: <FaSitemap />,
      title: "Requirement & Architecture",
      description:
        "Business requirements, user journeys, sitemap, feature planning and technical architecture are defined before development begins.",
    },
    {
      number: "02",
      icon: <FaPalette />,
      title: "UI / UX Design",
      description:
        "Interfaces are planned around visual hierarchy, usability, responsive layouts, brand identity and meaningful interaction patterns.",
    },
    {
      number: "03",
      icon: <FaCode />,
      title: "Frontend Development",
      description:
        "The approved interface is transformed into reusable components with responsive layouts, interactions, animations and application states.",
    },
    {
      number: "04",
      icon: <FaServer />,
      title: "Backend & APIs",
      description:
        "Server-side logic, REST APIs, authentication, form processing and database communication are integrated with the frontend.",
    },
    {
      number: "05",
      icon: <FaBug />,
      title: "Testing & Optimization",
      description:
        "Responsive behavior, functionality, performance, API responses, validation and browser compatibility are checked before release.",
    },
    {
      number: "06",
      icon: <FaCloud />,
      title: "Deployment & Maintenance",
      description:
        "The application is prepared for hosting with production configuration, environment variables, monitoring and future maintenance.",
    },
  ];

  const advantages = [
    {
      number: "01",
      title: "Clear Digital Architecture",
      description:
        "A structured frontend, backend and database foundation makes the application easier to maintain, extend and improve.",
    },
    {
      number: "02",
      title: "Designed Around Users",
      description:
        "Navigation, content hierarchy and interaction patterns are planned to make important information easy to discover.",
    },
    {
      number: "03",
      title: "Built to Scale",
      description:
        "Reusable components and modular application architecture allow new pages, features and integrations to be added over time.",
    },
    {
      number: "04",
      title: "Performance Focused",
      description:
        "Optimized assets, efficient rendering, responsive layouts and sensible API communication help create a smoother experience.",
    },
  ];

  const technologies = [
    {
      icon: <FaCode />,
      title: "Frontend Engineering",
      description:
        "Component-based interfaces, responsive layouts, state management, animations and API integration.",
    },
    {
      icon: <FaServer />,
      title: "Backend Engineering",
      description:
        "REST APIs, authentication, server-side logic, validation, error handling and business workflows.",
    },
    {
      icon: <FaDatabase />,
      title: "Data Architecture",
      description:
        "Structured schemas, relationships, queries and reliable data flow between applications and databases.",
    },
    {
      icon: <FaRocket />,
      title: "Production Ready",
      description:
        "Deployment-focused configuration, performance optimization, security practices and maintainable code.",
    },
  ];

  const faqs = [
    {
      question: "What types of websites can you develop?",
      answer:
        "We can develop corporate websites, service websites, product websites, portfolio websites, landing pages, educational platforms, business portals and custom web applications.",
    },
    {
      question: "Can a website include a backend and database?",
      answer:
        "Yes. A website can be connected to a backend API and database for contact forms, inquiries, user accounts, dashboards, products, content management and other dynamic functionality.",
    },
    {
      question: "Will the website work on mobile and tablet?",
      answer:
        "Yes. Responsive development adapts layouts, navigation, typography, components and interactions for desktop, tablet and mobile screen sizes.",
    },
    {
      question: "Can you build an admin panel for the website?",
      answer:
        "Yes. A separate authenticated admin application can be created for managing inquiries, career applications, users, products, content and other operational data.",
    },
    {
      question: "Can the website be connected to APIs?",
      answer:
        "Yes. Frontend applications can communicate with internal backend APIs as well as external services such as payment systems, email services, maps, analytics and other integrations.",
    },
    {
      question: "How is a custom website different from a template?",
      answer:
        "A custom website can be structured around the exact business requirements, content architecture, user flow, visual identity, integrations and future functionality instead of being limited to a predefined template.",
    },
  ];

  return (
    <main className="website-page">
      <SEO
        title="Website Design & Software Development | MotionPix"
        description="Professional website design and software development services for responsive websites, web applications, backend systems and custom digital experiences."
        keywords="website design, web development, software development, web application development, responsive website, backend development"
        url="https://www.motionpixindia.com/services/website-design"
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="website-hero">
        <div className="website-hero-inner">
          <div
            ref={addRevealRef}
            className="website-reveal website-reveal-left website-hero-content"
          >
            <span className="website-eyebrow">
              WEBSITE DESIGN & DEVELOPMENT
            </span>

            <h1>
              Build digital
              <br />
              <strong>experiences that work.</strong>
            </h1>

            <p>
              From responsive business websites to full-scale web
              applications, we design and develop digital products that
              combine strong visual systems, intuitive user experiences and
              reliable software architecture.
            </p>

            <div className="website-hero-points">
              <span>
                <FaCheckCircle />
                Responsive
              </span>

              <span>
                <FaCheckCircle style={{color:"orangered"}}/>
                Scalable
              </span>

              <span>
                <FaCheckCircle style={{color:"green"}}/>
                Secure
              </span>

              <span>
                <FaCheckCircle style={{color:"grey"}}/>
                Performance Focused
              </span>
            </div>
          </div>

          {/* =================================================
              CSS SOFTWARE VISUAL
          ================================================= */}

          <div
            ref={addRevealRef}
            className="website-reveal website-reveal-right website-hero-visual"
          >
            <div className="website-browser">
              <div className="website-browser-top">
                <div className="website-browser-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="website-browser-address">
                  motionpix.dev
                </div>

                <div className="website-browser-status">
                  <span />
                </div>
              </div>

              <div className="website-browser-content">
                <div className="website-browser-sidebar">
                  <span className="active" />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="website-ui">
                  <div className="website-ui-nav">
                    <span className="website-ui-logo">
                      M
                    </span>

                    <div className="website-ui-links">
                      <span />
                      <span />
                      <span />
                    </div>

                    <i />
                  </div>

                  <div className="website-ui-hero">
                    <div className="website-ui-copy">
                      <span />
                      <strong />
                      <strong />
                      <small />
                      <small />
                    </div>

                    <div className="website-ui-object">
                      <div className="website-ui-orbit" />
                      <div className="website-ui-core">
                        <FaCode />
                      </div>
                    </div>
                  </div>

                  <div className="website-ui-cards">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              </div>

              <div className="website-code-panel">
                <span>&lt;</span>
                <b>component</b>
                <span> /&gt;</span>

                <div className="website-code-lines">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            <div className="website-floating-label website-label-ui">
              UI / UX
            </div>

            <div className="website-floating-label website-label-api">
              API
            </div>

            <div className="website-floating-label website-label-db">
              DATABASE
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE BUILD
      ===================================================== */}

      <section className="website-section website-capabilities">
        <div className="website-container">
          <div
            ref={addRevealRef}
            className="website-reveal website-reveal-left website-section-heading"
          >
            <span>WHAT WE BUILD</span>

            <h2>
              Digital products
              <strong> built with purpose.</strong>
            </h2>

            <p>
              Every website or application is structured around its actual
              business requirements, users, content and future growth.
            </p>
          </div>

          <div className="website-capability-list">
            {capabilities.map((item, index) => (
              <div
                ref={addRevealRef}
                className={`website-reveal ${
                  index % 2 === 0
                    ? "website-reveal-left"
                    : "website-reveal-right"
                }`}
                style={{
                  "--website-delay": `${index * 70}ms`,
                }}
                key={item.number}
              >
                <article className="website-capability-card">
                  <div className="website-capability-icon">
                    {item.icon}
                  </div>

                  <div className="website-capability-number">
                    {item.number}
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <span className="website-card-line" />
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          DEVELOPMENT PROCESS
      ===================================================== */}

      <section className="website-section website-process">
        <div className="website-container">
          <div
            ref={addRevealRef}
            className="website-reveal website-reveal-right website-section-heading"
          >
            <span>DEVELOPMENT PROCESS</span>

            <h2>
              From first idea
              <strong> to production.</strong>
            </h2>

            <p>
              A structured development workflow keeps design, engineering,
              testing and deployment aligned throughout the project.
            </p>
          </div>

          <div className="website-process-list">
            {processSteps.map((step, index) => (
              <div
                ref={addRevealRef}
                className={`website-reveal ${
                  index % 2 === 0
                    ? "website-reveal-left"
                    : "website-reveal-right"
                }`}
                style={{
                  "--website-delay": `${index * 80}ms`,
                }}
                key={step.number}
              >
                <article className="website-process-item">
                  <div className="website-process-number">
                    {step.number}
                  </div>

                  <div className="website-process-icon">
                    {step.icon}
                  </div>

                  <div className="website-process-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>

                  <span className="website-process-arrow">
                    →
                  </span>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY MODERN DEVELOPMENT
      ===================================================== */}

      <section className="website-section website-advantages">
        <div className="website-container">
          <div
            ref={addRevealRef}
            className="website-reveal website-reveal-left website-advantages-intro"
          >
            <span>WHY MODERN DEVELOPMENT</span>

            <h2>
              More than a
              <strong> beautiful interface.</strong>
            </h2>

            <p>
              A professional digital product needs visual clarity and
              engineering underneath it. The architecture should support
              the business today while leaving room for tomorrow.
            </p>

            <div className="website-architecture">
              <div>
                <FaPalette />
                <span>Design</span>
              </div>

              <i />

              <div>
                <FaCode />
                <span>Frontend</span>
              </div>

              <i />

              <div>
                <FaServer />
                <span>Backend</span>
              </div>

              <i />

              <div>
                <FaDatabase />
                <span>Data</span>
              </div>
            </div>
          </div>

          <div className="website-advantages-list">
            {advantages.map((item, index) => (
              <div
                ref={addRevealRef}
                className={`website-reveal ${
                  index % 2 === 0
                    ? "website-reveal-right"
                    : "website-reveal-left"
                }`}
                style={{
                  "--website-delay": `${index * 80}ms`,
                }}
                key={item.number}
              >
                <article className="website-advantage">
                  <span>{item.number}</span>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <i />
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ENGINEERING CAPABILITIES
      ===================================================== */}

      <section className="website-section website-engineering">
        <div className="website-container">
          <div
            ref={addRevealRef}
            className="website-reveal website-reveal-left website-section-heading"
          >
            <span>SOFTWARE ENGINEERING</span>

            <h2>
              Built beyond
              <strong> the browser.</strong>
            </h2>

            <p>
              Modern web development connects interface design with APIs,
              databases, authentication, security, deployment and ongoing
              application maintenance.
            </p>
          </div>

          <div className="website-engineering-grid">
            {technologies.map((item, index) => (
              <div
                ref={addRevealRef}
                className={`website-reveal ${
                  index % 2 === 0
                    ? "website-reveal-left"
                    : "website-reveal-right"
                }`}
                style={{
                  "--website-delay": `${index * 90}ms`,
                }}
                key={item.title}
              >
                <article className="website-engineering-card">
                  <div className="website-engineering-icon">
                    {item.icon}
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="website-engineering-corner" />
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="website-section website-faq">
        <div className="website-container website-faq-container">
          <div
            ref={addRevealRef}
            className="website-reveal website-reveal-left website-section-heading"
          >
            <span>COMMON QUESTIONS</span>

            <h2>
              Understanding the
              <strong> development process.</strong>
            </h2>

            <p>
              A few practical details about website design, software
              development and application architecture.
            </p>
          </div>

          <div className="website-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <div
                  ref={addRevealRef}
                  className={`website-reveal ${
                    index % 2 === 0
                      ? "website-reveal-left"
                      : "website-reveal-right"
                  }`}
                  style={{
                    "--website-delay": `${index * 60}ms`,
                  }}
                  key={faq.question}
                >
                  <article
                    className={`website-faq-item ${
                      isActive ? "website-faq-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="website-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>
                          0{index + 1}
                        </small>

                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="website-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL STATEMENT
      ===================================================== */}

      <section className="website-final">
        <div
          ref={addRevealRef}
          className="website-reveal website-reveal-up website-final-inner"
        >
          <span>THE DIGITAL FOUNDATION</span>

          <h2>
            Design it clearly.
            <br />
            <strong>Build it properly.</strong>
          </h2>

          <p>
            A strong website is not only about how it looks. It is about
            how clearly it communicates, how reliably it works and how
            easily it can evolve as the business grows.
          </p>

          <div className="website-final-system">
            <span>
              <FaPalette />
            </span>

            <i />

            <span>
              <FaCode />
            </span>

            <i />

            <span>
              <FaServer />
            </span>

            <i />

            <span>
              <FaDatabase />
            </span>

            <i />

            <span>
              <FaRocket />
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WebsiteDesign;