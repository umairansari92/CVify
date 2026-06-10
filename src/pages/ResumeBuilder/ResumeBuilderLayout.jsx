import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResumeById } from "../../features/resume/resumeThunk";
import { initNewResume } from "../../features/resume/resumeSlice";
import SlimSidebar from "../../components/common/SlimSidebar";
import { FaGem, FaUserCircle, FaChevronRight } from "react-icons/fa";
import { Sparkles } from "lucide-react";
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

  return (
    <div className="h-screen w-full bg-bg-primary overflow-hidden flex">
      {/* Global Slim Sidebar (International SaaS Standard) */}
      <SlimSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Unified Global Header */}
        <nav className="h-20 border-b border-white/5 bg-bg-secondary flex items-center justify-between px-10 shrink-0 z-50">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">CVify</span>
                <FaChevronRight size={8} className="text-slate-300" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Intelligence Engine</span>
              </div>
              <h1 className="font-black text-xl tracking-tighter leading-none text-white">
                Resume Builder
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-900/40 p-1.5 rounded-[1.25rem] border border-white/5">
            {["Content", "Designer", "Analyzer", "Matcher"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-500 ${
                  tab === activeTab 
                    ? "bg-slate-800 text-primary shadow-xl shadow-primary/20 scale-[1.05]" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
            {/* Diamond Reserve HUD - Premium Glass Version */}
            <div className="hidden lg:flex items-center gap-4 px-6 py-2.5 glass-strong rounded-2xl border-primary/20 group hover:glow-primary transition-all cursor-pointer relative overflow-hidden">
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
      <main className="flex-1 flex overflow-hidden">
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

        {/* Panel 3: Live Preview (Right) */}
        <RightPanelPreview 
          resume={currentResume} 
        />
      </main>

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
