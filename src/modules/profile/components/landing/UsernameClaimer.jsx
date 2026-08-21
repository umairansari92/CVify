import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Sparkles, ArrowRight, Check, Globe } from "lucide-react";

export const UsernameClaimer = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth?.user);
  const [handle, setHandle] = useState(authUser?.username || "");
  const [isFocused, setIsFocused] = useState(false);

  const cleanHandle = handle.toLowerCase().replace(/[^a-z0-9_-]/g, "");

  const handleClaim = (e) => {
    e.preventDefault();
    if (authUser) {
      navigate("/profile/studio");
    } else {
      navigate(`/signup?username=${encodeURIComponent(cleanHandle)}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleClaim}
        className={`relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-[var(--surface)] border transition-all duration-300 shadow-2xl ${
          isFocused
            ? "border-[var(--primary)] ring-4 ring-[var(--primary)]/10 shadow-glow-primary"
            : "border-[var(--border)]"
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-[var(--text-muted)] w-full sm:w-auto">
          <Globe className="w-4 h-4 text-[var(--primary)] shrink-0" />
          <span className="font-mono text-[var(--text-secondary)]">cvifypro.app/p/</span>
        </div>

        <input
          type="text"
          value={cleanHandle}
          onChange={(e) => setHandle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={authUser?.username || "yourname"}
          className="flex-1 w-full bg-transparent px-3 py-2 text-sm sm:text-base font-bold text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none font-mono"
        />

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-lg hover:scale-105 active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{authUser ? "Open Studio" : "Claim Link"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="flex items-center justify-center gap-6 mt-4 text-[11px] font-bold text-[var(--text-muted)]">
        <span className="flex items-center gap-1.5 text-emerald-500">
          <Check className="w-3.5 h-3.5" /> Instant SSL Security
        </span>
        <span className="flex items-center gap-1.5 text-emerald-500">
          <Check className="w-3.5 h-3.5" /> 11 Bespoke Themes
        </span>
        <span className="flex items-center gap-1.5 text-emerald-500">
          <Check className="w-3.5 h-3.5" /> 24/7 AI Recruiter Guide
        </span>
      </div>
    </div>
  );
};

export default UsernameClaimer;
