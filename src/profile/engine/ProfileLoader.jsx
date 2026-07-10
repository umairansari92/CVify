import React, { useState, useEffect, useCallback, useMemo, useRef, startTransition } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axios";
import {
  fetchPublicProfile,
  fetchProfileAnalytics,
  updateActiveProfileLocally,
  deleteProjectThunk,
  openProjectModalThunk,
} from "../../features/profile/profileSlice";
import { toast } from "react-hot-toast";
import { createViewModel } from "../viewmodel/index.js";
import ProfileEngine from "./ProfileEngine.jsx";

/**
 * ProfileLoader — Layer 2 of the CVify Theme Engine Pipeline.
 *
 * Responsibilities (ONLY):
 * - Read route params
 * - Dispatch Redux fetches (profile, analytics)
 * - Fetch GitHub stats
 * - Build stable action callbacks
 * - Construct the ViewModel via createViewModel()
 * - Pass model + actions to ProfileEngine
 *
 * FORBIDDEN: Any JSX beyond passing down to ProfileEngine.
 */
const ProfileLoader = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const {
    activeProfile: user,
    loading,
    error: profileError,
    analytics,
  } = useSelector((state) => state.profile);

  // ── Local state (loader-owned) ──
  const [localTheme,   setLocalTheme]   = useState(null);
  const [isUpdating,   setIsUpdating]   = useState(false);
  // contactForm uses BOTH state (for controlled inputs) AND a ref (stable snapshot for callbacks).
  // The ref prevents contactForm from entering the model useMemo dep array —
  // which was causing every keystroke to rebuild the ViewModel and flash the Hero.
  const [contactForm,  setContactFormState]  = useState({ name: "", email: "", subject: "", message: "" });
  const contactFormRef = useRef(contactForm);
  const setContactForm = useCallback((valOrFn) => {
    setContactFormState((prev) => {
      const next = typeof valOrFn === "function" ? valOrFn(prev) : valOrFn;
      contactFormRef.current = next;
      return next;
    });
  }, []);
  const [isSending,    setIsSending]    = useState(false);
  const [githubData,   setGithubData]   = useState(null);
  const [githubLoading,setGithubLoading] = useState(false);

  // ── Data fetches ──
  // NOTE: We do NOT clear the active profile on unmount to prevent the
  // hero flash/disappear on re-renders (React StrictMode double-invocation).
  // The profile is replaced atomically when fetchPublicProfile resolves.
  useEffect(() => {
    dispatch(fetchPublicProfile(username));
  }, [dispatch, username]);

  useEffect(() => {
    if (user?.isOwner) dispatch(fetchProfileAnalytics());
  }, [dispatch, user?.isOwner]);

  useEffect(() => {
    const raw = user?.socialLinks?.github;
    const ghUser = raw?.includes("github.com")
      ? raw.split("github.com/")[1]?.split("/")[0]
      : raw;
    if (!ghUser) { setGithubData(null); return; }
    setGithubLoading(true);
    api.get(`/portfolio/github/${ghUser}?t=${Date.now()}`)
      .then((res) => setGithubData(res.data))
      .catch(() => setGithubData(null))
      .finally(() => setGithubLoading(false));
  }, [user?.socialLinks?.github]);

  // Apply CSS vars whenever theme settings change
  useEffect(() => {
    if (!user?.themeSettings) return;
    const t = user.themeSettings;
    const root = document.documentElement;
    root.style.setProperty("--bg-body",       t.bodyBg            || "#0f172a");
    root.style.setProperty("--accent",        t.accentColor       || "#2563eb");
    root.style.setProperty("--header-from",   t.headerBg          || "#2563eb");
    root.style.setProperty("--header-to",     t.headerBgSecondary || "#9333ea");
    root.style.setProperty("--text-primary",  t.textPrimary       || "#ffffff");
    root.style.setProperty("--text-secondary",t.textSecondary     || "#94a3b8");
    startTransition(() => setLocalTheme(t));
  }, [user?.themeSettings]);

  // ── Stable callbacks ──
  const handleLiveUpdate = useCallback(async (updates) => {
    if (!user?.isOwner) return;
    setIsUpdating(true);
    try {
      dispatch(updateActiveProfileLocally(updates));
      await api.patch("/auth/profile", updates);
      toast.success("Branding Synced!", { id: "sync" });
    } catch {
      toast.error("Sync failed.");
      dispatch(fetchPublicProfile(username));
    } finally { setIsUpdating(false); }
  }, [user?.isOwner, username, dispatch]);

  const handleArrayUpdate = useCallback((field, index, updatedItem) => {
    if (!user?.isOwner || !Array.isArray(user[field])) return;
    const arr = [...user[field]];
    arr[index] = { ...arr[index], ...updatedItem };
    handleLiveUpdate({ [field]: arr });
  }, [user, handleLiveUpdate]);

  const handleContactSubmit = useCallback(async (dataOrEvent) => {
    if (dataOrEvent && typeof dataOrEvent.preventDefault === "function") {
      dataOrEvent.preventDefault();
    }
    
    const submitData = (dataOrEvent && typeof dataOrEvent.preventDefault !== "function")
      ? dataOrEvent
      : contactFormRef.current;

    if (isSending) return;
    setIsSending(true);
    const tid = toast.loading("Sending your message...");
    try {
      await api.post(`/portfolio/contact/${username}`, submitData);
      toast.success("Message sent!", { id: tid });
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send.", { id: tid });
    } finally { setIsSending(false); }
  }, [username, isSending, setContactForm]);

  // ── Projects (stable memo) ──
  const projects = useMemo(() => {
    const base = [...(user?.projects || user?.portfolio || [])];
    // Seed project for demo user
    if (base.length === 0 && user?.username === "umairansari92") {
      base.push({
        _id: "seed-namaz",
        title: "Namaz Tracking Dashboard — Real-Time Utility",
        description: "PWA with Firebase & Firestore for daily prayer tracking.",
        githubLink: "https://github.com/umairansari92/Namaz-Tracking-App",
        isFeatured: true,
        techStack: ["React", "Firebase", "PWA"],
      });
    }
    return base;
  }, [user?.projects, user?.portfolio, user?.username]);

  // ── Build ViewModel ──
  // IMPORTANT: contactForm is intentionally NOT in this useMemo dep array.
  // Contact form values are passed via the stable setContactForm callback and read
  // via contactFormRef in handleContactSubmit. This prevents every keystroke from
  // rebuilding the ViewModel → re-rendering ThemeResolver → flashing the Hero.
  const model = useMemo(() => {
    if (!user) return null;
    return createViewModel({
      user,
      projects,
      contactForm: contactFormRef.current,
      analytics,
      githubData,
      githubLoading,
      actions: {
        handleLiveUpdate,
        handleArrayUpdate,
        handleContactSubmit,
        setContactForm,
        isSending,
      },
    });
  }, [user, projects, analytics, githubData, githubLoading,
      handleLiveUpdate, handleArrayUpdate, handleContactSubmit, isSending, setContactForm]);

  const displayValue = useCallback((value, placeholder) => {
    if (value && typeof value === 'string' && value.trim() !== "") return value;
    if (value && typeof value !== 'string') return value;
    return null;
  }, []);

  const ensureAbsoluteUrl = useCallback((url) => {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) return trimmed;
    return `https://${trimmed}`;
  }, []);

  const personalInfo = useMemo(() => ({
    fullName: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
    image: user?.profileImage,
    jobTitle: user?.headline,
    objective: user?.bio,
    summary: user?.bio,
    location: user?.location,
    email: user?.email,
    phone: user?.phoneNumber
  }), [user?.firstName, user?.lastName, user?.profileImage, user?.headline, user?.bio, user?.location, user?.email, user?.phoneNumber]);

  return (
    <ProfileEngine
      user={user}
      model={model}
      loading={loading}
      profileError={profileError}
      localTheme={localTheme}
      setLocalTheme={setLocalTheme}
      analytics={analytics}
      isUpdating={isUpdating}
      handleLiveUpdate={handleLiveUpdate}
      username={username}
      displayValue={displayValue}
      ensureAbsoluteUrl={ensureAbsoluteUrl}
      personalInfo={personalInfo}
      deleteProjectThunk={deleteProjectThunk}
      openProjectModalThunk={openProjectModalThunk}
    />
  );
};

export default ProfileLoader;
