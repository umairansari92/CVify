/**
 * LibraryHeader.jsx — Sticky Resume Library Toolbar
 * Search | Filter | Sort | Grid/List Toggle | Upload Resume | Create Resume
 */

import React, { useRef } from "react";
import { m } from "framer-motion";
import { FiSearch, FiGrid, FiList, FiPlus, FiFilter, FiChevronDown } from "react-icons/fi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "../../../components/ui/Button";

const FILTER_OPTIONS = [
  { value: "all", label: "All Resumes" },
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "pending", label: "Not Scanned" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "highest_ats", label: "Highest ATS" },
  { value: "lowest_ats", label: "Lowest ATS" },
  { value: "alpha", label: "A → Z" },
];

const LibraryHeader = ({
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
  onCreateResume,
}) => {
  return (
    <div className="sticky top-0 z-30 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle pt-2 pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6">
      
      {/* Top Row — Title + CTA Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            Resume Management Module
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight mt-0.5">
            Resume Library
          </h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            onClick={() => setShowUploadZone(!showUploadZone)}
            icon={FaCloudUploadAlt}
            className="!h-9 !text-xs !bg-white/5 hover:!bg-white/10 border border-border-subtle font-bold"
          >
            {showUploadZone ? "Hide Upload" : "Upload PDF"}
          </Button>
          <Button
            variant="glow"
            onClick={onCreateResume}
            icon={FiPlus}
            className="!h-9 !text-xs font-bold"
          >
            Create Resume
          </Button>
        </div>
      </div>

      {/* Bottom Row — Search + Filter + Sort + View Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        
        {/* Search */}
        <div className="relative flex-1 min-w-0 max-w-sm">
          <FiSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search resumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-8 pr-3 bg-white/5 border border-border-subtle rounded-xl text-xs font-medium text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 pl-3 pr-7 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500/50 cursor-pointer appearance-none transition-all hover:bg-[var(--surface-hover)]"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[var(--surface-elevated)] text-[var(--text-primary)]">
                {opt.label}
              </option>
            ))}
          </select>
          <FiChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 pl-3 pr-7 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-emerald-500/50 cursor-pointer appearance-none transition-all hover:bg-[var(--surface-hover)]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[var(--surface-elevated)] text-[var(--text-primary)]">
                {opt.label}
              </option>
            ))}
          </select>
          <FiChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
        </div>

        {/* Grid / List Toggle */}
        <div className="flex items-center gap-1 bg-white/5 border border-border-subtle rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-primary/20 text-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
            title="Grid view"
          >
            <FiGrid size={14} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === "list"
                ? "bg-primary/20 text-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
            title="List view"
          >
            <FiList size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryHeader;
