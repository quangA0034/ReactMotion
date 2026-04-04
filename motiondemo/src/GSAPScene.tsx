import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

function GSAPScene() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        x: 360,
        rotation: 360,
        duration: 2,
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <motion.div
      className="gsap-section"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      
      <div
          ref={boxRef}
          className="gsap-ball">
          ball
      </div>  
    </motion.div>
  );
}



export { GSAPScene};