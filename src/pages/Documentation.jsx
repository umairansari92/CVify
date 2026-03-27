import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, Cpu, ShieldCheck, Zap, Target, Gem, ChevronRight, 
  FileText, Globe, ArrowLeft, Users, Sparkles, Eye,
  Brain, Layers, Briefcase, Rocket, Layout,
  Database, Star, Award, MessageSquare, Shield, Menu, X,
  BarChart3, GitBranch, TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";

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
      label: "Core Features",
      items: [
        { id: "ats", icon: <Target size={16} />, label: "ATS v4.0 Precision Engine" },
        { id: "cover-letter", icon: <MessageSquare size={16} />, label: "AI Cover Letters" },
        { id: "portfolio", icon: <Globe size={16} />, label: "Live Portfolio & SEO" },
        { id: "profile", icon: <Layout size={16} />, label: "User Profile & Dashboard" },
      ]
    },
    {
      label: "Intelligence",
      items: [
        { id: "engine", icon: <Brain size={16} />, label: "3-Layer ATS Engine" },
        { id: "architecture", icon: <Layers size={16} />, label: "System Architecture" },
        { id: "security", icon: <Shield size={16} />, label: "Security & Privacy" },
      ]
    },
    {
      label: "Business",
      items: [
        { id: "diamonds", icon: <Gem size={16} />, label: "Diamond Economy" },
        { id: "competitors", icon: <Award size={16} />, label: "Why We Stand Out" },
        { id: "recruiter", icon: <Briefcase size={16} />, label: "For Recruiters & HR" },
        { id: "universal", icon: <Users size={16} />, label: "Built for Everyone" },
      ]
    },
    {
      label: "Resources",
      items: [
        { id: "tips", icon: <Star size={16} />, label: "Pro Tips (90+ Score)" },
        { id: "faq", icon: <Book size={16} />, label: "FAQ" },
        { id: "roadmap", icon: <TrendingUp size={16} />, label: "Future Roadmap" },
        { id: "company", icon: <GitBranch size={16} />, label: "Company & Ownership" },
      ]
    },
  ];

  // ─── CONTENT SECTIONS ───
  const content = {
    overview: (
      <>
        <DocHeader title="Platform Overview" badge="Introduction" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-8">
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

    ats: (
      <>
        <DocHeader title="ATS v4.0 Precision Engine" badge="Core Feature" />
        <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
          CVify Pro's ATS Scanner is not a basic keyword checker — it's a <strong className="text-text-primary">3-Layer Intelligence Engine</strong> that audits your resume like a Fortune 500 hiring pipeline with 99.99% accuracy.
        </p>

        <SectionTitle>How to Scan</SectionTitle>
        <Steps items={[
          { step: "1", title: "Upload Resume", desc: "Go to ATS Scanner in your dashboard. Upload a PDF or DOCX (Max 5MB)." },
          { step: "2", title: "Paste Job Description", desc: "Paste the target JD. If left empty, the AI audits against general industry standards for your level." },
          { step: "3", title: "Select Experience Level", desc: "Choose Fresher (0-1 yr), Junior (1-2 yrs), Mid-Level (3-5 yrs), or Senior (5+ yrs)." },
          { step: "4", title: "Select Market Mode", desc: "Choose Standard, Pakistan HR, Freelance, or Remote — each adjusts scoring weights." },
          { step: "5", title: "Start Scan", desc: "Click \"Start ATS Scan\" (Costs 50 💎). Results appear in under 30 seconds." },
        ]} />

        <SectionTitle>What You Get</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<Sparkles size={16} />} color="blue" title="AI Verdict" desc="A one-line motivating summary of your resume's strengths and gaps." />
          <InfoCard icon={<BarChart3 size={16} />} color="purple" title="4-Dimension Score" desc="Formatting, Keywords, Quantification, Impact — each with WHY justification on hover." />
          <InfoCard icon={<Zap size={16} />} color="emerald" title="Strong Bullets ✅" desc="Your best resume lines highlighted with reasons why they're excellent." />
          <InfoCard icon={<FileText size={16} />} color="amber" title="Weak Bullets → Rewritten" desc="Your weakest lines with AI-rewritten versions using Google XYZ formula." />
          <InfoCard icon={<Target size={16} />} color="red" title="Keyword Gap Analyzer" desc="Missing skills with importance, reason, and exact placement advice." />
          <InfoCard icon={<Eye size={16} />} color="purple" title="Recruiter's 6-Second Impression" desc="What a recruiter would think in the first 6 seconds of seeing your resume." />
        </div>

        <SectionTitle>Context-Aware Intelligence</SectionTitle>
        <ComparisonTable items={[
          { left: "Fresher Missing AWS", right: "Marked as \"Growth Opportunity\" — not penalized" },
          { left: "Senior Missing AWS", right: "Marked as \"Critical Gap\" — heavily weighted" },
          { left: "No JD Provided", right: "AI audits against industry standards for your level" },
          { left: "JD Provided", right: "AI matches resume against specific role requirements" },
        ]} />

        <SectionTitle>Anti-Hallucination Guardrails</SectionTitle>
        <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
          <p className="text-text-secondary text-[13px] leading-relaxed">
            <strong className="text-amber-400">6 strict rules</strong> ensure accuracy: <strong>"Quote or Die"</strong> (every feedback references actual resume content), 
            <strong> "Keyword Source Lock"</strong> (missing keywords come only from the JD or standard databases), 
            <strong> "Honest Scoring"</strong> (no lazy 65-75 defaults), 
            <strong> "Balanced Feedback"</strong> (3 strengths + 3 improvements minimum), 
            <strong> "No Generic Advice"</strong> (exact keyword, section, and phrasing), and 
            <strong> "Real Bullet Quotes"</strong> (direct copy-paste from resume, never paraphrased).
          </p>
        </div>
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
        <SectionTitle>6 Premium Themes</SectionTitle>
        <p className="text-text-secondary text-[13px] leading-relaxed">
          CVify Classic, Midnight Dev, Corporate Gold, Creative Sunset, Slate Minimalist, and Emerald Leader — with customizable accent colors, card styles, and typography.
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

    security: (
      <>
        <DocHeader title="Security, Compliance & Privacy" badge="Technical" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InfoCard icon={<Shield size={16} />} color="emerald" title="Argon2 Hashing" desc="Winner of Password Hashing Competition. Resistant to GPU attacks — far superior to MD5/SHA-1." />
          <InfoCard icon={<ShieldCheck size={16} />} color="blue" title="JWT + HttpOnly Cookies" desc="Signed, verified tokens. HttpOnly cookies prevent XSS session theft." />
          <InfoCard icon={<Brain size={16} />} color="purple" title="Data Encryption" desc="Encrypted at rest in MongoDB Atlas. AI processing via Gemini over encrypted HTTPS. Zero retention for training." />
          <InfoCard icon={<FileText size={16} />} color="amber" title="File Security" desc="Resume uploads processed in memory (multer) — never stored on disk. Instant processing, immediate disposal." />
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
          { left: "Deep ATS Audit (v4.0)", right: "50 💎" },
          { left: "AI Cover Letter", right: "20 💎" },
          { left: "Extra Storage Slots", right: "30 💎" },
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
              <p className="text-text-secondary text-[12px] font-medium leading-relaxed">{item.desc}</p>
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
          <p className="text-text-secondary text-[14px] leading-relaxed max-w-2xl mx-auto">
            Giants build platforms. We build <strong className="text-primary">precision</strong>. They give you templates — we give you 
            intelligence. They count keywords — we understand careers. If you want a pretty PDF, use Canva. 
            If you want to <strong className="text-primary">actually get hired</strong>, use CVify Pro.
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
        <DocHeader title="Future Roadmap" badge="Coming Soon" />
        <div className="space-y-3">
          {[
            { title: "AI Job Matcher", desc: "Upload resume → get matched jobs from LinkedIn, Indeed, and Glassdoor with compatibility scores.", status: "Q3 2026" },
            { title: "Verified Skill Badges", desc: "Blockchain-verified certifications and proficiency badges that recruiters can trust.", status: "Q4 2026" },
            { title: "Recruiter Hot-Lead Notifications", desc: "Recruiters get notified when a high-match candidate updates their profile.", status: "Q4 2026" },
            { title: "Skill Alignment Roadmap", desc: "AI generates a personalized learning path to close skill gaps for target roles.", status: "2027" },
            { title: "Multi-Language Resumes", desc: "Generate resumes in English, Urdu, Arabic, and Dutch for regional job markets.", status: "2027" },
          ].map((item, i) => (
            <div key={i} className="p-5 glass rounded-2xl border border-white/5 flex justify-between items-start gap-4">
              <div>
                <p className="font-black text-text-primary text-sm">{item.title}</p>
                <p className="text-text-secondary text-[12px] font-medium leading-relaxed">{item.desc}</p>
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full flex-shrink-0">{item.status}</span>
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
      <nav className="fixed top-0 left-0 w-full z-50 p-4 backdrop-blur-xl border-b border-border-subtle bg-background/80 flex justify-between items-center px-4 lg:px-8">
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
        <aside className="hidden lg:block w-72 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto border-r border-border-subtle p-4 space-y-6 bg-background">
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
