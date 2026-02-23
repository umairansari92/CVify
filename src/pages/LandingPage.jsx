import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/common/ThemeToggle";

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 lg:p-6 bg-background/80 backdrop-blur-xl border-b border-border-subtle">
    <div className="max-w-7xl w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={logo} alt="CVify" className="h-10 w-auto" />
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-text-muted">
        <a
          href="#how-it-works"
          className="hover:text-primary transition-colors"
        >
          How it Works
        </a>
        <a href="#features" className="hover:text-primary transition-colors">
          Features
        </a>
        <a href="#diamonds" className="hover:text-primary transition-colors">
          Diamonds
        </a>
        <div className="flex items-center gap-4 ml-4">
          <ThemeToggle />
          <Link
            to="/login"
            className="bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-2xl transition-all font-black shadow-lg shadow-primary/20"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggle />
        <Link
          to="/login"
          className="bg-primary text-white px-4 py-2 rounded-xl font-black text-sm"
        >
          Get Started
        </Link>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="premium-card p-8 group">
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-black mb-3 text-text-main tracking-tight">
      {title}
    </h3>
    <p className="text-text-muted leading-relaxed font-medium">{description}</p>
  </div>
);

const StepCard = ({ number, title, description, icon }) => (
  <div className="relative flex flex-col items-center text-center p-6 group">
    <div className="w-20 h-20 rounded-[2rem] bg-midground border border-border-subtle shadow-premium flex items-center justify-center mb-8 text-4xl relative z-10 group-hover:scale-110 transition-transform">
      {icon}
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-black text-white shadow-lg">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-black mb-3 text-text-main">{title}</h3>
    <p className="text-text-muted font-medium leading-relaxed">{description}</p>
  </div>
);

const Hero = () => (
  <section className="relative pt-48 pb-32 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-10 animate-float border-border-subtle">
        <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_10px_var(--success)]"></span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
          Next-Gen Resume Intelligence v2.0
        </span>
      </div>
      <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-10 font-outfit">
        <span className="text-text-main">Elevate Your </span>
        <br />
        <span className="text-gradient">Professional </span>
        <span className="text-text-main">Identity.</span>
      </h1>
      <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
        Stop wrestling with formatting. CVify builds elite, ATS-optimized
        resumes and AI-powered cover letters in seconds. Join the elite.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link
          to="/signup"
          className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white px-10 py-5 rounded-[2rem] text-lg font-black shadow-2xl shadow-primary/40 transition-all active:scale-95"
        >
          Build My Career — Free
        </Link>
        <a
          href="#how-it-works"
          className="w-full sm:w-auto glass px-10 py-5 rounded-[2rem] text-lg font-bold hover:bg-foreground/20 transition-all text-text-main"
        >
          See How it Works
        </a>
      </div>
    </div>

    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[180px] -z-10 rounded-full"></div>
  </section>
);

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="py-32 px-6 relative bg-mesh overflow-hidden"
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-text-main font-outfit">
          The CVify Flow
        </h2>
        <p className="text-text-muted font-medium text-lg">
          Four steps to a professional presence that commands attention.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
        <StepCard
          number="01"
          icon="🛡️"
          title="Secure Access"
          description="Create your professional profile and verify your identity in seconds."
        />
        <StepCard
          number="02"
          icon="⚡"
          title="Instant Resume"
          description="Choose from 10+ elite templates. Fill your data once, see it live everywhere."
        />
        <StepCard
          number="03"
          icon="🤖"
          title="AI Cover Letter"
          description="Use your Diamonds to let Gemini AI draft a high-impact cover letter for any role."
        />
        <StepCard
          number="04"
          icon="📥"
          title="HD Export"
          description="Download your carrier-defining documents as crystal-clear native PDFs."
        />
      </div>
    </div>
  </section>
);

