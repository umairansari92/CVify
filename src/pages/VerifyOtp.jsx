import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
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
    if (token) navigate("/", { replace: true });
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
    <div className="min-h-screen flex items-center justify-center bg-slate-soft dark:bg-midnight p-6 transition-colors duration-500 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-action/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-success/5 dark:bg-success/5 rounded-full blur-[120px] animate-pulse transition-delay-1000" />

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full relative z-10 animate-fadeIn">
        <div className="text-center mb-10 flex flex-col items-center">
          <img
            src={logo}
            alt="CVify"
            className="w-64 h-auto mb-4 dark:brightness-110"
          />
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
            Verify Your Email
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-blue/40 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-white/20 dark:border-white/5 transition-all duration-300">
          <h2 className="text-3xl font-bold text-primary dark:text-slate-50 mb-2 text-center dark:font-jakarta">
            Enter verification code
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-8">
            We sent a 6-character code to{" "}
            <span className="font-bold text-slate-700 dark:text-slate-200">
              {finalEmail || "your email"}
            </span>
          </p>

          {!emailFromState && (
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@company.com"
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
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
                  className="w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-black rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-midnight/50 text-primary dark:text-slate-100 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="w-full bg-action hover:bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-action/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 glow-btn"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">
              Didn&apos;t receive the code?
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || !finalEmail}
              className="text-action dark:text-accent font-bold hover:underline transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-sm text-slate-500 dark:text-slate-400 font-medium hover:text-action dark:hover:text-accent transition-all"
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
