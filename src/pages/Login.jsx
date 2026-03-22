import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";
import ThemeToggle from "../components/common/ThemeToggle";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    // If 403 (email not verified), redirect to verify-otp with email
    if (loginUser.rejected.match(result)) {
      const payload = result.payload;
      if (typeof payload === "object" && payload?.email) {
        navigate("/verify-otp", {
          state: { email: payload.email },
          replace: true,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse transition-delay-1000"></div>

      <div className="absolute top-6 right-6 z-20 text-text-primary">
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

          {error && (
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
                  className="text-action dark:text-accent font-bold hover:underline"
                >
                  Verify email now →
                </Link>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1">
                Professional Email
              </label>
              <input
                {...register("email", { required: true })}
                placeholder="e.g. name@company.com"
                className="w-full px-6 py-4 rounded-2xl border-2 border-border-subtle bg-foreground/5 text-text-main placeholder:text-text-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold"
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
                className="w-full px-6 py-4 rounded-2xl border-2 border-border-subtle bg-foreground/5 text-text-main placeholder:text-text-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-semibold"
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
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Begin Session"}
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
