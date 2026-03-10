import React, { useState } from "react";
import {
  FaPalette,
  FaFont,
  FaFillDrip,
  FaImage,
  FaLayerGroup,
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
  React.useEffect(() => {
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

  // Removed manual apply for global sync flow

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
    },
    {
      name: "Midnight Dev",
      headerBg: "#0f172a",
      headerBgSecondary: "#1e293b",
      bodyBg: "#020617",
      fontPrimary: "JetBrains Mono",
      cardStyle: "minimal",
      icon: "🌙",
    },
    {
      name: "Corporate Gold",
      headerBg: "#1e3a8a",
      headerBgSecondary: "#1e40af",
      bodyBg: "#ffffff",
      fontPrimary: "Outfit",
      cardStyle: "classic",
      icon: "🏢",
    },
    {
      name: "Creative Sunset",
      headerBg: "#f97316",
      headerBgSecondary: "#db2777",
      bodyBg: "#fff7ed",
      fontPrimary: "Poppins",
      cardStyle: "glass",
      icon: "🌅",
    },
    {
      name: "Slate Minimalist",
      headerBg: "#475569",
      headerBgSecondary: "#64748b",
      bodyBg: "#f1f5f9",
      fontPrimary: "Roboto",
      cardStyle: "minimal",
      icon: "🎨",
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
    { id: "minimal", name: "Minimalist", desc: "Clean, flat backgrounds" },
    { id: "glass", name: "Glassmorphism", desc: "Frosted glass effects" },
    { id: "classic", name: "Classic", desc: "Solid cards with shadows" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── One-Click Presets ── */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-action/10 rounded-lg flex items-center justify-center">
            <FaFillDrip className="text-action text-[10px]" />
          </div>
          One-Click Theme Presets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className={`group p-4 bg-white dark:bg-black/20 rounded-3xl border-2 transition-all flex flex-col items-center justify-center text-center gap-2 hover:shadow-xl hover:shadow-action/5 ${
                localSettings.name === p.name
                  ? "border-action bg-action/5"
                  : "border-border-subtle hover:border-action/30"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-tight text-text-primary">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colors Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-action/10 rounded-lg flex items-center justify-center">
              <FaPalette className="text-action text-[10px]" />
            </div>
            Brand Identity Colors
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-black/20 rounded-[2rem] border-2 border-border-subtle flex flex-col gap-2">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-tight">
                Hero Gradient Primary
              </span>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-border-subtle">
                  <input
                    type="color"
                    value={localSettings.headerBg}
                    onChange={(e) => handleChange("headerBg", e.target.value)}
                    className="absolute inset-x-[-50%] inset-y-[-50%] w-[200%] h-[200%] cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={localSettings.headerBg}
                  onChange={(e) => handleChange("headerBg", e.target.value)}
                  className="text-xs font-black bg-transparent border-b-2 border-border-subtle focus:border-action outline-none w-20 py-1"
                />
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-black/20 rounded-[2rem] border-2 border-border-subtle flex flex-col gap-2">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-tight">
                Hero Gradient Secondary
              </span>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-border-subtle">
                  <input
                    type="color"
                    value={localSettings.headerBgSecondary}
                    onChange={(e) =>
                      handleChange("headerBgSecondary", e.target.value)
                    }
                    className="absolute inset-x-[-50%] inset-y-[-50%] w-[200%] h-[200%] cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={localSettings.headerBgSecondary}
                  onChange={(e) =>
                    handleChange("headerBgSecondary", e.target.value)
                  }
                  className="text-xs font-black bg-transparent border-b-2 border-border-subtle focus:border-action outline-none w-20 py-1"
                />
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-black/20 rounded-[2rem] border-2 border-border-subtle flex flex-col gap-2">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-tight">
                Primary Accent
              </span>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-border-subtle">
                  <input
                    type="color"
                    value={localSettings.accentColor || "#2563eb"}
                    onChange={(e) =>
                      handleChange("accentColor", e.target.value)
                    }
                    className="absolute inset-x-[-50%] inset-y-[-50%] w-[200%] h-[200%] cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={localSettings.accentColor || "#2563eb"}
                  onChange={(e) => handleChange("accentColor", e.target.value)}
                  className="text-xs font-black bg-transparent border-b-2 border-border-subtle focus:border-action outline-none w-20 py-1"
                />
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-black/20 rounded-[2rem] border-2 border-border-subtle flex flex-col gap-2">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-tight">
                Main Text (Heading)
              </span>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-border-subtle">
                  <input
                    type="color"
                    value={localSettings.textPrimary || "#ffffff"}
                    onChange={(e) =>
                      handleChange("textPrimary", e.target.value)
                    }
                    className="absolute inset-x-[-50%] inset-y-[-50%] w-[200%] h-[200%] cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={localSettings.textPrimary || "#ffffff"}
                  onChange={(e) => handleChange("textPrimary", e.target.value)}
                  className="text-xs font-black bg-transparent border-b-2 border-border-subtle focus:border-action outline-none w-20 py-1"
                />
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-black/20 rounded-[2rem] border-2 border-border-subtle flex flex-col gap-2">
              <span className="text-[9px] font-black text-text-muted uppercase tracking-tight">
                Muted Text (Body)
              </span>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-border-subtle">
                  <input
                    type="color"
                    value={localSettings.textSecondary || "#94a3b8"}
                    onChange={(e) =>
                      handleChange("textSecondary", e.target.value)
                    }
                    className="absolute inset-x-[-50%] inset-y-[-50%] w-[200%] h-[200%] cursor-pointer"
                  />
                </div>
                <input
                  type="text"
                  value={localSettings.textSecondary || "#94a3b8"}
                  onChange={(e) =>
                    handleChange("textSecondary", e.target.value)
                  }
                  className="text-xs font-black bg-transparent border-b-2 border-border-subtle focus:border-action outline-none w-20 py-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-action/10 rounded-lg flex items-center justify-center">
              <FaFont className="text-violet-500 text-[10px]" />
            </div>
            Typography Style
          </label>
          <div className="p-8 bg-white dark:bg-black/20 rounded-[2.5rem] border-2 border-border-subtle h-fit min-h-[180px] flex flex-col justify-center gap-4">
            <div className="relative">
              <select
                value={localSettings.fontPrimary}
                onChange={(e) => handleChange("fontPrimary", e.target.value)}
                className="w-full bg-foreground/5 p-4 rounded-2xl text-lg font-black outline-none cursor-pointer appearance-none border-2 border-transparent focus:border-action"
              >
                {fontOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                ▼
              </div>
            </div>
            <p className="text-[10px] text-text-muted font-bold tracking-tight">
              This font will be applied to headings and body text.
            </p>
          </div>
        </div>
      </div>

      {/* Component Aesthetics */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-action/10 rounded-lg flex items-center justify-center">
            <FaLayerGroup className="text-amber-500 text-[10px]" />
          </div>
          Component Aesthetics
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {styleOptions.map((style) => (
            <button
              key={style.id}
              onClick={() => handleChange("cardStyle", style.id)}
              className={`p-6 rounded-[2.5rem] border-2 text-left transition-all relative overflow-hidden ${
                localSettings.cardStyle === style.id
                  ? "border-action bg-white dark:bg-black/20 ring-4 ring-action/5 shadow-2xl"
                  : "border-border-subtle bg-foreground/5 hover:border-action/30"
              }`}
            >
              <h5 className="text-sm font-black text-text-primary mb-1">
                {style.name}
              </h5>
              <p className="text-[10px] text-text-muted font-black leading-tight opacity-70">
                {style.desc}
              </p>
              {localSettings.cardStyle === style.id && (
                <div className="absolute top-4 right-6 w-2 h-2 rounded-full bg-action animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Banner Upload Section */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-action/10 rounded-lg flex items-center justify-center">
            <FaImage className="text-emerald-500 text-[10px]" />
          </div>
          Custom Background Banner
        </label>
        <div className="p-8 bg-white dark:bg-black/20 rounded-[2.5rem] border-2 border-dashed border-border-subtle group hover:border-action/50 transition-all">
          <div className="flex flex-col items-center justify-center text-center">
            {bannerPreview ? (
              <div className="relative w-full max-w-2xl h-48 rounded-[2.5rem] overflow-hidden mb-6 border-2 border-border-subtle shadow-2xl">
                <img
                  src={bannerPreview}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                  style={{ opacity: localSettings.bannerOpacity / 100 }}
                />
                <button
                  onClick={() => {
                    setBannerPreview("");
                    setBannerFile(null);
                    handleChange("bannerUrl", "");
                  }}
                  className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="mb-6 w-full py-10">
                <label className="cursor-pointer block">
                  <div className="w-16 h-16 bg-action/10 rounded-3xl flex items-center justify-center text-action mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <FaImage size={24} />
                  </div>
                  <h4 className="text-xs font-black text-text-primary uppercase tracking-tighter mb-1">
                    Click to upload banner
                  </h4>
                  <p className="text-[9px] font-bold text-text-muted uppercase opacity-60">
                    Recommended: 1920x480 (Under 5MB)
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleBannerFileChange}
                  />
                </label>
              </div>
            )}

            {!bannerFile && (
              <div className="w-full max-w-md relative group">
                <input
                  type="text"
                  placeholder="Or paste image URL"
                  value={
                    localSettings.bannerUrl === "PREVIEW"
                      ? ""
                      : localSettings.bannerUrl
                  }
                  onChange={(e) => {
                    setBannerPreview(e.target.value);
                    handleChange("bannerUrl", e.target.value);
                  }}
                  className="w-full px-6 py-4 bg-foreground/5 rounded-2xl border-2 border-transparent focus:border-action text-xs font-bold outline-none transition-all pr-12"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted opacity-40">
                  🔗
                </div>
              </div>
            )}
          </div>

          {bannerPreview && (
            <div className="mt-8 space-y-4 max-w-xl mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                  Banner Opacity
                </span>
                <span className="text-sm font-black text-action">
                  {localSettings.bannerOpacity}%
                </span>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localSettings.bannerOpacity}
                  onChange={(e) =>
                    handleChange("bannerOpacity", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-foreground/10 rounded-full appearance-none cursor-pointer accent-action"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Removed Apply button for unified save flow */}

    </div>
  );
};

export default ThemeEditor;
