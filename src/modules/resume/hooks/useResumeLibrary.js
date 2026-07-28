/**
 * useResumeLibrary.js — Resume Library Custom Hook
 *
 * Encapsulates all search, filter, sort, view toggle, and upload logic.
 * Components stay clean — zero business logic in JSX.
 */

import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  getMyResumes,
  deleteResume,
  cloneResume,
  parseResume,
} from "../../../features/resume/resumeThunk";
import { computeMetrics } from "../utils/ats.utils";

export const useResumeLibrary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumes = [], loading } = useSelector((state) => state.resume);

  // ── UI State ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all | public | private | pending
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | highest_ats | lowest_ats | alpha
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [shareModalResume, setShareModalResume] = useState(null);

  // ── Derived Data ──────────────────────────────────────────────────────────

  /** Filtered + Sorted resumes (computed, not stored in state) */
  const filteredResumes = useMemo(() => {
    let result = [...resumes];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          (r.title || "").toLowerCase().includes(q) ||
          (r.jobTitle || r.targetRole || "").toLowerCase().includes(q)
      );
    }

    // Filter
    switch (filterStatus) {
      case "public":
        result = result.filter((r) => r.sharing?.enabled);
        break;
      case "private":
        result = result.filter((r) => !r.sharing?.enabled);
        break;
      case "pending":
        result = result.filter((r) => !r.atsScore || r.atsScore === 0);
        break;
      default:
        break;
    }

    // Sort
    switch (sortBy) {
      case "oldest":
        result.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        break;
      case "highest_ats":
        result.sort((a, b) => (b.atsScore || 0) - (a.atsScore || 0));
        break;
      case "lowest_ats":
        result.sort((a, b) => (a.atsScore || 0) - (b.atsScore || 0));
        break;
      case "alpha":
        result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
    }

    return result;
  }, [resumes, searchQuery, filterStatus, sortBy]);

  /** Executive metrics — computed from raw resumes (not filtered) */
  const metrics = useMemo(() => computeMetrics(resumes), [resumes]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleFileUpload = useCallback(async (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") { toast.error("Please upload a PDF file."); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("File size exceeds 5MB limit."); return; }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      await dispatch(parseResume(formData)).unwrap();
      toast.success("Resume uploaded & parsed successfully!");
      dispatch(getMyResumes());
      setShowUploadZone(false);
    } catch (err) {
      toast.error(err?.message || err || "Failed to parse resume PDF.");
    } finally {
      setIsUploading(false);
    }
  }, [dispatch]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files[0]);
  }, [handleFileUpload]);

  const handleOpenShare = useCallback((resume, e) => {
    e?.stopPropagation();
    setActiveMenuId(null);
    setShareModalResume(resume);
  }, []);

  const handleClone = useCallback(async (resumeId, e) => {
    e?.stopPropagation();
    setActiveMenuId(null);
    try {
      await dispatch(cloneResume({ id: resumeId })).unwrap();
      toast.success("Resume cloned!");
      dispatch(getMyResumes());
    } catch (err) {
      toast.error(err?.message || "Failed to clone resume.");
    }
  }, [dispatch]);

  const handleDelete = useCallback(async (resumeId, resumeTitle, e) => {
    e?.stopPropagation();
    setActiveMenuId(null);
    const confirm = await Swal.fire({
      title: "Delete Resume?",
      text: `Are you sure you want to delete "${resumeTitle || "Untitled"}"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      background: "#18181b",
      color: "#f8fafc",
    });
    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteResume(resumeId)).unwrap();
        toast.success("Resume deleted.");
        dispatch(getMyResumes());
      } catch (err) {
        toast.error(err || "Failed to delete resume.");
      }
    }
  }, [dispatch]);

  const handleEdit = useCallback((resumeId) => {
    navigate(`/resume-builder/editor/${resumeId}`);
  }, [navigate]);

  const handleAtsAnalysis = useCallback((resumeId) => {
    navigate("/ats", { state: { preSelectedResumeId: resumeId } });
  }, [navigate]);

  const handleCreateResume = useCallback(() => {
    navigate("/resume-builder/create");
  }, [navigate]);

  const closeMenu = useCallback(() => setActiveMenuId(null), []);

  return {
    // Data
    resumes,
    filteredResumes,
    metrics,
    loading,

    // UI state
    searchQuery,
    filterStatus,
    sortBy,
    viewMode,
    showUploadZone,
    isUploading,
    activeMenuId,
    shareModalResume,

    // Setters
    setSearchQuery,
    setFilterStatus,
    setSortBy,
    setViewMode,
    setShowUploadZone,
    setActiveMenuId,
    setShareModalResume,

    // Actions
    handleFileUpload,
    handleDrop,
    handleOpenShare,
    handleClone,
    handleDelete,
    handleEdit,
    handleAtsAnalysis,
    handleCreateResume,
    closeMenu,
    refresh: () => dispatch(getMyResumes()),
  };
};
