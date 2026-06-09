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
import Swal from "sweetalert2";

import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";

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

  const handleGenerate = async (genType, useDiamonds = false) => {
    if (!formData.resumeId || !formData.jobTitle) {
      return toast.error("Please select a resume and enter a job title");
    }
    setLoading(true);
    setIsEditing(false);
    try {
      const res = await api.post("/cover-letters/generate", {
        ...formData,
        type: genType,
        useDiamonds,
      });
      const letter = res.data.letter;
      setGeneratedLetter(letter);
      setEditableContent(letter.content);
      toast.success(
        `${genType === "ai" ? "AI" : "Template"} Letter Generated!`,
      );
      if (res.data.diamonds !== undefined)
        dispatch(updateDiamonds(res.data.diamonds));
    } catch (err) {
      if (err.response?.status === 403) {
        setLoading(false);
        const confirm = await Swal.fire({
          title: "Cover Letter Limit Reached",
          text: `You already have 3 cover letters. To generate a new one, you can either delete an old one or use 30 diamonds.`,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Use 30 Diamonds",
          cancelButtonText: "Maybe Later",
          background: "var(--midground)",
          color: "var(--text-main)",
          customClass: {
            popup: "glass-medium",
            confirmButton: "btn-primary",
            cancelButton: "btn-secondary",
          },
        });

        if (confirm.isConfirmed) {
          handleGenerate(genType, true);
        }
      } else {
        toast.error(err.response?.data?.message || "Failed to generate");
      }
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
    <div className="p-4 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-text-primary tracking-tight">
            Cover Letter AI
          </h1>
          <p className="text-text-secondary mt-1 font-medium opacity-70">
            Generate tailored cover letters powered by AI, then edit and export as PDF.
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-midground rounded-2xl border border-primary/20">
          <FaGem className="text-primary" />
          <span className="font-bold text-text-primary text-sm">
            {user?.diamonds || 0} Diamonds
          </span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Input Form */}
        <div className="lg:col-span-5 lg:sticky lg:top-20">
          <Card variant="glass" className="p-6 lg:p-8 space-y-5 !border-white/5">
            {/* Resume Select */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">
                Select Resume
              </label>
              <select
                className="w-full bg-bg-primary border border-border-subtle p-3.5 rounded-xl font-bold text-sm text-text-primary outline-none focus:border-primary transition-all"
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
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">
                Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                className="w-full bg-bg-primary border border-border-subtle p-3.5 rounded-xl font-bold text-sm text-text-primary outline-none focus:border-primary transition-all"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">
                Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Google"
                className="w-full bg-bg-primary border border-border-subtle p-3.5 rounded-xl font-bold text-sm text-text-primary outline-none focus:border-primary transition-all"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">
                Job Description (Context for AI)
              </label>
              <textarea
                rows="4"
                placeholder="Paste the job description here for better AI tailoring..."
                className="w-full bg-bg-primary border border-border-subtle p-3.5 rounded-xl font-medium text-sm text-text-primary resize-none outline-none focus:border-primary transition-all leading-relaxed"
                value={formData.jobDescription}
                onChange={(e) =>
                  setFormData({ ...formData, jobDescription: e.target.value })
                }
              />
            </div>

            {/* Tone */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary mb-2">
                Tone
              </label>
              <div className="flex gap-2">
                {["Professional", "Enthusiastic", "Creative"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFormData({ ...formData, tone: t })}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                      formData.tone === t
                        ? "bg-primary/10 border-primary/40 text-primary"
                        : "bg-bg-primary border-border-subtle text-text-muted hover:text-text-main"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Buttons */}
            <div className="pt-2 space-y-3">
              <Button
                variant="glow"
                onClick={() => handleGenerate("ai")}
                disabled={loading}
                className="w-full !py-4 flex items-center justify-center gap-3"
                icon={loading ? FaSpinner : FaMagic}
              >
                {loading ? "Generating..." : "Generate with AI (50 💎)"}
              </Button>

              <Button
                variant="ghost"
                onClick={() => handleGenerate("template")}
                disabled={loading}
                className="w-full !py-4 flex items-center justify-center gap-3 !bg-success/10 !text-success hover:!bg-success hover:!text-white !border-success/20"
                icon={FaRegFileAlt}
              >
                Basic Template (Free)
              </Button>
            </div>
          </Card>
        </div>

        {/* RIGHT: Live Editable Preview */}
        <div className="lg:col-span-7">
          {generatedLetter ? (
            <Card variant="elevated" className="overflow-hidden flex flex-col !p-0">
              {/* Preview Header */}
              <div className="p-6 border-b border-border-subtle bg-bg-secondary">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">
                      {generatedLetter.jobTitle}
                    </h2>
                    <p className="text-sm text-primary font-bold mt-1">
                      {generatedLetter.companyName || "Professional Application"}
                    </p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                    generatedLetter.type === "ai"
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-success/10 border-success/20 text-success"
                  }`}>
                    {generatedLetter.type === "ai" ? "AI Generated" : "Template"}
                  </div>
                </div>
                {!isEditing && (
                  <p className="text-[11px] text-text-muted mt-3 opacity-50">
                    Click <strong>Edit</strong> below or double-click the text to customize.
                  </p>
                )}
              </div>

              {/* Editable Content Area */}
              <div className="p-8 flex-1 min-h-[420px] max-h-[60vh] overflow-y-auto">
                {isEditing ? (
                  <textarea
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="w-full h-full min-h-[380px] bg-bg-primary border border-primary/20 p-4 rounded-xl font-medium text-sm text-text-secondary leading-relaxed focus:border-primary transition-all resize-none outline-none"
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
              <div className="p-6 border-t border-border-subtle bg-bg-secondary flex flex-wrap gap-3">
                {isEditing ? (
                  <>
                    <Button
                      variant="primary"
                      onClick={handleSaveEdit}
                      disabled={isSaving}
                      className="flex-1 min-w-[120px]"
                      icon={isSaving ? FaSpinner : FaCheck}
                    >
                      Save Changes
                    </Button>
                    <button
                      onClick={() => {
                        setEditableContent(generatedLetter.content);
                        setIsEditing(false);
                      }}
                      className="flex-1 min-w-[120px] py-3 bg-midground text-text-secondary rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-border-subtle"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 min-w-[100px] py-3 bg-midground text-text-secondary rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-border-subtle"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLetter.content);
                        toast.success("Copied to clipboard!");
                      }}
                      className="flex-1 min-w-[100px] py-3 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 border border-primary/20"
                    >
                      <FaCopy /> Copy
                    </button>
                    <button
                      onClick={() => handleDownloadLetter(generatedLetter, user)}
                      className="flex-1 min-w-[100px] py-3 bg-success/10 text-success rounded-xl font-bold hover:bg-success hover:text-white transition-all flex items-center justify-center gap-2 border border-success/20"
                    >
                      <FaDownload /> PDF
                    </button>
                  </>
                )}
              </div>
            </Card>
          ) : (
            /* Empty State */
            <Card variant="flat" className="border-2 border-dashed border-border-subtle p-16 text-center flex flex-col items-center justify-center min-h-96 bg-bg-secondary/50">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow-primary">
                <FaRegFileAlt size={32} />
              </div>
              <h3 className="font-bold text-2xl text-text-primary mb-3 tracking-tight">
                Your Letter Will Appear Here
              </h3>
              <p className="text-sm font-medium text-text-muted max-w-sm">
                Fill in the form and click <strong>Generate</strong>. You can
                then edit the result directly before downloading.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPage;
