import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResumeById } from "../../features/resume/resumeThunk";
import { initNewResume } from "../../features/resume/resumeSlice";
import SlimSidebar from "../../components/common/SlimSidebar";
import { FaGem, FaUserCircle, FaChevronRight } from "react-icons/fa";


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
    <div className="h-screen w-full bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden flex">
      {/* Global Slim Sidebar (International SaaS Standard) */}
      <SlimSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Unified Global Header */}
        <nav className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] flex items-center justify-between px-8 shrink-0 z-50">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/CVify Favicon.jpg" alt="Logo" className="w-9 h-9 rounded-xl shadow-lg" />
              <div className="flex flex-col">
                <h1 className="font-black text-lg tracking-tighter leading-none">CVify<span className="text-primary">Pro</span></h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Dashboard</span>
                  <FaChevronRight size={7} className="text-slate-300" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary">Resume Builder</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            {["Content", "Designer", "Analyzer", "Matcher"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  tab === activeTab 
                    ? "bg-white dark:bg-slate-700 shadow-xl shadow-primary/10 text-primary scale-[1.02]" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* Diamond Reserve HUD */}
            <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 glass-medium rounded-2xl border-primary/20 group hover:scale-[1.03] transition-all cursor-pointer">
              <FaGem className="text-primary animate-pulse text-sm shadow-[0_0_15px_var(--primary)]" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1 opacity-60">
                  Diamond Reserve
                </span>
                <span className="text-sm font-black text-slate-700 dark:text-white leading-none tabular-nums">
                  {user?.diamonds || 0}
                </span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />

            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setIsImportModalOpen(true)}
                 className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-slate-700 transition-all shadow-xl shadow-black/10"
               >
                 <Sparkles size={14} className="text-primary" /> Magic Import
               </button>
                <button 
                  onClick={handleExport}
                  className="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-glow-primary hover:scale-105 transition-all"
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
