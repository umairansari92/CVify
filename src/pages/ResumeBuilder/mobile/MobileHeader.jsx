import React, { useState } from "react";
import { FaGem, FaChevronRight } from "react-icons/fa";
import { Sparkles, Edit2, Download } from "lucide-react";
import { setResumeField } from "../../../features/resume/resumeSlice";

const MobileHeader = ({
  currentResume,
  user,
  activeTab,
  setActiveTab,
  setIsImportModalOpen,
  handleExport,
  dispatch,
}) => {
  const [showDiamondBadge, setShowDiamondBadge] = useState(false);

  return (
    <header className="bg-bg-secondary border-b border-white/5 flex flex-col shrink-0 z-30">
      {/* Top Bar: Brand, Title, Badges */}
      <div className="flex items-center justify-between px-3 py-2 gap-2">
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 font-black text-xs">
            CV
          </div>
          <div className="group relative flex items-center flex-1 min-w-0">
            <input
              type="text"
              value={currentResume?.title || ""}
              onChange={(e) => dispatch(setResumeField({ field: "title", value: e.target.value }))}
              placeholder="Untitled Resume"
              className="font-black text-xs text-white bg-slate-900/40 border border-white/10 focus:border-primary rounded-md px-2 py-1 outline-none w-full truncate"
            />
            <Edit2 size={10} className="absolute right-2 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Collapsed Diamond Indicator & Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setShowDiamondBadge(!showDiamondBadge)}
            className="flex items-center gap-1 px-2 py-1 bg-slate-900 border border-primary/20 rounded-lg text-[9px] font-black text-primary"
          >
            <FaGem size={10} className="animate-pulse" />
            <span>{user?.diamonds || 0}</span>
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="p-1.5 bg-slate-900 border border-white/10 text-primary rounded-lg hover:bg-slate-800"
            title="Magic Import"
          >
            <Sparkles size={13} />
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-2.5 py-1 bg-primary text-white rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm"
          >
            <Download size={11} /> PDF
          </button>
        </div>
      </div>

      {/* Mode Segmented Control Bar */}
      <div className="px-3 pb-2">
        <div className="grid grid-cols-4 gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/5">
          {["Content", "Designer", "Analyzer", "Matcher"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all text-center truncate ${
                tab === activeTab
                  ? "bg-slate-800 text-primary shadow-sm ring-1 ring-primary/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
