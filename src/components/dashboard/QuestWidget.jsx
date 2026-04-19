import { m, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiLock, FiGift, FiChevronRight } from "react-icons/fi";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import { useDispatch } from "react-redux";
import { fetchDashboardData } from "../../features/dashboard/dashboardThunk";
import { useState } from "react";

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
          borderRadius: '1rem',
          background: 'var(--midground)',
          color: 'var(--text-main)',
          border: '1px solid var(--primary)'
        }
      });
      
      // Refresh total diamonds in header/stats
      dispatch(fetchDashboardData());
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to claim reward.");
    } finally {
      setClaimingId(null);
    }
  };

  if (!quests.length) return null;

  return (
    <div className="premium-card p-8 flex flex-col h-full bg-gradient-to-br from-midground to-foreground/10 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[80px] pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-text-main flex items-center gap-3">
            <FiGift className="text-primary" /> Quest Journal
          </h3>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">
            Complete Milestones • Earn Diamonds
          </p>
        </div>
        {quests.some(q => q.status === 'ready') && (
          <m.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-black tracking-widest uppercase">Rewards Waiting</span>
          </m.div>
        )}
      </div>

      <div className="space-y-4 flex-1">
        {quests.map((quest) => {
          const progressPercent = Math.min((quest.progress / quest.threshold) * 100, 100);
          
          return (
            <m.div 
              key={quest.id}
              layout
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                quest.status === 'ready' 
                  ? 'bg-primary/5 border-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.05)]' 
                  : 'bg-white/5 border-white/5'
              } ${quest.status === 'claimed' ? 'opacity-60' : 'opacity-100'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{quest.icon}</span>
                  <div>
                    <h4 className="text-sm font-black text-text-main line-clamp-1">
                      {quest.title}
                    </h4>
                    <p className="text-[10px] font-bold text-text-muted line-clamp-1 lowercase italic">
                      {quest.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-primary font-black text-xs">
                  <span>{quest.reward}</span>
                  <span className="text-[10px]">💎</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                  <m.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`absolute inset-y-0 left-0 rounded-full ${
                      quest.status === 'claimed' ? 'bg-text-muted' : 'bg-gradient-to-r from-primary to-accent'
                    }`}
                  />
                </div>
                
                {quest.status === 'claimed' ? (
                  <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase">
                    <FiCheckCircle />
                  </div>
                ) : quest.status === 'ready' ? (
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={claimingId === quest.id}
                    onClick={() => handleClaim(quest.id)}
                    className="px-4 py-1.5 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-hover transition-colors relative overflow-hidden group/claim"
                  >
                    <AnimatePresence mode="wait">
                      {claimingId === quest.id ? (
                        <m.div 
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Claiming...
                        </m.div>
                      ) : (
                        <m.span 
                          key="label"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          CLAIM
                        </m.span>
                      )}
                    </AnimatePresence>
                    
                    {/* Glow Pulse */}
                    <div className="absolute inset-0 bg-white/20 animate-pulse opacity-0 group-hover/claim:opacity-100 transition-opacity" />
                  </m.button>
                ) : (
                  <div className="flex items-center gap-2 text-text-muted text-[10px] font-black uppercase tracking-tighter tabular-nums whitespace-nowrap">
                    {quest.progress}/{quest.threshold} <FiLock size={10} />
                  </div>
                )}
              </div>
            </m.div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-[14px] font-black text-primary">
              {quests.filter(q => q.status === 'claimed').length}
            </p>
            <p className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Done</p>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="text-center">
            <p className="text-[14px] font-black text-text-main">
              {quests.length}
            </p>
            <p className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Total</p>
          </div>
        </div>
        
        <m.button 
          whileHover={{ x: 3 }}
          className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
        >
          View Full Log <FiChevronRight />
        </m.button>
      </div>
    </div>
  );
};

export default QuestWidget;
