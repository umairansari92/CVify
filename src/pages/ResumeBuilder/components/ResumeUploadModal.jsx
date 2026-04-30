import React, { useState, useEffect } from "react";
import { Upload, X, FileText, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { parseResume } from "../../../features/resume/resumeThunk";
import toast from "react-hot-toast";

const ResumeUploadModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.resume);
  const [file, setFile] = useState(null);
  const [parsingStep, setParsingStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { parsingAnalysis } = useSelector((state) => state.resume);

  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setShowSuccess(false);
    }
  }, [isOpen, setShowSuccess]);

  const steps = [
    "Reading file data...",
    "Cleaning text noise...",
    "Detecting professional timeline...",
    "Categorizing skills...",
    "Scoring bullet impact...",
    "Finalizing hydration..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setParsingStep((prev) => (prev + 1) % steps.length);
      }, 1500);
    } else {
      setParsingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || 
          selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
      } else {
        toast.error("Please upload a PDF or DOCX file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    const result = await dispatch(parseResume(formData));
    if (result.type.includes("fulfilled")) {
      toast.success("Intelligence Hydration Complete!");
      setShowSuccess(true);
    } else {
      toast.error(result.payload || "Failed to parse resume");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#111827] w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">AI Resume Import</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Transform your PDF into a CVify Pro profile</p>
            </div>
          </div>

          {showSuccess ? (
            <div className="py-8 animate-fadeIn">
              <div className="flex flex-col items-center text-center mb-8">
                 <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 mb-6 scale-110 animate-bounce">
                    <CheckCircle2 size={40} />
                 </div>
                 <h3 className="text-2xl font-black mb-2">Resume Intelligence Active</h3>
                 <p className="text-sm text-slate-500">We've successfully extracted and validated your professional data.</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                 <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Completeness</span>
                    <span className="text-lg font-black text-primary">{parsingAnalysis?.scores?.completeness || 0}%</span>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Impact Score</span>
                    <span className="text-lg font-black text-emerald-500">{parsingAnalysis?.scores?.impact || 0}%</span>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Quantification</span>
                    <span className="text-lg font-black text-amber-500">{parsingAnalysis?.scores?.quantification || 0}%</span>
                 </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-black dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3"
              >
                Enter Builder Experience
              </button>
            </div>
          ) : !loading ? (
            <div className="space-y-6">
              {/* ... existing upload UI ... */}
              <label 
                className={`
                  border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all
                  ${file 
                    ? "border-primary/40 bg-primary/5" 
                    : "border-slate-200 dark:border-slate-800 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-slate-800/50"}
                `}
              >
                <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx" />
                
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                      <FileText size={32} />
                    </div>
                    <span className="text-sm font-black text-slate-700 dark:text-slate-200">{file.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Change File</span>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-2">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-black text-slate-700 dark:text-slate-200 block mb-1">Drag & Drop Resume</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Supports PDF & DOCX</span>
                    </div>
                  </>
                )}
              </label>

              <button 
                onClick={handleUpload}
                disabled={!file}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100 transition-all flex items-center justify-center gap-3"
              >
                <Sparkles size={16} />
                Start AI Analysis (30 💎)
              </button>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="relative mb-8">
                 <Loader2 className="w-20 h-20 text-primary animate-spin opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-primary animate-pulse" size={32} />
                 </div>
              </div>
              
              <div className="text-center space-y-4">
                <h3 className="text-lg font-black text-slate-800 dark:text-white transition-all animate-fadeIn">
                  {steps[parsingStep]}
                </h3>
                <div className="flex items-center gap-1.5 justify-center">
                   {steps.map((_, i) => (
                     <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${i <= parsingStep ? "w-6 bg-primary" : "w-1.5 bg-slate-200 dark:bg-slate-800"}`} 
                     />
                   ))}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Our AI is mapping your professional story...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadModal;
