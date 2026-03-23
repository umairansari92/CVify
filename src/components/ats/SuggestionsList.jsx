import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const SuggestionsList = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
      <h3 className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-xs">
        <FaInfoCircle /> Strategic Advice
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {suggestions.map((s, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0 shadow-glow" />
            <p className="text-xs font-bold text-text-secondary leading-relaxed">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsList;
