import React from "react";

export const DashboardGrid = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 items-stretch ${className}`}>
      {children}
    </div>
  );
};
