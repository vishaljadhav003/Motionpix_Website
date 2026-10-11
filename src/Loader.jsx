import { useEffect, useRef, useState } from "react";
import "./Loader.css";

const LOGO_SRC = "/Logo.png";

// "Motion" is white, "Pix" is the red accent
const BRAND_LETTERS = "MotionPix".split("");
const ACCENT_FROM_INDEX = 6;

// Phase start times:
// logo -> text -> text exit -> logo flight + curtain reveal -> finish
const TIMELINE = {
  text: 1100,
  exit: 3600,
  fly: 4200,
  done: 5600, // curtain animation ends at fly + 1300ms
};

const REDUCED_TIMELINE = {
  text: 0,
  exit: 0,
  fly: 200,
  done: 500,
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Position of an element ignoring CSS transforms
const getLayoutRect = (element) => {
  let left = 0;
  let top = 0;
  let node = element;

  while (node) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent;
  }

  return {
    left: left - window.scrollX,
    top: top - window.scrollY,
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
};

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function Loader({ onDone }) {
  const [phase, setPhase] = useState("idle");
  const [target, setTarget] = useState("hero");
  const [isLogoReady, setIsLogoReady] = useState(false);

  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const onDoneRef = useRef(onDone);

  // Keep callback reference updated without restarting timeline
  onDoneRef.current = onDone;

  // Start loader when logo is ready
  useEffect(() => {
    if (logoRef.current && logoRef.current.complete) {
      setIsLogoReady(true);
    }

    const fallbackTimer = window.setTimeout(() => {
      setIsLogoReady(true);
    }, 1500);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  // Main timeline
  useEffect(() => {
    if (!isLogoReady) {
      return undefined;
    }

    const timers = [];

    const at = (delay, callback) => {
      timers.push(window.setTimeout(callback, delay));
    };

    const times = prefersReducedMotion() ? REDUCED_TIMELINE : TIMELINE;

    // Logo flies to the actual home-page logo
    const startFlight = () => {
      const root = rootRef.current;
      const logo = logoRef.current;
      const heroLogo = document.querySelector(".hero-logo");

      let hasTarget = false;

      if (root && logo && heroLogo) {
        const from = logo.getBoundingClientRect();
        const to = getLayoutRect(heroLogo);

        if (from.width > 0 && to.width > 0) {
          root.style.setProperty(
            "--fly-x",
            `${to.left + to.width / 2 - (from.left + from.width / 2)}px`
          );

          root.style.setProperty(
            "--fly-y",
            `${to.top + to.height / 2 - (from.top + from.height / 2)}px`
          );

          root.style.setProperty(
            "--fly-scale",
            String(to.width / from.width)
          );

          hasTarget = true;
        }
      }

      setTarget(hasTarget ? "hero" : "none");
      setPhase("fly");

      // Tell Home.jsx to start its hero reveal
      window.dispatchEvent(new Event("motionpix:intro-handoff"));
    };

    const finish = () => {
      // Unlock complete website scrolling
      document.documentElement.classList.remove("is-loading");

      if (onDoneRef.current) {
        onDoneRef.current();
      }
    };

    setPhase("logo");

    at(times.text, () => setPhase("text"));
    at(times.exit, () => setPhase("exit"));
    at(times.fly, startFlight);
    at(times.done, finish);

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, [isLogoReady]);

  // Progress counter + bar (updates DOM directly, no re-renders)
  useEffect(() => {
    if (!isLogoReady) {
      return undefined;
    }

    const total = (prefersReducedMotion() ? REDUCED_TIMELINE : TIMELINE).fly;
    const startTime = performance.now();
    let frame = 0;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / Math.max(total, 1), 1);
      const eased = easeInOutCubic(progress);

      if (counterRef.current) {
        counterRef.current.textContent = String(Math.round(eased * 100));
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${eased})`;
      }

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isLogoReady]);

  // Pointer / touch parallax (logo tilt + glow)
  useEffect(() => {
    const root = rootRef.current;

    if (!root || prefersReducedMotion()) {
      return undefined;
    }

    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      root.style.setProperty("--mx", x.toFixed(3));
      root.style.setProperty("--my", y.toFixed(3));
    };

    const handleMove = (event) => {
      x = (event.clientX / window.innerWidth) * 2 - 1;
      y = (event.clientY / window.innerHeight) * 2 - 1;

      if (!frame) {
        frame = window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  // Never leave the page locked if loader is removed early
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="mp-loader"
      data-phase={phase}
      data-target={target}
      role="status"
      aria-live="polite"
      aria-label="Loading MotionPix"
    >
      <div className="mp-loader__backdrop" aria-hidden="true">
        <span className="mp-loader__curtain" />

        <div className="mp-loader__parallax">
          <span className="mp-loader__glow" />
        </div>
      </div>

      <div className="mp-loader__stage">
        <div className="mp-loader__logo-wrap">
          {/* <span className="mp-loader__ring" aria-hidden="true" /> */}

          <img
            ref={logoRef}
            src={LOGO_SRC}
            alt=""
            className="mp-loader__logo"
            draggable="false"
            onLoad={() => setIsLogoReady(true)}
            onError={() => setIsLogoReady(true)}
          />
        </div>

        <p className="mp-loader__brand" aria-hidden="true">
          {BRAND_LETTERS.map((letter, index) => (
            <span
              key={index}
              className={`mp-loader__letter ${
                index >= ACCENT_FROM_INDEX
                  ? "mp-loader__letter--accent"
                  : ""
              }`}
              style={{ "--i": index }}
            >
              {letter}
            </span>
          ))}
        </p>
      </div>

      <div className="mp-loader__progress" aria-hidden="true">
        <span className="mp-loader__count">
          <span ref={counterRef}>0</span>
          <span className="mp-loader__percent">%</span>
        </span>

        <span className="mp-loader__bar">
          <span ref={barRef} className="mp-loader__bar-fill" />
        </span>
      </div>
    </div>
  );
}

export default Loader;