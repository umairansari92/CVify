import React, { useState, useEffect } from "react";
import {
  FaPalette,
  FaMagic,
  FaCheck,
  FaGem,
  FaCircle,
  FaChevronDown,
  FaImage,
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
      handleChange("bannerUrl", "PREVIEW");
    }
  };

  const presets = [
    {
      id: "classic",
      name: "CLASSIC",
      icon: <FaMagic className="text-yellow-400" />,
      settings: {
        headerBg: "#2563eb",
        headerBgSecondary: "#9333ea",
        bodyBg: "#f8fafc",
        accentColor: "#2563eb",
        textPrimary: "#0f172a",
        textSecondary: "#64748b",
        cardStyle: "glass",
      },
    },
    {
      id: "executive",
      name: "EXECUTIVE",
      icon: <FaGem className="text-blue-400" />,
      settings: {
        headerBg: "#0f172a",
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
        headerBg: "#475569",
        headerBgSecondary: "#64748b",
        bodyBg: "#f1f5f9",
        accentColor: "#0f172a",
        textPrimary: "#334155",
        textSecondary: "#64748b",
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

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-4 pb-8 border-b border-white/5">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-[#2563eb] rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FaPalette className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-text-main tracking-widest leading-none italic font-outfit uppercase">
              Visual Builder
            </h2>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mt-2 opacity-60">
              Design System V4.1
            </p>
          </div>
        </div>
        {saving && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full shadow-inner">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow shadow-primary/50" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Syncing Reality
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        <div className="xl:col-span-12 space-y-12">
          {/* Style Presets */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FaMagic className="text-primary text-xs" />
              <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.5em]">
                Style Presets
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {presets.map((p) => {
                const isActive = localSettings.headerBg === p.settings.headerBg;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      const updated = { ...localSettings, ...p.settings };
                      setLocalSettings(updated);
                      onUpdate(updated, bannerFile);
                      toast.success(`Active Preset: ${p.name}`);
                    }}
                    className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center justify-center gap-5 ${
                      isActive
                        ? "bg-primary/5 border-primary shadow-2xl shadow-primary/10 scale-[1.02]"
                        : "bg-foreground/5 border-transparent hover:border-white/10 hover:scale-[1.01]"
                    }`}
                  >
                    <div className="text-4xl mb-1 filter drop-shadow-xl group-hover:rotate-6 transition-transform duration-500">
                      {p.icon}
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                        isActive ? "text-primary" : "text-text-muted"
                      }`}
                    >
                      {p.name}
                    </span>
                    {isActive && (
                      <div className="absolute top-4 right-6 w-2 h-2 bg-primary rounded-full shadow-glow shadow-primary/50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Brand Palette */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <FaPalette className="text-primary text-xs" />
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.5em]">
                  Brand Palette
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {paletteItems.map((item) => (
                  <div
                    key={item.key}
                    className="p-6 bg-foreground/5 rounded-[2rem] border border-white/5 group hover:border-primary/30 transition-all flex flex-col gap-4 shadow-sm"
                  >
                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest opacity-60">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-5">
                      <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-inner-xl border border-white/10 ring-1 ring-inset ring-white/5 group-hover:scale-105 transition-transform">
                        <input
                          type="color"
                          value={localSettings[item.key] || "#000000"}
                          onChange={(e) => handleChange(item.key, e.target.value)}
                          className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer"
                        />
                      </div>
                      <span className="text-xs font-black text-text-main uppercase tracking-widest font-mono">
                        {localSettings[item.key]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Controls */}
            <div className="space-y-10">
              {/* Typography */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.5em]">
                    Typography
                  </span>
                </div>
                <div className="relative group">
                  <select
                    value={localSettings.fontPrimary}
                    onChange={(e) => handleChange("fontPrimary", e.target.value)}
                    className="w-full bg-foreground/5 p-8 rounded-[2rem] text-2xl font-black outline-none cursor-pointer appearance-none border-2 border-white/5 focus:border-primary transition-all pr-16 text-text-main font-outfit shadow-sm"
                    style={{ fontFamily: localSettings.fontPrimary }}
                  >
                    {fontOptions.map((f) => (
                      <option key={f} value={f} style={{ fontFamily: f }} className="bg-midground">
                        {f}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                    <FaChevronDown />
                  </div>
                </div>
              </div>

              {/* Banner Upload */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.5em]">
                    Hero Backdrop
                  </span>
                </div>
                <div className="p-8 bg-foreground/5 rounded-[2.5rem] border-2 border-dashed border-white/10 group hover:border-primary/50 transition-all duration-500 shadow-sm">
                  {bannerPreview ? (
                    <div className="relative w-full h-32 rounded-[1.5rem] overflow-hidden group shadow-xl ring-1 ring-white/10">
                      <img
                        src={bannerPreview}
                        alt="Banner"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ opacity: localSettings.bannerOpacity / 100 }}
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => {
                            setBannerPreview("");
                            setBannerFile(null);
                            handleChange("bannerUrl", "");
                          }}
                          className="bg-red-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
                        >
                          Erase Banner
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center py-6 group">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-glow shadow-primary/20">
                        <FaImage size={24} />
                      </div>
                      <span className="text-xs font-black text-text-main uppercase tracking-widest mb-1">
                        Upload Identity Banner
                      </span>
                      <span className="text-[9px] font-bold text-text-muted uppercase opacity-40">
                        HD (1920x480) Optimal
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleBannerFileChange}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Footer Status */}
       <div className="p-10 bg-[#2563eb]/5 border border-[#2563eb]/10 rounded-[3rem] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mt-12 transition-all hover:bg-[#2563eb]/10">
            <div className="flex items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-3xl shadow-glow shadow-primary/30">
                    <FaMagic className={saving ? "animate-spin" : "animate-bounce"} />
                </div>
                <div>
                     <h4 className="text-xl font-black text-text-main tracking-tight uppercase italic">Visual Master Engine</h4>
                     <p className="text-xs font-bold text-text-muted opacity-60 max-w-sm leading-relaxed mt-1">Design System V4.1 — All changes are synchronized in real-time across your global professional network.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
                 <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1a1c22] bg-[#2563eb]/20 flex items-center justify-center text-[10px] font-black text-primary shadow-lg" style={{ transform: `scale(${1 - i/10})` }}>
                            {i}
                        </div>
                    ))}
                 </div>
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest px-2">Design Shield Active</span>
            </div>
       </div>
    </div>
  );
};

export default ThemeEditor;
