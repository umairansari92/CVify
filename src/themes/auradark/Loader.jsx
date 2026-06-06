import React from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";

const Loader = ({ onComplete, userName }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let val = 0;
    const duration = 1400;
    const step = 16;
    const increment = 100 / (duration / step);
    const timer = setInterval(() => {
      val += increment;
      if (val >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(onComplete, 300);
      } else {
        setCount(Math.floor(val));
      }
    }, step);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: tokens.colors.background }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="flex flex-col items-center gap-6 w-[340px]">
        {/* Giant counter */}
        <div className="flex items-baseline gap-1">
          <span
            className="font-black leading-none tabular-nums"
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: "clamp(5rem, 15vw, 9rem)",
              color: tokens.colors.foreground,
            }}
          >
            {count}
          </span>
          <span className="text-4xl font-light" style={{ color: tokens.colors.primary }}>
            %
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-px relative overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ backgroundColor: tokens.colors.primary, width: `${count}%` }}
          />
        </div>

        <p
          className="text-[10px] tracking-[0.3em] uppercase text-center"
          style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.textDim }}
        >
          Engineering Digital Experiences
        </p>
        {userName && (
          <p
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{ fontFamily: tokens.fonts.mono, color: tokens.colors.primary }}
          >
            {userName} © {new Date().getFullYear()}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Loader;
