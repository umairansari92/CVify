import React from "react";

const ResumeSection = ({
  title,
  children,
  className = "",
  titleClassName = "",
}) => {
  if (!children) return null;
  // If children is an array and empty, return null
  if (Array.isArray(children) && children.length === 0) return null;

  return (
    <section className={`mb-10 ${className}`}>
      <h2
        className={`text-xs font-black text-action dark:text-accent uppercase tracking-[0.3em] flex items-center gap-4 mb-6 ${titleClassName}`}
      >
        {title}
        <span className="flex-1 h-px bg-slate-100 dark:bg-slate-800/50"></span>
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
};

export default ResumeSection;
