import { useState, useRef } from "react";
import type { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import Spline from "@splinetool/react-spline";
import "./App.css";
import { GSAPScene, GSAPScene2, GSAPScene3}  from "./GSAPScene";


export default function App() {
  const [view, setView] = useState<"cards" | "spline" | "gsap" | null>(null);

  // variants for staggered children <- so there is staggered animation when the cards appear
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="wrapper">

      {/* Separate container for buttons */}
      <div className="buttons">
        <button className="toggle-btn" onClick={() => setView(view === "cards" ? null : "cards")}>
          Toggle Cards
        </button>

        <button className="toggle-btn" onClick={() => setView(view === "spline" ? null : "spline")}>
          Toggle Spline
        </button>   

        <button className="toggle-btn" onClick={() => setView(view === "gsap" ? null : "gsap")}>
          Toggle GSAP
        </button>
      </div>

      {/* Content container */}
      <AnimatePresence mode="wait">
        {view === "cards" && (
          <motion.div
            key="cards"
            className="columns"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CSS SIDE */}
            <div className="panel">
              <h2>CSS</h2>
              <div className="css-card show">CSS Tilt Card</div>
              <div className="css-card hover-card show">Hover Card</div>
              <div className="css-card normal-card show">Normal Card</div>
            </div>

            {/* MOTION SIDE */}
            <div className="panel">
              <h2>Motion</h2>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.2 } },
                }}
              >
                <TiltCard variants={cardVariants} />
                <SpringCard variants={cardVariants} />
                <MotionNormalCard variants={cardVariants} />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Spline 3D model */}
        {view === "spline" && (
          <motion.div
            key="spline"
            className="spline-section"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <SplineScene url="https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode" />

            {/* Ice creams: https://prod.spline.design/UWoeqiir20o49Dah/scene.splinecode */}
            {/* Follow the cursor: https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode   */}
            {/* Derp follows: https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode  */}
            {/* Simple keyboard: https://prod.spline.design/AO9AmfSedxarJXg3/scene.splinecode   */}
          </motion.div>
        )}

        {/* GSAP  */}
          {view === "gsap" && (
            <motion.div
              key="gsap"
              className="gsap-section"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
            >
              <GSAPScene />
              <GSAPScene2 />
              <GSAPScene3 />
            </motion.div>
          )}

        </AnimatePresence>

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

function SplineScene({ url }: { url: string }) {
  return (
    <motion.div
      className="spline-block"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.5}}
    >  
      <Spline scene={url}/>
    </motion.div>
  );
}

