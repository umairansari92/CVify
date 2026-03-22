import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";

const colors = [
  { name: "Midnight", value: "#0f172a" },
  { name: "Royal", value: "#1e40af" },
  { name: "Emerald", value: "#065f46" },
  { name: "Wine", value: "#7f1d1d" },
  { name: "Slate", value: "#475569" },
  { name: "Ocean", value: "#0369a1" },
  { name: "Plum", value: "#581c87" },
  { name: "Chocolate", value: "#451a03" },
];

const fonts = [
  { id: "Inter", name: "Modern Sans (Inter)", family: "'Inter', sans-serif" },
  {
    id: "Manrope",
    name: "Geometric (Manrope)",
    family: "'Manrope', sans-serif",
  },
  {
    id: "Playfair Display",
    name: "Elegant Serif (Playfair)",
    family: "'Playfair Display', serif",
  },
  {
    id: "Public Sans",
    name: "Corporate (Public Sans)",
    family: "'Public Sans', sans-serif",
  },
];

const StyleSettings = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  const themeColor = currentResume?.themeColor || "#0f172a";
  const fontFamily = currentResume?.fontFamily || "Inter";

  const handleColorChange = (color) => {
    dispatch(setResumeField({ field: "themeColor", value: color }));
  };

  const handleFontChange = (fontId) => {
    dispatch(setResumeField({ field: "fontFamily", value: fontId }));
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Accent Color Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-4">
          Personal Branding Color
          <span className="flex-1 h-px bg-border-subtle"></span>
        </h3>
        <p className="text-sm text-text-muted font-medium mb-4">
          Choose a primary color that reflects your professional personality.
          This will be used for headings, borders, and accents.
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-9 gap-4">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => handleColorChange(c.value)}
              className={`w-full aspect-square rounded-xl border-[3px] transition-all duration-300 relative group
                ${themeColor === c.value ? "border-primary scale-110 shadow-lg shadow-primary/20" : "border-background hover:border-primary/30"}`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            >
              {themeColor === c.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"></div>
                </div>
              )}
            </button>
          ))}
          {/* Custom Hex Input */}
          <div className="col-span-2 flex items-center gap-3 ml-2">
            <input
              type="color"
              value={themeColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={themeColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="input-premium py-2 px-3 text-xs font-mono uppercase w-24"
            />
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="space-y-8 pt-6">
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-4">
          Professional Typography
          <span className="flex-1 h-px bg-border-subtle"></span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fonts.map((f) => (
            <button
              key={f.id}
              onClick={() => handleFontChange(f.id)}
              className={`p-6 rounded-3xl border-2 text-left transition-all duration-300 group
                ${fontFamily === f.id ? "border-primary bg-primary/5 shadow-premium" : "border-border-subtle hover:border-primary/30"}`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`text-sm font-black uppercase tracking-widest ${fontFamily === f.id ? "text-primary" : "text-text-muted"}`}>
                  {f.name}
                </span>
                {fontFamily === f.id && <FiCheck className="text-white bg-primary p-1 rounded-full w-5 h-5 shadow-sm" />}
              </div>
              <div
                className={`text-xl font-bold truncate ${fontFamily === f.id ? "text-text-primary" : "text-text-muted/70 group-hover:text-text-primary"}`}
                style={{ fontFamily: f.family }}
              >
                The quick brown fox jumps...
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Granular Layout Controls */}
      <div className="space-y-8 pt-6">
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] flex items-center gap-4">
          Layout & Spacing
          <span className="flex-1 h-px bg-border-subtle"></span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Name Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Name Font Size</label>
              <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">{currentResume?.nameSize || 24}pt</span>
            </div>
            <input 
              type="range" min="18" max="42" step="1"
              value={currentResume?.nameSize || 24}
              onChange={(e) => dispatch(setResumeField({ field: "nameSize", value: parseInt(e.target.value) }))}
              className="w-full accent-primary h-1 bg-foreground/10 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Heading Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Section Headings</label>
              <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">{currentResume?.headingSize || 16}pt</span>
            </div>
            <input 
              type="range" min="12" max="22" step="1"
              value={currentResume?.headingSize || 16}
              onChange={(e) => dispatch(setResumeField({ field: "headingSize", value: parseInt(e.target.value) }))}
              className="w-full accent-primary h-1 bg-foreground/10 rounded-full appearance-none cursor-pointer"
            />
          </div>

          {/* Body Font Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Body Text Size</label>
              <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">{currentResume?.bodySize || 10}pt</span>
            </div>
            <input 
              type="range" min="8" max="14" step="0.5"
              value={currentResume?.bodySize || 10}
              onChange={(e) => dispatch(setResumeField({ field: "bodySize", value: parseFloat(e.target.value) }))}
              className="w-full accent-primary h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Page Margins */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Page Margins (mm)</label>
              <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-lg border border-primary/10">{currentResume?.margin || 15}mm</span>
            </div>
            <input 
              type="range" min="5" max="30" step="1"
              value={currentResume?.margin || 15}
              onChange={(e) => dispatch(setResumeField({ field: "margin", value: parseInt(e.target.value) }))}
              className="w-full accent-primary h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSettings;

// Import missing icon at top
import { FiCheck } from "react-icons/fi";
