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
          yoyo + rotation
      </div>  
    </motion.div>
  );
}

function GSAPScene2() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        x: 360,
        duration: 3,
        opacity: 0,
        repeat: -1,
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
          className="gsap-box">
          opacity
      </div>  
    </motion.div>
  );
}

function GSAPScene3() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {

        duration: 3,
        scale: 2,
        repeat: -1,
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
          className="gsap-box2">
          scale
      </div>  
    </motion.div>
  );
}

export { GSAPScene, GSAPScene2, GSAPScene3 };