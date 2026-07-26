import React from "react";

export const DashboardGrid = ({ children, className = "" }) => {
  return (
    <div className={`dashboard-grid ${className}`}>
      {children}
    </div>
  );
};
