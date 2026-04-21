import React from "react";
import { m } from "framer-motion";

const SectionHeader = ({ title, subtitle, icon: Icon, badge, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl lg:text-3xl font-black text-text-main flex items-center gap-4">
          {Icon && (
            <div className="p-3 bg-primary/10 rounded-2xl text-primary glow-primary">
              <Icon size={20} />
            </div>
          )}
          {title}
          {badge && (
            <span className="text-[10px] bg-primary/5 text-primary px-4 py-1.5 rounded-full border border-primary/10 uppercase tracking-[0.2em] font-black">
              {badge}
            </span>
          )}
        </h2>
      </div>
      {subtitle && (
        <p className="text-text-muted font-bold text-sm tracking-tight opacity-60 ml-1 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
