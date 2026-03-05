import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/common/ThemeToggle";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address.");

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong.");

      setSent(true);
      toast.success("Reset link sent! Check your inbox.", { duration: 5000 });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-soft dark:bg-midnight p-6 transition-colors duration-500 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-action/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/5 rounded-full blur-[120px] animate-pulse" />

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full relative z-10 animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-10">
          <img
            src={logo}
            alt="CVify"
            className="w-52 h-auto mx-auto mb-4 dark:brightness-110"
          />
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
            Account Recovery
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-blue/40 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-white/20 dark:border-white/5">
          {!sent ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-action/10 dark:bg-accent/10 flex items-center justify-center text-3xl">
                  🔐
                </div>
              </div>
              <h2 className="text-2xl font-bold text-primary dark:text-slate-50 mb-2 text-center">
                Forgot Password?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-8 leading-relaxed">
                Enter your registered email and we'll send you a secure reset
                link valid for{" "}
                <span className="font-bold text-amber-500">1 hour</span>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Registered Email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-action hover:bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-action/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending Reset Link..." : "Send Reset Link →"}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl mx-auto">
                ✉️
              </div>
              <h2 className="text-2xl font-bold text-primary dark:text-slate-50">
                Check Your Inbox
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                If <span className="font-bold text-action">{email}</span> is
                registered, a reset link has been sent. Check your spam folder
                if you don't see it.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-2xl p-4">
                <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                  ⏰ This link expires in <strong>1 hour</strong>. Request a new
                  one if it expires.
                </p>
              </div>
              <button
                onClick={() => {
                  setSent(false);
                  setEmail("");
                }}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-action transition-colors font-bold underline"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
            <Link
              to="/login"
              className="text-sm text-slate-500 dark:text-slate-400 font-bold hover:text-action dark:hover:text-accent transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
