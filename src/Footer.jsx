import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useRef, useState } from "react";

import "./Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTelegram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "/Logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const footerRef = useRef(null);

  /* ============================================================
     LIVE DATE & TIME
     ============================================================ */

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  /* ============================================================
     BIDIRECTIONAL SCROLL REVEAL
     ============================================================ */

  useEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        footer.classList.toggle("footer-visible", entry.isIntersecting);
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ============================================================
     DATE FORMATTING
     ============================================================ */

  const currentYear = dateTime.getFullYear();

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) {
      return "th";
    }

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const day = dateTime.getDate();
  const daySuffix = getDaySuffix(day);

  const month = dateTime.toLocaleString("en-IN", {
    month: "long",
  });

  const year = dateTime.getFullYear();

  const formattedTime = dateTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <footer ref={footerRef} className="footer">
      {/* Top CTA */}
      <div className="footer-hero">
        <div className="footer-hero-line"></div>

        <div className="footer-hero-content">
          <span className="footer-eyebrow">
            LET&apos;S CREATE SOMETHING
          </span>

          <h2>
            Turn Ideas Into <span>Visual Experiences.</span>
          </h2>

          <p>
            From concept to execution, we create powerful digital and
            visual experiences that move people and businesses forward.
          </p>

          <NavLink to="/contact" className="footer-main-cta">
            <span className="fw-bold">Start a Project</span>

            <span className="footer-main-cta-icon">
              <i className="bi bi-arrow-up-right"></i>
            </span>
          </NavLink>
        </div>

        <div className="footer-hero-line"></div>
      </div>

      {/* Main Footer — simple, borderless columns (no card chrome) */}
      <div className="container footer-main-container">
        <div className="footer-columns">
          {/* Brand */}
          <div className="footer-col footer-reveal-left">
            <div className="footer-brand-logo">
              <img src={Logo} alt="MotionPix Logo" />
            </div>

            <h3 className="footer-col-heading">
              Visualizing
              <br />
              <span>Possibilities.</span>
            </h3>

            <p className="footer-col-text">
              Creative technology, visual storytelling, animation and
              immersive digital experiences built for modern businesses.
            </p>

            <div className="footer-status">
              <span className="footer-live-dot"></span>
              <span>AVAILABLE FOR PROJECTS</span>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col footer-reveal-up">
            <span className="footer-col-label">GET IN TOUCH</span>
            <h3 className="footer-col-heading">Let&apos;s <span className="fw-bold">Connect</span></h3>

            <div className="footer-contact-list">
              <a
                href="tel:+919822055205"
                className="footer-contact-item"
                aria-label="Call MotionPix"
              >
                <i className="bi bi-telephone-fill"></i>
                <span>
                  <small>PHONE</small>
                  +91 98220 55205
                </span>
              </a>

              <a
                href="mailto:info@motionpixindia.com"
                className="footer-contact-item"
                aria-label="Email MotionPix"
              >
                <i className="bi bi-envelope-fill"></i>
                <span>
                  <small>EMAIL</small>
                  info@motionpixindia.com
                </span>
              </a>
            </div>

            <div className="footer-social-section">
              <span className="footer-col-label">FOLLOW US</span>

              <div className="social-links-wrapper">
                <a
                  href="https://www.facebook.com/profile.php?id=61578380430447"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-tooltip"
                  data-tooltip="Facebook"
                  aria-label="Facebook"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="social-link facebook"
                  />
                </a>

                <a
                  href="https://www.instagram.com/motionpixindia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-tooltip"
                  data-tooltip="Instagram"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="social-link instagram"
                  />
                </a>

                <a
                  href="https://www.telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-tooltip"
                  data-tooltip="Telegram"
                  aria-label="Telegram"
                >
                  <FontAwesomeIcon
                    icon={faTelegram}
                    className="social-link telegram"
                  />
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-tooltip"
                  data-tooltip="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="social-link linkedin"
                  />
                </a>

                <a
                  href="https://www.youtube.com/channel/UCI0DaU_jECXW-gAsbk7_JGA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-tooltip"
                  data-tooltip="YouTube"
                  aria-label="YouTube"
                >
                  <FontAwesomeIcon
                    icon={faYoutube}
                    className="social-link youtube"
                  />
                </a>
              </div>
            </div>

            <NavLink to="/contact" className="footer-enquire-link">
              <span>Enquire Now</span>
              <i className="bi bi-arrow-up-right"></i>
            </NavLink>
          </div>

          {/* Map */}
          <div className="footer-col footer-reveal-right">
            <span className="footer-col-label">OUR LOCATION</span>
            <h3 className="footer-col-heading">Visit <span className="fw-bold">MotionPix</span></h3>

            <div className="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.52442882554354!2d73.85562401782451!3d18.4659464140141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb1046c3f119%3A0xa381cdde8e2900d7!2s54%2FB%2C%20opposite%20Modi%20Clinic%2C%20Rakshalekha%20Society%2C%20New%20Nurses%20Town%20Co%20Operative%20Society%2C%20Dhankawadi%2C%20Pune%2C%20Maharashtra%20411043!5e0!3m2!1sen!2sin!4v1767693656640!5m2!1sen!2sin"
                loading="lazy"
                allowFullScreen
                title="MotionPix Location Map"
                className="map"
              />
            </div>

            <div className="footer-map-address">
              <span className="footer-live-dot"></span>
              <p>
                54/A, Rakshalekha Society,
                <br />
                Dhankawadi, Pune – 411043
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-main">
            <div className="footer-bottom-brand">
              <img src={Logo} alt="MotionPix Logo" />

              <span>
                Motion<span>Pix</span> India
              </span>
            </div>

            <div className="footer-bottom-center">
              <p>
                © {currentYear} MotionPix Cinematix India Pvt Ltd.
              </p>

              <p className="footer-credit">
                Designed &amp; Developed with{" "}
                <span className="heart-beat">❤</span> by{" "}
                <a
                  href="https://www.linkedin.com/in/vishal-jadhav-43390b260/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-link"
                >
                  Our Web Team
                </a>
              </p>
            </div>

            <div className="footer-bottom-meta">
              <span className="footer-datetime">
                {day}
                <sup>{daySuffix}</sup> {month} {year}
              </span>

              <span className="footer-time">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
