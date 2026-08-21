import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Download,
  Bot,
  ExternalLink,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import CareerAnalytics from "../../../components/profile/CareerAnalytics";

export const ProfileAnalyticsPage = () => {
  const user = useSelector((state) => state.auth?.user);

  return (
    <div className="space-y-10 py-6 max-w-6xl mx-auto text-[var(--text-primary)]">
      
      {/* Header */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              Digital Identity Intelligence
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Portfolio & Recruiter Analytics
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
              Track real-time visitor traffic, AI concierge conversations, resume downloads, and ATS benchmarks.
            </p>
          </div>

          {user?.username && (
            <a
              href={`/p/${user.username}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl bg-[var(--primary)] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--primary-hover)] transition-all shadow-md shrink-0 self-start sm:self-auto"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Embedded Career Intelligence Analytics Engine */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-10 shadow-2xl">
        <CareerAnalytics />
      </div>

    </div>
  );
};

export default ProfileAnalyticsPage;
