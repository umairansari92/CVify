import React from "react";
import { m } from "framer-motion";

const SkeletonLoader = ({ className = "", count = 1 }) => {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`relative overflow-hidden bg-white/[0.03] border border-white/5 rounded-3xl ${className}`}
        >
          <m.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
