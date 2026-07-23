import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import { clearAuthError } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import ThemeToggle from "../components/common/ThemeToggle";
import api from "../api/axios";

// Create a BroadcastChannel for cross-tab security synchronization
const authChannel = typeof window !== "undefined" && "BroadcastChannel" in window
  ? new BroadcastChannel("cvify_auth_channel")
  : null;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const { register, handleSubmit, watch } = useForm();

  // ── Wave 4.1 Security UI States ───────────────────────────────────────────
  const [isCheckingSecurity, setIsCheckingSecurity] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [initialCountdown, setInitialCountdown] = useState(0); // Tracks starting value for progress bar
  const [captchaData, setCaptchaData] = useState(null); // { challenge, token, expiresIn }
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const emailValue = watch("email");
  const lastCheckedEmail = useRef("");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  // ── Authoritative Mount-Time Security Check (POST /api/auth/security-state) ──
  const fetchSecurityState = async (identifier = "") => {
    try {
      setIsCheckingSecurity(true);
      const res = await api.post("/auth/security-state", { identifier });
      const { locked, retryAfter, captchaRequired } = res.data;

      if (retryAfter > 0) {
        setInitialCountdown(retryAfter);
        setCountdown(retryAfter);
      } else {
        setCountdown(0);
      }

      if (captchaRequired) {
        // If CAPTCHA is required by server state, trigger captcha generator
        fetchCaptcha();
      }
    } catch (err) {
      console.error("[SECURITY_STATE_FETCH] Failed:", err.message);
    } finally {
      setIsCheckingSecurity(false);
    }
  };

  // Check IP-level security state on initial mount
  useEffect(() => {
    fetchSecurityState("");
  }, []);

  // Check email-specific security state when user finishes typing email (on blur or pause)
  const handleEmailBlur = () => {
    if (emailValue && emailValue !== lastCheckedEmail.current) {
      lastCheckedEmail.current = emailValue;
      fetchSecurityState(emailValue);
    }
  };

  // ── Multi-Tab Synchronization via BroadcastChannel ────────────────────────
  useEffect(() => {
    if (!authChannel) return;

    const handleChannelMessage = (event) => {
      if (event.data?.type === "SECURITY_STATE_UPDATED") {
        fetchSecurityState(emailValue || "");
      }
    };

    authChannel.addEventListener("message", handleChannelMessage);
    return () => {
      authChannel.removeEventListener("message", handleChannelMessage);
    };
  }, [emailValue]);

  const notifyOtherTabs = () => {
    if (authChannel) {
      authChannel.postMessage({ type: "SECURITY_STATE_UPDATED" });
    }
  };

  // ── Handle Progressive Backoff Countdown Loop ─────────────────────────────
  useEffect(() => {
    if (error && typeof error === "object" && error.retryAfter > 0) {
      setInitialCountdown(error.retryAfter);
      setCountdown(error.retryAfter);
      notifyOtherTabs();
    }
  }, [error]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          dispatch(clearAuthError());
          // Recovery Loop (TIMER_FINISHED -> SECURITY_CHECKING -> IDLE)
          fetchSecurityState(emailValue || "");
          notifyOtherTabs();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, dispatch, emailValue]);

  // ── Handle CAPTCHA Challenge Generator ─────────────────────────────────────
  const isCaptchaRequired =
    typeof error === "object" &&
    (error?.captchaRequired || error?.code === "CAPTCHA_REQUIRED");

  useEffect(() => {
    if (isCaptchaRequired && !captchaData && !captchaSolved) {
      fetchCaptcha();
    }
  }, [isCaptchaRequired, captchaData, captchaSolved]);

  const fetchCaptcha = async () => {
    try {
      setCaptchaLoading(true);
      setCaptchaError("");
      const res = await api.get("/auth/captcha/generate");
      setCaptchaData(res.data);
    } catch (err) {
      setCaptchaError("Failed to load security challenge. Please refresh.");
    } finally {
      setCaptchaLoading(false);
    }
  };

  const handleVerifyCaptcha = async (e) => {
    e.preventDefault();
    if (!captchaAnswer.trim() || !captchaData?.token) return;

    try {
      setCaptchaLoading(true);
      setCaptchaError("");
      const res = await api.post("/auth/captcha/verify", {
        token: captchaData.token,
        answer: captchaAnswer.trim(),
        email: (emailValue || "").toLowerCase().trim(), // Required for correct Triple-Lock DB key derivation
      });
      if (res.data?.success) {
        setCaptchaSolved(true);
        setCaptchaData(null);
        setCaptchaAnswer("");
        dispatch(clearAuthError());
        await fetchSecurityState(emailValue || "");
        notifyOtherTabs();
      }
    } catch (err) {
      setCaptchaError(
        err.response?.data?.message || "Incorrect answer. Try again."
      );
      fetchCaptcha();
    } finally {
      setCaptchaLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.rejected.match(result)) {
      const payload = result.payload;
      if (typeof payload === "object" && payload?.email) {
        dispatch(clearAuthError());
        navigate("/verify-otp", {
          state: { email: payload.email },
          replace: true,
        });
      } else {
        notifyOtherTabs();
      }
    }
  };

  const isFormDisabled =
    isCheckingSecurity ||
    loading ||
    countdown > 0 ||
    (isCaptchaRequired && !captchaSolved);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse transition-delay-1000"></div>

      <div className="absolute top-6 right-6 z-20 flex items-center gap-6">
        <Link 
          to="/documentation" 
          className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors flex items-center gap-2"
        >
          <Logo className="w-6 opacity-40 group-hover:opacity-100" />
          Documentation
        </Link>
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full relative z-10 animate-fadeIn">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <Logo className="w-64" />
          </div>
          <p className="text-text-muted font-black uppercase tracking-[0.3em] text-[10px] opacity-60">
            Professional Ecosystem
          </p>
        </div>

        <div className="bg-midground/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-border-subtle transition-all duration-300">
          <h2 className="text-3xl font-black text-text-main mb-8 text-center italic tracking-tight">
            Welcome Back
          </h2>

          {/* ── ERROR MESSAGE BANNER (credentials/general errors only) ─────────── */}
          {error && countdown <= 0 && (
            <div className="bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 p-4 rounded-2xl text-xs font-bold mb-6 border border-red-100 dark:border-red-900/50 animate-shake">
              <p className="mb-2">
                {typeof error === "object" && error?.message
                  ? error.message
                  : String(error)}
              </p>

              {typeof error === "object" && error?.email && (
                <Link
                  to="/verify-otp"
                  state={{ email: error.email }}
                  className="text-action dark:text-accent font-bold hover:underline block mt-2"
                >
                  Verify email now →
                </Link>
              )}
            </div>
          )}

          {/* ── SECURITY DELAY TIMER (visible whenever countdown > 0, error-independent) ── */}
          {countdown > 0 && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 pt-4 pb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <p className="text-[11px] font-black uppercase tracking-widest text-red-600 dark:text-red-300">
                  Security Delay Active
                </p>
              </div>

              {/* Timer Display */}
              <div className="flex items-center justify-between px-5 pb-4">
                <p className="text-[11px] text-red-500 dark:text-red-400 font-semibold">
                  {error && typeof error === "object" && error?.message
                    ? error.message
                    : "Too many failed attempts. Please wait before retrying."}
                </p>
                <div className="flex-shrink-0 ml-4 bg-red-100 dark:bg-red-900/60 rounded-xl px-4 py-2 text-center min-w-[72px]">
                  <span className="font-black text-lg text-red-700 dark:text-red-200 tabular-nums">
                    {countdown >= 60
                      ? `${Math.floor(countdown / 60)}m ${countdown % 60 < 10 ? "0" : ""}${countdown % 60}s`
                      : `${countdown}s`}
                  </span>
                </div>
              </div>

              {/* Animated progress bar draining from full to empty */}
              <div className="h-1 w-full bg-red-100 dark:bg-red-900/40">
                <div
                  className="h-1 bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-1000 ease-linear"
                  style={{ width: `${Math.min(100, (countdown / (initialCountdown || countdown)) * 100)}%` }}
                />
              </div>
            </div>
          )}


          {/* ── CAPTCHA SOLVED BADGE ───────────────────────────────────────────── */}
          {captchaSolved && (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl text-xs font-bold mb-6 border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-3">
              <span className="text-lg">🛡️</span>
              <div>
                <p className="font-black uppercase tracking-wider text-[10px]">Verification Solved</p>
                <p className="text-[11px]">Security challenge completed. You can now log in.</p>
              </div>
            </div>
          )}

          {/* ── INTERACTIVE MATH CAPTCHA WIDGET ────────────────────────────────── */}
          {isCaptchaRequired && !captchaSolved && (
            <div className="bg-foreground/5 p-6 rounded-2xl border-2 border-primary/20 mb-6 transition-all animate-fadeIn">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">🔒</span>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-text-main">
                    Security Verification
                  </h4>
                  <p className="text-[10px] text-text-muted font-semibold">
                    Solve this quick challenge to verify you're human
                  </p>
                </div>
              </div>

              {captchaLoading && !captchaData ? (
                <div className="py-6 text-center text-xs font-bold text-text-muted animate-pulse">
                  Loading security challenge...
                </div>
              ) : captchaData ? (
                <form onSubmit={handleVerifyCaptcha} className="space-y-4">
                  <div className="bg-background/80 p-4 rounded-xl text-center border border-border-subtle">
                    <span className="text-xs font-bold text-text-muted block mb-1 uppercase tracking-wider">
                      Math Challenge
                    </span>
                    <span className="text-2xl font-black text-primary tracking-widest">
                      {captchaData.challenge} = ?
                    </span>
                  </div>

                  <input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Enter answer"
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-background text-text-main placeholder:text-text-muted/40 focus:border-primary text-center font-bold text-lg outline-none"
                    autoFocus
                  />

                  {captchaError && (
                    <p className="text-[11px] font-bold text-red-500 text-center">
                      {captchaError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={captchaLoading || !captchaAnswer.trim()}
                    className="w-full bg-primary text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {captchaLoading ? "Verifying..." : "Verify Answer"}
                  </button>
                </form>
              ) : null}
            </div>
          )}

          {/* ── LOGIN FORM ────────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot field — type="hidden" prevents browser password managers from autofilling it */}
            <input
              type="hidden"
              {...register("_honey")}
            />

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Professional Email
              </label>
              <input
                {...register("email", { required: true })}
                onBlur={handleEmailBlur}
                placeholder="e.g. name@company.com"
                disabled={isFormDisabled}
                className="w-full px-6 py-4 rounded-2xl border-2 border-border-subtle bg-foreground/5 text-text-main placeholder:text-text-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Secure Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="••••••••"
                disabled={isFormDisabled}
                className="w-full px-6 py-4 rounded-2xl border-2 border-border-subtle bg-foreground/5 text-text-main placeholder:text-text-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold disabled:opacity-50"
              />
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-[11px] font-bold text-text-muted hover:text-primary transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 grow-btn"
              disabled={isFormDisabled}
            >
              {isCheckingSecurity
                ? "Checking Security..."
                : loading
                ? "Authenticating..."
                : countdown > 0
                ? `Wait ${countdown}s to retry`
                : isCaptchaRequired && !captchaSolved
                ? "Solve Challenge Above"
                : "Begin Session"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-border-subtle text-center space-y-3">
            <p className="text-sm text-text-muted font-medium">
              New to the platform?{" "}
              <Link
                to="/signup"
                className="text-primary font-bold hover:underline transition-all"
              >
                Create Account
              </Link>
            </p>
            <p className="text-sm text-text-muted font-medium">
              <Link
                to="/verify-otp"
                className="text-primary font-bold hover:underline transition-all"
              >
                Verify your email →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
