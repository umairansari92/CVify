import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "../components/common/Logo";
import ThemeToggle from "../components/common/ThemeToggle";
import api from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPass] = useState("");
  const [confirm, setConf] = useState("");
  const [loading, setLoad] = useState(false);
  const [showPass, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters.");
    if (password !== confirm) return toast.error("Passwords do not match.");

    setLoad(true);
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      setDone(true);
      toast.success("Password updated! Redirecting to login...", { duration: 3000 });
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Failed to reset password.");
    } finally {
      setLoad(false);
    }
  };

  const strength =
    password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400"][strength];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" />

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full relative z-10 animate-fadeIn">
        {/* Logo — matches Login.jsx exactly */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <Logo className="w-64" />
          </div>
          <p className="text-text-muted font-black uppercase tracking-[0.3em] text-[10px] opacity-60">
            Set New Password
          </p>
        </div>

        <div className="bg-midground/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-border-subtle transition-all duration-300">
          {!done ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 dark:bg-accent/10 flex items-center justify-center text-3xl border border-border-subtle">
                  🔒
                </div>
              </div>

              <h2 className="text-3xl font-black text-text-main mb-3 text-center italic tracking-tight">
                Create New Password
              </h2>
              <p className="text-xs text-text-muted text-center mb-8 font-medium">
                Choose a strong password you haven't used before.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-border-subtle bg-foreground/5 text-text-main placeholder:text-text-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors text-lg"
                    >
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {/* Strength meter */}
                  {password.length > 0 && (
                    <div className="flex items-center gap-2 ml-1 mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((lvl) => (
                          <div
                            key={lvl}
                            className={`h-1 w-8 rounded-full transition-all duration-300 ${strength >= lvl ? strengthColor : "bg-border-subtle"}`}
                          />
                        ))}
                      </div>
                      <span className={`text-[10px] font-black ${["", "text-red-400", "text-amber-400", "text-emerald-500"][strength]}`}>
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type={showPass ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConf(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`w-full px-6 py-4 rounded-2xl border-2 bg-foreground/5 text-text-main placeholder:text-text-muted/40 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold ${
                      confirm && confirm !== password
                        ? "border-red-400 dark:border-red-600"
                        : "border-border-subtle focus:border-primary"
                    }`}
                  />
                  {confirm && confirm !== password && (
                    <p className="text-[10px] text-red-400 font-bold ml-1">
                      Passwords don't match
                    </p>
                  )}
                </div>

                <button
                  id="reset-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-background font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? "Updating Password..." : "Update Password →"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl mx-auto border border-emerald-200 dark:border-emerald-800/40">
                ✅
              </div>
              <h2 className="text-2xl font-black text-text-main italic tracking-tight">
                Password Updated!
              </h2>
              <p className="text-xs text-text-muted font-medium">
                Redirecting you to login in 3 seconds...
              </p>
              <Link to="/login" className="text-sm font-black text-primary hover:underline">
                Go to Login →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
