import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeField } from "../../features/resume/resumeSlice";

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
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);

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
      <div
        className="min-h-[3rem] p-3 rounded-2xl border-2 border-border-subtle bg-midground flex flex-wrap gap-2 items-center cursor-text transition-all duration-200 focus-within:border-primary"
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
  // Competencies (strengths)
  const competencies = currentResume?.competencies || [];
  // Interests
  const interests = currentResume?.interests || [];

  const jobTitle = currentResume?.personalInfo?.jobTitle || "";
  const themeColor = currentResume?.themeColor || "#0f172a";
  const suggestions = getSuggestions(jobTitle);

  // ── Backward Compatibility: Migrate old technicalSkills → skills ──
  // If an existing resume has old category-based skills but no flat skills array,
  // auto-merge them into the new universal skills field on first load.
  React.useEffect(() => {
    const hasOldSkills =
      currentResume?.technicalSkills &&
      Object.values(currentResume.technicalSkills).some(
        (a) => Array.isArray(a) && a.length > 0,
      );
    const hasNewSkills =
      currentResume?.skills && currentResume.skills.length > 0;

    if (hasOldSkills && !hasNewSkills) {
      const merged = Object.values(currentResume.technicalSkills)
        .flat()
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i); // Ensure unique on migration
      if (merged.length > 0) {
        dispatch(setResumeField({ field: "skills", value: merged }));
      }
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentResume?._id]);

  // ── Handlers for "skills" field ──
  const addSkill = useCallback(
    (skill) => {
      const formatted = skill.trim();
      if (!formatted) return;
      // Use Set to strictly enforce uniqueness during addition
      const updated = Array.from(new Set([...skills, formatted]));
      
      dispatch(setResumeField({ field: "skills", value: updated }));
      // Sync back to technicalSkills for PDF / Legacy Template compatibility
      dispatch(
        setResumeField({
          field: "technicalSkills",
          value: {
            frontend: updated, // We put everything in 'frontend' for flat structure
            backend: [],
            database: [],
            aiDevOps: [],
            tools: [],
          },
        }),
      );
    },
    [skills, dispatch],
  );

  const removeSkill = useCallback(
    (skill) => {
      const updated = skills.filter((s) => s !== skill);
      dispatch(setResumeField({ field: "skills", value: updated }));
      // Sync back to technicalSkills to ensure PDF/Legacy parity
      dispatch(
        setResumeField({
          field: "technicalSkills",
          value: {
            frontend: updated,
            backend: [],
            database: [],
            aiDevOps: [],
            tools: [],
          },
        }),
      );
    },
    [skills, dispatch],
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
          {skills.length > 0 && (
            <span className="text-[10px] font-black text-text-muted bg-foreground/10 px-2 py-0.5 rounded-full">
              {skills.length} skills
            </span>
          )}
        </div>

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
        {notInList.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-black text-text-muted/70 uppercase tracking-widest ml-1">
              💡 Suggested for{" "}
              <span className="text-action">{jobTitle || "your role"}</span> —
              click to add
            </p>
            <div className="flex flex-wrap gap-2">
              {notInList.slice(0, 10).map((s) => (
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