const DiamondSystem = () => (
  <section id="diamonds" className="py-32 px-6">
    <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[4rem] border-border-subtle relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[100px] animate-pulse"></div>

      <div className="relative z-10 text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="text-primary text-sm font-black tracking-widest uppercase italic">
              The Diamond Economy
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-text-main font-outfit text-gradient">
            Powering AI.
          </h2>
          <p className="text-text-muted font-medium text-lg mb-10">
            We believe in fair, usage-based access. Our diamond system ensures
            you only pay for high-end AI processing while keeping the core
            platform free.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-xl">
                🎁
              </div>
              <div>
                <p className="text-text-main font-bold">
                  100 Diamonds Welcome Bonus
                </p>
                <p className="text-text-muted text-sm">
                  Start your journey with enough for 2 AI letters.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                🤝
              </div>
              <div>
                <p className="text-text-main font-bold">
                  50 Diamonds Per Referral
                </p>
                <p className="text-text-muted text-sm">
                  Invite colleagues and grow your balance exponentially.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl">
                ✨
              </div>
              <div>
                <p className="text-text-main font-bold">20 Monthly Bonus</p>
                <p className="text-text-muted text-sm">
                  Loyalty pays off. Get free diamonds every 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-midground/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-border-subtle shadow-premium">
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-foreground/10 border border-border-subtle flex justify-between items-center group hover:border-primary/30 transition-all">
              <span className="text-text-main font-bold">AI Cover Letter</span>
              <span className="text-primary font-black">50 💎</span>
            </div>
            <div className="p-6 rounded-2xl bg-foreground/10 border border-border-subtle flex justify-between items-center opacity-60">
              <span className="text-text-main font-bold">Standard Resume</span>
              <span className="text-success font-black tracking-widest uppercase text-xs">
                Always Free
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-foreground/10 border border-border-subtle flex justify-between items-center opacity-60">
              <span className="text-text-main font-bold">PDF Downloads</span>
              <span className="text-success font-black tracking-widest uppercase text-xs">
                Unlimited
              </span>
            </div>

            <Link
              to="/signup"
              className="block text-center w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-glow"
            >
              Claim My Diamonds
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-24">
      <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-text-main font-outfit uppercase">
        Platform Pillars
      </h2>
      <p className="text-text-muted font-medium text-lg">
        Built for the high-performance professional.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <FeatureCard
        icon="🎨"
        title="Premium Templates"
        description="Handpicked professional styles. Swap designs instantly without losing data."
      />
      <FeatureCard
        icon="🚀"
        title="ATS Mastery"
        description="Structural integrity that guarantees readability by automated screening robots."
      />
      <FeatureCard
        icon="🔮"
        title="Crystal PDF"
        description="Native rendering engine produces high-fidelity, searchable, and professional documents."
      />
      <FeatureCard
        icon="🌑"
        title="Dual Themes"
        description="Eye-friendly engineering available in both Light and Dark modes."
      />
      <FeatureCard
        icon="📈"
        title="Growth System"
        description="Refer friends, earn diamonds, and leverage AI to dominate your job hunt."
      />
      <FeatureCard
        icon="🔒"
        title="Elite Security"
        description="Disposable email protection and encrypted profile storage."
      />
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-6 border-t border-border-subtle bg-midground/20">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 items-start">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="CVify" className="h-8 w-auto" />
          <span className="text-2xl font-black text-text-main font-outfit">
            CVify
          </span>
        </div>
        <p className="text-text-muted font-medium leading-relaxed">
          The professional ecosystem for modern careers. Built for builders,
          leaders, and dreamers.
        </p>
        <p className="text-text-muted text-sm">
          © 2026 CVify. All rights reserved.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-20">
        <div className="space-y-4">
          <p className="text-text-main font-bold">Platform</p>
          <ul className="text-text-muted space-y-2 text-sm font-medium">
            <li>
              <a
                href="#how-it-works"
                className="hover:text-primary transition-colors"
              >
                How it Works
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="hover:text-primary transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#diamonds"
                className="hover:text-primary transition-colors"
              >
                Diamonds
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="text-text-main font-bold">Legal</p>
          <ul className="text-text-muted space-y-2 text-sm font-medium">
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-text-main font-bold uppercase tracking-widest text-xs opacity-50">
          Manifesto
        </p>
        <p className="text-text-muted text-sm leading-relaxed italic">
          "A resume is not just a document; it's your professional manifesto.
          Make it undeniable."
        </p>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="bg-background text-text-main bg-mesh selection:bg-primary/30 min-h-screen scroll-smooth">
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <DiamondSystem />
        <Features />

        <section className="py-40 px-6">
          <div className="max-w-4xl mx-auto premium-card p-16 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter text-text-main font-outfit uppercase">
                Join the Elite 1%.
              </h2>
              <p className="text-xl text-text-muted mb-12 max-w-lg mx-auto font-medium">
                Create your undeniable professional presence today. Start for
                free.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-primary hover:bg-blue-600 text-white px-16 py-6 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95"
              >
                Launch My Career
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
