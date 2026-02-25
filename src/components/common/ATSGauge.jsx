import React from "react";

const ATSGauge = ({ score }) => {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 80) return "#22c55e"; // Success
    if (s >= 50) return "#eab308"; // Warning
    return "#ef4444"; // Danger
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#e2e8f0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="dark:stroke-slate-800"
        />
        <circle
          stroke={getColor(score)}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <span
          className="text-3xl font-black block tracking-tighter"
          style={{ color: getColor(score) }}
        >
          {score}%
        </span>
        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
          ATS Score
        </span>
      </div>
    </div>
  );
};

export default ATSGauge;
