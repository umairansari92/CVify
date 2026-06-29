import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Loader2, Download, ExternalLink } from "lucide-react";
import api from "../api/axios";
import { getDOMTemplate } from "../components/templates/TemplateRegistry";
import { handleDownloadPDF } from "../utils/pdfExport";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ErrorPage = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
    <Helmet>
      <title>Resume Unavailable | CVify Pro</title>
      <meta name="robots" content="noindex, nofollow, noarchive" />
    </Helmet>

    {/* Icon */}
    <div className="w-20 h-20 rounded-full bg-slate-800/60 border border-white/5 flex items-center justify-center mb-8">
      <svg className="w-9 h-9 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    </div>

    {/* Copy */}
    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-primary mb-3">CVify Pro</p>
    <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">
      This resume is no longer publicly available.
    </h1>
    <p className="text-slate-400 text-sm max-w-xs mb-10 leading-relaxed">
      The owner may have disabled sharing or regenerated their link.
    </p>

    {/* CTA */}
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl
                 text-sm font-bold tracking-wide
                 shadow-[0_0_32px_rgba(59,130,246,0.35)] hover:brightness-110 transition-all"
    >
      Create your own professional resume
      <ExternalLink size={14} />
    </Link>

    <p className="mt-5 text-xs text-slate-600">
      AI-powered resumes that get interviews — free on CVify Pro
    </p>
  </div>
);


// ─── Main Component ───────────────────────────────────────────────────────────

const PublicResumeViewer = () => {
  const { slug } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError("Invalid link.");
      setLoading(false);
      return;
    }

    const fetchResume = async () => {
      try {
        // Uses the public endpoint — no auth header sent
        const { data } = await api.get(`/public/resumes/${slug}`);
        setResume(data);
      } catch (err) {
        // 404 for any failure — intentional (per spec)
        setError("Resume not found or this link has been disabled.");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [slug]);

  const handleDownload = async () => {
    if (!resume || downloading) return;
    setDownloading(true);
    await handleDownloadPDF(resume, resume.templateId || "classic");
    setDownloading(false);
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Helmet>
          <meta name="robots" content="noindex, nofollow, noarchive" />
        </Helmet>
        <Loader2 className="animate-spin text-primary w-10 h-10" />
        <p className="text-slate-400 text-xs tracking-widest uppercase font-bold">Loading Resume…</p>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error || !resume) {
    return <ErrorPage />;
  }

  // ── Derived meta ──────────────────────────────────────────────────────────
  const ownerName   = resume.personalInfo?.fullName || "Candidate";
  const jobTitle    = resume.personalInfo?.jobTitle  || "Professional";
  const pageTitle   = `${ownerName} — ${jobTitle} | CVify Pro`;
  const description = `View ${ownerName}'s professional resume on CVify Pro.`;
  const canonicalUrl = `${window.location.origin}/share/r/${slug}`;

  // ── Resume Page ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0A0F1E] py-10 px-4 flex flex-col items-center">

      {/* ── SEO + OG Helmet ─────────────────────────────────────────────── */}
      <Helmet>
        <title>{pageTitle}</title>
        {/* Privacy — never index personal resume pages */}
        <meta name="robots" content="noindex, nofollow, noarchive" />
        {/* Open Graph — for sharing on LinkedIn, WhatsApp, Discord, etc. */}
        <meta property="og:title"       content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type"        content="profile" />
        <meta property="og:url"         content={canonicalUrl} />
        <meta property="og:site_name"   content="CVify Pro" />
        {/* Twitter Card */}
        <meta name="twitter:card"        content="summary" />
        <meta name="twitter:title"       content={pageTitle} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      {/* ── Top Bar ─────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[210mm] mb-8 flex items-center justify-between
                      bg-slate-900/60 backdrop-blur-xl border border-white/5
                      px-5 py-3.5 rounded-2xl">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary leading-none mb-0.5">
              Powered by
            </span>
            <span className="text-base font-black text-white tracking-tighter leading-none">
              CVify Pro
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Download PDF — reuses existing export logic, zero duplicate code */}
          {resume.sharing?.allowPdfDownload !== false && (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10
                         border border-white/10 text-slate-300 hover:text-white
                         rounded-xl text-xs font-bold tracking-wide transition-all
                         disabled:opacity-50"
            >
              {downloading
                ? <Loader2 size={13} className="animate-spin" />
                : <Download size={13} />}
              {downloading ? "Preparing…" : "Download PDF"}
            </button>
          )}

          {/* CTA */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white
                       rounded-xl text-xs font-bold tracking-wide
                       shadow-[0_0_16px_rgba(59,130,246,0.25)] hover:brightness-110 transition-all"
          >
            Build Yours Free <ExternalLink size={11} />
          </Link>
        </div>
      </div>

      {/* ── Resume Paper ──────────────────────────────────────────────────── */}
      <div className="w-full flex justify-center">
        <div
          className="bg-white shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          <React.Suspense fallback={
            <div className="flex items-center justify-center h-[297mm]">
              <Loader2 className="animate-spin text-slate-300 w-8 h-8" />
            </div>
          }>
            {getDOMTemplate(resume.templateId || "classic", resume, false)}
          </React.Suspense>
        </div>
      </div>

      {/* ── Footer — Passive marketing strip ─────────────────────────────── */}
      {/* Every recruiter who opens a shared resume sees this.              */}
      <div className="w-full max-w-[210mm] mt-8 mb-16 flex items-center justify-between
                      px-5 py-4 rounded-2xl border border-white/5 bg-slate-900/40">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none mb-1">
            Powered by CVify Pro
          </p>
          <p className="text-xs text-slate-400">
            AI-powered resumes that get interviews.
          </p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white
                     rounded-xl text-xs font-bold tracking-wide whitespace-nowrap
                     shadow-[0_0_16px_rgba(59,130,246,0.25)] hover:brightness-110 transition-all"
        >
          Create your own AI Resume <ExternalLink size={11} />
        </Link>
      </div>
    </div>
  );
};

export default PublicResumeViewer;
