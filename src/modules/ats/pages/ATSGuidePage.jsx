import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  Cpu, 
  Target, 
  FileText,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

const ATSGuidePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const modules = [
    {
      title: "1. The Truth About Enterprise ATS Parsers",
      icon: Cpu,
      summary: "Understand how Workday, Taleo, and Greenhouse parse your document.",
      content: (
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Applicant Tracking Systems (ATS) are automated recruitment databases designed to convert candidate documents (PDF/Docx) into structured text fields.
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400">The 3 Major Parser Engines:</h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Workday:</strong> Strict on standard section titles ("Work Experience", "Education"). Drops unanchored sidebar text.</li>
              <li><strong className="text-slate-200">Taleo:</strong> Discards multi-column CSS tables and custom graphic icons completely.</li>
              <li><strong className="text-slate-200">Greenhouse:</strong> Uses advanced natural language processing (NLP) to cluster skills with recent job titles.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "2. The Science of Quantified Bullet Points",
      icon: Target,
      summary: "How to transform passive duties into high-impact metric statements.",
      content: (
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Recruiters scan bullet points for <strong className="text-emerald-400">proven business impact</strong>. Bullet points containing metrics ($, %, user scale, latency improvements) receive 3x higher callback rates.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 space-y-1">
              <span className="font-bold text-red-400 block">❌ Passive Duty (Low Impact)</span>
              <p className="text-slate-300 font-mono text-[11px]">
                "Responsible for building React components and fixing backend API bugs."
              </p>
            </div>

            <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 space-y-1">
              <span className="font-bold text-emerald-400 block">✓ Quantified Impact (94% Score)</span>
              <p className="text-slate-200 font-mono text-[11px]">
                "Engineered 12 React frontend modules and optimized Node.js APIs, reducing page load latency by 45% for 50,000 DAU."
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Critical Formatting Traps to Avoid",
      icon: AlertCircle,
      summary: "Layout mistakes that trigger automatic parser rejection.",
      content: (
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-amber-400">Top 4 Rejection Hazards:</h4>
            <ol className="list-decimal pl-4 space-y-2 text-slate-400">
              <li><strong className="text-slate-200">Tables & Multi-Columns:</strong> ATS parsers read left-to-right across columns, merging unrelated sentences into unreadable gibberish.</li>
              <li><strong className="text-slate-200">Graphics & Rating Bars:</strong> Progress bars like "React: 80%" cannot be parsed as text and score 0.</li>
              <li><strong className="text-slate-200">Header/Footer Contact Info:</strong> Microsoft Word headers/footers are often ignored by parsers. Place contact info in main document body.</li>
              <li><strong className="text-slate-200">Custom Non-Standard Fonts:</strong> Stick to standard web fonts (Inter, Roboto, Arial, Helvetica, Times).</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      title: "4. Semantic Keyword Distance Matching",
      icon: FileText,
      summary: "Natural keyword density vs spam penalty traps.",
      content: (
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Modern ATS systems use vector embedding distance to match job descriptions against candidate skills.
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400">Keyword Best Practices:</h4>
            <ul className="list-disc pl-4 space-y-1 text-slate-400">
              <li>Mirror exact phrase nouns from the Job Description (e.g. <em className="text-slate-200">"CI/CD Pipelines"</em> vs <em className="text-slate-200">"Deployments"</em>).</li>
              <li>Include both acronyms and full names (e.g., <em className="text-slate-200">"Amazon Web Services (AWS)"</em>).</li>
              <li>Avoid "white text keyword stuffing" traps—modern ATS filters flag hidden text and blacklist the application.</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 py-2 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <BookOpen className="w-4 h-4" />
          MINI-COURSE EDUCATIONAL GUIDE
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Understanding ATS Mechanics & Recruiter Psychology
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
          Learn how enterprise parser algorithms evaluate candidate resumes, score keywords, and rank applications.
        </p>
      </div>

      {/* Accordion / Tab Guide List */}
      <div className="space-y-4">
        {modules.map((item, idx) => {
          const Icon = item.icon;
          const isOpen = activeTab === idx;

          return (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveTab(isOpen ? -1 : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-900/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? "rotate-180 text-emerald-400" : ""}`} />
              </button>

              {isOpen && (
                <div className="p-6 border-t border-slate-800/80 bg-slate-950/60">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Bottom Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-100">
          Ready to put your knowledge into practice?
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Run your resume through the ATS Intelligence Scanner and receive your complete Mission Debrief evaluation.
        </p>
        <Link
          to="/ats/scan"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          Launch Intelligence Scanner Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default ATSGuidePage;
