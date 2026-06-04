import React from "react";
import { tokens } from "./tokens";

const BackgroundFX = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Background */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: tokens.colors.background }} 
      />

      {/* Subtle Radial Glow in top left */}
      <div 
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-[0.03] blur-[120px]"
        style={{ backgroundColor: tokens.colors.primary }}
      />
      
      {/* Subtle Radial Glow in bottom right */}
      <div 
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-[0.03] blur-[120px]"
        style={{ backgroundColor: tokens.colors.primary }}
      />

      {/* Very faint grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(${tokens.colors.foreground} 1px, transparent 1px), linear-gradient(90deg, ${tokens.colors.foreground} 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }}
      />
    </div>
  );
};

export default BackgroundFX;
