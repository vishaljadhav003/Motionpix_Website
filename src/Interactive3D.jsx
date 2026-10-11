import React, { useEffect, useRef, useState } from "react";
import "./Interactive3D.css";
import SEO from "./Seo";

const interactiveServices = [
  {
    number: "01",
    title: "3D Product Configurators",
    description:
      "Customers change colours, materials, parts and options on a live 3D model and see every choice update instantly, so decisions are made with confidence.",
    icon: "configurator",
  },
  {
    number: "02",
    title: "360° Product Viewers",
    description:
      "Products can be rotated, zoomed and inspected from every side, with close-up details and hotspots that explain the features that matter.",
    icon: "viewer",
  },
  {
    number: "03",
    title: "Real-Time 3D Web Experiences",
    description:
      "Interactive 3D scenes run directly inside the website or a presentation, with smooth controls, no plug-ins and no installation for the viewer.",
    icon: "web",
  },
  {
    number: "04",
    title: "Interactive 3D Walkthroughs",
    description:
      "Plants, spaces and environments are explored along guided camera paths or in free navigation, with points of interest placed exactly where they are needed.",
    icon: "walkthrough",
  },
  {
    number: "05",
    title: "Exploded Views & Machine Explorers",
    description:
      "Assemblies separate into parts, sections open up and functions are highlighted step by step, making complex machines easy to understand.",
    icon: "exploded",
  },
  {
    number: "06",
    title: "AR / VR-Ready 3D Assets",
    description:
      "Models are optimised, textured and structured so the same 3D asset can be reused for web viewers, augmented reality and virtual reality experiences.",
    icon: "assets",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Scope & Reference",
    description:
      "We define the products, CAD data and reference material, and decide which interactions the audience actually needs before any building starts.",
  },
  {
    number: "02",
    title: "3D Preparation",
    description:
      "Models are cleaned, optimised and textured so they stay sharp, accurate and light enough to load quickly on real devices.",
  },
  {
    number: "03",
    title: "Interaction Design",
    description:
      "Rotation, zoom, hotspots, variants and camera paths are planned so that exploring the model feels natural from the very first touch.",
  },
  {
    number: "04",
    title: "Build & Delivery",
    description:
      "The experience is developed, tested across screens and browsers, and prepared for the website, presentation, kiosk or sales tool where it will be used.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Explore Every Angle",
    description:
      "People control the view themselves, so they can look at the details that matter to them instead of waiting for a fixed video.",
  },
  {
    number: "02",
    title: "Higher Engagement",
    description:
      "Touching, rotating and configuring keeps visitors on the page longer and makes the product easier to remember than a flat image.",
  },
  {
    number: "03",
    title: "Show Before You Build",
    description:
      "Variants, options and large equipment can be reviewed digitally, long before a physical prototype or sample has to be made.",
  },
  {
    number: "04",
    title: "Works Across Devices",
    description:
      "One experience can be prepared for desktop, tablet and mobile, with controls that adapt to mouse, touch and screen size.",
  },
];

const faqs = [
  {
    question: "What is an interactive 3D experience?",
    answer:
      "It is a real-time 3D model or scene that the viewer controls. Instead of watching a fixed video, people can rotate, zoom, switch options and explore details themselves.",
  },
  {
    question: "Can you use our existing CAD or 3D models?",
    answer:
      "Yes. Existing models can be reviewed, cleaned and optimised for real-time use, then textured and lit so they look accurate and run smoothly.",
  },
  {
    question: "Will it work on mobile and in a normal browser?",
    answer:
      "Interactive 3D can be built to run in modern browsers on desktop, tablet and mobile. Model size, textures and controls are tuned for each screen so that it stays smooth.",
  },
  {
    question: "Can a configurator show colours, materials and variants?",
    answer:
      "Yes. Colours, materials, parts and accessories can be changed on the model in real time, and the selected combination can be shown, compared or shared.",
  },
  {
    question: "Where can the final experience be used?",
    answer:
      "It can be embedded in a website, used in sales presentations, shown on exhibition screens and kiosks, or reused as the base for augmented and virtual reality.",
  },
];

// Colour options of the live preview in the hero
const tones = [
  { name: "Crimson", color: "#e50914", ink: "#ffffff" },
  { name: "Graphite", color: "#2b2d33", ink: "#ffffff" },
  { name: "Silver", color: "#c8ced8", ink: "#111111" },
];

