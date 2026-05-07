import React from "react";
import { m } from "framer-motion";

const SectionHeader = ({ title, subtitle, icon: Icon, badge, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-bold text-text-main flex items-center gap-3">
          {Icon && (
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <Icon size={18} />
            </div>
          )}
          {title}
          {badge && (
            <span className="text-[10px] bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10 uppercase tracking-[0.1em] font-bold">
              {badge}
            </span>
          )}
        </h2>
      </div>
      {subtitle && (
        <p className="text-text-muted font-medium text-[14px] tracking-tight opacity-80 ml-0.5 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
