import { useState, useRef } from "react";
import type { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import "./App.css";

export default function App() {
  const [open, setOpen] = useState<boolean>(false);

  // variants for staggered children <- so there is staggered animation when the cards appear
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="wrapper">
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        Toggle Cards
      </button>

      <div className="columns">
        {/* CSS SIDE */}
        <div className="panel">
          <h2>CSS</h2>
          <div className={`css-card ${open ? "show" : ""}`}>CSS Tilt Card</div>
          <div className={`css-card hover-card ${open ? "show" : ""}`}>Hover Card</div>
          <div className={`css-card normal-card ${open ? "show" : ""}`}>Normal Card</div>
        </div>

        {/* MOTION SIDE */}
        <div className="panel">
          <h2>Motion</h2>
          <AnimatePresence>
            {open && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.2 } },
                }}
              >
                <TiltCard variants={cardVariants} />
                <SpringCard variants={cardVariants} />
                <MotionNormalCard variants={cardVariants} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

//tilting hover effect
function TiltCard({ variants }: { variants: Variants }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<[number, number]>([0, 0]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = -(y - midY) / 7;
    const rotateY = (x - midX) / 7;

    setTilt([rotateX, rotateY]);
  };

  const handleMouseLeave = () => setTilt([0, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="motion-card"
      variants={variants}
      style={{ rotateX: tilt[0], rotateY: tilt[1], perspective: 600 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Tilt Card
    </motion.div>
  );
}

function SpringCard({ variants }: { variants: Variants }) {
  return (
    <motion.div
      className="motion-spring-card"
      drag
      dragConstraints={{ left: -850, right: 500, top: -500, bottom: 200 }}
      dragElastic={0.5}
      variants={variants}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 1.1,          //slight enlarge
        rotate: [0, -5, 5, 0], //rotation wobble
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 10 }}
    >
      Spring Card
    </motion.div>
  );
}

//Normal Motion card
function MotionNormalCard({ variants }: { variants: Variants }) {
  return (
    <motion.div className="motion-normal-card" variants={variants}>
      Normal Card
    </motion.div>
  );
}