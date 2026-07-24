import React from "react";
import { Eye, Sparkles, Save } from "lucide-react";

const MobileActionDock = ({ onOpenPreview, onOpenAI, onSave }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-secondary/95 backdrop-blur-xl border-t border-white/10 p-2.5 px-4 flex items-center justify-between gap-2 shadow-2xl">
      {/* Target 1: Live Preview Drawer */}
      <button
        onClick={onOpenPreview}
        className="flex-1 py-2.5 bg-slate-900 border border-white/10 hover:border-primary/40 text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
      >
        <Eye size={14} className="text-primary" />
        <span>Preview</span>
      </button>

      {/* Target 2: AI Co-Pilot Drawer */}
      <button
        onClick={onOpenAI}
        className="flex-1 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg shadow-primary/20 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 transition-all"
      >
        <Sparkles size={14} />
        <span>AI Co-Pilot</span>
      </button>

      {/* Target 3: Explicit Save Action */}
      <button
        onClick={onSave}
        className="flex-1 py-2.5 bg-slate-900 border border-white/10 text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 hover:text-white transition-all"
      >
        <Save size={14} className="text-emerald-400" />
        <span>Save</span>
      </button>
    </div>
  );
};

export default MobileActionDock;
