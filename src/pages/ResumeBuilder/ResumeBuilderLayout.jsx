import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResumeById } from "../../features/resume/resumeThunk";
import { initNewResume, setResumeField } from "../../features/resume/resumeSlice";
import SlimSidebar from "../../components/common/SlimSidebar";
import { FaGem, FaUserCircle, FaChevronRight } from "react-icons/fa";
import { Sparkles, Edit2 } from "lucide-react";
import LeftPanelNavigation from "./panels/LeftPanelNavigation";
import MiddlePanelEditor from "./panels/MiddlePanelEditor";
import RightPanelPreview from "./panels/RightPanelPreview";
import ResumeUploadModal from "./components/ResumeUploadModal";
import { updateResume, createResume } from "../../features/resume/resumeThunk";
import { handleDownloadPDF } from "../../utils/pdfExport";
import ResumeLimitModal from "./components/ResumeLimitModal";
import toast from "react-hot-toast";


const ResumeBuilderLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("personal");
  const [activeTab, setActiveTab] = useState("Content");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [limitInfo, setLimitInfo] = useState(null);
  const { currentResume } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (id) {
      dispatch(getResumeById(id));
    } else {
      dispatch(initNewResume());
    }
  }, [dispatch, id]);

  const handleSave = async (useDiamonds = false) => {
    if (!currentResume) return;
    
    const toastId = toast.loading(useDiamonds ? "Processing diamonds..." : "Saving your resume...");
    try {
      if (id || currentResume._id) {
        await dispatch(updateResume({ id: id || currentResume._id, data: currentResume }));
        toast.success("Resume saved successfully!", { id: toastId });
      } else {
        const result = await dispatch(createResume({ ...currentResume, useDiamonds }));
        
        if (result.type.includes("fulfilled")) {
          toast.success(useDiamonds ? "Unlocked & Created successfully!" : "Resume created successfully!", { id: toastId });
          setLimitInfo(null);
        } else if (result.payload?.limitReached) {
          toast.dismiss(toastId);
          setLimitInfo(result.payload.details);
        } else {
          throw new Error(result.payload?.message || "Failed to create");
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to save", { id: toastId });
    }
  };


  const handleExport = () => {
    if (!currentResume) return toast.error("No resume data to export");
    handleDownloadPDF(currentResume, currentResume.templateId || "classic");
  };

  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-bg-primary overflow-hidden flex">
      {/* Global Slim Sidebar (International SaaS Standard) */}
      <SlimSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Unified Global Header */}
        <nav className="min-h-[4.5rem] py-2 lg:py-0 lg:h-20 border-b border-white/5 bg-bg-secondary flex flex-col lg:flex-row items-center justify-between px-3 sm:px-6 lg:px-10 gap-2 shrink-0 z-40">
          <div className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">CVify</span>
                <FaChevronRight size={7} className="text-slate-300" />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary">Intelligence Engine</span>
              </div>
              <div className="group relative flex items-center">
                <input
                  type="text"
                  value={currentResume?.title || ""}
                  onChange={(e) => dispatch(setResumeField({ field: "title", value: e.target.value }))}
                  placeholder="Untitled Resume"
                  className="font-black text-sm sm:text-base lg:text-xl tracking-tighter leading-none text-white bg-slate-900/30 border border-white/10 hover:border-white/30 focus:border-primary focus:bg-slate-900/80 rounded-lg px-2 sm:px-3 py-1 -ml-1 sm:-ml-3 outline-none transition-all w-36 sm:w-56 md:w-64 lg:w-80 truncate peer"
                />
                <div className="absolute right-2 opacity-0 group-hover:opacity-100 peer-focus:opacity-100 transition-opacity pointer-events-none text-slate-400">
                  <Edit2 size={12} />
                </div>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button 
                onClick={() => setIsMobilePreviewOpen(true)}
                className="px-2.5 py-1.5 bg-primary/20 border border-primary/40 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1"
              >
                <Sparkles size={11} /> Preview
              </button>
              <button 
                onClick={handleExport}
                className="px-2.5 py-1.5 bg-primary text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-glow-primary"
              >
                PDF
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-auto overflow-x-auto no-scrollbar flex items-center justify-start lg:justify-center gap-1 bg-slate-900/40 p-1 rounded-[1rem] border border-white/5 shrink-0">
            {["Content", "Designer", "Analyzer", "Matcher"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 sm:px-6 lg:px-8 py-1.5 lg:py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap shrink-0 ${
                  tab === activeTab 
                    ? "bg-slate-800 text-primary shadow-xl shadow-primary/20 scale-[1.02]" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {/* Diamond Reserve HUD - Premium Glass Version */}
            <div className="flex items-center gap-4 px-6 py-2.5 glass-strong rounded-2xl border-primary/20 group hover:glow-primary transition-all cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <FaGem className="text-primary animate-pulse text-[15px] shadow-[0_0_15px_var(--primary)]" />
              <div className="flex flex-col relative z-10">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.25em] leading-none mb-1.5 opacity-70">
                  Reserve
                </span>
                <span className="text-[15px] font-black text-white leading-none tabular-nums">
                  {user?.diamonds || 0}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setIsImportModalOpen(true)}
                 className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 border border-white/5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-black/10"
               >
                 <Sparkles size={14} className="text-primary" /> Magic Import
               </button>
                <button 
                  onClick={handleExport}
                  className="px-6 py-3.5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-glow-primary hover:scale-[1.03] transition-all"
                >
                  Export PDF
                </button>
            </div>
          </div>
        </nav>

      {/* Import Modal */}
      <ResumeUploadModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />

      {/* 3-Panel Main Area */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Panel 1: Navigation (Left) */}
        <LeftPanelNavigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          setActiveTab={setActiveTab}
        />

        {/* Panel 2: Editor (Center) */}
        <MiddlePanelEditor 
          activeSection={activeSection} 
          activeTab={activeTab}
          onSave={handleSave}
        />

        {/* Panel 3: Live Preview (Right - Desktop) */}
        <RightPanelPreview 
          resume={currentResume} 
        />
      </main>

      {/* Floating Action Button for Mobile Live Preview */}
      <button
        onClick={() => setIsMobilePreviewOpen(true)}
        className="lg:hidden fixed bottom-5 right-4 z-40 bg-primary text-white shadow-2xl shadow-primary/40 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 border border-white/20 active:scale-95 transition-all"
      >
        <Sparkles size={14} /> View CV Preview
      </button>

      {/* Mobile Live Preview Drawer Modal */}
      {isMobilePreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col justify-end lg:hidden animate-fadeIn">
          <div className="w-full h-[92vh] bg-slate-900 rounded-t-3xl overflow-hidden flex flex-col border-t border-white/10 shadow-2xl">
            <RightPanelPreview 
              resume={currentResume}
              isMobileModal={true}
              onCloseMobileModal={() => setIsMobilePreviewOpen(false)}
            />
          </div>
        </div>
      )}

      <ResumeLimitModal 
        isOpen={!!limitInfo} 
        onClose={() => setLimitInfo(null)}
        onConfirm={() => handleSave(true)}
        currentCount={limitInfo?.currentCount}
        requiredDiamonds={limitInfo?.requiredDiamonds}
      />
      </div>
    </div>
  );
};

export default ResumeBuilderLayout;
