import React, { useEffect, useRef, useState } from "react";
import "./MobileAppDesign.css";

/* =========================================================
   MOBILE APP DESIGN — SERVICES
========================================================= */

const mobileAppDesignServices = [
  {
    number: "01",
    title: "Android App Design",
    description:
      "React Native mobile experiences designed for Android with clear navigation, touch-friendly layouts, scalable screens and interfaces that feel natural across different device sizes.",
    icon: "android",
  },
  {
    number: "02",
    title: "iOS App Design",
    description:
      "React Native interfaces structured for iOS with refined spacing, intuitive navigation, responsive layouts and interaction patterns suited to Apple mobile experiences.",
    icon: "ios",
  },
  {
    number: "03",
    title: "Cross-Platform UI",
    description:
      "A unified React Native interface system that keeps the product visually consistent while adapting layouts, spacing and interactions for both Android and iOS.",
    icon: "crossplatform",
  },
  {
    number: "04",
    title: "Mobile Navigation",
    description:
      "User flows, tab navigation, screen transitions and interaction structures are organised to make moving through the application simple and predictable.",
    icon: "navigation",
  },
  {
    number: "05",
    title: "Responsive App Screens",
    description:
      "Mobile screens are structured to adapt across different phone dimensions while maintaining readable typography, balanced spacing and usable touch targets.",
    icon: "responsive",
  },
  {
    number: "06",
    title: "React Native UI System",
    description:
      "Reusable React Native components, buttons, cards, inputs, navigation elements and visual patterns create a consistent interface across the application.",
    icon: "reactnative",
  },
];

/* =========================================================
   MOBILE APP DESIGN — PROCESS
========================================================= */

const mobileAppDesignProcess = [
  {
    number: "01",
    title: "App Goal & User Flow",
    description:
      "We define the application's purpose, target users, important screens and the journey users need to follow from one action to another.",
  },
  {
    number: "02",
    title: "Screen Structure",
    description:
      "Core screens, navigation, content hierarchy, buttons, inputs and interaction points are organised into a clear mobile interface structure.",
  },
  {
    number: "03",
    title: "React Native Design",
    description:
      "The interface is developed with React Native using reusable components, responsive layouts and interaction patterns for Android and iOS.",
  },
  {
    number: "04",
    title: "Test & Refine",
    description:
      "The application interface is reviewed across screen sizes and refined for spacing, usability, touch interaction, consistency and overall presentation.",
  },
];

/* =========================================================
   MOBILE APP DESIGN — BENEFITS
========================================================= */

const mobileAppDesignBenefits = [
  {
    number: "01",
    title: "One React Native Codebase",
    description:
      "React Native allows the mobile interface to be developed for Android and iOS while maintaining a shared application structure and component system.",
  },
  {
    number: "02",
    title: "Consistent Experience",
    description:
      "Shared design components help maintain consistent typography, spacing, colours, controls and interaction patterns throughout the application.",
  },
  {
    number: "03",
    title: "Device-Ready Layouts",
    description:
      "Responsive mobile layouts are structured to work across different phone dimensions without compromising readability or touch usability.",
  },
  {
    number: "04",
    title: "Reusable Components",
    description:
      "Reusable React Native components make the interface easier to maintain, expand and keep visually consistent as the application grows.",
  },
];

/* =========================================================
   MOBILE APP DESIGN — FAQ
========================================================= */

const mobileAppDesignFaqs = [
  {
    question: "What is React Native mobile app design?",
    answer:
      "React Native mobile app design is the process of planning and developing mobile interfaces and interactions using React Native so the application can target both Android and iOS.",
  },
  {
    question: "What is the difference between Android and iOS app design?",
    answer:
      "Android and iOS use different platform conventions, navigation behaviours, screen dimensions and interaction expectations. A React Native application can maintain one overall design system while adapting specific interface details for each platform.",
  },
  {
    question: "Can one React Native app work on both Android and iOS?",
    answer:
      "Yes. React Native is designed for cross-platform mobile development, allowing the same application project and reusable components to support both Android and iOS while platform-specific behaviour can be handled where required.",
  },
  {
    question: "Which tools are used for React Native mobile app development?",
    answer:
      "A React Native workflow commonly uses Node.js, npm or another JavaScript package manager, React Native, Expo when required, Android Studio for Android development and Xcode for iOS development on macOS.",
  },
  {
    question: "Will the app design be responsive on different phones?",
    answer:
      "Yes. React Native layouts can be structured using flexible dimensions, responsive spacing, adaptive components and platform-aware layouts so the interface remains usable across different mobile screen sizes.",
  },
];

