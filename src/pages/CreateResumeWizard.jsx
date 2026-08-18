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
  Palette,
  UserCheck,
  User
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ThemeToggle from "../components/common/ThemeToggle";

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
    { 
      id: "ATS", 
      label: "Strict ATS Safe", 
      desc: "Monochrome, maximum parsing density & single-column safety.",
      useCases: "✓ Workday • Greenhouse • Lever • Enterprise Portals" 
    },
    { 
      id: "Executive", 
      label: "Executive Leadership", 
      desc: "Refined serif typography & authoritative metric highlights.",
      useCases: "✓ Directors • VPs • Senior Management • Executive Recruiters" 
    },
    { 
      id: "Modern", 
      label: "Modern Minimalist", 
      desc: "Sleek spacing, clean line accents & high readability.",
      useCases: "✓ Software Engineers • Tech • Product Managers • Startups" 
    },
    { 
      id: "Creative", 
      label: "Creative Portfolio", 
      desc: "Subtle brand accent colors & portfolio link focus.",
      useCases: "✓ UI/UX Designers • Graphic Design • Portfolio Showcase" 
    },
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

      // ── Comprehensive Profile Ingestion & Schema Normalization ──
      let initialSummary = "";
      let initialExperience = [];
      let initialEducation = [];
      let initialSkills = [];
      let initialTechnicalSkills = { frontend: [], backend: [], database: [], aiDevOps: [], security: [], tools: [], learningRoadmap: [] };
      let initialProjects = [];
      let initialCertifications = [];

      if (startingPoint === "profile") {
        // Profile Summary
        initialSummary = user?.summary || user?.bio || "";

        // Experience Normalization (Mongoose requires `position`, `company`, `responsibilities: [String]`)
        if (Array.isArray(user?.experience) && user.experience.length > 0) {
          initialExperience = user.experience.map((exp) => ({
            position: exp.position || exp.title || exp.role || "Specialist",
            company: exp.company || exp.organization || "Company Name",
            startDate: exp.startDate || "",
            endDate: exp.endDate || (exp.current ? "Present" : ""),
            responsibilities: Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0
              ? exp.responsibilities
              : Array.isArray(exp.achievements) && exp.achievements.length > 0
                ? exp.achievements
                : Array.isArray(exp.description) && exp.description.length > 0
                  ? exp.description
                  : typeof exp.description === "string" && exp.description.trim()
                    ? [exp.description.trim()]
                    : ["Spearheaded core domain tasks and contributed to team deliverables."],
          }));
        }

        // Education Normalization (Mongoose requires `degree`, `institution`)
        if (Array.isArray(user?.education) && user.education.length > 0) {
          initialEducation = user.education.map((edu) => ({
            degree: edu.degree || edu.title || "Degree",
            institution: edu.institution || edu.school || edu.university || "Institution",
            startDate: edu.startDate || "",
            endDate: edu.endDate || "",
            specialization: edu.specialization || edu.fieldOfStudy || "",
            description: Array.isArray(edu.description)
              ? edu.description
              : typeof edu.description === "string" && edu.description.trim()
                ? [edu.description.trim()]
                : [],
          }));
        }

        // Projects Normalization (Mongoose requires `name`, `description: [String]`, `link`)
        const userProjList = Array.isArray(user?.projects) && user.projects.length > 0
          ? user.projects
          : Array.isArray(user?.portfolio) ? user.portfolio : [];

        if (userProjList.length > 0) {
          initialProjects = userProjList.map((p) => ({
            name: p.name || p.title || "Project Title",
            description: Array.isArray(p.description)
              ? p.description
              : typeof p.description === "string" && p.description.trim()
                ? [p.description.trim()]
                : ["Delivered scalable features and clean code structure."],
            link: p.link || p.liveLink || p.githubLink || "",
          }));
        }

        // Skills Normalization (Mongoose `skills` is [String], `technicalSkills` is object)
        if (Array.isArray(user?.skills)) {
          initialSkills = user.skills.map((s) => (typeof s === "object" ? s.name || s.title || String(s) : String(s))).filter(Boolean);
          initialTechnicalSkills.tools = [...initialSkills];
        } else if (user?.skills && typeof user.skills === "object") {
          const techList = Array.isArray(user.skills.technical) ? user.skills.technical : [];
          const softList = Array.isArray(user.skills.soft) ? user.skills.soft : [];
          const stratList = Array.isArray(user.skills.strategic) ? user.skills.strategic : [];
          
          initialSkills = [...techList, ...softList, ...stratList].map(String).filter(Boolean);
          initialTechnicalSkills.tools = techList;
        }

        // Certifications
        if (Array.isArray(user?.certifications)) {
          initialCertifications = user.certifications;
        }
      } else if (startingPoint === "ai") {
        // AI Copilot Initial Content
        initialSummary = `Results-driven ${careerGoal} with ${experienceLevel} level expertise. Proven track record of delivering high-impact solutions, optimizing team workflows, and achieving key performance metrics.`;
        initialExperience = [
          {
            position: `${experienceLevel === "Executive" ? "Head of" : experienceLevel === "Senior" ? "Lead" : "Specialist"} ${careerGoal}`,
            company: "Tech Innovations Inc.",
            startDate: "2022-01",
            endDate: "Present",
            responsibilities: [
              `Spearheaded key initiatives for ${careerGoal} domain. Engineered scalable workflows resulting in a 35% efficiency boost.`,
              "Led cross-functional team across 4 major project deliverables and optimized sprint cadence."
            ]
          }
        ];
        initialSkills = [careerGoal, "System Optimization", "Data Analysis", "Agile / Scrum", "Problem Solving", "Process Automation"];
        initialTechnicalSkills.tools = [careerGoal, "Agile", "CI/CD"];
      }

      const marketStrategy = getMarketStrategy(targetCountry);
      const renderConfig = getRenderConfig(preferredStyle);

      const newResumeData = {
        title: `${careerGoal} Resume (${experienceLevel} • ${targetCountry})`,
        templateId: selectedTemplate,
        useDiamonds,
        personalInfo: {
          fullName: userFullName,
          jobTitle: careerGoal,
          location: targetCountry,
          email: user?.email || "",
          phone: user?.phoneNumber || "",
          linkedin: user?.socialLinks?.linkedin || "",
          github: user?.socialLinks?.github || "",
          portfolio: user?.socialLinks?.portfolio || user?.socialLinks?.website || "",
          profileSummary: initialSummary,
        },
        experience: initialExperience,
        education: initialEducation,
        skills: initialSkills,
        technicalSkills: initialTechnicalSkills,
        projects: initialProjects,
        competencies: initialSkills.slice(0, 5),
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col justify-between p-4 sm:p-8 selection:bg-emerald-500 selection:text-white">
      {/* Header Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-xs">
            CV
          </div>
          <span className="font-black text-lg text-[var(--text-primary)]">CVify<span className="text-emerald-600 dark:text-emerald-400">Wizard</span></span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest">
            Step {currentStep} of 7
          </span>
          <div className="w-28 h-1.5 bg-[var(--surface-muted)] border border-[var(--border)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--primary)] transition-all duration-300" style={{ width: `${(currentStep / 7) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main Wizard Content Area */}
      <div className="max-w-3xl mx-auto w-full my-auto py-8">
        {/* Step 1: Choose Template */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Step 1</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tighter mt-1">Choose your layout template.</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">Select a recruiter-verified layout style for your resume.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {templates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedTemplate === tmpl.id
                      ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20 shadow-md"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-black text-[var(--text-primary)]">{tmpl.name}</h3>
                    {selectedTemplate === tmpl.id && <Check size={16} className="text-emerald-500" />}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{tmpl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Starting Point */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Step 2</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tighter mt-1">How would you like to start?</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">Import existing assets or build fresh with AI guidance.</p>
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
                        ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20 shadow-md"
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--surface-muted)] flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm font-black text-[var(--text-primary)]">{opt.label}</h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{opt.desc}</p>
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
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Step 3</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tighter mt-1">What is your primary career goal?</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">This helps AI tailor your skill density and executive keywords.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {careerGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setCareerGoal(goal)}
                  className={`p-4 rounded-xl border text-xs font-black uppercase tracking-wider transition-all ${
                    careerGoal === goal
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] shadow-sm"
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
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Step 4</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tighter mt-1">What is your experience level?</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">Adjusts section depth and achievement metric density.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experienceLevels.map((lvl) => (
                <div
                  key={lvl.id}
                  onClick={() => setExperienceLevel(lvl.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    experienceLevel === lvl.id
                      ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20 shadow-md"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] shadow-sm"
                  }`}
                >
                  <h3 className="text-sm font-black text-[var(--text-primary)] mb-1">{lvl.label}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{lvl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Target Country & Market */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Step 5</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tighter mt-1">Where are you applying?</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">Aligns regional ATS format preferences (e.g. US Resume vs International CV).</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {targetCountries.map((ctry) => (
                <button
                  key={ctry}
                  onClick={() => setTargetCountry(ctry)}
                  className={`p-4 rounded-xl border text-xs font-black uppercase tracking-wider transition-all ${
                    targetCountry === ctry
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] shadow-sm"
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
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Step 6 of 7</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tighter mt-1">Choose your resume design style.</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">Tailors visual typography, spacing density, and section accent styling.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resumeStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => setPreferredStyle(style.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                    preferredStyle === style.id
                      ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20 shadow-md"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Palette size={16} className="text-emerald-600 dark:text-emerald-400" />
                      <h3 className="text-sm font-black text-[var(--text-primary)]">{style.label}</h3>
                    </div>
                    {preferredStyle === style.id && <Check size={16} className="text-emerald-500" />}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{style.desc}</p>
                  <div className="p-2 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    {style.useCases}
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
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Step 7 of 7 — Resume Strategy Brief</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tighter mt-1">Review your AI Career Strategy.</h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium mt-1">Your choices have configured layout constraints, market compliance rules, and AI ingestion targets.</p>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[var(--border)]">
                <div className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-[var(--border)]">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Selected Template</span>
                  <p className="text-sm font-black text-[var(--text-primary)] mt-1 capitalize">{templates.find(t => t.id === selectedTemplate)?.name || selectedTemplate}</p>
                </div>
                <div className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-[var(--border)]">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Ingestion Mode</span>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">{startingOptions.find(o => o.id === startingPoint)?.label || startingPoint}</p>
                </div>
                <div className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-[var(--border)]">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">Target Goal</span>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">{careerGoal} ({experienceLevel})</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">
                    <Globe size={14} />
                    <span>Market Compliance ({targetCountry})</span>
                  </div>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1 font-medium">
                    <li>• Max Length: <strong className="text-[var(--text-primary)]">{getMarketStrategy(targetCountry).maxPages} Page(s) Strict</strong></li>
                    <li>• ATS Mode: <strong className="text-[var(--text-primary)]">{getMarketStrategy(targetCountry).atsMode.toUpperCase()} Parsing</strong></li>
                    <li>• Photo Policy: <strong className="text-[var(--text-primary)]">{getMarketStrategy(targetCountry).photoAllowed ? "Allowed / Optional" : "Forbidden (US ATS Standard)"}</strong></li>
                  </ul>
                </div>

                <div className="bg-[var(--surface-muted)] p-5 rounded-2xl border border-[var(--border)] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-500">
                    <Palette size={14} />
                    <span>Render Engine ({preferredStyle})</span>
                  </div>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1 font-medium">
                    <li>• Typography: <strong className="text-[var(--text-primary)] capitalize">{getRenderConfig(preferredStyle).fontStyle}</strong></li>
                    <li>• Structural Icons: <strong className="text-[var(--text-primary)]">{getRenderConfig(preferredStyle).allowIcons ? "Enabled" : "Disabled (ATS Safe)"}</strong></li>
                    <li>• Color Palette: <strong className="text-[var(--text-primary)] capitalize">{getRenderConfig(preferredStyle).colorMode.replace("_", " ")}</strong></li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Expected ATS Readiness Potential</span>
                <span className="text-base font-black">80 – 90 (Strategy Calibrated)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-xs font-black uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] disabled:opacity-30 transition-all"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {currentStep < 7 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            <span>Next Step</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => handleFinishWizard(false)}
            disabled={isCreating}
            className="flex items-center gap-2 px-8 py-3.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all disabled:opacity-30"
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
