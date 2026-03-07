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
      bodyBg: "#0f172a",
      cardStyle: "glass",
      fontPrimary: "Inter",
      bannerUrl: "",
      bannerOpacity: 95,
    },
  );

  const handleChange = (field, value) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
  };

  const handleApply = () => {
    onUpdate(localSettings, bannerFile);
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
    "Space Grotesk",
    "Playfair Display",
  ];

  const styleOptions = [
    { id: "minimal", name: "Minimalist", desc: "Clean, flat backgrounds" },
    { id: "glass", name: "Glassmorphism", desc: "Frosted glass effects" },
    { id: "classic", name: "Classic", desc: "Solid cards with shadows" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colors */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
            <FaPalette className="text-action" /> Brand Identity Colors
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-foreground/5 rounded-2xl border border-border-subtle">
              <span className="text-[9px] font-bold text-text-muted block mb-2 uppercase">
                Hero Gradient / Accents
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={localSettings.headerBg}
                  onChange={(e) => handleChange("headerBg", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={localSettings.headerBg}
                  onChange={(e) => handleChange("headerBg", e.target.value)}
                  className="text-xs font-mono bg-transparent border-b border-border-subtle outline-none w-20"
                />
              </div>
            </div>
            <div className="p-4 bg-foreground/5 rounded-2xl border border-border-subtle">
              <span className="text-[9px] font-bold text-text-muted block mb-2 uppercase">
                Page Background
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={localSettings.bodyBg}
                  onChange={(e) => handleChange("bodyBg", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent"
                />
                <input
                  type="text"
                  value={localSettings.bodyBg}
                  onChange={(e) => handleChange("bodyBg", e.target.value)}
                  className="text-xs font-mono bg-transparent border-b border-border-subtle outline-none w-20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
            <FaFont className="text-violet-500" /> Typography Style
          </label>
          <div className="p-4 bg-foreground/5 rounded-2xl border border-border-subtle">
            <select
              value={localSettings.fontPrimary}
              onChange={(e) => handleChange("fontPrimary", e.target.value)}
              className="w-full bg-transparent text-sm font-semibold outline-none cursor-pointer"
            >
              {fontOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <p className="text-[9px] text-text-muted mt-2 font-medium">
              This font will be applied to headings and body text.
            </p>
          </div>
        </div>
      </div>

      {/* Card Style Selector */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
          <FaLayerGroup className="text-amber-500" /> Component Aesthetics
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {styleOptions.map((style) => (
            <button
              key={style.id}
              onClick={() => handleChange("cardStyle", style.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                localSettings.cardStyle === style.id
                  ? "border-action bg-action/5 shadow-lg shadow-action/10"
                  : "border-border-subtle bg-foreground/5 hover:border-action/30"
              }`}
            >
              <h5 className="text-xs font-black text-text-primary mb-1">
                {style.name}
              </h5>
              <p className="text-[9px] text-text-muted font-bold leading-tight">
                {style.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Banner Upload Mockup (Integration Point) */}
      <div className="space-y-4">
        <label className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
          <FaImage className="text-emerald-500" /> Custom Background Banner
        </label>
        <div className="p-6 bg-foreground/5 rounded-3xl border-2 border-dashed border-border-subtle group hover:border-action/50 transition-all">
          <div className="flex flex-col items-center justify-center text-center">
            {localSettings.bannerUrl ? (
              <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-4 border border-border-subtle">
                <img
                  src={localSettings.bannerUrl}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                  style={{ opacity: localSettings.bannerOpacity / 100 }}
                />
                <button
                  onClick={() => handleChange("bannerUrl", "")}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-xl text-xs hover:scale-110 transition-transform"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="mb-4">
                <div className="w-12 h-12 bg-action/10 rounded-2xl flex items-center justify-center text-action mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <FaImage size={20} />
                </div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-tighter">
                  Upload high-res banner (1920x400)
                </p>
              </div>
            )}

            <input
              type="text"
              placeholder="Or paste image URL (Cloudinary Integration Ready)"
              value={localSettings.bannerUrl}
              onChange={(e) => handleChange("bannerUrl", e.target.value)}
              className="w-full max-w-md px-4 py-2 bg-white dark:bg-midnight rounded-xl border border-border-subtle text-xs outline-none focus:border-action"
            />
          </div>

          {localSettings.bannerUrl && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-text-muted uppercase">
                  Banner Opacity
                </span>
                <span className="text-xs font-black text-action">
                  {localSettings.bannerOpacity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={localSettings.bannerOpacity}
                onChange={(e) =>
                  handleChange("bannerOpacity", parseInt(e.target.value))
                }
                className="w-full h-1.5 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-action"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleApply}
          disabled={saving}
          className="px-8 py-3 bg-action hover:bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-action/20 active:scale-[0.98] disabled:opacity-50"
        >
          {saving ? "Applying..." : "Apply Transformations"}
        </button>
      </div>
    </div>
  );
};

export default ThemeEditor;
