import { m, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiLock, FiGift, FiChevronRight, FiStar, FiZap, FiAward, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { fetchDashboardData } from "../../features/dashboard/dashboardThunk";
import { useState } from "react";
import { FaGem } from "react-icons/fa";

const QuestWidget = ({ quests = [] }) => {
  const dispatch = useDispatch();
  const [claimingId, setClaimingId] = useState(null);

  const handleClaim = async (questId) => {
    try {
      setClaimingId(questId);
      const response = await api.post(`/quests/claim/${questId}`);
      toast.success(response.data.message || "Bounty collected! 💎", {
        icon: '💎',
        style: {
          borderRadius: '1.5rem',
          background: 'var(--midground)',
          color: 'var(--text-main)',
          border: '1px solid var(--primary)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }
      });
      
      dispatch(fetchDashboardData());
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to claim reward.");
    } finally {
      setClaimingId(null);
    }
  };

  if (!quests.length) return null;

  const hasReadyQuests = quests.some(q => q.status === 'ready');

  return (
    <div className="flex flex-col h-full glass-strong rounded-[2.5rem] border border-card-border overflow-hidden relative group/widget transition-all duration-700 hover:shadow-glow-primary min-h-[500px]">
      {/* Immersive HUD Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] rounded-full -translate-y-1/3 translate-x-1/3 group-hover/widget:bg-primary/15 transition-colors duration-1000" />

      {/* Header HUD */}
      <div className="p-10 pb-6 relative z-10 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-amber-500 flex items-center gap-3 tracking-tighter uppercase italic">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500 shadow-glow-amber">
              <FiAward size={20} />
            </div>
            Quest Journal
          </h3>
          {hasReadyQuests && (
            <m.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-1.5 glass-soft text-emerald-500 rounded-full border border-emerald-500/30 shadow-glow-success"
            >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_var(--success)]" />
              <span className="text-[9px] font-black tracking-[0.2em] uppercase">BOUNTY</span>
            </m.div>
          )}
        </div>
        <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.4em] ml-1 opacity-50">
          Executive Milestone Matrix
        </p>
      </div>

      {/* Vertical Matrix List */}
      <div className="flex-1 px-8 pb-10 space-y-6 relative z-10 overflow-y-auto custom-scrollbar-thin pr-4">
        {quests.map((quest, index) => {
          const progressPercent = Math.min((quest.progress / quest.threshold) * 100, 100);
          const isReady = quest.status === 'ready';
          const isClaimed = quest.status === 'claimed';
          
          return (
            <m.div 
              key={quest.id}
              layout
              className={`group/card relative pl-10 transition-all duration-500 ${isClaimed ? "opacity-40" : "opacity-100"}`}
            >
              {/* Matrix Connector Line */}
              {index !== quests.length - 1 && (
                <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-card-border to-transparent" />
              )}
              
              {/* Matrix Point */}
              <div className={`absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center z-20 transition-all duration-500 ${
                isReady 
                  ? "bg-primary text-white shadow-glow-primary scale-110" 
                  : isClaimed 
                    ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/20" 
                    : "glass-soft text-text-secondary border-card-border group-hover/card:border-primary/40 group-hover/card:text-primary"
              }`}>
                {isClaimed ? <FiCheckCircle size={18} /> : (quest.icon || <FiStar size={18} />)}
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className={`text-base font-black tracking-tight leading-tight mb-1 transition-colors ${isReady ? "text-primary" : "text-text-primary"}`}>
                      {quest.title}
                    </h4>
                    <p className="text-[11px] font-bold text-text-secondary leading-relaxed opacity-60 italic">
                      {quest.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-3 py-1.5 glass-medium rounded-xl border-amber-500/20">
                    <span className="text-[11px] font-black text-amber-500 tabular-nums">{quest.reward}</span>
                    <FaGem size={10} className="text-amber-500" />
                  </div>
                </div>

                {/* Progress Interface */}
                <div className="space-y-3">
                   {!isClaimed && (
                     <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 glass-soft rounded-full overflow-hidden border-white/5 relative">
                          <m.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent animate-shimmer"
                          />
                        </div>
                        <span className="text-[10px] font-black text-text-secondary tabular-nums opacity-60">
                           {quest.progress}/{quest.threshold}
                        </span>
                     </div>
                   )}

                   {isReady && (
                     <m.button
                       whileHover={{ scale: 1.02 }}
                       whileTap={{ scale: 0.98 }}
                       disabled={claimingId === quest.id}
                       onClick={() => handleClaim(quest.id)}
                       className="w-full py-4 bg-emerald-500 text-white rounded-2xl shadow-glow-success font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-3 active:scale-95 transition-all"
                     >
                       {claimingId === quest.id ? (
                         <FiRefreshCw size={14} className="animate-spin" />
                       ) : (
                         <>
                           <FiGift size={16} className="animate-bounce" />
                           Claim Reward Package
                         </>
                       )}
                     </m.button>
                   )}
                </div>
              </div>
            </m.div>
          );
        })}
      </div>

      {/* Footer HUD Monitoring */}
      <div className="p-10 bg-white/[0.02] border-t border-card-border flex items-center justify-between relative z-10">
        <div className="flex items-center gap-8">
           <div className="flex flex-col">
              <span className="text-[9px] font-black text-text-secondary uppercase tracking-[0.3em] mb-1 opacity-50">Archive</span>
              <span className="text-xl font-black text-text-primary leading-none tracking-tighter tabular-nums">
                {quests.filter(q => q.status === 'claimed').length?.toString().slice(-2).padStart(2, '0')}
              </span>
           </div>
           <div className="w-[1px] h-6 bg-card-border" />
           <div className="flex flex-col">
              <span className="text-[9px] font-black text-text-secondary uppercase tracking-[0.3em] mb-1 opacity-50">System</span>
              <span className="text-xl font-black text-text-secondary leading-none tracking-tighter tabular-nums opacity-40">
                {quests.length?.toString().slice(-2).padStart(2, '0')}
              </span>
           </div>
        </div>

        <m.button 
          whileHover={{ x: 5, color: 'var(--primary)' }}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary flex items-center gap-3 group/all opacity-60 hover:opacity-100"
        >
          View Log
          <FiChevronRight className="group-hover/all:translate-x-1 transition-transform" />
        </m.button>
      </div>
    </div>
  );
};

export default QuestWidget;
