import React from "react";
import "./Showreel.css";

const Showreel = () => {
  return (
    <section className="showreel-section">
      <div className="container">
        <div className="text-center showreel-header">
          <h2 className="fw-bold display-6 showreel-title">
            Our <span>Showreel</span>
          </h2>

          <p className="showreel-subtitle">
            A glimpse of our creative work, technical expertise, and visual
            storytelling.
          </p>
        </div>

        <div className="showreel-video-wrapper">
          <video
            className="showreel-video"
            controls
            playsInline
            preload="metadata"
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default Showreel;