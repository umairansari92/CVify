import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPalette, FaTimes, FaCheck, FaMagic, FaGem, FaCircle } from "react-icons/fa";

const ThemePanel = ({ isOpen, onClose, theme, onUpdate, isUpdating }) => {
  if (!theme) return null;

  const presets = [
    {
      id: "classic",
      name: "CLASSIC",
      icon: <FaMagic className="text-yellow-400" />,
      settings: {
        headerBg: "#2563eb",
        headerBgSecondary: "#9333ea",
        bodyBg: "#0f172a",
        accentColor: "#2563eb",
        textPrimary: "#ffffff",
        textSecondary: "#94a3b8",
        cardStyle: "glass",
      },
    },
    {
      id: "executive",
      name: "EXECUTIVE",
      icon: <FaGem className="text-blue-400" />,
      settings: {
        headerBg: "#000000",
        headerBgSecondary: "#1e293b",
        bodyBg: "#020617",
        accentColor: "#38bdf8",
        textPrimary: "#f8fafc",
        textSecondary: "#94a3b8",
        cardStyle: "minimal",
      },
    },
    {
      id: "minimalist",
      name: "MINIMALIST",
      icon: <FaCircle className="text-white scale-75" />,
      settings: {
        headerBg: "#f1f5f9",
        headerBgSecondary: "#e2e8f0",
        bodyBg: "#ffffff",
        accentColor: "#1e3a8a",
        textPrimary: "#1e293b",
        textSecondary: "#475569",
        cardStyle: "classic",
      },
    },
  ];

  const paletteItems = [
    { label: "GRADIENT A", key: "headerBg" },
    { label: "GRADIENT B", key: "headerBgSecondary" },
    { label: "BACKGROUND", key: "bodyBg" },
    { label: "ACCENT", key: "accentColor" },
    { label: "MAIN TEXT", key: "textPrimary" },
    { label: "MUTED TEXT", key: "textSecondary" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-[480px] bg-[#1a2333] border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2563eb] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FaPalette className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-widest leading-none font-outfit">
                    VISUAL BUILDER
                  </h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1 opacity-80">
                    DESIGN SYSTEM V4.1
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="p-8 pt-4 space-y-10 overflow-y-auto max-h-[75vh] custom-scrollbar">
              {/* Style Presets */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <FaMagic className="text-[#2563eb] text-[10px]" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    STYLE PRESETS
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {presets.map((p) => {
                    const isActive = theme.headerBg === p.settings.headerBg;
                    return (
                      <button
                        key={p.id}
                        onClick={() => onUpdate({ ...theme, ...p.settings })}
                        className={`group p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
                          isActive
                            ? "bg-[#2563eb]/10 border-[#2563eb] shadow-xl shadow-[#2563eb]/10"
                            : "bg-white/5 border-transparent hover:border-white/10"
                        }`}
                      >
                        <div className="text-3xl mb-1 filter drop-shadow-lg group-hover:scale-110 transition-transform">
                          {p.icon}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-[#2563eb]' : 'text-slate-400'}`}>
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Palette */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-[10px]"><FaCircle className="scale-75" /></span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    BRAND PALETTE
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {paletteItems.map((item) => (
                    <div
                      key={item.key}
                      className="p-5 bg-white/5 rounded-[1.5rem] border border-white/5 group hover:border-[#2563eb]/30 transition-all flex flex-col gap-3"
                    >
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-inset ring-white/5">
                          <input
                            type="color"
                            value={theme[item.key] || "#000000"}
                            onChange={(e) =>
                              onUpdate({ ...theme, [item.key]: e.target.value })
                            }
                            className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer"
                          />
                        </div>
                        <span className="text-[11px] font-black text-white/90 uppercase tracking-widest font-mono">
                          {theme[item.key]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sync Status */}
              <div className="pt-4">
                <div className={`p-4 rounded-2xl border flex items-center justify-center gap-3 transition-all duration-700 ${isUpdating ? "border-amber-500/20 bg-amber-500/5 text-amber-500" : "border-emerald-500/20 bg-emerald-500/5 text-emerald-500"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isUpdating ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-glow shadow-emerald-500/50'}`} />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                    {isUpdating ? "Builder Syncing..." : "Design Master Verified"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ThemePanel;
