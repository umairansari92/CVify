import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, Cpu, ShieldCheck, Zap, Target, Gem, ChevronRight, 
  FileText, Globe, ArrowLeft, Users, Sparkles, Eye, Palette,
  Brain, Layers, BarChart3, Briefcase, Heart, Lock, Rocket,
  CheckCircle2, Star, Award, MessageSquare, Download, Layout,
  Database, Server, Code2, Smartphone, TrendingUp, Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";

const Documentation = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("guide");
  const [activeSection, setActiveSection] = useState(null);

  const sections = {
    guide: [
      // ─── GETTING STARTED ───
      {
        id: "start",
        title: "Getting Started (3-Min Setup)",
        icon: <Rocket size={20} />,
        content: [
          { type: "steps", items: [
            { step: "1", title: "Create Account", desc: "Click \"Signup\" and verify your professional email. You'll receive 100 free diamonds to start." },
            { step: "2", title: "Complete Your Profile", desc: "Add your name, headline, professional summary, work experience, education, and skills in the Profile Settings." },
            { step: "3", title: "Sync GitHub (Optional)", desc: "Connect your GitHub profile URL to automatically pull repo counts, languages, and contribution stats into your portfolio." },
            { step: "4", title: "Go Live!", desc: "Your Public Portfolio is instantly live at cvifypro.vercel.app/p/your-username — share it with recruiters!" },
          ]},
        ]
      },
      // ─── ATS SCANNER ───
      {
        id: "ats",
        title: "ATS Resume Scanner (v4.0 Precision Engine)",
        icon: <Target size={20} />,
        content: [
          { type: "text", value: "CVify Pro's ATS Scanner is not a basic keyword checker — it's a 3-Layer Intelligence Engine that audits your resume like a Fortune 500 hiring pipeline." },
          { type: "heading", value: "How to Scan" },
          { type: "steps", items: [
            { step: "1", title: "Upload Resume", desc: "Go to ATS Scanner in your dashboard. Upload a PDF or DOCX (Max 5MB)." },
            { step: "2", title: "Paste Job Description", desc: "Paste the target JD. If left empty, the AI will audit against general industry standards for your level." },
            { step: "3", title: "Select Experience Level", desc: "Choose Fresher (0-1 yr), Junior (1-2 yrs), Mid-Level (3-5 yrs), or Senior (5+ yrs). This changes how the AI scores you." },
            { step: "4", title: "Select Market Mode", desc: "Choose Standard, Pakistan HR, Freelance, or Remote — each adjusts scoring weights." },
            { step: "5", title: "Start Scan", desc: "Click \"Start ATS Scan\" (Costs 50 diamonds). Results appear in under 30 seconds." },
          ]},
          { type: "heading", value: "What You Get" },
          { type: "features", items: [
            { title: "AI Verdict", desc: "A one-line motivating summary of your resume's strengths and gaps." },
            { title: "4-Dimension Score", desc: "Formatting, Keywords, Quantification, and Impact — each with a justification tooltip explaining WHY that score was given." },
            { title: "Strong Bullets ✅", desc: "Your best resume lines highlighted with reasons why they're excellent." },
            { title: "Weak Bullets → Rewritten 🔄", desc: "Your weakest lines identified with AI-rewritten versions using the Google XYZ formula — ready to copy-paste." },
            { title: "Keyword Gap Analyzer", desc: "Missing skills with importance level, reason, and exact placement advice (which section, which bullet, sample phrasing)." },
            { title: "Recruiter's 6-Second Impression", desc: "What a recruiter would think in the first 6 seconds of seeing your resume." },
          ]},
          { type: "heading", value: "Context-Aware Intelligence" },
          { type: "text", value: "Unlike generic ATS tools, CVify Pro adapts to YOUR career stage:" },
          { type: "comparison", items: [
            { left: "Fresher Missing AWS", right: "Marked as \"Growth Opportunity\" — not penalized" },
            { left: "Senior Missing AWS", right: "Marked as \"Critical Gap\" — heavily weighted" },
            { left: "No JD Provided", right: "AI audits against industry standards for your level" },
            { left: "JD Provided", right: "AI matches resume against specific role requirements" },
          ]},
          { type: "heading", value: "Anti-Hallucination Guardrails" },
          { type: "text", value: "Our AI follows 6 strict rules to ensure accuracy: \"Quote or Die\" (every feedback references actual resume content), \"Keyword Source Lock\" (missing keywords come only from the JD or standard databases), and \"Honest Scoring\" (no lazy 65-75 defaults — if your resume is 90-worthy, you get 90)." },
        ]
      },
      // ─── COVER LETTER ───
      {
        id: "cover-letter",
        title: "AI Cover Letter Generator",
        icon: <MessageSquare size={20} />,
        content: [
          { type: "text", value: "Generate personalized, role-specific cover letters in seconds. The AI performs a \"Handshake\" between your resume achievements and the company's mission." },
          { type: "heading", value: "3 Personality Styles" },
          { type: "features", items: [
            { title: "Professional", desc: "Formal, corporate tone for enterprise roles. Perfect for banking, consulting, and government positions." },
            { title: "Creative", desc: "Bold, engaging tone for startups, marketing, and design roles. Shows personality while staying professional." },
            { title: "Enthusiastic", desc: "High-energy, passionate tone for roles where culture fit matters. Great for tech startups and creative agencies." },
          ]},
          { type: "heading", value: "How It Works" },
          { type: "steps", items: [
            { step: "1", title: "Select Style", desc: "Choose Professional, Creative, or Enthusiastic." },
            { step: "2", title: "Paste JD", desc: "The AI extracts the company name, role, and key requirements automatically." },
            { step: "3", title: "Generate", desc: "In 10-15 seconds, your tailored cover letter is ready. Edit, copy, or download." },
          ]},
          { type: "text", value: "Cost: 20 💎 per generation. Each letter is unique and tailored to the specific role." },
        ]
      },
      // ─── PORTFOLIO ───
      {
        id: "portfolio",
        title: "Live Portfolio (No-Code Personal Brand)",
        icon: <Globe size={20} />,
        content: [
          { type: "text", value: "Your portfolio is a zero-effort personal brand. Update your profile in the dashboard, and the world sees it live — no HTML, no hosting, no code." },
          { type: "heading", value: "What's Included" },
          { type: "features", items: [
            { title: "Professional Header", desc: "Name, headline, bio, and profile picture — premium branding with shine-effect logo." },
            { title: "Work Experience", desc: "Timeline-style display with structured responsibilities and achievements." },
            { title: "Skills & Proof Tags", desc: "Categorized skills with proficiency bars and auto-generated proof badges (e.g., \"Used in 5+ Projects\")." },
            { title: "Project Showcase", desc: "Cyberpunk-inspired grid with images, tech stacks, live links, and detailed descriptions." },
            { title: "GitHub Integration", desc: "Live repo count, language distribution, and contribution stats pulled via authenticated proxy." },
            { title: "Testimonials", desc: "Ratings and review quotes from colleagues or clients for social proof." },
            { title: "ATS Score Badge", desc: "Your latest ATS audit score displayed prominently for recruiter trust." },
            { title: "Contact Actions", desc: "One-click WhatsApp, Email, LinkedIn, and Resume Download buttons." },
          ]},
          { type: "heading", value: "SEO & Discoverability" },
          { type: "text", value: "Every profile has dynamic meta tags (og:title, twitter:image) and JSON-LD structured data for Google Knowledge Graph integration. Your profile is SEO-optimized out of the box." },
          { type: "heading", value: "Theming" },
          { type: "text", value: "6 premium themes (CVify Classic, Midnight Dev, Corporate Gold, Creative Sunset, Slate Minimalist, Emerald Leader) with customizable accent colors, card styles, and typography." },
        ]
      },
      // ─── USER PROFILE ───
      {
        id: "profile",
        title: "User Profile & Dashboard",
        icon: <Layout size={20} />,
        content: [
          { type: "text", value: "Your dashboard is the command center for your entire career brand. Every change you make here is instantly reflected on your live portfolio." },
          { type: "heading", value: "Editable Sections" },
          { type: "features", items: [
            { title: "Core Info", desc: "Name, headline, professional summary, location, contact details." },
            { title: "Experience", desc: "Add multiple positions with structured bullet points (responsibilities array). Each bullet can be individually edited." },
            { title: "Education", desc: "Degrees, certifications, institutions with date ranges." },
            { title: "Skills", desc: "Categorized (Technical, Soft Skills, Tools) with percentage-based proficiency sliders." },
            { title: "Projects", desc: "Add/edit/delete showcase projects with images, descriptions, tech stacks, and live/source links." },
            { title: "Clients & Testimonials", desc: "Add client logos and testimonial quotes with ratings for social proof." },
          ]},
          { type: "heading", value: "HUD Analytics" },
          { type: "text", value: "Real-time intelligence bar showing profile views, contact clicks, and resume downloads. Draggable and responsive to your active theme." },
        ]
      },
      // ─── DIAMOND ECONOMY ───
      {
        id: "diamonds",
        title: "The Diamond Economy 💎",
        icon: <Gem size={20} />,
        content: [
          { type: "text", value: "Diamonds are the premium currency that powers CVify Pro's AI features. We charge diamonds post-success — you're never billed for failed requests." },
          { type: "heading", value: "Pricing" },
          { type: "comparison", items: [
            { left: "Deep ATS Audit", right: "50 💎" },
            { left: "AI Cover Letter", right: "20 💎" },
            { left: "Extra Storage Slots", right: "30 💎" },
            { left: "Signup Bonus", right: "100 💎 free" },
          ]},
          { type: "heading", value: "Earning Diamonds" },
          { type: "text", value: "Earn diamonds by referring colleagues, contributing to the community, or during special promotional events. Premium diamond packages will be available in future updates." },
        ]
      },
      // ─── UNIVERSAL AGENCY ───
      {
        id: "universal",
        title: "Built for Everyone (Peon to CEO)",
        icon: <Users size={20} />,
        content: [
          { type: "text", value: "CVify Pro is NOT just for developers. We've democratized elite career branding for every professional level and field." },
          { type: "heading", value: "Who Is This For?" },
          { type: "features", items: [
            { title: "Tech Professionals", desc: "Developers, Data Scientists, DevOps Engineers, UI/UX Designers — full GitHub integration and tech-stack optimization." },
            { title: "Corporate Leaders", desc: "CEOs, Managers, Directors, Bankers — leadership-focused scoring with quantified business impact." },
            { title: "Service Industry", desc: "Teachers, Receptionists, Office Assistants — the AI focuses on tenure, responsibilities, and soft skills." },
            { title: "Creatives", desc: "Graphic Designers, Writers, Marketers — portfolio-first approach with visual showcase integration." },
            { title: "Fresh Graduates", desc: "Students with zero experience — the AI adapts scoring to emphasize academic projects and foundational skills." },
          ]},
          { type: "heading", value: "How It Adapts" },
          { type: "text", value: "The Experience Level selector (Fresher → Senior) dynamically changes AI scoring weights, coaching tone, and keyword expectations. A fresher won't be penalized for missing enterprise tech — but a senior will." },
        ]
      },
      // ─── FAQ ───
      {
        id: "faq",
        title: "Frequently Asked Questions",
        icon: <Book size={20} />,
        content: [
          { type: "faq", items: [
            { q: "My ATS score is low. What should I do?", a: "Read the \"Missing Keywords\" section carefully. Each keyword has an EXACT placement strategy — follow it. Then check \"Weak Bullets\" for before/after improvements you can copy-paste directly." },
            { q: "Is my data safe?", a: "Absolutely. We use Argon2 password hashing (bank-grade), JWT with HttpOnly cookies, and all AI processing happens over encrypted HTTPS with zero data retention for training." },
            { q: "Can I use this for non-tech jobs?", a: "Yes! CVify Pro works for teachers, bankers, receptionists, marketers — anyone. The AI adapts to your field automatically based on your resume content." },
            { q: "Why does the scan cost diamonds?", a: "Each scan uses advanced AI (Google Gemini 2.5 Flash) with a 3-layer analysis pipeline. Diamonds ensure fair usage while keeping the platform sustainable." },
            { q: "Can recruiters see my portfolio?", a: "Yes — your live portfolio at cvifypro.vercel.app/p/username is public. You control what's visible through your dashboard settings." },
            { q: "How is this different from Canva/Zety/Rezi?", a: "Most resume builders focus on \"looks\" but fail ATS parsing. CVify Pro is the only platform that combines an AI ATS Auditor, Context-Aware Scoring, Live Portfolio, Cover Letter AI, and Recruiter Conversion tools — all in one ecosystem." },
            { q: "What file formats are supported?", a: "Upload PDF or DOCX (max 5MB). PDF is recommended for layout consistency. Your portfolio and ATS results are generated independently." },
            { q: "Do I need technical knowledge?", a: "Zero. The platform is designed as a step-by-step career coach. Even if you've never built a website, your portfolio is auto-generated from your profile data." },
          ]},
        ]
      },
      // ─── PRO TIPS ───
      {
        id: "tips",
        title: "Pro Tips for a 90+ ATS Score",
        icon: <Star size={20} />,
        content: [
          { type: "features", items: [
            { title: "Quantify Everything", desc: "Replace 'Managed a team' with 'Led a cross-functional team of 8, delivering 3 projects 15% under budget.' Numbers are ATS gold." },
            { title: "Use Google XYZ Formula", desc: "'Accomplished [X] as measured by [Y], by doing [Z].' This is how Google engineers write their resumes." },
            { title: "Match the JD Language", desc: "If the JD says 'Docker containerization,' don't write 'used containers.' Mirror exact terminology." },
            { title: "Section Headers Matter", desc: "Use standard headers: Work Experience, Education, Skills, Projects. Creative headers confuse ATS parsers." },
            { title: "Keywords in Context", desc: "Don't list keywords at the bottom. Integrate them naturally into your project descriptions and experience bullets." },
            { title: "PDF vs DOCX", desc: "Both are supported. PDF preserves layout. DOCX is preferred by some enterprise ATS systems. Test both modes." },
          ]},
        ]
      },
    ],
    technical: [
      // ─── ARCHITECTURE ───
      {
        id: "architecture",
        title: "System Architecture",
        icon: <Layers size={20} />,
        content: [
          { type: "text", value: "CVify Pro is a Career Intelligence Ecosystem built on a modern MERN stack with AI integration. The architecture prioritizes Aesthetics, Agency, and Authority." },
          { type: "heading", value: "Tech Stack Blueprint" },
          { type: "comparison", items: [
            { left: "Runtime", right: "Node.js (Event-Driven, Non-Blocking I/O)" },
            { left: "Framework", right: "Express.js (REST API)" },
            { left: "Database", right: "MongoDB Atlas (NoSQL — no joins, one-query fetches)" },
            { left: "Frontend", right: "React 18 + Vite (HMR) + Redux Toolkit" },
            { left: "Intelligence", right: "Google Gemini 2.5 Flash (Generative AI SDK)" },
            { left: "Styling", right: "Tailwind CSS 4.0 + Vanilla CSS (Glassmorphism)" },
            { left: "PDF Engine", right: "@react-pdf/renderer + html2canvas-pro" },
            { left: "Landing Page", right: "Next.js (SSR for SEO)" },
            { left: "Deployment", right: "Vercel (Frontend) + Cloud VPS (Backend)" },
          ]},
          { type: "heading", value: "Why This Stack?" },
          { type: "features", items: [
            { title: "Node.js over Python", desc: "CVify is I/O-bound (MongoDB + Gemini API calls). Node's event loop handles 4x more concurrent requests than sync Python servers. Plus: unified JS on both ends." },
            { title: "MongoDB over SQL", desc: "A resume is a nested tree (Experience → Bullets → Tools). SQL would need 10+ joins. MongoDB fetches it in one query." },
            { title: "Tailwind 4.0", desc: "Zero-bloat CSS — only ships classes you use. Enables Glassmorphism and Cyberpunk effects with utility classes." },
            { title: "Redux Toolkit", desc: "Essential for complex draft workflows. If user loses connection mid-edit, Redux ensures data stays predictable." },
          ]},
        ]
      },
      // ─── ATS ENGINE ───
      {
        id: "ats-engine",
        title: "The 3-Layer ATS Intelligence Engine",
        icon: <Brain size={20} />,
        content: [
          { type: "text", value: "Our ATS is built on a \"Layered Defense\" strategy — 3 independent analysis layers that cross-validate each other for 99.99% accuracy." },
          { type: "heading", value: "Layer 1: Structural Parsing (Regex/NLP)" },
          { type: "text", value: "Server-side regex scans for section headers, date formats, contact info, and formatting standards. Penalizes non-standard patterns that break traditional ATS parsers." },
          { type: "heading", value: "Layer 2: NLP Keyword Engine (Compromise.js)" },
          { type: "text", value: "Extracts nouns from the JD, cross-references with a synonyms database (e.g., 'React' matches 'React.js' and 'Frontend Dev'). Quantification Check scans every bullet for numbers, currency, and volume metrics." },
          { type: "heading", value: "Layer 3: Generative AI Deep Audit (Gemini 2.5)" },
          { type: "text", value: "The final contextual analysis. Evaluates career-stage fit, impact quality, and provides the coaching layer with anti-hallucination guardrails." },
          { type: "heading", value: "Hybrid Score Calibration" },
          { type: "text", value: "Final scores = AI Score × 0.6 + Server NLP Score × 0.4. This prevents AI from randomly inflating or deflating scores. The hybrid approach ensures consistency across scans." },
          { type: "heading", value: "Dynamic Scoring Weights" },
          { type: "comparison", items: [
            { left: "Fresher", right: "Keywords 35% | Formatting 30% | Quantification 10% | Impact 10% | X-Factor 15%" },
            { left: "Junior", right: "Keywords 30% | Formatting 25% | Quantification 15% | Impact 15% | X-Factor 15%" },
            { left: "Mid-Level", right: "Keywords 25% | Formatting 20% | Quantification 25% | Impact 20% | X-Factor 10%" },
            { left: "Senior", right: "Keywords 20% | Formatting 15% | Quantification 30% | Impact 30% | X-Factor 5%" },
          ]},
        ]
      },
      // ─── AI CONTENT ───
      {
        id: "ai-content",
        title: "AI Content Generation",
        icon: <Sparkles size={20} />,
        content: [
          { type: "heading", value: "Bullet Point Rewriting (Google XYZ)" },
          { type: "text", value: "Transforms generic bullets into achievement statements: \"Accomplished [X] as measured by [Y], by doing [Z].\" Forces AI to convert task descriptions into metric-driven outcomes." },
          { type: "heading", value: "Cover Letter Personalities" },
          { type: "text", value: "The AI injects a \"Career Coach\" persona that performs a Handshake between the resume's past achievements and the JD's company mission. Available in Professional, Creative, and Enthusiastic styles." },
          { type: "heading", value: "Career Strategist (Coming Soon)" },
          { type: "text", value: "Full resume analysis for competitive gaps, narrative strength scoring, and recommended layout strategies (chronological/functional/hybrid)." },
        ]
      },
      // ─── DATA MODELS ───
      {
        id: "data",
        title: "Database Schema & Models",
        icon: <Database size={20} />,
        content: [
          { type: "heading", value: "User Model" },
          { type: "text", value: "The single source of truth for professional identity. Supports structured experience (responsibilities arrays), categorized skills with proficiency, testimonials with ratings, client logos, theme settings, and HUD analytics (profileViews, contactClicks, resumeDownloads)." },
          { type: "heading", value: "Resume Model" },
          { type: "text", value: "Handles versioned, AI-optimized copies. parentResume reference allows branching different roles from a master copy. Stores atsScore directly for instant portfolio retrieval." },
          { type: "heading", value: "ATSScan Model" },
          { type: "text", value: "Persists every scan with scores, feedback (positives, improvements, missingKeywords as Mixed type), marketMode, experienceLevel, and timestamps for historical analysis." },
        ]
      },
      // ─── SECURITY ───
      {
        id: "security",
        title: "Security, Compliance & Privacy",
        icon: <Shield size={20} />,
        content: [
          { type: "text", value: "Bank-grade security stack protecting all user data:" },
          { type: "features", items: [
            { title: "Argon2 Hashing", desc: "Winner of the Password Hashing Competition. Resistant to GPU attacks and side-channel threats — far superior to MD5 or SHA-1." },
            { title: "JWT + HttpOnly Cookies", desc: "Signed, verified tokens for every request. HttpOnly cookies prevent XSS attacks from stealing sessions." },
            { title: "Data Encryption", desc: "All data encrypted at rest in MongoDB Atlas. AI processing via Gemini happens over encrypted HTTPS with zero data retention for model training." },
            { title: "File Security", desc: "Resume uploads processed in memory (multer) — never stored on disk. Instant AI processing and immediate disposal." },
          ]},
        ]
      },
      // ─── MARKET MODES ───
      {
        id: "markets",
        title: "Market Mode Specializations",
        icon: <Globe size={20} />,
        content: [
          { type: "features", items: [
            { title: "Standard", desc: "Balanced global scoring — keywords, formatting, and impact equally weighted." },
            { title: "Pakistan HR", desc: "Prioritizes educational background, structured certifications, and formal experience common in the local market." },
            { title: "Freelance", desc: "Focuses on outcomes, tools mastery, and portfolio diversity over long-term tenure." },
            { title: "Remote", desc: "Scans for asynchronous communication markers, remote-collaboration tools (Slack, Notion, Jira), and self-management indicators." },
          ]},
        ]
      },
      // ─── WHAT MAKES US DIFFERENT ───
      {
        id: "differentiators",
        title: "What Makes CVify Pro Different",
        icon: <Award size={20} />,
        content: [
          { type: "text", value: "CVify Pro isn't just another resume builder. Here's how it compares to the competition:" },
          { type: "comparison", items: [
            { left: "Canva/Zety", right: "Pretty templates that FAIL ATS parsing. 75% rejection before human eyes." },
            { left: "Rezi/Jobscan", right: "Basic keyword matching. No context-awareness, no experience-level adaptation." },
            { left: "CVify Pro", right: "3-Layer AI Audit + Context-Aware Scoring + Live Portfolio + Cover Letter AI + Recruiter HUD — all in one ecosystem." },
          ]},
          { type: "heading", value: "Our Unique Advantages" },
          { type: "features", items: [
            { title: "Context-Aware Scoring", desc: "Only platform that adapts scoring based on experience level AND market mode simultaneously." },
            { title: "Anti-Hallucination Engine", desc: "6 strict rules ensure AI only references actual resume content. No invented feedback." },
            { title: "Hybrid Calibration", desc: "AI + Server NLP scores are cross-validated for consistency. Same resume = same score every time." },
            { title: "Live Portfolio Ecosystem", desc: "One-click public portfolio with SEO, GitHub integration, and recruiter conversion optimization." },
            { title: "Before→After Bullets", desc: "Not just 'what's wrong' — we rewrite your weakest bullets using the Google XYZ formula." },
            { title: "Universal Agency", desc: "Works for Peons, Teachers, Bankers, CEOs — not just tech professionals." },
          ]},
        ]
      },
      // ─── RECRUITER ONE-PAGER ───
      {
        id: "recruiter",
        title: "For Recruiters & HR Teams",
        icon: <Briefcase size={20} />,
        content: [
          { type: "text", value: "CVify Pro ensures candidates are \"Recruiter-Ready\" from the first click. Here's what it means for your hiring pipeline:" },
          { type: "features", items: [
            { title: "Verified Skills", desc: "Skills are backed by live project data and GitHub metrics. No more guesswork." },
            { title: "ATS-Friendly Output", desc: "Resumes generated in standard formats your internal ATS loves — guaranteed 95%+ parse rate." },
            { title: "Contextual Fit", desc: "Candidates use AI to match their history against your specific JD, saving you screening time." },
            { title: "10-Second Discovery", desc: "Recruiter can see Total Repos, Projects, ATS Score, and Contact options in one HUD-style dashboard." },
          ]},
          { type: "heading", value: "Psychological Conversion Triggers" },
          { type: "text", value: "We've integrated specific UX triggers to convert profile visitors into interview schedulers: trust signals (verified ATS badges), proof tags (auto-generated 'Top Rated' labels), and low-friction contact (one-click WhatsApp/Email/Download)." },
        ]
      },
      // ─── COMPANY PROFILE ───
      {
        id: "company",
        title: "Company & Ownership",
        icon: <Award size={20} />,
        content: [
          { type: "comparison", items: [
            { left: "Product", right: "CVify Pro (Career Intelligence & Portfolio Engine)" },
            { left: "Parent Brand", right: "CVify Intelligence Systems" },
            { left: "Lead Architect", right: "Umair Ansari (Full-Stack Developer & AI Engineer)" },
            { left: "LinkedIn", right: "linkedin.com/company/cvifypro" },
            { left: "Core Vision", right: "Democratize elite career branding globally — no talent lost in the ATS void." },
          ]},
        ]
      },
    ]
  };

  // ─── RENDERERS ───
  const renderContent = (content) => content.map((block, i) => {
    switch (block.type) {
      case "text":
        return <p key={i} className="text-text-secondary font-medium leading-relaxed text-[15px]">{block.value}</p>;
      case "heading":
        return <h4 key={i} className="text-lg font-black text-text-primary tracking-tight pt-4 flex items-center gap-2"><ChevronRight size={16} className="text-primary" />{block.value}</h4>;
      case "steps":
        return (
          <div key={i} className="space-y-3">
            {block.items.map((s, j) => (
              <div key={j} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-xs flex-shrink-0 mt-0.5">{s.step}</div>
                <div><p className="font-black text-text-primary text-sm">{s.title}</p><p className="text-text-secondary text-[13px] font-medium leading-relaxed">{s.desc}</p></div>
              </div>
            ))}
          </div>
        );
      case "features":
        return (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {block.items.map((f, j) => (
              <div key={j} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                <p className="font-black text-text-primary text-sm mb-1">{f.title}</p>
                <p className="text-text-secondary text-[12px] font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        );
      case "comparison":
        return (
          <div key={i} className="space-y-2">
            {block.items.map((c, j) => (
              <div key={j} className="flex items-stretch gap-3 text-[13px]">
                <div className="w-1/3 p-3 bg-white/[0.03] rounded-xl font-black text-text-primary flex items-center">{c.left}</div>
                <div className="flex items-center text-primary font-bold">→</div>
                <div className="flex-1 p-3 bg-primary/5 rounded-xl font-medium text-text-secondary border border-primary/10 flex items-center">{c.right}</div>
              </div>
            ))}
          </div>
        );
      case "faq":
        return (
          <div key={i} className="space-y-4">
            {block.items.map((f, j) => (
              <div key={j} className="p-5 bg-white/[0.02] rounded-2xl border border-white/5 space-y-2">
                <p className="font-black text-primary text-sm">Q: {f.q}</p>
                <p className="text-text-secondary text-[13px] font-medium leading-relaxed">A: {f.a}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  });

  return (
    <div className="min-h-screen bg-background text-text-main selection:bg-primary/30 selection:text-white">
      {/* ── HEADER ── */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 backdrop-blur-xl border-b border-border-subtle flex justify-between items-center lg:px-20 bg-background/80">
        <div className="flex items-center gap-4 md:gap-10">
          <button onClick={() => navigate(-1)} className="p-2 md:p-3 hover:bg-white/5 rounded-full transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <Logo className="w-32 md:w-40" />
        </div>
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={() => setActiveTab("guide")}
            className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === "guide" ? "bg-primary text-white shadow-glow" : "bg-white/5 hover:bg-white/10"}`}
          >
            User Guide
          </button>
          <button 
            onClick={() => setActiveTab("technical")}
            className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === "technical" ? "bg-primary text-white shadow-glow" : "bg-white/5 hover:bg-white/10"}`}
          >
            Technical Specs
          </button>
        </div>
      </nav>

      <main className="pt-28 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto space-y-16">
        {/* ── HERO ── */}
        <section className="text-center space-y-6 py-6 md:py-10">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-7xl font-black italic tracking-tighter"
          >
            CVify Pro <span className="text-primary">Intelligence</span> Docs
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-text-muted font-medium text-base md:text-lg leading-relaxed"
          >
            The complete guide to the world's most intelligent ATS Resume Scanner, AI Cover Letter Generator, and No-Code Portfolio Builder. Built for every professional — from Peon to CEO.
          </motion.p>
        </section>

        {/* ── CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-28 h-fit">
            <div className="p-6 glass rounded-[2rem] border border-white/5 space-y-4">
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
                {activeTab === "guide" ? "User Guide" : "Technical Specs"} — {sections[activeTab].length} sections
              </h4>
              <div className="space-y-1">
                {sections[activeTab].map(s => (
                  <a 
                    key={s.id} 
                    href={`#${s.id}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/5 text-[11px] font-bold text-text-muted hover:text-text-primary transition-all group"
                  >
                    <span className="text-primary opacity-60 group-hover:opacity-100 transition-opacity">{s.icon}</span>
                    <span className="truncate">{s.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-9 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {sections[activeTab].map((section) => (
                  <div 
                    id={section.id} 
                    key={section.id}
                    className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 hover:border-primary/20 transition-all space-y-6 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <h2 className="text-xl md:text-2xl font-black tracking-tight">{section.title}</h2>
                    </div>

                    <div className="space-y-4">
                      {renderContent(section.content)}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="text-center py-16 bg-primary/5 rounded-[3rem] border border-primary/10 space-y-6 px-8">
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tight">Ready to dominate the ATS?</h2>
          <p className="text-text-muted font-bold opacity-60 uppercase tracking-widest text-xs">Join professionals winning with CVify Pro's AI Intelligence</p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="px-12 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-premium hover:scale-105 active:scale-95 transition-all text-sm"
          >
            Start Building Now
          </button>
        </section>
      </main>

      <footer className="py-10 text-center border-t border-border-subtle opacity-40">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">CVify Intelligence Systems &copy; 2026</p>
      </footer>
    </div>
  );
};

export default Documentation;
