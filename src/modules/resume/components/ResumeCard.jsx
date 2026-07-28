/**
 * ResumeCard.jsx — Premium Resume Document Card
 *
 * Information hierarchy (top → bottom):
 *   PDF Preview → Title → Type/Visibility → ATS → Updated → Tags → AI Insight → Actions → Overflow Menu
 *
 * Rule 8: Thumbnail renders real PDF content using @react-pdf/renderer blob → react-pdf canvas.
 *         Same approach as MobilePDFViewer in PDFPreviewPanel — canvas-based, scales correctly.
 * Rule 10: Only 2 visible CTA buttons. Everything else in ••• overflow menu.
 * Rule 15: Reuse pattern, not import — blob approach avoids iframe scaling issues.
 */

import React, { Suspense, useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Document as PdfDocument, Page as PdfPage, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ── PDF Template map (same as PDFPreviewPanel — configuration only, not logic) ──
import ModernPDF from "../../../components/pdf/ModernPDF";
import ProfessionalPDF from "../../../components/pdf/ProfessionalPDF";
import TechnicalPDF from "../../../components/pdf/TechnicalPDF";
import ExecutivePDF from "../../../components/pdf/ExecutivePDF";
import MinimalPDF from "../../../components/pdf/MinimalPDF";
import TraditionalPDF from "../../../components/pdf/TraditionalPDF";
import ClassicPDF from "../../../components/pdf/ClassicPDF";
import BoldPDF from "../../../components/pdf/BoldPDF";
import ElegantPDF from "../../../components/pdf/ElegantPDF";
import ClearPDF from "../../../components/pdf/ClearPDF";
import GlobalPDF from "../../../components/pdf/GlobalPDF";
import ElitePDF from "../../../components/pdf/ElitePDF";
import StandardPDF from "../../../components/pdf/StandardPDF";

import {
  FaGlobe, FaLock, FaFilePdf, FaEdit, FaCopy, FaShareAlt,
  FaTrashAlt, FaDownload, FaBolt,
} from "react-icons/fa";
import { FiMoreVertical, FiEye, FiZap } from "react-icons/fi";
import { Button } from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { getAtsLabel, getAtsPotential, getAiInsight, formatRelativeTime } from "../utils/ats.utils";

// ── Worker config (same version as PDFPreviewPanel) ──
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// ── Template Lookup ──
const getTemplatePdfComponent = (templateId, data) => {
  switch (templateId) {
    case "modern":        return <ModernPDF data={data} />;
    case "professional":  return <ProfessionalPDF data={data} />;
    case "technical":     return <TechnicalPDF data={data} />;
    case "executive":     return <ExecutivePDF data={data} />;
    case "minimal":       return <MinimalPDF data={data} />;
    case "traditional":   return <TraditionalPDF data={data} />;
    case "classic":       return <ClassicPDF data={data} />;
    case "bold":          return <BoldPDF data={data} />;
    case "elegant":       return <ElegantPDF data={data} />;
    case "clear":         return <ClearPDF data={data} />;
    case "global":        return <GlobalPDF data={data} />;
    case "elite":         return <ElitePDF data={data} />;
    default:              return <StandardPDF data={data} />;
  }
};

// ── PDF Thumbnail (canvas-based — works everywhere, no iframe scaling issues) ──
const PdfThumbnail = ({ resume }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const [error, setError] = useState(false);
  const templateId = resume?.templateId || "classic";

  useEffect(() => {
    let active = true;
    let objectUrl = null;

    const generate = async () => {
      try {
        const { pdf } = await import("@react-pdf/renderer");
        const pdfComponent = getTemplatePdfComponent(templateId, resume);
        const blob = await pdf(pdfComponent).toBlob();
        if (active) {
          objectUrl = URL.createObjectURL(blob);
          setBlobUrl(objectUrl);
        }
      } catch (err) {
        console.error("[ResumeThumbnail] Failed to generate blob:", err);
        if (active) setError(true);
      }
    };

    if (resume) generate();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [resume?._id || resume?.id, templateId]);

  // Fallback state
  if (!resume || error) {
    return (
      <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-primary/10 via-midground to-bg-secondary border border-border-subtle flex flex-col items-center justify-center gap-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <FaFilePdf size={24} className="text-primary/40 relative z-10" />
        <div className="space-y-1.5 relative z-10 w-2/3 px-4">
          <div className="h-1.5 bg-text-primary/20 rounded-full w-full" />
          <div className="h-1 bg-text-muted/15 rounded-full w-4/5" />
          <div className="h-1 bg-text-muted/10 rounded-full w-3/5" />
        </div>
        <p className="text-[10px] text-text-muted relative z-10 font-medium">Preview unavailable</p>
      </div>
    );
  }

  // Loading state while blob generates
  if (!blobUrl) {
    return (
      <div className="w-full h-48 rounded-2xl bg-white/5 border border-border-subtle flex flex-col items-center justify-center gap-3 overflow-hidden">
        <div className="w-5 h-5 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] text-text-muted font-medium">Generating preview...</p>
      </div>
    );
  }

  // Render first page as canvas thumbnail
  return (
    <div
      className="w-full h-48 rounded-2xl overflow-hidden border border-border-subtle bg-white"
      style={{ pointerEvents: "none" }}
    >
      <PdfDocument
        file={blobUrl}
        loading={null}
        onLoadError={() => setError(true)}
      >
        <PdfPage
          pageNumber={1}
          width={340}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          className="!w-full"
        />
      </PdfDocument>
    </div>
  );
};


// ── ATS Badge ─────────────────────────────────────────────────────────────

const AtsBadge = ({ score, onViewAts }) => {
  const { label, color, bg, border } = getAtsLabel(score);
  const potential = getAtsPotential(score);

  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-xl ${bg} border ${border} text-xs`}>
      <div className="flex items-center gap-2">
        <span className="font-black text-text-primary">
          {score > 0 ? `ATS ${score}` : "ATS"}
        </span>
        <span className={`font-bold ${color}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {potential && (
          <span className="text-text-muted font-medium">{potential}</span>
        )}
        {score > 0 && (
          <button
            onClick={onViewAts}
            className={`font-bold ${color} hover:underline underline-offset-2 transition-all`}
          >
            View →
          </button>
        )}
      </div>
    </div>
  );
};

// ── Overflow Menu ─────────────────────────────────────────────────────────

const OverflowMenu = ({ resume, resumeId, onEdit, onShare, onClone, onDelete, onClose }) => (
  <m.div
    key="overflow-menu"
    initial={{ opacity: 0, scale: 0.95, y: -5 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -5 }}
    transition={{ duration: 0.12 }}
    className="absolute right-2 top-10 z-50 bg-[#18181b] border border-border-subtle rounded-2xl p-2 shadow-2xl w-48 space-y-0.5"
    onClick={(e) => e.stopPropagation()}
  >
    <MenuBtn icon={<FaEdit size={11} className="text-blue-400" />} label="Edit Resume" onClick={() => { onClose(); onEdit(resumeId); }} />
    <MenuBtn icon={<FaShareAlt size={11} className="text-purple-400" />} label="Share Link" onClick={(e) => { onShare(resume, e); }} />
    <MenuBtn icon={<FaCopy size={11} className="text-amber-400" />} label="Duplicate" onClick={(e) => { onClose(); onClone(resumeId, e); }} />
    <MenuBtn icon={<FaDownload size={11} className="text-emerald-400" />} label="Download PDF" onClick={() => { onClose(); if (resume.fileUrl || resume.pdfUrl) window.open(resume.fileUrl || resume.pdfUrl, "_blank"); }} />
    <div className="my-1 border-t border-border-subtle" />
    <MenuBtn
      icon={<FaTrashAlt size={11} />}
      label="Delete Resume"
      onClick={(e) => { onDelete(resumeId, resume.title, e); }}
      danger
    />
  </m.div>
);

const MenuBtn = ({ icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
      danger
        ? "text-red-400 hover:bg-red-500/10"
        : "text-text-secondary hover:text-text-primary hover:bg-white/8"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// ── Resume Card ───────────────────────────────────────────────────────────

const ResumeCard = ({
  resume,
  isMenuOpen,
  onToggleMenu,
  onEdit,
  onAtsAnalysis,
  onShare,
  onClone,
  onDelete,
  onCloseMenu,
}) => {
  const resumeId = resume.id || resume._id;
  const atsScore = resume.atsScore || 0;
  const aiInsight = getAiInsight(atsScore);
  const isPublic = !!resume.sharing?.enabled;
  const techTags = Array.isArray(resume.skills)
    ? resume.skills.slice(0, 3)
    : [];

  return (
    <m.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        variant="elevated"
        className="flex flex-col h-full border border-border-subtle hover:border-primary/40 transition-all duration-200 relative group !p-4"
        onClick={() => onCloseMenu()}
      >

        {/* ── PDF Thumbnail ── */}
        <div
          className="cursor-pointer mb-4 relative"
          onClick={() => onEdit(resumeId)}
        >
          <PdfThumbnail resume={resume} />
          {/* Hover overlay */}
          <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/8 transition-all duration-200 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-all text-[10px] font-black uppercase tracking-wider text-primary bg-bg-primary/90 px-3 py-1.5 rounded-full border border-primary/30">
              Open Editor
            </span>
          </div>
        </div>

        {/* ── Title + Visibility + Overflow ── */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text-primary truncate leading-snug" title={resume.title}>
              {resume.title || "Untitled Resume"}
            </h3>
            <p className="text-[11px] text-text-muted font-medium mt-0.5 truncate">
              {resume.jobTitle || resume.targetRole || "General Resume"}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Visibility Badge */}
            <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isPublic
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-white/5 text-text-muted border-border-subtle"
            }`}>
              {isPublic ? <FaGlobe size={8} /> : <FaLock size={8} />}
              {isPublic ? "Public" : "Private"}
            </span>

            {/* Overflow Toggle */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); onToggleMenu(resumeId); }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors"
              >
                <FiMoreVertical size={14} />
              </button>
              <AnimatePresence>
                {isMenuOpen && (
                  <OverflowMenu
                    resume={resume}
                    resumeId={resumeId}
                    onEdit={onEdit}
                    onShare={onShare}
                    onClone={onClone}
                    onDelete={onDelete}
                    onClose={onCloseMenu}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Updated Time ── */}
        <p className="text-[10px] text-text-muted mb-3">
          Updated {formatRelativeTime(resume.updatedAt)}
          {resume.templateId && (
            <span className="ml-2 text-primary/70">· {resume.templateId}</span>
          )}
        </p>

        {/* ── Tech Tags ── */}
        {techTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {techTags.map((tag, i) => (
              <span key={i} className="text-[10px] font-bold px-2 py-0.5 bg-white/5 border border-border-subtle rounded-full text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── ATS Badge ── */}
        <div className="mb-3">
          <AtsBadge score={atsScore} onViewAts={() => onAtsAnalysis(resumeId)} />
        </div>

        {/* ── AI Insight Block ── */}
        {aiInsight && (
          <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/15 rounded-xl px-3 py-2 mb-4">
            <FaBolt size={10} className="text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-text-secondary leading-relaxed">
                {aiInsight.text}
              </p>
              <button
                onClick={() => onAtsAnalysis(resumeId)}
                className="text-[10px] font-black text-amber-400 hover:underline mt-0.5"
              >
                {aiInsight.cta}
              </button>
            </div>
          </div>
        )}

        {/* ── Primary Actions ── */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button
            variant="glow"
            onClick={() => onEdit(resumeId)}
            className="!h-9 !text-[11px] font-bold"
          >
            <FiEye size={12} className="mr-1.5" />
            View Resume
          </Button>
          <Button
            variant="ghost"
            onClick={() => onAtsAnalysis(resumeId)}
            className="!h-9 !text-[11px] !bg-white/5 hover:!bg-white/10 border border-border-subtle font-bold"
          >
            <FiZap size={12} className="mr-1.5" />
            ATS Analysis
          </Button>
        </div>

      </Card>
    </m.div>
  );
};

export default ResumeCard;
