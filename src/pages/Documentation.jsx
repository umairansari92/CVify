import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, Cpu, ShieldCheck, Zap, Target, Gem, ChevronRight, 
  FileText, Globe, ArrowLeft, Users, Sparkles, Eye,
  Brain, Layers, Briefcase, Rocket, Layout,
  Database, Star, Award, MessageSquare, Shield, Menu, X,
  BarChart3, GitBranch, TrendingUp, Heart,
  AlertCircle, Palette, Wand2, MousePointer, Settings2, Mail, Bot, Moon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import { Helmet } from "react-helmet-async";

const Documentation = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);

  const navGroups = [
    {
      label: "Getting Started",
      items: [
        { id: "overview", icon: <Rocket size={16} />, label: "Platform Overview" },
        { id: "setup", icon: <Zap size={16} />, label: "Quick Setup (3 Min)" },
      ]
    },
    {
      label: "Architecture & Tech",
      items: [
        { id: "project-structure", icon: <Layers size={16} />, label: "Project Structure" },
        { id: "technology", icon: <Cpu size={16} />, label: "Tech Stack Overview" },
        { id: "bff", icon: <Layers size={16} />, label: "Backend For Frontend (BFF)" },
        { id: "ai-gateway", icon: <ShieldCheck size={16} />, label: "Enterprise AI Gateway (New!)" },
        { id: "theme-engine", icon: <Palette size={16} />, label: "🎨 Theme Engine v4.0 (New!)" },
      ]
    },
    {
      label: "Core Features",
      items: [
        { id: "ats", icon: <Target size={16} />, label: "ATS v4.0 Precision Engine" },
        { id: "coach", icon: <Brain size={16} />, label: "AI Resume Coach PRO" },
        { id: "cover-letter", icon: <MessageSquare size={16} />, label: "AI Cover Letters" },
        { id: "portfolio", icon: <Globe size={16} />, label: "Live Portfolio & SEO" },
        { id: "shareable-links", icon: <Globe size={16} />, label: "Public Shareable Links (New!)" },
        { id: "document-identity", icon: <FileText size={16} />, label: "Document Identity (New!)" },
        { id: "currently-learning", icon: <TrendingUp size={16} />, label: "🧠 Skills Engine & Learning (New!)" },
        { id: "profile", icon: <Layout size={16} />, label: "User Profile & Dashboard" },
        { id: "ai-representative", icon: <Bot size={16} />, label: "🤖 AI Representative" },
        { id: "ai-representative-v2", icon: <Bot size={16} />, label: "🤖 AI Rep — Deep Dive (New!)" },
      ]
    },
    {
      label: "Intelligence Hub",
      items: [
        { id: "magic-import", icon: <Sparkles size={16} />, label: "Magic AI Import" },
        { id: "intent-mode", icon: <Zap size={16} />, label: "AI Intent Mode" },
        { id: "job-matcher", icon: <Target size={16} />, label: "Job Matcher (JD Analysis)" },
        { id: "resume-audit", icon: <ShieldCheck size={16} />, label: "Resume Intelligence Audit" },
      ]
    },
    {
      label: "Security & Anti-Abuse",
      items: [
        { id: "helmet", icon: <Shield size={16} />, label: "Helmet Middleware" },
        { id: "disposable-email", icon: <Mail size={16} />, label: "Disposable Email Blocking" },
        { id: "security-v6", icon: <ShieldCheck size={16} />, label: "🔐 Security v6.0" },
        { id: "security-v7", icon: <ShieldCheck size={16} />, label: "🛡️ Security v7.0 — Triple-Lock (New!)" },
      ]
    },
    {
      label: "Themes & Visual FX",
      items: [
        { id: "themes", icon: <Palette size={16} />, label: "All 13 Portfolio Themes" },
        { id: "resume-templates", icon: <Layout size={16} />, label: "12 Resume PDF Templates (New!)" },
        { id: "noir", icon: <Moon size={16} />, label: "🌑 NOIR (Flagship)" },
        { id: "monograph", icon: <FileText size={16} />, label: "🖋️ MONOGRAPH (Premium)" },
        { id: "oriental-luxe", icon: <Wand2 size={16} />, label: "🕌 ORIENTAL LUXE" },
        { id: "aura-dark", icon: <Sparkles size={16} />, label: "✨ AURA DARK" },
        { id: "terminal-dark", icon: <Cpu size={16} />, label: "💻 TERMINAL DARK" },
        { id: "cyber-neon", icon: <Zap size={16} />, label: "🟢 CYBER NEON" },
        { id: "apex", icon: <Award size={16} />, label: "🏆 APEX (Minimalist)" },
        { id: "particles", icon: <MousePointer size={16} />, label: "Interactive Particles FX" },
      ]
    },
    {
      label: "UI & Performance",
      items: [
        { id: "universal-navbar", icon: <Layout size={16} />, label: "Universal Floating Navbar (New!)" },
        { id: "footer-branding", icon: <Globe size={16} />, label: "Footer Branding (New!)" },
        { id: "perf-optimizations", icon: <Zap size={16} />, label: "⚡ Frontend Performance (New!)" },
      ]
    },
    {
      label: "Business",
      items: [
        { id: "diamonds", icon: <Gem size={16} />, label: "Diamond Economy" },
        { id: "competitors", icon: <Award size={16} />, label: "Why We Stand Out" },
        { id: "recruiter", icon: <Briefcase size={16} />, label: "For Recruiters & HR" },
      ]
    },
    {
      label: "Resources",
      items: [
        { id: "tips", icon: <Star size={16} />, label: "Pro Tips (90+ Score)" },
        { id: "faq", icon: <Book size={16} />, label: "FAQ" },
        { id: "roadmap", icon: <TrendingUp size={16} />, label: "Future Roadmap" },
      ]
    },
  ];

  // ─── CONTENT SECTIONS ───
  const content = {
    overview: (
      <>
        <DocHeader title="Platform Overview" badge="Introduction" />
        <p className="text-slate-300 text-[15px] leading-relaxed mb-8">
          CVify Pro is not just a resume builder — it is a <strong className="text-text-primary">Career Intelligence Ecosystem</strong>. 
          The platform solves the "Black Box" problem of Applicant Tracking Systems by giving users a real-time, AI-backed auditor 
          that mimics Fortune 500 hiring pipelines. The architecture prioritizes <em>Aesthetics, Agency, and Authority</em>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard icon={<Target size={18} />} color="emerald" title="For Job Seekers" 
            desc="Build ATS-friendly resumes, generate targeted cover letters, and host a live, SEO-optimized digital portfolio with zero coding. Get honest, empathetic feedback that helps you grow." />
          <InfoCard icon={<Briefcase size={18} />} color="blue" title="For Recruiters" 
            desc="View candidates with verified GitHub data, actual project proof, transparent AI-matched skill alignments, and a 6-second first impression verdict. No more guessing." />
          <InfoCard icon={<Brain size={18} />} color="purple" title="Context-Aware Intelligence" 
            desc="The AI adapts scoring, keywords, and coaching tone based on experience level (Fresher → Senior) and market mode (Standard, Pakistan HR, Freelance, Remote)." />
          <InfoCard icon={<Shield size={18} />} color="amber" title="Anti-Hallucination Guarantee" 
            desc="6 strict rules ensure AI only references actual resume content. Hybrid scoring (AI × 0.6 + Server × 0.4) prevents random score inflation." />
        </div>
      </>
    ),

    setup: (
      <>
        <DocHeader title="Quick Setup (3 Min)" badge="Getting Started" />
        <Steps items={[
          { step: "1", title: "Create Account", desc: "Click \"Signup\" and verify your professional email. You'll receive 100 free diamonds to start." },
          { step: "2", title: "Complete Your Profile", desc: "Add your name, headline, professional summary, work experience, education, and skills in Profile Settings." },
          { step: "3", title: "Sync GitHub (Optional)", desc: "Connect your GitHub URL to automatically pull repo counts, languages, and contribution stats into your portfolio." },
          { step: "4", title: "Go Live!", desc: "Your Public Portfolio is instantly live at cvifypro.vercel.app/p/your-username — share it with recruiters!" },
        ]} />
      </>
    ),

    "magic-import": (
      <>
        <DocHeader title="Magic AI Import" badge="Intelligence Hub" />
        <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
          Don't start from scratch. Our <strong className="text-primary">Magic AI Import</strong> parses your existing PDF or DOCX resume and instantly builds a professional CVify Pro profile. 
        </p>
        <SectionTitle>Key Features</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Brain size={18} />} color="blue" title="Semantic Parsing" 
            desc="AI understands that 'Software Engineer' is a Role and 'Python' is a Skill, mapping them to the correct sections with 98% accuracy." />
          <InfoCard icon={<Zap size={18} />} color="emerald" title="Instant Hydration" 
            desc="Your entire professional timeline (Experience, Education, Projects) is populated in under 20 seconds." />
        </div>
        <SectionTitle>How to Use</SectionTitle>
        <Steps items={[
          { step: "1", title: "Open Resume Builder", desc: "Click the 'Magic Import' button in the builder header." },
          { step: "2", title: "Upload File", desc: "Select your PDF or DOCX resume (Max 5MB)." },
          { step: "3", title: "AI Analysis", desc: "Wait while our AI maps your story. Cost: 30 💎." },
        ]} />
      </>
    ),

    "intent-mode": (
      <>
        <DocHeader title="AI Intent Mode" badge="Intelligence Hub" />
        <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
          The <strong className="text-primary">Intelligence Command Bar</strong> allows you to optimize your resume using natural language. No more manual editing — just tell the AI what you want.
        </p>
        <SectionTitle>Example Commands</SectionTitle>
        <div className="space-y-3 mb-8">
          {[
            { cmd: "Rewrite my summary to sound more like a CEO", icon: <TrendingUp size={14} /> },
            { cmd: "Optimize my bullets for a Google Frontend role", icon: <Target size={14} /> },
            { cmd: "Make my experience section sound more technical", icon: <Cpu size={14} /> },
            { cmd: "Highlight my leadership skills in all bullet points", icon: <Users size={14} /> },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 text-sm italic font-medium text-slate-300">
              <span className="text-primary">{item.icon}</span> "{item.cmd}"
            </div>
          ))}
        </div>
        <SectionTitle>Pricing & Logic</SectionTitle>
        <p className="text-slate-400 text-[13px] leading-relaxed mb-4">
          Every execution costs <strong className="text-primary">30 💎</strong>. The AI analyzes your entire resume context before applying the requested changes to ensure consistency.
        </p>
      </>
    ),

    "job-matcher": (
      <>
        <DocHeader title="Job Matcher (JD Analysis)" badge="Intelligence Hub" />
        <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
          The <strong className="text-primary">Job Matcher</strong> mimics a real Applicant Tracking System (ATS). It audits your resume against a specific job description to find missing keywords and gaps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Target size={16} />} color="red" title="Compatibility Score" desc="A real-time percentage score showing how well you match the JD." />
          <InfoCard icon={<AlertCircle size={16} />} color="amber" title="Keyword Gaps" desc="Identifies exactly which skills or tools are missing from your profile." />
        </div>
        <SectionTitle>Usage Guide</SectionTitle>
        <Steps items={[
          { step: "1", title: "Select Matcher Tab", desc: "Go to the 'Matcher' section in the Resume Builder." },
          { step: "2", title: "Paste JD", desc: "Paste the job requirements from LinkedIn or any job board." },
          { step: "3", title: "Analyze", desc: "Click 'Analyze Job Match' (50 💎). You'll get a detailed strategy report." },
        ]} />
      </>
    ),

    "resume-audit": (
      <>
        <DocHeader title="Resume Intelligence Audit" badge="Intelligence Hub" />
        <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
          The <strong className="text-primary">Resume Intelligence Audit</strong> is a dual-mode validation engine designed to evaluate resumes dynamically. It bridges the gap between static content writing and modern ATS criteria, ensuring your resume meets recruiter expectations instantly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Zap size={18} />} color="emerald" title="Zero-Latency Live Scoring" 
            desc="Heuristic client-side algorithms recalculate metrics in real-time as you type, giving instant visual feedback without API cost or delay." />
          <InfoCard icon={<Brain size={18} />} color="blue" title="Magic Import Synchronicity" 
            desc="Leverages structure models generated during AI imports to prioritize deep extraction analyses and structural evaluations." />
        </div>

        <SectionTitle>How the Audit Engine Works</SectionTitle>
        <p className="text-slate-300 text-[14px] leading-relaxed mb-6">
          The engine operates using a fallback architecture. When you upload a resume via <strong>Magic Import</strong>, it receives structural scores directly from the server. As you manually edit or create a resume from scratch, the client-side engine executes local validation functions in real-time to compute scores on-the-fly.
        </p>

        {/* --- Visual Diagrams Showcase --- */}
        <SectionTitle>Technical Diagrams & Data Workflows</SectionTitle>
        <div className="space-y-12 my-8">
          {/* Architecture */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
            <h4 className="font-black text-sm text-white mb-2">1. Technical System Architecture</h4>
            <p className="text-xs text-slate-400 mb-4">
              Demonstrates the flow from inputs (Magic Import or Manual Editor) through the Redux store, and shows how the merge selector chooses between parsingAnalysis and live computed scores.
            </p>
            <pre className="font-mono text-[10px] md:text-xs bg-slate-950 border border-white/5 p-5 rounded-2xl overflow-x-auto leading-relaxed text-emerald-400">
{`  ┌──────────────────────────────────────────────────────────┐
  │                        INPUTS                            │
  │  ┌──────────────────────────┐  ┌──────────────────────┐  │
  │  │ Magic Import (File Upload)│  │ Manual Editor Build  │  │
  │  └─────────────┬────────────┘  └──────────┬───────────┘  │
  └────────────────┼──────────────────────────┼──────────────┘
                   ▼                          ▼
  ┌──────────────────────────────────────────────────────────┐
  │                      REDUX STORE                         │
  │       [ parsingAnalysis ]         [ currentResume ]      │
  └────────────────┬──────────────────────────┬──────────────┘
                   │                          │
                   ▼                          ▼
  ┌──────────────────────────────────────────────────────────┐
  │                      FALLBACK MERGER                     │
  │  Is parsingAnalysis present?                             │
  │  ├─▶ YES: Use parsed server scores                      │
  │  └─▶ NO:  Run live client Heuristic Engine               │
  └────────────────────────────┬─────────────────────────────┘
                               ▼
  ┌──────────────────────────────────────────────────────────┐
  │                   RESUME ANALYZER VIEW                   │
  │ [ Completeness: 40% ] [ Quantification: 35% ] [ Impact: 25% ] │
  └──────────────────────────────────────────────────────────┘`}
            </pre>
          </div>

          {/* DFD */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
            <h4 className="font-black text-sm text-white mb-2">2. Data Flow Diagram (DFD Level 1)</h4>
            <p className="text-xs text-slate-400 mb-4">
              Traces how data moves from user inputs, through the parser service, to databases/Redux stores, and how final scoring metrics are assembled for UI rendering.
            </p>
            <pre className="font-mono text-[10px] md:text-xs bg-slate-950 border border-white/5 p-5 rounded-2xl overflow-x-auto leading-relaxed text-blue-400">
{`     ┌────────┐             PDF / DOCX File             ┌─────────────┐
     │  User  │────────────────────────────────────────▶│ P1: Upload  │
     └────▲───┘                                         └──────┬──────┘
          │                                                    │ Raw Text
          │ Visual Dashboard                                   ▼
     ┌────┴──────┐      parsingAnalysis         ┌─────────────────────────────┐
     │ Render UI │◀─────────────────────────────│ P2: Parse & Extract (Gemini)│
     └────▲──────┘                              └──────────────┬──────────────┘
          │                                                    │ Save Resume
          │ finalScores                                        ▼
     ┌────┴────────┐   liveScores    ┌─────────────────┐  Save  ┌──────────────┐
     │ P5: Merger  │◀────────────────│ P4: Live Engine │◀──────▶│ D2: Database │
     └────▲────────┘                 └────────▲────────┘        └──────────────┘
          │                                   │
          └─────────── currentResume ─────────┘`}
            </pre>
          </div>

          {/* Decision Tree */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
            <h4 className="font-black text-sm text-white mb-2">3. Decision Tree & Scoring Logic Flow</h4>
            <p className="text-xs text-slate-400 mb-4">
              A logical map showcasing how completeness, quantification, and impact are calculated mathematically, leading to overall category verdicts.
            </p>
            <pre className="font-mono text-[10px] md:text-xs bg-slate-950 border border-white/5 p-5 rounded-2xl overflow-x-auto leading-relaxed text-amber-400">
{`  User opens Analyzer View
             │
             ▼
   Is parsingAnalysis in Redux?
   ├── YES ──▶ Use AI parser scores (Magic Import)
   └── NO  ──▶ Run live computeScores(currentResume)
                     │
                     ▼
         ┌───────────┴───────────┐
         │ Live Score Algorithms │
         └───────────┬───────────┘
                     ├─▶ Completeness (Weight: 40%) ──▶ Checks 8 structural fields
                     ├─▶ Quantification (Weight: 35%) ─▶ Checks metrics & stats count
                     └─▶ Impact Language (Weight: 25%) ─▶ Matches 26 action verbs
                     │
                     ▼
       Overall Weighted Percentage calculated
                     │
                     ├─▶ Overall >= 70% ──▶ "Good" (Green UI status)
                     ├─├─▶ Overall >= 40% ──▶ "Fair" (Amber UI status)
                     └──▶ Overall < 40% ───▶ "Needs Work" (Red UI status)`}
            </pre>
          </div>
        </div>

        <SectionTitle>Scoring Methodology</SectionTitle>
        <p className="text-slate-300 text-[14px] leading-relaxed mb-6">
          The audit engine splits evaluations into three metrics:
        </p>

        <div className="space-y-4 mb-8">
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h5 className="font-black text-sm text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completeness Score (40% Weight)
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Checks for the presence of 8 crucial resume modules: Full Name, Email, Profile Summary, Phone Number, Work Experience, Education, Skills, and Projects. Lacking any of these triggers warning flags as they are ATS compliance requirements.
            </p>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h5 className="font-black text-sm text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Measurable Results (35% Weight)
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes all bullet points in your work experience to count metrics, stats, percentages, and dollar amounts. Resumes with quantifiable impact (e.g. "Optimized DB speed by 40%") receive significantly higher scores.
            </p>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h5 className="font-black text-sm text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Impact Language (25% Weight)
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cross-references the first word of every bullet point against a library of 26 active action verbs (e.g. "Architected", "Spearheaded", "Refactored"). Replaces weak filler phrases ("Responsible for") with strong, direct verbs.
            </p>
          </div>
        </div>
      </>
    ),

    ats: (
      <>
        <DocHeader title="ATS v4.0 Precision Engine" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          CVify Pro's ATS Scanner is a <strong className="text-text-primary">3-Layer Intelligence Engine</strong> that audits your resume with 99.99% accuracy.
        </p>

        <SectionTitle>Deep Scan Process</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<BarChart3 size={16} />} color="purple" title="4-Dimension Score" desc="Formatting, Keywords, Quantification, Impact — each with WHY justification." />
          <InfoCard icon={<Eye size={16} />} color="amber" title="6-Second Verdict" desc="Psychological simulation of what a recruiter thinks at first glance." />
        </div>
        
        <p className="text-slate-400 text-[13px] italic">
          Full AI ATS Scan costs <strong className="text-primary">50 💎</strong> per new version. Re-scans within 24h of the same content are discounted or FREE.
        </p>
      </>
    ),

    coach: (
      <>
        <DocHeader title="AI Resume Coach PRO" badge="Premium Intelligence" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          The AI Resume Coach is your **Interactive Career Strategist**. It doesn't just scan; it guides you through a personalized "Healing Plan" to optimize your resume scientifically.
        </p>

        <SectionTitle>Key Optimization Metrics</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<TrendingUp size={18} />} color="emerald" title="Potential Score Meter" 
            desc="Gemini calculates your 'Actual' vs 'Potential' score. Implement all fixes to reach your scientific goal (e.g., 68% -> 92%)." />
          <InfoCard icon={<ShieldCheck size={18} />} color="blue" title="Reality & Dealbreaker Check" 
            desc="6 strict rules prevent lying. If a job has a hard requirement (Visa/Language/Exp) you lack, the AI flags it as a Dealbreaker." />
          <InfoCard icon={<GitBranch size={18} />} color="purple" title="Interactive Checklist" 
            desc="Every loophole and win is a checkable task. Progress is saved in LocalStorage per scan so you never lose your flow." />
          <InfoCard icon={<Eye size={18} />} color="amber" title="Recruiter First Impression" 
            desc="A psychological simulation of what a hiring manager thinks after seeing the 'Fixed' version of your resume." />
        </div>

        <SectionTitle>The Strategy Report (PDF)</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          Download a branded **Coaching Bible** (PDF) that includes all your section rewrites, quick wins, and the overall game plan. Perfect for offline reference while editing.
        </p>

        <SectionTitle>How to Use the Coach</SectionTitle>
        <Steps items={[
          { step: "1", title: "Run ATS Scan", desc: "Coaching hints are generated automatically with every scan (0 extra diamond cost)." },
          { step: "2", title: "Review Reality Checks", desc: "Check for Dealbreakers first — if it's a hard 'No', don't waste time on the resume." },
          { step: "3", title: "Implementation Cycle", desc: "Check off items in the HUD. Watch your Potential Score bar reach the goal." },
          { step: "4", title: "Jump to Builder", desc: "Click 'Fix in Builder' on any hint to jump to that specific resume section instantly." },
        ]} />
      </>
    ),

    "cover-letter": (
      <>
        <DocHeader title="AI Cover Letter Generator" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Generate personalized, role-specific cover letters in seconds. The AI performs a "Handshake" between your resume achievements and the company's mission.
        </p>
        <SectionTitle>3 Personality Styles</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard icon={<Briefcase size={16} />} color="blue" title="Professional" desc="Formal, corporate tone. Perfect for banking, consulting, and government." />
          <InfoCard icon={<Sparkles size={16} />} color="purple" title="Creative" desc="Bold, engaging tone for startups and design roles. Shows personality." />
          <InfoCard icon={<Zap size={16} />} color="emerald" title="Enthusiastic" desc="High-energy tone where culture fit matters. Great for tech startups." />
        </div>
        <SectionTitle>How It Works</SectionTitle>
        <Steps items={[
          { step: "1", title: "Select Style", desc: "Choose Professional, Creative, or Enthusiastic." },
          { step: "2", title: "Paste JD", desc: "The AI extracts company name, role, and key requirements automatically." },
          { step: "3", title: "Generate", desc: "In 10-15 seconds, your tailored cover letter is ready. Edit, copy, or download. Cost: 20 💎." },
        ]} />
      </>
    ),

    portfolio: (
      <>
        <DocHeader title="Live Portfolio (No-Code Personal Brand)" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Update your dashboard, and the world sees it live — no HTML, no hosting, no code. Every profile at <code className="text-primary text-xs bg-primary/10 px-2 py-0.5 rounded-lg">cvifypro.vercel.app/p/username</code>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<Layout size={16} />} color="blue" title="Professional Header" desc="Name, headline, bio, profile picture — premium branding with shine-effect logo." />
          <InfoCard icon={<Briefcase size={16} />} color="emerald" title="Work Experience" desc="Timeline-style display with structured responsibilities and achievements." />
          <InfoCard icon={<Award size={16} />} color="purple" title="Skills & Proof Tags" desc="Categorized skills with proficiency bars and auto-generated proof badges." />
          <InfoCard icon={<Eye size={16} />} color="amber" title="Project Showcase" desc="Cyberpunk grid with images, tech stacks, live links, and descriptions." />
          <InfoCard icon={<GitBranch size={16} />} color="emerald" title="GitHub Integration" desc="Live repo count, languages, and contribution stats via authenticated proxy." />
          <InfoCard icon={<Star size={16} />} color="blue" title="Testimonials" desc="Ratings and review quotes from colleagues or clients for social proof." />
          <InfoCard icon={<Target size={16} />} color="red" title="ATS Score Badge" desc="Latest audit score displayed prominently for recruiter trust." />
          <InfoCard icon={<MessageSquare size={16} />} color="purple" title="Contact Actions" desc="One-click WhatsApp, Email, LinkedIn, and Resume Download buttons." />
        </div>
        <SectionTitle>SEO & Discoverability</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed">
          Every profile has dynamic OG tags, Twitter cards, and <strong className="text-text-primary">JSON-LD structured data</strong> for Google Knowledge Graph integration. Sharing on LinkedIn generates a beautiful metadata card with user's headline and image.
        </p>
        <SectionTitle>7 Premium Themes</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed">
          CVify Classic, Midnight Dev, Corporate Gold, Creative Sunset, Slate Minimalist, Emerald Leader, and the brand-new <strong className="text-amber-400">🕌 ORIENTAL LUXE</strong> — each with unique background animations, customizable accent colors, card styles, and interactive particle effects. All themes now support mouse-hover particle interactivity.
        </p>
      </>
    ),

    "shareable-links": (
      <>
        <DocHeader title="Public Shareable Links" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Every resume you create can now be instantly published as a standalone, read-only webpage. Perfect for sharing with recruiters via email, LinkedIn, or WhatsApp.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Globe size={16} />} color="blue" title="Unique Slugs" desc="Generates a secure, 12-character base64url slug for each shared document." />
          <InfoCard icon={<Eye size={16} />} color="emerald" title="View Tracking" desc="Tracks the exact number of times recruiters have opened your resume link." />
          <InfoCard icon={<ShieldCheck size={16} />} color="purple" title="Access Control" desc="Toggle sharing on or off instantly. Revoke access anytime." />
          <InfoCard icon={<FileText size={16} />} color="amber" title="PDF Download Control" desc="Choose whether visitors are allowed to download the PDF version." />
        </div>
        <SectionTitle>Recruiter Experience (404 Fallback)</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          If you disable sharing after sending a link, recruiters won't see a broken page. They see a professional "This resume is no longer publicly available" screen with a call-to-action to create their own CVify Pro account — acting as a viral marketing loop.
        </p>
      </>
    ),

    "document-identity": (
      <>
        <DocHeader title="Document Identity (Titles)" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Manage multiple tailored resumes easily. Instead of every resume being named after your full name, CVify Pro now utilizes <strong className="text-primary">Document Identity</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<FileText size={16} />} color="emerald" title="Inline Editing" desc="Click the title in the Builder Header to rename your document instantly." />
          <InfoCard icon={<GitBranch size={16} />} color="blue" title="Smart Cloning" desc="When duplicating a resume, the title automatically appends '(Copy)' to prevent naming collisions." />
          <InfoCard icon={<Database size={16} />} color="purple" title="Future-Proof Architecture" desc="Document Identity acts as the primary anchor for future features like Folders, Search, and Version History." />
        </div>
      </>
    ),

    profile: (
      <>
        <DocHeader title="User Profile & Dashboard" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Your dashboard is the command center. Every change is instantly reflected on your live portfolio. Features HUD Analytics with real-time profile views, contact clicks, and resume downloads.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<FileText size={16} />} color="blue" title="Core Info" desc="Name, headline, professional summary, location, contact details." />
          <InfoCard icon={<Briefcase size={16} />} color="emerald" title="Experience" desc="Multiple positions with structured bullet points. Each bullet individually editable." />
          <InfoCard icon={<Book size={16} />} color="purple" title="Education" desc="Degrees, certifications, institutions with date ranges." />
          <InfoCard icon={<Zap size={16} />} color="amber" title="Skills" desc="Categorized (Technical, Soft, Tools) with percentage-based proficiency sliders." />
          <InfoCard icon={<Eye size={16} />} color="red" title="Projects" desc="Add/edit/delete showcase projects with images, tech stacks, and live/source links." />
          <InfoCard icon={<Star size={16} />} color="blue" title="Clients & Testimonials" desc="Client logos and testimonial quotes with ratings for social proof." />
        </div>
      </>
    ),

    "ai-representative": (
      <>
        <DocHeader title="🤖 AI Representative (Smart Bot)" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Every CVify Pro portfolio features an elite <strong className="text-teal-400">Smart AI Representative</strong>. This is not a generic chatbot — it's a deeply integrated digital twin that holds your entire portfolio in memory, answering recruiter questions instantly with 0ms latency.
        </p>
        
        <SectionTitle>Deep Client-Side NLP Engine</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          The bot runs a powerful <strong>Zero-Latency NLP scanner</strong> directly in the browser. It tokenizes user input, ignores stop words, and actively scans your local data (Skills, Projects, Experience, Contact, Location) to return instant factual answers without making API calls.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Zap size={16} />} color="emerald" title="0ms Local Hydration" desc="Queries like 'Does he know React?' are answered instantly by scanning the skills array locally." />
          <InfoCard icon={<Brain size={16} />} color="purple" title="Agentic Cloud Fallback" desc="For abstract or complex conversational queries, the bot seamlessly falls back to the Groq API LLM." />
          <InfoCard icon={<MessageSquare size={16} />} color="blue" title="Strict Formatting" desc="The bot is programmed to avoid filler text ('Sure! Here you go...'), outputting clean markdown bullet points only." />
          <InfoCard icon={<Star size={16} />} color="amber" title="Persistent Actions" desc="Sticky matrix of quick-action buttons (Show Experience, View Projects, Explore Skills) remains accessible above the chat input." />
        </div>

        <SectionTitle>Global Rate Limits & Smart Auto-Pay</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          To protect portfolio owners from malicious traffic spikes while maintaining a seamless visitor experience, the AI features a robust <strong>Global Daily Limit Architecture</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Shield size={16} />} color="rose" title="Global 24H Window" desc="Limits are calculated across all visitors combined for a 24-hour window, rather than per individual visitor, preventing mass automated drains." />
          <InfoCard icon={<Gem size={16} />} color="emerald" title="Smart Tiered Auto-Pay" desc="After the initial free limit (default 5), a 2-query grace period is offered. Then, the system dynamically upgrades via Diamond tiers (15💎 for 5 queries, 20💎 for 10, etc.) up to a maximum hard cap." />
          <InfoCard icon={<AlertCircle size={16} />} color="amber" title="Fake System Fault" desc="When limits are fully exhausted, the AI gracefully fails by claiming a 'Server Interruption', hiding the rate limit from visitors and presenting the candidate's direct contact list." />
          <InfoCard icon={<Settings2 size={16} />} color="purple" title="Builder Dashboard Control" desc="Portfolio owners can toggle Smart Auto-Pay, fixed legacy packages, or completely block AI chat directly from the new AI Settings dashboard." />
        </div>

        <SectionTitle>Elite UI & Personalization</SectionTitle>
        <div className="p-5 bg-teal-500/5 border border-teal-500/20 rounded-2xl mb-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-[13px]">
              <span className="font-black text-teal-400 w-28 flex-shrink-0">Dynamic Avatar</span>
              <span className="text-text-secondary">The Floating Action Button (FAB) uses the candidate's actual profile picture with a pulsing neon ring to signify an "Online" presence.</span>
            </div>
            <div className="flex items-start gap-3 text-[13px]">
              <span className="font-black text-teal-400 w-28 flex-shrink-0">Cyberpunk Fallback</span>
              <span className="text-text-secondary">If no photo is available, it gracefully defaults to a futuristic glowing robot icon using sleek drop-shadows.</span>
            </div>
          </div>
        </div>
      </>
    ),

    engine: (
      <>
        <DocHeader title="The 3-Layer ATS Intelligence Engine" badge="Technical" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Built on a "Layered Defense" strategy — 3 independent analysis layers that cross-validate each other for 99.99% accuracy.
        </p>
        <div className="space-y-4">
          <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <h4 className="font-black text-blue-400 text-sm mb-2">Layer 1: Structural Parsing (Regex/NLP)</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">Server-side regex scans for section headers, date formats, contact info. Penalizes non-standard patterns that break ATS parsers.</p>
          </div>
          <div className="p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
            <h4 className="font-black text-purple-400 text-sm mb-2">Layer 2: NLP Keyword Engine (Compromise.js)</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">Extracts nouns from JD, cross-references with synonyms database. Quantification Check scans every bullet for numbers, currency, and volume metrics.</p>
          </div>
          <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
            <h4 className="font-black text-emerald-400 text-sm mb-2">Layer 3: Generative AI Deep Audit (Gemini 2.5 Flash)</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">Final contextual analysis. Evaluates career-stage fit, impact quality, and provides coaching with anti-hallucination guardrails.</p>
          </div>
        </div>
        <SectionTitle>Hybrid Score Calibration</SectionTitle>
        <div className="p-5 bg-primary/5 border border-primary/10 rounded-2xl">
          <p className="text-text-secondary text-[13px] leading-relaxed">
            <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">Final Score = AI Score × 0.6 + Server NLP Score × 0.4</code>
            <br className="mb-2" />This prevents AI from randomly inflating or deflating scores. Same resume = same score every time.
          </p>
        </div>
        <SectionTitle>Dynamic Scoring Weights</SectionTitle>
        <ComparisonTable items={[
          { left: "Fresher", right: "Keywords 35% | Formatting 30% | Quantification 10% | Impact 10% | X-Factor 15%" },
          { left: "Junior", right: "Keywords 30% | Formatting 25% | Quantification 15% | Impact 15% | X-Factor 15%" },
          { left: "Mid-Level", right: "Keywords 25% | Formatting 20% | Quantification 25% | Impact 20% | X-Factor 10%" },
          { left: "Senior", right: "Keywords 20% | Formatting 15% | Quantification 30% | Impact 30% | X-Factor 5%" },
        ]} />
      </>
    ),

    themes: (
      <>
        <DocHeader title="All 13 Portfolio Themes" badge="Visual Design" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Every CVify Pro portfolio comes with <strong className="text-text-primary">13 handcrafted, premium themes</strong> — each a complete visual identity with its own typography, color palette, card style, background animation, and interactive particle effects. All themes are powered by the new <strong className="text-primary">Theme Engine v4.0</strong> — a pluggable, 5-layer architecture that auto-discovers themes at build time. All themes share the same <strong className="text-text-primary">Universal Floating Navbar</strong> for consistent navigation.
        </p>
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl mb-8 flex items-start gap-3">
          <Palette size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-text-secondary leading-relaxed"><strong className="text-primary">Theme Engine v4.0:</strong> Themes are lazy-loaded chunks, auto-registered via <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">import.meta.glob</code>, and sandbox-validated at build time. To add a new theme, run <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">npm run create-theme &lt;name&gt;</code>. No manual imports or PublicProfile.jsx edits needed. See the <button onClick={() => setActiveSection("theme-engine")} className="text-primary underline font-bold">Theme Engine v4.0</button> section for full architecture details.</p>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { icon: "🌐", name: "CVify Classic", accent: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5", desc: "The original CVify signature look. Clean dark navy background with blue accent tones. Best for developers, engineers, and tech professionals who want a polished, trustworthy look.", tags: ["Dark Mode", "Blue Accent", "Professional"] },
            { icon: "🌙", name: "Midnight Dev", accent: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/5", desc: "Built for coders. Deep midnight purple background with interactive particle field that reacts to your mouse cursor in repulse mode. Animated geometric grid overlay for an immersive feel.", tags: ["Dark Mode", "Particles FX", "Mouse Reactive", "Developers"] },
            { icon: "💼", name: "Corporate Gold", accent: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/5", desc: "Authority and prestige. Dark charcoal base with warm gold accents. Diagonal stripe overlay and classic typography. Perfect for executives, finance professionals, and senior management roles.", tags: ["Dark Mode", "Gold Accent", "Executive"] },
            { icon: "🌅", name: "Creative Sunset", accent: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/5", desc: "Vibrant gradient energy. Warm orange-to-pink sunset tones with animated bokeh blobs in the background. Ideal for designers, artists, content creators, and startup founders.", tags: ["Dark Mode", "Gradient Blobs", "Creative"] },
            { icon: "📋", name: "Slate Minimalist", accent: "text-slate-300", border: "border-slate-500/20", bg: "bg-slate-500/5", desc: "Precision in simplicity. Light gray background with barely-there noise texture. Ultra-clean typography with maximum readability. Best suited for consultants, academics, and corporate professionals.", tags: ["Light Mode", "Minimal", "Clean"] },
            { icon: "🌿", name: "Emerald Leader", accent: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", desc: "Natural authority. Deep forest green palette exuding calm confidence and leadership. Great for sustainability professionals, project managers, and team leads.", tags: ["Dark Mode", "Green Accent", "Leadership"] },
            { icon: "🕌", name: "ORIENTAL LUXE", accent: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5", desc: "Ultra-exotic and luxurious. Ultra-dark near-black background (#090909) with warm gold (#b58953) accents. Geometric SVG mandala patterns float behind the profile using the Outfit font. Exudes luxury, sophistication, and cultural richness.", tags: ["Dark Mode", "Gold Luxury", "Geometric FX"] },
            { icon: "✨", name: "AURA DARK", accent: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5", desc: "Pure darkness meets cosmic elegance. Absolute black background (#000000) with deep purple accents (#B677EF). Uses the modern Syne font for a cutting-edge aesthetic. Perfect for tech innovators, startup founders, and creators pushing boundaries.", tags: ["Dark Mode", "Purple Accent", "Minimal"] },
            { icon: "💻", name: "TERMINAL DARK", accent: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/5", desc: "The 3D Developer Portfolio aesthetic reborn inside CVify Pro. Deep midnight blue background (#050816), sleek neon purple (#915eff) accents, a glowing profile avatar in the hero, timeline experience cards, and project cards with hashtag tech stacks. Perfect for developers who want a serious, high-impact first impression.", tags: ["Dark Mode", "Purple Neon", "Developer"] },
            { icon: "🟢", name: "CYBER NEON", accent: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", desc: "Cutting-edge hacker aesthetic inspired by the Catppuccin design language. Near-black background (#080808) with electric neon green (#00ffcc) accents. Uses the Orbitron monospace font with glow effects on all interactive elements. Full GitHub stats integration and a sleek scrolling experience.", tags: ["Dark Mode", "Neon Green", "Hacker", "NEW!"] },
            { icon: "🖋️", name: "MONOGRAPH", accent: "text-slate-300", border: "border-white/20", bg: "bg-white/5", desc: "CVify Pro's premier editorial theme. Stark black headers against an off-white reading canvas with brutalist borders and IBM Plex Sans typography. Designed for authors, journalists, researchers, and professionals who demand a high-contrast, typographic-first presentation that reads like a premium magazine.", tags: ["Light Mode", "High Contrast", "Editorial", "NEW!"] },
            { icon: "🌑", name: "NOIR", accent: "text-orange-500", border: "border-orange-500/20", bg: "bg-orange-500/5", desc: "Flagship premium minimalist dark theme. Absolute black background, Satoshi typography, custom motion system, and subtle orange accents.", tags: ["Dark Mode", "Minimal", "Premium", "Flagship"] },
            { icon: "🏆", name: "APEX", accent: "text-teal-400", border: "border-teal-500/20", bg: "bg-teal-500/5", desc: "Clean, modern, minimal, and recruiter-focused dark aesthetic. Uses Outfit typography, electric teal highlights, and a structured, low-friction professional layout optimized for enterprise recruiters.", tags: ["Dark Mode", "Teal Accent", "Recruiter", "NEW!"] },
          ].map((theme, i) => (
            <div key={i} className={`p-5 rounded-2xl border ${theme.border} ${theme.bg}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{theme.icon}</span>
                  <h4 className={`font-black text-sm ${theme.accent}`}>{theme.name}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {theme.tags.map((tag, j) => (
                    <span key={j} className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${theme.border} ${theme.accent} opacity-80`}>{tag}</span>
                  ))}
                </div>
              </div>
              <p className="text-text-secondary text-[13px] leading-relaxed">{theme.desc}</p>
            </div>
          ))}
        </div>

        <SectionTitle>How to Switch Themes</SectionTitle>
        <Steps items={[
          { step: "1", title: "Open Your Portfolio", desc: "Go to your Public Profile page (cvifypro.vercel.app/p/username)." },
          { step: "2", title: "Click Theme Editor", desc: "Tap the palette button (🎨) in the bottom-right corner — available in both light and dark mode." },
          { step: "3", title: "Select & Apply", desc: "Click any theme card to instantly preview it live on your profile. Your selection is saved automatically." },
        ]} />
      </>
    ),

    "resume-templates": (
      <>
        <DocHeader title="12 Resume PDF Templates" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Beyond the live digital portfolio, CVify Pro provides a world-class PDF generation engine. You can now choose from 12 distinct, ATS-optimized layout templates directly inside the Resume Builder.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Layout size={18} />} color="blue" title="Real-Time Layout Switcher"
            desc="The 'Designer' tab provides a visual grid of all 12 templates. Clicking any template instantly reformats your entire resume layout without losing any content." />
          <InfoCard icon={<FileText size={18} />} color="purple" title="Intelligent Hydration"
            desc="When generating the PDF or viewing a Public Link, the exact template layout you selected is perfectly preserved and applied to the render engine." />
          <InfoCard icon={<Eye size={18} />} color="emerald" title="WYSIWYG Preview"
            desc="What You See Is What You Get. The live preview in the builder shows exactly how the layout will respond to your content structure." />
        </div>
      </>
    ),

    monograph: (
      <>
        <DocHeader title="🖋️ MONOGRAPH Theme" badge="Premium Theme" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          <strong className="text-white">MONOGRAPH</strong> is CVify Pro's premier editorial theme — designed for authors, journalists, researchers, and professionals who demand a high-contrast, typographic-first presentation that reads like a premium magazine.
        </p>

        <SectionTitle>Visual Identity</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Palette size={18} />} color="slate" title="Editorial Contrast"
            desc="Stark black headers (#000000) against an off-white reading canvas (#FAFAF9) provide maximum readability and a sophisticated print-like aesthetic." />
          <InfoCard icon={<FileText size={18} />} color="slate" title="IBM Plex Sans Typography"
            desc="A highly legible, neo-grotesque typeface that brings a modern yet intellectual feel to every section of your portfolio." />
          <InfoCard icon={<Layout size={18} />} color="slate" title="Brutalist Borders"
            desc="Sharp, high-contrast borders and dividers separate content blocks, mimicking editorial grids found in high-end publications." />
          <InfoCard icon={<Zap size={18} />} color="slate" title="Monochromatic Elegance"
            desc="Zero flashy colors. Focuses entirely on content hierarchy, whitespace, and stark contrast to make your professional achievements the sole focus." />
        </div>

        <SectionTitle>What Makes It Different</SectionTitle>
        <div className="p-5 bg-white/5 border border-white/20 rounded-2xl mb-6">
          <div className="space-y-3">
            {[
              { label: "Background", val: "Two-tone: Solid black header, warm off-white body (#FAFAF9)" },
              { label: "Color Mode", val: "High-contrast Light Mode" },
              { label: "Accent Color", val: "Absolute Black (#000000)" },
              { label: "Card Style", val: "Editorial — sharp borders, bold titles, structured grids" },
              { label: "Font", val: "IBM Plex Sans — intellectual and highly readable" },
              { label: "Icon", val: "🖋️ Fountain Pen — representing authorship and editorial quality" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <span className="font-black text-white w-28 flex-shrink-0">{row.label}</span>
                <span className="text-text-secondary">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionTitle>Best For</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Writers & Authors", "Journalists", "Researchers", "Academics", "Legal Professionals", "Editorial Designers"].map((role, i) => (
            <div key={i} className="p-3 bg-white/5 border border-white/15 rounded-xl text-center">
              <p className="text-white font-black text-xs">{role}</p>
            </div>
          ))}
        </div>
      </>
    ),

    noir: (
      <>
        <DocHeader title="🌑 NOIR Theme" badge="Flagship Theme" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          <strong className="text-white">NOIR</strong> is CVify Pro's flagship premium dark theme. Inspired by modern minimalist developer portfolios and contemporary product design systems, it prioritizes whitespace, typography, and a calm, confident presentation.
        </p>

        <SectionTitle>Visual Identity & Philosophy</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Palette size={18} />} color="orange" title="Absolute Minimal"
            desc="Deep black background (#060606) with off-white text and subtle near-invisible gradient overlays to maintain a calm hero area." />
          <InfoCard icon={<FileText size={18} />} color="orange" title="Typography First"
            desc="Utilizes Satoshi for main text and headings, paired with GeistMono for labels, numbers, and code elements." />
          <InfoCard icon={<Layout size={18} />} color="orange" title="Structured Grid"
            desc="Strict 12-column desktop, 8-column tablet, and 1-column mobile layout system with consistent Y-axis spacing (96px, 80px, 64px)." />
          <InfoCard icon={<Zap size={18} />} color="orange" title="Custom Motion System"
            desc="Carefully designed motion with specific duration (300ms, 450ms, 700ms) and easeOut easing. Features a subtle desktop-only custom cursor." />
        </div>

        <SectionTitle>What Makes It Different</SectionTitle>
        <div className="p-5 bg-white/5 border border-white/20 rounded-2xl mb-6">
          <div className="space-y-3">
            {[
              { label: "Background", val: "Deep Black (#060606) with 10% visible aurora" },
              { label: "Color Mode", val: "Minimalist Dark Mode" },
              { label: "Accent Color", val: "Vivid Orange/Red (#FF2E0C)" },
              { label: "Card Style", val: "Minimal — relying on border-y and border-white/5" },
              { label: "Font", val: "Satoshi + GeistMono" },
              { label: "Icon", val: "🌑 New Moon — representing the calm, deep dark aesthetic" },
              { label: "Interactivity", val: "Desktop custom pointer, scroll-based image scaling (1 to 1.08x)" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <span className="font-black text-white w-28 flex-shrink-0">{row.label}</span>
                <span className="text-text-secondary">{row.val}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    ),

    "aura-dark": (
      <>
        <DocHeader title="✨ AURA DARK Theme" badge="New Theme" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          <strong className="text-purple-400">AURA DARK</strong> is CVify Pro's most minimalist and futuristic portfolio theme — engineered for tech professionals, startup founders, and creatives who want a distraction-free, cosmic aesthetic that lets their work speak.
        </p>

        <SectionTitle>Visual Identity</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Palette size={18} />} color="purple" title="Absolute Black Canvas"
            desc="Pure black background (#000000) creates the ultimate premium minimalism. Requires zero light compensation, perfect for late-night viewing and reduces eye strain." />
          <InfoCard icon={<Sparkles size={18} />} color="purple" title="Cosmic Purple Accents"
            desc="Vibrant purple (#B677EF) is used for all interactive elements, links, and hover states — cosmic, electric, and unforgettable." />
          <InfoCard icon={<Layout size={18} />} color="purple" title="Syne Typeface"
            desc="Modern, geometric sans-serif from Google Fonts. Sharp angles and contemporary design convey innovation, tech expertise, and forward-thinking." />
          <InfoCard icon={<GitBranch size={18} />} color="purple" title="GitHub Insight Panel"
            desc="A dedicated GitHub Intelligence section shows live repository and contribution metrics, making your technical credibility visible on the spot." />
          <InfoCard icon={<Zap size={18} />} color="purple" title="Minimal Card Style"
            desc="Ultra-clean card design with zero decoration. Borderless, shadow-free — every element is intentional and purposeful." />
        </div>

        <SectionTitle>What Makes It Different</SectionTitle>
        <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-2xl mb-6">
          <div className="space-y-3">
            {[
              { label: "Background", val: "Absolute black (#000000) — the darkest possible background" },
              { label: "Color Mode", val: "Pure dark mode — zero light components" },
              { label: "Accent Color", val: "Cosmic Purple (#B677EF) — energetic and memorable" },
              { label: "Card Style", val: "Minimal — borderless, shadow-free design" },
              { label: "Font", val: "Syne — modern geometric typeface from Google Fonts" },
              { label: "Icon", val: "✨ Sparkles — representing cosmic energy and innovation" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <span className="font-black text-purple-400 w-28 flex-shrink-0">{row.label}</span>
                <span className="text-text-secondary">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionTitle>Best For</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Tech Innovators", "Startup Founders", "Creative Developers", "Digital Artists", "Future Thinkers", "Minimalist Professionals"].map((role, i) => (
            <div key={i} className="p-3 bg-purple-500/5 border border-purple-500/15 rounded-xl text-center">
              <p className="text-purple-400 font-black text-xs">{role}</p>
            </div>
          ))}
        </div>
      </>
    ),

    "oriental-luxe": (
      <>
        <DocHeader title="🕌 ORIENTAL LUXE Theme" badge="Premium Theme" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          <strong className="text-amber-400">ORIENTAL LUXE</strong> is CVify Pro's most premium and culturally distinctive portfolio theme — handcrafted for professionals who want to stand out with elegance, exclusivity, and a bold visual identity.
        </p>

        <SectionTitle>Visual Identity</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Palette size={18} />} color="amber" title="Ultra-Dark Palette"
            desc="Near-black background (#090909 body, #101010 header) creates a luxurious canvas. Maximum contrast makes every element pop with premium clarity." />
          <InfoCard icon={<Sparkles size={18} />} color="amber" title="Gold Accent System"
            desc="Warm gold (#b58953) is used for all interactive elements, highlights, and hover states — evoking prestige, heritage, and high-end branding." />
          <InfoCard icon={<Layout size={18} />} color="purple" title="Geometric SVG Backgrounds"
            desc="Custom floating mandala-inspired SVG patterns are layered behind the profile content with subtle opacity, creating depth without distraction." />
          <InfoCard icon={<Eye size={18} />} color="blue" title="Outfit Typography"
            desc="Uses the modern 'Outfit' Google Font — geometric, clean, and versatile. Delivers both personality and professionalism in the same typeface." />
        </div>

        <SectionTitle>What Makes It Different</SectionTitle>
        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl mb-6">
          <div className="space-y-3">
            {[
              { label: "Background", val: "Custom geometric SVG mandala patterns (not particles or gradients)" },
              { label: "Color Mode", val: "Extreme dark mode — darker than any other theme" },
              { label: "Accent Color", val: "Warm Antique Gold (#b58953) — unique in the theme library" },
              { label: "Card Style", val: "Glassmorphism — frosted glass effect on all profile cards" },
              { label: "Font", val: "Outfit — modern geometric typeface from Google Fonts" },
              { label: "Icon", val: "🕌 Mosque — representing Eastern cultural luxury and architecture" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <span className="font-black text-amber-400 w-28 flex-shrink-0">{row.label}</span>
                <span className="text-text-secondary">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionTitle>Best For</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Luxury Brand Managers", "Architects & Designers", "Finance & Banking", "Senior Executives", "International Professionals", "Creative Directors"].map((role, i) => (
            <div key={i} className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl text-center">
              <p className="text-amber-400 font-black text-xs">{role}</p>
            </div>
          ))}
        </div>
      </>
    ),

    "terminal-dark": (
      <>
        <DocHeader title="💻 TERMINAL DARK Theme" badge="New Theme" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          <strong className="text-violet-400">TERMINAL DARK</strong> is CVify Pro's most developer-centric portfolio theme — an engineering-grade visual identity built for coders who want their portfolio to feel as polished and technical as their code.
        </p>

        <SectionTitle>Visual Identity</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Cpu size={18} />} color="purple" title="Midnight Blue Canvas"
            desc="Deep #050816 background — darker than Midnight Dev, lighter than AURA DARK. Creates the perfect developer aesthetic without being overwhelmingly dark." />
          <InfoCard icon={<Zap size={18} />} color="purple" title="Neon Purple Accents"
            desc="Electric purple (#915eff) powers all interactive elements — buttons, borders, glow effects, timeline dots, and hover states. High-energy and memorable." />
          <InfoCard icon={<Eye size={18} />} color="blue" title="Glowing Profile Avatar"
            desc="The Hero section features the candidate's actual profile picture inside a glowing geometric container with double-rotated border frames and ambient pulse glow." />
          <InfoCard icon={<Briefcase size={18} />} color="emerald" title="Vertical Timeline Experience"
            desc="Work experience is rendered as a vertical left-border timeline with glowing purple dot markers and glassmorphic dark cards — each card hovers with a border highlight." />
          <InfoCard icon={<Layers size={18} />} color="amber" title="Hashtag Tech Stack Projects"
            desc="Project cards display screenshots, descriptions, and colorful hashtag-style tech stack labels (#react, #nodejs) — familiar to any developer browsing GitHub." />
          <InfoCard icon={<Globe size={18} />} color="blue" title="Inter Typography"
            desc="Clean, modern Inter font — the industry standard for developer tools and SaaS products. Ensures maximum readability for technical content." />
        </div>

        <SectionTitle>What Makes It Different</SectionTitle>
        <div className="p-5 bg-violet-500/5 border border-violet-500/20 rounded-2xl mb-6">
          <div className="space-y-3">
            {[
              { label: "Background", val: "Midnight blue (#050816) with card base (#151030) — two-tone depth" },
              { label: "Accent", val: "Electric neon purple (#915eff) with glow shadows" },
              { label: "Hero Design", val: "Vertical line + dot intro text with glowing profile image on the right" },
              { label: "Experience", val: "Left-border vertical timeline with purple neon dot markers" },
              { label: "Projects", val: "Screenshot-first cards with colorful hashtag tech stack labels" },
              { label: "Font", val: "Inter — the standard of modern developer tooling" },
              { label: "Icon", val: "💻 Laptop — representing the developer craft" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <span className="font-black text-violet-400 w-28 flex-shrink-0">{row.label}</span>
                <span className="text-text-secondary">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionTitle>Best For</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Full-Stack Developers", "Software Engineers", "Open Source Contributors", "CS Students", "DevOps Engineers", "Tech Leads"].map((role, i) => (
            <div key={i} className="p-3 bg-violet-500/5 border border-violet-500/15 rounded-xl text-center">
              <p className="text-violet-400 font-black text-xs">{role}</p>
            </div>
          ))}
        </div>
      </>
    ),

    "cyber-neon": (
      <>
        <DocHeader title="🟢 CYBER NEON Theme" badge="New Theme" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          <strong className="text-emerald-400">CYBER NEON</strong> is CVify Pro's most visually intense portfolio theme — a pure hacker aesthetic built for professionals who want an unforgettable, electric first impression. Inspired by the Catppuccin design language and cyberpunk UI trends.
        </p>

        <SectionTitle>Visual Identity</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Cpu size={18} />} color="emerald" title="Near-Black Canvas"
            desc="Ultra-dark #080808 background — almost invisible seams between UI layers. Depth is created through contrast, not light, giving it a hacker terminal feel." />
          <InfoCard icon={<Zap size={18} />} color="emerald" title="Electric Neon Green Accents"
            desc="Vivid #00ffcc (electric cyan-green) powers all interactive elements — glowing links, hover borders, button outlines, and neon underlines on nav items." />
          <InfoCard icon={<Layout size={18} />} color="blue" title="Orbitron Monospace Font"
            desc="The iconic Orbitron font (used in sci-fi interfaces, electric vehicle dashboards) gives every heading an instant techy, futuristic authority." />
          <InfoCard icon={<Globe size={18} />} color="purple" title="GitHub Stats Built-In"
            desc="Full GitHub Intelligence Panel renders live repository count, top languages, and contribution activity — technical credibility baked into the theme." />
          <InfoCard icon={<Eye size={18} />} color="amber" title="Floating Dev Characters FX"
            desc="Animated floating code characters (symbols, brackets, operators) drift across the background — a subtle ambient effect that keeps the page feeling alive." />
        </div>

        <SectionTitle>What Makes It Different</SectionTitle>
        <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-6">
          <div className="space-y-3">
            {[
              { label: "Background", val: "Near-black (#080808) — darker than TERMINAL DARK, lighter than AURA DARK" },
              { label: "Accent Color", val: "Electric Neon Green (#00ffcc) — unique in the CVify theme library" },
              { label: "Font", val: "Orbitron — futuristic monospace font from Google Fonts" },
              { label: "Card Style", val: "Glassmorphism — subtle frosted glass on dark panels" },
              { label: "Nav Links", val: "Glowing neon underline on hover — SSE-style animation" },
              { label: "Icon", val: "🟢 Green Circle — representing active connectivity and live systems" },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <span className="font-black text-emerald-400 w-28 flex-shrink-0">{row.label}</span>
                <span className="text-text-secondary">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionTitle>Best For</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Cybersecurity Experts", "Blockchain Developers", "Ethical Hackers", "Game Developers", "DevOps Engineers", "Tech Creatives"].map((role, i) => (
            <div key={i} className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl text-center">
              <p className="text-emerald-400 font-black text-xs">{role}</p>
            </div>
          ))}
        </div>
      </>
    ),

    apex: (
      <>
        <DocHeader title="🏆 APEX Theme" badge="Premium Theme" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          <strong className="text-white">APEX</strong> is CVify Pro's premier recruiter-focused minimal theme. Built to capture hiring interest instantly, it incorporates a deep dark slate canvas, Outfit/Inter typography, and a signature <strong className="text-primary">Interactive Skills Galaxy</strong> with dual planetary orbits.
        </p>

        <SectionTitle>Visual Identity & Design Tokens</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Palette size={18} />} color="emerald" title="Clean Minimal Canvas"
            desc="Deep slate background (#0D0F12) and dark card surfaces (#161920) keep visual noise to an absolute minimum." />
          <InfoCard icon={<Target size={18} />} color="emerald" title="Skills Galaxy Engine"
            desc="Visualizes capabilities as orbiting spheres revolving around dynamic glowing central cores with customizable labels." />
          <InfoCard icon={<Sparkles size={18} />} color="emerald" title="Keplerian Motion & Speeds"
            desc="Planets orbit at dynamic speeds decaying with distance. Alternating directions prevent visual fatigue." />
          <InfoCard icon={<FileText size={18} />} color="emerald" title="Dual Orbits Categories"
            desc="Separates Technical Capabilities (Core Toolkit) and Strategic Leadership Focus areas into two stacked galaxy systems." />
        </div>

        <SectionTitle>Key Features & Tech Specs</SectionTitle>
        <div className="p-5 bg-white/5 border border-white/20 rounded-2xl mb-6">
          <div className="space-y-3">
            {[
              { label: "Background", val: "Deep Dark Slate (#0D0F12) with starry ambient parallax particles" },
              { label: "Dual Galaxies", val: "Core Capabilities (Teal Accent Core) & Strategic Focus (Violet/Orange Accent Core)" },
              { label: "Interactive Tilt", val: "Orbit paths and nodes shift subtly with mouse coordinates parallax (8px max)" },
              { label: "Auto-Scaling", val: "Limits rings to 6 nodes. Spawns extra orbit tracks automatically to hold 50+ skills without clutter" },
              { label: "Kepler's speed", val: "Outer orbits rotate slower, inner orbits rotate faster for natural cosmic physics" },
              { label: "Universality", val: "Generic nomenclature (e.g. engagements/context/competency) optimized for any job tier" },
              { label: "Detail Panel", val: "Slide-in right drawer showing competency ratings, stats cards, and focus scopes" }
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-3 text-[13px]">
                <span className="font-black text-white w-28 flex-shrink-0">{row.label}</span>
                <span className="text-text-secondary">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        <SectionTitle>Best For</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Senior Executives", "Medical & Legal Staff", "Product Managers", "Software Engineers", "Consultants & Directors"].map((role, i) => (
            <div key={i} className="p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl text-center">
              <p className="text-emerald-400 font-black text-xs">{role}</p>
            </div>
          ))}
        </div>
      </>
    ),

    "theme-engine": (
      <>
        <DocHeader title="🎨 Theme Engine v4.0" badge="Architecture" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          CVify Pro's portfolio rendering system has been completely re-engineered from a monolithic <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">PublicProfile.jsx</code> into a <strong className="text-primary">pluggable, 5-layer Theme Engine</strong> — designed to scale to 1000+ themes with zero changes to core engine files. Inspired by enterprise SaaS plugin architectures.
        </p>

        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl mb-8">
          <p className="text-[13px] text-amber-400 font-black uppercase tracking-widest mb-1">Architecture Freeze v1.0</p>
          <p className="text-[13px] text-text-secondary leading-relaxed">The 5-layer pipeline is frozen. New capabilities are added through plugins, manifests, configuration, or additive APIs — never by modifying the engine core.</p>
        </div>

        <SectionTitle>The 5-Layer Pipeline</SectionTitle>
        <div className="space-y-3 mb-8">
          {[
            { layer: "1", name: "PublicProfile.jsx", color: "blue", role: "Entry Point", desc: "A 12-line thin shell. Only mounts ProfileLoader. Never contains theme logic, Redux selectors, or UI." },
            { layer: "2", name: "ProfileLoader.jsx", color: "emerald", role: "Data Layer", desc: "Handles all Redux dispatches, API calls (profile, analytics, GitHub), stable action callbacks, and ViewModel construction. Zero JSX beyond delegating to ProfileEngine." },
            { layer: "3", name: "ProfileEngine.jsx", color: "purple", role: "UI Shell & Overlays", desc: "Applies CSS variables to the DOM, renders universal overlays (Navbar, Resume Modal, HUD Dock, ThemePanel, AI Widget), and provides ThemeContext. Delegates theme rendering to ThemeResolver." },
            { layer: "4", name: "ThemeResolver.jsx", color: "amber", role: "Lazy Loader & Sandbox", desc: "Looks up the theme ID in the registry, verifies engine API compatibility, lazy-loads the theme chunk, and wraps it in an ErrorBoundary to prevent crashes from taking down the engine." },
            { layer: "5", name: "Theme Plugin", color: "red", role: "Visual Layer", desc: "A self-contained JSX component. Receives a standardized ThemeProps contract. FORBIDDEN from importing Redux, making API calls, or accessing browser storage." },
          ].map((item, i) => {
            const colors = { blue: "border-blue-500/20 bg-blue-500/5 text-blue-400", emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400", purple: "border-purple-500/20 bg-purple-500/5 text-purple-400", amber: "border-amber-500/20 bg-amber-500/5 text-amber-400", red: "border-red-500/20 bg-red-500/5 text-red-400" };
            return (
              <div key={i} className={`p-4 rounded-2xl border ${colors[item.color]}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border ${colors[item.color]}`}>{item.layer}</span>
                  <span className={`font-black text-sm ${colors[item.color].split(' ')[2]}`}>{item.name}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-text-muted border border-white/10 px-2 py-0.5 rounded-full">{item.role}</span>
                </div>
                <p className="text-text-secondary text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <SectionTitle>ViewModel Layer</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          All raw DB data is normalized by <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">profile/viewmodel/index.js</code> before reaching any theme. This means themes are completely decoupled from the database schema — a DB field rename never breaks a theme.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Database size={16} />} color="blue" title="12 Sub-Modules" desc="hero.js, about.js, experience.js, education.js, skills.js, projects.js, certifications.js, testimonials.js, interests.js, contact.js, github.js, analytics.js — each independently testable." />
          <InfoCard icon={<Shield size={16} />} color="purple" title="Zero Schema Leakage" desc="Themes receive a typed model prop instead of raw user object. DB field renames, schema changes, or data migrations never require touching theme code." />
        </div>

        <SectionTitle>Auto-Discovery Registry</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          The registry uses Vite's <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">import.meta.glob</code> to automatically discover all theme manifests at build time. <strong className="text-text-primary">No manual imports needed.</strong>
        </p>
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-8">
          <pre className="text-[11px] font-mono text-text-secondary leading-relaxed whitespace-pre">{`// profile/themes/registry.js
const manifests = import.meta.glob('./*/manifest.js', { eager: true });
// ThemeResolver creates a lazy() loader for each discovered manifest
// → Adding a new theme only requires placing a folder here`}</pre>
        </div>

        <SectionTitle>Shared Component Library</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Layers size={16} />} color="emerald" title="Primitives" desc="Button (accent-aware), Card (glass/minimal auto-detect), Badge (accent/muted/outline), Section (semantic wrapper), Image (lazy + fallback). All read tokens from ThemeContext." />
          <InfoCard icon={<Layout size={16} />} color="blue" title="Composites" desc="Timeline (experience/education), SkillGrid (handles both skill schemas), StatGrid (analytics), ProjectGallery (responsive grid with tech badges). Drop-in for any theme." />
        </div>

        <SectionTitle>Theme SDK & Validation CLI</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Zap size={16} />} color="amber" title="npm run create-theme &lt;name&gt;" desc="Scaffolds a complete new theme folder with manifest.js, theme.config.js, tokens.js, sections.js, index.jsx, and README.md in one command." />
          <InfoCard icon={<ShieldCheck size={16} />} color="emerald" title="npm run validate-themes" desc="Runs structural checks (required files), manifest schema validation (id, engine, features, navigation), and forbidden API scans (no Redux, no fetch, no localStorage) across all themes." />
        </div>

        <SectionTitle>Theme Sandbox Rules (Enforced)</SectionTitle>
        <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-2xl mb-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-red-400 mb-3">Forbidden APIs — Violating These Crashes the Engine</p>
          <div className="space-y-2">
            {[
              ["useSelector / useDispatch / useStore", "Themes must never access Redux directly"],
              ["fetch() / axios", "Themes must never make network requests"],
              ["localStorage / sessionStorage", "Themes must never read or write browser storage"],
              ["WebSocket / XMLHttpRequest", "No real-time connections from theme layer"],
              ["import.meta.env", "Themes must never read environment variables"],
            ].map(([api, reason], i) => (
              <div key={i} className="flex items-start gap-3 text-[12px]">
                <code className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-mono flex-shrink-0">{api}</code>
                <span className="text-text-secondary">{reason}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-text-muted mt-3 italic">✅ Allowed: setTimeout, setInterval, requestAnimationFrame (for animations, typewriter effects, debouncing)</p>
        </div>

        <SectionTitle>Bug Fixes (v4.0 Launch)</SectionTitle>
        <div className="space-y-3">
          {[
            { tag: "FIX", color: "emerald", title: "Actual Hero Vanish / Reset (React.lazy Cache)", desc: "React.lazy() was previously called inside the render function of ThemeResolver.jsx. This generated a new component reference on every single render, causing React to completely unmount and remount the entire theme DOM tree (including the Hero and TypeAnimation). Resolved by caching React.lazy() references in a static lookup cache outside the component." },
            { tag: "FIX", color: "emerald", title: "Keystroke Re-Render Cascade (Local RHF)", desc: "Typing inside the contact form triggered parent state updates in ProfileLoader.jsx, rebuilding the ViewModel and re-rendering all components on every single keystroke. Fixed by refactoring the Contact components (standard & noir) to use local React Hook Form + Yup, isolating input state updates and bypassing parent-level re-renders completely." },
            { tag: "FIX", color: "blue", title: "ThemeEditor Panel Open/Close Re-Renders", desc: "Toggling the editor panel updated ProfileEngine state and rebuilt the themeProps object. Resolved by wrapping ThemeResolver in React.memo and ensuring all props and actions (e.g., stable useCallback for showResumeModal) maintain exact object identity stability." },
            { tag: "FIX", color: "purple", title: "rgba Color Input Warning Eliminated", desc: "The NOIR preset stored textSecondary as rgba(240, 240, 240, 0.7). Browser's color pickers require static #rrggbb format. Migrated all presets to static hex codes (#b0b0b0)." },
            { tag: "FIX", color: "purple", title: "TypeError: Cannot read properties of undefined (reading 'name')", desc: "Legacy sub-components in Standard and CyberNeon themes expected legacy prop interfaces. Fixed by mapping and forwarding all backward-compatibility props through the themeProps contract." },
          ].map((item, i) => {
            const colors = { emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", blue: "bg-blue-500/10 border-blue-500/20 text-blue-400", purple: "bg-purple-500/10 border-purple-500/20 text-purple-400" };
            return (
              <div key={i} className={`p-4 rounded-2xl border ${colors[item.color]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${colors[item.color]}`}>{item.tag}</span>
                  <p className="font-black text-sm text-text-primary">{item.title}</p>
                </div>
                <p className="text-text-secondary text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </>
    ),

    particles: (
      <>
        <DocHeader title="Interactive Particles FX" badge="Visual Enhancement" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          CVify Pro portfolio themes now feature <strong className="text-text-primary">live, mouse-reactive particle animations</strong> as ambient background effects. Every particle canvas responds to visitor interaction — making your profile feel alive and truly premium.
        </p>

        <SectionTitle>How It Works</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<MousePointer size={18} />} color="purple" title="Repulse on Hover"
            desc="When visitors move their mouse over the portfolio background, particles scatter away from the cursor in a smooth, organic repulse motion — then drift back to their positions." />
          <InfoCard icon={<Wand2 size={18} />} color="blue" title="Powered by tsParticles"
            desc="Built with the battle-tested tsparticles (loadFull) library. Uses React's Particles component for zero-lag rendering integrated with React lifecycle." />
          <InfoCard icon={<Settings2 size={18} />} color="emerald" title="Theme-Specific Config"
            desc="Each theme has its own particle count, color, size, and speed settings tuned to match the visual mood — subtle for Corporate Gold, vivid for Midnight Dev." />
          <InfoCard icon={<Zap size={18} />} color="amber" title="Pointer-Events Enabled"
            desc="The particle canvas wrapper uses pointer-events: auto so mouse events pass through to the canvas correctly. This was a key fix enabling full interactivity." />
        </div>

        <SectionTitle>Recent Fixes & Updates</SectionTitle>
        <div className="space-y-3 mb-6">
          {[
            { tag: "FIX", color: "emerald", title: "Mouse Hover Now Works", desc: "Changed the ThemeBackgroundFX wrapper from pointer-events: none → pointer-events: auto across all themes, allowing the tsParticles canvas to receive mouse events." },
            { tag: "UPDATE", color: "blue", title: "Switched to loadFull Engine", desc: "Replaced @tsparticles/slim with the full tsparticles package (loadFull). This provides the complete feature set including repulse, grab, and all interaction modes." },
            { tag: "FIX", color: "amber", title: "Theme Editor Visibility", desc: "The Theme Switcher button (🎨) is now visible in all color modes — previously it was invisible in light themes due to a color contrast issue. Fixed with adaptive text/border colors." },
            { tag: "NEW", color: "purple", title: "ORIENTAL LUXE Background FX", desc: "Added custom geometric SVG mandala patterns as background FX for the ORIENTAL LUXE theme, replacing the standard particle system with a unique visual language." },
          ].map((item, i) => {
            const colors = { emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", blue: "bg-blue-500/10 border-blue-500/20 text-blue-400", amber: "bg-amber-500/10 border-amber-500/20 text-amber-400", purple: "bg-purple-500/10 border-purple-500/20 text-purple-400" };
            return (
              <div key={i} className={`p-4 rounded-2xl border ${colors[item.color]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${colors[item.color]}`}>{item.tag}</span>
                  <p className="font-black text-sm text-text-primary">{item.title}</p>
                </div>
                <p className="text-text-secondary text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <SectionTitle>Particle Settings by Theme</SectionTitle>
        <ComparisonTable items={[
          { left: "CVify Classic", right: "Blue particles, 80 count, 2px size, grab mode on hover" },
          { left: "Midnight Dev", right: "Violet particles, 100 count, 2-4px size, repulse on hover" },
          { left: "Corporate Gold", right: "Gold particles, 60 count, 1.5px size, subtle movement" },
          { left: "Creative Sunset", right: "Orange/pink particles, 80 count, bokeh-style, attract mode" },
          { left: "Emerald Leader", right: "Green particles, 70 count, soft glow, drift animation" },
          { left: "ORIENTAL LUXE", right: "SVG mandala patterns (no particles) — geometric FX" },
        ]} />
      </>
    ),
    
    bff: (
      <>
        <DocHeader title="BFF v1: High-Performance Architecture" badge="Major Update" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          In April 2026, we successfully transitioned CVify Pro from a fragmented API model to a <strong className="text-text-primary">Backend For Frontend (BFF)</strong> architecture. This is a senior-grade system design that prioritizes user experience above all else.
        </p>

        <SectionTitle>The Problem (Before v1.0)</SectionTitle>
        <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed italic">
            "Previously, the dashboard had to hit 5 separate APIs (Profile, Resumes, Letters, Stats, Economy) to render a single screen. This caused 'Network Waterfalls', where if one service was slow, the whole UI felt broken or 'jiggly' due to constant layout shifts."
          </p>
        </div>

        <SectionTitle>The Solution (BFF v1.0)</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Zap size={18} />} color="emerald" title="Unified v1 Endpoint" 
            desc="One single request (/api/v1/bff/dashboard) now returns a custom-pruned View Model containing everything your screen needs." />
          <InfoCard icon={<Heart size={18} />} color="red" title="Heart vs Makeup Resilience" 
            desc="The system distinguishes between 'Heart' services (Resumes/Profile) and 'Makeup' services (Stats). If Stats fail, your dashboard still loads instantly." />
          <InfoCard icon={<Cpu size={18} />} color="blue" title="SWR Strategy" 
            desc="Stale-While-Revalidate logic allows the UI to show cached data instantly while refreshing in the background — Zero waiting." />
          <InfoCard icon={<Layers size={18} />} color="purple" title="Section-Aware Caching" 
            desc="Advanced caching keys ensure that editing one resume doesn't wipe your entire dashboard cache. Only relevant segments refresh." />
        </div>

        <SectionTitle>Performance Impact</SectionTitle>
        <ComparisonTable items={[
          { left: "Network Requests", right: "Reduced from 5+ to exactly 1" },
          { left: "Payload Size", right: "70% smaller (Data Pruning removed 100+ unused fields)" },
          { left: "Loading State", right: "Shifted from 'Multiple Spinners' to 'Instant-Render'" },
          { left: "Reliability", right: "Service-level isolation prevents platform-wide crashes" },
        ]} />

        <SectionTitle>BFF v2 — Validation Gatekeeper (July 2026)</SectionTitle>
        <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-emerald-400 mb-2">New: Server-Side Skill Integrity Guards</p>
          <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
            The BFF now acts as a strict <strong className="text-text-primary">validation gatekeeper</strong> for technicalSkills data. A new <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">validateTechnicalSkillsBFF()</code> function runs inside both <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">createResume</code> and <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs">updateResume</code> controllers — ensuring any raw HTTP PATCH that bypasses the React frontend is still rejected by the API.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InfoCard icon={<ShieldCheck size={16} />} color="emerald" title="Mutual Exclusion"
              desc="A skill cannot exist in both professional lists (frontend, backend, database, aiDevOps, tools) and learningRoadmap simultaneously. Returns HTTP 400 Conflict." />
            <InfoCard icon={<Database size={16} />} color="blue" title="Dual Format Support"
              desc="Validates both nested object format { technicalSkills: { frontend: [] } } and Mongoose dot-notation { 'technicalSkills.frontend': [] } — no edge case escapes." />
          </div>
          <p className="text-[11px] text-text-muted mt-3 italic">✅ No per-category size limit is enforced — skill lists are intentionally unlimited so users can add every keyword from a job post for maximum ATS coverage.</p>
        </div>
      </>
    ),

    architecture: (
      <>
        <DocHeader title="System Architecture" badge="Technical" />
        <ComparisonTable items={[
          { left: "Runtime", right: "Node.js (Event-Driven, Non-Blocking I/O)" },
          { left: "Framework", right: "Express.js (REST API)" },
          { left: "Database", right: "MongoDB Atlas (NoSQL — one-query fetches)" },
          { left: "Frontend", right: "React 18 + Vite (HMR) + Redux Toolkit" },
          { left: "Intelligence", right: "Google Gemini 2.5 Flash (Generative AI SDK)" },
          { left: "Styling", right: "Tailwind CSS 4.0 + Vanilla CSS (Glassmorphism)" },
          { left: "PDF Engine", right: "@react-pdf/renderer + html2canvas-pro" },
          { left: "Landing Page", right: "Next.js (SSR for SEO)" },
          { left: "Deployment", right: "Vercel (Frontend) + Cloud VPS (Backend)" },
        ]} />
        <SectionTitle>Why This Stack?</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<Cpu size={16} />} color="emerald" title="Node.js over Python" desc="I/O-bound app (MongoDB + Gemini calls). Node's event loop handles 4x more concurrent requests than sync Python." />
          <InfoCard icon={<Database size={16} />} color="blue" title="MongoDB over SQL" desc="Resume = nested tree. SQL needs 10+ joins. MongoDB fetches in one query." />
          <InfoCard icon={<Sparkles size={16} />} color="purple" title="Tailwind 4.0" desc="Zero-bloat. Only ships used classes. Enables Glassmorphism + Cyberpunk effects." />
          <InfoCard icon={<Layers size={16} />} color="amber" title="Redux Toolkit" desc="Essential for draft workflows. Connection lost mid-edit? Redux keeps data predictable." />
        </div>
      </>
    ),

    "project-structure": (
      <>
        <DocHeader title="Project Structure" badge="Architecture" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          CVify Pro is organized as a <strong className="text-text-primary">monorepo</strong> with a clear separation between the React SPA (Client), the Express API (Server), and deployment configuration.
        </p>

        {/* Folder Tree */}
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-8 overflow-x-auto">
          <pre className="text-[12px] text-text-secondary font-mono leading-relaxed whitespace-pre">{`CVify/
├─ Client/                       # React SPA (Vite)
│   ├─ scripts/                  # CLI tools
│   │   ├─ createTheme.cjs       # Theme SDK scaffolder (npm run create-theme)
│   │   └─ validateThemes.cjs    # Structural validator (npm run validate-themes)
│   ├─ src/
│   │   ├─ pages/                # SPA routes (Documentation, PublicProfile, …)
│   │   ├─ components/           # Reusable UI (InlineEdit, ThemeEditor, …)
│   │   ├─ themes/               # 8 premium theme folders (JSX components)
│   │   ├─ profile/              # ✨ Theme Engine v4.0 (pluggable architecture)
│   │   │   ├─ engine/           # 5-layer pipeline: Loader → Engine → Resolver
│   │   │   │   ├─ ProfileLoader.jsx    # Layer 2: Data, Redux, GitHub
│   │   │   │   ├─ ProfileEngine.jsx    # Layer 3: Overlays, ThemeContext
│   │   │   │   ├─ ThemeResolver.jsx    # Layer 4: Lazy-load, Error boundary
│   │   │   │   ├─ ThemeContext.jsx     # Design tokens shared context
│   │   │   │   └─ ErrorBoundary.jsx    # Theme crash isolation
│   │   │   ├─ themes/           # Registry + manifest per theme
│   │   │   │   ├─ registry.js         # Auto-discovery (import.meta.glob)
│   │   │   │   ├─ noir/               # manifest.js + theme.config.js + index.jsx
│   │   │   │   ├─ auradark/
│   │   │   │   ├─ cyberneon/
│   │   │   │   ├─ monograph/
│   │   │   │   ├─ orientalluxe/
│   │   │   │   ├─ terminaldark/
│   │   │   │   ├─ standard/
│   │   │   │   └─ aurora/             # Scaffolded via create-theme SDK
│   │   │   ├─ viewmodel/        # Data normalization (ViewModel layer)
│   │   │   │   ├─ index.js            # Root aggregator
│   │   │   │   ├─ hero.js / about.js / experience.js …
│   │   │   └─ shared/           # Primitives & Composites
│   │   │       ├─ primitives/         # Button, Card, Badge, Section, Image
│   │   │       └─ composites/         # Timeline, SkillGrid, ProjectGallery…
│   │   ├─ utils/                # API wrapper, formatters
│   │   └─ three/                # Three.js visualisations
│   ├─ public/                   # Static assets
│   └─ vite.config.ts
├─ Server/                       # Express API
│   ├─ controllers/              # Business logic (auth, resume, ATS, …)
│   ├─ models/                   # Mongoose schemas
│   ├─ routes/                   # Express routers
│   ├─ middlewares/              # Helmet, rate-limit, error handling
│   ├─ services/                 # Email, PDF, background jobs
│   ├─ utils/                    # blockedDomains.js (disposable email blocking)
│   └─ server.js                 # Entry point, BFF integration
├─ .env                          # Environment variables
├─ package.json                  # Monorepo dependencies
└─ vercel.json                   # Vercel deployment config`}</pre>
        </div>

        <SectionTitle>Key Directories Explained</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <InfoCard icon={<Layout size={16} />} color="blue" title="Client/src/pages/" desc="Every SPA route lives here — Dashboard, Builder, PublicProfile, Documentation. Each page owns its own layout and data fetching." />
          <InfoCard icon={<Cpu size={16} />} color="purple" title="Client/src/themes/" desc="8 modular theme folders (JSX components). Each is lazy-loaded by ThemeResolver via import.meta.glob auto-discovery. Adding a theme = one folder." />
          <InfoCard icon={<Palette size={16} />} color="blue" title="Client/src/profile/engine/" desc="The 5-layer Theme Engine pipeline: ProfileLoader (data) → ProfileEngine (overlays) → ThemeResolver (lazy-load) → Theme Plugin. Engine never imports themes directly." />
          <InfoCard icon={<Layers size={16} />} color="emerald" title="Client/src/profile/themes/" desc="Registry & per-theme manifests. registry.js uses import.meta.glob to auto-discover all manifests. Each theme has manifest.js, theme.config.js, and index.jsx (re-export adapter)." />
          <InfoCard icon={<Database size={16} />} color="purple" title="Client/src/profile/viewmodel/" desc="Normalizes raw DB data into a safe, typed ViewModel. Themes access data via model prop instead of raw user object — zero DB schema leakage into themes." />
          <InfoCard icon={<Zap size={16} />} color="amber" title="Client/scripts/" desc="Two CLI tools: createTheme.cjs scaffolds a new theme boilerplate (npm run create-theme aurora), and validateThemes.cjs checks structure & blocks forbidden APIs." />
          <InfoCard icon={<Shield size={16} />} color="emerald" title="Server/middlewares/" desc="Helmet (security headers), express-rate-limit (abuse prevention), auth guard (JWT verification), and centralised errorHandler.js." />
          <InfoCard icon={<Globe size={16} />} color="blue" title="vercel.json" desc="Rewrites rule: all /* routes map to the Vite build output so React Router handles client-side navigation without 404s on refresh." />
        </div>
      </>
    ),

    "ai-gateway": (
      <>
        <DocHeader title="Enterprise AI Gateway" badge="Architecture" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          The CVify Pro AI backend has officially transitioned from a monolithic controller prototype to a highly resilient, <strong className="text-primary">Enterprise-Grade AI Gateway</strong>. It handles traffic routing, cost optimization, and safe fallback mechanisms gracefully, ensuring 100% uptime for users.
        </p>

        <SectionTitle>Why We Built It</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <InfoCard icon={<Zap size={16} />} color="amber" title="Cost & Latency Optimization" desc="Why call an LLM when the answer is already in the database? The Gateway bypasses AI entirely for factual matches, saving $0.003 per query and returning results in 0ms." />
          <InfoCard icon={<ShieldCheck size={16} />} color="emerald" title="Reliability & Graceful Degradation" desc="LLM APIs (like Groq or Gemini) can go down. The gateway provides automatic circuit breaking — seamlessly falling back to secondary providers before the user even notices a delay." />
        </div>

        <SectionTitle>Core Components (Platform Engineering)</SectionTitle>
        <div className="space-y-4 mb-6">
          <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <h4 className="font-black text-blue-400 text-sm mb-2">1. The Decision Engine & fuse.js</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed mb-3">Before touching the LLM, the <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">DecisionEngine.js</code> intercepts the request. It uses a fast regex filter followed by <strong className="text-text-primary">fuse.js (fuzzy matching)</strong> to scan the user's local projects, skills, and experience.</p>
            <ul className="text-text-secondary text-[13px] space-y-2 ml-4 list-disc marker:text-blue-500">
              <li>If Confidence <strong className="text-emerald-400">&gt;= 85%</strong>: AI is bypassed. Static response is returned instantly.</li>
              <li>If Confidence <strong className="text-amber-400">&gt;= 40%</strong>: The factual match is injected into the prompt as Absolute Ground Truth.</li>
            </ul>
          </div>
          <div className="p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
            <h4 className="font-black text-purple-400 text-sm mb-2">2. Circuit Breaker & Provider Selector</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">The <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">CircuitBreaker.js</code> tracks API health. If Groq fails 3 times, the breaker trips to <strong>OPEN</strong> state. The <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">ProviderSelector.js</code> then automatically routes all subsequent traffic to Gemini for 30 seconds (Cool-down period) before entering a <strong>HALF-OPEN</strong> state to test Groq again.</p>
          </div>
          <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
            <h4 className="font-black text-emerald-400 text-sm mb-2">3. Response Validator (Streaming Interceptor)</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">The <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">ResponseValidator.js</code> intercepts the AsyncIterable stream from the LLM <em>before</em> it hits the frontend. It cleans up malformed Markdown on the fly (e.g. converting <code>-Item</code> to <code>- Item</code>) and detects/logs hallucinated unverified URLs.</p>
          </div>
          <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
            <h4 className="font-black text-amber-400 text-sm mb-2">4. Observability & Governance</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">The <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">MetricsService.js</code> tracks total requests, fallback percentages, latency, and estimated provider costs per day. The <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">PromptVersionManager.js</code> allows deterministic A/B testing (feature-flagging) of system prompts without database lookups using request ID hashing.</p>
          </div>
        </div>

        <SectionTitle>The Extreme Controller Refactor</SectionTitle>
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed">
            By delegating all business logic to these micro-services, the monolithic <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">agentController.js</code> was reduced from <strong>370+ lines</strong> down to a hyper-clean <strong>44 lines</strong>. It now only handles the SSE streaming loop and passes the <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">RequestContext</code> to the Decision Engine.
          </p>
        </div>
      </>
    ),

    technology: (
      <>
        <DocHeader title="Full Tech Stack" badge="Technology" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          CVify Pro is built on a <strong className="text-text-primary">modern, production-grade stack</strong> chosen for performance, developer experience, and scalability. Every library has a deliberate justification.
        </p>

        <SectionTitle>🎨 Front-End (React SPA)</SectionTitle>
        <div className="overflow-x-auto rounded-2xl border border-white/5 mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Layer</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-primary">Technology</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Why Chosen</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {[
                ["Framework", "React 19 + Vite", "Component-based UI, instant HMR, huge ecosystem"],
                ["Bundler", "Vite (ESBuild)", "Near-zero config, sub-second cold starts"],
                ["Routing", "react-router-dom v7", "Declarative nested routes, lazy loading"],
                ["State", "Redux Toolkit", "Predictable state for draft workflows, undo/redo"],
                ["Styling", "Tailwind CSS 4.0 + Custom CSS", "Zero-bloat, Glassmorphism, Cyberpunk effects"],
                ["Icons", "lucide-react", "Tree-shakable modern SVG icon set"],
                ["Animations", "framer-motion", "Declarative physics-based animations"],
                ["Particles", "tsparticles (loadFull)", "Rich particle engine, repulse/hover modes"],
                ["3-D", "three.js + @react-three/fiber", "Low-level WebGL, custom shaders"],
                ["Forms", "React Hook Form + Zod", "Minimal re-renders, schema validation"],
                ["HTTP", "axios (utils/api.js)", "Interceptors for auth token injection"],
                ["SEO", "react-helmet-async", "Dynamic <head> tags, Open Graph, JSON-LD"],
                ["Charts", "recharts", "Responsive analytics dashboard charts"],
                ["Date", "date-fns", "Lightweight date formatting, no moment.js bloat"],
                ["Alerts", "sweetalert2", "Beautiful branded confirmation dialogs"],
                ["Toasts", "react-hot-toast", "Lightweight, stackable toast notifications"],
              ].map(([layer, tech, why], i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-text-muted font-bold">{layer}</td>
                  <td className="py-3 px-4 text-primary font-black">{tech}</td>
                  <td className="py-3 px-4 text-text-secondary font-medium">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SectionTitle>🛠️ Back-End (Node / Express API)</SectionTitle>
        <div className="overflow-x-auto rounded-2xl border border-white/5 mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Layer</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-primary">Technology</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Why Chosen</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {[
                ["Runtime", "Node.js 20 LTS", "Modern async I/O — handles 4× concurrent requests vs sync Python"],
                ["Framework", "Express 4.x", "Minimalist, middleware-centric, battle-tested"],
                ["Database", "MongoDB Atlas (Mongoose)", "Flexible schema for nested resume data, one-query fetches"],
                ["Auth", "JWT (jsonwebtoken) + bcrypt", "Stateless tokens, secure password storage"],
                ["AI", "Google Gemini 2.5 Flash", "Context-aware audit, cover letters, intent mode"],
                ["Email", "Nodemailer", "SMTP abstraction, OTP & welcome emails"],
                ["PDF (server)", "pdf-kit", "Stream-based PDF generation"],
                ["Cron", "node-cron", "Scheduled analytics aggregation & cleanup jobs"],
                ["Rate Limit", "express-rate-limit", "10 req/min auth, 30 req/min AI endpoints"],
                ["CORS", "cors", "Cross-origin from Vite dev server & Vercel prod"],
                ["Security", "helmet", "CSP, HSTS, X-Content-Type, X-Frame-Options headers"],
                ["Anti-Abuse", "blockedDomains.js", "200+ disposable email domains blocked on signup"],
                ["Brute Force", "LoginAttempt (MongoDB model)", "Persistent Triple-Lock progressive backoff — survives serverless cold starts"],
                ["CAPTCHA", "Custom HMAC-SHA256 math challenge", "Server-signed math puzzles, IP-bound, 60s expiry — zero third-party dependency"],
                ["Bot Detection", "honeypot field (type=hidden)", "Silent bot trap in login form — server rejects any request with it filled"],
                ["Fingerprinting", "deviceFingerprint.middleware.js", "SHA-256 device ID from UA+IP+Headers — new device triggers alert email"],
                ["Travel Guard", "impossibleTravel.middleware.js", "Flags logins 1000+ km apart in under 3 hours as impossible travel"],
                ["IP Reputation", "ipReputation.middleware.js", "Checks IP against known bad actor ranges before processing"],
                ["Key Derivation", "crypto.createHmac (Node built-in)", "HMAC-SHA256 derives purpose-scoped secrets from JWT_SECRET — no hardcoded strings"],
                ["Logging", "morgan + winston", "HTTP access logs + structured app-level logs"],
                ["Env", "dotenv", "Safe .env loading, never committed to git"],
                ["Error", "errorHandler.js", "Centralised error responses, status codes"],
              ].map(([layer, tech, why], i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-text-muted font-bold">{layer}</td>
                  <td className="py-3 px-4 text-emerald-400 font-black">{tech}</td>
                  <td className="py-3 px-4 text-text-secondary font-medium">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),

    helmet: (
      <>
        <DocHeader title="Helmet Middleware" badge="Security" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          <strong className="text-text-primary">Helmet</strong> is a collection of 14 Express middleware functions that set security-related HTTP response headers — the industry-standard first line of defence for any Node.js API.
        </p>

        <SectionTitle>How It's Integrated</SectionTitle>
        <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed mb-3">Helmet is registered <strong className="text-emerald-400">globally</strong> in <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">Server/server.js</code> — before any route is mounted. This ensures every response, regardless of endpoint, carries the security headers.</p>
          <pre className="text-[11px] font-mono text-text-secondary leading-relaxed whitespace-pre">{`// Server/server.js
import helmet from 'helmet';
app.use(helmet());  // Global — applied to ALL routes`}</pre>
        </div>

        <SectionTitle>HTTP Headers Helmet Enables</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <InfoCard icon={<Shield size={16} />} color="blue" title="Content-Security-Policy (CSP)" desc="Restricts which scripts, styles, and sources the browser will load. Prevents XSS injection attacks that could steal user sessions or diamonds." />
          <InfoCard icon={<ShieldCheck size={16} />} color="emerald" title="Strict-Transport-Security (HSTS)" desc="Forces browsers to use HTTPS exclusively for 1 year. Prevents SSL-stripping man-in-the-middle attacks." />
          <InfoCard icon={<Eye size={16} />} color="purple" title="X-Content-Type-Options" desc="Prevents browsers from MIME-sniffing a response. Stops attackers from tricking browsers into treating text as scripts." />
          <InfoCard icon={<Layers size={16} />} color="amber" title="X-Frame-Options" desc="Blocks embedding CVify Pro in iframes. Prevents clickjacking attacks where users think they're clicking our UI but are really interacting with a malicious overlay." />
          <InfoCard icon={<Globe size={16} />} color="red" title="Referrer-Policy" desc="Controls how much referrer info is sent with requests. Protects user privacy when navigating from CVify Pro to external links." />
          <InfoCard icon={<Zap size={16} />} color="blue" title="Permissions-Policy" desc="Disables powerful browser features (camera, microphone, geolocation) that CVify Pro doesn't use — reducing attack surface." />
        </div>

        <SectionTitle>Why Helmet vs Manual Header Setting?</SectionTitle>
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
          <p className="text-text-secondary text-[13px] leading-relaxed">
            Manually writing <code className="text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded">res.setHeader()</code> for every security header is error-prone and easy to forget. Helmet encapsulates 14 best-practice headers in a single <code className="text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded">app.use(helmet())</code> call — ensuring no header is accidentally omitted and keeping the codebase maintainable.
          </p>
        </div>
      </>
    ),

    "disposable-email": (
      <>
        <DocHeader title="Disposable Email Blocking" badge="Anti-Abuse" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          To prevent platform abuse, bot registrations, and referral fraud, CVify Pro maintains a <strong className="text-text-primary">curated block-list of 200+ disposable and temporary email service domains</strong> — validated on both the client and server.
        </p>

        <SectionTitle>The Problem It Solves</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <InfoCard icon={<Mail size={16} />} color="red" title="Fake Signups" desc="Services like Mailinator, Guerrilla Mail, and 10MinuteMail let anyone create a disposable inbox in seconds. Without blocking, bots can mass-register accounts to abuse the free diamond system." />
          <InfoCard icon={<Users size={16} />} color="amber" title="Referral Fraud" desc="The diamond referral system rewards users for inviting colleagues. Disposable emails allow a single actor to create hundreds of fake accounts and farm diamonds dishonestly." />
        </div>

        <SectionTitle>Technical Implementation</SectionTitle>
        <div className="space-y-4 mb-6">
          <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <h4 className="font-black text-blue-400 text-sm mb-2">Server-Side (Primary Guard)</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed mb-3">Located at <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">Server/utils/blockedDomains.js</code>. Exports an <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">isDisposableEmail(email)</code> function that checks the email domain against a JavaScript <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">Set</code> for O(1) lookup speed.</p>
            <pre className="text-[11px] font-mono text-text-secondary leading-relaxed whitespace-pre">{`// Server/utils/blockedDomains.js
const blockedDomains = new Set([
  "mailinator.com", "guerrillamail.com",
  "10minutemail.com", /* 200+ more */
]);

export const isDisposableEmail = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return blockedDomains.has(domain);
};`}</pre>
          </div>
          <div className="p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
            <h4 className="font-black text-purple-400 text-sm mb-2">Client-Side (Immediate Feedback)</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">The same domain list is mirrored on the frontend for <strong className="text-text-primary">instant validation</strong> — the user sees an error before the form is even submitted, saving a round-trip to the server and improving UX.</p>
          </div>
          <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
            <h4 className="font-black text-emerald-400 text-sm mb-2">Where It's Called</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed"><code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">isDisposableEmail()</code> is invoked in the <strong>Auth Controller</strong> (on registration) and the <strong>Referral Service</strong> (on referral claim) — the two most abuse-prone entry points.</p>
          </div>
        </div>

        <SectionTitle>Domain Sources</SectionTitle>
        <ComparisonTable items={[
          { left: "disposable-email-domains", right: "GitHub: disposable-email-domains/disposable-email-domains" },
          { left: "ivolo/disposable-email-domains", right: "GitHub: ivolo/disposable-email-domains" },
          { left: "Manual additions", right: "Observed abuse patterns during beta testing" },
          { left: "Last updated", right: "2026-03-22 (future: scheduled auto-update job planned)" },
        ]} />

        <SectionTitle>Families Covered</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Mailinator Family", "Guerrilla Mail", "10MinuteMail", "Temp-Mail", "YOPmail", "Trashmail", "Sharklasers", "Spamgourmet", "Dispostable", "ThrowAM", "AirMail", "Nada Email"].map((name, i) => (
            <div key={i} className="p-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-center">
              <p className="text-text-secondary font-bold text-[12px]">{name}</p>
            </div>
          ))}
        </div>
      </>
    ),

    security: (
      <>
        <DocHeader title="Security, Compliance & Privacy" badge="Technical" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<Shield size={16} />} color="emerald" title="bcrypt + Pepper Hashing" desc="Passwords are hashed with bcrypt (cost 10) combined with a server-side PEPPER_KEY. Even if the database is breached, hashes cannot be cracked without the secret pepper." />
          <InfoCard icon={<ShieldCheck size={16} />} color="blue" title="JWT + HttpOnly Cookies" desc="Signed, verified tokens issued as HttpOnly, Secure, SameSite=Lax cookies. Prevents XSS-based session theft. Fallback to Bearer header for backward compatibility." />
          <InfoCard icon={<Brain size={16} />} color="purple" title="Data Encryption" desc="Encrypted at rest in MongoDB Atlas. AI processing via Gemini over encrypted HTTPS. Zero retention for training." />
          <InfoCard icon={<FileText size={16} />} color="amber" title="File Security" desc="Resume uploads processed in memory (multer) — never stored on disk. Instant processing, immediate disposal." />
        </div>
      </>
    ),

    "security-v6": (
      <>
        <DocHeader title="🔐 Security v6.0 — Defense in Depth" badge="Latest Security Update" />
        <p className="text-slate-300 text-[15px] leading-relaxed mb-8">
          In June 2026, CVify Pro underwent a comprehensive <strong className="text-text-primary">multi-layer security hardening</strong> following a surgical refactor approach. All changes are backward-compatible — existing users and sessions were not disrupted.
        </p>

        <SectionTitle>1. Rate Limiting (Auth Routes)</SectionTitle>
        <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed mb-3">
            A unified <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">authLimiter</code> is applied strictly to <strong className="text-text-primary">/login, /signup, /forgot-password, and /reset-password</strong>.
          </p>
          <ComparisonTable items={[
            { left: "Window", right: "15 minutes" },
            { left: "Max Attempts", right: "10 per IP + Email combination" },
            { left: "Key Strategy", right: "Authenticated users: keyed by User ID. Others: IP + Email hash" },
            { left: "OTP Routes", right: "Separate 5-minute / 3-attempt limiter" },
          ]} />
        </div>

        <SectionTitle>2. NoSQL Injection Protection</SectionTitle>
        <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed">
            <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">express-mongo-sanitize</code> is registered globally immediately after <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">express.json()</code>. It strips Mongo operators (<code className="text-red-400 text-xs">$where</code>, <code className="text-red-400 text-xs">$gt</code>, etc.) from all request bodies, queries, and params before they reach any controller.
          </p>
        </div>

        <SectionTitle>3. Password Validation Hardening</SectionTitle>
        <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed mb-3">
            All password validation across <strong className="text-text-primary">signup, changePassword, resetPassword, and updateProfile</strong> now enforces a unified standard:
          </p>
          <div className="p-3 bg-black/20 rounded-xl font-mono text-xs text-amber-300">
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{'{8,72}'}$/
          </div>
          <p className="text-text-muted text-[12px] mt-3 italic">Min 8 characters, Max 72 characters. The 72-char cap mitigates bcrypt-based ReDoS attacks.</p>
        </div>

        <SectionTitle>4. Pepper Hashing + Lazy Migration</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard icon={<ShieldCheck size={16} />} color="emerald" title="Server-Side Pepper"
            desc="A cryptographically random 32-byte PEPPER_KEY is stored only on the server (.env / Vercel Env Vars) — never in the database. Passwords are hashed as bcrypt(password + pepper, 10)." />
          <InfoCard icon={<Zap size={16} />} color="blue" title="Lazy Migration (Zero User Disruption)"
            desc="On login, the system first tries the peppered hash. If it fails, it tries the legacy hash. If legacy succeeds, the password is silently re-hashed with pepper in the background. No user is locked out." />
        </div>
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-text-muted mb-3">Migration Flow</p>
          <pre className="text-[12px] font-mono text-slate-300 leading-relaxed whitespace-pre">{`Login Attempt
  ├─ bcrypt(password + PEPPER_KEY) → ✅ Match → Login
  ├─ bcrypt(password + PEPPER_KEY) → ❌ Fail
  │    └─ bcrypt(password) → ✅ Legacy Match
  │         └─ Re-hash with pepper → Save → Login (seamless)
  └─ Both fail → 401 Unauthorized`}</pre>
        </div>

        <SectionTitle>5. HttpOnly Cookie Auth</SectionTitle>
        <div className="p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed mb-3">
            JWT tokens are no longer stored in <code className="text-red-400 text-xs">localStorage</code>. On successful login or OTP verification, the server issues an <strong className="text-text-primary">HttpOnly cookie</strong>:
          </p>
          <ComparisonTable items={[
            { left: "Cookie Name", right: "authToken" },
            { left: "httpOnly", right: "true — JavaScript cannot read this cookie" },
            { left: "secure", right: "true in production (HTTPS only)" },
            { left: "sameSite", right: "none — required for cross-origin subdomains (frontend & backend on different Vercel URLs). Must be used with Secure: true" },
            { left: "maxAge", right: "24 hours" },
            { left: "Fallback", right: "Bearer Authorization header still works (backward compat)" },
          ]} />
        </div>

        <SectionTitle>6. Secure Logout Endpoint</SectionTitle>
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed">
            A new <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">POST /api/auth/logout</code> endpoint clears the <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">authToken</code> cookie server-side by setting it to an expired value. The Redux <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">logout()</code> action silently calls this endpoint as a fire-and-forget operation — no UI changes required.
          </p>
        </div>

        <SectionTitle>7. Frontend Axios Alignment</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard icon={<Layers size={16} />} color="amber" title="withCredentials: true"
            desc="The global Axios instance now sends withCredentials: true on every request, ensuring the HttpOnly authToken cookie is automatically forwarded to the backend." />
          <InfoCard icon={<Shield size={16} />} color="emerald" title="localStorage Token Removed"
            desc="Only the JWT token was removed from localStorage. User profile data (Full name, Email, Location) persists unchanged. Redux state structure { user, token, isAuthenticated } is intact." />
        </div>

        <SectionTitle>Security Checklist</SectionTitle>
        <div className="space-y-2">
          {[
            { done: true, label: "Rate limiting on all auth routes (IP + Email keyed)" },
            { done: true, label: "NoSQL injection protection (express-mongo-sanitize)" },
            { done: true, label: "Password length hardening (min 8, max 72 chars)" },
            { done: true, label: "Server-side pepper hash (PEPPER_KEY in env)" },
            { done: true, label: "Lazy migration for existing users (zero disruption)" },
            { done: true, label: "HttpOnly cookie for JWT (prevents XSS theft)" },
            { done: true, label: "Secure logout endpoint (server-side cookie clear)" },
            { done: true, label: "Auth middleware: cookie-first, Bearer header fallback" },
            { done: true, label: "Axios withCredentials: true (cookie forwarding)" },
            { done: true, label: "XSS sanitization via custom xss middleware" },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border text-[13px] ${item.done ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-white/[0.02] border-white/5'}`}>
              <span className={`font-black text-xs ${item.done ? 'text-emerald-400' : 'text-text-muted'}`}>{item.done ? '✅' : '⬜'}</span>
              <span className={item.done ? 'text-text-primary' : 'text-text-muted'}>{item.label}</span>
            </div>
          ))}
        </div>
      </>
    ),

    "security-v7": (
      <>
        <DocHeader title="🛡️ Security v7.0 — Triple-Lock Architecture & Threat Model" badge="Latest Security Update" />
        <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
          In July 2026, CVify Pro underwent the most comprehensive authentication security hardening in its history.
          The primary motivation was a red-team analysis that exposed <strong className="text-red-400">4 realistic brute-force bypass scenarios</strong> in the previous single-layer rate limiter.
          All changes are production-deployed, backward-compatible, and aligned with enterprise SOC standards.
        </p>

        {/* ─── 1. THREAT MODEL ─── */}
        <SectionTitle>1. Threat Model & Trust Boundaries</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          CVify Pro enforces zero-trust data validation at every network boundary to protect critical user assets and session artifacts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h4 className="font-black text-sm text-primary mb-3 flex items-center gap-2">
              <ShieldCheck size={16} /> Assets Protected
            </h4>
            <div className="space-y-2 text-[12px]">
              {[
                { title: "Authentication", desc: "User credentials, bcrypt hashes, pepper keys, OTP tokens" },
                { title: "User Sessions", desc: "HttpOnly, Secure JWT auth cookies & refresh state" },
                { title: "AI Credits", desc: "Diamond balances & atomic consumption transactions" },
                { title: "Resume & Portfolio Data", desc: "Personal identity, career history, documents, public slugs" },
              ].map((asset, i) => (
                <div key={i} className="p-2.5 bg-white/[0.03] rounded-xl border border-white/5">
                  <span className="font-bold text-text-primary block mb-0.5">{asset.title}</span>
                  <span className="text-text-muted text-[11px]">{asset.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between">
            <div>
              <h4 className="font-black text-sm text-emerald-400 mb-3 flex items-center gap-2">
                <Layers size={16} /> Trust Boundaries
              </h4>
              <pre className="font-mono text-[10px] md:text-[11px] bg-slate-950 border border-white/5 p-4 rounded-xl leading-relaxed text-emerald-400 overflow-x-auto">
{` Browser (Untrusted Client)
    │
    ▼ [TLS 1.3 / Encrypted Transit]
 Cloudflare WAF (DDoS / Edge Filtering)
    │
    ▼ [Origin Cloaked]
 Vercel Serverless Edge Gateway
    │
    ▼ [Isolated Process]
 Express API Engine (BFF)
    │
    ▼ [TLS / Connection Pool]
 MongoDB Atlas (Encrypted Database)`}
              </pre>
            </div>
            <p className="text-text-muted text-[11px] mt-3 italic">
              Each boundary enforces strict sanitization, origin checks, and cryptographic token verification.
            </p>
          </div>
        </div>

        {/* ─── 2. ARCHITECTURE DIAGRAM (FULL REQUEST PIPELINE) ─── */}
        <SectionTitle>2. End-to-End Request Security Pipeline</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          Every incoming authentication request traverses 10 distinct security checkpoints before reaching controller logic.
        </p>
        <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 mb-8 overflow-x-auto">
          <pre className="font-mono text-[10px] md:text-[11px] leading-relaxed text-emerald-400">
{` [ Incoming HTTP Request ]
           │
           ▼
 1. Cloudflare WAF ───────────► [ Drop Layer 7 DDoS & Malicious Scrapers ]
           │
           ▼
 2. Vercel Serverless Edge ───► [ Enforce SSL/TLS 1.3 & HSTS ]
           │
           ▼
 3. Helmet Headers ───────────► [ Inject CSP, X-Frame-Options, Referrer-Policy ]
           │
           ▼
 4. Rate Limiter ─────────────► [ IP+Email Bucket Check (express-rate-limit) ]
           │
           ▼
 5. IP Reputation Guard ──────► [ Block Malicious Proxy & Known VPN Ranges ]
           │
           ▼
 6. Honeypot Validation ──────► [ Check Hidden Input _honey (Bot Trap) ]
           │
           ▼
 7. Triple-Lock Engine ───────► [ Parallel Lookup: Combo, Email, IP in MongoDB ]
           │
           ▼
 8. Custom CAPTCHA ───────────► [ Validate HMAC-SHA256 Signed Math Challenge ]
           │
           ▼
 9. JWT / Cookie Auth ────────► [ Verify HttpOnly Token & Session Integrity ]
           │
           ▼
 10. Controller Execution ───► [ Process Request & Log HMAC Integrity Chain ]
           │
           ▼
 [ Secure Response Sent ]`}
          </pre>
        </div>

        {/* ─── RED TEAM BYPASS SCENARIOS ─── */}
        <SectionTitle>3. The 4 Bypass Scenarios Solved in v7.0</SectionTitle>
        <div className="space-y-3 mb-8">
          {[
            { id: "1", color: "red", title: "Distributed IP Rotation", problem: "Attacker rotates 1,000 proxy IPs targeting 1 email. Per-IP limiter triggers at 10 — but with 1,000 IPs they get 10,000 attempts before any single IP is blocked.", fix: "Email Lock: SHA256(email) independently tracks all attempts per target email regardless of source IP." },
            { id: "2", color: "orange", title: "Password Spraying", problem: "Attacker picks 1 common password and tries it against 10,000 different emails from 1 IP. Per-email limiter never triggers since each email only sees 1 attempt.", fix: "IP Lock: SHA256(ip) tracks total failed attempts per source IP across ALL emails — triggers after 30 attempts." },
            { id: "3", color: "amber", title: "Serverless Memory Reset", problem: "Vercel cold starts reset in-memory rate limit counters. Attacker waits for function cold start then gets fresh attempt budget.", fix: "All three locks stored in MongoDB — survives cold starts, shared across all serverless instances globally." },
            { id: "4", color: "yellow", title: "Combo Attack (Credential Stuffing)", problem: "Attacker uses leaked email:password pairs from data breaches, trying each combo from a unique IP. Single-dimension locks (IP-only or Email-only) miss this pattern.", fix: "Combo Lock: SHA256(email:ip) locks the specific email+IP pair after 5 attempts — catches credential stuffing without impacting other users on the same IP." },
          ].map((scenario) => (
            <div key={scenario.id} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="flex items-start gap-3 mb-3">
                <span className={`text-${scenario.color}-400 font-black text-xs w-6 h-6 rounded-full bg-${scenario.color}-500/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>{scenario.id}</span>
                <p className={`font-black text-sm text-${scenario.color}-400`}>{scenario.title}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-9">
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Problem</p>
                  <p className="text-text-secondary text-[12px] leading-relaxed">{scenario.problem}</p>
                </div>
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Fix Applied</p>
                  <p className="text-text-secondary text-[12px] leading-relaxed">{scenario.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle>4. Triple-Lock Architecture & Per-Lock Thresholds</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">Three independent SHA-256 hashed identifiers are computed on every login attempt and evaluated with progressive thresholds.</p>
        
        <div className="overflow-x-auto rounded-2xl border border-white/5 mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Lock Type</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-primary">CAPTCHA Triggers At</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Hard Lock At</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Rationale</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {[
                ["Combo SHA256(email:ip)", "5 attempts", "6 attempts", "Single account targeted from one device — strictest"],
                ["Email SHA256(email)", "5 attempts", "6 attempts", "Same account targeted from rotating IPs — strict"],
                ["IP SHA256(ip)", "30 attempts", "50 attempts", "Lenient — prevents false-positive blocking of multi-account users on same IP (home, office)"],
              ].map(([lock, captcha, hard, why], i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-primary font-black">{lock}</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">{captcha}</td>
                  <td className="py-3 px-4 text-red-400 font-bold">{hard}</td>
                  <td className="py-3 px-4 text-text-secondary font-medium">{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── 3. SECURITY HEADERS TABLE ─── */}
        <SectionTitle>5. Enterprise Security Headers Matrix</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          Configured globally via Helmet middleware to enforce browser-level security policies.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/5 mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-text-muted">Header</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-primary">Purpose & Defense</th>
                <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-emerald-400 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {[
                ["Strict-Transport-Security (HSTS)", "Enforces HTTPS connections for 2 years (includeSubDomains, preload). Prevents SSL stripping.", "✔ Active"],
                ["Content-Security-Policy (CSP)", "Restricts script execution to whitelisted origins. Prevents XSS & data exfiltration.", "✔ Active"],
                ["Permissions-Policy", "Disables camera, microphone, geolocation, and payment APIs for application pages.", "✔ Active"],
                ["Referrer-Policy", "Sets strict-origin-when-cross-origin to prevent leaking URL parameters to 3rd parties.", "✔ Active"],
                ["X-Frame-Options", "Set to DENY — prevents Clickjacking attacks by disallowing iframe embedding.", "✔ Active"],
                ["Cross-Origin-Opener-Policy (COOP)", "Set to same-origin — isolates browsing context from cross-origin popup windows.", "✔ Active"],
                ["Cross-Origin-Resource-Policy (CORP)", "Set to same-site — prevents unauthorized cross-origin reading of static assets.", "✔ Active"],
              ].map(([header, purpose, status], i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-primary font-black font-mono text-[11px]">{header}</td>
                  <td className="py-3 px-4 text-text-secondary font-medium">{purpose}</td>
                  <td className="py-3 px-4 text-emerald-400 font-black text-center">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ─── 4. FUTURE ROADMAP (v8.0) ─── */}
        <SectionTitle>6. Security Roadmap (Upcoming v8.0 Architecture)</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          CVify Pro's security architecture is continuously evolving. The upcoming v8.0 release introduces active observability and next-gen auth controls.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full mb-2 inline-block">Phase 1 — Advanced Session Controls</span>
            <h4 className="font-black text-sm text-text-primary mb-2">Refresh Token Rotation & Session Dashboard</h4>
            <ul className="space-y-1.5 text-[12px] text-text-secondary list-disc pl-4">
              <li>Automatic token family revocation on reuse detection (theft mitigation)</li>
              <li>Active session management dashboard with remote single-click logout</li>
              <li>Concurrent session caps per account tier</li>
            </ul>
          </div>

          <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full mb-2 inline-block">Phase 2 — Passwordless & Passkeys</span>
            <h4 className="font-black text-sm text-text-primary mb-2">WebAuthn / Passkey Native Integration</h4>
            <ul className="space-y-1.5 text-[12px] text-text-secondary list-disc pl-4">
              <li>Hardware key authentication (YubiKey, Touch ID, Face ID, Windows Hello)</li>
              <li>Risk-based adaptive step-up authentication on suspicious logins</li>
              <li>Passwordless biometric auth fallback</li>
            </ul>
          </div>

          <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mb-2 inline-block">Phase 3 — Enterprise Observability</span>
            <h4 className="font-black text-sm text-text-primary mb-2">SIEM Telemetry & Security Operations Dashboard</h4>
            <ul className="space-y-1.5 text-[12px] text-text-secondary list-disc pl-4">
              <li>Real-time telemetry stream for SOC teams (Failed logins, honeypot hits, travel flags)</li>
              <li>AI prompt injection defense monitoring & automated threat scoring</li>
              <li>Automated security event webhooks for enterprise customers</li>
            </ul>
          </div>

          <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full mb-2 inline-block">Phase 4 — Zero Trust Continuous Auth</span>
            <h4 className="font-black text-sm text-text-primary mb-2">Continuous Behavioral Verification</h4>
            <ul className="space-y-1.5 text-[12px] text-text-secondary list-disc pl-4">
              <li>Real-time IP reputation tracking during active user sessions</li>
              <li>Context-aware re-authentication before sensitive asset modification</li>
              <li>Automated compliance audit log export (SOC 2 / ISO 27001 ready)</li>
            </ul>
          </div>
        </div>

        <SectionTitle>7. 7 Bugs Found & Fixed During v7.0 Refactor</SectionTitle>
        <div className="space-y-4 mb-8">
          {[
            {
              num: "1", color: "red",
              title: "CAPTCHA SHA-256 Key Mismatch (403 Loop)",
              cause: "POST /captcha/verify body had no email field. getAttemptIdentifier(req) computed SHA256('email:') — empty string. captchaSolved=true was written to wrong DB records. Login saw captchaSolved=false on real records → infinite 403.",
              fix: "verifyCaptcha now accepts email in body. Manually computes SHA256(email:ip) using the same formula as login. Correct records updated.",
            },
            {
              num: "2", color: "orange",
              title: "captchaSolved Reset on Wrong Password",
              cause: "recordFailedAttempt() had captchaSolved = false on every failed attempt ≥ threshold 5. User solves CAPTCHA → types wrong password → captchaSolved wiped → CAPTCHA demanded again. Infinite loop.",
              fix: "Guard added: if (!record.captchaSolved) record.captchaSolved = false — preserves solved state. User can retry password without re-solving.",
            },
            {
              num: "3", color: "amber",
              title: "Honeypot Autofill (400 False Positives)",
              cause: "Honeypot field was type='text' with CSS display:none. Chrome, Bitwarden, and LastPass autofill ALL text inputs in login forms — even CSS-hidden ones. Server saw _honey filled → 400 'bot detected' for real users.",
              fix: "Changed to type='hidden'. Password managers never fill type=hidden inputs. 0 false positives since fix.",
            },
            {
              num: "4", color: "yellow",
              title: "IP False-Positive (Multi-Account Same IP)",
              cause: "All three locks shared CAPTCHA threshold=5 / lock=6. Developer testing 2 accounts in different browsers: Browser 1 hits 6 failed attempts → ipKey at 6 → Browser 2's first attempt on different account immediately blocked.",
              fix: "Separated IP thresholds: 30 CAPTCHA, 50 hard lock. Legitimate multi-account users on same IP unaffected. True password spraying (50+ accounts) still caught.",
            },
            {
              num: "5", color: "blue",
              title: "Vercel 500 Crash (Startup Secret Throw)",
              cause: "security.js and captcha.middleware.js threw new Error() at module load time if ADMIN_LOG_SECRET or CAPTCHA_SECRET env vars were missing. Vercel serverless warm-start loaded these modules, found missing env vars, and crashed the entire function → GET /api/auth/me returned 500.",
              fix: "Replaced throw with HMAC key derivation: crypto.createHmac('sha256', JWT_SECRET).update('purpose_v1').digest('hex'). Server never crashes — unique purpose-scoped key derived at runtime.",
            },
            {
              num: "6", color: "purple",
              title: "Hardcoded Fallback Secret",
              cause: "Previous fix used || 'cvify_default_admin_log_secret_2026' as fallback. Any deployment missing env vars would silently use this known string — identical across all deployments. JWT_SECRET reuse also violated principle of least privilege.",
              fix: "Pure HMAC derivation from JWT_SECRET with domain-separated purposes: 'admin_log_integrity_v1' and 'captcha_signing_v1'. No static strings. Each purpose gets a cryptographically unique key.",
            },
            {
              num: "7", color: "emerald",
              title: "Session Expired Modal on Wrong Credentials",
              cause: "Axios interceptor treated ALL 401 responses as SESSION_EXPIRED. POST /auth/login returning 401 (wrong password) triggered 'Session Expired' modal — forcing page reload. Login form state, typed credentials, and countdown timer were destroyed.",
              fix: "Interceptor now distinguishes endpoints: auth routes (login, signup, captcha) get inline error handling only. Session Expired modal fires ONLY on 401s from authenticated API calls (/api/user, /api/resumes, etc.).",
            },
          ].map((bug) => (
            <div key={bug.num} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-${bug.color}-400 font-black text-xs w-6 h-6 rounded-full bg-${bug.color}-500/10 flex items-center justify-center flex-shrink-0`}>#{bug.num}</span>
                <p className={`font-black text-sm text-${bug.color}-400`}>{bug.title}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-9 text-[12px]">
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1.5">Root Cause</p>
                  <p className="text-text-secondary leading-relaxed">{bug.cause}</p>
                </div>
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1.5">Fix Applied</p>
                  <p className="text-text-secondary leading-relaxed">{bug.fix}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle>8. Security v7.0 — FAQ</SectionTitle>
        <div className="space-y-4">
          {[
            {
              q: "Why MongoDB instead of Redis for storing login attempts?",
              a: "CVify Pro is deployed on Vercel's serverless platform. Redis requires a persistent TCP connection which serverless functions cannot maintain across invocations. MongoDB Atlas handles connection pooling via mongoose and survives cold starts. The performance difference is negligible at CVify's scale — LoginAttempt documents have compound indexes and expire automatically via TTL (24h) for self-cleaning.",
            },
            {
              q: "If the IP threshold is 30, can an attacker still do 30 password attempts per account?",
              a: "No. The Combo lock (SHA256(email:ip)) triggers at 5 attempts for the specific email+IP pair. The IP lock (SHA256(ip)) at 30 is for cross-account spraying detection only. An attacker gets 5 attempts per email per IP before the Combo lock fires — same as the v6.0 behavior for any specific account.",
            },
            {
              q: "Why build a custom CAPTCHA instead of using Google reCAPTCHA?",
              a: "Three reasons: (1) Privacy — reCAPTCHA sends user behavioral data to Google servers. (2) Zero dependency cost — no API keys, no billing, no rate limits. (3) Simplicity — arithmetic CAPTCHAs are sufficient to block automated scripts. Real humans solve '14 + 7' in under 3 seconds. The HMAC-SHA256 token prevents the answer from being computed client-side, and IP-binding prevents solve-and-replay attacks.",
            },
            {
              q: "Can an attacker bypass the brute force protection by clearing cookies or local storage?",
              a: "No. All security state is stored exclusively in MongoDB — not in cookies, localStorage, or sessionStorage. Clearing browser storage has zero effect. The server recomputes SHA-256 keys from the request email and IP on every attempt and looks up the current attempt count in the database. The only way to bypass the lock is to change email address AND IP address simultaneously — which the Combo lock handles by tracking both.",
            },
            {
              q: "What happens to my CAPTCHA solve if I accidentally close the browser tab during the security delay?",
              a: "Your CAPTCHA solved status is stored in MongoDB, not in browser state. When you return to the login page, the frontend calls POST /api/auth/security-state which reads from MongoDB and returns your current lock status including captchaSolved=true. The UI restores the 'CAPTCHA Verified' badge and the countdown timer resumes from the correct remaining time — not from scratch.",
            },
          ].map((faq, i) => (
            <div key={i} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="font-black text-sm text-text-primary mb-3 flex items-start gap-2">
                <span className="text-primary font-black text-xs w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">Q</span>
                {faq.q}
              </p>
              <p className="text-text-secondary text-[13px] leading-relaxed ml-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </>
    ),

    diamonds: (
      <>
        <DocHeader title="The Diamond Economy 💎" badge="Business" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Diamonds power CVify Pro's AI features. We charge <strong className="text-text-primary">post-success only</strong> — you're never billed for failed requests. Atomic operations ensure integrity.
        </p>
        <ComparisonTable items={[
          { left: "Magic AI Import", right: "30 💎" },
          { left: "AI Intent Mode", right: "30 💎" },
          { left: "AI Cover Letter", right: "30 💎" },
          { left: "Deep ATS Scan", right: "50 💎 (New Version)" },
          { left: "24h Re-scan (Same Version)", right: "0 💎 (FREE)" },
          { left: "Signup Bonus", right: "100 💎 free" },
        ]} />
        <p className="text-text-muted text-[12px] leading-relaxed mt-4 italic">
          Earn diamonds by referring colleagues, community contributions, or during promotional events. Premium packages coming soon.
        </p>
      </>
    ),

    competitors: (
      <>
        <DocHeader title="Why Choose CVify Pro?" badge="The Honest Truth" />
        
        {/* The Honest Acknowledgement */}
        <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl mb-8">
          <h4 className="font-black text-amber-400 text-sm mb-3 flex items-center gap-2"><Award size={16} /> Let's Be Real</h4>
          <p className="text-text-secondary text-[14px] leading-relaxed">
            Giants like <strong className="text-text-primary">LinkedIn</strong>, <strong className="text-text-primary">Indeed</strong>, <strong className="text-text-primary">Canva</strong>, <strong className="text-text-primary">Zety</strong>, <strong className="text-text-primary">Jobscan</strong>, and <strong className="text-text-primary">Rezi</strong> exist — 
            they're reliable, credible, trustworthy, and backed by billions. We respect them. They've shaped the industry. 
            <strong className="text-primary"> So why should you choose us?</strong>
          </p>
        </div>

        {/* Tagline Blockquote */}
        <div className="border-l-4 border-emerald-500 pl-5 py-3 my-6 bg-emerald-500/5 rounded-r-2xl">
          <p className="text-text-primary font-black text-[15px] italic">
            "Giant platforms sell you a Template. CVify Pro sells you Verifiable Proof and AI-driven Mentorship."
          </p>
        </div>

        {/* The Answer */}
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Because the giants solve <em>one piece</em> of the puzzle. LinkedIn is a network, not an ATS auditor. Canva makes pretty resumes that 
          <strong className="text-red-400"> fail ATS parsing</strong> (75% rejection before human eyes). Jobscan matches keywords but doesn't know if you're a fresher 
          or a senior. <strong className="text-text-primary">No single platform combines all of these — except CVify Pro.</strong>
        </p>

        {/* For Job Seekers */}
        <SectionTitle>Why Job Seekers Choose Us</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Brain size={16} />} color="emerald" title="Your Resume Gets UNDERSTOOD" 
            desc="We don't just count keywords. Our 3-Layer Engine understands context — a fresher missing AWS gets encouragement, a senior gets a critical alert. No other tool does this." />
          <InfoCard icon={<Eye size={16} />} color="blue" title="You See What Recruiters See" 
            desc="6-Second Recruiter Impression, strong bullet highlights, and exact before→after rewrites. You don't guess what's wrong — you KNOW and you get the fix." />
          <InfoCard icon={<Shield size={16} />} color="purple" title="No Lies, No Inflation" 
            desc="Our Anti-Hallucination Engine has 6 strict rules. Every feedback quotes YOUR actual resume. If your score is 45, we say 45 — then we show you HOW to make it 85." />
          <InfoCard icon={<Sparkles size={16} />} color="amber" title="Complete Career Ecosystem" 
            desc="ATS Scanner + AI Cover Letters + Live Portfolio + GitHub Integration + SEO + Theme Customization — all in one place. No switching between 5 different tools." />
          <InfoCard icon={<Heart size={16} />} color="red" title="Empathy-First Coaching" 
            desc="We highlight your STRENGTHS first, then suggest improvements with rewritten examples. You'll never feel crushed — you'll feel guided, like having a personal career coach." />
          <InfoCard icon={<Globe size={16} />} color="blue" title="Globally Inclusive" 
            desc="Optimized for English, Urdu, and Dutch. Market-specific scoring for Pakistani HR, European Remote, Freelance, and Standard modes. Not western-centric — built for the world." />
        </div>

        {/* For Recruiters */}
        <SectionTitle>Why Recruiters Trust Us</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Award size={16} />} color="emerald" title="Proof-Based Candidates" 
            desc="Skills aren't just text — they're backed by live GitHub repos, project counts, and ATS audit scores. You see PROOF, not promises." />
          <InfoCard icon={<Target size={16} />} color="blue" title="Pre-Screened Resumes" 
            desc="Candidates who use CVify Pro have already passed a 3-layer AI audit and optimized for YOUR JD. Less screening time, better matches." />
          <InfoCard icon={<BarChart3 size={16} />} color="purple" title="Transparent Scoring" 
            desc="Every score comes with a justification. You know WHY a candidate scored 85 in keywords and 60 in quantification — no black boxes." />
          <InfoCard icon={<Rocket size={16} />} color="amber" title="One-Click Discovery" 
            desc="10 seconds: repos, projects, ATS score, experience timeline, contact buttons — all on one HUD dashboard. No PDF downloading needed." />
        </div>

        {/* The Real Differentiator */}
        <SectionTitle>What We Do That NOBODY Else Does</SectionTitle>
        <div className="space-y-3 mb-8">
          {[
            { title: "Context-Aware Scoring", desc: "Only platform that scores differently for a fresher vs senior. A 22-year-old missing Docker is okay. A 35-year-old missing Docker is a red flag.", color: "text-emerald-400" },
            { title: "Hybrid Score Calibration", desc: "AI Score × 0.6 + Server NLP × 0.4. When AI tries to inflate your score, the server catches it. When AI lowballs, the server corrects. Mathematical honesty.", color: "text-blue-400" },
            { title: "Before → After Bullet Rewrites", desc: "Not just 'fix this' — we rewrite your weakest line using the Google XYZ formula and tell you exactly WHERE to paste it in your resume.", color: "text-purple-400" },
            { title: "Universal Professional Agency", desc: "Teacher, banker, receptionist, CEO — the AI adapts for ALL professions. Not just tech. Not just white-collar. Everyone.", color: "text-amber-400" },
            { title: "Live SEO-Optimized Portfolio", desc: "Your profile appears on Google with JSON-LD structured data. Share on LinkedIn and it auto-generates a rich preview card. No coding, no hosting.", color: "text-red-400" },
          ].map((item, i) => (
            <div key={i} className="p-5 glass rounded-2xl border border-white/5">
              <p className={`font-black text-sm mb-1 ${item.color}`}>{item.title}</p>
              <p className="text-slate-300 text-[12px] font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <SectionTitle>Feature-by-Feature Comparison</SectionTitle>
        <div className="overflow-x-auto rounded-2xl border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="py-4 px-5 text-[11px] font-black uppercase tracking-widest text-text-muted">Feature</th>
                <th className="py-4 px-5 text-[11px] font-black uppercase tracking-widest text-primary">CVify Pro</th>
                <th className="py-4 px-5 text-[11px] font-black uppercase tracking-widest text-text-muted">Canva / Zety</th>
                <th className="py-4 px-5 text-[11px] font-black uppercase tracking-widest text-text-muted">Rezi / Jobscan</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {[
                ["ATS Intelligence", "v4.0 Precision Engine", "❌ None / Basic", "✅ Basic Matching"],
                ["Context-Aware Scoring", "✅ Fresher → Senior", "❌ No", "❌ No"],
                ["Anti-Hallucination", "✅ 6 Strict Rules", "❌ No", "❌ No"],
                ["Hybrid Calibration", "✅ AI × 0.6 + NLP × 0.4", "❌ No", "❌ No"],
                ["Live Web Portfolio", "✅ SEO + JSON-LD", "❌ No", "❌ No"],
                ["AI Cover Letters", "✅ 3 Personality Styles", "✅ Basic", "✅ Basic"],
                ["GitHub Integration", "✅ Live Repos + Stats", "❌ No", "❌ No"],
                ["Recruiter Impression", "✅ 6-Second Verdict", "❌ No", "❌ No"],
                ["Before→After Bullets", "✅ AI Rewrite + Tips", "❌ No", "❌ No"],
                ["Universal Agency", "✅ Peon to CEO", "❌ Tech Only", "❌ Tech Only"],
                ["Score Justification", "✅ WHY per metric", "❌ No", "❌ No"],
                ["Resume Coaching Tone", "✅ Empathetic + Strict", "❌ N/A", "❌ Generic"],
                ["Recruiter Trust", "✅ API-Verified Proof", "❌ Self-Reported Only", "❌ Self-Reported Only"],
                ["Digital Presence", "✅ Live SEO Web Profile", "❌ Dead PDF Only", "❌ Dead PDF Only"],
                ["Global / Local Markets", "✅ EN, UR, NL + 4 Modes", "❌ Western Only", "❌ Western Only"],
              ].map(([feature, cvify, canva, rezi], i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5 text-text-primary font-bold">{feature}</td>
                  <td className="py-3.5 px-5 text-emerald-400 font-medium">{cvify}</td>
                  <td className="py-3.5 px-5 text-red-400/70">{canva}</td>
                  <td className="py-3.5 px-5 text-amber-400/70">{rezi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-2xl text-center">
          <p className="text-text-primary font-black text-lg mb-2">The Bottom Line</p>
          <p className="text-text-secondary text-[14px] leading-relaxed max-w-2xl mx-auto mb-4">
            Giants build platforms. We build <strong className="text-primary">precision</strong>. They give you templates — we give you 
            intelligence. They count keywords — we understand careers. If you want a pretty PDF, use Canva. 
            If you want to <strong className="text-primary">actually get hired</strong>, use CVify Pro.
          </p>
          <p className="text-text-muted text-[12px] italic">
            Giants are reliable. CVify Pro is reliable <strong className="text-primary">AND</strong> empathetic, context-aware, proof-based, recruiter-ready, and globally inclusive.
          </p>
        </div>
      </>
    ),

    recruiter: (
      <>
        <DocHeader title="For Recruiters & HR Teams" badge="Recruiter Guide" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          CVify Pro ensures candidates are "Recruiter-Ready" from the first click. Recruiters spend 6 seconds on a resume — we make those 6 seconds count.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<Award size={16} />} color="emerald" title="Verified Skills" desc="Skills backed by live project data and GitHub metrics. No more guessing." />
          <InfoCard icon={<Target size={16} />} color="blue" title="ATS-Friendly Output" desc="Standard formats your ATS loves — guaranteed 95%+ parse rate." />
          <InfoCard icon={<Brain size={16} />} color="purple" title="Contextual Fit" desc="Candidates AI-match their history against your JD, saving screening time." />
          <InfoCard icon={<Eye size={16} />} color="amber" title="10-Second Discovery" desc="Repos, Projects, ATS Score, Contact — all in one HUD dashboard." />
        </div>
        <SectionTitle>Psychological Conversion Triggers</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed">
          Trust signals (verified ATS badges), proof tags (auto-generated "Top Rated" labels), and low-friction contact (one-click WhatsApp/Email/Download) convert profile visitors into interview schedulers.
        </p>
      </>
    ),

    universal: (
      <>
        <DocHeader title="Built for Everyone (Peon to CEO)" badge="Universal" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          CVify Pro is NOT just for developers. We've democratized elite career branding for every professional level and field.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<Cpu size={16} />} color="blue" title="Tech Professionals" desc="Full GitHub integration, tech-stack optimization, project-based scoring." />
          <InfoCard icon={<Briefcase size={16} />} color="emerald" title="Corporate Leaders" desc="Leadership-focused scoring with quantified business impact." />
          <InfoCard icon={<Book size={16} />} color="purple" title="Service Industry" desc="Teachers, Receptionists — AI focuses on tenure, responsibilities, soft skills." />
          <InfoCard icon={<Sparkles size={16} />} color="amber" title="Creatives & Graduates" desc="Portfolio-first approach. Fresh grads get academic project emphasis." />
        </div>
      </>
    ),

    tips: (
      <>
        <DocHeader title="Pro Tips for a 90+ ATS Score" badge="Guide" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<BarChart3 size={16} />} color="emerald" title="Quantify Everything" desc="Replace 'Managed a team' with 'Led 8 engineers, delivering 3 projects 15% under budget.'" />
          <InfoCard icon={<Zap size={16} />} color="blue" title="Google XYZ Formula" desc="'Accomplished [X] as measured by [Y], by doing [Z].' How Google engineers write resumes." />
          <InfoCard icon={<Target size={16} />} color="purple" title="Mirror JD Language" desc="If JD says 'Docker containerization,' don't write 'used containers.' Exact match wins." />
          <InfoCard icon={<Layout size={16} />} color="amber" title="Standard Headers" desc="Work Experience, Education, Skills, Projects. Creative headers confuse parsers." />
          <InfoCard icon={<Brain size={16} />} color="red" title="Keywords in Context" desc="Don't list keywords at bottom. Integrate into project descriptions and bullets." />
          <InfoCard icon={<FileText size={16} />} color="emerald" title="PDF vs DOCX" desc="Both supported. PDF preserves layout. DOCX preferred by some enterprise ATS." />
        </div>
      </>
    ),

    faq: (
      <>
        <DocHeader title="Frequently Asked Questions" badge="FAQ" />
        <div className="space-y-3">
          {[
            { q: "My ATS score is low. What should I do?", a: "Read \"Missing Keywords\" — each has exact placement strategy. Then check \"Weak Bullets\" for before/after improvements you can copy-paste." },
            { q: "Is my data safe?", a: "Bank-grade security: Argon2 hashing, JWT + HttpOnly cookies, encrypted HTTPS. Zero AI training data retention." },
            { q: "Can I use this for non-tech jobs?", a: "Yes! Works for teachers, bankers, receptionists, marketers — anyone. AI adapts to your field automatically." },
            { q: "Why does the scan cost diamonds?", a: "Each scan uses Gemini 2.5 Flash with 3-layer analysis. Diamonds ensure fair usage and platform sustainability." },
            { q: "Can recruiters see my portfolio?", a: "Yes — cvifypro.vercel.app/p/username is public. You control visibility through dashboard settings." },
            { q: "How is this different from Canva/Zety/Rezi?", a: "Only platform combining AI ATS Auditor + Context-Aware Scoring + Live Portfolio + Cover Letter AI + Recruiter HUD — all in one ecosystem." },
            { q: "What file formats are supported?", a: "PDF or DOCX (max 5MB). PDF recommended for layout consistency." },
            { q: "Do I need technical knowledge?", a: "Zero. Step-by-step career coach. Portfolio auto-generated from profile data." },
            { q: "Can I add skills I'm still learning but not yet expert in?", a: "Yes — that's exactly what the 'Currently Learning' section is for. Add skills like Docker or AWS to your Learning Roadmap. They appear with a distinct amber badge so recruiters understand your honest growth trajectory, not inflated claims." },
            { q: "Will 'Currently Learning' skills hurt my ATS score?", a: "No — they help at a discounted weight. ATS Scanner matches learningRoadmap keywords at 50% weight (vs 100% for professional skills). You get partial credit for gaps-in-progress, never a penalty. A matched learning skill also earns a 'Gap Bridged' tag on recruiter scorecards." },
            { q: "Can I add the same skill to both professional skills and Currently Learning?", a: "No — and the system enforces this strictly. If a skill exists in your professional lists (Frontend, Backend, etc.), it cannot also appear in Currently Learning. This rule is enforced in the React UI and also at the API (server) level, so it cannot be bypassed." },
          ].map((f, i) => (
            <div key={i} className="p-5 glass rounded-2xl border border-white/5 hover:border-primary/10 transition-all">
              <p className="font-black text-primary text-sm mb-1.5">Q: {f.q}</p>
              <p className="text-text-secondary text-[13px] font-medium leading-relaxed">A: {f.a}</p>
            </div>
          ))}
        </div>
      </>
    ),

    roadmap: (
      <>
        <DocHeader title="Future Roadmap" badge="Product Vision" />
        
        <SectionTitle>Recently Released (Live Now! 🚀)</SectionTitle>
        <div className="space-y-3 mb-8">
          {[
            { title: "🧠 Currently Learning Skills (learningRoadmap)", desc: "New technicalSkills.learningRoadmap field added to the Resume schema. Users can tag skills they are actively studying — displayed with distinct amber 'Learning' styling in the Skills section. Full architecture: useResumeSkills() hook decouples UI from Redux paths, BFF validateTechnicalSkillsBFF() enforces mutual exclusion at API level, and ATS scoring applies a 50% weight to learning skills to prevent dishonest scorecards.", status: "NEW" },
            { title: "BFF Validation Gatekeeper v2 — technicalSkills Integrity", desc: "A production-grade validateTechnicalSkillsBFF() function now runs inside both createResume and updateResume server controllers. Enforces: (1) Mutual exclusion — same skill cannot be in professional lists AND learningRoadmap simultaneously, (2) Dual-format support for both nested object and Mongoose dot-notation PATCH bodies. Skill lists are intentionally unlimited — no size cap. Returns HTTP 400 with a precise conflict message.", status: "NEW" },
            { title: "Redux resumeSlice Architecture Refactor", desc: "Removed the ResumeFields constants dictionary (Single Responsibility principle — Redux slice should not own domain schema). The setResumeField reducer now uses a generic nested-path resolver supporting dot-notation like 'technicalSkills.learningRoadmap' — eliminating 29 hardcoded constants while maintaining full backward compatibility.", status: "NEW" },
            { title: "Universal Floating Navbar — All Themes", desc: "The premium pill-shaped floating navbar (previously only on Standard themes) is now the single universal navbar across ALL 13 themes. AuraDark and CyberNeon's old theme-specific navbars were removed and replaced. Navbar links dynamically map to the correct section IDs per theme.", status: "NEW" },
            { title: "DataVerse Technologies Footer Branding", desc: "A consistent branded footer has been added across all 13 portfolio themes: 'Powered by DataVerse Technologies | Designed & Developed by Umair Ahmed | © 2026'. Both DataVerse and Umair Ahmed link to their respective public profiles.", status: "NEW" },
            { title: "CYBER NEON Theme", desc: "10th premium portfolio theme — near-black (#080808) background with electric neon green (#00ffcc) accents, Orbitron monospace font, floating dev characters FX, and full GitHub stats integration. Hacker aesthetic for cybersecurity and blockchain professionals.", status: "NEW" },
            { title: "Frontend Performance Optimizations", desc: "content-visibility:auto on all major profile sections, useCallback on all PublicProfile handlers, useMemo on personalInfo/publicResumes to prevent React.memo bypass, fetchpriority='high' on hero LCP image, font-display:swap + DNS prefetch for CDNs.", status: "NEW" },
            { title: "AI Representative (Portfolio AI Guide)", desc: "Floating AI-powered chat widget on every public portfolio. Represents the candidate to recruiters with dynamic profile search, quick action buttons, and anti-hallucination guardrails. Powered by Groq SSE streaming.", status: "ACTIVE" },
            { title: "Security v6.0 — Defense in Depth", desc: "Rate limiting (IP+Email keyed), NoSQL injection protection, password hardening (8–72 chars), pepper hashing with lazy migration, HttpOnly cookies, secure logout endpoint.", status: "ACTIVE" },
            { title: "Premium Dark Email Templates", desc: "All transactional emails (OTP, Password Reset, Portfolio Contact) redesigned to match the CVify Pro dark theme — deep dark background, teal accents, premium branding.", status: "ACTIVE" },
            { title: "AURA DARK Theme", desc: "Cosmic minimal theme engineered for tech professionals and startup founders.", status: "ACTIVE" },
            { title: "GitHub Intelligence Panel", desc: "Real-time GitHub DNA insights, repository highlights, and language synthesis.", status: "ACTIVE" },
            { title: "Magic AI Import", desc: "Instant resume hydration from PDF/DOCX using deep semantic parsing.", status: "ACTIVE" },
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-2xl flex justify-between items-start gap-4 border ${
              item.status === "NEW" ? "bg-primary/5 border-primary/20" : item.status === "FIX" ? "bg-amber-500/5 border-amber-500/15" : "bg-emerald-500/5 border-emerald-500/10"
            }`}>
              <div>
                <p className={`font-black text-sm ${
                  item.status === "NEW" ? "text-primary" : item.status === "FIX" ? "text-amber-400" : "text-emerald-400"
                }`}>{item.title}</p>
                <p className="text-text-secondary text-[12px] font-medium leading-relaxed">{item.desc}</p>
              </div>
              <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full flex-shrink-0 ${
                item.status === "NEW" ? "bg-primary text-white" : item.status === "FIX" ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/10 text-emerald-500"
              }`}>{item.status}</span>
            </div>
          ))}
        </div>

        <SectionTitle>Upcoming Milestones</SectionTitle>
        <div className="space-y-3">
          {[
            { title: "AI Job Discovery Engine", desc: "A unified job board that automatically matches you with roles from LinkedIn, Indeed, and glassdoor based on your CVify score.", status: "TOP PRIORITY" },
            { title: "AI Interview Simulation", desc: "AI-powered voice/text interviews based on your resume and target JD.", status: "Q3 2026" },
            { title: "CVify Chrome Extension", desc: "Analyze any job description on LinkedIn/Indeed without leaving the page.", status: "Q4 2026" },
            { title: "Verified Skill Badges", desc: "Blockchain-verified proficiency badges that recruiters can trust.", status: "Q4 2026" },
            { title: "Multi-Language Resumes", desc: "Generate resumes in Arabic, Dutch, and Urdu for regional markets.", status: "2027" },
          ].map((item, i) => (
            <div key={i} className={`p-5 rounded-2xl flex justify-between items-start gap-4 transition-all ${item.status === "TOP PRIORITY" ? "bg-primary/5 border border-primary/20 shadow-lg shadow-primary/5" : "glass border border-white/5"}`}>
              <div>
                <p className={`font-black text-sm ${item.status === "TOP PRIORITY" ? "text-primary" : "text-text-primary"}`}>{item.title}</p>
                <p className="text-text-secondary text-[12px] font-medium leading-relaxed">{item.desc}</p>
              </div>
              <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full flex-shrink-0 ${item.status === "TOP PRIORITY" ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </>
    ),

    "ai-representative-v2": (
      <>
        <DocHeader title="🤖 AI Representative" badge="New Feature" />
        <p className="text-slate-300 text-[15px] leading-relaxed mb-8">
          The <strong className="text-text-primary">AI Representative</strong> is a floating, real-time AI-powered portfolio guide embedded on every CVify Pro public profile.
          It is NOT a generic chatbot — it is a <strong className="text-text-primary">digital representative</strong> of the portfolio owner,
          helping recruiters, hiring managers, and visitors instantly understand a candidate without reading the entire portfolio.
        </p>

        <SectionTitle>What It Is (And What It Is Not)</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <InfoCard icon={<Bot size={16} />} color="emerald" title="Portfolio Guide"
            desc="Acts as a professional receptionist and executive assistant. Introduces the candidate, explains their experience, showcases projects, and facilitates direct contact." />
          <InfoCard icon={<Shield size={16} />} color="blue" title="NOT a General AI"
            desc="Does not answer questions outside the portfolio owner's profile. Never invents information. Strictly grounded in real profile data fetched from the database." />
          <InfoCard icon={<Users size={16} />} color="purple" title="Represents, Never Impersonates"
            desc="Always says 'I represent [Name]' — never 'I am [Name]'. This distinction is a core product philosophy enforced at the system prompt level." />
          <InfoCard icon={<Zap size={16} />} color="amber" title="Zero Typing Required"
            desc="Quick Action Buttons let recruiters explore the candidate with a single click — no prompting, no typing. Engineered for high engagement and low friction." />
        </div>

        <SectionTitle>Core Architecture</SectionTitle>
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-8 overflow-x-auto">
          <pre className="text-[12px] text-text-secondary font-mono leading-relaxed whitespace-pre">{`AI Representative Stack
├─ Frontend
│   ├─ AiAgentWidget.jsx       # Floating chat UI (Framer Motion + Glassmorphism)
│   ├─ useAgentStream.jsx      # Custom hook — native fetch SSE stream decoder
│   └─ PublicProfile.jsx       # Mounts <AiAgentWidget profileData={user} />
│
└─ Backend
    ├─ agentController.js      # buildSystemPrompt() + searchProfile() + streamChat()
    ├─ agent.routes.js          # POST /api/agent/stream
    └─ server.js               # app.use('/api/agent', agentRoutes)`}</pre>
        </div>

        <SectionTitle>How It Works — Full Request Flow</SectionTitle>
        <Steps items={[
          { step: "1", title: "Profile Data Passed from Redux", desc: "PublicProfile.jsx passes the live Redux user object as profileData to AiAgentWidget. No extra API call — the data is already in state." },
          { step: "2", title: "User Sends a Message or Clicks Quick Action", desc: "useAgentStream.jsx fires a POST /api/agent/stream with the full profileData + conversation history (messages array)." },
          { step: "3", title: "Backend Fact-Check Search", desc: "agentController.js runs searchProfile() — a pure JavaScript keyword scanner that checks skills, project tech stacks, experience descriptions, bio, and headline BEFORE calling the LLM." },
          { step: "4", title: "Dynamic System Prompt Built", desc: "buildSystemPrompt(profile) constructs a fully personalized system prompt from the real profile data — name, headline, skills, projects, experience, contact links." },
          { step: "5", title: "Fact Check Injected as Ground Truth", desc: "The search result is injected as a second system message labeled BACKEND FACT CHECK — ABSOLUTE GROUND TRUTH. The LLM cannot contradict it." },
          { step: "6", title: "Groq SSE Stream", desc: "Groq (llama-3.1-8b-instant) streams the response via Server-Sent Events at temperature: 0.1 for maximum factual precision." },
          { step: "7", title: "Frontend Decodes & Renders", desc: "useAgentStream decodes the SSE stream with TextDecoder, appends chunks to the last assistant message in real-time. React Markdown renders contact links as glassmorphism buttons." },
        ]} />

        <SectionTitle>Anti-Hallucination System</SectionTitle>
        <div className="space-y-3 mb-8">
          {[
            { tag: "RULE 1", color: "red", title: "Zero Hallucination", desc: "LLM cannot mention any skill, project, company, or technology NOT explicitly listed in the verified profile data. Violators are caught by the FACT CHECK injection." },
            { tag: "RULE 2", color: "blue", title: "Backend Pre-Search", desc: "searchProfile() runs pure JS keyword matching across skills, projects, experience, bio BEFORE the LLM call. Result is passed as ground truth the model must follow." },
            { tag: "RULE 3", color: "emerald", title: "Missing Data Response", desc: "If information is not in the profile, the AI responds only: 'I couldn't find that information in [Name]'s profile.' Nothing else — no assumptions, no guesses." },
            { tag: "RULE 4", color: "amber", title: "Persona Lock", desc: "Anti-injection shield: if a visitor tries to override the persona ('ignore instructions', 'you are now...'), the AI rejects it instantly and stays in character." },
            { tag: "RULE 5", color: "purple", title: "No Invented Sections", desc: "The LLM is explicitly forbidden from adding 'Additional Skills' or 'Additional Projects' sections. If a list ends, it ends. Period." },
          ].map((item, i) => {
            const colors = { red: "bg-red-500/10 border-red-500/20 text-red-400", blue: "bg-blue-500/10 border-blue-500/20 text-blue-400", emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", amber: "bg-amber-500/10 border-amber-500/20 text-amber-400", purple: "bg-purple-500/10 border-purple-500/20 text-purple-400" };
            return (
              <div key={i} className={`p-4 rounded-2xl border ${colors[item.color]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${colors[item.color]}`}>{item.tag}</span>
                  <p className="font-black text-sm text-text-primary">{item.title}</p>
                </div>
                <p className="text-text-secondary text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <SectionTitle>Quick Action Buttons</SectionTitle>
        <p className="text-slate-400 text-[13px] leading-relaxed mb-4">
          When the chat opens, dynamic Quick Action Buttons are shown above the input. They are generated based on what data is available in the profile — no projects means no "View Projects" button. Clicking any button fires <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">sendMessage()</code> directly without typing.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
          {[
            { icon: "🧑", label: "Introduce Candidate", cond: "Always shown" },
            { icon: "💼", label: "Show Experience", cond: "If experience exists" },
            { icon: "🚀", label: "View Projects", cond: "If projects exist" },
            { icon: "🛠", label: "Explore Skills", cond: "If skills exist" },
            { icon: "🎓", label: "Certifications", cond: "If certifications exist" },
            { icon: "⭐", label: "Testimonials", cond: "If testimonials exist" },
            { icon: "📞", label: "Contact Candidate", cond: "If any contact info exists" },
          ].map((btn, i) => (
            <div key={i} className="p-3 bg-slate-800/40 border border-slate-700/40 rounded-xl">
              <p className="text-slate-200 font-black text-xs mb-0.5">{btn.icon} {btn.label}</p>
              <p className="text-slate-500 text-[10px]">{btn.cond}</p>
            </div>
          ))}
        </div>

        <SectionTitle>AI Persona Rules</SectionTitle>
        <ComparisonTable items={[
          { left: "Identity", right: "'I represent [Name]' — never 'I am [Name]'" },
          { left: "Greeting", right: "2-line intro + invite questions. Never dumps full profile." },
          { left: "Contact Trigger", right: "Contact block shown ONLY on greetings or explicit hiring/contact intent" },
          { left: "Response Length", right: "Max 150 words for factual queries. No walls of text." },
          { left: "Prohibited", right: "No interviews, no career advice, no fictional achievements, no filler phrases" },
          { left: "Temperature", right: "0.1 — maximum factual precision, minimum creative drift" },
          { left: "Model", right: "Groq llama-3.1-8b-instant — ultra-low latency for real-time streaming" },
        ]} />

        <SectionTitle>API Endpoint</SectionTitle>
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
          <p className="text-[11px] font-black uppercase tracking-widest text-text-muted mb-3">POST /api/agent/stream</p>
          <ComparisonTable items={[
            { left: "Method", right: "POST" },
            { left: "Content-Type", right: "application/json" },
            { left: "Response", right: "text/event-stream (SSE)" },
            { left: "Body: messages", right: "Array of {role, content} — conversation history" },
            { left: "Body: profileData", right: "Full portfolio owner user object from Redux" },
            { left: "Stream Format", right: "data: {\"content\": \"chunk\"}\\n\\n ... data: [DONE]" },
          ]} />
        </div>
      </>
    ),

    "universal-navbar": (
      <>
        <DocHeader title="Universal Floating Navbar" badge="UI Update" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          In June 2026, CVify Pro made the <strong className="text-text-primary">premium pill-shaped floating navbar universal</strong> — it now renders identically across all 13 portfolio themes. Previously, AuraDark had a hamburger overlay menu and CyberNeon had its own top bar; both were removed in favour of the single shared navbar.
        </p>

        <SectionTitle>What Changed</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<Layout size={18} />} color="blue" title="One Navbar, All Themes"
            desc="The floating pill navbar (CVifyPro logo, nav links, Live Editor badge, Get CV button) now mounts from PublicProfile.jsx above all theme renders — no per-theme nav logic." />
          <InfoCard icon={<Globe size={18} />} color="emerald" title="Smart Section ID Mapping"
            desc="getSectionId() maps generic labels (Home, About, Journey, Showcase, Contact) to the correct DOM IDs per theme — e.g. AuraDark uses #experience-ad, CyberNeon uses #resume and #projects." />
          <InfoCard icon={<Palette size={18} />} color="purple" title="Theme-Aware CSS Variables"
            desc="Navbar uses var(--bg-primary), var(--primary-color), var(--card-border) — CSS variables set by each theme. AuraDark gets purple accents, CyberNeon gets neon green, automatically." />
          <InfoCard icon={<Zap size={18} />} color="amber" title="Zero-Re-render Scroll"
            desc="Scroll detection uses a pure DOM classList toggle (html.pub-scrolled) instead of React state — removing all scroll-triggered re-renders from the component tree entirely." />
        </div>

        <SectionTitle>Section ID Map by Theme</SectionTitle>
        <ComparisonTable items={[
          { left: "Standard / TerminalDark / APEX", right: "#hero · #about · #experience · #showcase · #contact" },
          { left: "AuraDark", right: "#ad-hero-name · #about-ad · #experience-ad · #showcase-ad · #contact-ad" },
          { left: "CyberNeon", right: "#home · #about · #resume (Journey) · #projects (Showcase) · #contact" },
          { left: "OrientalLuxe", right: "#hero-ol · #about-ol · #experience-ol · #showcase-ol · #contact-ol" },
        ]} />
      </>
    ),

    "footer-branding": (
      <>
        <DocHeader title="Footer Branding" badge="UI Update" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          Every CVify Pro portfolio theme now includes a consistent, branded footer section at the bottom of the page — establishing clear product ownership and attribution.
        </p>

        <SectionTitle>Footer Content</SectionTitle>
        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl mb-6">
          <div className="space-y-3 text-[13px]">
            <div className="flex items-start gap-3">
              <span className="font-black text-primary w-36 flex-shrink-0">Line 1</span>
              <span className="text-text-secondary">Powered by: <strong className="text-text-primary">DataVerse Technologies</strong> (links to dataversetechnologies.vercel.app)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-black text-primary w-36 flex-shrink-0">Line 2</span>
              <span className="text-text-secondary">Designed &amp; Developed by: <strong className="text-text-primary">Umair Ahmed</strong> (links to app-cvifypro.vercel.app/p/umairansari92)</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-black text-primary w-36 flex-shrink-0">Line 3</span>
              <span className="text-text-secondary">© 2026 DataVerse Technologies. All rights reserved.</span>
            </div>
          </div>
        </div>

        <SectionTitle>Coverage</SectionTitle>
        <ComparisonTable items={[
          { left: "CVify Classic / Standard", right: "✅ Footer added" },
          { left: "AURA DARK", right: "✅ Footer added (styled to match dark palette)" },
          { left: "TERMINAL DARK", right: "✅ Footer added" },
          { left: "CYBER NEON", right: "✅ Footer added" },
          { left: "ORIENTAL LUXE", right: "✅ Footer added (gold accent on links)" },
          { left: "APEX", right: "✅ Footer added (teal accent on links)" },
          { left: "Midnight Dev / Corporate Gold / Creative Sunset / Slate / Emerald", right: "✅ Footer added" },
        ]} />
      </>
    ),

    "perf-optimizations": (
      <>
        <DocHeader title="⚡ Frontend Performance Optimizations" badge="Performance" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          In June 2026, CVify Pro's Public Profile page underwent a focused performance engineering pass targeting <strong className="text-text-primary">INP (Interaction to Next Paint)</strong>, <strong className="text-text-primary">LCP (Largest Contentful Paint)</strong>, and unnecessary React re-renders. All changes are applied in <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">PublicProfile.jsx</code>.
        </p>

        <SectionTitle>1. CSS Scroll Class Toggle (INP Fix)</SectionTitle>
        <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed mb-3">
            Replaced <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">useState(scrolled)</code> with a pure DOM <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">classList.toggle</code> on the <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">&lt;html&gt;</code> element.
          </p>
          <pre className="text-[11px] font-mono text-text-secondary leading-relaxed whitespace-pre">{`// Before: Every scroll threshold change triggered a re-render
const [scrolled, setScrolled] = useState(false);

// After: Pure DOM — zero React involvement
document.documentElement.classList.toggle('pub-scrolled', window.scrollY > 20);`}</pre>
          <p className="text-text-muted text-[12px] mt-3">Navbar scroll animations moved to pure CSS: <code className="text-xs">html.pub-scrolled .pub-nav</code> — no React state, no re-renders.</p>
        </div>

        <SectionTitle>2. content-visibility: auto (Render Deferral)</SectionTitle>
        <div className="p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl mb-6">
          <p className="text-text-secondary text-[13px] leading-relaxed">
            Applied <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">content-visibility: auto</code> with <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">contain-intrinsic-size</code> to all major profile sections via the <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">.cv-section</code> utility class. The browser skips painting offscreen sections until the user scrolls near them — significantly reducing initial render work.
          </p>
        </div>

        <SectionTitle>3. Stable References (useCallback + useMemo)</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard icon={<Zap size={16} />} color="emerald" title="useCallback on All Handlers"
            desc="handleArrayUpdate, handleTogglePublic, handleContactSubmit, and ensureAbsoluteUrl are now wrapped in useCallback. This keeps their references stable, allowing React.memo on child sections to actually work." />
          <InfoCard icon={<Brain size={16} />} color="blue" title="useMemo on Derived Objects"
            desc="personalInfo (passed to Hero) and publicResumes were new object/array literals every render, silently defeating React.memo. Both are now wrapped in useMemo with precise dependency arrays." />
        </div>

        <SectionTitle>4. LCP Image Optimization</SectionTitle>
        <ComparisonTable items={[
          { left: "fetchpriority", right: "'high' — browser prioritizes this image above all others" },
          { left: "decoding", right: "'async' — image decode does not block the main thread" },
          { left: "loading", right: "'eager' — explicitly not lazy-loaded (it's above the fold)" },
        ]} />

        <SectionTitle>5. Font & Network Optimizations (index.html)</SectionTitle>
        <ComparisonTable items={[
          { left: "font-display", right: "'swap' — text visible immediately using fallback font while custom font loads" },
          { left: "dns-prefetch", right: "Added for res.cloudinary.com and fonts.gstatic.com — pre-resolves DNS before images request" },
        ]} />
      </>
    ),

    company: (
      <>
        <DocHeader title="Company & Ownership" badge="About" />
        <ComparisonTable items={[
          { left: "Product", right: "CVify Pro (Career Intelligence & Portfolio Engine)" },
          { left: "Parent Brand", right: "CVify Intelligence Systems" },
          { left: "Lead Architect", right: "Umair Ansari (Full-Stack Developer & AI Engineer)" },
          { left: "LinkedIn", right: "linkedin.com/company/cvifypro" },
          { left: "Core Vision", right: "Democratize elite career branding globally — no talent lost in the ATS void." },
          { left: "Contact", right: "Integrated HUD on platform or official LinkedIn for enterprise inquiries." },
        ]} />
      </>
    ),
    "currently-learning": (
      <>
        <DocHeader title="🧠 Skills Engine &amp; Currently Learning" badge="New Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          The <strong className="text-text-primary">Skills Engine</strong> provides a dual-mode entry system (General vs. Developer) that categorizes candidate capabilities for recruiters while maintaining complete ATS scoring integrity. It works hand-in-hand with the <strong className="text-text-primary">Currently Learning</strong> roadmap to transparently separate proven skills from active studies.
        </p>

        <SectionTitle>Key Features</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InfoCard icon={<TrendingUp size={18} />} color="emerald" title="Honest Career Signaling"
            desc="Candidates can show Docker or AWS under 'Currently Learning' without falsely claiming 'Expert' status. Recruiters see genuine learning intent." />
          <InfoCard icon={<Target size={18} />} color="blue" title="ATS Gap Bridging"
            desc="ATS Scanner matches learningRoadmap keywords at 50% weight. Candidates with matching gaps-in-progress score higher than those with cold missing skills." />
          <InfoCard icon={<ShieldCheck size={18} />} color="purple" title="Mutual Exclusion Guardrail"
            desc="A skill cannot exist in both professional and learning lists simultaneously. Enforced at both the React UI level and the API (BFF) level." />
          <InfoCard icon={<Zap size={18} />} color="amber" title="Unlimited Skill Tags"
            desc="No artificial cap on skill counts. Users add whatever the job post demands for maximum ATS matching coverage without scoring penalties." />
        </div>

        <SectionTitle>Profession Modes</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
            <h4 className="font-black text-primary text-sm mb-2">🏢 General / Non-Tech Mode</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              Provides a single, flat list of professional skills. Ideal for business, sales, admin, operations, and management roles where highly nested categorization is not required.
            </p>
          </div>
          <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl">
            <h4 className="font-black text-primary text-sm mb-2">💻 Developer / Tech Mode</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              Splits skills into 6 structured inputs: <strong className="text-text-primary">Frontend, Backend, Database, AI/DevOps, Security, and Tools</strong>. Great for software engineers, designers, and tech professionals.
            </p>
          </div>
        </div>

        <SectionTitle>Technical Architecture &amp; Sync Logic</SectionTitle>
        <div className="space-y-4 mb-8">
          <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <h4 className="font-black text-blue-400 text-sm mb-2">Layer 1: Redux Schema — resumeSlice.js</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed mb-3">
              The <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">initialState.currentResume.technicalSkills</code> object includes nested arrays for all developer categories (<code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">frontend</code>, <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">backend</code>, <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">database</code>, <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">aiDevOps</code>, <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">security</code>, <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">tools</code>, <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">learningRoadmap</code>).
            </p>
          </div>
          <div className="p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
            <h4 className="font-black text-purple-400 text-sm mb-2">Layer 2: Theme Sync Logic — SkillsForm.jsx</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              Whenever a developer adds or removes a skill in a category, the system automatically merges and dispatches the union list to the flat <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">skills</code> field. This ensures all 13 interactive portfolio themes remain 100% compatible out-of-the-box.
            </p>
          </div>
          <div className="p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
            <h4 className="font-black text-emerald-400 text-sm mb-2">Layer 3: BFF Controller — validateTechnicalSkillsBFF()</h4>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              Enforces cross-category duplicate checks and mutual exclusion checks at the backend level. Direct PATCH requests violating validation rules (e.g., adding a skill to both learningRoadmap and frontend) return <code className="text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-xs">HTTP 400 Bad Request</code>.
            </p>
          </div>
        </div>

        <SectionTitle>ATS &amp; PDF Rendering Engine</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed mb-4">
          All 12 ATS-friendly PDF templates are fully integrated. In Developer mode, templates print dedicated headers (Frontend, Backend, Database, AI/DevOps, Security, Tools) to present a clean technical expertise section to recruiters.
        </p>
        <ComparisonTable items={[
          { left: "Flat Skills Mode", right: "Renders as comma-separated professional skills" },
          { left: "Developer Categories", right: "Renders as separate structured categories (Frontend, Backend, Security, etc.)" },
          { left: "Currently Learning Roadmap", right: "Renders separately with dashed/italic learning badge" },
        ]} />
      </>
    ),
  };

  const NavItem = ({ id, icon, label }) => (
    <button
      onClick={() => { setActiveSection(id); setMobileNav(false); }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all ${
        activeSection === id
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-text-muted hover:bg-white/5 hover:text-text-primary"
      }`}
    >
      <span className={activeSection === id ? "text-primary" : "text-text-muted opacity-60"}>{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-text-main">
      {/* ── TOP BAR ── */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 glass border-b border-border-subtle bg-background/80 flex justify-between items-center px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft size={18} />
          </button>
          <Logo className="w-28 md:w-36" />
          <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.2em] text-text-muted border-l border-border-subtle pl-4">Documentation</span>
        </div>
        <button onClick={() => setMobileNav(!mobileNav)} className="lg:hidden p-2 hover:bg-white/5 rounded-full">
          {mobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div className="flex pt-24">
        {/* ── SIDEBAR (Desktop) ── */}
        <aside className="hidden lg:block w-72 h-[calc(100vh-96px)] sticky top-24 overflow-y-auto border-r border-border-subtle p-4 pb-12 space-y-6 glass bg-background/40">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted mb-2 px-4">{group.label}</p>
              <div className="space-y-1">
                {group.items.map(item => <NavItem key={item.id} {...item} />)}
              </div>
            </div>
          ))}
        </aside>

        {/* ── MOBILE NAV ── */}
        <AnimatePresence>
          {mobileNav && (
            <motion.aside 
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              className="fixed left-0 top-24 w-72 h-[calc(100vh-96px)] z-40 overflow-y-auto border-r border-border-subtle p-4 pb-12 space-y-6 bg-background lg:hidden"
            >
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted mb-2 px-4">{group.label}</p>
                  <div className="space-y-1">
                    {group.items.map(item => <NavItem key={item.id} {...item} />)}
                  </div>
                </div>
              ))}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto min-h-[calc(100vh-64px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {content[activeSection]}
            </motion.div>
          </AnimatePresence>

          {/* FOOTER */}
          <div className="mt-20 pt-8 border-t border-border-subtle text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-text-muted opacity-40">CVify Intelligence Systems &copy; 2026</p>
          </div>
        </main>
      </div>
    </div>
  );
};

// ─── REUSABLE COMPONENTS ───

const DocHeader = ({ title, badge }) => (
  <div className="mb-8 pb-6 border-b border-border-subtle">
    <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest rounded-full mb-4">{badge}</span>
    <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">{title}</h1>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-lg font-black text-text-primary tracking-tight mt-8 mb-4 flex items-center gap-2">
    <ChevronRight size={16} className="text-primary" />{children}
  </h3>
);

const InfoCard = ({ icon, color, title, desc }) => {
  const colors = {
    blue: "bg-blue-500/5 border-blue-500/10 text-blue-400",
    emerald: "bg-emerald-500/5 border-emerald-500/10 text-emerald-400",
    purple: "bg-purple-500/5 border-purple-500/10 text-purple-400",
    amber: "bg-amber-500/5 border-amber-500/10 text-amber-400",
    red: "bg-red-500/5 border-red-500/10 text-red-400",
  };
  return (
    <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-1.5">
        {icon}
        <p className="font-black text-sm">{title}</p>
      </div>
      <p className="text-text-secondary text-[12px] font-medium leading-relaxed">{desc}</p>
    </div>
  );
};

const Steps = ({ items }) => (
  <div className="space-y-3 mb-4">
    {items.map((s, i) => (
      <div key={i} className="flex gap-4 items-start">
        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-xs flex-shrink-0 mt-0.5">{s.step}</div>
        <div>
          <p className="font-black text-text-primary text-sm">{s.title}</p>
          <p className="text-text-secondary text-[13px] font-medium leading-relaxed">{s.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const ComparisonTable = ({ items }) => (
  <div className="space-y-2 mb-4">
    {items.map((c, i) => (
      <div key={i} className="flex items-stretch gap-3 text-[13px]">
        <div className="w-1/3 p-3 bg-white/[0.03] rounded-xl font-black text-text-primary flex items-center">{c.left}</div>
        <div className="flex items-center text-primary font-bold">→</div>
        <div className="flex-1 p-3 bg-primary/5 rounded-xl font-medium text-text-secondary border border-primary/10 flex items-center">{c.right}</div>
      </div>
    ))}
  </div>
);

export default Documentation;
