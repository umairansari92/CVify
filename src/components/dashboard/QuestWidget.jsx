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
    <div className="flex flex-col h-full glass rounded-[2.5rem] border border-white/10 overflow-hidden relative group/widget transition-all duration-700 hover:shadow-glow-primary">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover/widget:bg-primary/20 transition-colors duration-700" />

      {/* Header */}
      <div className="p-8 pb-4 relative z-10 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#fbbf24] flex items-center gap-2 tracking-tight group-hover/widget:translate-x-1 transition-transform duration-500">
            <div className="p-2.5 bg-[#fbbf24]/10 rounded-2xl text-[#fbbf24] shadow-inner">
              <FiAward size={20} />
            </div>
            Quest Journal
          </h3>
          {hasReadyQuests && (
            <m.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 shadow-glow-emerald"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[8px] font-black tracking-[0.2em] uppercase">Ready</span>
            </m.div>
          )}
        </div>
        <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.3em] ml-[68px] opacity-40">
          Executive Milestone Matrix
        </p>
      </div>

      {/* Quest List */}
      <div className="flex-1 px-4 mb-4 space-y-3 relative z-10 overflow-y-auto custom-scrollbar-thin max-h-[420px] pr-2">
        {quests.map((quest) => {
          const progressPercent = Math.min((quest.progress / quest.threshold) * 100, 100);
          const isReady = quest.status === 'ready';
          const isClaimed = quest.status === 'claimed';
          
          return (
            <m.div 
              key={quest.id}
              layout
              className={`p-4 rounded-3xl border transition-all duration-500 group/card relative overflow-hidden ${
                isReady 
                  ? 'bg-primary/5 border-primary/30 shadow-glow-primary' 
                  : 'bg-white/[0.03] border-white/5 hover:border-white/10'
              } ${isClaimed ? 'opacity-50 grayscale-[0.5]' : 'opacity-100'}`}
            >
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
                    isReady ? 'bg-primary/20 animate-bounce-slow' : 'bg-white/5'
                  }`}>
                    {quest.icon || <FiStar />}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-text-main leading-none mb-1.5">
                      {quest.title}
                    </h4>
                    <p className="text-[9px] font-semibold text-text-muted leading-tight line-clamp-2 italic opacity-70">
                      {quest.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-[10px] font-black text-primary">{quest.reward}</span>
                  <FaGem size={8} className="text-primary" />
                </div>
              </div>

              {/* Progress HUD */}
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-text-muted px-1">
                  <span>Progress</span>
                  <span className={isReady ? "text-primary" : ""}>
                    {quest.progress} / {quest.threshold}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                    <m.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={`absolute inset-y-0 left-0 rounded-full ${
                        isClaimed ? 'bg-text-muted' : 'bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer'
                      }`}
                    />
                  </div>
                  
                  {isClaimed ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                      <FiCheckCircle size={14} />
                    </div>
                  ) : isReady ? (
                    <m.button
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      whileTap={{ scale: 0.9 }}
                      disabled={claimingId === quest.id}
                      onClick={() => handleClaim(quest.id)}
                      className="w-10 h-10 bg-primary text-white rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center relative overflow-hidden group/claim transition-transform"
                    >
                      <AnimatePresence mode="wait">
                        {claimingId === quest.id ? (
                          <m.div 
                            key="loading"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          >
                            <FiRefreshCw size={14} />
                          </m.div>
                        ) : (
                          <m.div
                            key="gift"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <FiGift size={16} />
                          </m.div>
                        )}
                      </AnimatePresence>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 animate-pulse" />
                    </m.button>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/5 text-text-muted flex items-center justify-center border border-white/5 opacity-40">
                      <FiLock size={12} />
                    </div>
                  )}
                </div>
              </div>

              {/* Card Glare effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 -translate-x-full group-hover/card:translate-x-full transition-transform" />
            </m.div>
          );
        })}
      </div>

      {/* Footer HUD */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <p className="text-lg font-black text-text-main leading-none tabular-nums">
              {quests.filter(q => q.status === 'claimed').length}
            </p>
            <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em] mt-1">Completed</p>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex flex-col">
            <p className="text-lg font-black text-text-muted leading-none tabular-nums">
              {quests.length}
            </p>
            <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em] mt-1">Total</p>
          </div>
        </div>
        
        <m.button 
          whileHover={{ x: 5, color: 'var(--primary)' }}
          className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2 group/all"
        >
          Detailed Log 
          <FiChevronRight className="group-hover/all:translate-x-1 transition-transform" />
        </m.button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(37, 99, 235, 0.2);
          border-radius: 20px;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default QuestWidget;
