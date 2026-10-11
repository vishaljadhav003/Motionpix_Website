import "./Animation3D.css";
import { useEffect, useRef, useState } from "react";
import SEO from "./Seo";

const animationServices = [
  {
    number: "01",
    title: "Product Visualization",
    description:
      "High-detail 3D product visuals that communicate form, dimensions, mechanisms, materials and functional details with controlled camera movement and realistic presentation.",
    icon: "cube",
  },
  {
    number: "02",
    title: "Architectural Walkthroughs",
    description:
      "Immersive 3D environments that present architectural spaces, interiors and structures through cinematic camera paths, spatial composition and realistic lighting.",
    icon: "architecture",
  },
  {
    number: "03",
    title: "Industrial Simulation",
    description:
      "Detailed 3D sequences that explain machinery, assemblies, workflows and industrial processes through exploded views, section cuts and controlled motion.",
    icon: "industrial",
  },
  {
    number: "04",
    title: "Technical Visualization",
    description:
      "Complex engineering and technical concepts are converted into precise 3D models and animations that make components, mechanisms and operations easier to understand.",
    icon: "technical",
  },
  {
    number: "05",
    title: "3D Character & Environment",
    description:
      "Characters, environments and visual assets are developed with structured modelling, materials, lighting and animation to support cinematic and narrative content.",
    icon: "character",
  },
  {
    number: "06",
    title: "Exploded View Animation",
    description:
      "Individual components are separated and animated in sequence to reveal internal construction, assembly relationships and product functionality.",
    icon: "exploded",
  },
];

const pipelineSteps = [
  {
    number: "01",
    title: "Concept & References",
    description:
      "We establish the visual objective, references, technical requirements and camera direction before modelling begins.",
    icon: "concept",
  },
  {
    number: "02",
    title: "3D Modelling",
    description:
      "Products, environments, mechanical parts and other required assets are constructed with appropriate geometry and proportions.",
    icon: "model",
  },
  {
    number: "03",
    title: "Materials & Texturing",
    description:
      "Surface properties, textures, colours and material response are developed to achieve the required visual style and realism.",
    icon: "material",
  },
  {
    number: "04",
    title: "Lighting & Rendering",
    description:
      "Lighting, reflections, shadows, camera composition and render settings are refined to establish depth and visual hierarchy.",
    icon: "lighting",
  },
  {
    number: "05",
    title: "Animation & Camera",
    description:
      "Objects, mechanisms and camera movements are animated with controlled timing, transitions and cinematic composition.",
    icon: "camera",
  },
  {
    number: "06",
    title: "Post-Production",
    description:
      "Rendered sequences are refined through compositing, colour treatment, graphics, sound integration and final output preparation.",
    icon: "render",
  },
];

const benefits = [
  {
    number: "01",
    title: "Visualize Before Production",
    description:
      "Products, spaces and mechanisms can be visualized before physical production, helping teams communicate design intent more clearly.",
  },
  {
    number: "02",
    title: "Explain Complex Mechanisms",
    description:
      "Internal components, movement and assembly relationships can be shown from viewpoints that are difficult or impossible to achieve physically.",
  },
  {
    number: "03",
    title: "Create Realistic Product Experiences",
    description:
      "Materials, lighting, camera movement and accurate geometry can combine to create detailed visual experiences for products and environments.",
  },
  {
    number: "04",
    title: "Communicate at Any Scale",
    description:
      "The same 3D asset can support presentations, product demonstrations, training, marketing, technical documentation and digital experiences.",
  },
];

const faqData = [
  {
    q: "What can be created using 3D animation?",
    a: "3D animation can be used for product visualization, industrial machinery, architectural walkthroughs, technical demonstrations, medical models, exploded views, simulations, character animation and cinematic visualizations.",
  },
  {
    q: "Can 3D animation be created from CAD data?",
    a: "Yes. Existing CAD data can be used as a foundation for visualization and animation, depending on the format, geometry quality and technical requirements of the project.",
  },
  {
    q: "What is involved in a 3D animation project?",
    a: "A typical project can include concept development, reference analysis, 3D modelling, materials and texturing, lighting, camera setup, animation, rendering and post-production.",
  },
  {
    q: "Can internal mechanical components be shown?",
    a: "Yes. Exploded views, section cuts, transparent materials and controlled assembly animations can be used to reveal internal components and explain how a product or mechanism works.",
  },
  {
    q: "What affects the complexity of a 3D animation?",
    a: "Complexity depends on model detail, number of assets, animation length, mechanical movement, realism requirements, materials, lighting, camera movement and rendering requirements.",
  },
];

