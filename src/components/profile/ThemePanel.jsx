import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPalette, FaTimes, FaFillDrip, FaLayerGroup, FaCog, FaCheckCircle, FaChevronDown, FaFont } from "react-icons/fa";

const fontOptions = [
  "Inter",
  "Roboto",
  "Outfit",
  "Poppins",
  "Montserrat",
  "JetBrains Mono",
  "Space Grotesk",
  "Playfair Display",
];

const ThemePanel = ({ isOpen, onClose, theme, onUpdate, isUpdating, presets }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 450, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 450, opacity: 0 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[200] w-[24rem] md:w-[28rem] bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] p-8 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <FaPalette />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-white leading-none mb-1">Visual Builder</h3>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter opacity-60">Design System V4.1</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar pb-6 text-white">
            {/* Presets */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                 <FaFillDrip className="text-blue-500" /> Style Presets
              </label>
              <div className="grid grid-cols-2 gap-3">
                {presets.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => onUpdate({ ...theme, ...p })}
                    className={`flex flex-col items-center gap-3 p-5 rounded-[2rem] border-2 transition-all ${
                      theme.headerBg === p.headerBg
                        ? "bg-blue-500/10 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/5"
                        : "bg-white/5 border-transparent hover:border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-3xl filter drop-shadow-md">{p.icon}</span>
                    <span className="text-[9px] font-black uppercase leading-none tracking-tighter text-center">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                <FaPalette className="text-blue-500 text-[10px]" /> Brand Palette
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Gradient A", key: "headerBg" },
                  { label: "Gradient B", key: "headerBgSecondary" },
                  { label: "Background", key: "bodyBg" },
                  { label: "Accent", key: "accentColor" },
                  { label: "Main Text", key: "textPrimary" },
                  { label: "Muted Text", key: "textSecondary" },
                ].map((c) => (
                  <div key={c.key} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3 group hover:border-blue-500/30 transition-all">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{c.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-2xl border border-white/20">
                        <input
                          type="color"
                          value={theme[c.key] || "#000000"}
                          onChange={(e) => onUpdate({ ...theme, [c.key]: e.target.value })}
                          className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer"
                        />
                      </div>
                      <span className="text-[10px] font-black font-mono tracking-widest opacity-60 uppercase">{theme[c.key]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aesthetics */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                 <FaLayerGroup className="text-blue-500" /> Component Depth
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: "minimal", name: "Sharp & Minimal", desc: "Clean flat aesthetics" },
                  { id: "glass", name: "High Depth Glass", desc: "Frosted glassmorphism" },
                  { id: "classic", name: "Subtle Hub", desc: "Gentle shadows & borders" },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onUpdate({ ...theme, cardStyle: style.id })}
                    className={`p-4 rounded-3xl border-2 text-left transition-all flex items-center justify-between ${
                      theme.cardStyle === style.id ? "border-blue-500 bg-blue-500/5" : "border-transparent bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <div>
                      <h5 className="text-[10px] font-black uppercase mb-0.5">{style.name}</h5>
                      <p className="text-[8px] text-slate-500 font-bold tracking-tight">{style.desc}</p>
                    </div>
                    {theme.cardStyle === style.id && <FaCheckCircle className="text-blue-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] flex items-center gap-2">
                 <FaFont className="text-blue-500" /> Typography System
              </label>
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center space-y-4 hover:border-blue-500/30 transition-all">
                  <div className="relative w-full group">
                    <select
                        value={theme.fontPrimary}
                        onChange={(e) => onUpdate({ ...theme, fontPrimary: e.target.value })}
                        className="w-full bg-white/5 p-4 rounded-2xl text-xl font-black outline-none cursor-pointer appearance-none border border-white/5 focus:border-blue-500/50 transition-all text-white text-center pr-10"
                        style={{ fontFamily: theme.fontPrimary }}
                    >
                        {fontOptions.map((f) => (
                        <option key={f} value={f} className="text-slate-900" style={{ fontFamily: f }}>
                            {f}
                        </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-white transition-colors">
                        <FaChevronDown size={10} />
                    </div>
                  </div>
                  <p className="text-[8px] text-slate-500 font-bold text-center leading-relaxed px-4 opacity-60">
                      Standardizing interface fonts across all heading and body elements.
                  </p>
              </div>
            </div>

            {/* Save Status */}
            <div className="pt-4 border-t border-white/5">
              <div className={`p-4 rounded-2xl border flex items-center justify-center gap-3 transition-all duration-500 ${isUpdating ? "border-amber-500/20 bg-amber-500/5 text-amber-500" : "border-emerald-500/20 bg-emerald-500/5 text-emerald-500"}`}>
                {isUpdating ? (
                  <><FaCog className="animate-spin text-xs" /><span className="text-[9px] font-black uppercase tracking-widest">Builder Syncing...</span></>
                ) : (
                  <><FaCheckCircle className="text-xs" /><span className="text-[9px] font-black uppercase tracking-widest">Changes Saved</span></>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemePanel;
