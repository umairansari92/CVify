import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, 
  Cpu, 
  ShieldCheck, 
  UserCircle, 
  Zap, 
  Target, 
  Gem, 
  ChevronRight, 
  FileText, 
  Globe, 
  ArrowLeft,
  Search,
  CheckCircle2,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";

const Documentation = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("guide");

  const sections = {
    guide: [
      {
        id: "start",
        title: "Getting Started (3-Min Setup)",
        icon: <Zap size={20} />,
        content: `
          1. **Create Account**: Click "Signup" and verify your professional email.
          2. **Update Core Profile**: Add your name, headline, and bio in the Profile Settings.
          3. **Sync GitHub**: Connect your GitHub URL to automatically highlight your project metrics.
          4. **Go Live**: Your Public Portfolio is instantly live at cvifypro.app/p/your-username.
        `
      },
      {
        id: "ats",
        title: "Scanning Your Resume",
        icon: <Target size={20} />,
        content: `
          - **Step 1**: Go to the "ATS Scanner" tab in your dashboard.
          - **Step 2**: Upload a PDF or DOCX file (Max 5MB).
          - **Step 3**: Paste the target Job Description (JD).
          - **Step 4**: Select your market mode (Standard, Remote, Freelance, or Pakistan HR).
          - **Step 5**: Click "Start Scan" (Costs 50 Diamonds).
        `
      },
      {
        id: "diamonds",
        title: "The Diamond Economy",
        icon: <Gem size={20} />,
        content: `
          - **Earning**: Get diamonds by referring colleagues or during special events.
          - **Spending**:
            - ATS Audit: 50 💎
            - AI Cover Letter: 20 💎
            - Premium Templates: Unlimited with Active Profile.
        `
      },
      {
        id: "universal",
        title: "Universal Agency (From Peon to CEO)",
        icon: <Users size={20} />,
        content: `
          CVify Pro is NOT just for techies. It is designed for:
          - **Tech Professionals**: Devs, Data Scientists, Architects.
          - **Corporate Leaders**: CEOs, Managers, Bankers.
          - **Service Industry**: Teachers, Receptionists, peons.
          - **Creatives**: Designers, Writers, Marketers.
          *The AI adapts its scoring and tone based on your specific field automatically.*
        `
      },
      {
        id: "faq",
        title: "Frequently Asked Questions (FAQ)",
        icon: <Book size={20} />,
        content: `
          - **Q: My ATS score is low, what should I do?**
            A: Read the "Missing Keywords" section in your audit. Use the suggested "Action Strategy" to insert those skills into your experience bullets.
          - **Q: Is my data safe?**
            A: Yes. Your resumes are only visible to you unless you explicitly toggle the "Public" switch in your dashboard.
          - **Q: Can I use this for non-tech jobs?**
            A: Absolutely! Our AI is trained on diverse industries including Healthcare, Banking, and Teaching.
        `
      },
      {
        id: "tips",
        title: "Pro Tips for a 90+ Score",
        icon: <Zap size={20} />,
        content: `
          - **Quantify Everything**: Use numbers ($ saved, % growth, team size).
          - **Structure Matters**: Use clean headers like "Work Experience" and "Education".
          - **Keywords Placement**: Don't just list keywords at the bottom; integrate them into your project descriptions.
          - **PDF vs DOCX**: Both are supported, but PDF is recommended for layout consistency.
        `
      }
    ],
    technical: [
      {
        id: "audit-logic",
        title: "The 3-Layer ATS Audit",
        icon: <Cpu size={20} />,
        content: `
          - **Layer 1: Structural Audit**: Checks for parsing blockers, standard headers, and date formats.
          - **Layer 2: NLP Keyword Match**: Uses Natural Language Processing to find keyword variations and synonyms.
          - **Layer 3: AI Deep Audit**: Gemini 2.5 Flash analyzes context, impact, and "X-Factor" quantified bullets.
        `
      },
      {
        id: "ai-formula",
        title: "Google 'XYZ' Optimization",
        icon: <FileText size={20} />,
        content: `
          Our AI Rewriter follows the elite Google formula:
          "Accomplished [X] as measured by [Y], by doing [Z]."
          This ensures every bullet point is high-impact and results-oriented.
        `
      },
      {
        id: "security",
        title: "Security & Compliance",
        icon: <ShieldCheck size={20} />,
        content: `
          - **Authentication**: Argon2 hashing for bank-grade security.
          - **Integrity**: JWT with HttpOnly cookies for session protection.
          - **Encryption**: All data is encrypted over HTTPS/TLS 1.3.
        `
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-text-main selection:bg-primary/30 selection:text-white">
      {/* ── HEADER ── */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 backdrop-blur-xl border-b border-border-subtle flex justify-between items-center lg:px-20">
        <div className="flex items-center gap-10">
          <button onClick={() => navigate(-1)} className="p-3 hover:bg-white/5 rounded-full transition-colors group">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <Logo className="w-40" />
        </div>
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => setActiveTab("guide")}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === "guide" ? "bg-primary text-white shadow-glow" : "bg-white/5 hover:bg-white/10"}`}
          >
            User Guide
          </button>
          <button 
            onClick={() => setActiveTab("technical")}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === "technical" ? "bg-primary text-white shadow-glow" : "bg-white/5 hover:bg-white/10"}`}
          >
            Technical Specs
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-20">
        {/* ── HERO SECTION ── */}
        <section className="text-center space-y-6 py-10">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter"
          >
            System <span className="text-primary italic">Intelligence</span> Documentation
          </motion.h1>
          <p className="max-w-2xl mx-auto text-text-muted font-medium text-lg italic opacity-80 leading-relaxed">
            Har field ke insan ke liye mukammal rehnama. Peon se CEO tak, tech se teacher tak—samjhein ke CVify Pro ki taqat ko kis tarah apne career ke liye use karna hai.
          </p>
        </section>

        {/* ── CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Nav (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4 sticky top-40 h-fit">
            <div className="p-8 glass rounded-[2.5rem] border border-white/5 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Table of Contents</h4>
              <div className="space-y-2">
                {sections[activeTab].map(s => (
                  <a 
                    key={s.id} 
                    href={`#${s.id}`}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 text-xs font-bold text-text-muted hover:text-text-primary transition-all group"
                  >
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                {sections[activeTab].map((section, idx) => (
                  <div 
                    id={section.id} 
                    key={section.id}
                    className="glass p-10 md:p-16 rounded-[3.5rem] border border-white/10 hover:border-primary/20 transition-all space-y-8 group relative overflow-hidden"
                  >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <h2 className="text-3xl font-black tracking-tight">{section.title}</h2>
                    </div>

                    <div className="prose prose-invert max-w-none text-text-muted font-medium text-lg leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>

                    <div className="flex items-center gap-2 text-action font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pt-6">
                      <Zap size={12} className="text-primary" /> Verified Intelligence Step {idx + 1}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── FOOTER CTA ── */}
        <section className="text-center py-20 bg-primary/5 rounded-[4rem] border border-primary/10 space-y-8 px-10">
          <h2 className="text-4xl font-black italic tracking-tight">Ready to boost your career?</h2>
          <p className="text-text-muted font-bold opacity-60 uppercase tracking-widest text-xs">Join thousands of professionals winning with CVify Pro</p>
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
