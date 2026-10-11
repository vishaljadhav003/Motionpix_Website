import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 25,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1], // Custom Smooth Cubic-Bezier Curve
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const PageReveal = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%", minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );
};

export default PageReveal;