import React from 'react';

const ScoreCard = ({ score }) => {
  const getColor = (s) => {
    if (s >= 80) return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
    if (s >= 50) return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
    return 'text-rose-500 border-rose-500/20 bg-rose-500/5';
  };

  const getStrokeColor = (s) => {
    if (s >= 80) return '#10b981';
    if (s >= 50) return '#f59e0b';
    return '#f43f5e';
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`p-10 rounded-[2.5rem] border flex flex-col items-center justify-center text-center transition-all ${getColor(score)} shadow-2xl`}>
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="opacity-10"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={getStrokeColor(score)}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset }}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black tracking-tighter">{score}%</span>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Match</span>
        </div>
      </div>
      <h3 className="mt-6 text-xl font-black uppercase tracking-widest opacity-90">ATS Match Score</h3>
    </div>
  );
};

export default ScoreCard;
