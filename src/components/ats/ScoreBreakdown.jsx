import React from 'react';

const ScoreBreakdown = ({ scores, justifications = {} }) => {
  const keyMap = {
    formatting: "formatting",
    keywords: "keywordMatch",
    quantification: "quantification",
    impact: "impact",
  };

  const items = [
    { label: "Formatting", key: "formatting", val: scores.formatting, color: "bg-blue-500" },
    { label: "Keywords", key: "keywords", val: scores.keywords, color: "bg-purple-500" },
    { label: "Quantification", key: "quantification", val: scores.quantification, color: "bg-amber-500" },
    { label: "Impact", key: "impact", val: scores.impact, color: "bg-emerald-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, i) => {
        const justification = justifications[keyMap[item.key]] || "";
        return (
          <div key={i} className="glass p-6 rounded-3xl border border-white/5 space-y-3 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-text-primary transition-colors">
                {item.label}
              </span>
              <span className="text-lg font-black text-text-primary">{item.val}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color} transition-all duration-1000 ease-out shadow-glow`}
                style={{ width: `${item.val}%` }}
              />
            </div>
            {justification && (
              <p className="text-[10px] font-medium text-text-muted leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {justification}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScoreBreakdown;
