import { useLiveCount } from "./useLiveVisitor";
import "./VisitorCounter.css";

function VisitorCounter() {
  const count = useLiveCount();

  // Nothing is shown until the server confirms the live count
  if (count === null) {
    return null;
  }

  return (
    <div
      className="live-counter"
      role="status"
      aria-live="polite"
      aria-label={`${Math.max(count, 1)} visitors online now`}
    >
      <span className="live-counter__dot" aria-hidden="true" />

      <span className="live-counter__number">{Math.max(count, 1)}</span>

      <span className="live-counter__label">Live</span>
    </div>
  );
}

export default VisitorCounter;