import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  ChevronRight, 
  Upload, 
  FileText, 
  X, 
  Loader2 
} from "lucide-react";
import Card from "../components/ui/Card";
import { updateDiamonds } from "../features/auth/authSlice";
import { getMyResumes, parseResume } from "../features/resume/resumeThunk";
import { analyzePlatformResumeAsync, analyzeResumeV3Async } from "../features/ats/atsSlice";
import api from "../api/axios";

const JobMatcher = () => {
  const dispatch = useDispatch();
  const [jdText, setJdText] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  
  // Resumes list & selection
  const { resumes, loading: resumeLoading } = useSelector((state) => state.resume);
  const { user } = useSelector((state) => state.auth);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Parsing loading state
  const [isParsing, setIsParsing] = useState(false);
  const [parsingStep, setParsingStep] = useState(0);
  const parsingSteps = [
    "Reading file data...",
    "Cleaning text noise...",
    "Detecting professional timeline...",
    "Categorizing skills...",
    "Scoring bullet impact...",
    "Finalizing hydration..."
  ];

  // Matching loading state
  const [isMatching, setIsMatching] = useState(false);
  const [matchingStep, setMatchingStep] = useState(0);
  const matchingSteps = [
    "Reading target job description...",
    "Analyzing job requirements & preferences...",
    "Comparing resume timeline & expertise...",
    "Measuring missing keywords compatibility...",
    "Formulating recommendations...",
    "Finalizing match metrics..."
  ];

  // Fetch resumes on load
  useEffect(() => {
    dispatch(getMyResumes());
  }, [dispatch]);

  // Parsing step interval
  useEffect(() => {
    let interval;
    if (isParsing) {
      interval = setInterval(() => {
        setParsingStep((prev) => (prev + 1) % parsingSteps.length);
      }, 1500);
    } else {
      setParsingStep(0);
    }
    return () => clearInterval(interval);
  }, [isParsing]);

  // Matching step interval
  useEffect(() => {
    let interval;
    if (isMatching) {
      interval = setInterval(() => {
        setMatchingStep((prev) => (prev + 1) % matchingSteps.length);
      }, 1500);
    } else {
      setMatchingStep(0);
    }
    return () => clearInterval(interval);
  }, [isMatching]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf" && file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        toast.error("Please upload a PDF or DOCX file.");
        return;
      }
      setUploadedFile(file);
      setSelectedResumeId(""); // Clear platform select

      // Start AI Hydration parse directly
      setIsParsing(true);
      const formData = new FormData();
      formData.append("resume", file);
      
      try {
        const action = await dispatch(parseResume(formData));
        if (parseResume.fulfilled.match(action)) {
          toast.success("Intelligence Hydration Complete! Resume selected.");
          // After parse, it populates state.resume.currentResume. We can refresh list too.
          dispatch(getMyResumes());
        } else {
          toast.error(action.payload || "Failed to parse resume");
          setUploadedFile(null);
        }
      } catch (err) {
        toast.error("Failed to parse resume file");
        setUploadedFile(null);
      } finally {
        setIsParsing(false);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!jdText.trim()) return toast.error("Please paste a Job Description first!");
    if (!selectedResumeId && !uploadedFile) {
      return toast.error("Please select a resume or upload a file first!");
    }

    setIsMatching(true);
    setMatchResult(null);
    const toastId = toast.loading("AI is matching your job description...");

    try {
      let response;
      if (selectedResumeId) {
        response = await dispatch(analyzePlatformResumeAsync({
          resumeId: selectedResumeId,
          jobDescription: jdText,
          marketMode: "Standard",
          experienceLevel: "Mid-Level"
        }));
      } else {
        const formData = new FormData();
        formData.append("resume", uploadedFile);
        formData.append("jobDescription", jdText);
        formData.append("marketMode", "Standard");
        formData.append("experienceLevel", "Mid-Level");
        response = await dispatch(analyzeResumeV3Async(formData));
      }

      if (analyzePlatformResumeAsync.fulfilled.match(response) || analyzeResumeV3Async.fulfilled.match(response)) {
        const data = response.payload;
        const scan = data.scan || data;
        
        setMatchResult({
          score: scan.overallScore || scan.score || 0,
          missingKeywords: scan.feedback?.missingKeywords || scan.missingKeywords || [],
          recommendations: scan.feedback?.hints || scan.feedback?.coachingHints || scan.recommendations || []
        });

        // Sync diamonds in HUD
        const newBalance = data.newDiamondBalance;
        if (newBalance !== undefined) {
          dispatch(updateDiamonds(newBalance));
        }

        toast.success(scan.isFreeRescan ? "Match Analysis Refreshed (Free)!" : "Analysis Complete (-50 💎)!", { id: toastId });
      } else {
        toast.error(response.payload || "Failed to analyze match", { id: toastId });
      }
    } catch (error) {
      console.error("Match Analysis Error:", error);
      toast.error("An error occurred during matching analysis", { id: toastId });
    } finally {
      setIsMatching(false);
    }
  };

  const activeResume = resumes?.find(r => r._id === selectedResumeId) || (resumes && resumes[0]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">CVify</span>
            <ChevronRight size={10} className="text-slate-400 dark:text-slate-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Match Intelligence</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Job Matcher</h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Optimize your CV matching compatibility for target descriptions
          </p>
        </div>
        
        <div className="flex items-center gap-3 px-6 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl shadow-primary/5">
          <Sparkles className="text-primary animate-pulse" size={14} />
          <span className="font-black text-slate-900 dark:text-white text-xs">
            {user?.diamonds || 0} Diamonds Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 relative overflow-hidden group rounded-[24px]">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Target size={120} className="text-slate-900 dark:text-white" />
            </div>
            
            <div className="space-y-6 relative z-10">
              {/* Step 1: Select CV */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Step 1: Select Resume Source
                </label>
                
                <div className="grid grid-cols-1 gap-4">
                  <select
                    value={selectedResumeId}
                    onChange={(e) => {
                      setSelectedResumeId(e.target.value);
                      if (e.target.value) setUploadedFile(null);
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-4 rounded-xl font-bold text-sm text-slate-900 dark:text-white outline-none focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="">-- Select from built resumes --</option>
                    {resumes?.map(r => (
                      <option key={r._id} value={r._id}>
                        {r.personalInfo?.fullName || r.title || "Untitled"} ({r.personalInfo?.jobTitle || "No Title"})
                      </option>
                    ))}
                  </select>

                  <div className="relative flex items-center justify-center py-2">
                    <div className="border-t border-slate-200 dark:border-white/5 w-full"></div>
                    <span className="absolute px-4 bg-white dark:bg-[#111827] text-[10px] font-black uppercase text-slate-400 tracking-widest">OR</span>
                  </div>

                  <div className="relative group">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isParsing}
                    />
                    <div
                      className={`p-6 border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center gap-3 text-center ${uploadedFile ? "border-primary bg-primary/5" : "border-slate-200 dark:border-white/5 hover:border-primary/30 bg-slate-50 dark:bg-slate-900"} ${selectedResumeId ? "opacity-40" : ""}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${uploadedFile ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400"}`}>
                        <Upload size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-700 dark:text-slate-200">
                          {uploadedFile ? uploadedFile.name : "Upload External PDF/DOCX"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Paste JD */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                  Step 2: Paste Job Description
                </label>

                <textarea 
                  className="w-full h-64 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-2xl p-6 text-sm text-slate-900 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none font-medium"
                  placeholder="Paste the job title and requirements from LinkedIn, Indeed, etc..."
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={isMatching || isParsing || !jdText.trim() || (!selectedResumeId && !uploadedFile)}
                className="mt-6 w-full py-4.5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-glow-primary hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:scale-100 cursor-pointer"
              >
                <Sparkles size={16} />
                Analyze Job Match (50 💎)
              </button>
            </div>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          {isParsing ? (
            /* PDF Parsing loading step animation */
            <Card className="p-10 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-center min-h-[400px] rounded-[24px]">
              <div className="relative mb-8">
                 <Loader2 className="w-20 h-20 text-primary animate-spin opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-primary animate-pulse" size={32} />
                 </div>
              </div>
              
              <div className="text-center space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white transition-all animate-fadeIn">
                  {parsingSteps[parsingStep]}
                </h3>
                <div className="flex items-center gap-1.5 justify-center">
                   {parsingSteps.map((_, i) => (
                     <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${i <= parsingStep ? "w-6 bg-primary" : "w-1.5 bg-slate-200 dark:bg-slate-800"}`} 
                     />
                   ))}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Our AI is parsing your PDF details...</p>
              </div>
            </Card>
          ) : isMatching ? (
            /* Job Match loading step animation */
            <Card className="p-10 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-center min-h-[400px] rounded-[24px]">
              <div className="relative mb-8">
                 <Loader2 className="w-20 h-20 text-primary animate-spin opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Target className="text-primary animate-pulse" size={32} />
                 </div>
              </div>
              
              <div className="text-center space-y-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white transition-all animate-fadeIn">
                  {matchingSteps[matchingStep]}
                </h3>
                <div className="flex items-center gap-1.5 justify-center">
                   {matchingSteps.map((_, i) => (
                     <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-500 ${i <= matchingStep ? "w-6 bg-primary" : "w-1.5 bg-slate-200 dark:bg-slate-800"}`} 
                     />
                   ))}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Our AI is matching your metrics...</p>
              </div>
            </Card>
          ) : matchResult ? (
            <div className="space-y-6 animate-slideUp">
              {/* Match Score Card */}
              <Card className="p-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-center relative overflow-hidden rounded-[24px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                
                <div className="relative mb-6">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * matchResult.score) / 100} className="text-primary transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">{matchResult.score}%</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Match</span>
                  </div>
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Initial Match Score</h4>
              </Card>

              {/* Missing Keywords */}
              <Card className="p-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-[24px]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2">
                  <AlertCircle size={14} className="text-amber-500" /> Missing Keywords
                </h4>
                {matchResult.missingKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-500/20">
                        + {kw}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 size={14} /> Outstanding! All critical keywords detected.
                  </p>
                )}
              </Card>

              {/* Recommendations */}
              <Card className="p-8 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-[24px]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                  <Sparkles size={14} /> Optimization Strategy
                </h4>
                <div className="space-y-4">
                  {matchResult.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 group hover:border-primary/20 transition-all">
                      <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={12} />
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-12 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-center flex flex-col items-center justify-center text-slate-500 min-h-[300px] rounded-[24px]">
              <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 mb-6">
                <Target size={24} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-2">No Match Data</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[280px] leading-relaxed mx-auto">
                Paste a Job Description and run the analysis to calculate your resume alignment.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatcher;
