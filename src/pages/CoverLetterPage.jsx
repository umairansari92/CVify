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
} from "react-icons/fa";
import { updateDiamonds } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
import { handleDownloadLetter } from "../utils/pdfExport";

const CoverLetterPage = () => {
  const { user, token } = useSelector((state) => state.auth);
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
    try {
      const res = await api.post("/cover-letters/generate", {
        ...formData,
        type: genType,
      });

      const letter = res.data.letter;
      setGeneratedLetter(letter);
      setEditableContent(letter.content);
      setIsEditing(false);

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

      setGeneratedLetter({
        ...generatedLetter,
        content: editableContent,
      });

      setIsEditing(false);
      toast.success("Cover letter updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditableContent(generatedLetter.content);
    setIsEditing(false);
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
        {/* Input Form - Left Side */}
        <div className="lg:col-span-5 space-y-6 glass p-6 lg:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group h-fit sticky top-20">
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
                className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 text-white font-black shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full py-4 rounded-2xl bg-linear-to-r from-emerald-600 to-green-600 text-white font-black shadow-xl shadow-green-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaRegFileAlt />
                <span>Basic Template (Free)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Preview/Editor - Right Side */}
        <div className="lg:col-span-7 space-y-4">
          {generatedLetter ? (
            <div className="glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-fit sticky top-20">
              {/* Header */}
              <div className="p-6 border-b border-white/5 bg-white/5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">
                      {generatedLetter.jobTitle}
                    </h2>
                    <p className="text-sm text-primary font-bold mt-1">
                      {generatedLetter.companyName || "Professional Application"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 py-1 px-3 rounded-lg bg-primary/10 border border-primary/10">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${generatedLetter.type === "ai" ? "text-blue-400" : "text-emerald-400"}`}>
                      {generatedLetter.type === "ai" ? "AI Generated" : "Template"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Editor/Preview */}
              <div className="p-8 flex-1 max-h-[500px] overflow-y-auto">
                {isEditing ? (
                  <textarea
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="w-full h-96 bg-background border border-border-subtle p-4 rounded-2xl font-medium text-sm text-text-secondary leading-relaxed focus:ring-2 ring-primary/20 transition-all resize-none"
                  />
                ) : (
                  <div className="font-medium text-sm text-text-secondary leading-relaxed whitespace-pre-wrap select-text">
                    {generatedLetter.content}
                  </div>
                )}
              </div>

              {/* Actions */}
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
                      onClick={handleCancelEdit}
                      className="flex-1 min-w-[120px] py-3 bg-white/5 text-text-secondary rounded-2xl font-black hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 min-w-[120px] py-3 bg-white/5 text-text-secondary rounded-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLetter.content);
                        toast.success("Copied to clipboard!");
                      }}
                      className="flex-1 min-w-[120px] py-3 bg-primary/10 text-primary rounded-2xl font-black hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <FaCopy /> Copy
                    </button>
                    <button
                      onClick={() => handleDownloadLetter(generatedLetter, user)}
                      className="flex-1 min-w-[120px] py-3 bg-secondary/10 text-secondary rounded-2xl font-black hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <FaDownload /> PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="glass rounded-3xl border-2 border-dashed border-white/10 p-12 text-center flex flex-col items-center justify-center min-h-96 sticky top-20">
              <FaRegFileAlt
                size={50}
                className="text-text-secondary/30 mb-6"
              />
              <p className="font-bold text-text-secondary/50 text-lg">
                Generate a cover letter to see preview
              </p>
              <p className="text-xs text-text-secondary/30 mt-2">
                Fill the form on the left and click generate button
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;

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
                        await api.delete(`/cover-letters/${letter._id}`);
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
                      setSelectedLetter(letter);
                      setIsPreviewOpen(true);
                    }}
                    className="flex-1 py-2 glass rounded-xl text-[10px] font-black uppercase text-text-secondary hover:bg-white/10 hover:text-primary transition-all flex items-center justify-center gap-2"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(letter.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="flex-1 py-2 glass rounded-xl text-[10px] font-black uppercase text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <FaCopy /> Copy
                  </button>
                  <button
                    onClick={() => handleDownloadLetter(letter, user)}
                    className="flex-1 py-2 glass rounded-xl text-[10px] font-black uppercase text-secondary hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
                  >
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

      {/* Preview Modal */}
      {isPreviewOpen && selectedLetter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-midground w-full max-w-2xl max-h-[80vh] rounded-3xl border border-white/10 shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="font-black text-xl text-text-primary uppercase tracking-tight">
                  {selectedLetter.jobTitle}
                </h3>
                <p className="text-sm text-primary font-bold">
                  {selectedLetter.companyName || "Professional Application"}
                </p>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-3 bg-white/5 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all text-text-secondary"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-8 overflow-y-auto font-medium text-sm text-text-secondary leading-relaxed whitespace-pre-wrap select-text">
              {selectedLetter.content}
            </div>
            <div className="p-6 border-t border-white/5 bg-white/5 flex gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedLetter.content);
                  toast.success("Copied to clipboard!");
                }}
                className="flex-1 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FaCopy /> Copy Content
              </button>
              <button
                onClick={() => handleDownloadLetter(selectedLetter, user)}
                className="flex-1 py-3 bg-secondary text-white rounded-2xl font-black shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FaDownload /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetterPage;
