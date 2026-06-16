import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Upload, 
  Loader2 
} from "lucide-react";
import { FaGem } from "react-icons/fa";
import Card from "../components/ui/Card";
import { updateDiamonds } from "../features/auth/authSlice";
import { getMyResumes, parseResume } from "../features/resume/resumeThunk";
import { analyzePlatformResumeAsync, analyzeResumeV3Async } from "../features/ats/atsSlice";

const JobMatcher = () => {
  const dispatch = useDispatch();
  const [jdText, setJdText] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  
  // Resumes list & selection
  const { resumes } = useSelector((state) => state.resume);
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
      if (
        file.type !== "application/pdf" &&
        file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        toast.error("Please upload a PDF or DOCX file.");
        return;
      }
      setUploadedFile(file);
      setSelectedResumeId("");

      setIsParsing(true);
      const formData = new FormData();
      formData.append("resume", file);
      
      try {
        const action = await dispatch(parseResume(formData));
        if (parseResume.fulfilled.match(action)) {
          toast.success("Intelligence Hydration Complete! Resume selected.");
          dispatch(getMyResumes());
        } else {
          toast.error(action.payload || "Failed to parse resume");
          setUploadedFile(null);
        }
      } catch {
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

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">CVify</span>
            <ChevronRight size={10} className="text-text-muted" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Match Intelligence</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
            Job Matcher
          </h1>
          <p className="text-text-secondary mt-1 font-medium opacity-70">
            Optimize your CV matching compatibility for target descriptions
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-midground rounded-2xl border border-primary/20 shadow-xl shadow-primary/5">
          <FaGem className="text-primary animate-pulse" />
          <span className="font-black text-text-primary text-sm">
            {user?.diamonds || 0} Diamonds Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="glass" className="p-8 space-y-6 !border-white/5 shadow-2xl">
            {/* Step 1: Resume selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                Step 1: Select Resume Source
              </label>
              
              <div className="grid grid-cols-1 gap-4">
                <select
                  value={selectedResumeId}
                  onChange={(e) => {
                    setSelectedResumeId(e.target.value);
                    if (e.target.value) setUploadedFile(null);
                  }}
                  className="w-full bg-bg-primary border border-border-subtle p-4 rounded-xl font-bold text-sm text-text-primary outline-none focus:border-primary transition-all cursor-pointer"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>-- Select from built resumes --</option>
                  {resumes?.map(r => (
                    <option key={r._id} value={r._id} style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
                      {r.personalInfo?.fullName || r.title || "Untitled"} ({r.personalInfo?.jobTitle || "No Title"})
                    </option>
                  ))}
                </select>

                <div className="relative flex items-center justify-center py-2">
                  <div className="border-t border-border-subtle w-full"></div>
                  <span className="absolute px-4 bg-midground text-[10px] font-black uppercase text-text-muted tracking-widest">OR</span>
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
                    className={`p-8 border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center gap-4 text-center ${uploadedFile ? "border-primary bg-primary/5" : "border-border-subtle hover:border-primary/30 bg-bg-primary"} ${selectedResumeId ? "opacity-40" : ""}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${uploadedFile ? "bg-primary text-white shadow-glow-primary" : "bg-bg-secondary text-text-muted"}`}>
                      <Upload size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-text-primary">
                        {uploadedFile ? uploadedFile.name : "Upload External PDF/DOCX"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Job Description */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                Step 2: Paste Job Description
              </label>
              <textarea 
                className="w-full h-56 bg-bg-primary border border-border-subtle rounded-2xl p-5 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none font-medium"
                placeholder="Paste the job title and requirements from LinkedIn, Indeed, etc..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={isMatching || isParsing || !jdText.trim() || (!selectedResumeId && !uploadedFile)}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-glow-primary hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:scale-100 cursor-pointer"
            >
              <Sparkles size={16} />
              Analyze Job Match (50 💎)
            </button>
          </Card>
        </div>

        {/* RIGHT: Results Panel */}
        <div className="lg:col-span-7 space-y-6">
          {isParsing ? (
            <Card variant="glass" className="p-10 !border-white/5 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="relative mb-8">
                <Loader2 className="w-20 h-20 text-primary animate-spin opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-primary animate-pulse" size={32} />
                </div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-lg font-black text-text-primary transition-all animate-fadeIn">
                  {parsingSteps[parsingStep]}
                </h3>
                <div className="flex items-center gap-1.5 justify-center">
                  {parsingSteps.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${i <= parsingStep ? "w-6 bg-primary" : "w-1.5 bg-border-subtle"}`} 
                    />
                  ))}
                </div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Our AI is parsing your PDF details...</p>
              </div>
            </Card>
          ) : isMatching ? (
            <Card variant="glass" className="p-10 !border-white/5 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="relative mb-8">
                <Loader2 className="w-20 h-20 text-primary animate-spin opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="text-primary animate-pulse" size={32} />
                </div>
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-lg font-black text-text-primary transition-all animate-fadeIn">
                  {matchingSteps[matchingStep]}
                </h3>
                <div className="flex items-center gap-1.5 justify-center">
                  {matchingSteps.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${i <= matchingStep ? "w-6 bg-primary" : "w-1.5 bg-border-subtle"}`} 
                    />
                  ))}
                </div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Our AI is matching your metrics...</p>
              </div>
            </Card>
          ) : matchResult ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Match Score Card */}
              <Card variant="glass" className="p-8 !border-white/5 text-center flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <div className="relative mb-6">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-border-subtle" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * matchResult.score) / 100} className="text-primary transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-text-primary">{matchResult.score}%</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-text-muted">Match</span>
                  </div>
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-text-primary">Initial Match Score</h4>
              </Card>

              {/* Missing Keywords */}
              <Card variant="glass" className="p-8 !border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-6 flex items-center gap-2">
                  <AlertCircle size={14} className="text-warning" /> Missing Keywords
                </h4>
                {matchResult.missingKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-warning/10 text-warning rounded-lg text-[9px] font-black uppercase tracking-widest border border-warning/20">
                        + {typeof kw === 'string' ? kw : kw.keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-success flex items-center gap-2">
                    <CheckCircle2 size={14} /> Outstanding! All critical keywords detected.
                  </p>
                )}
              </Card>

              {/* Recommendations */}
              <Card variant="glass" className="p-8 !border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                  <Sparkles size={14} /> Optimization Strategy
                </h4>
                <div className="space-y-3">
                  {matchResult.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-bg-secondary rounded-2xl border border-border-subtle group hover:border-primary/20 transition-all">
                      <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={12} />
                      </div>
                      <p className="text-xs text-text-secondary font-medium leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card variant="glass" className="p-12 !border-white/5 text-center flex flex-col items-center justify-center text-text-muted min-h-[340px]">
              <div className="w-16 h-16 rounded-full bg-bg-secondary border border-border-subtle flex items-center justify-center text-text-muted mb-6">
                <Target size={24} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-text-primary mb-2">No Match Data</h4>
              <p className="text-xs text-text-secondary max-w-[280px] leading-relaxed mx-auto">
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
