import React from "react";

const BackgroundFX = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Radial Glow Circles matching premium dark aesthetic */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(181, 137, 83, 0.2) 0%, transparent 70%)"
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(181, 137, 83, 0.15) 0%, transparent 70%)"
        }}
      />

      {/* Islamic Khatim Motifs Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 110 110'%3E%3Cpolygon points='55.00,17.00 60.93,40.68 81.87,28.13 69.32,49.07 93.00,55.00 69.32,60.93 81.87,81.87 60.93,69.32 55.00,93.00 49.07,69.32 28.13,81.87 40.68,60.93 17.00,55.00 40.68,49.07 28.13,28.13 49.07,40.68' fill='none' stroke='%23b58953' stroke-width='0.8'%3E%3C/polygon%3E%3Ccircle cx='55' cy='55' r='5' fill='none' stroke='%23b58953' stroke-width='0.6'%3E%3C/circle%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
};

export default BackgroundFX;
