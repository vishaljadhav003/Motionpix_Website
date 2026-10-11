import { useEffect, useRef, useState } from "react";
import "./IntroSection.css";

const IntroSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [visible, setVisible] = useState(false);

  // Bidirectional Intersection Observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Parallax Listener
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const relativeScroll = windowHeight - rect.top;
        animationFrameId = requestAnimationFrame(() => {
          setOffsetY(relativeScroll * 0.08);
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="intro-section-mp">
      {/* Background Parallax Overlay Layer */}
      <div 
        className="intro-parallax-bg"
        style={{ transform: `translate3d(0, ${offsetY * 0.4}px, 0)` }}
        aria-hidden="true"
      />

      <div className={`intro-container ${visible ? "is-visible" : ""}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <div 
                className="intro-card-mp"
                style={{ transform: `translate3d(0, ${-offsetY * 0.2}px, 0)` }}
              >
                {/* Badge Header */}
                <div className="intro-badge-wrapper">
                  <span className="intro-badge">About MotionPix</span>
                </div>

                {/* Mask Revealed Headline */}
                <h2 className="intro-title-mp">
                  <span className="text-reveal-mask">
                    <span className="text-reveal-content">
                      Innovating Visual &amp; Digital Solutions
                    </span>
                  </span>
                </h2>

                {/* Paragraph Content Reveal */}
                <div className="intro-text-wrapper" ref={textRef}>
                  <p className="intro-text-mp">
                    <strong>Motionpix</strong> is a creative, technology-driven studio 
                    delivering end-to-end visual and digital solutions—from 2D &amp; 3D 
                    animations, interactive e-learning, and AR/VR/XR experiences to branding, 
                    websites, digital marketing, industrial shoots, and corporate presentations, 
                    helping brands communicate with clarity and impact.
                  </p>
                </div>

                {/* Dynamic Accent Line */}
                <div className="intro-accent-line" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;