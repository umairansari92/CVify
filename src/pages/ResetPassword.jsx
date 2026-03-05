import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/common/ThemeToggle";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

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

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }
    if (password !== confirm) {
      return toast.error("Passwords do not match.");
    }

    setLoad(true);
    try {
      const res = await fetch(`${API}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password.");

      setDone(true);
      toast.success("Password updated! Redirecting to login...", {
        duration: 3000,
      });
      setTimeout(() => navigate("/login", { replace: true }), 3000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoad(false);
    }
  };

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
        ? 1
        : password.length < 10
          ? 2
          : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-400"][
    strength
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-soft dark:bg-midnight p-6 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-action/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" />

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full relative z-10 animate-fadeIn">
        <div className="text-center mb-10">
          <img
            src={logo}
            alt="CVify"
            className="w-52 h-auto mx-auto mb-4 dark:brightness-110"
          />
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
            Set New Password
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-blue/40 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-white/20 dark:border-white/5">
          {!done ? (
            <>
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-2xl">
                  🔒
                </div>
              </div>
              <h2 className="text-2xl font-bold text-primary dark:text-slate-50 mb-2 text-center">
                Create New Password
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-8">
                Choose a strong password you haven't used before.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
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
                      className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-action transition-colors text-lg"
                    >
                      {showPass ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {password.length > 0 && (
                    <div className="flex items-center gap-2 ml-1">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((lvl) => (
                          <div
                            key={lvl}
                            className={`h-1 w-8 rounded-full transition-all duration-300 ${strength >= lvl ? strengthColor : "bg-slate-200 dark:bg-slate-700"}`}
                          />
                        ))}
                      </div>
                      <span
                        className={`text-[10px] font-black ${["", "text-red-400", "text-amber-400", "text-emerald-500"][strength]}`}
                      >
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type={showPass ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConf(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`w-full px-6 py-4 rounded-2xl border-2 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold ${
                      confirm && confirm !== password
                        ? "border-red-400 dark:border-red-600"
                        : "border-slate-100 dark:border-slate-800 focus:border-action dark:focus:border-accent"
                    }`}
                  />
                  {confirm && confirm !== password && (
                    <p className="text-[10px] text-red-400 font-bold ml-1">
                      Passwords don't match
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-action hover:bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-action/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? "Updating Password..." : "Update Password →"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl mx-auto">
                ✅
              </div>
              <h2 className="text-2xl font-bold text-primary dark:text-slate-50">
                Password Updated!
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Redirecting you to login in 3 seconds...
              </p>
              <Link
                to="/login"
                className="text-sm font-bold text-action hover:underline"
              >
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
