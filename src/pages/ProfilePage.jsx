import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { updateUser } from "../features/auth/authSlice";

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
        className={`${dim} rounded-full object-cover ring-4 ring-action/20 dark:ring-accent/20`}
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

// ─── Section Card ─────────────────────────────────────────────────────────────
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-white/5 shadow-sm ${className}`}
  >
    {children}
  </div>
);

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

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [previewImg, setPreview] = useState(user?.profileImage || "");
  const [imageFile, setImgFile] = useState(null);

  const [currentPwd, setCurrPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const [saving, setSaving] = useState(false);
  const [pwdSaving, setPwdSave] = useState(false);

  const fileRef = useRef(null);

  // Headers are handled by axios interceptor

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
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
      if (imageFile) fd.append("profileImage", imageFile);

      const res = await api.patch("/auth/profile", fd);
      const data = res.data;

      // Ensure data.user exists before dispatching
      if (data.user) {
        dispatch(updateUser(data.user));
        setImgFile(null);
        toast.success("✅ Profile updated successfully!", { duration: 3000 });
      } else {
        throw new Error("No user data returned from server.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Change password ──
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPwd) return toast.error("Please enter your current password.");
    if (newPwd.length < 6)
      return toast.error("New password must be at least 6 characters.");
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

  return (
    <div className="min-h-screen bg-foreground dark:bg-midnight p-6 md:p-8 transition-colors duration-300">
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

        {/* ── Personal Info ── */}
        <Card>
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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-border-subtle bg-foreground/50 dark:bg-midnight/30 text-text-primary focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold text-sm"
                />
              </div>
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
                  className="w-10 h-10 rounded-xl object-cover"
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

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3 bg-action hover:bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-200 shadow-sm hover:shadow-action/30 active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </Card>

        {/* ── Diamond Ledger ── */}
        <Card>
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
        <Card>
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
              {/* Strength meter */}
              {newPwd.length > 0 && (
                <div className="flex items-center gap-2 ml-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1 w-8 rounded-full transition-all duration-300 ${pwdStrength >= lvl ? pwdColor : "bg-slate-200 dark:bg-slate-700"}`}
                      />
                    ))}
                  </div>
                  <span
                    className={`text-[10px] font-black ${["", "text-red-400", "text-amber-400", "text-emerald-500"][pwdStrength]}`}
                  >
                    {pwdLabel}
                  </span>
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

        {/* ── Referral Info ── */}
        {user?.referralCode && (
          <Card>
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
    </div>
  );
};

export default ProfilePage;
