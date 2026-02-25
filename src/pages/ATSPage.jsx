import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import {
  FaUpload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSearch,
  FaHistory,
  FaSpinner,
  FaGem,
  FaChartLine,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import ATSGauge from "../components/common/ATSGauge";

const ATSPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [marketMode, setMarketMode] = useState("Standard");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

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
    if (!file) {
      toast.error("Please upload a resume file (PDF or DOCX)");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    formData.append("marketMode", marketMode);

    try {
      const res = await api.post("/ats/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.scan);
      toast.success("Analysis Complete!");
      fetchHistory();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get("/ats/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
            ATS Optimization System
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
          <div className="glass p-8 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6">
            {/* File Upload */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                Step 1: Upload Resume
              </label>
              <div className="relative group">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className={`p-10 border-2 border-dashed rounded-[2rem] transition-all flex flex-col items-center justify-center gap-4 text-center ${file ? "border-primary bg-primary/5" : "border-white/10 hover:border-primary/20 bg-white/5"}`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${file ? "bg-primary text-white shadow-glow" : "bg-white/5 text-slate-400"}`}
                  >
                    <FaUpload size={24} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-text-primary">
                      {file ? file.name : "Choose PDF or DOCX"}
                    </p>
                    <p className="text-[10px] text-text-muted mt-1 font-bold">
                      {file
                        ? `${(file.size / 1024).toFixed(1)} KB`
                        : "Maximum 5MB"}
                    </p>
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
                className="w-full bg-background border border-border-subtle p-5 rounded-[2rem] focus:ring-4 ring-primary/10 transition-all font-medium text-sm h-48 resize-none leading-relaxed"
              />
            </div>

            {/* Market Mode */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary ml-1">
                Step 3: Market Mode
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
              className="w-full py-6 rounded-[2rem] bg-linear-to-r from-primary to-blue-600 text-white font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaSearch className="group-hover:rotate-12 transition-transform" />
              )}
              <span className="tracking-[0.2em] font-black uppercase">
                Start ATS Scan
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT: Results Section */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in slide-in-from-bottom duration-700">
              {/* Score Dashboard */}
              <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center gap-10">
                <ATSGauge score={result.score.overall} />

                <div className="flex-1 grid grid-cols-2 gap-6 w-full">
                  {[
                    { label: "Keyword Match", val: result.score.keywordMatch },
                    { label: "Structure", val: result.score.structure },
                    { label: "Relevance", val: result.score.relevance },
                    { label: "Formatting", val: result.score.formatting },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>{item.label}</span>
                        <span className="text-primary">{item.val}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000 ease-out"
                          style={{ width: `${item.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-5">
                  <h3 className="flex items-center gap-3 text-emerald-400 font-black uppercase tracking-widest text-xs">
                    <FaCheckCircle /> Strengths
                  </h3>
                  <ul className="space-y-3">
                    {result.feedback.positives.map((p, i) => (
                      <li
                        key={i}
                        className="text-xs font-bold text-text-secondary leading-relaxed flex gap-3"
                      >
                        <span className="text-emerald-500">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-5">
                  <h3 className="flex items-center gap-3 text-orange-400 font-black uppercase tracking-widest text-xs">
                    <FaExclamationTriangle /> Areas to Improve
                  </h3>
                  <ul className="space-y-3">
                    {result.feedback.improvements.map((p, i) => (
                      <li
                        key={i}
                        className="text-xs font-bold text-text-secondary leading-relaxed flex gap-3"
                      >
                        <span className="text-orange-500">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing Keywords */}
              {result.feedback.missingKeywords?.length > 0 && (
                <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-5">
                  <h3 className="flex items-center gap-3 text-blue-400 font-black uppercase tracking-widest text-xs text-center">
                    <FaChartLine /> Missing Keywords (Target these)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.feedback.missingKeywords.map((k, i) => (
                      <span
                        key={i}
                        className="py-2 px-4 rounded-xl bg-blue-500/10 text-blue-400 text-[10px] font-black border border-blue-500/20"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass rounded-[3rem] border-2 border-dashed border-white/10 p-20 text-center flex flex-col items-center justify-center min-h-[500px]">
              <div className="w-32 h-32 bg-primary/10 text-primary rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-glow animate-pulse">
                <FaSearch size={48} />
              </div>
              <h3 className="font-black text-3xl text-text-primary mb-4 tracking-tighter">
                ATS Analysis Result
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
