import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARACTERS = ['{', '}', '[', ']', '/', '<', '>', '*', '#', '%', '(', ')', '=', '+', '-', '&', '|', '!', '?'];

const FloatingDevChars = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate random floating elements
    const generateElements = () => {
      const newElements = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
        x: Math.random() * 100, // percentage
        y: Math.random() * 100, // percentage
        size: Math.random() * 1.5 + 0.5, // rem
        duration: Math.random() * 20 + 10, // seconds
        delay: Math.random() * 5, // seconds
        opacity: Math.random() * 0.15 + 0.05, // low opacity
      }));
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-[var(--primary-color)] font-mono font-bold select-none"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}rem`,
            opacity: el.opacity,
            textShadow: '0 0 10px var(--primary-color)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "linear",
            delay: el.delay,
          }}
        >
          {el.char}
        </motion.div>
      ))}
      
      {/* Background radial gradient for depth */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,255,204,0.03) 0%, rgba(8,8,8,1) 70%)'
        }}
      />
    </div>
  );
};

export default FloatingDevChars;
