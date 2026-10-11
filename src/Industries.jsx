import React, { useEffect, useRef, useState } from "react";
import "./Industries.css";

const industries = [
  {
    title: "Manufacturing",
    desc: "Explaining complex industrial processes with precision visuals.",
    media:
      "https://img.freepik.com/premium-photo/blur-background-smart-machine-arm-working-by-using-technology-spate_31965-486652.jpg",
    stats: ["500+ Videos", "15+ Years", "Global Plants"],
  },
  {
    title: "Automotive",
    desc: "Visualizing performance, assembly, and innovation.",
    media:
      "https://www.shutterstock.com/image-photo/blurry-car-repair-shop-being-600nw-2627870465.jpg",
    stats: ["EV | ICE", "3D Assembly", "Training Films"],
  },
  {
    title: "Oil & Gas",
    desc: "High-risk systems explained safely through animation.",
    media:
      "https://img.freepik.com/free-vector/oil-pumps-derricks-sunset-background_1182-1649.jpg?semt=ais_hybrid&w=740&q=80",
    stats: ["Safety SOPs", "Process Flow", "3D Cutaways"],
  },
  {
    title: "Power & Energy",
    desc: "From generation to distribution—made clear.",
    media:
      "https://rominavaz.wordpress.com/wp-content/uploads/2017/12/ejemplos-de-energc3ada-mecc3a1nica.jpg?w=640",
    stats: ["Thermal | Solar", "Grid Visuals", "Explainers"],
  },
  {
    title: "Infrastructure",
    desc: "Large-scale projects communicated with clarity.",
    media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThVQ1To1DGXOu1ZvfRlAhTTSPksdyBuVlorw&s",
    stats: ["Mega Projects", "Phasing", "Execution"],
  },
  {
    title: "Medical & Pharma",
    desc: "Simplifying science through clean 3D storytelling.",
    media:
      "https://www.shutterstock.com/image-photo/surgical-lamp-hangs-foreground-sharply-600nw-2672585757.jpg",
    stats: ["MOA Videos", "3D Anatomy", "Training"],
  },
  {
    title: "Retail",
    desc: "Product stories that influence buying decisions.",
    media:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhMWFhUXFRUVFxcXFxcWFRYXFRUWFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGysmICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0rLS0tLS0tLS0vLSstLS0tLS0rLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAgMBA=========",
    stats: ["Product Films", "In-store Visuals", "Brand Stories"],
  },
  {
    title: "Real Estate",
    desc: "Visualizing spaces before they are built.",
    media:
      "https://img.freepik.com/premium-photo/blur-background-residential-house-construction-urban-city-spate_31965-448458.jpg?semt=ais_hybrid&w=740&q=80",
    stats: ["3D Walkthroughs", "Aerial Views", "Virtual Tours"],
  },
  {
    title: "Education",
    desc: "Interactive learning designed for better retention.",
    media:
      "https://www.shutterstock.com/image-photo/beautiful-blurred-background-bright-classroom-600nw-2475753339.jpg",
    stats: ["E-learning", "Interactive Modules", "Explainers"],
  },
  {
    title: "Trade Shows & Events",
    desc: "High-impact visuals for live brand experiences.",
    media:
      "https://www.shutterstock.com/image-photo/defocused-background-networking-event-attendees-600nw-2615336723.jpg",
    stats: ["Event Films", "LED Content", "Launch Videos"],
  },
  {
    title: "Steel",
    desc: "Heavy processes explained with technical clarity.",
    media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcY45CiK23h8g6YgMii2weAC2dNm5HRxdTGQ&s",
    stats: ["Process Flow", "Plant Animation", "Training"],
  },
  {
    title: "Plastic & Chemicals",
    desc: "Complex material flows made visually simple.",
    media:
      "https://www.ecowatch.com/wp-content/uploads/2024/05/dasani-bottles.jpg",
    stats: ["Material Flow", "Safety Visuals", "Explainers"],
  },
  {
    title: "Consumer Products",
    desc: "Turning everyday products into visual stories.",
    media:
      "https://prolificstudio.co/wp-content/uploads/2024/09/The-Power-of-3D-Product-Visualization-for-Marketing-Campaigns.jpg",
    stats: ["Product Demos", "Marketing Films", "3D Visuals"],
  },
];

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const IndustryCard = ({ item, isFlipped, onFlip, onMove }) => {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`industry-card flip-card reveal ${
        visible ? "reveal-active" : ""
      } ${isFlipped ? "is-flipped" : ""}`}
      onMouseMove={onMove}
      onClick={onFlip}
    >
      <div className="flip-inner">
        <div className="flip-front">
          <img src={item.media} alt={item.title} loading="lazy" />

          <div className="edge-title">
            <span>{item.title}</span>
          </div>
        </div>

        <div className="flip-back">
          <div className="industry-overlay">
            <h4>{item.title}</h4>

            <p>{item.desc}</p>

            <div className="industry-stats">
              {item.stats.map((stat, statIndex) => (
                <span key={statIndex}>{stat}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Industries = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleIndustryMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  };

  return (
    <section className="industries-stats-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold industries-title">
            Industries We <span>Empower</span>
          </h2>

          <p className="industries-subtitle mt-2">
            Visual storytelling backed by experience, scale, and results.
          </p>
        </div>

        <div className="industries-grid">
          {industries.map((item, indexValue) => (
            <IndustryCard
              key={item.title}
              item={item}
              isFlipped={flippedIndex === indexValue}
              onFlip={() =>
                setFlippedIndex(
                  flippedIndex === indexValue ? null : indexValue
                )
              }
              onMove={handleIndustryMove}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;