import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TeamCard from "./TeamCard";
import "./TeamSection.css";
import { createPortal } from "react-dom";
import {
  teamMembersSeed,
  teamSlug,
  PLACEHOLDER_IMAGE,
  getDisplayName,
  getImageAlt,
} from "./Teamdata";

const API_BASE_URL = "http://localhost:5000/api";

// The navbar is fixed, so anchors stop a little below the top of the screen
const ANCHOR_OFFSET = { scrollMarginTop: "110px" };

function useTypewriter(text, speed = 14) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let i = 0;

    setOut("");

    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));

      if (i >= text.length) {
        window.clearInterval(id);
      }
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return out;
}

export default function TeamSection() {
  const [members, setMembers] = useState(teamMembersSeed);
  const { hash } = useLocation();

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/team`)
      .then((res) => res.json())
      .then((rows) => {
        if (!isMounted || !Array.isArray(rows) || rows.length === 0) {
          return;
        }

        const mapped = rows.map((row) => ({
          name: row.name,
          role: row.role,
          location: row.location,
          about: row.about,
          image: row.photo
            ? `${API_BASE_URL.replace("/api", "")}/uploads/${row.photo}`
            : PLACEHOLDER_IMAGE,
        }));

        setMembers(mapped);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  /* Bidirectional Scroll Reveal Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          } else {
            entry.target.classList.remove("reveal-active");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(
      ".team-section .reveal"
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [members]);

  /* Deep links from Google / shared links: /about#team or /about#team-pravin.
     Waits for the intro loader and the page transition, then scrolls to the target. */
  useEffect(() => {
    if (!hash.startsWith("#team")) {
      return undefined;
    }

    const targetId = hash.slice(1);
    let attempts = 0;

    const timer = window.setInterval(() => {
      attempts += 1;

      const target = document.getElementById(targetId);
      const isLoading = document.documentElement.classList.contains("is-loading");

      if (target && (!isLoading || attempts >= 40)) {
        target.scrollIntoView({
          behavior: "smooth",
          block: targetId === "team" ? "start" : "center",
        });

        window.clearInterval(timer);
      } else if (attempts >= 60) {
        window.clearInterval(timer);
      }
    }, 150);

    return () => window.clearInterval(timer);
  }, [hash, members]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const sectionRef = useRef(null);
  const openerScrollYRef = useRef(0);

  const selectedMember =
    selectedIndex !== null ? members[selectedIndex] : null;

  const detailsText = useMemo(() => {
    if (!selectedMember) {
      return "";
    }

    return [
      `Role: ${selectedMember.role}`,
      `Location: ${selectedMember.location}`,
      `About: ${selectedMember.about || ""}`,
    ].join("\n");
  }, [selectedMember]);

  const typed = useTypewriter(detailsText, 14);

  const openMember = (index) => {
    openerScrollYRef.current = window.scrollY;

    if (sectionRef.current) {
      window.scrollTo({
        top: openerScrollYRef.current,
        behavior: "smooth",
      });
    }

    setSelectedIndex(index);

    document.documentElement.classList.add("team-lock-scroll");
    document.body.classList.add("team-lock-scroll");
  };

  const closeMember = () => {
    setSelectedIndex(null);

    document.documentElement.classList.remove("team-lock-scroll");
    document.body.classList.remove("team-lock-scroll");

    window.scrollTo({
      top: openerScrollYRef.current,
      behavior: "instant",
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && selectedMember) {
        closeMember();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedMember]);

  return (
    <section
      id="team"
      className="team-section"
      ref={sectionRef}
      style={ANCHOR_OFFSET}
    >
      <div className="container">
        <h2 className="team-title reveal">
          Meet Our <span>Team</span>
        </h2>

        <p className="team-subtitle reveal">
          Passionate minds crafting powerful digital experiences
        </p>

        <div className="team-grid">
          {members.map((member, index) => (
            <div
              key={index}
              id={`team-${teamSlug(member.name)}`}
              className="team-card-clickwrap reveal"
              style={{
                ...ANCHOR_OFFSET,
                transitionDelay: `${(index % 4) * 0.1}s`,
              }}
              onClick={() => openMember(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openMember(index);
                }
              }}
            >
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>

      {selectedMember && createPortal(
        <div
          className="team-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Team member details"
        >
          <div
            className="team-overlay-backdrop"
            onClick={closeMember}
          />

          <div className="team-overlay-panel">
            <div className="team-overlay-split">
              <div className="team-overlay-left">
                <div className="team-selected-card">
                  <TeamCard member={selectedMember} />
                </div>
              </div>

              <aside
                className="team-details-premium"
                aria-live="polite"
              >
                <div className="team-details-header">
                  <div className="team-details-avatar">
                    <img
                      src={selectedMember.image}
                      alt={getImageAlt(selectedMember)}
                    />
                  </div>

                  <div className="team-details-title">
                    <h3>{getDisplayName(selectedMember)}</h3>

                    <span className="team-chip">
                      {selectedMember.role}
                    </span>
                  </div>

                  <button
                    className="team-close-x"
                    type="button"
                    onClick={closeMember}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="team-details-body">
                  <pre className="team-typewriter">
                    {typed}
                    <span
                      className="team-caret"
                      aria-hidden="true"
                    />
                  </pre>

                  <button
                    className="team-back-btn"
                    type="button"
                    onClick={closeMember}
                  >
                    ← Back to Team
                  </button>
                </div>
              </aside>
            </div>

            <div className="team-sheet">
              <div className="team-sheet-handle" />

              <div className="team-sheet-top">
                <div className="team-sheet-mini">
                  <div className="team-details-avatar">
                    <img
                      src={selectedMember.image}
                      alt={getImageAlt(selectedMember)}
                    />
                  </div>

                  <div className="team-details-title">
                    <h3>{getDisplayName(selectedMember)}</h3>

                    <span className="team-chip">
                      {selectedMember.role}
                    </span>
                  </div>
                </div>

                <button
                  className="team-close-x"
                  type="button"
                  onClick={closeMember}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="team-sheet-content">
                <div className="team-sheet-card">
                  <TeamCard member={selectedMember} />
                </div>

                <div className="team-sheet-details">
                  <pre className="team-typewriter">
                    {typed}
                    <span
                      className="team-caret"
                      aria-hidden="true"
                    />
                  </pre>

                  <button
                    className="team-back-btn"
                    type="button"
                    onClick={closeMember}
                  >
                    ← Back to Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}