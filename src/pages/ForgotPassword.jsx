import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "../components/common/Logo";
import ThemeToggle from "../components/common/ThemeToggle";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email address.");

    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email: email.trim() });
      setSent(true);
      toast.success("Reset link sent! Check your inbox.", { duration: 5000 });
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" />

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
            Account Recovery
          </p>
        </div>

        <div className="bg-midground/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-border-subtle transition-all duration-300">
          {!sent ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 dark:bg-accent/10 flex items-center justify-center text-3xl border border-border-subtle">
                  🔐
                </div>
              </div>

              <h2 className="text-3xl font-black text-text-main mb-3 text-center italic tracking-tight">
                Forgot Password?
              </h2>
              <p className="text-xs text-text-muted text-center mb-8 leading-relaxed font-medium">
                Enter your registered email and we'll send you a secure reset link valid for{" "}
                <span className="font-black text-amber-500">1 hour</span>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                    Registered Email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full px-6 py-4 rounded-2xl border-2 border-border-subtle bg-foreground/5 text-text-main placeholder:text-text-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold"
                  />
                </div>

                <button
                  id="forgot-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-background font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending Reset Link..." : "Send Reset Link →"}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4 space-y-5 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-4xl mx-auto border border-emerald-200 dark:border-emerald-800/40">
                ✉️
              </div>
              <h2 className="text-2xl font-black text-text-main italic tracking-tight">
                Check Your Inbox
              </h2>
              <p className="text-xs text-text-muted leading-relaxed font-medium">
                If <span className="font-black text-primary">{email}</span> is registered, a reset link has been sent.
                Check your spam folder if you don't see it.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-2xl p-4">
                <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                  ⏰ This link expires in <strong>1 hour</strong>. Request a new one if it expires.
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="text-xs text-text-muted hover:text-primary transition-colors font-bold underline"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-border-subtle text-center">
            <Link
              to="/login"
              className="text-sm text-text-muted font-bold hover:text-primary dark:hover:text-accent transition-colors"
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