const DEFAULT_ROTATION = { x: -18, y: 32 };
const AUTO_ROTATION_SPEED = 0.22;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Interactive3DIcon = ({ type }) => {
  return (
    <div className={`interactive3d-icon interactive3d-icon--${type}`}>
      {type === "configurator" && (
        <>
          <span className="interactive3d-mc interactive3d-mc--configurator">
            <i className="interactive3d-mc-back" />
            <i className="interactive3d-mc-front" />
            <i className="interactive3d-mc-line interactive3d-mc-line--a" />
            <i className="interactive3d-mc-line interactive3d-mc-line--b" />
            <i className="interactive3d-mc-line interactive3d-mc-line--c" />
          </span>
          <span className="interactive3d-icon-slider slider-one" />
          <span className="interactive3d-icon-knob knob-one" />
          <span className="interactive3d-icon-slider slider-two" />
          <span className="interactive3d-icon-knob knob-two" />
        </>
      )}

      {type === "viewer" && (
        <>
          <span className="interactive3d-icon-orbit" />
          <span className="interactive3d-mc interactive3d-mc--viewer">
            <i className="interactive3d-mc-back" />
            <i className="interactive3d-mc-front" />
            <i className="interactive3d-mc-line interactive3d-mc-line--a" />
            <i className="interactive3d-mc-line interactive3d-mc-line--b" />
            <i className="interactive3d-mc-line interactive3d-mc-line--c" />
          </span>
          <span className="interactive3d-icon-orbit-dot" />
        </>
      )}

      {type === "web" && (
        <>
          <span className="interactive3d-icon-window" />
          <span className="interactive3d-icon-window-dot dot-one" />
          <span className="interactive3d-icon-window-dot dot-two" />
          <span className="interactive3d-mc interactive3d-mc--web">
            <i className="interactive3d-mc-back" />
            <i className="interactive3d-mc-front" />
            <i className="interactive3d-mc-line interactive3d-mc-line--a" />
            <i className="interactive3d-mc-line interactive3d-mc-line--b" />
            <i className="interactive3d-mc-line interactive3d-mc-line--c" />
          </span>
        </>
      )}

      {type === "walkthrough" && (
        <>
          <span className="interactive3d-icon-path" />
          <span className="interactive3d-icon-path-start" />
          <span className="interactive3d-icon-path-pin" />
          <span className="interactive3d-icon-path-ring" />
        </>
      )}

      {type === "exploded" && (
        <>
          <span className="interactive3d-icon-guide" />
          <span className="interactive3d-icon-layer layer-top" />
          <span className="interactive3d-icon-layer layer-middle" />
          <span className="interactive3d-icon-layer layer-bottom" />
        </>
      )}

      {type === "assets" && (
        <>
          <span className="interactive3d-icon-bracket bracket-tl" />
          <span className="interactive3d-icon-bracket bracket-tr" />
          <span className="interactive3d-icon-bracket bracket-bl" />
          <span className="interactive3d-icon-bracket bracket-br" />
          <span className="interactive3d-mc interactive3d-mc--assets">
            <i className="interactive3d-mc-back" />
            <i className="interactive3d-mc-front" />
            <i className="interactive3d-mc-line interactive3d-mc-line--a" />
            <i className="interactive3d-mc-line interactive3d-mc-line--b" />
            <i className="interactive3d-mc-line interactive3d-mc-line--c" />
          </span>
        </>
      )}
    </div>
  );
};

