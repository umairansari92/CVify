/**
 * ResumeLibraryPage.jsx — Resume Management Workspace
 *
 * This is a THIN ORCHESTRATOR. It:
 *  1. Dispatches getMyResumes() on mount (via hook)
 *  2. Renders LibraryHeader, MetricsRow, UploadDropZone, ResumeGrid, ShareModal
 *  3. Contains ZERO business logic — all logic lives in useResumeLibrary()
 *
 * Constitution Rule 8: Pages are orchestrators, never logic containers.
 * Constitution Rule 7: Business logic never lives in components.
 */

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyResumes } from "../../../features/resume/resumeThunk";
import ShareResumeModal from "../../../components/dashboard/ShareResumeModal";

import { useResumeLibrary } from "../hooks/useResumeLibrary";
import LibraryHeader from "../components/LibraryHeader";
import MetricsRow from "../components/MetricsRow";
import UploadDropZone from "../components/UploadDropZone";
import ResumeGrid from "../components/ResumeGrid";

const ResumeLibraryPage = () => {
  const dispatch = useDispatch();

  // Mount: fetch resumes
  useEffect(() => {
    dispatch(getMyResumes());
  }, [dispatch]);

  // All state + derived data + actions from hook
  const {
    filteredResumes,
    metrics,
    loading,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    showUploadZone,
    setShowUploadZone,
    isUploading,
    activeMenuId,
    setActiveMenuId,
    shareModalResume,
    setShareModalResume,
    handleFileUpload,
    handleDrop,
    handleOpenShare,
    handleClone,
    handleDelete,
    handleEdit,
    handleAtsAnalysis,
    handleCreateResume,
    closeMenu,
    refresh,
  } = useResumeLibrary();

  const handleToggleMenu = (resumeId) => {
    setActiveMenuId((prev) => (prev === resumeId ? null : resumeId));
  };

  return (
    <div
      className="min-h-screen pb-24 max-w-[1400px] mx-auto px-4 sm:px-6"
      onClick={closeMenu}
    >
      {/* ── Sticky Toolbar ─────────────────────────────────────────────── */}
      <LibraryHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showUploadZone={showUploadZone}
        setShowUploadZone={setShowUploadZone}
        onCreateResume={handleCreateResume}
      />

      {/* ── Executive Metrics ───────────────────────────────────────────── */}
      <MetricsRow metrics={metrics} />

      {/* ── PDF Upload Drop Zone ────────────────────────────────────────── */}
      <UploadDropZone
        visible={showUploadZone}
        isUploading={isUploading}
        onFileUpload={handleFileUpload}
        onDrop={handleDrop}
      />

      {/* ── Resume Grid / List ──────────────────────────────────────────── */}
      <ResumeGrid
        resumes={filteredResumes}
        loading={loading}
        viewMode={viewMode}
        searchQuery={searchQuery}
        filterStatus={filterStatus}
        activeMenuId={activeMenuId}
        onToggleMenu={handleToggleMenu}
        onEdit={handleEdit}
        onAtsAnalysis={handleAtsAnalysis}
        onShare={handleOpenShare}
        onClone={handleClone}
        onDelete={handleDelete}
        onCloseMenu={closeMenu}
        onCreateResume={handleCreateResume}
      />

      {/* ── Share Modal (existing — untouched) ─────────────────────────── */}
      <ShareResumeModal
        isOpen={!!shareModalResume}
        onClose={() => setShareModalResume(null)}
        resume={shareModalResume}
        onUpdate={refresh}
      />
    </div>
  );
};

export default ResumeLibraryPage;
