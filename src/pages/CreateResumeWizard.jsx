import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createResume } from "../features/resume/resumeThunk";
import { setResumeField } from "../features/resume/resumeSlice";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  FileText, 
  Upload, 
  Linkedin, 
  Zap, 
  Briefcase, 
  Globe, 
  Award, 
  Palette 
} from "lucide-react";
import toast from "react-hot-toast";

import Swal from "sweetalert2";

const CreateResumeWizard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);

  // Wizard state
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [startingPoint, setStartingPoint] = useState("profile");
  const [careerGoal, setCareerGoal] = useState("Developer");
  const [experienceLevel, setExperienceLevel] = useState("Mid");
  const [targetCountry, setTargetCountry] = useState("USA");
  const [preferredStyle, setPreferredStyle] = useState("ATS");
  const [isCreating, setIsCreating] = useState(false);

  const templates = [
    { id: "classic", name: "Executive Classic", desc: "Traditional, dense layout for management & senior leaders." },
    { id: "modern", name: "Tech Minimalist", desc: "Clean single-column structure for developers & engineers." },
    { id: "professional", name: "ATS Safe Essential", desc: "Monochrome, 100% parse-proof layout for enterprise portals." },
    { id: "creative", name: "Modern Studio", desc: "Subtle accent highlights for designers & product managers." },
  ];

  const startingOptions = [
    { id: "profile", label: "Sync CVify Profile Data", icon: UserCheck, desc: "Auto-fill using your saved CVify profile experience, education, skills & projects." },
    { id: "ai", label: "Generate with AI Copilot", icon: Zap, desc: "Auto-generate tailored summary, achievements & skills for target role." },
    { id: "pdf", label: "Import Existing PDF CV", icon: Upload, desc: "Parse text and experience from your existing resume PDF." },
    { id: "blank", label: "Start Fresh (Blank)", icon: FileText, desc: "Build step-by-step with clean layout & AI guidance." },
  ];

  const careerGoals = ["Student", "Developer", "Designer", "Manager", "Marketing", "Finance", "Healthcare", "Custom"];
  const experienceLevels = [
    { id: "Entry", label: "Entry Level (0-2 Yrs)", desc: "Focus on projects, degree & core fundamentals." },
    { id: "Mid", label: "Mid Level (3-5 Yrs)", desc: "Focus on technical achievements & standalone projects." },
    { id: "Senior", label: "Senior Level (6-10 Yrs)", desc: "Focus on business impact metrics & team leadership." },
    { id: "Executive", label: "Executive (10+ Yrs)", desc: "Focus on strategic growth, P&L, & organizational vision." },
  ];

  const targetCountries = ["USA", "Canada", "UK", "Pakistan", "UAE / Gulf", "Remote / Global"];
  const resumeStyles = [
    { id: "ATS", label: "Strict ATS Safe", desc: "Monochrome, maximum parsing density & single-column safety." },
    { id: "Executive", label: "Executive Leadership", desc: "Refined serif typography & authoritative metric highlights." },
    { id: "Modern", label: "Modern Minimalist", desc: "Sleek spacing, clean line accents & high readability." },
    { id: "Creative", label: "Creative Portfolio", desc: "Subtle brand accent colors & portfolio link focus." },
  ];

  // ── Strategy Generators (Resume Strategy Engine) ──
  const getMarketStrategy = (country) => {
    const isNorthAmerica = ["USA", "Canada"].includes(country);
    return {
      market: country,
      maxPages: isNorthAmerica ? 1 : 2,
      photoAllowed: !isNorthAmerica, // Strict ATS in North America rejects photos
      atsMode: isNorthAmerica ? "strict" : "hybrid",
      keywordDensity: "high",
      quantifiedImpact: "required",
    };
  };

  const getRenderConfig = (style) => {
    switch (style) {
      case "ATS":
        return { allowIcons: false, allowTables: false, allowColumns: false, colorMode: "monochrome", fontStyle: "sans" };
      case "Executive":
        return { allowIcons: false, allowTables: false, allowColumns: true, colorMode: "navy_gold", fontStyle: "serif" };
      case "Modern":
        return { allowIcons: true, allowTables: false, allowColumns: true, colorMode: "slate_blue", fontStyle: "sans" };
      case "Creative":
        return { allowIcons: true, allowTables: true, allowColumns: true, colorMode: "vibrant_accent", fontStyle: "sans" };
      default:
        return { allowIcons: false, allowTables: false, allowColumns: false, colorMode: "monochrome", fontStyle: "sans" };
    }
  };

  const handleFinishWizard = async (useDiamonds = false) => {
    setIsCreating(true);
    const toastId = toast.loading(useDiamonds ? "Unlocking with 30 💎..." : "Initializing your AI Career Resume...");

    try {
      const userFullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.username || "Professional Name";

      // ── Comprehensive Profile Ingestion ──
      let initialSummary = "";
      let initialExperience = [];
      let initialEducation = [];
      let initialSkills = { technical: [], soft: [], strategic: [] };
      let initialProjects = [];
      let initialCertifications = [];

      if (startingPoint === "profile") {
        // Full ingestion from User MongoDB model (projects, certs, skills, links)
        initialSummary = user?.summary || user?.bio || "";
        initialExperience = Array.isArray(user?.experience) ? user.experience : [];
        initialEducation = Array.isArray(user?.education) ? user.education : [];
        initialProjects = Array.isArray(user?.projects) ? user.projects : (Array.isArray(user?.portfolio) ? user.portfolio : []);
        initialCertifications = Array.isArray(user?.certifications) ? user.certifications : [];

        if (Array.isArray(user?.skills)) {
          initialSkills = { technical: user.skills.map(s => typeof s === 'object' ? s.name : s), soft: [], strategic: [] };
        } else if (user?.skills && typeof user.skills === 'object') {
          initialSkills = user.skills;
        }
      } else if (startingPoint === "ai") {
        // AI Copilot initial starter content based on goal & level
        initialSummary = `Results-driven ${careerGoal} with ${experienceLevel} level expertise. Proven track record of delivering high-impact solutions, optimizing team workflows, and achieving key performance metrics.`;
        initialExperience = [
          {
            title: `${experienceLevel === "Executive" ? "Head of" : experienceLevel === "Senior" ? "Lead" : "Specialist"} ${careerGoal}`,
            company: "Tech Innovations Inc.",
            location: targetCountry,
            startDate: "2022-01",
            endDate: "Present",
            current: true,
            description: `Spearheaded key initiatives for ${careerGoal} domain. Engineered scalable workflows resulting in a 35% efficiency boost and improved core team performance.`,
            achievements: ["Increased operational throughput by 35%", "Led cross-functional team across 4 major project deliverables"]
          }
        ];
        initialSkills = {
          technical: [careerGoal, "System Optimization", "Data Analysis", "Agile / Scrum"],
          soft: ["Problem Solving", "Strategic Planning", "Cross-Functional Collaboration"],
          strategic: ["Product Architecture", "Process Automation"]
        };
      }

      const marketStrategy = getMarketStrategy(targetCountry);
      const renderConfig = getRenderConfig(preferredStyle);

      const newResumeData = {
        title: `${careerGoal} Resume (${experienceLevel} • ${targetCountry})`,
        templateId: selectedTemplate,
        useDiamonds,
        summary: initialSummary,
        experience: initialExperience,
        education: initialEducation,
        skills: initialSkills,
        projects: initialProjects,
        certifications: initialCertifications,
        personalInfo: {
          fullName: userFullName,
          jobTitle: careerGoal,
          location: targetCountry,
          email: user?.email || "",
          phone: user?.phoneNumber || "",
          website: user?.socialLinks?.portfolio || user?.socialLinks?.website || "",
          linkedin: user?.socialLinks?.linkedin || "",
          github: user?.socialLinks?.github || "",
        },
        themeSettings: {
          preferredStyle,
          targetRegion: targetCountry,
          experienceLevel,
          renderConfig,
        },
        metadata: {
          startingPoint,
          careerGoal,
          experienceLevel,
          targetCountry,
          preferredStyle,
          resumeStrategy: marketStrategy,
          renderConfig,
          openPdfImport: startingPoint === "pdf",
        },
      };

      const result = await dispatch(createResume(newResumeData));
      if (result.type.includes("fulfilled")) {
        toast.success(
          startingPoint === "profile" 
            ? "Synced from CVify Profile!" 
            : useDiamonds ? "Unlocked & Created!" : "Resume workspace created!", 
          { id: toastId }
        );
        const createdId = result.payload?._id || result.payload?.data?._id;
        if (createdId) {
          navigate(`/resume-builder/editor/${createdId}`);
        } else {
          navigate("/dashboard");
        }
      } else if (result.payload?.limitReached) {
        toast.dismiss(toastId);
        const confirm = await Swal.fire({
          title: "Resume Limit Reached",
          text: `You have reached the free limit of 2 resumes. Would you like to use 30 Diamonds to unlock & create another resume? Current balance: ${user?.diamonds || 0} 💎`,
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Unlock with 30 Diamonds",
          cancelButtonText: "Go to Dashboard",
          background: "#0f172a",
          color: "#ffffff",
          customClass: { popup: "glass-medium", confirmButton: "btn-primary", cancelButton: "btn-secondary" },
        });

        if (confirm.isConfirmed) {
          handleFinishWizard(true);
        } else {
          navigate("/dashboard");
        }
      } else {
        throw new Error(result.payload?.message || "Creation failed");
      }
    } catch (err) {
      toast.error(err.message || "Failed to initialize workspace", { id: toastId });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col justify-between p-4 sm:p-8 selection:bg-primary selection:text-white">
      {/* Header Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-white/5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-black text-xs">
            CV
          </div>
          <span className="font-black text-lg text-white">CVify<span className="text-primary">Wizard</span></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Step {currentStep} of 7
          </span>
          <div className="w-28 h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(currentStep / 7) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main Wizard Content Area */}
      <div className="max-w-3xl mx-auto w-full my-auto py-8">
        {/* Step 1: Choose Template */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Step 1</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mt-1">Choose your layout template.</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Select a recruiter-verified layout style for your resume.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {templates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedTemplate === tmpl.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-lg"
                      : "border-white/5 bg-bg-secondary hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-black text-white">{tmpl.name}</h3>
                    {selectedTemplate === tmpl.id && <Check size={16} className="text-primary" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{tmpl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Starting Point */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Step 2</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mt-1">How would you like to start?</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Import existing assets or build fresh with AI guidance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {startingOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setStartingPoint(opt.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      startingPoint === opt.id
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-lg"
                        : "border-white/5 bg-bg-secondary hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-primary">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm font-black text-white">{opt.label}</h3>
                    </div>
                    <p className="text-xs text-slate-400">{opt.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Career Goal */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Step 3</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mt-1">What is your primary career goal?</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">This helps AI tailor your skill density and executive keywords.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {careerGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setCareerGoal(goal)}
                  className={`p-4 rounded-xl border text-xs font-black uppercase tracking-wider transition-all ${
                    careerGoal === goal
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-white/5 bg-bg-secondary text-slate-400 hover:text-white"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Experience Level */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Step 4</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mt-1">What is your experience level?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experienceLevels.map((lvl) => (
                <div
                  key={lvl.id}
                  onClick={() => setExperienceLevel(lvl.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    experienceLevel === lvl.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-lg"
                      : "border-white/5 bg-bg-secondary hover:border-white/20"
                  }`}
                >
                  <h3 className="text-sm font-black text-white mb-1">{lvl.label}</h3>
                  <p className="text-xs text-slate-400">{lvl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Target Country & Market */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Step 5</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mt-1">Where are you applying?</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Aligns regional ATS format preferences (e.g. US Resume vs International CV).</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {targetCountries.map((ctry) => (
                <button
                  key={ctry}
                  onClick={() => setTargetCountry(ctry)}
                  className={`p-4 rounded-xl border text-xs font-black uppercase tracking-wider transition-all ${
                    targetCountry === ctry
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-white/5 bg-bg-secondary text-slate-400 hover:text-white"
                  }`}
                >
                  {ctry}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Preferred Style */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Step 6 of 6</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mt-1">Choose your resume design style.</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Tailors visual typography, spacing density, and section accent styling.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resumeStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setPreferredStyle(style.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                    preferredStyle === style.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-lg"
                      : "border-white/5 bg-bg-secondary hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Palette size={16} className="text-primary" />
                      <h3 className="text-sm font-black text-white">{style.label}</h3>
                    </div>
                    {preferredStyle === style.id && <Check size={16} className="text-primary" />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{style.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {style.id === "ATS" ? "Monochrome • 100% Parse" : style.id === "Executive" ? "Serif • Leadership" : style.id === "Modern" ? "Sans-Serif • Clean" : "Accent Highlights • Links"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 7: Strategy Summary & Launch Brief */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Step 7 of 7 — Resume Strategy Brief</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mt-1">Review your AI Career Strategy.</h2>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Your choices have configured layout constraints, market compliance rules, and AI ingestion targets.</p>
            </div>

            <div className="bg-bg-secondary border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-white/5">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Selected Template</span>
                  <p className="text-sm font-black text-white mt-1 capitalize">{templates.find(t => t.id === selectedTemplate)?.name || selectedTemplate}</p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Ingestion Mode</span>
                  <p className="text-sm font-black text-primary mt-1">{startingOptions.find(o => o.id === startingPoint)?.label || startingPoint}</p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Target Goal</span>
                  <p className="text-sm font-black text-emerald-400 mt-1">{careerGoal} ({experienceLevel})</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-primary">
                    <Globe size={14} />
                    <span>Market Compliance ({targetCountry})</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1 font-medium">
                    <li>• Max Length: <strong className="text-white">{getMarketStrategy(targetCountry).maxPages} Page(s) Strict</strong></li>
                    <li>• ATS Mode: <strong className="text-white">{getMarketStrategy(targetCountry).atsMode.toUpperCase()} Parsing</strong></li>
                    <li>• Photo Policy: <strong className="text-white">{getMarketStrategy(targetCountry).photoAllowed ? "Allowed / Optional" : "Forbidden (US ATS Standard)"}</strong></li>
                  </ul>
                </div>

                <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-400">
                    <Palette size={14} />
                    <span>Render Engine ({preferredStyle})</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1 font-medium">
                    <li>• Typography: <strong className="text-white capitalize">{getRenderConfig(preferredStyle).fontStyle}</strong></li>
                    <li>• Structural Icons: <strong className="text-white">{getRenderConfig(preferredStyle).allowIcons ? "Enabled" : "Disabled (ATS Safe)"}</strong></li>
                    <li>• Color Palette: <strong className="text-white capitalize">{getRenderConfig(preferredStyle).colorMode.replace("_", " ")}</strong></li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
                <span>Estimated Starting ATS Index</span>
                <span className="text-base font-black">85+ / 100 EXCELLENT</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pt-4 border-t border-white/5">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-xs font-black uppercase tracking-wider text-slate-400 hover:text-white disabled:opacity-30"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {currentStep < 7 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-glow-primary hover:scale-105 transition-all"
          >
            <span>Next Step</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => handleFinishWizard(false)}
            disabled={isCreating}
            className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-glow-primary hover:scale-105 transition-all disabled:opacity-30"
          >
            <Sparkles size={16} />
            <span>{isCreating ? "Initializing..." : "Launch Resume Workspace"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateResumeWizard;
