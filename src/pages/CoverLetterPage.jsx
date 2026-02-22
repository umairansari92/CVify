import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axios";
import {
  FaGem,
  FaMagic,
  FaRegFileAlt,
  FaSpinner,
  FaCopy,
  FaDownload,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { updateDiamonds } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { handleDownloadLetter } from "../utils/pdfExport";

const CoverLetterPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState(null);
  const [editableContent, setEditableContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resumes");
      setResumes(res.data);
      if (res.data.length > 0)
        setFormData((prev) => ({ ...prev, resumeId: res.data[0]._id }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (genType) => {
    if (!formData.resumeId || !formData.jobTitle) {
      return toast.error("Please select a resume and enter a job title");
    }
    setLoading(true);
    setIsEditing(false);
    try {
      const res = await api.post("/cover-letters/generate", {
        ...formData,
        type: genType,
      });
      const letter = res.data.letter;
      setGeneratedLetter(letter);
      setEditableContent(letter.content);
      toast.success(
        `${genType === "ai" ? "AI" : "Template"} Letter Generated!`,
      );
      if (genType === "ai") dispatch(updateDiamonds(res.data.diamonds));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!generatedLetter) return;
    setIsSaving(true);
    try {
      await api.put(`/cover-letters/${generatedLetter._id}`, {
        content: editableContent,
      });
      setGeneratedLetter({ ...generatedLetter, content: editableContent });
      setIsEditing(false);
      toast.success("Cover letter saved!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
            Cover Letter Generator
          </h1>
          <p className="text-text-secondary mt-1 font-medium italic opacity-70">
            Craft professional letters in seconds. Edit them to perfection.
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 glass rounded-2xl border border-primary/20 shadow-xl shadow-primary/5">
          <FaGem className="text-blue-400 animate-bounce" />
          <span className="font-black text-text-primary">
            {user?.diamonds || 0} Diamonds Available
          </span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Input Form */}
        <div className="lg:col-span-5 space-y-6 glass p-6 lg:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group sticky top-20">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="space-y-4 relative z-10">
            {/* Resume Select */}
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
                    {r.personalInfo.fullName} — {r.templateId}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Title */}
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

            {/* Company */}
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

            {/* Job Description */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Job Description (Context for AI)
              </label>
              <textarea
                rows="4"
                placeholder="Paste the job description here for better AI tailoring..."
                className="w-full bg-background border border-border-subtle p-3 rounded-xl focus:ring-2 ring-primary/20 transition-all font-medium text-sm resize-none"
                value={formData.jobDescription}
                onChange={(e) =>
                  setFormData({ ...formData, jobDescription: e.target.value })
                }
              />
            </div>

            {/* Tone */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-primary mb-2">
                Tone
              </label>
              <div className="flex gap-2">
                {["Professional", "Enthusiastic", "Creative"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFormData({ ...formData, tone: t })}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-black transition-all ${
                      formData.tone === t
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white/5 text-text-secondary hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Buttons */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => handleGenerate("ai")}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 text-white font-black shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaMagic className="group-hover/btn:rotate-12 transition-transform" />
                )}
                <span>Generate with AI (50 Diamonds)</span>
              </button>

              <button
                onClick={() => handleGenerate("template")}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-green-600 text-white font-black shadow-xl shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaRegFileAlt />
                <span>Basic Template (Free)</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Editable Preview */}
        <div className="lg:col-span-7">
          {generatedLetter ? (
            <div className="glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
              {/* Preview Header */}
              <div className="p-6 border-b border-white/5 bg-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">
                      {generatedLetter.jobTitle}
                    </h2>
                    <p className="text-sm text-primary font-bold mt-1">
                      {generatedLetter.companyName ||
                        "Professional Application"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-1 px-3 rounded-lg bg-primary/10 border border-primary/10">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        generatedLetter.type === "ai"
                          ? "text-blue-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {generatedLetter.type === "ai"
                        ? "AI Generated"
                        : "Template"}
                    </span>
                  </div>
                </div>
                {!isEditing && (
                  <p className="text-[11px] text-text-muted mt-3 opacity-50 italic">
                    Click <strong>Edit</strong> below or double-click the text
                    to manually customize.
                  </p>
                )}
              </div>

              {/* Editable Content Area */}
              <div className="p-8 flex-1 min-h-[420px] max-h-[60vh] overflow-y-auto">
                {isEditing ? (
                  <textarea
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="w-full h-full min-h-[380px] bg-background border border-primary/20 p-4 rounded-2xl font-medium text-sm text-text-secondary leading-relaxed focus:ring-2 ring-primary/30 transition-all resize-none"
                    autoFocus
                  />
                ) : (
                  <div
                    className="font-medium text-sm text-text-secondary leading-relaxed whitespace-pre-wrap select-text cursor-text"
                    onDoubleClick={() => setIsEditing(true)}
                    title="Double-click to edit"
                  >
                    {generatedLetter.content}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="p-6 border-t border-white/5 bg-white/5 flex flex-wrap gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      disabled={isSaving}
                      className="flex-1 min-w-[120px] py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaCheck />
                      )}
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditableContent(generatedLetter.content);
                        setIsEditing(false);
                      }}
                      className="flex-1 min-w-[120px] py-3 bg-white/5 text-text-secondary rounded-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 min-w-[100px] py-3 bg-white/5 text-text-secondary rounded-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLetter.content);
                        toast.success("Copied to clipboard!");
                      }}
                      className="flex-1 min-w-[100px] py-3 bg-primary/10 text-primary rounded-2xl font-black hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <FaCopy /> Copy
                    </button>
                    <button
                      onClick={() =>
                        handleDownloadLetter(generatedLetter, user)
                      }
                      className="flex-1 min-w-[100px] py-3 bg-secondary/10 text-secondary rounded-2xl font-black hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <FaDownload /> Download PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="glass rounded-3xl border-2 border-dashed border-white/10 p-16 text-center flex flex-col items-center justify-center min-h-96">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-glow">
                <FaRegFileAlt size={40} />
              </div>
              <h3 className="font-black text-2xl text-text-primary mb-3 tracking-tight">
                Your Letter Will Appear Here
              </h3>
              <p className="font-medium text-text-muted opacity-60 max-w-sm">
                Fill in the form and click <strong>Generate</strong>. You can
                then edit the result directly before downloading.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;
