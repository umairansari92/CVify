import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";
import { fetchAllGlobalSkills, addSkillToCache } from "../../features/skills/globalSkillsSlice";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

// ─── Smart Skill Suggestions by Job Title ───────────────────────────────────
const SKILL_SUGGESTIONS = {
  // Tech roles
  developer: [
    "JavaScript",
    "React",
    "Node.js",
    "Git",
    "REST API",
    "TypeScript",
    "HTML/CSS",
    "SQL",
    "Docker",
    "Agile",
  ],
  engineer: [
    "Python",
    "Java",
    "C++",
    "System Design",
    "AWS",
    "Linux",
    "CI/CD",
    "Kubernetes",
    "Microservices",
    "Testing",
  ],
  "data scientist": [
    "Python",
    "Machine Learning",
    "TensorFlow",
    "Pandas",
    "NumPy",
    "SQL",
    "Data Visualization",
    "Statistics",
    "R",
    "Jupyter",
  ],
  "ui/ux": [
    "Figma",
    "Adobe XD",
    "Wireframing",
    "User Research",
    "Prototyping",
    "Sketch",
    "InVision",
    "CSS",
    "Accessibility",
    "Design Systems",
  ],
  devops: [
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Jenkins",
    "AWS",
    "Terraform",
    "Linux",
    "Bash",
    "Monitoring",
    "Git",
  ],

  // Business / Office roles
  manager: [
    "Team Leadership",
    "Project Management",
    "MS Excel",
    "Strategic Planning",
    "Budget Management",
    "Communication",
    "Problem Solving",
    "MS Office",
    "Stakeholder Management",
    "Report Writing",
  ],
  accountant: [
    "MS Excel",
    "QuickBooks",
    "Tally",
    "Financial Reporting",
    "Tax Compliance",
    "Bookkeeping",
    "SAP",
    "IFRS",
    "Budget Analysis",
    "Payroll",
  ],
  hr: [
    "Recruitment",
    "Employee Relations",
    "HRIS",
    "Performance Management",
    "Labor Law",
    "Payroll",
    "Onboarding",
    "Training & Development",
    "MS Excel",
    "Communication",
  ],
  sales: [
    "CRM",
    "Lead Generation",
    "Negotiation",
    "Cold Calling",
    "MS Excel",
    "Client Relations",
    "Presentation Skills",
    "Target Achievement",
    "Market Research",
    "Communication",
  ],
  marketing: [
    "SEO/SEM",
    "Google Analytics",
    "Social Media Marketing",
    "Content Writing",
    "Adobe Photoshop",
    "Email Marketing",
    "Campaign Management",
    "Canva",
    "Meta Ads",
    "Brand Management",
  ],

  // Healthcare
  doctor: [
    "Patient Diagnosis",
    "Clinical Research",
    "Medical Records",
    "MS Word",
    "Prescription Management",
    "Patient Communication",
    "EMR Systems",
    "ICD Coding",
    "Surgical Skills",
    "Team Collaboration",
  ],
  nurse: [
    "Patient Care",
    "IV Administration",
    "Wound Care",
    "Medical Documentation",
    "Emergency Response",
    "Vital Signs Monitoring",
    "Patient Assessment",
    "HIPAA Compliance",
    "BLS/CPR",
    "Communication",
  ],

  // Education
  teacher: [
    "Lesson Planning",
    "Curriculum Development",
    "MS Word",
    "MS PowerPoint",
    "Student Assessment",
    "Classroom Management",
    "E-Learning Tools",
    "Student Mentoring",
    "Parent Communication",
    "Report Writing",
  ],

  // Operations / Non-Tech
  peon: [
    "Inventory Management",
    "Cleaning & Maintenance",
    "Document Handling",
    "Basic Computer Skills",
    "Time Management",
    "Communication",
    "MS Office",
    "Filing System",
  ],
  driver: [
    "Defensive Driving",
    "Route Planning",
    "Vehicle Maintenance",
    "Time Management",
    "GPS Navigation",
    "Customer Service",
    "Safety Compliance",
    "Heavy Vehicle License",
  ],
  admin: [
    "MS Office",
    "Data Entry",
    "Record Keeping",
    "Scheduling",
    "Communication",
    "Filing & Documentation",
    "Customer Service",
    "Multi-tasking",
    "Email Management",
    "MS Excel",
  ],
  receptionist: [
    "Customer Service",
    "MS Office",
    "Phone Handling",
    "Scheduling",
    "Data Entry",
    "Communication",
    "Problem Solving",
    "Multi-tasking",
    "Email Management",
    "Record Keeping",
  ],
};

