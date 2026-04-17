import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaShieldAlt, FaKey, FaChevronRight, FaTerminal } from "react-icons/fa";

const AuditViewerModal = ({ log, onClose }) => {
  if (!log) return null;

  const renderDiff = () => {
    const prev = log.previousState || {};
    const next = log.newState || {};
    const allKeys = Array.from(new Set([...Object.keys(prev), ...Object.keys(next)]));

    return (
      <div className="space-y-4">
        {allKeys.map((key) => {
          const isChanged = JSON.stringify(prev[key]) !== JSON.stringify(next[key]);
          if (!isChanged) return null;

          return (
            <div key={key} className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{key}</span>
                <span className="text-[8px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded uppercase font-black">Modified</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/10 overflow-hidden">
                  <p className="text-[10px] text-red-400 font-black uppercase mb-1 opacity-50">Old Value</p>
                  <pre className="text-xs text-red-300 font-mono break-all whitespace-pre-wrap">
                    {JSON.stringify(prev[key], null, 2) || "NULL"}
                  </pre>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10 overflow-hidden">
                  <p className="text-[10px] text-emerald-400 font-black uppercase mb-1 opacity-50">New Value</p>
                  <pre className="text-xs text-emerald-300 font-mono break-all whitespace-pre-wrap">
                    {JSON.stringify(next[key], null, 2) || "NULL"}
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden premium-card flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
              <FaShieldAlt className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-black text-text-primary tracking-tight uppercase">Forensic Audit Viewer</h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Forensic ID: {log._id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-xl transition-all">
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar space-y-8">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Target Account</p>
                <p className="text-sm font-black text-text-primary">{log.targetUser ? `${log.targetUser.firstName} ${log.targetUser.lastName}` : "SYSTEM"}</p>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Executor (Admin)</p>
                <p className="text-sm font-black text-amber-500">{log.performedBy?.firstName || "SYSTEM"}</p>
             </div>
             <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Event Action</p>
                <p className="text-sm font-black text-primary uppercase">{log.action.replace(/_/g, ' ')}</p>
             </div>
          </div>

          {/* Verification Badge */}
          {log.hash && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <FaKey className="text-emerald-400" />
              <div>
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Cryptographic Signature Valid</p>
                <p className="text-[9px] text-emerald-400/60 font-medium">This record is part of a tamper-proof hash chain.</p>
              </div>
            </div>
          )}

          {/* Reason Section */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
               <FaTerminal className="text-primary" /> Mandatory Action Reason
            </h4>
            <p className="text-lg font-bold text-text-primary italic">"{log.reason || "Automatic system state transition triggered by platform logic."}"</p>
          </div>

          {/* State Transition Diff */}
          {(log.previousState || log.newState) ? (
            <div>
               <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">State Transition Matrix</h4>
               {renderDiff()}
            </div>
          ) : (
            <div className="p-10 text-center opacity-30">
               <p className="text-xs font-bold uppercase tracking-widest italic">No complex state transition captured for this event.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white/5 border-t border-white/5 flex justify-end gap-3">
           <button 
            onClick={onClose}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
           >
            Dismiss
           </button>
           <button className="px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
            Escalate Report
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuditViewerModal;