const AnimationIcon = ({ type }) => {
  return (
    <div className={`animation3d-icon animation3d-icon--${type}`}>
      {type === "cube" && (
        <>
          <span className="cube-face cube-front" />
          <span className="cube-face cube-side" />
          <span className="cube-face cube-top" />
        </>
      )}

      {type === "architecture" && (
        <>
          <span className="arch-roof" />
          <span className="arch-building" />
          <span className="arch-window window-one" />
          <span className="arch-window window-two" />
          <span className="arch-door" />
        </>
      )}

      {type === "industrial" && (
        <>
          <span className="industrial-gear gear-one" />
          <span className="industrial-gear gear-two" />
          <span className="industrial-axis" />
        </>
      )}

      {type === "technical" && (
        <>
          <span className="technical-cylinder" />
          <span className="technical-ring ring-one" />
          <span className="technical-ring ring-two" />
        </>
      )}

      {type === "character" && (
        <>
          <span className="character3d-head" />
          <span className="character3d-body" />
          <span className="character3d-eye eye-one" />
          <span className="character3d-eye eye-two" />
        </>
      )}

      {type === "exploded" && (
        <>
          <span className="exploded-part part-one" />
          <span className="exploded-part part-two" />
          <span className="exploded-part part-three" />
          <span className="exploded-axis" />
        </>
      )}

      {type === "concept" && (
        <>
          <span className="concept-bulb" />
          <span className="concept-ray ray-one" />
          <span className="concept-ray ray-two" />
          <span className="concept-ray ray-three" />
        </>
      )}

      {type === "model" && (
        <>
          <span className="model-wire model-wire-one" />
          <span className="model-wire model-wire-two" />
          <span className="model-wire model-wire-three" />
        </>
      )}

      {type === "material" && (
        <>
          <span className="material-sphere" />
          <span className="material-highlight" />
        </>
      )}

      {type === "lighting" && (
        <>
          <span className="light-source" />
          <span className="light-beam beam-one" />
          <span className="light-beam beam-two" />
          <span className="light-beam beam-three" />
        </>
      )}

      {type === "camera" && (
        <>
          <span className="camera-body" />
          <span className="camera-lens" />
          <span className="camera-top" />
        </>
      )}

      {type === "render" && (
        <>
          <span className="render-frame" />
          <span className="render-frame-inner" />
          <span className="render-progress" />
        </>
      )}
    </div>
  );
};