// Get suggestions based on job title keyword matching
const getSuggestions = (jobTitle = "") => {
  if (!jobTitle) return [];
  const lower = jobTitle.toLowerCase();
  for (const [key, suggestions] of Object.entries(SKILL_SUGGESTIONS)) {
    if (lower.includes(key)) return suggestions;
  }
  // Default general skills
  return [
    "MS Office",
    "Communication",
    "Problem Solving",
    "Team Work",
    "Time Management",
    "MS Excel",
    "Leadership",
    "Customer Service",
    "Data Entry",
    "Adaptability",
  ];
};

// ─── Single Tag Component ────────────────────────────────────────────────────
const SkillTag = ({ skill, onRemove, color }) => (
  <span
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 group"
    style={{
      backgroundColor: `${color}18`,
      color: color,
      border: `1.5px solid ${color}30`,
    }}
  >
    {skill}
    <button
      onClick={() => onRemove(skill)}
      className="w-3.5 h-3.5 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-150 text-[10px] leading-none"
      type="button"
      title="Remove skill"
    >
      ×
    </button>
  </span>
);

// ─── Tag Input Field ─────────────────────────────────────────────────────────
const TagInput = ({
  label,
  placeholder,
  skills,
  onAdd,
  onRemove,
  color,
  hint,
}) => {
  const { skills: globalSkills, loaded } = useSelector((state) => state.globalSkills);
  const [inputVal, setInputVal] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);

  // Local Filtering with slice(0, 10) for performance
  useEffect(() => {
    const query = inputVal.trim().toLowerCase();
    if (query.length < 2) {
      setFilteredSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const matches = globalSkills
        .filter((s) => s.toLowerCase().includes(query) && !skills.includes(s))
        .slice(0, 10);
      setFilteredSuggestions(matches);
    }, 150); // Light debounce for smooth UI

    return () => clearTimeout(timer);
  }, [inputVal, globalSkills, skills]);

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) {
      e.preventDefault();
      onAdd(inputVal.trim().replace(/,$/, ""));
      setInputVal("");
    } else if (e.key === "Backspace" && !inputVal && skills.length > 0) {
      onRemove(skills[skills.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-black text-text-muted uppercase tracking-[0.2em] ml-1">
        {label}
      </label>
      <div className="relative group/taginput">
        <div
          className="min-h-[3.5rem] p-3 rounded-2xl border-2 border-border-subtle bg-midground flex flex-wrap gap-2 items-center cursor-text transition-all duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 shadow-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {skills.map((skill) => (
            <SkillTag
              key={skill}
              skill={skill}
              onRemove={onRemove}
              color={color}
            />
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={skills.length === 0 ? placeholder : "Add more..."}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-text-primary placeholder:text-text-muted/50 font-medium"
          />
        </div>

        {/* Suggestions Dropdown */}
        {(filteredSuggestions.length > 0 || (inputVal.trim().length >= 2 && !filteredSuggestions.includes(inputVal.trim()))) && (
          <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-midground border-2 border-border-subtle rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 border-b border-border-subtle bg-background/50 flex justify-between items-center">
              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest px-2">
                {filteredSuggestions.length > 0 ? "Global Skills" : "New Skill Discovery"}
              </span>
              {filteredSuggestions.length === 0 && (
                <span className="text-[10px] text-primary/60 font-bold px-2 italic">
                  Press Enter to create
                </span>
              )}
            </div>
            <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    onAdd(suggestion);
                    setInputVal("");
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-text-primary hover:bg-primary hover:text-white transition-colors flex justify-between items-center group/item"
                >
                  {suggestion}
                  <span className="text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity bg-white/20 px-2 py-1 rounded-md">Add Skill</span>
                </button>
              ))}
              {filteredSuggestions.length === 0 && inputVal.trim() && (
                <div className="p-4 text-center">
                  <p className="text-xs text-text-muted font-bold">
                    Add "<span className="text-primary">{inputVal}</span>" as a new skill
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {hint && (
        <p className="text-[10px] text-text-muted/60 font-bold italic ml-1">
          {hint}
        </p>
      )}
    </div>
  );
};

// ─── Main SkillsForm Component ───────────────────────────────────────────────
const SkillsForm = () => {
  const dispatch = useDispatch();
  const { currentResume } = useSelector((state) => state.resume);

  // Get flat skills array (new universal field)
  const skills = currentResume?.skills || [];
  // Get currently learning roadmap skills
  const learningRoadmap = currentResume?.technicalSkills?.learningRoadmap || [];
  // Competencies (strengths)
  const competencies = currentResume?.competencies || [];
  // Interests
  const interests = currentResume?.interests || [];

  const jobTitle = currentResume?.personalInfo?.jobTitle || "";
  const themeColor = currentResume?.themeColor || "#3b82f6";
  const suggestions = getSuggestions(jobTitle);

  // ── Developer / Non-Developer Mode (persisted) ──
  const [professionMode, setProfessionMode] = useState(() => {
    try { return localStorage.getItem("cvify_profession_mode") || "non-dev"; }
    catch { return "non-dev"; }
  });
  const toggleMode = (mode) => {
    setProfessionMode(mode);
    try { localStorage.setItem("cvify_profession_mode", mode); } catch {}
  };

  // ── Categorized technicalSkills selectors ──
  const techFrontend  = currentResume?.technicalSkills?.frontend  || [];
  const techBackend   = currentResume?.technicalSkills?.backend   || [];
  const techDatabase  = currentResume?.technicalSkills?.database  || [];
  const techAiDevOps  = currentResume?.technicalSkills?.aiDevOps  || [];
  const techTools     = currentResume?.technicalSkills?.tools     || [];

  const { loaded } = useSelector((state) => state.globalSkills);

  // Load Global Skills Cache once on mount
  useEffect(() => {
    if (!loaded) {
      dispatch(fetchAllGlobalSkills());
    }
  }, [dispatch, loaded]);

  // ── Generic categorized skill handlers (Developer mode) ──
  // All categories share the same add/remove pattern — field is the dot-notation path
  const addCategorySkill = useCallback(
    (field, currentList, allListsFlat) => (skill) => {
      let formatted = skill.trim();
      if (!formatted) return;
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
      const lower = formatted.toLowerCase();
      if (allListsFlat.some(s => s.toLowerCase() === lower)) {
        toast.error("Skill already exists in another category!");
        return;
      }
      const updated = Array.from(new Set([...currentList, formatted]));
      dispatch(setResumeField({ field, value: updated }));
      dispatch(addSkillToCache(formatted));
      api.post("/skills/track", { skills: [formatted] }).catch(() => {});
    },
    [dispatch],
  );

  const removeCategorySkill = useCallback(
    (field, currentList) => (skill) => {
      dispatch(setResumeField({ field, value: currentList.filter(s => s !== skill) }));
    },
    [dispatch],
  );

  // Flatten all categorized skills for duplicate detection
  const allCategorySkillsFlat = [
    ...techFrontend, ...techBackend, ...techDatabase, ...techAiDevOps, ...techTools,
  ];

  // ── Handlers for "skills" field ──
  const addSkill = useCallback(
    (skill) => {
      let formatted = skill.trim();
      if (!formatted) return;

      // Normalization: First letter uppercase as requested
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

      // Case-insensitive duplicate check
      const lowerSkill = formatted.toLowerCase();
      if (skills.some(s => s.toLowerCase() === lowerSkill) || 
          learningRoadmap.some(s => s.toLowerCase() === lowerSkill)) {
        toast.error("Skill already exists in Professional Skills or Currently Learning!");
        return;
      }


      // Use Set to strictly enforce uniqueness during addition
      const updated = Array.from(new Set([...skills, formatted]));
      
      dispatch(setResumeField({ field: "skills", value: updated }));
      // Optimistically update global cache too
      dispatch(addSkillToCache(formatted));

      // Track the skill globally
      api.post("/skills/track", { skills: [formatted] }).catch((err) => {
        console.error("Global tracking failed:", err);
      });

      // Sync back to technicalSkills for PDF / Legacy Template compatibility
      dispatch(
        setResumeField({
          field: "technicalSkills.frontend",
          value: updated,
        }),
      );
    },
    [skills, learningRoadmap, dispatch],
  );

  const removeSkill = useCallback(
    (skill) => {
      const updated = skills.filter((s) => s !== skill);
      dispatch(setResumeField({ field: "skills", value: updated }));
      // Sync back to technicalSkills to ensure PDF/Legacy parity
      dispatch(
        setResumeField({
          field: "technicalSkills.frontend",
          value: updated,
        }),
      );
    },
    [skills, dispatch],
  );

  // ── Handlers for "learningRoadmap" field ──
  const addLearningSkill = useCallback(
    (skill) => {
      let formatted = skill.trim();
      if (!formatted) return;

      // Normalization: First letter uppercase
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

      // Case-insensitive duplicate check
      const lowerSkill = formatted.toLowerCase();
      if (skills.some(s => s.toLowerCase() === lowerSkill) || 
          learningRoadmap.some(s => s.toLowerCase() === lowerSkill)) {
        toast.error("Skill already exists in Professional Skills or Currently Learning!");
        return;
      }


      const updated = Array.from(new Set([...learningRoadmap, formatted]));
      
      dispatch(
        setResumeField({
          field: "technicalSkills.learningRoadmap",
          value: updated,
        }),
      );
      // Optimistically update global cache too
      dispatch(addSkillToCache(formatted));
    },
    [skills, learningRoadmap, dispatch],
  );

  const removeLearningSkill = useCallback(
    (skill) => {
      const updated = learningRoadmap.filter((s) => s !== skill);
      dispatch(
        setResumeField({
          field: "technicalSkills.learningRoadmap",
          value: updated,
        }),
      );
    },
    [learningRoadmap, dispatch],
  );

  // ── Handlers for "competencies" field ──
  const addCompetency = useCallback(
    (item) => {
      const formatted = item.trim();
      if (!formatted || competencies.includes(formatted)) return;
      dispatch(
        setResumeField({
          field: "competencies",
          value: [...competencies, formatted],
        }),
      );
    },
    [competencies, dispatch],
  );

  const removeCompetency = useCallback(
    (item) => {
      dispatch(
        setResumeField({
          field: "competencies",
          value: competencies.filter((c) => c !== item),
        }),
      );
    },
    [competencies, dispatch],
  );

  // ── Handlers for "interests" field ──
  const addInterest = useCallback(
    (item) => {
      const formatted = item.trim();
      if (!formatted || interests.includes(formatted)) return;
      dispatch(
        setResumeField({
          field: "interests",
          value: [...interests, formatted],
        }),
      );
    },
    [interests, dispatch],
  );

  const removeInterest = useCallback(
    (item) => {
      const updated = interests.filter((i) => i !== item);
      dispatch(setResumeField({ field: "interests", value: updated }));
    },
    [interests, dispatch],
  );

  const notInList = suggestions.filter((s) => !skills.includes(s));

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* ── Section 1: Technical & Professional Skills ── */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] whitespace-nowrap">
            Technical &amp; Professional Skills
          </h3>
          <span className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
        </div>

        {/* ── Developer / Non-Developer Toggle ── */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-border-subtle w-fit">
          <button
            type="button"
            onClick={() => toggleMode("non-dev")}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all duration-200 ${
              professionMode === "non-dev"
                ? "bg-white dark:bg-slate-800 text-primary shadow-sm border border-primary/20"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            🏢 General / Non-Tech
          </button>
          <button
            type="button"
            onClick={() => toggleMode("dev")}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all duration-200 ${
              professionMode === "dev"
                ? "bg-white dark:bg-slate-800 text-primary shadow-sm border border-primary/20"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            💻 Developer / Tech
          </button>
        </div>

        {/* ── NON-DEV MODE: Single flat skills box ── */}
        {professionMode === "non-dev" && (
          <div className="space-y-4">
            <TagInput
              label="Your Skills"
              placeholder={`Type any skill and press Enter (e.g. ${jobTitle ? getSuggestions(jobTitle)[0] || "MS Excel" : "MS Excel, Leadership"})`}
              skills={skills}
              onAdd={addSkill}
              onRemove={removeSkill}
              color={themeColor}
              hint="Press Enter or comma (,) after each skill. Press Backspace to remove last skill."
            />
            {/* Smart Suggestions */}
            {suggestions.filter(s => !skills.includes(s)).length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-black text-text-muted/70 uppercase tracking-widest ml-1">
                  💡 Suggested for <span className="text-action">{jobTitle || "your role"}</span> — click to add
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.filter(s => !skills.includes(s)).slice(0, 10).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addSkill(s)}
                      className="px-3 py-1.5 text-xs font-bold rounded-xl border-2 border-dashed border-border-subtle text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── DEVELOPER MODE: 5 categorized inputs ── */}
        {professionMode === "dev" && (
          <div className="space-y-5">
            {[
              { label: "Frontend",   field: "technicalSkills.frontend",  list: techFrontend,  color: "#3b82f6", placeholder: "React, Next.js, TypeScript, Tailwind, HTML, CSS, Redux..." },
              { label: "Backend",    field: "technicalSkills.backend",   list: techBackend,   color: "#8b5cf6", placeholder: "Node.js, Express, Python, FastAPI, Django, REST APIs..." },
              { label: "Database",   field: "technicalSkills.database",  list: techDatabase,  color: "#10b981", placeholder: "MongoDB, PostgreSQL, MySQL, Redis, Firebase..." },
              { label: "AI / DevOps",field: "technicalSkills.aiDevOps",  list: techAiDevOps,  color: "#f59e0b", placeholder: "Docker, AWS, CI/CD, Kubernetes, Claude, OpenAI, Gemini..." },
              { label: "Tools",      field: "technicalSkills.tools",     list: techTools,     color: "#64748b", placeholder: "GitHub, Postman, Figma, VS Code, Jira, MS Excel..." },
            ].map(({ label, field, list, color, placeholder }) => (
              <TagInput
                key={field}
                label={label}
                placeholder={placeholder}
                skills={list}
                onAdd={addCategorySkill(field, list, allCategorySkillsFlat)}
                onRemove={removeCategorySkill(field, list)}
                color={color}
                hint={`Press Enter or comma (,) to add. Press Backspace to remove last.`}
              />
            ))}
          </div>
        )}

        {/* ATS tip */}
        <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30">
          <span className="text-emerald-500 text-base leading-none">✓</span>
          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold leading-relaxed">
            <strong>ATS Friendly:</strong> Skills are rendered as plain,
            comma-separated text in the PDF — no bars, no graphics — ensuring
            100% ATS readability.
          </p>
        </div>
      </section>

      {/* ── Section 1.5: Currently Learning ── */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] whitespace-nowrap">
            Currently Learning
          </h3>
          <span className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
          {learningRoadmap.length > 0 && (
            <span className="text-[10px] font-black text-text-muted bg-foreground/10 px-2 py-0.5 rounded-full">
              {learningRoadmap.length} skills
            </span>
          )}
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl relative overflow-hidden flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
              ⓘ
            </span>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-text-primary">Skills listed under Currently Learning:</h4>
              <p className="text-[10px] text-text-muted leading-relaxed">
                These are skills you are actively learning. They improve ATS keyword matching but clearly indicate that you are still developing proficiency.
              </p>
            </div>
          </div>
          <div className="md:ml-auto shrink-0 space-y-1 bg-white dark:bg-slate-950/40 p-3 rounded-xl border border-border-subtle grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
              <span className="text-xs">✔</span> Included in ATS scan
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
              <span className="text-xs">✔</span> Included in Job Match
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
              <span className="text-xs">✔</span> Displayed separately
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
              <span className="text-xs">✔</span> AI-honesty protection
            </div>
          </div>
        </div>

        <TagInput
          label="Skills in Training"
          placeholder="e.g. Docker, AWS, Linux, Payment Gateway Integration, Courier API Integration..."
          skills={learningRoadmap}
          onAdd={addLearningSkill}
          onRemove={removeLearningSkill}
          color={themeColor}
          hint="Press Enter or comma (,) after each skill. Press Backspace to remove last skill."
        />

        {/* Smart Suggestions for Currently Learning */}
        {["Docker", "AWS", "Linux", "Payment Gateway Integration", "Courier API Integration"].filter(
          (s) => !skills.some(x => x.toLowerCase() === s.toLowerCase()) && 
                 !learningRoadmap.some(x => x.toLowerCase() === s.toLowerCase())
        ).length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-black text-text-muted/70 uppercase tracking-widest ml-1">
              💡 Suggested Target Technologies — click to add to roadmap
            </p>
            <div className="flex flex-wrap gap-2">
              {["Docker", "AWS", "Linux", "Payment Gateway Integration", "Courier API Integration"]
                .filter(
                  (s) => !skills.some(x => x.toLowerCase() === s.toLowerCase()) && 
                         !learningRoadmap.some(x => x.toLowerCase() === s.toLowerCase())
                )
                .map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addLearningSkill(s)}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl border-2 border-dashed border-border-subtle text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  >
                    + {s}
                  </button>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Section 2: Core Strengths ── */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] whitespace-nowrap">
            Core Strengths
          </h3>
          <span className="flex-1 h-px bg-border-subtle" />
        </div>
        <TagInput
          label="Professional Strengths"
          placeholder="e.g. Team Leadership, Problem Solving, Communication..."
          skills={competencies}
          onAdd={addCompetency}
          onRemove={removeCompetency}
          color="#2563eb"
          hint="Soft skills, leadership qualities, work style attributes."
        />
        {/* Strength suggestions */}
        {competencies.length === 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {[
              "Team Leadership",
              "Problem Solving",
              "Communication",
              "Adaptability",
              "Attention to Detail",
              "Time Management",
            ].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => addCompetency(s)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl border-2 border-dashed border-border-subtle text-text-muted hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                + {s}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── Section 3: Interests / Hobbies ── */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.3em] whitespace-nowrap">
            Interests &amp; Hobbies
          </h3>
          <span className="flex-1 h-px bg-border-subtle" />
          <span className="text-[9px] text-text-muted/50 font-bold uppercase tracking-wider">
            Optional
          </span>
        </div>
        <TagInput
          label="Personal Interests"
          placeholder="e.g. Reading, Traveling, Football, Volunteering..."
          skills={interests}
          onAdd={addInterest}
          onRemove={removeInterest}
          color="#94a3b8"
          hint="Personal hobbies or passions (optional but adds personality)."
        />
      </section>
    </div>
  );
};

export default SkillsForm;
