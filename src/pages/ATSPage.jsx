import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  analyzeResumeV3Async, 
  analyzePlatformResumeAsync,
  fetchLatestAnalysis, 
  clearAtsResult 
} from "../features/ats/atsSlice";
import { useLocation } from "react-router-dom";
import { updateDiamonds } from "../features/auth/authSlice";
import api from "../api/axios";
import {
  FaUpload,
  FaExclamationTriangle,
  FaSearch,
  FaSpinner,
  FaGem,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import ATSResult from "../components/ats/ATSResult"; // [V3]

const ATSPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { 
    latestResult: result, 
    loading, 
    history, 
    error: atsError 
  } = useSelector((state) => state.ats);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [marketMode, setMarketMode] = useState("Standard");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level");
  
  // V2 Improvements
  const location = useLocation();
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(location.state?.preSelectedResumeId || "");
  const [fetchingResumes, setFetchingResumes] = useState(false);

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

  const handleAnalyze = async () => {
    if (!file && !selectedResumeId) {
      toast.error("Please upload a file or select a platform resume");
      return;
    }
    
    if (!jobDescription.trim()) {
      toast.error("Please provide a Job Description for accurate analysis");
      return;
    }

    let action;
    if (selectedResumeId) {
      // Platform Resume Analysis
      action = await dispatch(analyzePlatformResumeAsync({
        resumeId: selectedResumeId,
        jobDescription,
        marketMode,
        experienceLevel
      }));
    } else {
      // File Upload Analysis
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      formData.append("marketMode", marketMode);
      formData.append("experienceLevel", experienceLevel);
      action = await dispatch(analyzeResumeV3Async(formData));
    }
    
    if (analyzePlatformResumeAsync.fulfilled.match(action) || analyzeResumeV3Async.fulfilled.match(action)) {
      const isFree = action.payload.scan?.isFreeRescan;
      const isDiscounted = action.payload.scan?.cost === 25;
      
      if (isFree) {
        toast.success("Smart Re-scan Complete (Free!)");
      } else if (isDiscounted) {
        toast.success("Re-scan Complete (25 💎 applied)");
      } else {
        toast.success("Analysis Complete!");
      }
      
      const newBalance = action.payload.newDiamondBalance;
      if (newBalance !== undefined) {
        dispatch(updateDiamonds(newBalance));
      }
      dispatch(fetchLatestAnalysis());
    } else {
      const errorMsg = action.payload || "Analysis failed";
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      setFetchingResumes(true);
      try {
        const res = await api.get("/resumes");
        setUserResumes(res.data || []);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      } finally {
        setFetchingResumes(false);
      }
    };
    fetchResumes();
    dispatch(fetchLatestAnalysis());
    return () => dispatch(clearAtsResult());
  }, [dispatch]);

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
            Resume Intelligence Audit
          </h1>
          <p className="text-text-secondary mt-1 font-medium italic opacity-70">
            Scan your resume, match keywords, and get AI-driven scoring.
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 glass rounded-2xl border border-primary/20 shadow-xl shadow-primary/5">
          <FaGem className="text-blue-400 animate-pulse" />
          <span className="font-black text-text-primary">
            {user?.diamonds || 0} Diamonds Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            {/* Resume Input - Selective */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                Step 1: Select or Upload Resume
              </label>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Platform Resume Selector */}
                <select
                  value={selectedResumeId}
                  onChange={(e) => {
                    setSelectedResumeId(e.target.value);
                    if (e.target.value) setFile(null); // Clear file if resume selected
                  }}
                  className="w-full bg-background border border-border-subtle p-4 rounded-2xl font-bold text-sm outline-hidden focus:ring-2 ring-primary/20 transition-all cursor-pointer"
                >
                  <option value="">-- Choose from your built resumes --</option>
                  {userResumes.map(r => (
                    <option key={r._id} value={r._id}>
                      {r.personalInfo?.fullName || "Untitled"} ({r.personalInfo?.jobTitle || "No Title"})
                    </option>
                  ))}
                </select>

                <div className="relative flex items-center justify-center py-2">
                  <div className="border-t border-white/5 w-full"></div>
                  <span className="absolute px-4 bg-midground text-[9px] font-black uppercase text-text-muted/40 tracking-widest">OR</span>
                </div>

                {/* File Upload */}
                <div className="relative group">
                  <input
                    type="file"
                    onChange={(e) => {
                      handleFileChange(e);
                      if (e.target.files[0]) setSelectedResumeId(""); // Clear selection if file uploaded
                    }}
                    accept=".pdf,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`p-10 border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center gap-4 text-center ${file ? "border-primary bg-primary/5" : "border-white/10 hover:border-primary/20 bg-white/5"} ${selectedResumeId ? "opacity-30" : ""}`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${file ? "bg-primary text-white shadow-glow" : "bg-white/5 text-slate-400"}`}
                    >
                      <FaUpload size={20} />
                    </div>
                    <div>
                      <p className="font-black text-xs text-text-primary">
                        {file ? file.name : "Upload New File"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                Step 2: Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here for accurate matching..."
                className="w-full bg-background border border-border-subtle p-5 rounded-2xl focus:ring-4 ring-primary/10 transition-all font-medium text-sm h-48 resize-none leading-relaxed"
              />
              {!jobDescription.trim() && (
                <div className="flex items-center gap-2 px-4 py-2.5 mt-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                  <FaExclamationTriangle className="text-amber-500 text-xs flex-shrink-0" />
                  <p className="text-[10px] font-bold text-amber-500/80 leading-relaxed">
                    No JD provided. Audit will use general industry standards for <span className="font-black text-amber-400">{experienceLevel}</span> level.
                  </p>
                </div>
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                Step 3: Experience Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "Entry-Level", label: "Entry-Level (0-2y)" },
                  { value: "Mid-Level", label: "Mid-Level (3-5y)" },
                  { value: "Senior-Level", label: "Senior (5-10y)" },
                  { value: "Executive", label: "Executive (10y+)" },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setExperienceLevel(level.value)}
                    className={`py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      experienceLevel === level.value
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white/5 text-text-secondary hover:bg-white/10"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Market Mode */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                Step 4: Market Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Standard", "Pakistan HR", "Freelance", "Remote"].map(
                  (mode) => (
                    <button
                      key={mode}
                      onClick={() => setMarketMode(mode)}
                      className={`py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${marketMode === mode ? "bg-primary text-white shadow-lg" : "bg-white/5 text-text-secondary hover:bg-white/10"}`}
                    >
                      {mode}
                    </button>
                  ),
                )}
              </div>
            </div>

             <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-6 rounded-2xl bg-linear-to-r from-primary to-blue-600 text-white font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaSearch className="group-hover:rotate-12 transition-transform" />
              )}
              <span className="tracking-[0.2em] font-black uppercase">
                Run Intelligence Scan (50 💎)
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT: Results Section */}
        <div className="lg:col-span-12 xl:col-span-7">
          {result ? (
            <ATSResult data={result} />
          ) : (
            <div className="glass rounded-3xl border-2 border-dashed border-white/10 p-20 text-center flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-32 h-32 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-10 shadow-glow animate-pulse">
                <FaSearch size={48} />
              </div>
              <h3 className="font-black text-3xl text-text-primary mb-4 tracking-tighter">
                Audit Results Pending
              </h3>
              <p className="font-medium text-text-muted opacity-60 max-w-sm mx-auto leading-relaxed">
                Upload your resume and provide a job description to see your
                performance score and actionable feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSPage;