/* =========================================================
   CUSTOM MOBILE APP ICONS
========================================================= */

const MobileAppDesignIcon = ({ type }) => {
  return (
    <div
      className={`mobileappdesign-icon mobileappdesign-icon--${type}`}
      aria-hidden="true"
    >
      {type === "android" && (
        <>
          <span className="mobileappdesign-android-head" />
          <span className="mobileappdesign-android-eye android-eye-one" />
          <span className="mobileappdesign-android-eye android-eye-two" />
          <span className="mobileappdesign-android-antenna antenna-one" />
          <span className="mobileappdesign-android-antenna antenna-two" />
          <span className="mobileappdesign-android-body" />
          <span className="mobileappdesign-android-leg android-leg-one" />
          <span className="mobileappdesign-android-leg android-leg-two" />
        </>
      )}

      {type === "ios" && (
        <>
          <span className="mobileappdesign-ios-device" />
          <span className="mobileappdesign-ios-screen" />
          <span className="mobileappdesign-ios-home" />
          <span className="mobileappdesign-ios-camera" />
        </>
      )}

      {type === "crossplatform" && (
        <>
          <span className="mobileappdesign-cross-device cross-device-one" />
          <span className="mobileappdesign-cross-device cross-device-two" />
          <span className="mobileappdesign-cross-link" />
          <span className="mobileappdesign-cross-dot cross-dot-one" />
          <span className="mobileappdesign-cross-dot cross-dot-two" />
        </>
      )}

      {type === "navigation" && (
        <>
          <span className="mobileappdesign-nav-circle" />
          <span className="mobileappdesign-nav-arrow" />
          <span className="mobileappdesign-nav-line nav-line-one" />
          <span className="mobileappdesign-nav-line nav-line-two" />
        </>
      )}

      {type === "responsive" && (
        <>
          <span className="mobileappdesign-responsive-phone" />
          <span className="mobileappdesign-responsive-screen" />
          <span className="mobileappdesign-responsive-corner corner-one" />
          <span className="mobileappdesign-responsive-corner corner-two" />
        </>
      )}

      {type === "reactnative" && (
        <>
          <span className="mobileappdesign-rn-ring ring-one" />
          <span className="mobileappdesign-rn-ring ring-two" />
          <span className="mobileappdesign-rn-center" />
          <span className="mobileappdesign-rn-orbit orbit-one" />
          <span className="mobileappdesign-rn-orbit orbit-two" />
        </>
      )}
    </div>
  );
};

/* =========================================================
   BIDIRECTIONAL REVEAL
========================================================= */

const Reveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
        } else {
          element.classList.remove("is-visible");
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`mobileappdesign-reveal mobileappdesign-reveal--${direction} ${className}`}
      style={{
        "--mobileappdesign-reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const MobileAppDesign = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="mobileappdesign-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mobileappdesign-hero">
        <div className="mobileappdesign-hero-inner">
          <Reveal
            direction="left"
            className="mobileappdesign-hero-content"
          >
            <span className="mobileappdesign-eyebrow">
              MOBILE APP DESIGN / REACT NATIVE
            </span>

            <h1>
              One App.
              <br />
              <span>Two Platforms.</span>
            </h1>

            <p>
              We design focused mobile experiences using React Native for
              Android and iOS. From screen structure and navigation to
              responsive layouts and reusable components, every interface is
              designed around clarity, touch interaction and consistency.
            </p>

            <div className="mobileappdesign-hero-meta">
              <span>Android</span>
              <i />
              <span>iOS</span>
              <i />
              <span>React Native</span>
              <i />
              <span>Responsive UI</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="mobileappdesign-hero-visual"
          >
            <div className="mobileappdesign-device-stage">
              <div className="mobileappdesign-stage-label">
                <span>PLATFORM</span>
                <strong>ANDROID / IOS</strong>
              </div>

              <div className="mobileappdesign-platform-node platform-node-android">
                <span>ANDROID</span>
              </div>

              <div className="mobileappdesign-platform-node platform-node-ios">
                <span>IOS</span>
              </div>

              <div className="mobileappdesign-device device-back">
                <div className="mobileappdesign-device-camera" />
                <div className="mobileappdesign-device-screen">
                  <span className="mobileappdesign-screen-bar" />
                  <span className="mobileappdesign-screen-card card-one" />
                  <span className="mobileappdesign-screen-card card-two" />
                  <span className="mobileappdesign-screen-button" />
                </div>
              </div>

              <div className="mobileappdesign-device device-front">
                <div className="mobileappdesign-device-camera" />
                <div className="mobileappdesign-device-screen">
                  <div className="mobileappdesign-app-header">
                    <span />
                    <b>APP</b>
                    <span />
                  </div>

                  <div className="mobileappdesign-app-profile">
                    <span />
                    <div>
                      <b>Mobile Experience</b>
                      <small>React Native</small>
                    </div>
                  </div>

                  <div className="mobileappdesign-app-row">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="mobileappdesign-app-row">
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="mobileappdesign-app-bottom">
                    <span />
                    <span className="active" />
                    <span />
                    <span />
                  </div>
                </div>
              </div>

              <div className="mobileappdesign-connection">
                <span />
                <span />
                <span />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="mobileappdesign-section mobileappdesign-services"
        id="mobileappdesign-services"
      >
        <div className="mobileappdesign-container">
          <Reveal direction="up">
            <div className="mobileappdesign-section-heading">
              <span>WHAT WE DESIGN</span>

              <h2>
                Mobile experiences built for
                <strong> real screens.</strong>
              </h2>

              <p>
                From Android and iOS interfaces to reusable React Native
                components, every part of the mobile experience is structured
                around touch, clarity, navigation and responsive behaviour.
              </p>
            </div>
          </Reveal>

          <div className="mobileappdesign-services-list">
            {mobileAppDesignServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="mobileappdesign-service-wrap"
              >
                <article className="mobileappdesign-service-card">
                  <div className="mobileappdesign-service-number">
                    {service.number}
                  </div>

                  <MobileAppDesignIcon type={service.icon} />

                  <div className="mobileappdesign-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="mobileappdesign-service-arrow">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ANDROID / IOS DIFFERENCE
      ===================================================== */}

      <section className="mobileappdesign-section mobileappdesign-platforms">
        <div className="mobileappdesign-container">
          <Reveal direction="right">
            <div className="mobileappdesign-section-heading">
              <span>ANDROID / IOS</span>

              <h2>
                One React Native foundation.
                <strong> Different platform details.</strong>
              </h2>

              <p>
                React Native allows the application to share a common
                development structure while Android and iOS can still follow
                their own platform conventions where the experience requires
                it.
              </p>
            </div>
          </Reveal>

          <div className="mobileappdesign-platform-grid">
            <Reveal direction="left">
              <article className="mobileappdesign-platform-card">
                <div className="mobileappdesign-platform-card-top">
                  <span className="mobileappdesign-platform-icon android">
                    A
                  </span>

                  <div>
                    <small>PLATFORM 01</small>
                    <h3>Android</h3>
                  </div>
                </div>

                <div className="mobileappdesign-platform-points">
                  <div>
                    <span>01</span>
                    <p>Flexible device sizes and screen dimensions</p>
                  </div>

                  <div>
                    <span>02</span>
                    <p>Android-oriented navigation and interaction patterns</p>
                  </div>

                  <div>
                    <span>03</span>
                    <p>Touch-first layouts with adaptable component sizing</p>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal direction="right" delay={100}>
              <article className="mobileappdesign-platform-card">
                <div className="mobileappdesign-platform-card-top">
                  <span className="mobileappdesign-platform-icon ios">
                    ●
                  </span>

                  <div>
                    <small>PLATFORM 02</small>
                    <h3>iOS</h3>
                  </div>
                </div>

                <div className="mobileappdesign-platform-points">
                  <div>
                    <span>01</span>
                    <p>Structured layouts across iPhone screen sizes</p>
                  </div>

                  <div>
                    <span>02</span>
                    <p>iOS-oriented navigation and interaction patterns</p>
                  </div>

                  <div>
                    <span>03</span>
                    <p>Platform-aware spacing, controls and touch behaviour</p>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          TOOLS
      ===================================================== */}

      <section className="mobileappdesign-section mobileappdesign-tools">
        <div className="mobileappdesign-container">
          <Reveal direction="left">
            <div className="mobileappdesign-tools-intro">
              <span>REACT NATIVE WORKFLOW</span>

              <h2>
                The tools behind the
                <strong> mobile experience.</strong>
              </h2>

              <p>
                The workflow stays focused on React Native and the tools used
                around it to build, run, test and prepare Android and iOS
                applications.
              </p>
            </div>
          </Reveal>

          <div className="mobileappdesign-tools-grid">
            <Reveal direction="right" delay={40}>
              <article className="mobileappdesign-tool">
                <span className="mobileappdesign-tool-number">01</span>

                <div className="mobileappdesign-tool-icon">
                  RN
                </div>

                <div>
                  <h3>React Native</h3>
                  <p>
                    Core framework for building the Android and iOS mobile
                    application.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal direction="left" delay={100}>
              <article className="mobileappdesign-tool">
                <span className="mobileappdesign-tool-number">02</span>

                <div className="mobileappdesign-tool-icon">
                  EX
                </div>

                <div>
                  <h3>Expo</h3>
                  <p>
                    React Native development tooling for building and testing
                    mobile applications.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal direction="right" delay={160}>
              <article className="mobileappdesign-tool">
                <span className="mobileappdesign-tool-number">03</span>

                <div className="mobileappdesign-tool-icon">
                  AS
                </div>

                <div>
                  <h3>Android Studio</h3>
                  <p>
                    Android development environment used for Android builds,
                    emulators and platform testing.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal direction="left" delay={220}>
              <article className="mobileappdesign-tool">
                <span className="mobileappdesign-tool-number">04</span>

                <div className="mobileappdesign-tool-icon">
                  X
                </div>

                <div>
                  <h3>Xcode</h3>
                  <p>
                    Apple's development environment used for iOS builds,
                    simulators and platform testing.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="mobileappdesign-section mobileappdesign-process">
        <div className="mobileappdesign-container">
          <Reveal direction="left">
            <div className="mobileappdesign-process-intro">
              <span>THE MOBILE APP PROCESS</span>

              <h2>
                From the first
                <strong> screen </strong>
                to the final experience.
              </h2>

              <p>
                A structured React Native workflow keeps the application
                architecture, interface, navigation and platform experience
                organised from beginning to delivery.
              </p>
            </div>
          </Reveal>

          <div className="mobileappdesign-process-line">
            {mobileAppDesignProcess.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="mobileappdesign-process-item"
              >
                <div className="mobileappdesign-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="mobileappdesign-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="mobileappdesign-section mobileappdesign-benefits">
        <div className="mobileappdesign-container">
          <Reveal direction="right">
            <div className="mobileappdesign-section-heading">
              <span>WHY REACT NATIVE</span>

              <h2>
                Designed for
                <strong> two platforms.</strong>
              </h2>

              <p>
                React Native makes it possible to create a consistent mobile
                experience with shared components while still respecting the
                differences between Android and iOS.
              </p>
            </div>
          </Reveal>

          <div className="mobileappdesign-benefit-list">
            {mobileAppDesignBenefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="mobileappdesign-benefit">
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

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="mobileappdesign-section mobileappdesign-faq">
        <div className="mobileappdesign-container">
          <Reveal direction="up">
            <div className="mobileappdesign-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding
                <strong> mobile app design.</strong>
              </h2>

              <p>
                A few practical details about designing Android and iOS
                applications with React Native.
              </p>
            </div>
          </Reveal>

          <div className="mobileappdesign-faq-list">
            {mobileAppDesignFaqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`mobileappdesign-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="mobileappdesign-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="mobileappdesign-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL STATEMENT — NO CTA
      ===================================================== */}

      <section className="mobileappdesign-final">
        <Reveal direction="up">
          <div className="mobileappdesign-final-inner">
            <span>THE MOBILE EXPERIENCE</span>

            <h2>
              One experience.
              <br />
              <strong>Built for every screen.</strong>
            </h2>

            <p>
              Great mobile design is not only about fitting an interface onto
              a phone. It is about creating an experience that feels clear,
              responsive and natural on Android and iOS.
            </p>

            <div className="mobileappdesign-final-line">
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

export default MobileAppDesign;