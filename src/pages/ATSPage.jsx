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
import ATSResult from "../components/ats/ATSResult";

import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";

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
      action = await dispatch(analyzePlatformResumeAsync({
        resumeId: selectedResumeId,
        jobDescription,
        marketMode,
        experienceLevel
      }));
    } else {
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
            ATS Intelligence Engine
          </h1>
          <p className="text-text-secondary mt-1 font-medium opacity-70">
            Deep-scan your resume against job descriptions using our AI matching algorithm.
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
            {/* Resume Input - Selective */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                Step 1: Select or Upload Resume
              </label>
              
              <div className="grid grid-cols-1 gap-4">
                <select
                  value={selectedResumeId}
                  onChange={(e) => {
                    setSelectedResumeId(e.target.value);
                    if (e.target.value) setFile(null);
                  }}
                  className="w-full bg-bg-primary border border-border-subtle p-4 rounded-xl font-bold text-sm text-text-primary outline-none focus:border-primary transition-all cursor-pointer"
                >
                  <option value="">-- Choose from your built resumes --</option>
                  {userResumes.map(r => (
                    <option key={r._id} value={r._id}>
                      {r.personalInfo?.fullName || "Untitled"} ({r.personalInfo?.jobTitle || "No Title"})
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
                    onChange={(e) => {
                      handleFileChange(e);
                      if (e.target.files[0]) setSelectedResumeId("");
                    }}
                    accept=".pdf,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`p-8 border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center gap-4 text-center ${file ? "border-primary bg-primary/5" : "border-border-subtle hover:border-primary/30 bg-bg-primary"} ${selectedResumeId ? "opacity-40" : ""}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${file ? "bg-primary text-white shadow-glow-primary" : "bg-bg-secondary text-text-muted"}`}>
                      <FaUpload size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-text-primary">
                        {file ? file.name : "Upload External PDF/DOCX"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                Step 2: Target Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here for accurate keyword matching..."
                className="w-full bg-bg-primary border border-border-subtle p-5 rounded-xl focus:border-primary transition-all font-medium text-sm h-48 resize-none text-text-primary leading-relaxed outline-none"
              />
              {!jobDescription.trim() && (
                <div className="flex items-center gap-3 px-4 py-3 mt-2 bg-warning/10 border border-warning/20 rounded-xl">
                  <FaExclamationTriangle className="text-warning text-xs shrink-0" />
                  <p className="text-[11px] font-bold text-warning leading-relaxed">
                    No JD provided. Audit will use general industry standards for <span className="font-black">{experienceLevel}</span> level.
                  </p>
                </div>
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
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
                    className={`py-3 px-4 rounded-xl text-[10px] font-bold tracking-widest transition-all border ${
                      experienceLevel === level.value
                        ? "bg-primary/10 border-primary/40 text-primary shadow-glow-primary"
                        : "bg-bg-primary border-border-subtle text-text-muted hover:border-border-strong hover:text-text-main"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Market Mode */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">
                Step 4: Market Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Standard", "Pakistan HR", "Freelance", "Remote"].map(
                  (mode) => (
                    <button
                      key={mode}
                      onClick={() => setMarketMode(mode)}
                      className={`py-3 px-4 rounded-xl text-[10px] font-bold tracking-widest transition-all border ${
                        marketMode === mode 
                        ? "bg-primary/10 border-primary/40 text-primary shadow-glow-primary" 
                        : "bg-bg-primary border-border-subtle text-text-muted hover:border-border-strong hover:text-text-main"
                      }`}
                    >
                      {mode}
                    </button>
                  ),
                )}
              </div>
            </div>

             <Button
              variant="glow"
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full !py-5 flex items-center justify-center gap-3 text-sm"
              icon={loading ? FaSpinner : FaSearch}
            >
              {loading ? "Analyzing..." : "Run Intelligence Scan (50 💎)"}
            </Button>
          </Card>
        </div>

        {/* RIGHT: Results Section */}
        <div className="lg:col-span-12 xl:col-span-7">
          {result ? (
            <ATSResult data={result} />
          ) : (
            <Card variant="flat" className="border-2 border-dashed border-border-subtle p-20 text-center flex flex-col items-center justify-center min-h-[500px] bg-bg-secondary/50">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow-primary animate-pulse">
                <FaSearch size={32} />
              </div>
              <h3 className="font-bold text-2xl text-text-primary mb-3 tracking-tight">
                Awaiting Data Input
              </h3>
              <p className="text-sm font-medium text-text-muted max-w-sm mx-auto leading-relaxed">
                Provide your resume and job description to initiate the AI scoring matrix and reveal optimization feedback.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSPage;
