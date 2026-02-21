import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  FaGem,
  FaMagic,
  FaRegFileAlt,
  FaTrash,
  FaCopy,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import { updateDiamonds } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";

const CoverLetterPage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [letters, setLetters] = useState([]);

  const [formData, setFormData] = useState({
    resumeId: "",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    type: "ai",
    tone: "Professional",
  });

  useEffect(() => {
    fetchResumes();
    fetchLetters();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(res.data);
      if (res.data.length > 0)
        setFormData((prev) => ({ ...prev, resumeId: res.data[0]._id }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLetters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cover-letters", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLetters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (genType) => {
    if (!formData.resumeId || !formData.jobTitle) {
      return toast.error("Please select a resume and enter a job title");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cover-letters/generate",
        { ...formData, type: genType },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success(
        `${genType === "ai" ? "AI" : "Template"} Letter Generated!`,
      );
      if (genType === "ai") dispatch(updateDiamonds(res.data.diamonds));
      fetchLetters();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
            Cover Letter Generator
          </h1>
          <p className="text-text-secondary mt-1 font-medium italic opacity-70">
            Craft professional letters in seconds.
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 glass rounded-2xl border border-primary/20 shadow-xl shadow-primary/5">
          <FaGem className="text-blue-400 animate-bounce" />
          <span className="font-black text-text-primary">
            {user?.diamonds || 0} Diamonds Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-5 space-y-6 glass p-6 lg:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          <div className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Select Resume
              </label>
              <select
                className="w-full bg-background border border-border-subtle p-3 rounded-xl focus:ring-2 ring-primary/20 transition-all font-bold"
                value={formData.resumeId}
                onChange={(e) =>
                  setFormData({ ...formData, resumeId: e.target.value })
                }
              >
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.personalInfo.fullName} - {r.templateId}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                className="w-full bg-background border border-border-subtle p-3 rounded-xl focus:ring-2 ring-primary/20 transition-all font-bold"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Google"
                className="w-full bg-background border border-border-subtle p-3 rounded-xl focus:ring-2 ring-primary/20 transition-all font-bold"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Job Description (Mental Context for AI)
              </label>
              <textarea
                rows="4"
                placeholder="Paste the job description here for better AI tailoring..."
                className="w-full bg-background border border-border-subtle p-3 rounded-xl focus:ring-2 ring-primary/20 transition-all font-medium text-sm"
                value={formData.jobDescription}
                onChange={(e) =>
                  setFormData({ ...formData, jobDescription: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Tone
              </label>
              <div className="flex gap-2">
                {["Professional", "Enthusiastic", "Creative"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFormData({ ...formData, tone: t })}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-black transition-all ${formData.tone === t ? "bg-primary text-white shadow-lg" : "bg-white/5 text-text-secondary hover:bg-white/10"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => handleGenerate("ai")}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 text-white font-black shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaMagic className="group-hover:rotate-12 transition-transform" />
                )}
                <span>Generate with AI (50 Diamonds)</span>
              </button>

              <button
                onClick={() => handleGenerate("template")}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-green-600 text-white font-black shadow-xl shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <FaRegFileAlt />
                <span>Basic Template (Free)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Saved Letters List */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
            My History
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {letters.map((letter) => (
              <div
                key={letter._id}
                className="glass p-5 rounded-3xl border border-white/10 hover:border-primary/30 transition-all group animate-in slide-in-from-bottom-2 duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 py-1 px-2 rounded-lg bg-primary/10 border border-primary/10">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${letter.type === "ai" ? "text-blue-400" : "text-emerald-400"}`}
                    >
                      {letter.type === "ai" ? "AI Generated" : "Template"}
                    </span>
                  </div>
                  <button
                    onClick={async () => {
                      if (window.confirm("Delete this letter?")) {
                        await axios.delete(
                          `http://localhost:5000/api/cover-letters/${letter._id}`,
                          { headers: { Authorization: `Bearer ${token}` } },
                        );
                        fetchLetters();
                      }
                    }}
                    className="text-text-secondary hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-xl"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>

                <h3 className="font-black text-text-primary tracking-tight truncate">
                  {letter.jobTitle}
                </h3>
                <p className="text-xs text-text-secondary font-medium opacity-70 mb-4">
                  {letter.companyName || "No Company"}
                </p>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(letter.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="flex-1 py-2 glass rounded-xl text-[10px] font-black uppercase text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <FaCopy /> Copy
                  </button>
                  <button className="flex-1 py-2 glass rounded-xl text-[10px] font-black uppercase text-secondary hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2">
                    <FaDownload /> PDF
                  </button>
                </div>
              </div>
            ))}

            {letters.length === 0 && (
              <div className="col-span-full py-20 text-center glass rounded-3xl border-2 border-dashed border-white/5 opacity-50">
                <FaRegFileAlt
                  size={40}
                  className="mx-auto mb-4 text-text-secondary"
                />
                <p className="font-bold text-text-secondary italic">
                  No letters generated yet. Start now!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;
