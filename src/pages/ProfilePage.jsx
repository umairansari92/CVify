import { useState, useRef, useEffect, useMemo } from "react";
import isEqual from "lodash/isEqual";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updateUser } from "../features/auth/authSlice";
import { FaShareAlt, FaGlobe, FaPalette, FaCheckCircle, FaCloudUploadAlt, FaImage } from "react-icons/fa";
import ThemeEditor from "../components/profile/ThemeEditor";
import Card from "../components/ui/Card";

import api from "../api/axios";

// ─── Avatar Helper ────────────────────────────────────────────────────────────
const Avatar = ({ src, name, size = "lg" }) => {
  const dim = size === "lg" ? "w-28 h-28 text-4xl" : "w-10 h-10 text-sm";
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${dim} rounded-full object-cover object-top ring-4 ring-action/20 dark:ring-accent/20`}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-full bg-gradient-to-br from-action to-violet-500 flex items-center justify-center font-black text-white ring-4 ring-action/20`}
    >
      {initials}
    </div>
  );
};

// Section Card is now imported from ../components/ui/Card

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="text-xl">{icon}</span>
    <h3 className="font-black text-sm text-text-muted uppercase tracking-[0.2em]">
      {title}
    </h3>
    <span className="flex-1 h-px bg-border-subtle" />
  </div>
);

