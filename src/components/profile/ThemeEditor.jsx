import React, { useState, useEffect } from "react";
import {
  FaPalette,
  FaFont,
  FaFillDrip,
  FaImage,
  FaLayerGroup,
  FaMagic,
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const ThemeEditor = ({ settings, onUpdate, saving }) => {
  const [localSettings, setLocalSettings] = useState(
    settings || {
      headerBg: "#2563eb",
      headerBgSecondary: "#9333ea",
      bodyBg: "#0f172a",
      cardStyle: "glass",
      fontPrimary: "Inter",
      bannerUrl: "",
      bannerOpacity: 95,
      textPrimary: "#ffffff",
      textSecondary: "#94a3b8",
      accentColor: "#2563eb",
    },
  );

  // Sync local settings if prop changes
  useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(
    localSettings.bannerUrl || "",
  );

  const handleChange = (field, value) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
    onUpdate(updated, bannerFile);
  };

  const handleBannerFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024)
        return toast.error("Banner must be under 5MB");
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
      handleChange("bannerUrl", "PREVIEW"); // Marker for preview
    }
  };

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

  const presets = [
    {
      name: "CVify Classic",
      headerBg: "#2563eb",
      headerBgSecondary: "#9333ea",
      bodyBg: "#f8fafc",
      fontPrimary: "Inter",
      cardStyle: "glass",
      icon: "⚡",
      textPrimary: "#0f172a",
      textSecondary: "#64748b",
      accentColor: "#2563eb",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      name: "Midnight Dev",
      headerBg: "#0f172a",
      headerBgSecondary: "#1e293b",
      bodyBg: "#020617",
      fontPrimary: "JetBrains Mono",
      cardStyle: "minimal",
      icon: "🌙",
      textPrimary: "#f8fafc",
      textSecondary: "#94a3b8",
      accentColor: "#38bdf8",
      gradient: "from-slate-900 to-slate-800",
    },
    {
      name: "Corporate Gold",
      headerBg: "#1e3a8a",
      headerBgSecondary: "#1e40af",
      bodyBg: "#ffffff",
      fontPrimary: "Outfit",
      cardStyle: "classic",
      icon: "🏢",
      textPrimary: "#1e293b",
      textSecondary: "#475569",
      accentColor: "#d97706",
      gradient: "from-blue-900 to-indigo-900",
    },
    {
      name: "Creative Sunset",
      headerBg: "#f97316",
      headerBgSecondary: "#db2777",
      bodyBg: "#fff7ed",
      fontPrimary: "Poppins",
      cardStyle: "glass",
      icon: "🌅",
      textPrimary: "#431407",
      textSecondary: "#9a3412",
      accentColor: "#e11d48",
      gradient: "from-orange-500 to-pink-600",
    },
    {
      name: "Slate Minimalist",
      headerBg: "#475569",
      headerBgSecondary: "#64748b",
      bodyBg: "#f1f5f9",
      fontPrimary: "Roboto",
      cardStyle: "minimal",
      icon: "🎨",
      textPrimary: "#334155",
      textSecondary: "#64748b",
      accentColor: "#0f172a",
      gradient: "from-slate-600 to-slate-500",
    },
    {
      name: "Emerald Leader",
      headerBg: "#059669",
      headerBgSecondary: "#10b981",
      bodyBg: "#f0fdf4",
      fontPrimary: "Montserrat",
      cardStyle: "classic",
      icon: "🌿",
      textPrimary: "#064e3b",
      textSecondary: "#065f46",
      accentColor: "#059669",
      gradient: "from-emerald-600 to-teal-500",
    },
  ];

  const applyPreset = (preset) => {
    const updated = {
      ...localSettings,
      headerBg: preset.headerBg,
      headerBgSecondary: preset.headerBgSecondary,
      bodyBg: preset.bodyBg,
      fontPrimary: preset.fontPrimary,
      cardStyle: preset.cardStyle,
      textPrimary: preset.textPrimary || "#ffffff",
      textSecondary: preset.textSecondary || "#94a3b8",
      accentColor: preset.accentColor || "#2563eb",
    };
    setLocalSettings(updated);
    onUpdate(updated, bannerFile);
    toast.success(`Theme Applied: ${preset.name}`);
  };

  const styleOptions = [
    { id: "minimal", name: "Minimalist", desc: "Clean & Flat", icon: <FaPalette /> },
    { id: "glass", name: "Glassmorphism", desc: "Frosted Effects", icon: <FaMagic /> },
    { id: "classic", name: "Classic", desc: "Solid Shadows", icon: <FaLayerGroup /> },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Visual Header --- */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
            <FaMagic className="text-indigo-500 text-lg" />
          </div>
          <div>
            <h2 className="text-lg font-black text-text-main tracking-tight italic">Visual Builder V4.1</h2>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-50">Real-time design engine</p>
          </div>
        </div>
        {saving && (
           <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Syncing Design</span>
          </div>
        )}
      </div>

      {/* ── One-Click Presets ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">One-Click Presets</span>
            <div className="h-[1px] flex-1 bg-border-subtle opacity-30" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {presets.map((p) => {
            const isActive = localSettings.headerBg === p.headerBg && localSettings.bodyBg === p.bodyBg;
            return (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className={`group relative p-5 bg-foreground/5 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center justify-center text-center gap-3 hover:scale-[1.02] hover:shadow-2xl hover:shadow-action/10 ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-xl shadow-primary/5"
                    : "border-border-subtle hover:border-text-muted/30"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-2xl shadow-lg shadow-black/10 transition-transform duration-500 group-hover:rotate-6`}>
                  <span className="filter drop-shadow-md">{p.icon}</span>
                </div>
                <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-tight text-text-main block">
                    {p.name}
                    </span>
                    <span className="text-[8px] font-bold text-text-muted uppercase opacity-40">Preset</span>
                </div>
                {isActive && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-[10px] shadow-lg animate-in zoom-in-50 duration-300">
                        <FaCheck />
                    </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Colors Palette */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">Global Palette</span>
            <div className="h-[1px] flex-1 bg-border-subtle opacity-30" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gradient Primary */}
            <div className="p-5 bg-foreground/5 rounded-[2rem] border border-border-subtle space-y-4 hover:border-text-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">Hero Gradient (A)</span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-glow shadow-blue-500/50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-inner-xl group">
                  <input
                    type="color"
                    value={localSettings.headerBg}
                    onChange={(e) => handleChange("headerBg", e.target.value)}
                    className="absolute inset-x-[-100%] inset-y-[-100%] w-[300%] h-[300%] cursor-pointer scale-[2]"
                  />
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
                </div>
                <div className="flex-1">
                    <input
                    type="text"
                    value={localSettings.headerBg}
                    onChange={(e) => handleChange("headerBg", e.target.value)}
                    className="text-sm font-black bg-transparent border-b border-border-subtle focus:border-primary outline-none w-full py-1 uppercase tracking-tighter text-text-main"
                    />
                    <span className="text-[8px] font-black text-text-muted uppercase opacity-40">Primary HEX</span>
                </div>
              </div>
            </div>

            {/* Gradient Secondary */}
            <div className="p-5 bg-foreground/5 rounded-[2rem] border border-border-subtle space-y-4 hover:border-text-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">Hero Gradient (B)</span>
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-glow shadow-purple-500/50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-inner-xl">
                  <input
                    type="color"
                    value={localSettings.headerBgSecondary}
                    onChange={(e) =>
                      handleChange("headerBgSecondary", e.target.value)
                    }
                    className="absolute inset-x-[-100%] inset-y-[-100%] w-[300%] h-[300%] cursor-pointer scale-[2]"
                  />
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
                </div>
                <div className="flex-1">
                    <input
                    type="text"
                    value={localSettings.headerBgSecondary}
                    onChange={(e) => handleChange("headerBgSecondary", e.target.value)}
                    className="text-sm font-black bg-transparent border-b border-border-subtle focus:border-primary outline-none w-full py-1 uppercase tracking-tighter text-text-main"
                    />
                    <span className="text-[8px] font-black text-text-muted uppercase opacity-40">Secondary HEX</span>
                </div>
              </div>
            </div>

            {/* Accent Color */}
            <div className="p-5 bg-foreground/5 rounded-[2rem] border border-border-subtle space-y-4 hover:border-text-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">Brand Accent</span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-glow shadow-amber-500/50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-inner-xl">
                  <input
                    type="color"
                    value={localSettings.accentColor || "#2563eb"}
                    onChange={(e) => handleChange("accentColor", e.target.value)}
                    className="absolute inset-x-[-100%] inset-y-[-100%] w-[300%] h-[300%] cursor-pointer scale-[2]"
                  />
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
                </div>
                <div className="flex-1">
                    <input
                    type="text"
                    value={localSettings.accentColor || "#2563eb"}
                    onChange={(e) => handleChange("accentColor", e.target.value)}
                    className="text-sm font-black bg-transparent border-b border-border-subtle focus:border-primary outline-none w-full py-1 uppercase tracking-tighter text-text-main"
                    />
                    <span className="text-[8px] font-black text-text-muted uppercase opacity-40">Action HEX</span>
                </div>
              </div>
            </div>

             {/* Text Primary */}
             <div className="p-5 bg-foreground/5 rounded-[2rem] border border-border-subtle space-y-4 hover:border-text-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">Text Colors</span>
                <div className="w-1.5 h-1.5 rounded-full bg-text-main shadow-glow shadow-text-main/50" />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-inner-xl border border-border-subtle/20">
                  <input
                    type="color"
                    value={localSettings.textPrimary || "#ffffff"}
                    onChange={(e) => handleChange("textPrimary", e.target.value)}
                    className="absolute inset-x-[-100%] inset-y-[-100%] w-[300%] h-[300%] cursor-pointer scale-[2]"
                  />
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <input
                        type="color"
                        value={localSettings.textSecondary || "#94a3b8"}
                        onChange={(e) => handleChange("textSecondary", e.target.value)}
                        className="w-4 h-4 rounded-full border border-border-subtle cursor-pointer overflow-hidden"
                        />
                        <input
                        type="text"
                        value={localSettings.textPrimary}
                        onChange={(e) => handleChange("textPrimary", e.target.value)}
                        className="text-sm font-black bg-transparent border-b border-border-subtle focus:border-primary outline-none w-full py-1 uppercase tracking-tighter text-text-main"
                        />
                    </div>
                    <span className="text-[8px] font-black text-text-muted uppercase opacity-40">Heading HEX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typography & Background */}
        <div className="space-y-12">
           {/* Typography Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">Typography</span>
                <div className="h-[1px] flex-1 bg-border-subtle opacity-30" />
            </div>
            <div className="p-6 bg-foreground/5 rounded-[2rem] border border-border-subtle space-y-4 hover:border-text-muted/30 transition-colors">
                <div className="relative group">
                    <select
                        value={localSettings.fontPrimary}
                        onChange={(e) => handleChange("fontPrimary", e.target.value)}
                        className="w-full bg-white dark:bg-midground/50 p-6 rounded-2xl text-xl font-black outline-none cursor-pointer appearance-none border-2 border-border-subtle focus:border-primary transition-all pr-12 text-text-main"
                        style={{ fontFamily: localSettings.fontPrimary }}
                    >
                        {fontOptions.map((f) => (
                        <option key={f} value={f} style={{ fontFamily: f }} className="bg-midground">
                            {f}
                        </option>
                        ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                        <FaChevronDown />
                    </div>
                </div>
                <p className="text-[10px] text-text-muted font-bold tracking-tight px-2 flex items-center gap-2">
                    <FaFont className="text-primary opacity-50" />
                    Preview: "The quick brown fox jumps over the lazy dog."
                </p>
            </div>
          </div>

          {/* Background Banner */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">Background Banner</span>
                <div className="h-[1px] flex-1 bg-border-subtle opacity-30" />
            </div>
            <div className="p-6 bg-foreground/5 rounded-[2.5rem] border-2 border-dashed border-border-subtle group hover:border-primary/50 transition-all duration-500">
                <div className="flex flex-col items-center justify-center text-center">
                    {bannerPreview ? (
                    <div className="relative w-full h-32 rounded-[2rem] overflow-hidden mb-6 border border-border-subtle group">
                        <img
                        src={bannerPreview}
                        alt="Banner Preview"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ opacity: localSettings.bannerOpacity / 100 }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button
                                onClick={() => {
                                    setBannerPreview("");
                                    setBannerFile(null);
                                    handleChange("bannerUrl", "");
                                }}
                                className="bg-red-500 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
                                >
                                Remove Banner
                            </button>
                        </div>
                    </div>
                    ) : (
                    <div className="py-6 w-full">
                        <label className="cursor-pointer block group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-glow shadow-primary/20">
                                <FaImage size={24} />
                            </div>
                            <h4 className="text-xs font-black text-text-main uppercase tracking-tighter mb-1">Upload Brand Banner</h4>
                            <p className="text-[9px] font-bold text-text-muted uppercase opacity-40">Dimensions 1920x480 Recommended</p>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleBannerFileChange}
                            />
                        </label>
                    </div>
                    )}

                    {bannerPreview && (
                        <div className="w-full space-y-4 px-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">Opacity Control</span>
                                <span className="text-xs font-black text-primary">{localSettings.bannerOpacity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={localSettings.bannerOpacity}
                                onChange={(e) => handleChange("bannerOpacity", parseInt(e.target.value))}
                                className="w-full h-1.5 bg-foreground/10 rounded-full appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Aesthetics */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em]">Component Aesthetics</span>
            <div className="h-[1px] flex-1 bg-border-subtle opacity-30" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {styleOptions.map((style) => {
            const isActive = localSettings.cardStyle === style.id;
            return (
                <button
                key={style.id}
                onClick={() => handleChange("cardStyle", style.id)}
                className={`group p-6 rounded-[2.5rem] border-2 text-left transition-all duration-500 relative overflow-hidden flex items-start gap-4 ${
                    isActive
                    ? "border-primary bg-white dark:bg-primary/5 shadow-2xl shadow-primary/10 ring-4 ring-primary/5"
                    : "border-border-subtle bg-foreground/5 hover:border-primary/40"
                }`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${
                        isActive ? "bg-primary text-white shadow-glow shadow-primary/40" : "bg-foreground/10 text-text-muted opacity-50 group-hover:scale-110"
                    }`}>
                        {style.icon}
                    </div>
                    <div className="flex-1">
                        <h5 className={`text-sm font-black tracking-tight mb-1 transition-colors ${isActive ? "text-primary" : "text-text-main"}`}>
                            {style.name}
                        </h5>
                        <p className="text-[10px] text-text-muted font-bold leading-tight opacity-50">
                            {style.desc}
                        </p>
                    </div>
                    {isActive && (
                        <div className="absolute top-4 right-6 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    )}
                </button>
            )
          })}
        </div>
      </div>

       {/* Security/Access Status - Read Only Visual */}
       <div className="p-8 glass rounded-[2.5rem] border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-center sm:text-left">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl shadow-glow shadow-primary/20">
                    <FaMagic className="animate-pulse" />
                </div>
                <div>
                     <h4 className="text-base font-black text-text-main italic">Real-time Designer Engine</h4>
                     <p className="text-[10px] font-black text-text-muted uppercase tracking-widest opacity-50 max-w-xs">All branding changes are synchronized instantly with your public profile.</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-foreground/10 flex items-center justify-center text-[10px] font-black" style={{ transform: `scale(${1 - i/10})` }}>
                            {i}
                        </div>
                    ))}
                 </div>
                 <span className="text-[9px] font-black text-primary uppercase tracking-widest">Multi-Device Sync Active</span>
            </div>
       </div>

    </div>
  );
};

export default ThemeEditor;
