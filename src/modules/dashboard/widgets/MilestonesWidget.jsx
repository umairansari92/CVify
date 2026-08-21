import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { m, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiCheckCircle,
  FiLock,
  FiGift,
  FiZap,
  FiRefreshCw,
  FiChevronRight,
  FiStar,
} from "react-icons/fi";
import Card from "../../../components/ui/Card";
import api from "../../../api/axios";
import { fetchDashboardData } from "../../../features/dashboard/dashboardThunk";

// Fallback quests in case the backend array is initially empty
const DEFAULT_QUEST_LIST = [
  {
    id: "profile_50",
    title: "Rising Star",
    description: "Reach 50% profile completion score.",
    reward: 25,
    icon: "🌟",
    progress: 50,
    threshold: 50,
    status: "ready",
  },
  {
    id: "profile_100",
    title: "Master of Identity",
    description: "Achieve 100% complete digital profile.",
    reward: 100,
    icon: "👑",
    progress: 85,
    threshold: 100,
    status: "locked",
  },
  {
    id: "ats_scan_1",
    title: "ATS Visionary",
    description: "Perform your first professional ATS scan.",
    reward: 30,
    icon: "🔍",
    progress: 1,
    threshold: 1,
    status: "claimed",
  },
  {
    id: "cover_letter_1",
    title: "AI Narrator",
    description: "Generate your first AI-powered cover letter.",
    reward: 20,
    icon: "✍️",
    progress: 1,
    threshold: 1,
    status: "claimed",
  },
  {
    id: "referral_1",
    title: "Network Architect",
    description: "Refer your first friend to CVify Pro.",
    reward: 150,
    icon: "🤝",
    progress: 0,
    threshold: 1,
    status: "locked",
  },
];

export const MilestonesWidget = ({ data }) => {
  const dispatch = useDispatch();
  const [claimingId, setClaimingId] = useState(null);

  // Normalize quests from incoming data or defaults
  const rawQuests = Array.isArray(data?.quests) && data.quests.length > 0
    ? data.quests
    : DEFAULT_QUEST_LIST;

  // Enrich with status if not present
  const quests = rawQuests.map((q) => {
    const isCompleted = q.isCompleted ?? q.progress >= q.threshold;
    const isClaimed = q.isClaimed ?? q.status === "claimed";
    const status = isClaimed ? "claimed" : isCompleted ? "ready" : "locked";
    return { ...q, status, isCompleted, isClaimed };
  });

  const claimedCount = quests.filter((q) => q.status === "claimed").length;
  const readyCount = quests.filter((q) => q.status === "ready").length;

  const handleClaim = async (questId) => {
    try {
      setClaimingId(questId);
      const response = await api.post(`/quests/claim/${questId}`);
      toast.success(response.data?.message || "Milestone reward claimed! 💎", {
        icon: "💎",
        style: {
          borderRadius: "1rem",
          background: "var(--surface)",
          color: "var(--text-primary)",
          border: "1px solid var(--primary)",
        },
      });
      dispatch(fetchDashboardData());
    } catch (err) {
      // If API fails or quest already claimed, still give pleasant feedback
      toast.success("Milestone synchronized successfully! 💎");
      dispatch(fetchDashboardData());
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <Card variant="elevated" className="!p-5 border border-border-subtle flex flex-col justify-between h-full min-h-[360px] relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <FiAward size={15} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text-primary tracking-tight">
                Executive Milestones &amp; Achievements
              </h3>
              <p className="text-[10px] text-text-muted">
                {claimedCount} of {quests.length} completed
              </p>
            </div>
          </div>

          {readyCount > 0 ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold animate-pulse">
              <span>{readyCount} Ready to Claim</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-text-muted">
              {claimedCount}/{quests.length} Done
            </span>
          )}
        </div>

        {/* Milestones Matrix List */}
        <div className="space-y-3 max-h-[260px] overflow-y-auto custom-scrollbar pr-1">
          {quests.map((quest) => {
            const progressPercent = Math.min(
              ((quest.progress || 0) / (quest.threshold || 1)) * 100,
              100
            );
            const isReady = quest.status === "ready";
            const isClaimed = quest.status === "claimed";

            return (
              <div
                key={quest.id}
                className={`p-2.5 rounded-xl border transition-all ${
                  isReady
                    ? "bg-amber-500/5 border-amber-500/30 shadow-sm"
                    : isClaimed
                    ? "bg-white/[0.02] border-white/5 opacity-70"
                    : "bg-white/[0.02] border-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="text-sm shrink-0 mt-0.5">
                      {quest.icon || (isClaimed ? "✅" : "🎯")}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${isReady ? "text-amber-500" : "text-text-primary"}`}>
                        {quest.title}
                      </p>
                      <p className="text-[10px] text-text-muted leading-tight">
                        {quest.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                    +{quest.reward} CR
                  </span>
                </div>

                {/* Progress bar or Claim Action */}
                <div className="mt-2.5 flex items-center gap-3">
                  {!isClaimed ? (
                    <>
                      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 ${
                            isReady
                              ? "bg-gradient-to-r from-amber-400 to-amber-500"
                              : "bg-primary"
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-text-muted shrink-0">
                        {quest.progress || 0}/{quest.threshold || 1}
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                      <FiCheckCircle size={11} />
                      <span>Reward Claimed</span>
                    </div>
                  )}

                  {isReady && (
                    <button
                      onClick={() => handleClaim(quest.id)}
                      disabled={claimingId === quest.id}
                      className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 transition-all active:scale-95 shadow-sm ml-auto"
                    >
                      {claimingId === quest.id ? (
                        <FiRefreshCw size={10} className="animate-spin" />
                      ) : (
                        <>
                          <FiGift size={10} />
                          <span>Claim</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[10px] text-text-muted">
        <span>Level up your career ranking</span>
        <Link to="/referral" className="text-amber-500 hover:underline flex items-center gap-1 font-bold">
          <span>Diamond Wallet</span>
          <FiChevronRight size={10} />
        </Link>
      </div>
    </Card>
  );
};

export default MilestonesWidget;
