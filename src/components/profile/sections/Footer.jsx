import React from "react";

const Footer = React.memo(({ personalInfo }) => {
  return (
    <footer id="footer" className="py-8 bg-[var(--bg-primary)] border-t border-[var(--card-border)] text-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[var(--text-secondary)] opacity-50 text-sm">
          © {new Date().getFullYear()} <span className="text-[var(--text-primary)] opacity-80 font-medium">{personalInfo.fullName}</span>. Powered by <a href="https://cvifypro.vercel.app/" target="_blank" rel="noreferrer" className="text-[var(--primary-color)] hover:underline">CVify Pro</a>.
        </p>
        <div className="flex items-center gap-4">
           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[var(--text-secondary)] opacity-50 hover:text-[var(--text-primary)] hover:opacity-100 text-sm transition-colors">
             Back to Top ↑
           </button>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
