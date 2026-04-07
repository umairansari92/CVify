import React, { useState, useEffect } from "react";
import { 
  FaChartLine, 
  FaHistory, 
  FaTrophy, 
  FaBriefcase, 
  FaChevronRight, 
  FaGem,
  FaCheckCircle,
  FaExclamationCircle,
  FaRocket,
  FaSearch
} from "react-icons/fa";
import { FiZap, FiArrowUpRight, FiSearch } from "react-icons/fi";
import api from "../../api/axios";
import { motion } from "framer-motion";

const CareerAnalytics = () => {
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [histRes, analyticsRes] = await Promise.all([
          api.get("/resume-intelligence/history/all"),
          api.get("/resume-intelligence/analytics")
        ]);
        setHistory(histRes.data.history || []);
        setAnalytics(analyticsRes.data.stats);
      } catch (err) {
        console.error("Failed to fetch career intelligence data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (score >= 60) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    return "text-rose-400 bg-rose-400/10 border-rose-400/20";
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-32 glass rounded-3xl"></div>)}
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 glass rounded-3xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- HERO ANALYTICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaTrophy size={60} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-4">Best Score</p>
          <div className="flex items-end gap-2">
            <h3 className="text-5xl font-black text-text-primary tracking-tighter">{analytics?.bestScore || 0}%</h3>
            <span className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-1">
              <FiArrowUpRight /> Peak
            </span>
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaChartLine size={60} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-4">Average Quality</p>
          <div className="flex items-end gap-2">
            <h3 className="text-5xl font-black text-text-primary tracking-tighter">{analytics?.avgScore || 0}%</h3>
            <span className="text-blue-400 font-bold text-sm mb-2">Steady</span>
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaRocket size={60} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-4">Total Audits</p>
          <div className="flex items-end gap-2">
            <h3 className="text-5xl font-black text-text-primary tracking-tighter">{analytics?.totalScans || 0}</h3>
            <span className="text-violet-400 font-bold text-sm mb-2">Scans</span>
          </div>
        </div>
      </div>

      {/* --- TOP PERFORMANCE --- */}
      {analytics?.topRole && (
        <div className="p-8 rounded-[2.5rem] bg-linear-to-r from-primary/20 to-violet-600/20 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-glow">
                    <FaBriefcase size={28} />
                </div>
                <div>
                    <h4 className="text-2xl font-black text-text-primary tracking-tight">Best Targeted Role</h4>
                    <p className="text-text-muted font-bold opacity-70">Based on your highest scoring audits</p>
                </div>
            </div>
            <div className="px-8 py-4 glass rounded-2xl border border-white/10 shadow-xl">
                <span className="text-xl font-black text-gradient uppercase tracking-widest">{analytics.topRole}</span>
            </div>
        </div>
      )}

      {/* --- TIMELINE HISTORY --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Intelligence Timeline</h4>
          <span className="text-[10px] font-bold text-text-muted opacity-50 italic">Showing {history.length} recent sessions</span>
        </div>

        <div className="space-y-4">
          {history.length > 0 ? history.map((scan, idx) => (
            <motion.div 
              key={scan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group glass p-6 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6 flex-1 w-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border ${getScoreColor(scan.score)}`}>
                  {scan.score}%
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h5 className="font-black text-lg text-text-primary truncate">{scan.name}</h5>
                    {scan.isBest && (
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md text-[8px] font-black uppercase tracking-widest">Best</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-text-muted font-bold">
                        <FaSearch className="text-[10px] opacity-40" />
                        <span>Target: <span className="text-text-secondary">{scan.role}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted font-bold">
                        <FaRocket className="text-[10px] opacity-40" />
                        <span>Level: <span className="text-text-secondary">{scan.level}</span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-text-muted tracking-widest opacity-40">Date Audited</p>
                    <p className="text-xs font-bold text-text-secondary">
                        {new Date(scan.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <FaChevronRight />
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="glass p-20 rounded-[3rem] text-center border-2 border-dashed border-white/5 opacity-50">
               <p className="font-bold text-text-muted text-lg italic">No scan history found. Start your first audit on the ATS page!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerAnalytics;
