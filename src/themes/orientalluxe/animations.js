export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  glowHover: {
    whileHover: {
      scale: 1.02,
      borderColor: "rgba(181, 137, 83, 0.4)",
      boxShadow: "0 0 30px rgba(181, 137, 83, 0.15)",
    }
  }
};
