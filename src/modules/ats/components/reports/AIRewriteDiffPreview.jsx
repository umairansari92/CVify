import React, { useState } from "react";
import { Zap, Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

const AIRewriteDiffPreview = ({ bulletFixes = [] }) => {
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!bulletFixes || bulletFixes.length === 0) return null;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success("Rewritten bullet copied to clipboard!");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Zap className="w-4 h-4" />
            AI BULLET REWRITE DIFF PREVIEW
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Before & After Bullet Point Transformations
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Rewritten using Google's XYZ Formula: <strong className="text-slate-200">Accomplished [X] as measured by [Y] by doing [Z]</strong>.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {bulletFixes.map((item, idx) => {
          const originalText = item.original || item.content || item.quote || "";
          const improvedText = item.improved || item.rewritten || item.revision || "";
          const critiqueText = item.critique || item.tip || item.suggestion || item.why || "Bullet lacks metric quantification or active verb initiation.";

          if (!originalText && !improvedText) return null;

          return (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-300">
                  Transformation #{idx + 1}: <span className="text-slate-400 font-normal">{critiqueText}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded border text-amber-400 bg-amber-500/10 border-amber-500/20 shrink-0">
                  Google XYZ Formula
                </span>
              </div>

              {/* Before & After Diff Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                {/* Before */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1.5">
                  <span className="text-red-400 text-[10px] font-bold uppercase font-sans tracking-wider block">
                    ✕ Original Resume Bullet
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    "{originalText}"
                  </p>
                </div>

                {/* After */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 text-[10px] font-bold uppercase font-sans tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Recommended ATS Fix
                    </span>
                    <button
                      onClick={() => handleCopy(improvedText, idx)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold font-sans flex items-center gap-1 transition-all"
                    >
                      {copiedIdx === idx ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedIdx === idx ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-emerald-200 leading-relaxed font-sans text-xs font-semibold">
                    "{improvedText}"
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(AIRewriteDiffPreview);
