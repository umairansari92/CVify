import React from 'react';
import { FaTag } from 'react-icons/fa';

const KeywordsList = ({ keywords }) => {
  if (!keywords || keywords.length === 0) return null;

  return (
    <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
      <h3 className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-[0.2em] text-xs">
        <FaTag className="animate-pulse" /> Missing Keywords (Target these)
      </h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((k, i) => (
          <span 
            key={i} 
            className="py-2.5 px-5 rounded-2xl bg-rose-500/5 text-rose-400 text-[10px] font-black border border-rose-500/10 hover:border-rose-500/30 transition-all cursor-default"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordsList;
