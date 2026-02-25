import React from "react";

const ResumeSection = ({
  title,
  children,
  className = "",
  titleClassName = "",
  titleStyle = {},
}) => {
  if (!children) return null;
  // If children is an array and empty, return null
  if (Array.isArray(children) && children.length === 0) return null;

  // convert incoming title to Title Case (each word capitalized) so we don't rely on CSS uppercase
  const formatTitle = (str) =>
    str
      ? str
          .toLowerCase()
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "";

  return (
    <section
      className={`mb-10 ${className}`}
      style={{ pageBreakInside: "avoid" }}
    >
      <h2
        className={`text-xs font-black text-action dark:text-accent tracking-[0.3em] flex items-center mb-6 ${titleClassName}`}
        style={titleStyle}
      >
        <span className="mr-4">{formatTitle(title)}</span>
        <span className="flex-1 h-px bg-slate-100 dark:bg-slate-800/50"></span>
      </h2>
      <div className="">{children}</div>
    </section>
  );
};

export default ResumeSection;
