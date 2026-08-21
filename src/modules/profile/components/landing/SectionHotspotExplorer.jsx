import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Eye,
  Info,
  Copy,
  Check,
  Zap,
  Target,
  ExternalLink,
  Layers,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { SECTION_GUIDE_DATA } from "./sectionGuideData";

export const SectionHotspotExplorer = () => {
  const [activeSectionId, setActiveSectionId] = useState("identity");
  const [activeFieldIdx, setActiveFieldIdx] = useState(0);
  const [copiedExample, setCopiedExample] = useState(null);

  const activeSection =
    SECTION_GUIDE_DATA.find((s) => s.id === activeSectionId) ||
    SECTION_GUIDE_DATA[0];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(idx);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <div className="space-y-8" id="studio-walkthrough">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Master Studio Guide & Field Walkthrough
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
          Explore Every Studio Section & Field in Detail
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          Click any tab below to inspect its exact UI layout, understand what each field is for, and view proven, high-converting examples that win recruiter interviews.
        </p>
      </div>

      {/* 11-Tab Horizontal Scroll Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar no-scrollbar border-b border-[var(--border)]">
        {SECTION_GUIDE_DATA.map((section, idx) => {
          const isActive = activeSection.id === section.id;
          return (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionId(section.id);
                setActiveFieldIdx(0);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-xs font-bold transition-all duration-300 shrink-0 ${
                isActive
                  ? "bg-[var(--primary)] text-white shadow-lg shadow-emerald-500/20 scale-[1.02]"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="font-mono text-[10px] opacity-75">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span>{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Split Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Section Title & Metadata Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--surface-muted)] text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] border border-[var(--border)]">
              {activeSection.badge}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
              {activeSection.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              {activeSection.subtitle}
            </p>
          </div>

          <Link
            to="/profile/studio"
            className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-md shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open in Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Two-Column Explorer: Left UI Mockup Visual | Right Field-by-Field Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: UI Visual Screen Reference with Hotspot Pins (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[var(--primary)]" />
                Live Studio Interface Preview
              </span>
              <span className="text-[10px] bg-[var(--surface-muted)] px-2 py-0.5 rounded border border-[var(--border)] font-mono">
                {activeSection.image}
              </span>
            </div>

            {/* Mockup Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl bg-black/5 group">
              <img
                src={activeSection.image}
                alt={activeSection.title}
                className="w-full h-auto object-contain max-h-[550px] mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Floating Live Portfolio Impact Tag */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--border)] shadow-lg flex items-start gap-2.5">
                <Target className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-snug">
                  <span className="font-bold text-[var(--text-primary)]">Public Portfolio Output: </span>
                  <span className="text-[var(--text-secondary)]">{activeSection.portfolioPlacement}</span>
                </div>
              </div>
            </div>

            {/* Recruiter Impact Box */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400">
                <Target className="w-4 h-4" />
                Why This Section Matters to Recruiters
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                {activeSection.purpose}
              </p>
            </div>
          </div>

          {/* Right Column: Field-by-Field Masterclass Guide (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[var(--primary)]" />
                Field-by-Field Breakdown ({activeSection.fields.length} Fields)
              </span>
              <span className="text-[11px] text-[var(--text-muted)]">
                Click any field to view examples
              </span>
            </div>

            {/* Field Accordion Cards */}
            <div className="space-y-3">
              {activeSection.fields.map((field, fIdx) => {
                const isSelected = activeFieldIdx === fIdx;
                return (
                  <div
                    key={field.name}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? "bg-[var(--surface-elevated)] border-[var(--primary)] shadow-lg ring-2 ring-[var(--primary)]/10"
                        : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    {/* Field Header */}
                    <button
                      onClick={() => setActiveFieldIdx(fIdx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                            isSelected
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--surface-muted)] text-[var(--text-muted)] border border-[var(--border)]"
                          }`}
                        >
                          {fIdx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-[var(--text-primary)]">
                            {field.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {field.required ? (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Required
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-muted)]">
                            Optional
                          </span>
                        )}
                        <ChevronRight
                          className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 ${
                            isSelected ? "rotate-90 text-[var(--primary)]" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Field Details when Selected */}
                    {isSelected && (
                      <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-[var(--border)] text-left bg-[var(--surface-muted)]/30">
                        {/* What it is */}
                        <div className="text-xs text-[var(--text-secondary)] leading-relaxed font-normal">
                          <strong className="text-[var(--text-primary)] font-bold">Purpose: </strong>
                          {field.description}
                        </div>

                        {/* High-Impact Real World Example */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-primary)]">
                            <span className="flex items-center gap-1.5 text-[var(--primary)]">
                              <Sparkles className="w-3.5 h-3.5" /> High-Impact Example:
                            </span>
                            <button
                              onClick={() => handleCopy(field.example, fIdx)}
                              className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                            >
                              {copiedExample === fIdx ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-emerald-500">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Example</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] leading-relaxed select-all">
                            {field.example}
                          </div>
                        </div>

                        {/* Recruiter Pro Tip */}
                        {field.tip && (
                          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                            <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <div className="leading-snug">
                              <span className="font-bold">Pro Tip: </span>
                              {field.tip}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Strategic Advice Box */}
            {activeSection.proTips && activeSection.proTips.length > 0 && (
              <div className="p-4 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                  Section Best Practices Checklist
                </div>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] list-disc list-inside">
                  {activeSection.proTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHotspotExplorer;
