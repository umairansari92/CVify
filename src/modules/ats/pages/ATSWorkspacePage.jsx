import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  analyzeResumeV3Async, 
  analyzePlatformResumeAsync 
} from "../../../features/ats/atsSlice";
import { updateDiamonds } from "../../../features/auth/authSlice";
import api from "../../../api/axios";
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Globe, 
  Briefcase, 
  Loader2, 
  Gem, 
  Search,
  ArrowRight
} from "lucide-react";
import { toast } from "react-hot-toast";

const ATSWorkspacePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { loading, error: atsError } = useSelector((state) => state.ats);

  const [inputSource, setInputSource] = useState("file"); // 'file' | 'platform'
  const [file, setFile] = useState(null);
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(location.state?.preSelectedResumeId || "");
  const [fetchingResumes, setFetchingResumes] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [marketMode, setMarketMode] = useState("Standard");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level");

  // Animated loader steps
  const [scanStep, setScanStep] = useState(0);
  const scanSteps = [
    "Reading document DOM & font encodings...",
    "Extracting experience headings & dates...",
    "Evaluating structural layout safety...",
    "Calculating quantification density (% & metrics)...",
    "Measuring action verb initiation strength...",
    "Vector-matching skills against target Job Description...",
    "Synthesizing Gemini 2.5 Flash Recruiter Intelligence..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setScanStep((prev) => (prev + 1) % scanSteps.length);
      }, 1400);
    } else {
      setScanStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Fetch platform resumes if user toggles platform mode
  useEffect(() => {
    const fetchResumes = async () => {
      if (user && userResumes.length === 0) {
        setFetchingResumes(true);
        try {
          const res = await api.get("/resumes");
          const resumeList = res.data.resumes || res.data || [];
          setUserResumes(Array.isArray(resumeList) ? resumeList : []);
          if (resumeList.length > 0 && !selectedResumeId) {
            setSelectedResumeId(resumeList[0]._id);
          }
        } catch (err) {
          console.error("Failed to load platform resumes", err);
        } finally {
          setFetchingResumes(false);
        }
      }
    };
    fetchResumes();
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleLoadSampleJD = () => {
    setJobDescription(
      `We are looking for a Senior Full Stack Engineer (MERN) with 3+ years of experience building scalable microservices and high-performance React frontends. Requirements: Strong proficiency in React, Node.js, Express, MongoDB, REST APIs, TypeScript, Docker, and AWS. Proven track record of improving latency, team leadership, and CI/CD pipelines.`
    );
    toast.success("Sample Job Description loaded!");
  };

  const handleExecuteScan = async () => {
    if (inputSource === "file" && !file) {
      toast.error("Please upload a PDF or Docx resume file.");
      return;
    }
    if (inputSource === "platform" && !selectedResumeId) {
      toast.error("Please select a saved platform resume.");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please enter a Target Job Description to analyze match score.");
      return;
    }

    let actionResult;

    if (inputSource === "platform") {
      actionResult = await dispatch(
        analyzePlatformResumeAsync({
          resumeId: selectedResumeId,
          jobDescription,
          marketMode,
          experienceLevel,
        })
      );
    } else {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      formData.append("marketMode", marketMode);
      formData.append("experienceLevel", experienceLevel);

      actionResult = await dispatch(analyzeResumeV3Async(formData));
    }

    if (analyzeResumeV3Async.fulfilled.match(actionResult) || analyzePlatformResumeAsync.fulfilled.match(actionResult)) {
      toast.success("ATS Intelligence Audit Complete!");
      // Update diamonds state if returned in payload
      const payload = actionResult.payload;
      if (payload?.diamondsLeft !== undefined) {
        dispatch(updateDiamonds(payload.diamondsLeft));
      }
      // Navigate to mission debrief reports
      navigate("/ats/reports");
    } else {
      toast.error(actionResult.payload || "Analysis failed. Please check your inputs.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2">
      
      {/* Workspace Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4" />
            ATS SCANNER WORKSTATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Run ATS Intelligence Audit
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Select your resume source, paste target JD, and configure market criteria.
          </p>
        </div>

        {/* User Diamond Balance */}
        <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Gem className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Credit Balance</div>
            <div className="text-sm font-bold text-slate-100">{user?.diamonds || 0} Diamonds</div>
          </div>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Selection (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Input Source Selector */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Select Resume Source
              </span>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setInputSource("file")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    inputSource === "file"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setInputSource("platform")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    inputSource === "platform"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  CVify Resume
                </button>
              </div>
            </div>

            {/* Input Box: File Upload Mode */}
            {inputSource === "file" ? (
              <label className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/50 group">
                <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 transition-colors mb-2" />
                <span className="text-xs font-semibold text-slate-200">
                  {file ? file.name : "Drop PDF or Docx file here"}
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "Supports PDF, DOCX (Max 5MB)"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              /* Input Box: Platform Resume Select Mode */
              <div className="space-y-2">
                {fetchingResumes ? (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    Loading saved resumes...
                  </div>
                ) : userResumes.length === 0 ? (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 text-center">
                    No platform resumes found. Please upload a PDF file instead.
                  </div>
                ) : (
                  <select
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                  >
                    {userResumes.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.title || r.targetRole || "Untitled Resume"} (Updated: {new Date(r.updatedAt || Date.now()).toLocaleDateString()})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Target Job Description */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Target Job Description
              </span>
              <button
                type="button"
                onClick={handleLoadSampleJD}
                className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                + Load Sample JD
              </button>
            </div>

            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description here (skills, responsibilities, requirements)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none resize-none leading-relaxed"
            />
            
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Length: {jobDescription.length} characters</span>
              <span>{jobDescription.split(/\s+/).filter(Boolean).length} Words</span>
            </div>
          </div>
        </div>

        {/* Right Column: Parameters & Execution (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step 3: Parameters */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              3. Contextual Parameters
            </span>

            {/* Target Market Mode */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Target Market Mode
              </label>
              <select
                value={marketMode}
                onChange={(e) => setMarketMode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Standard">Standard / Global Tech</option>
                <option value="US Remote">US Remote ($80k+ High Quantification)</option>
                <option value="European Union">European Union (GDPR / Clean Format)</option>
                <option value="MENA / Gulf">MENA & Gulf Enterprise</option>
              </select>
            </div>

            {/* Target Experience Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                Target Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="Entry-Level">Entry-Level / Junior (0 - 2 Yrs)</option>
                <option value="Mid-Level">Mid-Level Engineer (3 - 5 Yrs)</option>
                <option value="Senior">Senior / Staff Engineer (5+ Yrs)</option>
                <option value="Executive">Executive / Engineering Director</option>
              </select>
            </div>

            {/* Cost Breakdown Info */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span>Scan Cost:</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <Gem className="w-3.5 h-3.5" /> 50 Diamonds
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Re-scans of the same document within 24 hours cost 50% less (25 Diamonds).
              </p>
            </div>
          </div>

          {/* Execution Button / Telemetry Loading */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-4 shadow-xl shadow-emerald-500/10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-100">Analyzing ATS Intelligence...</div>
                  <div className="text-xs text-emerald-400 font-mono transition-all">
                    {scanSteps[scanStep]}
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleExecuteScan}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                Run Intelligence Scan Now
              </button>
            )}

            {atsError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {atsError}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ATSWorkspacePage;
