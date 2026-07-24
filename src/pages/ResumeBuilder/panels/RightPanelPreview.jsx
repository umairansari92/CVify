import React, { useState, startTransition } from "react";
import { Maximize2, ZoomIn, ZoomOut, Monitor, Tablet, Smartphone, FileEdit, Eye } from "lucide-react";
import PDFPreviewPanel from "../../../components/PDFPreviewPanel";
import { getDOMTemplate } from "../../../components/templates/TemplateRegistry";

const RightPanelPreview = ({ resume, isMobileModal = false, onCloseMobileModal }) => {
  const [zoom, setZoom] = useState(isMobileModal ? 0.45 : 0.85);
  const [viewMode, setViewMode] = useState("editor"); // 'editor' or 'pdf'

  return (
    <div className={isMobileModal ? "w-full h-full bg-slate-900 flex flex-col relative overflow-hidden" : "hidden lg:flex w-[600px] xl:w-[750px] bg-slate-900 border-l border-white/5 flex-col shrink-0 relative overflow-hidden"}>
      {/* Control Bar */}
      <div className="h-14 border-b border-white/5 bg-bg-secondary flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
        <div className="flex items-center gap-2">
           {isMobileModal && (
             <button 
               onClick={onCloseMobileModal}
               className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest hover:text-white mr-2"
             >
               ✕ Close
             </button>
           )}
           <div className="flex items-center gap-1 p-1 bg-slate-950/60 rounded-lg border border-white/5">
              <button 
                onClick={() => startTransition(() => setViewMode("editor"))}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "editor" ? "bg-slate-800 text-primary shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
              >
                <FileEdit size={12} /> Editor
              </button>
              <button 
                onClick={() => startTransition(() => setViewMode("pdf"))}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "pdf" ? "bg-slate-800 text-primary shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
              >
                <Eye size={12} /> PDF View
              </button>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
             <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
               <ZoomOut size={14} />
             </button>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-12 text-center">{Math.round(zoom * 100)}%</span>
             <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
               <ZoomIn size={14} />
             </button>
           </div>
           
           <button className="p-2 bg-slate-950/60 text-slate-500 rounded-lg hover:text-primary transition-all border border-white/5">
             <Maximize2 size={14} />
           </button>
        </div>
      </div>

      {/* Preview Sheet Container */}
      <div className="flex-1 overflow-auto no-scrollbar p-12 flex justify-center bg-slate-950/40 relative">
        {/* The "Paper" */}
        <div 
          className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-300 origin-top h-fit"
          style={{ 
            transform: `scale(${zoom})`,
            width: "210mm", // Standard A4 width
          }}
        >
          {viewMode === "editor" ? (
            <React.Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Template...</div>}>
              {getDOMTemplate(resume?.templateId || "classic", resume, true)}
            </React.Suspense>
          ) : (
            <PDFPreviewPanel
              resume={resume}
              templateId={resume?.templateId || "classic"}
            />
          )}
        </div>

        {/* Smart Highlighting Overlay (Placeholder) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[210mm] pointer-events-none" style={{ transform: `scale(${zoom})`, height: "297mm" }}>
            {/* AI feedback overlays will go here */}
        </div>
      </div>

      {/* Reality HUD */}
      <div className="absolute bottom-6 right-6">
         <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 p-4 rounded-2xl shadow-2xl space-y-3 w-48">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-black uppercase text-slate-400">Readability</span>
              <span className="text-[10px] font-black text-emerald-400">EXCELLENT</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="w-[92%] h-full bg-emerald-500" />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-black uppercase text-slate-400">Impact Score</span>
              <span className="text-[10px] font-black text-primary">78/100</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="w-[78%] h-full bg-primary" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default RightPanelPreview;