// ─── Main ProfilePage ─────────────────────────────────────────────────────────
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((s) => s.auth);

  // Date helpers: DB (MM/YYYY) <-> Input (YYYY-MM)
  const toInputDate = (dateStr) => {
    if (!dateStr || !dateStr.includes("/")) return "";
    const [m, y] = dateStr.split("/");
    return `${y}-${m.padStart(2, "0")}`;
  };

  const toDBDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m] = dateStr.split("-");
    return `${m}/${y}`;
  };

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [headline, setHeadline] = useState(user?.headline || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [username, setUsername] = useState(user?.username || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [isPublic, setIsPublic] = useState(user?.isPublic || false);
  const [socialLinks, setSocialLinks] = useState(
    user?.socialLinks || {
      linkedin: "",
      github: "",
      twitter: "",
      portfolio: "",
    },
  );
  const [previewImg, setPreview] = useState(user?.profileImage || "");
  const [imageFile, setImgFile] = useState(null);

  // Phase 5: Additional Fields
  const [location, setLocation] = useState(user?.location || "");
  const [experience, setExperience] = useState(user?.experience || []);
  const [education, setEducation] = useState(user?.education || []);
  const [skills, setSkills] = useState(user?.skills || []);
  const [certifications, setCertifications] = useState(user?.certifications || []);
  const [achievements, setAchievements] = useState(user?.achievements || []);
  const [services, setServices] = useState(user?.services || []);
  const [languages, setLanguages] = useState(user?.languages || []);
  const [availability, setAvailability] = useState(user?.availability || "Open to Work");
  const [industry, setIndustry] = useState(user?.industry || "Other");
  const [privacy, setPrivacy] = useState(user?.privacy || { visibility: "Public", showPhone: false, showEmail: true });
  const [sectionNames, setSectionNames] = useState(
    user?.sectionNames || {
      experience: "Professional Experience",
      education: "Education History",
      skills: "Expertise & Skills",
      projects: "Key Accomplishments",
      services: "Professional Services",
    },
  );
  const [themeSettings, setThemeSettings] = useState(
    user?.themeSettings || {
      headerBg: "#2563eb",
      headerBgSecondary: "#9333ea",
      bodyBg: "#0f172a",
      cardStyle: "glass",
      fontPrimary: "Inter",
      bannerUrl: "",
      bannerOpacity: 95,
    },
  );
  const [bannerFile, setBannerFile] = useState(null);

  // Portfolio state (Renamed from Projects)
  const [portfolio, setPortfolio] = useState(user?.portfolio || user?.projects || []);
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pTech, setPTech] = useState("");
  const [pLive, setPLive] = useState("");
  const [pGit, setPGit] = useState("");
  const [pFeatured, setPFeatured] = useState(false);
  const [pThumb, setPThumb] = useState(null);
  const [pThumbPreview, setPThumbPreview] = useState("");
  const [pAdding, setPAdding] = useState(false);
  const [showPForm, setShowPForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const isEditingProject = !!editingProjectId;

  const [currentPwd, setCurrPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [saving, setSaving] = useState(false);
  const [pwdSaving, setPwdSave] = useState(false);
  const [pDragging, setPDragging] = useState(false);

  const fileRef = useRef(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isManuallyDirty, setIsManuallyDirty] = useState(false);

  // Sync state when user data is fetched (important for refresh)
  useEffect(() => {
    if (user && !hasInitialized) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setHeadline(user.headline || "");
      setBio(user.bio || "");
      setUsername(user.username || "");
      setPhoneNumber(user.phoneNumber || "");
      setIsPublic(user.isPublic || false);
      setSocialLinks(
        user.socialLinks || {
          linkedin: "",
          github: "",
          twitter: "",
          portfolio: "",
        },
      );
      setPortfolio(user.portfolio || user.projects || []);
      setExperience(user.experience || []);
      setEducation(user.education || []);
      setSkills(user.skills || []);
      setCertifications(user.certifications || []);
      setAchievements(user.achievements || []);
      setPortfolio(user.portfolio || user.projects || []);
      setAvailability(user.availability || "Open to Work");
      setIndustry(user.industry || "Other");
      setPrivacy(user.privacy || { visibility: "Public", showPhone: false, showEmail: true });
      setServices(user.services || []);
      setSectionNames(
        user.sectionNames || {
          experience: "Professional Experience",
          education: "Education History",
          skills: "Expertise & Skills",
          portfolio: "Work Portfolio",
          services: "Professional Services",
          languages: "Languages",
          certifications: "Certifications",
          achievements: "Honors & Awards",
        },
      );
      setLanguages(user.languages || []);
      setLocation(user.location || "");
      setPreview(user.profileImage || "");
      setThemeSettings(
        user.themeSettings || {
          headerBg: "#2563eb",
          headerBgSecondary: "#9333ea",
          bodyBg: "#0f172a",
          cardStyle: "glass",
          fontPrimary: "Inter",
          bannerUrl: "",
          bannerOpacity: 95,
          textPrimary: "#ffffff",
          textSecondary: "#94a3b8",
          accentColor: "#2563eb",
        },
      );
      setHasInitialized(true);
    }
  }, [user, hasInitialized]);

  // Headers are handled by axios interceptor

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be under 4MB.");
      return;
    }
    setImgFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ── Save profile info ──
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      return toast.error("First and last name are required.");
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("firstName", firstName.trim());
      fd.append("lastName", lastName.trim());
      fd.append("headline", headline.trim());
      fd.append("bio", bio);
      fd.append("username", username);
      fd.append("phoneNumber", phoneNumber);
      fd.append("isPublic", String(isPublic));
      fd.append("socialLinks[linkedin]", socialLinks.linkedin);
      fd.append("socialLinks[github]", socialLinks.github);
      fd.append("socialLinks[twitter]", socialLinks.twitter);
      fd.append("socialLinks[portfolio]", socialLinks.portfolio);

      // Phase 5 Fields (Handling objects/arrays as JSON or indexed keys)
      fd.append("location", location.trim());
      // For simplicity in Multer/Express with complex nested objects, we can use JSON.stringify for some or indexed fields
      // Here we'll use JSON.stringify for complex arrays to avoid manual indexing of 10+ fields
      fd.append("experience", JSON.stringify(experience));
      fd.append("education", JSON.stringify(education));
      fd.append("skills", JSON.stringify(skills));
      fd.append("portfolio", JSON.stringify(portfolio));
      fd.append("certifications", JSON.stringify(certifications));
      fd.append("achievements", JSON.stringify(achievements));
      fd.append("services", JSON.stringify(services));
      fd.append("languages", JSON.stringify(languages));
      fd.append("sectionNames", JSON.stringify(sectionNames));
      fd.append("themeSettings", JSON.stringify(themeSettings));
      fd.append("availability", availability);
      fd.append("industry", industry);
      fd.append("privacy", JSON.stringify(privacy));

      if (imageFile) fd.append("profileImage", imageFile);
      if (bannerFile) fd.append("bannerImage", bannerFile);

      const res = await api.patch("/auth/profile", fd);
      const data = res.data;

      if (data.user) {
        dispatch(updateUser(data.user));
        setImgFile(null);
        toast.success("✅ Profile updated successfully!", { duration: 3000 });
        
        // --- IndexNow Automation ---
        if (data.user.isPublic && data.user.username) {
          try {
            api.post("/index-now", { 
              newUrl: `https://cvifypro.vercel.app/p/${data.user.username}` 
            }).catch(e => console.error("IndexNow ping failed:", e));
          } catch (err) {
            // Silently fail if Bing ping errors out so user experience is not affected
          }
        }
      } else {
        throw new Error("No user data returned from server.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsManuallyDirty(false);
      setSaving(false);
    }
  };

  // ── Password Validation Helper ──
  const validatePassword = (pwd) => ({
    length: pwd.length >= 7,
    hasUpper: /[A-Z]/.test(pwd),
    hasLower: /[a-z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd),
    hasSpecial: /[@$!%*?&._]/.test(pwd),
  });

  const pwdChecks = validatePassword(newPwd);
  const isPwdValid = Object.values(pwdChecks).every(Boolean);
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!pTitle.trim()) return toast.error("Project title is required.");
    setPAdding(true);
    try {
      const fd = new FormData();
      fd.append("title", pTitle.trim());
      fd.append("description", pDesc.trim());
      fd.append("techStack", pTech);
      fd.append("liveLink", pLive);
      fd.append("githubLink", pGit);
      fd.append("isFeatured", pFeatured);
      if (pThumb) fd.append("thumbnail", pThumb);

      let res;
      if (isEditingProject) {
        res = await api.patch(`/auth/projects/${editingProjectId}`, fd);
        if (res.data.project) {
          setPortfolio(
            portfolio.map((p) =>
              p._id === editingProjectId ? res.data.project : p,
            ),
          );
          toast.success("Project updated!");
        }
      } else {
        res = await api.post("/auth/projects", fd);
        if (res.data.project) {
          setPortfolio([...portfolio, res.data.project]);
          toast.success("Project added!");
        }
      }

      // Reset form
      setPTitle("");
      pDesc && setPDesc("");
      pTech && setPTech("");
      pLive && setPLive("");
      pGit && setPGit("");
      setPFeatured(false);
      setPThumb(null);
      setPThumbPreview("");
      setShowPForm(false);
      setEditingProjectId(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPAdding(false);
    }
  };

  const handleEditProject = (proj) => {
    setEditingProjectId(proj._id);
    setPTitle(proj.title || "");
    setPDesc(proj.description || "");
    setPTech(proj.techStack?.join(", ") || "");
    setPLive(proj.liveLink || "");
    setPGit(proj.githubLink || "");
    setPFeatured(proj.isFeatured || false);
    setPThumbPreview(proj.thumbnail || "");
    setShowPForm(true);
    // Scroll to form
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  const handleDeleteProject = async (pid) => {
    try {
      await api.delete(`/auth/projects/${pid}`);
      setPortfolio(portfolio.filter((p) => p._id !== pid));
      toast.success("Project removed.");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPwd) return toast.error("Please enter your current password.");
    if (!isPwdValid)
      return toast.error(
        "Password must be at least 7 characters and include uppercase, lowercase, a number, and a special character.",
      );
    if (newPwd !== confirmPwd)
      return toast.error("New passwords do not match.");
    if (currentPwd === newPwd)
      return toast.error("New password must differ from current password.");

    setPwdSave(true);
    try {
      const res = await api.patch("/auth/profile", {
        currentPassword: currentPwd,
        newPassword: newPwd,
      });
      const data = res.data;

      setCurrPwd("");
      setNewPwd("");
      setConfPwd("");
      toast.success("🔐 Password changed successfully!", {
        duration: 4000,
        icon: "✅",
        style: { fontWeight: "700" },
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPwdSave(false);
    }
  };

  const pwdStrength =
    newPwd.length === 0
      ? 0
      : newPwd.length < 6
        ? 1
        : newPwd.length < 10
          ? 2
          : 3;
  const pwdColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400"][
    pwdStrength
  ];
  const pwdLabel = ["", "Weak", "Good", "Strong"][pwdStrength];

  const isDeepDirty = useMemo(() => {
    if (!user) return false;
    return (
      firstName !== (user.firstName || "") ||
      lastName !== (user.lastName || "") ||
      headline !== (user.headline || "") ||
      bio !== (user.bio || "") ||
      username !== (user.username || "") ||
      phoneNumber !== (user.phoneNumber || "") ||
      isPublic !== (user.isPublic || false) ||
      location !== (user.location || "") ||
      industry !== (user.industry || "Other") ||
      !isEqual(privacy, user.privacy || { visibility: "Public", showPhone: false, showEmail: true }) ||
      !isEqual(socialLinks, user.socialLinks || { linkedin: "", github: "", twitter: "", portfolio: "" }) ||
      !isEqual(experience, user.experience || []) ||
      !isEqual(education, user.education || []) ||
      !isEqual(skills, user.skills || []) ||
      !isEqual(portfolio, user.portfolio || user.projects || []) ||
      !isEqual(certifications, user.certifications || []) ||
      !isEqual(achievements, user.achievements || []) ||
      !isEqual(services, user.services || []) ||
      !isEqual(languages, user.languages || []) ||
      !isEqual(sectionNames, user.sectionNames || { 
        experience: "Professional Experience", 
        education: "Education History", 
        skills: "Expertise & Skills", 
        portfolio: "Work Portfolio", 
        services: "Professional Services",
        languages: "Languages",
        certifications: "Certifications",
        achievements: "Honors & Awards"
      }) ||
      !isEqual(themeSettings, user.themeSettings || {
        headerBg: "#2563eb",
        headerBgSecondary: "#9333ea",
        bodyBg: "#0f172a",
        cardStyle: "glass",
        fontPrimary: "Inter",
        bannerUrl: "",
        bannerOpacity: 95,
        textPrimary: "#ffffff",
        textSecondary: "#94a3b8",
        accentColor: "#2563eb",
      }) ||
      !!imageFile ||
      !!bannerFile
    );
  }, [
    user, firstName, lastName, headline, bio, username, phoneNumber, isPublic, location, industry, privacy,
    socialLinks, experience, education, skills, portfolio, certifications, achievements,
    services, languages, sectionNames, themeSettings, imageFile, bannerFile
  ]);

  const isDirty = isManuallyDirty || isDeepDirty;

  // ─── Profile Strength Logic ───
  const profileStrength = useMemo(() => {
    let score = 0;
    if (user?.profileImage) score += 10;
    if (headline) score += 10;
    if (bio) score += 10;
    if (industry !== "Other") score += 10;
    if (skills.length > 0) score += 15;
    if (experience.length > 0) score += 15;
    if (education.length > 0) score += 10;
    if (portfolio.length > 0) score += 10;
    if (certifications.length > 0 || achievements.length > 0) score += 10;
    return Math.min(score, 100);
  }, [user, headline, bio, industry, skills, experience, education, portfolio, certifications, achievements]);

  const strengthColor = profileStrength < 40 ? "bg-red-500" : profileStrength < 75 ? "bg-amber-500" : "bg-emerald-500";
  const strengthLabel = profileStrength < 40 ? "Weak" : profileStrength < 75 ? "Good" : "Excellent";

  return (
    <div className="min-h-screen bg-foreground dark:bg-midnight p-6 md:p-8 pb-32 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* ── Hero Header ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-action/80 to-violet-600 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar with edit overlay */}
            <div className="relative group flex-shrink-0">
              <Avatar
                src={previewImg}
                name={`${firstName} ${lastName}`}
                size="lg"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center text-white text-xs font-black"
              >
                📷 Change
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-black tracking-tight">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-white/70 text-sm mt-1 font-medium">
                {user?.email}
              </p>

              {/* Diamond Badge */}
              <div className="inline-flex items-center gap-2 mt-3 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="text-lg">💎</span>
                <span className="font-black text-sm">
                  {user?.diamonds ?? 0} Diamonds
                </span>
                <span className="text-white/50 text-xs font-medium">
                  Credits
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Profile Analytics (Private to Owner) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-white/5 shadow-sm text-center">
            <p className="text-2xl font-black text-action">{user?.stats?.profileViews ?? 0}</p>
            <p className="text-[10px] font-black uppercase text-text-muted mt-1">Profile Views</p>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-white/5 shadow-sm text-center">
            <p className="text-2xl font-black text-emerald-500">{user?.stats?.resumeDownloads ?? 0}</p>
            <p className="text-[10px] font-black uppercase text-text-muted mt-1">Downloads</p>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-white/5 shadow-sm text-center">
            <p className="text-2xl font-black text-violet-500">{user?.stats?.contactClicks ?? 0}</p>
            <p className="text-[10px] font-black uppercase text-text-muted mt-1">Contacts</p>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-white/5 shadow-sm text-center flex flex-col justify-center">
             <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-lg">
               <span>💎</span> {user?.diamonds ?? 0}
             </div>
             <p className="text-[10px] font-black uppercase text-text-muted mt-1">Credits</p>
          </div>
        </div>

        {/* ── Profile Strength Indicator ── */}
        <Card variant="standard" className="border-action/20 bg-action/5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Profile Strength: {strengthLabel}</h3>
            <span className="text-sm font-black text-action">{profileStrength}%</span>
          </div>
          <div className="w-full h-3 bg-action/10 rounded-full overflow-hidden border border-action/10">
            <div 
              style={{ width: `${profileStrength}%` }}
              className={`h-full ${strengthColor} transition-all duration-1000`}
            />
          </div>
          <div className="mt-4">
            {profileStrength < 100 && (
              <p className="text-[10px] font-bold text-text-muted flex items-center gap-2">
                <span className="text-action">💡 Tip:</span> 
                {profileStrength < 40 ? "Add your professional experience and skills to get noticed." : 
                 profileStrength < 75 ? "Adding certifications and a work portfolio boosts your credibility by 30%." :
                 "Almost there! Add honors & awards to finalize your online identity."}
              </p>
            )}
          </div>
        </Card>

        {/* ── Share Profile ── */}
        {user?.username && (
          <Card variant="standard" className="bg-gradient-to-br from-action/10 to-violet-500/10 border-action/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-midnight rounded-2xl flex items-center justify-center text-action shadow-sm border border-action/10">
                  <FaGlobe size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-text-primary">
                    Your Portfolio is Live!
                  </h3>
                  <p className="text-[10px] text-text-muted font-bold">
                    Share this link with recruiters and on LinkedIn.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <code className="flex-1 sm:flex-none text-[10px] font-black p-2 bg-white dark:bg-midnight rounded-xl border border-action/10 truncate max-w-[200px]">
                  cvify.pro/p/{user.username}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://app-cvifypro.vercel.app/p/${user.username}`,
                    );
                    toast.success("Link copied to clipboard!");
                  }}
                  className="px-6 py-2.5 bg-action text-white font-black text-xs rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-action/20"
                >
                  <FaShareAlt /> Copy Link
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* ── Portfolio Branding ── */}
        <Card variant="standard">
          <SectionTitle icon="🚀" title="Portfolio Branding" />
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4 bg-action/5 p-4 rounded-2xl border border-action/10">
              <div>
                <h4 className="text-sm font-black text-text-primary">
                  Public Profile
                </h4>
                <p className="text-[10px] text-text-muted font-bold">
                  Make your profile visible to recruiters
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ring-transparent ${isPublic ? "bg-action" : "bg-border-subtle"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublic ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Custom Username (URL Slug)
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted text-sm font-bold">
                  cvify.pro/p/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setIsManuallyDirty(true);
                  }}
                  placeholder="your-name"
                  className="w-full pl-28 pr-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Availability Status
              </label>
              <select
                value={availability}
                onChange={(e) => {
                  setAvailability(e.target.value);
                  setIsManuallyDirty(true);
                }}
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
              >
                <option value="Open to Work">🟢 Open to Work</option>
                <option value="Freelance Available">⚡ Freelance Available</option>
                <option value="Available for Internship">🎓 Available for Internship</option>
                <option value="Currently Employed">💼 Currently Employed</option>
                <option value="Not Available">🔴 Not Available</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Your Industry
              </label>
              <select
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value);
                  setIsManuallyDirty(true);
                }}
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
              >
                {[
                  "Technology",
                  "Healthcare",
                  "Education",
                  "Finance",
                  "Administration",
                  "Marketing",
                  "Engineering",
                  "Design",
                  "Legal",
                  "Retail",
                  "Other",
                ].map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Professional Headline
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => {
                  setHeadline(e.target.value);
                  setIsManuallyDirty(true);
                }}
                placeholder="e.g. Senior Frontend Developer | React Specialist"
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setIsManuallyDirty(true);
                }}
                placeholder="e.g. Lahore, Pakistan"
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Bio / About Me
              </label>
              <textarea
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  setIsManuallyDirty(true);
                }}
                placeholder="E.g., Experienced banker with 10 years in retail banking... or MERN stack developer specialized in AI..."
                className="w-full px-5 py-3.5 h-32 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm resize-none"
              />
            </div>
          </div>
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Theme Editor ── */}
        <Card variant="standard">
          <SectionTitle icon={<FaPalette />} title="Portfolio Theme Editor" />
          <ThemeEditor
            settings={themeSettings}
            saving={saving}
            onUpdate={(updated, file) => {
              setThemeSettings(updated);
              if (file) setBannerFile(file);
              setIsManuallyDirty(true);
            }}
          />
        </Card>

        {/* ── Social Links ── */}
        <Card variant="standard">
          <SectionTitle icon="🔗" title="Social Presence" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(socialLinks).map((platform) => (
              <div key={platform} className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 capitalize">
                  {platform}
                </label>
                <input
                  type="text"
                  value={socialLinks[platform]}
                  onChange={(e) => {
                    setSocialLinks({
                      ...socialLinks,
                      [platform]: e.target.value,
                    });
                    setIsManuallyDirty(true);
                  }}
                  placeholder={`${platform} URL`}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
                />
              </div>
            ))}
          </div>
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Personal Info ── */}
        <Card variant="standard">
          <SectionTitle icon="👤" title="Personal Information" />
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                  First Name
                </label>
                <input
                  id="profile-first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setIsManuallyDirty(true);
                  }}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                  Last Name
                </label>
                <input
                  id="profile-last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setIsManuallyDirty(true);
                  }}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Mobile Number
              </label>
              <input
                type="text"
                value={phoneNumber || ""}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setIsManuallyDirty(true);
                }}
                placeholder="e.g. +92 300 1234567"
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold text-sm"
              />
            </div>

            {/* Email — Read Only */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                  Email Address
                </label>
                <span className="text-[9px] font-black bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200/50 dark:border-amber-800/30">
                  🔒 Locked
                </span>
              </div>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                readOnly
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-dashed border-border-subtle bg-foreground/30 dark:bg-midnight/20 text-text-muted font-semibold text-sm cursor-not-allowed opacity-75"
              />
              <p className="text-[10px] text-text-muted/60 font-bold ml-1">
                Email cannot be changed to maintain account security.
              </p>
            </div>

            {/* Photo upload hint */}
            {imageFile && (
              <div className="flex items-center gap-3 p-3 bg-action/5 dark:bg-accent/5 rounded-2xl border border-action/20">
                <img
                  src={previewImg}
                  alt="Preview"
                  className="w-10 h-10 rounded-xl object-cover object-top"
                />
                <div>
                  <p className="text-xs font-black text-action">
                    {imageFile.name}
                  </p>
                  <p className="text-[10px] text-text-muted">Ready to upload</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImgFile(null);
                    setPreview(user?.profileImage || "");
                  }}
                  className="ml-auto text-red-400 hover:text-red-500 text-lg"
                >
                  ×
                </button>
              </div>
            )}
          </form>
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Diamond Ledger ── */}
        <Card variant="standard">
          <SectionTitle icon="💎" title="Diamond Balance" />
          <div className="flex items-center gap-6">
            <div className="flex-1 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 rounded-2xl p-5 border border-violet-100 dark:border-violet-800/30">
              <p className="text-4xl font-black text-violet-600 dark:text-violet-400">
                {user?.diamonds ?? 0}
                <span className="text-lg ml-2">💎</span>
              </p>
              <p className="text-xs font-bold text-text-muted mt-1">
                Current Balance
              </p>
            </div>
            <div className="space-y-2 text-xs font-bold text-text-muted">
              <p>💎 +100 on signup</p>
              <p>💎 +50 per referral</p>
              <p>💎 +20 monthly bonus</p>
            </div>
          </div>
        </Card>

        {/* ── Change Password ── */}
        <Card variant="standard">
          <SectionTitle icon="🔐" title="Change Password" />
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Current Password
              </label>
              <input
                id="current-password"
                type={showPwd ? "text" : "password"}
                value={currentPwd}
                onChange={(e) => setCurrPwd(e.target.value)}
                placeholder="Your current password"
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password-profile"
                  type={showPwd ? "text" : "password"}
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full px-5 py-3.5 pr-12 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-action transition-colors"
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>

              {/* Secure Password Checklist */}
              {newPwd.length > 0 && (
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 p-4 mt-2 bg-foreground/30 dark:bg-midnight/20 rounded-2xl border border-border-subtle animate-fadeIn">
                  {[
                    { label: "7+ Characters", met: pwdChecks.length },
                    { label: "1 Number", met: pwdChecks.hasNumber },
                    {
                      label: "Upper & Lower",
                      met: pwdChecks.hasUpper && pwdChecks.hasLower,
                    },
                    { label: "Special Char", met: pwdChecks.hasSpecial },
                  ].map((check, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${check.met ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400"}`}
                      >
                        {check.met ? "✓" : "•"}
                      </div>
                      <span
                        className={`text-[10px] font-black tracking-tight ${check.met ? "text-emerald-500" : "text-text-muted"}`}
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Confirm New Password
              </label>
              <input
                id="confirm-new-password"
                type={showPwd ? "text" : "password"}
                value={confirmPwd}
                onChange={(e) => setConfPwd(e.target.value)}
                placeholder="Repeat new password"
                className={`w-full px-5 py-3.5 rounded-2xl border-2 bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold text-sm ${
                  confirmPwd && confirmPwd !== newPwd
                    ? "border-red-400 dark:border-red-600"
                    : "border-border-subtle focus:border-action dark:focus:border-accent"
                }`}
              />
              {confirmPwd && confirmPwd !== newPwd && (
                <p className="text-[10px] text-red-400 font-bold ml-1">
                  Passwords don't match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={pwdSaving}
              className="w-full sm:w-auto px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-50"
            >
              {pwdSaving ? "Updating..." : "🔐 Update Password"}
            </button>
          </form>
        </Card>

        {/* ── Work Portfolio ── */}
        <Card id="portfolio-section">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🚀</span>
              <input
                type="text"
                value={sectionNames.portfolio || "Work Portfolio"}
                onChange={(e) =>
                  setSectionNames({
                    ...sectionNames,
                    portfolio: e.target.value,
                  })
                }
                className="font-black text-sm text-text-muted uppercase tracking-[0.2em] bg-transparent border-b-2 border-dashed border-border-subtle focus:border-action outline-none w-full md:w-64"
                title="Click to rename section"
              />
            </div>
            <button
              onClick={() => {
                setShowPForm(!showPForm);
                if (isEditingProject) {
                  setEditingProjectId(null);
                  setPTitle("");
                  setPDesc("");
                  setPTech("");
                  setPLive("");
                  setPGit("");
                  setPFeatured(false);
                  setPThumb(null);
                  setPThumbPreview("");
                }
              }}
              className="text-xs font-black bg-action text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all w-fit"
            >
              {showPForm ? "Cancel" : "+ Add Accomplishment"}
            </button>
          </div>

          {showPForm && (
            <form
              onSubmit={handleSaveProject}
              className="mb-10 p-6 bg-action/5 border border-action/20 rounded-3xl space-y-4 animate-fadeIn"
            >
              <h4 className="text-xs font-black text-action uppercase tracking-widest mb-2">
                {isEditingProject
                  ? "Edit Accomplishment"
                  : "Add New Accomplishment"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase ml-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    placeholder="E.g., Annual Sales Meet / Smart Home App"
                    className="w-full px-5 py-3 rounded-2xl border-2 border-border-subtle bg-white dark:bg-midnight/30 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase ml-1">
                    Skills / Tools
                  </label>
                  <input
                    type="text"
                    value={pTech}
                    onChange={(e) => setPTech(e.target.value)}
                    placeholder="E.g., Event Planning, Management"
                    className="w-full px-5 py-3 rounded-2xl border-2 border-border-subtle bg-white dark:bg-midnight/30 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase ml-1">
                  Description
                </label>
                <textarea
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  placeholder="What did you build?"
                  className="w-full px-5 py-3 h-24 rounded-2xl border-2 border-border-subtle bg-white dark:bg-midnight/30 text-sm resize-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={pLive}
                  onChange={(e) => setPLive(e.target.value)}
                  placeholder="Live Link"
                  className="w-full px-5 py-3 rounded-2xl border-2 border-border-subtle bg-white dark:bg-midnight/30 text-sm"
                />
                <input
                  type="text"
                  value={pGit}
                  onChange={(e) => setPGit(e.target.value)}
                  placeholder="GitHub Link"
                  className="w-full px-5 py-3 rounded-2xl border-2 border-border-subtle bg-white dark:bg-midnight/30 text-sm"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase ml-1">
                  Thumbnail / Cover Image
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setPDragging(true);
                  }}
                  onDragLeave={() => setPDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setPDragging(false);
                    const f = e.dataTransfer.files[0];
                    if (f && f.type.startsWith("image/")) {
                      setPThumb(f);
                      setPThumbPreview(URL.createObjectURL(f));
                    }
                  }}
                  onClick={() => document.getElementById("pThumbInput").click()}
                  className={`relative group h-40 rounded-[2.5rem] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden ${
                    pDragging
                      ? "border-action bg-action/10 scale-[0.99]"
                      : "border-border-subtle bg-foreground/5 hover:border-action/50"
                  }`}
                >
                  <input
                    id="pThumbInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files[0];
                      if (f) {
                        setPThumb(f);
                        setPThumbPreview(URL.createObjectURL(f));
                      }
                    }}
                    className="hidden"
                  />

                  {pThumbPreview ? (
                    <>
                      <img
                        src={pThumbPreview}
                        className="absolute inset-0 w-full h-full object-cover opacity-30 blur-[2px]"
                      />
                      <div className="relative z-10 flex flex-col items-center gap-2 animate-fadeIn">
                        <img
                          src={pThumbPreview}
                          className="w-20 h-20 rounded-2xl object-cover shadow-2xl border-2 border-white/50"
                        />
                        <span className="text-[10px] font-black text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                          Replace Media
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-text-muted/40 group-hover:text-action/70 transition-colors">
                      <div className="relative">
                        <FaCloudUploadAlt
                          size={48}
                          className="opacity-20 group-hover:scale-110 transition-transform duration-500"
                        />
                        <FaImage
                          size={18}
                          className="absolute -bottom-1 -right-1 text-action opacity-0 group-hover:opacity-100 transition-all"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-[11px] font-black uppercase tracking-widest text-text-primary">
                          Drag & Drop Image Here
                        </p>
                        <p className="text-[9px] font-bold uppercase opacity-60">
                          Recommended: 1280x720 (Max 5MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="feat"
                    checked={pFeatured}
                    onChange={(e) => setPFeatured(e.target.checked)}
                    className="accent-action"
                  />
                  <label
                    htmlFor="feat"
                    className="text-[10px] font-black uppercase\"
                  >
                    Featured
                  </label>
                </div>
              </div>

              <button
                disabled={pAdding}
                type="submit"
                className="w-full py-3 bg-action text-white font-black rounded-2xl"
              >
                {pAdding
                  ? "Processing..."
                  : isEditingProject
                    ? "Update Project"
                    : "Publish Project"}
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolio.map((proj) => (
              <div
                key={proj._id}
                className="group relative bg-foreground/30 dark:bg-midnight/20 rounded-2xl p-4 border border-border-subtle hover:border-action/30 transition-all"
              >
                <div className="flex gap-4">
                  {proj.thumbnail ? (
                    <img
                      src={proj.thumbnail}
                      className="w-20 h-20 rounded-xl object-cover border border-white/10"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-action/5 flex items-center justify-center text-2xl">
                      📦
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-sm text-text-primary truncate">
                        {proj.title}
                      </h4>
                      {proj.isFeatured && (
                        <span className="text-[8px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-text-muted font-bold line-clamp-2 mt-1">
                      {proj.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          className="text-[9px] font-black text-action uppercase"
                        >
                          Live 🔗
                        </a>
                      )}
                      {proj.githubLink && (
                        <a
                          href={proj.githubLink}
                          target="_blank"
                          className="text-[9px] font-black text-text-muted uppercase"
                        >
                          Git 💻
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => handleEditProject(proj)}
                    className="p-2 text-action hover:bg-white dark:hover:bg-midnight rounded-lg transition-all"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj._id)}
                    className="p-2 text-red-400 hover:bg-white dark:hover:bg-midnight rounded-lg transition-all"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          {portfolio.length === 0 && !showPForm && (
            <p className="text-center py-10 text-xs font-bold text-text-muted italic">
              No projects added yet.
            </p>
          )}
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Experience Timeline ── */}
        <Card variant="standard">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">💼</span>
              <input
                type="text"
                value={sectionNames.experience}
                onChange={(e) =>
                  setSectionNames({
                    ...sectionNames,
                    experience: e.target.value,
                  })
                }
                className="font-black text-sm text-text-muted uppercase tracking-[0.2em] bg-transparent border-b-2 border-dashed border-border-subtle focus:border-action outline-none w-full md:w-64"
                title="Click to rename section"
              />
            </div>
            <button
              onClick={() => {
                setExperience([
                  ...experience,
                  {
                    company: "",
                    role: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    isCurrent: false,
                    achievements: "",
                    tools: [],
                  },
                ]);
              }}
              className="text-xs font-black bg-action text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all w-fit"
            >
              + Add role
            </button>
          </div>

          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 bg-foreground/30 dark:bg-midnight/20 rounded-2xl border-2 border-border-subtle space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">
                      Org / Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Standard Chartered / Government High School"
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = [...experience];
                        newExp[idx].company = e.target.value;
                        setExperience(newExp);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">
                      Professional Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Branch Manager / Receptionist"
                      value={exp.role}
                      onChange={(e) => {
                        const newExp = [...experience];
                        newExp[idx].role = e.target.value;
                        setExperience(newExp);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      value={toInputDate(exp.startDate)}
                      onChange={(e) => {
                        const newExp = [...experience];
                        newExp[idx].startDate = toDBDate(e.target.value);
                        setExperience(newExp);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm focus:border-action outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      disabled={exp.isCurrent}
                      value={exp.isCurrent ? "" : toInputDate(exp.endDate)}
                      onChange={(e) => {
                        const newExp = [...experience];
                        newExp[idx].endDate = toDBDate(e.target.value);
                        setExperience(newExp);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm focus:border-action outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-end pb-2 gap-2">
                    <input
                      type="checkbox"
                      id={`curr-${idx}`}
                      checked={exp.isCurrent}
                      onChange={(e) => {
                        const newExp = [...experience];
                        newExp[idx].isCurrent = e.target.checked;
                        if (e.target.checked) newExp[idx].endDate = "";
                        setExperience(newExp);
                      }}
                      className="accent-action"
                    />
                    <label
                      htmlFor={`curr-${idx}`}
                      className="text-[10px] font-black uppercase text-text-muted"
                    >
                      Present
                    </label>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-text-muted ml-1">
                    Key achievements / Outcome
                  </label>
                  <textarea
                    placeholder="E.g., Managed daily cash flow of $100k+ / Led classroom for 40+ students..."
                    value={exp.achievements}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[idx].achievements = e.target.value;
                      setExperience(newExp);
                    }}
                    className="w-full px-4 py-2 h-20 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-text-muted ml-1">
                    Tools / Competencies used
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MS Excel, Tally, Communication, Leadership"
                    value={exp.tools?.join(", ")}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[idx].tools = e.target.value
                        .split(",")
                        .map((t) => t.trim());
                      setExperience(newExp);
                    }}
                    className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                  />
                </div>
                <button
                  onClick={() =>
                    setExperience(experience.filter((_, i) => i !== idx))
                  }
                  className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:underline"
                >
                  Delete Role
                </button>
              </div>
            ))}
            {experience.length === 0 && (
              <p className="text-center py-6 text-[10px] font-bold text-text-muted italic bg-foreground/10 rounded-2xl">
                Click + Add Role to start your timeline
              </p>
            )}
          </div>
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Education ── */}
        <Card variant="standard">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎓</span>
              <input
                type="text"
                value={sectionNames.education}
                onChange={(e) =>
                  setSectionNames({
                    ...sectionNames,
                    education: e.target.value,
                  })
                }
                className="font-black text-sm text-text-muted uppercase tracking-[0.2em] bg-transparent border-b-2 border-dashed border-border-subtle focus:border-action outline-none w-full md:w-64"
              />
            </div>
            <button
              onClick={() => {
                setEducation([
                  ...education,
                  {
                    institution: "",
                    degree: "",
                    fieldOfStudy: "",
                    graduationDate: "",
                  },
                ]);
              }}
              className="text-xs font-black bg-action text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all w-fit"
            >
              + Add education
            </button>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 bg-foreground/30 dark:bg-midnight/20 rounded-2xl border-2 border-border-subtle space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[idx].institution = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[idx].degree = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.fieldOfStudy}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[idx].fieldOfStudy = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                  />
                  <input
                    type="month"
                    value={toInputDate(edu.graduationDate)}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[idx].graduationDate = toDBDate(e.target.value);
                      setEducation(newEdu);
                    }}
                    className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm focus:border-action outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-text-muted ml-1">
                    Description / Key Studies
                  </label>
                  <textarea
                    placeholder="E.g., Focused on distributed systems and cloud architecture..."
                    value={edu.description}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[idx].description = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="w-full px-4 py-2 h-20 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm resize-none"
                  />
                </div>
                <button
                  onClick={() =>
                    setEducation(education.filter((_, i) => i !== idx))
                  }
                  className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:underline"
                >
                  Delete Education
                </button>
              </div>
            ))}
            {education.length === 0 && (
              <p className="text-center py-6 text-[10px] font-bold text-text-muted italic bg-foreground/10 rounded-2xl">
                Tell recruiters about your academic background
              </p>
            )}
          </div>
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Skills & Services ── */}
        <Card variant="standard">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <span className="text-xl">🛠️</span>
              <input
                type="text"
                value={sectionNames.skills}
                onChange={(e) =>
                  setSectionNames({ ...sectionNames, skills: e.target.value })
                }
                className="font-black text-sm text-text-muted uppercase tracking-[0.2em] bg-transparent border-b-2 border-dashed border-border-subtle focus:border-action outline-none w-full md:w-64"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                id="newSkillName"
                placeholder="Add a skill (e.g. Patient Care, React, Sales)"
                className="flex-1 px-5 py-3 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = e.target.value.trim();
                    const cat = document.getElementById("newSkillCat").value;
                    if (val) {
                      setSkills([...skills, { name: val, category: cat }]);
                      e.target.value = "";
                      setIsManuallyDirty(true);
                    }
                  }
                }}
              />
              <select
                id="newSkillCat"
                className="px-5 py-3 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
              >
                <option value="Technical">Technical</option>
                <option value="Administrative">Administrative</option>
                <option value="Medical">Medical</option>
                <option value="Teaching">Teaching</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Other">Other</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  const name = document.getElementById("newSkillName").value.trim();
                  const cat = document.getElementById("newSkillCat").value;
                  if (name) {
                    setSkills([...skills, { name, category: cat }]);
                    document.getElementById("newSkillName").value = "";
                    setIsManuallyDirty(true);
                  }
                }}
                className="px-6 py-3 bg-action text-white font-black rounded-2xl hover:bg-blue-600 transition-all text-sm"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 bg-foreground/50 dark:bg-midnight/30 border border-border-subtle rounded-xl group"
                >
                  <span className="text-[10px] font-black uppercase text-text-muted opacity-50">{skill.category}</span>
                  <span className="text-xs font-bold text-text-primary">{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSkills(skills.filter((_, i) => i !== idx));
                      setIsManuallyDirty(true);
                    }}
                    className="text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all font-black"
                  >
                    ×
                  </button>
                </div>
              ))}
              {skills.length === 0 && (
                <p className="text-[10px] font-bold text-text-muted italic opacity-60">No skills added yet. Add skills to increase profile strength.</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                  <span className="text-action">💎</span> {sectionNames.services}
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setServices([...services, { title: "", description: "" }])
                  }
                  className="text-[10px] font-black bg-action/10 text-action px-3 py-1 rounded-full hover:bg-action hover:text-white transition-all transition-all"
                >
                  + Add Service
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {services.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 bg-foreground/30 dark:bg-midnight/20 rounded-2xl border-2 border-border-subtle group hover:border-action/30 transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-action/20 to-violet-500/20 flex items-center justify-center text-action shadow-inner group-hover:scale-110 transition-transform duration-500 hover:rotate-12">
                      <FaCheckCircle className="text-sm" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Service Title (e.g. Lead Generation)"
                        value={s.title}
                        onChange={(e) => {
                          const newS = [...services];
                          newS[idx].title = e.target.value;
                          setServices(newS);
                        }}
                        className="w-full bg-transparent font-black text-sm text-text-primary outline-none focus:border-b border-action/30"
                      />
                      <textarea
                        placeholder="Brief description of the service..."
                        value={s.description}
                        onChange={(e) => {
                          const newS = [...services];
                          newS[idx].description = e.target.value;
                          setServices(newS);
                        }}
                        className="w-full bg-transparent text-[10px] font-bold text-text-muted outline-none resize-none h-12"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setServices(services.filter((_, i) => i !== idx))
                      }
                      className="self-start text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
                {services.length === 0 && (
                  <p className="text-center py-6 text-[10px] font-bold text-text-muted italic bg-foreground/10 rounded-2xl">
                    Add specific services or offerings to show your value.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* ── Certifications ── */}
        <Card variant="standard">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">📜</span>
              <input
                type="text"
                value={sectionNames.certifications || "Certifications"}
                onChange={(e) =>
                  setSectionNames({ ...sectionNames, certifications: e.target.value })
                }
                className="font-black text-sm text-text-muted uppercase tracking-[0.2em] bg-transparent border-b-2 border-dashed border-border-subtle focus:border-action outline-none w-full md:w-64"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setCertifications([
                  ...certifications,
                  { name: "", issuer: "", date: "", link: "", description: "" },
                ]);
                setIsManuallyDirty(true);
              }}
              className="text-xs font-black bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition-all w-fit"
            >
              + Add certificate
            </button>
          </div>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-6 bg-foreground/30 dark:bg-midnight/20 rounded-2xl border-2 border-border-subtle space-y-4 relative group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">Certificate Name</label>
                    <input
                      placeholder="e.g. AWS Solutions Architect"
                      value={cert.name}
                      onChange={(e) => {
                        const newCerts = [...certifications];
                        newCerts[idx].name = e.target.value;
                        setCertifications(newCerts);
                        setIsManuallyDirty(true);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">Issuing Org</label>
                    <input
                      placeholder="e.g. Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => {
                        const newCerts = [...certifications];
                        newCerts[idx].issuer = e.target.value;
                        setCertifications(newCerts);
                        setIsManuallyDirty(true);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">Issue Date</label>
                    <input
                      type="month"
                      value={toInputDate(cert.date)}
                      onChange={(e) => {
                        const newCerts = [...certifications];
                        newCerts[idx].date = toDBDate(e.target.value);
                        setCertifications(newCerts);
                        setIsManuallyDirty(true);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">Link (Optional)</label>
                    <input
                      placeholder="Verify Link"
                      value={cert.link}
                      onChange={(e) => {
                        const newCerts = [...certifications];
                        newCerts[idx].link = e.target.value;
                        setCertifications(newCerts);
                        setIsManuallyDirty(true);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCertifications(certifications.filter((_, i) => i !== idx));
                    setIsManuallyDirty(true);
                  }}
                  className="absolute top-2 right-2 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg"
                >
                  🗑️
                </button>
              </div>
            ))}
            {certifications.length === 0 && (
              <p className="text-center py-6 text-[10px] font-bold text-text-muted italic bg-foreground/10 rounded-2xl">Add professional certifications or training.</p>
            )}
          </div>
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Achievements ── */}
        <Card variant="standard">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏆</span>
              <input
                type="text"
                value={sectionNames.achievements || "Honors & Awards"}
                onChange={(e) =>
                  setSectionNames({ ...sectionNames, achievements: e.target.value })
                }
                className="font-black text-sm text-text-muted uppercase tracking-[0.2em] bg-transparent border-b-2 border-dashed border-border-subtle focus:border-action outline-none w-full md:w-64"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setAchievements([...achievements, { title: "", date: "", description: "" }]);
                setIsManuallyDirty(true);
              }}
              className="text-xs font-black bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition-all w-fit"
            >
              + Add achievement
            </button>
          </div>

          <div className="space-y-4">
            {achievements.map((ach, idx) => (
              <div key={idx} className="p-6 bg-foreground/30 dark:bg-midnight/20 rounded-2xl border-2 border-border-subtle space-y-4 relative group">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">Title</label>
                    <input
                      placeholder="e.g. Employee of the Month"
                      value={ach.title}
                      onChange={(e) => {
                        const newAchs = [...achievements];
                        newAchs[idx].title = e.target.value;
                        setAchievements(newAchs);
                        setIsManuallyDirty(true);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-text-muted ml-1">Date</label>
                    <input
                      type="month"
                      value={toInputDate(ach.date)}
                      onChange={(e) => {
                        const newAchs = [...achievements];
                        newAchs[idx].date = toDBDate(e.target.value);
                        setAchievements(newAchs);
                        setIsManuallyDirty(true);
                      }}
                      className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-text-muted ml-1">Description</label>
                  <textarea
                    placeholder="Briefly describe the significance..."
                    value={ach.description}
                    onChange={(e) => {
                      const newAchs = [...achievements];
                      newAchs[idx].description = e.target.value;
                      setAchievements(newAchs);
                      setIsManuallyDirty(true);
                    }}
                    className="w-full px-4 py-2 h-20 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm resize-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAchievements(achievements.filter((_, i) => i !== idx));
                    setIsManuallyDirty(true);
                  }}
                  className="absolute top-2 right-2 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-lg"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Privacy & Visibility ── */}
        <Card variant="standard">
          <SectionTitle icon="🔏" title="Privacy & Settings" />
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                  Profile Visibility
                </label>
                <select
                  value={privacy.visibility}
                  onChange={(e) => {
                    setPrivacy({ ...privacy, visibility: e.target.value });
                    setIsManuallyDirty(true);
                  }}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action outline-none transition-all font-semibold text-sm"
                >
                  <option value="Public">🌍 Public (Everyone)</option>
                  <option value="Recruiter Only">💼 Recruiter Only</option>
                  <option value="Private">🔒 Private (Me Only)</option>
                </select>
              </div>

              <div className="flex flex-col justify-center space-y-4 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={privacy.showEmail}
                    onChange={(e) => {
                      setPrivacy({ ...privacy, showEmail: e.target.checked });
                      setIsManuallyDirty(true);
                    }}
                    className="w-5 h-5 rounded-lg border-2 border-border-subtle checked:bg-action checked:border-action transition-all cursor-pointer"
                  />
                  <span className="text-xs font-bold text-text-primary group-hover:text-action transition-colors">Show Email publicly</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={privacy.showPhone}
                    onChange={(e) => {
                      setPrivacy({ ...privacy, showPhone: e.target.checked });
                      setIsManuallyDirty(true);
                    }}
                    className="w-5 h-5 rounded-lg border-2 border-border-subtle checked:bg-action checked:border-action transition-all cursor-pointer"
                  />
                  <span className="text-xs font-bold text-text-primary group-hover:text-action transition-colors">Show Phone Number publicly</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        <hr className="border-border-subtle/50 my-2" />

        {/* ── Languages ── */}
        <Card variant="standard">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌐</span>
              <input
                type="text"
                value={sectionNames.languages || "Languages"}
                onChange={(e) =>
                  setSectionNames({
                    ...sectionNames,
                    languages: e.target.value,
                  })
                }
                className="font-black text-sm text-text-muted uppercase tracking-[0.2em] bg-transparent border-b-2 border-dashed border-border-subtle focus:border-action outline-none w-full md:w-64"
              />
            </div>
            <button
              onClick={() => {
                setLanguages([
                  ...languages,
                  { name: "", proficiency: "Advanced" },
                ]);
              }}
              className="text-xs font-black bg-action text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all w-fit"
            >
              + Add language
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="p-4 bg-foreground/30 dark:bg-midnight/20 rounded-2xl border-2 border-border-subtle flex flex-col gap-3 relative group"
              >
                <input
                  type="text"
                  placeholder="Language (e.g. English, Urdu)"
                  value={lang.name}
                  onChange={(e) => {
                    const newLangs = [...languages];
                    newLangs[idx].name = e.target.value;
                    setLanguages(newLangs);
                  }}
                  className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-sm font-bold"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) => {
                    const newLangs = [...languages];
                    newLangs[idx].proficiency = e.target.value;
                    setLanguages(newLangs);
                  }}
                  className="w-full px-4 py-2 rounded-xl border border-border-subtle bg-white dark:bg-black/20 text-xs font-black uppercase tracking-widest text-action"
                >
                  <option value="Native">Native</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Professional">Professional</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    setLanguages(languages.filter((_, i) => i !== idx))
                  }
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  ×
                </button>
              </div>
            ))}
            {languages.length === 0 && (
              <div className="sm:col-span-2 text-center py-6 text-[10px] font-bold text-text-muted italic bg-foreground/10 rounded-2xl">
                Add your language proficiency (Native, Beginner, etc.)
              </div>
            )}
          </div>
        </Card>

        {/* ── Referral Info ── */}
        {user?.referralCode && (
          <Card variant="standard">
            <SectionTitle icon="🎁" title="Your Referral Code" />
            <div className="flex items-center gap-3">
              <code className="flex-1 text-lg font-black text-action dark:text-accent bg-action/5 dark:bg-accent/10 px-5 py-3 rounded-2xl border border-action/10 dark:border-accent/20 tracking-wider">
                {user.referralCode.toUpperCase()}
              </code>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    user.referralCode.toUpperCase(),
                  );
                  toast.success("Referral code copied!");
                }}
                className="px-4 py-3 bg-action/10 hover:bg-action/20 text-action dark:text-accent font-black rounded-2xl transition-all text-sm"
              >
                📋 Copy
              </button>
            </div>
            <p className="text-[10px] font-bold text-text-muted mt-3 ml-1">
              Share this code with friends. Both of you earn{" "}
              <strong className="text-violet-500">+50 💎</strong> when they sign
              up!
            </p>
          </Card>
        )}
      </div>

      {/* ── Sticky Save Footer ── */}
      {isDirty && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-action/20 p-4 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-action/10 rounded-xl flex items-center justify-center text-xl animate-pulse">
                ✨
              </div>
              <div>
                <p className="text-xs font-black text-text-primary uppercase tracking-widest">
                  Unsaved Changes
                </p>
                <p className="text-[10px] text-text-muted font-bold">
                  Your profile has pending transformations.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setHasInitialized(false);
                  setIsManuallyDirty(false);
                }}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-foreground dark:bg-slate-800 text-text-primary font-black text-xs rounded-xl hover:bg-foreground/80 transition-all border border-border-subtle"
              >
                Reset
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-[2] sm:flex-none px-10 py-3 bg-gradient-to-r from-action to-violet-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50"
              >
                {saving ? "Saving Changes..." : "Save Profile Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
