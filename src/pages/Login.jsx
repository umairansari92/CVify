import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/common/ThemeToggle";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    // If 403 (email not verified), redirect to verify-otp with email
    if (loginUser.rejected.match(result)) {
      const payload = result.payload;
      if (typeof payload === "object" && payload?.email) {
        navigate("/verify-otp", { state: { email: payload.email }, replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-soft dark:bg-midnight p-6 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-action/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-success/5 dark:bg-success/5 rounded-full blur-[120px] animate-pulse transition-delay-1000"></div>

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
            Professional Ecosystem
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-blue/40 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-white/20 dark:border-white/5 transition-all duration-300">
          <h2 className="text-3xl font-bold text-primary dark:text-slate-50 mb-8 text-center dark:font-jakarta">
            Welcome Back
          </h2>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 p-4 rounded-2xl text-xs font-bold mb-6 border border-red-100 dark:border-red-900/50 animate-shake">
              <p className="mb-2">{typeof error === "object" && error?.message ? error.message : String(error)}</p>
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
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Professional Email
              </label>
              <input
                {...register("email", { required: true })}
                placeholder="e.g. name@company.com"
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Secure Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
              />
            </div>

            <button
              className="w-full bg-action hover:bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-action/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 glow-btn"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Begin Session"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-center space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              New to the platform?{" "}
              <Link
                to="/signup"
                className="text-action dark:text-accent font-bold hover:underline transition-all"
              >
                Create Account
              </Link>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              <Link
                to="/verify-otp"
                className="text-action dark:text-accent font-bold hover:underline transition-all"
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
