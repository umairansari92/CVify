/**
 * ResumeGrid.jsx — Grid / List layout switcher for Resume Library
 *
 * Handles:
 *  - Grid view: 3-column responsive card grid
 *  - List view: single-column compact rows (future)
 *  - Empty state with CTA
 *  - Loading skeleton grid
 */

import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { Button } from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import SkeletonLoader from "../../../components/ui/SkeletonLoader";
import ResumeCard from "./ResumeCard";

// ── Loading Skeleton ─────────────────────────────────────────────────────

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <SkeletonLoader key={i} className="h-[480px] rounded-2xl" />
    ))}
  </div>
);

// ── Empty State ──────────────────────────────────────────────────────────

const EmptyState = ({ isFiltered, onCreateResume }) => (
  <m.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card
      variant="glass"
      className="text-center py-16 px-8 border border-dashed border-border-subtle rounded-3xl"
    >
      <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <FaFileAlt size={28} className="text-primary/50" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">
        {isFiltered ? "No Resumes Match Your Filter" : "Your Resume Library is Empty"}
      </h3>
      <p className="text-xs text-text-muted mt-2 max-w-sm mx-auto leading-relaxed">
        {isFiltered
          ? "Try clearing the search or changing the filter to see your resumes."
          : "Create your first AI-tailored resume or upload an existing PDF to start building your career portfolio."}
      </p>
      {!isFiltered && (
        <Button
          variant="glow"
          onClick={onCreateResume}
          icon={FiPlus}
          className="mt-6 !h-10 !text-xs font-bold mx-auto"
        >
          Create Your First Resume
        </Button>
      )}
    </Card>
  </m.div>
);

// ── Resume Grid ──────────────────────────────────────────────────────────

const ResumeGrid = ({
  resumes,
  loading,
  viewMode,
  searchQuery,
  filterStatus,
  activeMenuId,
  onToggleMenu,
  onEdit,
  onAtsAnalysis,
  onShare,
  onClone,
  onDelete,
  onCloseMenu,
  onCreateResume,
}) => {
  if (loading) return <LoadingSkeleton />;

  const isFiltered = !!(searchQuery?.trim() || (filterStatus && filterStatus !== "all"));

  if (resumes.length === 0) {
    return (
      <EmptyState isFiltered={isFiltered} onCreateResume={onCreateResume} />
    );
  }

  return (
    <>
      {/* Collection Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-text-primary">
          {isFiltered
            ? `${resumes.length} result${resumes.length !== 1 ? "s" : ""}`
            : `Your Resumes (${resumes.length})`}
        </h2>
      </div>

      {/* Grid Layout */}
      <AnimatePresence mode="popLayout">
        <m.div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
          layout
        >
          {resumes.map((resume) => {
            const resumeId = resume.id || resume._id;
            return (
              <ResumeCard
                key={resumeId}
                resume={resume}
                isMenuOpen={activeMenuId === resumeId}
                onToggleMenu={onToggleMenu}
                onEdit={onEdit}
                onAtsAnalysis={onAtsAnalysis}
                onShare={onShare}
                onClone={onClone}
                onDelete={onDelete}
                onCloseMenu={onCloseMenu}
              />
            );
          })}
        </m.div>
      </AnimatePresence>
    </>
  );
};

export default ResumeGrid;
