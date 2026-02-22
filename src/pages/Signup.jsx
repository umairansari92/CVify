import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authThunk";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/common/ThemeToggle";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const referralCode = new URLSearchParams(search).get("ref");
  const { loading, error, token } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    if (referralCode) {
      formData.append("referredBy", referralCode);
    }

    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }

    try {
      const result = await dispatch(signupUser(formData));
      if (signupUser.fulfilled.match(result) && result.payload?.email) {
        navigate("/verify-otp", { state: { email: result.payload.email }, replace: true });
      }
    } catch (_) {
      // Error shown via auth slice
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-soft dark:bg-midnight p-6 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-action/5 dark:bg-accent/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-success/5 dark:bg-success/5 rounded-full blur-[120px] animate-pulse transition-delay-1000"></div>

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="max-w-xl w-full relative z-10 animate-fadeIn my-12">
        <div className="text-center mb-10 flex flex-col items-center">
          <img
            src={logo}
            alt="CVify"
            className="w-64 h-auto mb-4 dark:brightness-110"
          />
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
            Join the Professional Ecosystem
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-blue/40 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-premium border border-white/20 dark:border-white/5 transition-all duration-300">
          <h2 className="text-3xl font-bold text-primary dark:text-slate-50 mb-8 text-center dark:font-jakarta">
            Create Space
          </h2>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 p-4 rounded-2xl text-xs font-bold mb-6 border border-red-100 dark:border-red-900/50 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  First Name
                </label>
                <input
                  {...register("firstName", { required: true })}
                  placeholder="e.g. John"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Last Name
                </label>
                <input
                  {...register("lastName", { required: true })}
                  placeholder="e.g. Doe"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Professional Email
              </label>
              <input
                {...register("email", { required: true })}
                placeholder="name@company.com"
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

            <div className="flex gap-8 justify-center py-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  value="Male"
                  {...register("gender")}
                  className="w-5 h-5 text-action border-slate-200 dark:border-slate-800 focus:ring-action dark:focus:ring-accent bg-slate-50 dark:bg-midnight transition-all cursor-pointer"
                />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-action transition-colors">
                  Male
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  value="Female"
                  {...register("gender")}
                  className="w-5 h-5 text-action border-slate-200 dark:border-slate-800 focus:ring-action dark:focus:ring-accent bg-slate-50 dark:bg-midnight transition-all cursor-pointer"
                />
                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-action transition-colors">
                  Female
                </span>
              </label>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Identity Profile (Optional)
              </label>
              <div className="relative group">
                <input
                  type="file"
                  {...register("profileImage")}
                  className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-6 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-action/10 file:text-action hover:file:bg-action/20 dark:file:bg-accent/10 dark:file:text-accent transition-all cursor-pointer border-2 border-dashed border-slate-100 dark:border-slate-800 p-3 rounded-2xl"
                />
              </div>
            </div>

            <button
              className="w-full bg-action hover:bg-blue-600 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-premium hover:shadow-action/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 glow-btn"
              disabled={loading}
            >
              {loading ? "Constructing Account..." : "Confirm Registration"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-center space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Existing member?{" "}
              <Link
                to="/login"
                className="text-action dark:text-accent font-bold hover:underline transition-all"
              >
                Access Account
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

export default Signup;
