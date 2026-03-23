import React from 'react';
import { FaLightbulb, FaArrowRight } from 'react-icons/fa';

const BulletImprovements = ({ bullets }) => {
  if (!bullets || bullets.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-3 text-amber-500 font-black uppercase tracking-[0.2em] text-xs ml-4">
        <FaLightbulb /> AI Bullet Optimization
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {bullets.map((b, i) => (
          <div key={i} className="glass rounded-[2rem] border border-white/5 overflow-hidden group">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-rose-400/60">Original</span>
                <p className="text-xs font-medium text-text-muted italic leading-relaxed">"{b.original || b.text}"</p>
              </div>
              <div className="flex justify-center opacity-20">
                <FaArrowRight className="transform rotate-90 md:rotate-0" />
              </div>
              <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 group-hover:border-emerald-500/20 transition-all">
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">AI Improved</span>
                <p className="text-sm font-bold text-emerald-50/90 leading-relaxed mt-2">
                  {b.improved || b.suggestion}
                </p>
                {b.reason && (
                    <p className="text-[10px] text-text-muted mt-3 pt-3 border-t border-emerald-500/10 italic">
                        REASON: {b.reason}
                    </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulletImprovements;