const Reveal = ({ children, className = "", direction = "up", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    // Bidirectional: the reveal plays again when scrolling back up
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
      className={`interactive3d-reveal interactive3d-reveal--${direction} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Live 3D preview: drag to rotate, switch the colour, reset the view
const Interactive3DStage = () => {
  const stageRef = useRef(null);
  const cubeRef = useRef(null);
  const readoutRef = useRef(null);

  const motionRef = useRef({
    x: DEFAULT_ROTATION.x,
    y: DEFAULT_ROTATION.y,
    velocityX: 0,
    velocityY: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [toneIndex, setToneIndex] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    const cube = cubeRef.current;

    if (!stage || !cube) {
      return undefined;
    }

    const motion = motionRef.current;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frame = 0;
    let frameCount = 0;

    const render = () => {
      cube.style.transform = `rotateX(${motion.x}deg) rotateY(${motion.y}deg)`;

      if (readoutRef.current && frameCount % 6 === 0) {
        const angleX = Math.round(motion.x);
        const angleY = ((Math.round(motion.y) % 360) + 360) % 360;

        readoutRef.current.textContent = `X ${angleX}° · Y ${String(
          angleY
        ).padStart(3, "0")}°`;
      }
    };

    const tick = () => {
      frameCount += 1;

      if (!motion.isDragging) {
        // Inertia after a drag + a slow idle rotation
        motion.y +=
          motion.velocityY + (prefersReducedMotion ? 0 : AUTO_ROTATION_SPEED);
        motion.x += motion.velocityX;

        motion.velocityX *= 0.94;
        motion.velocityY *= 0.94;

        // The tilt eases back to its resting angle
        motion.x += (DEFAULT_ROTATION.x - motion.x) * 0.03;
      }

      render();

      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    // Nothing runs while the preview is off screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
      } else {
        stop();
      }
    });

    observer.observe(stage);

    const handlePointerDown = (event) => {
      // Buttons keep their own click behaviour
      if (event.target.closest("button")) {
        return;
      }

      motion.isDragging = true;
      motion.lastX = event.clientX;
      motion.lastY = event.clientY;
      motion.velocityX = 0;
      motion.velocityY = 0;

      stage.setPointerCapture(event.pointerId);
      setIsDragging(true);
    };

    const handlePointerMove = (event) => {
      if (!motion.isDragging) {
        return;
      }

      const deltaX = event.clientX - motion.lastX;
      const deltaY = event.clientY - motion.lastY;

      motion.lastX = event.clientX;
      motion.lastY = event.clientY;

      motion.y += deltaX * 0.6;
      motion.x = clamp(motion.x - deltaY * 0.6, -75, 75);

      motion.velocityY = deltaX * 0.25;
      motion.velocityX = -deltaY * 0.25;
    };

    const handlePointerUp = (event) => {
      if (!motion.isDragging) {
        return;
      }

      motion.isDragging = false;
      setIsDragging(false);

      if (stage.hasPointerCapture(event.pointerId)) {
        stage.releasePointerCapture(event.pointerId);
      }
    };

    stage.addEventListener("pointerdown", handlePointerDown);
    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerup", handlePointerUp);
    stage.addEventListener("pointercancel", handlePointerUp);

    render();

    return () => {
      stop();
      observer.disconnect();

      stage.removeEventListener("pointerdown", handlePointerDown);
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerup", handlePointerUp);
      stage.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  const handleReset = () => {
    const motion = motionRef.current;

    motion.x = DEFAULT_ROTATION.x;
    motion.y = DEFAULT_ROTATION.y;
    motion.velocityX = 0;
    motion.velocityY = 0;
  };

  const tone = tones[toneIndex];

  return (
    <div
      ref={stageRef}
      className={`interactive3d-stage ${isDragging ? "is-dragging" : ""}`}
      style={{ "--i3d-tone": tone.color, "--i3d-ink": tone.ink }}
      role="group"
      aria-label="Interactive 3D preview. Drag to rotate, choose a colour or reset the view."
    >
      {/* Top bar */}
      <div className="interactive3d-hud interactive3d-hud--top">
        <span className="interactive3d-live">
          <i />
          Live viewport
        </span>

        <span className="interactive3d-readout" ref={readoutRef}>
          X -18° · Y 032°
        </span>
      </div>

      {/* 3D scene */}
      <div className="interactive3d-scene" aria-hidden="true">
        <span className="interactive3d-ring ring-one" />
        <span className="interactive3d-ring ring-two" />

        <span className="interactive3d-shadow" />

        <div ref={cubeRef} className="interactive3d-cube">
          <div className="interactive3d-face interactive3d-face--front">
            <span>3D</span>
            <i className="interactive3d-hotspot" />
          </div>
          <div className="interactive3d-face interactive3d-face--back" />
          <div className="interactive3d-face interactive3d-face--right" />
          <div className="interactive3d-face interactive3d-face--left" />
          <div className="interactive3d-face interactive3d-face--top" />
          <div className="interactive3d-face interactive3d-face--bottom" />
        </div>
      </div>

      <span className="interactive3d-chip chip-one" aria-hidden="true">
        360° view
      </span>

      <span className="interactive3d-chip chip-two" aria-hidden="true">
        Real-time
      </span>

      {/* Bottom bar */}
      <div className="interactive3d-hud interactive3d-hud--bottom">
        <span className="interactive3d-hint">Drag to rotate</span>

        <div className="interactive3d-controls">
          <div className="interactive3d-swatches" role="group" aria-label="Colour">
            {tones.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`interactive3d-swatch ${
                  index === toneIndex ? "is-active" : ""
                }`}
                style={{ "--swatch": item.color }}
                onClick={() => setToneIndex(index)}
                aria-label={item.name}
                aria-pressed={index === toneIndex}
              />
            ))}
          </div>

          <button
            type="button"
            className="interactive3d-reset"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const Interactive3D = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="interactive3d-page">
      <SEO
        title="Interactive 3D Experiences & Product Configurators | MotionPix"
        description="MotionPix creates interactive 3D experiences: product configurators, 360° viewers, real-time 3D web experiences, walkthroughs and exploded views for industries."
        keywords="interactive 3D, 3D product configurator, 3D product viewer, real-time 3D, WebGL 3D, interactive 3D walkthrough, exploded view animation, AR VR ready 3D, interactive 3D company Pune India"
        url="https://www.motionpixindia.com/services/interactive-3d"
      />

      {/* HERO */}
      <section className="interactive3d-hero">
        <div className="interactive3d-hero-inner">
          <Reveal direction="left" className="interactive3d-hero-content">
            <span className="interactive3d-eyebrow">
              3D / INTERACTIVE STUDIO
            </span>

            <h1>
              Products You Can
              <span> Rotate.</span>
              <br />
              Ideas You Can
              <span> Explore.</span>
            </h1>

            <p>
              We create interactive 3D experiences where products, machines
              and spaces can be rotated, zoomed, configured and explored in
              real time, directly in the browser and on any device. Every
              interaction is designed around clarity, control and visual
              impact.
            </p>

            <div className="interactive3d-hero-meta">
              <span>Model</span>
              <i />
              <span>Interact</span>
              <i />
              <span>Render</span>
              <i />
              <span>Deploy</span>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={120}
            className="interactive3d-hero-visual"
          >
            <Interactive3DStage />
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="interactive3d-section interactive3d-services"
        id="interactive3d-services"
      >
        <div className="interactive3d-container">
          <Reveal direction="up">
            <div className="interactive3d-section-heading">
              <span>WHAT WE CREATE</span>
              <h2>
                Every angle is
                <strong> explorable.</strong>
              </h2>
              <p>
                From a single product viewer to a complete configurator or
                virtual walkthrough, our interactive 3D work combines
                modelling, interaction design and real-time performance.
              </p>
            </div>
          </Reveal>

          <div className="interactive3d-services-list">
            {interactiveServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
                className="interactive3d-service-wrap"
              >
                <article className="interactive3d-service-card">
                  <div className="interactive3d-service-number">
                    {service.number}
                  </div>

                  <Interactive3DIcon type={service.icon} />

                  <div className="interactive3d-service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <span className="interactive3d-service-arrow">↗</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="interactive3d-section interactive3d-process">
        <div className="interactive3d-container">
          <Reveal direction="left">
            <div className="interactive3d-process-intro">
              <span>THE INTERACTIVE 3D PROCESS</span>
              <h2>
                From the first
                <strong> model </strong>
                to the final interaction.
              </h2>
              <p>
                A structured workflow keeps the 3D data accurate, the
                controls intuitive and every interaction purposeful.
              </p>
            </div>
          </Reveal>

          <div className="interactive3d-process-line">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 100}
                className="interactive3d-process-item"
              >
                <div className="interactive3d-process-marker">
                  <span>{step.number}</span>
                </div>

                <div className="interactive3d-process-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="interactive3d-section interactive3d-benefits">
        <div className="interactive3d-container">
          <Reveal direction="right">
            <div className="interactive3d-section-heading">
              <span>WHY INTERACTIVE 3D</span>
              <h2>
                Designed to let people
                <strong> explore, not just watch.</strong>
              </h2>
              <p>
                Interactive 3D hands control to the audience, which makes it
                ideal for products and systems that need to be understood,
                compared and trusted.
              </p>
            </div>
          </Reveal>

          <div className="interactive3d-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="interactive3d-benefit">
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

      {/* FAQ */}
      <section className="interactive3d-section interactive3d-faq">
        <div className="interactive3d-container">
          <Reveal direction="up">
            <div className="interactive3d-section-heading">
              <span>COMMON QUESTIONS</span>
              <h2>
                Understanding the
                <strong> process.</strong>
              </h2>
              <p>
                A few practical details about planning, building and
                delivering an interactive 3D experience.
              </p>
            </div>
          </Reveal>

          <div className="interactive3d-faq-list">
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <Reveal
                  key={faq.question}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`interactive3d-faq-item ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="interactive3d-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>0{index + 1}</small>
                        {faq.question}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="interactive3d-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT (no CTA button) */}
      <section className="interactive3d-final">
        <Reveal direction="up">
          <div className="interactive3d-final-inner">
            <span>THE FINAL VIEW</span>

            <h2>
              Great 3D doesn't
              <br />
              <strong>just render. It responds.</strong>
            </h2>

            <p>
              It lets people explore, compare and understand on their own
              terms, and remember what they found.
            </p>

            <div className="interactive3d-final-line">
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

export default Interactive3D;