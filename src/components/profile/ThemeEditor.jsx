import React, { useState, useEffect } from "react";
import {
  FaPalette,
  FaMagic,
  FaCheck,
  FaChevronDown,
  FaImage,
  FaBolt,
  FaMoon,
  FaCity,
  FaSun,
  FaLeaf,
  FaFont,
  FaAdjust
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
      name: "CVIFY CLASSIC",
      icon: <FaBolt className="text-yellow-400" />,
      settings: {
        headerBg: "#2563eb",
        headerBgSecondary: "#9333ea",
        bodyBg: "#f8fafc",
        accentColor: "#2563eb",
        textPrimary: "#0f172a",
        textSecondary: "#64748b",
        cardStyle: "glass",
        fontPrimary: "Inter",
      },
    },
    {
      id: "midnight",
      name: "MIDNIGHT DEV",
      icon: <FaMoon className="text-blue-400" />,
      settings: {
        headerBg: "#0f172a",
        headerBgSecondary: "#1e293b",
        bodyBg: "#020617",
        accentColor: "#38bdf8",
        textPrimary: "#f8fafc",
        textSecondary: "#94a3b8",
        cardStyle: "minimal",
        fontPrimary: "JetBrains Mono",
      },
    },
    {
      id: "corporate",
      name: "CORPORATE GOLD",
      icon: <FaCity className="text-amber-600" />,
      settings: {
        headerBg: "#1e3a8a",
        headerBgSecondary: "#1e40af",
        bodyBg: "#ffffff",
        accentColor: "#d97706",
        textPrimary: "#1e293b",
        textSecondary: "#475569",
        cardStyle: "classic",
        fontPrimary: "Outfit",
      },
    },
    {
      id: "creative",
      name: "CREATIVE SUNSET",
      icon: <FaSun className="text-orange-500" />,
      settings: {
        headerBg: "#f97316",
        headerBgSecondary: "#db2777",
        bodyBg: "#fff7ed",
        accentColor: "#e11d48",
        textPrimary: "#431407",
        textSecondary: "#9a3412",
        cardStyle: "glass",
        fontPrimary: "Poppins",
      },
    },
    {
      id: "slate",
      name: "SLATE MINIMALIST",
      icon: <FaPalette className="text-slate-500" />,
      settings: {
        headerBg: "#475569",
        headerBgSecondary: "#64748b",
        bodyBg: "#f1f5f9",
        accentColor: "#0f172a",
        textPrimary: "#334155",
        textSecondary: "#64748b",
        cardStyle: "minimal",
        fontPrimary: "Roboto",
      },
    },
    {
      id: "emerald",
      name: "EMERALD LEADER",
      icon: <FaLeaf className="text-emerald-500" />,
      settings: {
        headerBg: "#059669",
        headerBgSecondary: "#10b981",
        bodyBg: "#f0fdf4",
        accentColor: "#059669",
        textPrimary: "#064e3b",
        textSecondary: "#065f46",
        cardStyle: "classic",
        fontPrimary: "Montserrat",
      },
    },
    {
      id: "ahmedraza",
      name: "AHMED RAZA PORTFOLIO",
      icon: <span className="text-2xl">🕌</span>,
      settings: {
        headerBg: "#101010",
        headerBgSecondary: "#181818",
        bodyBg: "#090909",
        accentColor: "#b58953",
        textPrimary: "#ffffff",
        textSecondary: "#a3a3a3",
        cardStyle: "glass",
        fontPrimary: "Outfit",
      },
    },
  ];

  const paletteItems = [
    { label: "HERO GRADIENT PRIMARY", key: "headerBg" },
    { label: "HERO GRADIENT SECONDARY", key: "headerBgSecondary" },
    { label: "PRIMARY ACCENT", key: "accentColor" },
    { label: "MAIN TEXT (HEADING)", key: "textPrimary" },
    { label: "MUTED TEXT (BODY)", key: "textSecondary" },
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
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* --- Section 1: One-Click Presets --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
            <FaMagic className="text-blue-500 text-xs" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">One-Click Theme Presets</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {presets.map((p) => {
            const isActive = localSettings.headerBg === p.settings.headerBg;
            return (
              <button
                key={p.id}
                onClick={() => {
                  const updated = { ...localSettings, ...p.settings };
                  setLocalSettings(updated);
                  onUpdate(updated, bannerFile);
                  toast.success(`${p.name} Applied`);
                }}
                className={`group relative p-6 bg-white border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 rounded-[2rem] ${
                  isActive
                    ? "border-blue-500 shadow-xl shadow-blue-500/10"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter text-center leading-tight">
                  {p.name}
                </span>
                <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest opacity-40">
                   {p.settings.cardStyle}
                </span>
                {isActive && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px]">
                        <FaCheck />
                    </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* --- Section 2: Brand Identity Colors --- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <FaPalette className="text-blue-500 text-xs" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Brand Identity Colors</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paletteItems.map((item) => (
              <div
                key={item.key}
                className="p-5 bg-white rounded-[2rem] border border-slate-100 flex flex-col gap-3 shadow-sm hover:border-blue-200 transition-colors"
              >
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                  {item.label}
                </span>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-200">
                    <input
                      type="color"
                      value={localSettings[item.key] || "#000000"}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer"
                    />
                  </div>
                  <span className="text-sm font-black text-slate-900 uppercase tracking-tighter font-mono">
                    {localSettings[item.key]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Section 3: Typography Style --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-black">A</div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Typography Style</span>
          </div>
          <div className="p-10 bg-white rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center space-y-8 shadow-sm h-[300px]">
              <div className="relative w-full">
                <select
                    value={localSettings.fontPrimary}
                    onChange={(e) => handleChange("fontPrimary", e.target.value)}
                    className="w-full bg-slate-50 p-6 rounded-[2rem] text-3xl font-black outline-none cursor-pointer appearance-none border border-slate-200 focus:border-blue-500 transition-all text-slate-900 text-center pr-12"
                    style={{ fontFamily: localSettings.fontPrimary }}
                >
                    {fontOptions.map((f) => (
                    <option key={f} value={f} style={{ fontFamily: f }}>
                        {f}
                    </option>
                    ))}
                </select>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <FaChevronDown />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold text-center leading-relaxed">
                  This font will be applied to headings and body text.
              </p>
          </div>
        </div>
      </div>

      {/* --- Section 4: Component Aesthetics --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
            <FaAdjust className="text-blue-500 text-xs" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Component Aesthetics</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { id: "minimal", name: "Minimalist", desc: "Clean, flat backgrounds" },
            { id: "glass", name: "Glassmorphism", desc: "Frosted glass effects" },
            { id: "classic", name: "Classic", desc: "Solid cards with shadows" },
          ].map((style) => {
            const isActive = localSettings.cardStyle === style.id;
            return (
                <button
                    key={style.id}
                    onClick={() => handleChange("cardStyle", style.id)}
                    className={`p-10 rounded-[3rem] border-2 text-center transition-all duration-300 relative flex flex-col items-center justify-center gap-2 ${
                        isActive
                        ? "border-blue-500 bg-white shadow-xl shadow-blue-500/10"
                        : "border-slate-100 bg-slate-50 hover:border-slate-200"
                    }`}
                >
                    <h5 className="text-xl font-black text-slate-900">
                        {style.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-bold opacity-60">
                        {style.desc}
                    </p>
                    {isActive && (
                        <div className="absolute top-6 right-8 w-2 h-2 rounded-full bg-blue-500" />
                    )}
                </button>
            )
          })}
        </div>
      </div>

       {/* Banner Backdrop Section (Bottom for less clutter) */}
       <div className="pt-12 border-t border-slate-100">
           <div className="flex items-center gap-3 mb-6">
                <FaImage className="text-blue-500 text-xs" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hero Backdrop</span>
           </div>
           <div className="p-10 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center transition-all hover:bg-white hover:border-blue-200 relative group overflow-hidden">
                {bannerPreview ? (
                    <div className="relative w-full h-40 rounded-[2rem] overflow-hidden">
                        <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" style={{ opacity: localSettings.bannerOpacity / 100 }} />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={() => { setBannerPreview(""); setBannerFile(null); handleChange("bannerUrl", ""); }} className="bg-red-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Remove Banner</button>
                        </div>
                    </div>
                ) : (
                    <label className="cursor-pointer block py-4">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-4">
                            <FaImage size={24} />
                        </div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">Set Background Banner</h4>
                        <input type="file" className="hidden" accept="image/*" onChange={handleBannerFileChange} />
                    </label>
                )}
           </div>
       </div>
    </div>
  );
};

export default ThemeEditor;
