import { useEffect, useRef, useState } from "react";
import "./WhoWeWorkWith.css";

/* Dummy placeholder content — swap for the real industries/copy later. */
const industries = [
  {
    title: "Manufacturing & Engineering",
    desc: "Complex machinery and production workflows explained through precise, technical visuals.",
  },
  {
    title: "Automotive & EV",
    desc: "Product walkthroughs and process animations for next-generation mobility brands.",
  },
  {
    title: "Energy & Utilities",
    desc: "Clean-energy systems and infrastructure concepts communicated with cinematic clarity.",
  },
  {
    title: "Healthcare & Pharma",
    desc: "Clinical and biomedical processes translated into clear, trustworthy visual stories.",
  },
  {
    title: "Education & Training",
    desc: "Interactive e-learning experiences that make technical training genuinely engaging.",
  },
  {
    title: "Technology & SaaS",
    desc: "Product explainers and UI walkthroughs that turn features into a story worth watching.",
  },
];

// Same bidirectional scroll-reveal pattern already used elsewhere in
// Home.jsx (News, FAQ, Testimonials): `visible` flips true/false on every
// enter/exit, so the reveal replays both scrolling down and back up.
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const WhoWeWorkWith = () => {
  const [leftRef, leftVisible] = useScrollReveal();
  const [rightRef, rightVisible] = useScrollReveal();

  return (
    <section className="who-we-work-with">
      <div className="who-work-grid">
        <div
          ref={leftRef}
          className={`who-work-intro ${leftVisible ? "reveal-active" : ""}`}
        >
          <p className="who-work-subtitle">WHO WE WORK WITH</p>
          <h2 className="who-work-title">
            Industries We <span>Bring To Life</span>
          </h2>
          <p className="who-work-desc">
            From heavy industry to fast-moving tech, we partner with teams
            who need complex ideas told clearly — and told well.
          </p>
        </div>

        <div
          ref={rightRef}
          className={`who-work-cards ${rightVisible ? "reveal-active" : ""}`}
        >
          {industries.map((industry, index) => (
            <div
              key={industry.title}
              className="who-work-card"
              style={{ transitionDelay: rightVisible ? `${index * 0.08}s` : "0s" }}
            >
              <span className="who-work-card-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="who-work-card-title">{industry.title}</h3>
              <p className="who-work-card-desc">{industry.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;