const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
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
          element.classList.add("reveal-active");
        } else {
          element.classList.remove("reveal-active");
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
      className={`animation3d-reveal animation3d-reveal--${direction} ${className}`}
      style={{ "--animation3d-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Animation3D = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="animation3d-page">
      <SEO
        title="3D Animation Services in Pune | MotionPix"
        description="Professional 3D animation and visualization services for products, architecture, industrial systems, technical communication and cinematic storytelling."
        keywords="3D animation, 3D visualization, product visualization, industrial animation, architectural walkthrough, 3D modelling"
        url="https://www.motionpixindia.com/services/3d-animation"
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="animation3d-hero">
        <div className="animation3d-hero-inner">
          <Reveal
            direction="left"
            className="animation3d-hero-content"
          >
            <span className="animation3d-eyebrow">
              03D / VISUALIZATION STUDIO
            </span>

            <h1>
              Ideas Into
              <span> Dimensions.</span>
              <br />
              Objects Into
              <span> Motion.</span>
            </h1>

            <p>
              We create detailed 3D visualizations that bring products,
              machines, architecture and technical concepts into a spatial
              world of form, material, light and movement. Every model,
              camera path and frame is built to communicate with precision.
            </p>

            <div className="animation3d-hero-meta">
              <span>Model</span>
              <i />
              <span>Material</span>
              <i />
              <span>Light</span>
              <i />
              <span>Animate</span>
              <i />
              <span>Render</span>
            </div>
          </Reveal>

   <Reveal
  direction="right"
  delay={120}
  className="animation3d-hero-visual"
>
  <div className="animation3d-scene">
    {/* Scene Header */}
    <div className="animation3d-scene-header">
      <span>
        SCENE <b>003</b>
      </span>

      <span>3D / FINAL</span>
    </div>

    {/* Camera Frame */}
    <div className="animation3d-camera-frame">
      <span className="animation3d-camera-label">
        CAM
      </span>

      <span className="animation3d-camera-corner corner-one" />
      <span className="animation3d-camera-corner corner-two" />
      <span className="animation3d-camera-corner corner-three" />
      <span className="animation3d-camera-corner corner-four" />

      <span className="animation3d-camera-target" />
    </div>

    {/* 3D Axis */}
    <div className="animation3d-axis animation3d-axis-x">
      <span>X</span>
    </div>

    <div className="animation3d-axis animation3d-axis-y">
      <span>Y</span>
    </div>

    <div className="animation3d-axis animation3d-axis-z">
      <span>Z</span>
    </div>

    {/* Main Mechanical 3D Model */}
    <div className="animation3d-model-stage">
      <div className="animation3d-orbit animation3d-orbit-one" />
      <div className="animation3d-orbit animation3d-orbit-two" />

      <div className="animation3d-machine">
        <div className="animation3d-machine-body">
          {/* Front */}
          <div className="animation3d-machine-front">
            <span />
            <span />
          </div>

          {/* Side */}
          <div className="animation3d-machine-side" />

          {/* Top */}
          <div className="animation3d-machine-top">
            <div className="animation3d-machine-ring">
              <div className="animation3d-machine-core" />
            </div>
          </div>

          {/* Base */}
          <div className="animation3d-machine-base" />
        </div>

        {/* Rotor */}
        <div className="animation3d-machine-rotor">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* Moving Red Component */}
        <div className="animation3d-machine-accent">
          <span />
        </div>
      </div>
    </div>

    {/* Floor / Reference Plane */}
    <div className="animation3d-floor">
      <span />
      <span />
      <span />
      <span />
    </div>

    {/* Scene Labels */}
    <div className="animation3d-object-label label-model">
      MODEL
    </div>

    <div className="animation3d-object-label label-light">
      LIGHT
    </div>

    <div className="animation3d-object-label label-camera">
      CAMERA
    </div>

    {/* Timeline */}
    <div className="animation3d-scene-timeline">
      <div className="animation3d-time-labels">
        <span>00</span>
        <span>24</span>
        <span>48</span>
        <span>72</span>
      </div>

      <div className="animation3d-timeline-track">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  </div>
</Reveal>
        </div>
      </section>

      {/* =====================================================
          WHAT WE CREATE
      ===================================================== */}

      <section
        className="animation3d-section animation3d-services"
        id="animation3d-services"
      >
        <div className="animation3d-container">
          <Reveal direction="up">
            <div className="animation3d-section-heading">
              <span>WHAT WE CREATE IN 3D</span>

              <h2>
                Turning geometry into
                <strong> visual experiences.</strong>
              </h2>

              <p>
                From individual product models to complete technical
                sequences, every 3D asset is developed around accuracy,
                visual hierarchy, spatial clarity and purposeful motion.
              </p>
            </div>
          </Reveal>

          <div className="animation3d-services-list">
            {animationServices.map((service, index) => (
              <Reveal
                key={service.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 70}
              >
                <article className="animation3d-service-card">
                  <span className="animation3d-service-number">
                    {service.number}
                  </span>

                  <AnimationIcon type={service.icon} />

                  <div className="animation3d-service-content">
                    <h3>{service.title}</h3>

                    <p>{service.description}</p>
                  </div>

                  <span className="animation3d-service-arrow">
                    ↗
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PIPELINE
      ===================================================== */}

      <section className="animation3d-section animation3d-pipeline">
        <div className="animation3d-container">
          <Reveal direction="right">
            <div className="animation3d-pipeline-intro">
              <span>THE 3D PRODUCTION PIPELINE</span>

              <h2>
                From a reference
                <strong> to a finished render.</strong>
              </h2>

              <p>
                A structured production pipeline keeps geometry accurate,
                materials consistent, lighting controlled and animation
                purposeful from the first concept to the final frame.
              </p>
            </div>
          </Reveal>

          <div className="animation3d-pipeline-line">
            {pipelineSteps.map((step, index) => (
              <Reveal
                key={step.number}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 90}
              >
                <article className="animation3d-pipeline-item">
                  <div className="animation3d-pipeline-marker">
                    <span>{step.number}</span>
                  </div>

                  <AnimationIcon type={step.icon} />

                  <div className="animation3d-pipeline-copy my-2">
                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY 3D
      ===================================================== */}

      <section className="animation3d-section animation3d-benefits">
        <div className="animation3d-container">
          <Reveal direction="left">
            <div className="animation3d-section-heading">
              <span>WHY 3D VISUALIZATION</span>

              <h2>
                Make the invisible
                <strong> visible.</strong>
              </h2>

              <p>
                3D visualization gives teams the ability to inspect,
                demonstrate and communicate objects, spaces and mechanisms
                from controlled viewpoints before they physically exist or
                while they are difficult to access.
              </p>
            </div>
          </Reveal>

          <div className="animation3d-benefit-list">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.number}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={index * 90}
              >
                <article className="animation3d-benefit">
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

      <section className="animation3d-section animation3d-faq">
        <div className="animation3d-container">
          <Reveal direction="up">
            <div className="animation3d-section-heading">
              <span>COMMON QUESTIONS</span>

              <h2>
                Understanding the
                <strong> 3D process.</strong>
              </h2>

              <p>
                A few practical details about 3D modelling, visualization,
                animation and production.
              </p>
            </div>
          </Reveal>

          <div className="animation3d-faq-list">
            {faqData.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <Reveal
                  key={item.q}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 60}
                >
                  <div
                    className={`animation3d-faq-item ${
                      isActive ? "active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="animation3d-faq-question"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isActive}
                    >
                      <span>
                        <small>
                          0{index + 1}
                        </small>

                        {item.q}
                      </span>

                      <b>{isActive ? "−" : "+"}</b>
                    </button>

                    <div className="animation3d-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL SECTION — NO CTA
      ===================================================== */}

      <section className="animation3d-final">
        <Reveal direction="up">
          <div className="animation3d-final-inner">
            <span>THE FINAL FRAME</span>

            <h2>
              Give every idea
              <br />
              <strong>another dimension.</strong>
            </h2>

            <p>
              From precise engineering models to cinematic product
              visualization, 3D transforms geometry into a visual language
              that people can explore, understand and remember.
            </p>

            <div className="animation3d-final-object">
              <span />
              <span />
              <span />
            </div>
          </div>
        </Reveal>
      </section>
    </section>
  );
};

export default Animation3D;