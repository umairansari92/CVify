import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/common/Logo";
import ThemeToggle from "../components/common/ThemeToggle";
import { verifyOtp, resendOtp } from "../features/auth/authThunk";
import { toast } from "react-hot-toast";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  const { token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) navigate("/dashboard", { replace: true });
  }, [token, navigate]);

  useEffect(() => {
    if (!emailFromState && !email) return;
    const id = setInterval(() => {
      setResendCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [resendCooldown, emailFromState, email]);

  const handleOtpChange = (index, value) => {
    const upper = value.toUpperCase().replace(/[^0-9A-Z]/g, "");
    if (upper.length > 1) {
      const chars = upper.slice(0, OTP_LENGTH).split("");
      const next = [...otpValues];
      chars.forEach((c, i) => {
        if (index + i < OTP_LENGTH) next[index + i] = c;
      });
      setOtpValues(next);
      const nextFocus = Math.min(index + chars.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }
    const next = [...otpValues];
    next[index] = upper.slice(-1);
    setOtpValues(next);
    if (upper && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const next = [...otpValues];
      next[index - 1] = "";
      setOtpValues(next);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalEmail = emailFromState || email;
    if (!finalEmail) return;
    const otp = otpValues.join("");
    if (otp.length !== OTP_LENGTH) return;
    dispatch(verifyOtp({ email: finalEmail, otp }));
  };

  const handleResend = async () => {
    const finalEmail = emailFromState || email;
    if (!finalEmail || resendCooldown > 0) return;
    try {
      await dispatch(resendOtp({ email: finalEmail })).unwrap();
      toast.success("New OTP sent to your email");
      setResendCooldown(60);
    } catch (_) {
      // Error shown via auth slice
    }
  };

  const finalEmail = emailFromState || email;
  const canSubmit = finalEmail && otpValues.join("").length === OTP_LENGTH;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse transition-delay-1000"></div>

      <div className="absolute top-6 right-6 z-20 text-text-primary">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full relative z-10 animate-fadeIn my-12">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <Logo className="w-64" />
          </div>
          <p className="text-text-muted font-black uppercase tracking-[0.3em] text-[10px] opacity-60">
            Verify Your Email
          </p>
        </div>

        <div className="bg-midground/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-border-subtle transition-all duration-300">
          <h2 className="text-3xl font-black text-text-main mb-2 text-center italic tracking-tight">
            Verification Code
          </h2>
          <p className="text-text-muted text-sm text-center mb-8">
            We sent a 6-character code to{" "}
            <span className="font-bold text-text-main">
              {finalEmail || "your email"}
            </span>
          </p>

          {!emailFromState && (
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@company.com"
                className="w-full px-6 py-4 rounded-2xl border-2 border-border-subtle bg-foreground/5 text-text-main placeholder:text-text-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 p-4 rounded-2xl text-xs font-bold mb-6 border border-red-100 dark:border-red-900/50 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otpValues.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={OTP_LENGTH}
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-black rounded-2xl border-2 border-border-subtle bg-foreground/5 text-text-main focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 glow-btn"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-subtle text-center">
            <p className="text-sm text-text-muted font-medium mb-2">
              Didn&apos;t receive the code?
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || !finalEmail}
              className="text-primary font-bold hover:underline transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-sm text-text-muted font-medium hover:text-primary transition-all"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
