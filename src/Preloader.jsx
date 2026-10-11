import { useEffect, useState } from "react";
import "./Preloader.css";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // 1.8 सेकंदानंतर बंद होईल

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        <div className="premium-spinner">
          <div className="inner-ring"></div>
          <div className="glow-core"></div>
        </div>
        <h2 className="preloader-text">
          Loading <span>Experience</span>
        </h2>
      </div>
    </div>
  );
};

export default Preloader;