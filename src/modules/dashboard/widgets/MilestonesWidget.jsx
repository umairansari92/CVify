import React, { useState } from "react";
import QuestWidget from "../../../components/dashboard/QuestWidget";
import { FiChevronDown, FiChevronUp, FiAward } from "react-icons/fi";

export const MilestonesWidget = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border-subtle bg-midground/60 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <FiAward className="text-yellow-400" size={16} />
          <span className="text-xs font-bold text-text-primary">Executive Milestones & Achievements (5)</span>
        </div>
        {isOpen ? <FiChevronUp size={16} className="text-text-muted" /> : <FiChevronDown size={16} className="text-text-muted" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-border-subtle">
          <QuestWidget quests={data?.quests} />
        </div>
      )}
    </div>
  );
};
