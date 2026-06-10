import React from "react";
import { Palette, Type, Layout, Maximize2, MousePointer2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../../features/resume/resumeSlice";

const ResumeDesignerView = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  const fonts = ["Inter", "Roboto", "Outfit", "Plus Jakarta Sans", "Playfair Display"];
  const colors = ["#0F172A", "#2563EB", "#059669", "#7C3AED", "#DB2777", "#D97706"];

  const updateStyle = (field, value) => {
    dispatch(setResumeField({ field, value }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tighter capitalize text-white">Designer Studio</h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Customize your visual professional identity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Typography */}
        <div className="bg-bg-secondary border border-white/5 rounded-3xl p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <Type size={18} className="text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Typography</h3>
           </div>
           <div className="space-y-3">
              {fonts.map(font => (
                <button 
                  key={font}
                  onClick={() => updateStyle("fontFamily", font)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border transition-all ${currentResume?.fontFamily === font ? "border-primary bg-primary/5 ring-2 ring-primary/10 text-white" : "border-white/5 hover:bg-white/5 text-slate-300"}`}
                  style={{ fontFamily: font }}
                >
                  <span className="text-sm font-bold">{font}</span>
                </button>
              ))}
           </div>
        </div>

        {/* Color Palette */}
        <div className="bg-bg-secondary border border-white/5 rounded-3xl p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <Palette size={18} className="text-primary" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Theme Color</h3>
           </div>
           <div className="grid grid-cols-3 gap-4">
              {colors.map(color => (
                <button 
                  key={color}
                  onClick={() => updateStyle("themeColor", color)}
                  className={`h-20 rounded-2xl border-4 transition-all ${currentResume?.themeColor === color ? "border-white shadow-xl scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
           </div>

           <div className="mt-12 space-y-6">
              <div className="space-y-4">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Name Size</span>
                    <span>{currentResume?.nameSize}px</span>
                 </div>
                 <input 
                    type="range" min="18" max="42" 
                    value={currentResume?.nameSize || 24}
                    onChange={(e) => updateStyle("nameSize", parseInt(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-slate-900 rounded-full appearance-none cursor-pointer"
                 />
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Page Margins</span>
                    <span>{currentResume?.margin}px</span>
                 </div>
                 <input 
                    type="range" min="5" max="40" 
                    value={currentResume?.margin || 15}
                    onChange={(e) => updateStyle("margin", parseInt(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-slate-900 rounded-full appearance-none cursor-pointer"
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDesignerView;
