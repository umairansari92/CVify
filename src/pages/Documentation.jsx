import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, Cpu, ShieldCheck, Zap, Target, Gem, ChevronRight, 
  FileText, Globe, ArrowLeft, Users, Sparkles, Eye,
  Brain, Layers, Briefcase, Rocket, Layout,
  Database, Star, Award, MessageSquare, Shield, Menu, X,
  BarChart3, GitBranch, TrendingUp, Heart,
  AlertCircle, Palette, Wand2, MousePointer, Settings2, Mail
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
      ]
    },
    {
      label: "Core Features",
      items: [
        { id: "ats", icon: <Target size={16} />, label: "ATS v4.0 Precision Engine" },
        { id: "coach", icon: <Brain size={16} />, label: "AI Resume Coach PRO" },
        { id: "cover-letter", icon: <MessageSquare size={16} />, label: "AI Cover Letters" },
        { id: "portfolio", icon: <Globe size={16} />, label: "Live Portfolio & SEO" },
        { id: "profile", icon: <Layout size={16} />, label: "User Profile & Dashboard" },
      ]
    },
    {
      label: "Intelligence Hub",
      items: [
        { id: "magic-import", icon: <Sparkles size={16} />, label: "Magic AI Import" },
        { id: "intent-mode", icon: <Zap size={16} />, label: "AI Intent Mode" },
        { id: "job-matcher", icon: <Target size={16} />, label: "Job Matcher (JD Analysis)" },
      ]
    },
    {
      label: "Security & Anti-Abuse",
      items: [
        { id: "helmet", icon: <Shield size={16} />, label: "Helmet Middleware" },
        { id: "disposable-email", icon: <Mail size={16} />, label: "Disposable Email Blocking" },
        { id: "security-v6", icon: <ShieldCheck size={16} />, label: "🔐 Security v6.0 (Latest)" },
      ]
    },
    {
      label: "Themes & Visual FX",
      items: [
        { id: "themes", icon: <Palette size={16} />, label: "All 8 Portfolio Themes" },
        { id: "oriental-luxe", icon: <Wand2 size={16} />, label: "🕌 ORIENTAL LUXE" },
        { id: "aura-dark", icon: <Sparkles size={16} />, label: "✨ AURA DARK (New!)" },
        { id: "particles", icon: <MousePointer size={16} />, label: "Interactive Particles FX" },
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
        <DocHeader title="All 8 Portfolio Themes" badge="Visual Design" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
          Every CVify Pro portfolio comes with <strong className="text-text-primary">8 handcrafted, premium themes</strong> — each a complete visual identity with its own typography, color palette, card style, background animation, and interactive particle effects. Choose the one that matches your personal brand.
        </p>

        <div className="space-y-4 mb-8">
          {[
            { icon: "🌐", name: "CVify Classic", accent: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5", desc: "The original CVify signature look. Clean dark navy background with blue accent tones. Best for developers, engineers, and tech professionals who want a polished, trustworthy look.", tags: ["Dark Mode", "Blue Accent", "Professional"] },
            { icon: "🌙", name: "Midnight Dev", accent: "text-violet-400", border: "border-violet-500/20", bg: "bg-violet-500/5", desc: "Built for coders. Deep midnight purple background with interactive particle field that reacts to your mouse cursor in repulse mode. Animated geometric grid overlay for an immersive feel.", tags: ["Dark Mode", "Particles FX", "Mouse Reactive", "Developers"] },
            { icon: "💼", name: "Corporate Gold", accent: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/5", desc: "Authority and prestige. Dark charcoal base with warm gold accents. Diagonal stripe overlay and classic typography. Perfect for executives, finance professionals, and senior management roles.", tags: ["Dark Mode", "Gold Accent", "Executive"] },
            { icon: "🌅", name: "Creative Sunset", accent: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/5", desc: "Vibrant gradient energy. Warm orange-to-pink sunset tones with animated bokeh blobs in the background. Ideal for designers, artists, content creators, and startup founders.", tags: ["Dark Mode", "Gradient Blobs", "Creative"] },
            { icon: "📋", name: "Slate Minimalist", accent: "text-slate-300", border: "border-slate-500/20", bg: "bg-slate-500/5", desc: "Precision in simplicity. Light gray background with barely-there noise texture. Ultra-clean typography with maximum readability. Best suited for consultants, academics, and corporate professionals.", tags: ["Light Mode", "Minimal", "Clean"] },
            { icon: "🌿", name: "Emerald Leader", accent: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", desc: "Natural authority. Deep forest green palette exuding calm confidence and leadership. Great for sustainability professionals, project managers, and team leads.", tags: ["Dark Mode", "Green Accent", "Leadership"] },
            { icon: "🕌", name: "ORIENTAL LUXE", accent: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5", desc: "Ultra-exotic and luxurious. Ultra-dark near-black background (#090909) with warm gold (#b58953) accents. Geometric SVG mandala patterns float behind the profile using the Outfit font. Exudes luxury, sophistication, and cultural richness.", tags: ["Dark Mode", "Gold Luxury", "Geometric FX"] },
            { icon: "✨", name: "AURA DARK", accent: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5", desc: "Pure darkness meets cosmic elegance. Absolute black background (#000000) with deep purple accents (#B677EF). Uses the modern Syne font for a cutting-edge aesthetic. Perfect for tech innovators, startup founders, and creators pushing boundaries.", tags: ["Dark Mode", "Purple Accent", "Minimal", "NEW!"] },
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
            "Previously, the dashboard had to hit 5 alag-alag APIs (Profile, Resumes, Letters, Stats, Economy) to render a single screen. This caused 'Network Waterfalls', where if one service was slow, the whole UI felt broken or 'jiggly' due to constant layout shifts."
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
├─ Client/                     # React SPA (Vite)
│   ├─ src/
│   │   ├─ pages/            # SPA routes (Documentation, PublicProfile, …)
│   │   ├─ components/       # Reusable UI (ThemeBackgroundFX, InfoCard, …)
│   │   ├─ themes/           # 7 premium themes + ORIENTAL LUXE
│   │   ├─ utils/            # API wrapper, formatters
│   │   └─ three/            # Three.js visualisations
│   ├─ public/                # Static assets
│   └─ vite.config.ts
├─ Server/                     # Express API
│   ├─ controllers/          # Business logic (auth, resume, ATS, …)
│   ├─ models/               # Mongoose schemas
│   ├─ routes/               # Express routers
│   ├─ middlewares/          # Helmet, rate‑limit, error handling
│   ├─ services/              # Email, PDF, background jobs
│   ├─ utils/                # blockedDomains.js (disposable email blocking)
│   └─ server.js              # Entry point, BFF integration
├─ .env                       # Environment variables
├─ package.json               # Monorepo dependencies
└─ vercel.json                # Vercel deployment config`}</pre>
        </div>

        <SectionTitle>Key Directories Explained</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <InfoCard icon={<Layout size={16} />} color="blue" title="Client/src/pages/" desc="Every SPA route lives here — Dashboard, Builder, PublicProfile, Documentation. Each page owns its own layout and data fetching." />
          <InfoCard icon={<Cpu size={16} />} color="purple" title="Client/src/themes/" desc="7 modular theme folders, each with its own BackgroundFX.jsx particle/SVG config. Adding a new theme = adding one folder." />
          <InfoCard icon={<Shield size={16} />} color="emerald" title="Server/middlewares/" desc="Helmet (security headers), express-rate-limit (abuse prevention), auth guard (JWT verification), and centralised errorHandler.js." />
          <InfoCard icon={<Database size={16} />} color="amber" title="Server/utils/blockedDomains.js" desc="A curated Set of 200+ disposable/temporary email domains. Exported isDisposableEmail() is called on signup and referral to block abuse." />
          <InfoCard icon={<Layers size={16} />} color="red" title="Server/server.js" desc="Express app entry point. Mounts Helmet globally, registers the BFF router (/api/v1/bff/dashboard), and bootstraps MongoDB Atlas connection." />
          <InfoCard icon={<Globe size={16} />} color="blue" title="vercel.json" desc="Rewrites rule: all /* routes map to the Vite build output so React Router handles client-side navigation without 404s on refresh." />
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
                ["Forms", "React Hook Form + Yup", "Minimal re-renders, schema validation"],
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
            { left: "sameSite", right: "lax — protects against CSRF" },
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
            { title: "Security v6.0 — Defense in Depth", desc: "Rate limiting (IP+Email keyed), NoSQL injection protection, password hardening (8–72 chars), pepper hashing with lazy migration, HttpOnly cookies, secure logout endpoint.", status: "NEW" },
            { title: "Premium Dark Email Templates", desc: "All transactional emails (OTP, Password Reset, Portfolio Contact) redesigned to match the CVify Pro dark theme — deep dark background, teal accents, premium branding.", status: "NEW" },
            { title: "Admin Panel Sidebar Fix", desc: "Admin users now see a persistent 'Admin Panel' link in the main sidebar. Admins inside the admin area see a 'Back to App' link for quick navigation.", status: "FIX" },
            { title: "AURA DARK Theme", desc: "Cosmic minimal theme engineered for tech professionals and startup founders.", status: "ACTIVE" },
            { title: "GitHub Intelligence Panel", desc: "Real-time GitHub DNA insights, repository highlights, and language synthesis.", status: "ACTIVE" },
            { title: "AI Job Matcher v1.0", desc: "Real-time JD analysis with missing keyword detection and strategy reports.", status: "ACTIVE" },
            { title: "Magic AI Import", desc: "Instant resume hydration from PDF/DOCX using deep semantic parsing.", status: "ACTIVE" },
            { title: "Intelligence Command Bar", desc: "Natural language resume optimization with Intent Mode.", status: "ACTIVE" },
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

      <div className="flex pt-16">
        {/* ── SIDEBAR (Desktop) ── */}
        <aside className="hidden lg:block w-72 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto border-r border-border-subtle p-4 space-y-6 glass bg-background/40">
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
              className="fixed left-0 top-16 w-72 h-[calc(100vh-64px)] z-40 overflow-y-auto border-r border-border-subtle p-4 space-y-6 bg-background lg:hidden"
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
