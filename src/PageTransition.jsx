import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PageSkeleton from "./PageSkeleton";

// How long the skeleton shows before the real page blur-reveals in.
// Routes here aren't lazy-loaded, so this is a fixed, deliberate
// delay purely for a smoother perceived transition.
const SKELETON_MS = 450;

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    timerRef.current = setTimeout(() => setIsLoading(false), SKELETON_MS);

    return () => clearTimeout(timerRef.current);
  }, [location.pathname]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
};

export default PageTransition;