import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authThunk";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import ThemeToggle from "../components/common/ThemeToggle";
import { isDisposableEmail } from "../utils/blockedDomains";
import { toast } from "react-hot-toast";
import { AtSign, Edit3, CheckCircle2, XCircle } from "lucide-react";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const referralCode = new URLSearchParams(search).get("ref");
  const { loading, error, token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "Male",
    },
  });

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const password = watch("password");

  // Autogenerate username
  useEffect(() => {
    if (!isEditingUsername && (firstName || lastName)) {
      const generated =
        `${(firstName || "").toLowerCase()}${(lastName || "").toLowerCase()}`
          .replace(/[^a-z0-9]/g, "")
          .slice(0, 15);
      if (generated) {
        setValue("username", generated);
      }
    }
  }, [firstName, lastName, isEditingUsername, setValue]);

  const onSubmit = async (data) => {
    // Frontend check for disposable emails
    if (isDisposableEmail(data.email)) {
      toast.error(
        "Temporary or disposable email addresses are not allowed. Please use a real email address.",
        {
          duration: 5000,
          icon: "🚫",
        },
      );
      return;
    }

    // Check profile image size
    if (
      data.profileImage &&
      data.profileImage[0] &&
      data.profileImage[0].size > 4 * 1024 * 1024
    ) {
      toast.error("Profile image must be under 4MB.", { icon: "📁" });
      return;
    }

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username.toLowerCase());
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
        navigate("/verify-otp", {
          state: { email: result.payload.email },
          replace: true,
        });
      }
    } catch (_) {
      // Error shown via auth slice
    }
  };

  const passwordValidation = {
    length: (password || "").length >= 7,
    hasUpper: /[A-Z]/.test(password || ""),
    hasLower: /[a-z]/.test(password || ""),
    hasNumber: /\d/.test(password || ""),
    hasSpecial: /[@$!%*?&._]/.test(password || ""),
  };

  const ValidationItem = ({ label, passed }) => (
    <div
      className={`flex items-center gap-1.5 text-[10px] font-bold transition-colors ${passed ? "text-success" : "text-slate-400"}`}
    >
      {passed ? (
        <CheckCircle2 className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3 opacity-40" />
      )}
      {label}
    </div>
  );

  const HelperTip = ({ text }) => (
    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium ml-1 mt-1.5 animate-fadeIn">
      {text}
    </p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-soft dark:bg-Midnight p-6 transition-colors duration-500 overflow-hidden relative">
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
                <HelperTip text="Use your legal first name for resumes" />
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
                <HelperTip text="Professional last name as per ID" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <span>Custom Username (URL SLUG)</span>
                {!isEditingUsername && (
                  <button
                    type="button"
                    onClick={() => setIsEditingUsername(true)}
                    className="flex items-center gap-1 text-action dark:text-accent hover:underline lowercase"
                  >
                    <Edit3 className="w-3 h-3" /> edit
                  </button>
                )}
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400 pointer-events-none">
                  <AtSign className="w-4 h-4 text-action/50" />
                  <span className="text-sm font-bold opacity-30">
                    cvify.pro/p/
                  </span>
                </div>
                <input
                  {...register("username", {
                    required: true,
                    pattern: {
                      value: /^[a-z0-9._]+$/,
                      message: "Small letters, numbers, . and _ only",
                    },
                  })}
                  readOnly={!isEditingUsername}
                  placeholder="your-handle"
                  className={`w-full pl-36 pr-6 py-4 rounded-2xl border-2 ${isEditingUsername ? "border-action dark:border-accent" : "border-slate-100 dark:border-slate-800"} bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold lowercase`}
                />
              </div>
              {errors.username && (
                <p className="text-[10px] text-red-500 font-bold ml-1">
                  {errors.username.message}
                </p>
              )}
              <HelperTip text="This will be your unique public profile link" />
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
              <HelperTip text="We will send a verification code to this email" />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Secure Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{7,}$/,
                      message:
                        "Complete the checklist below for a strong password",
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-midnight/30 text-primary dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-action dark:focus:border-accent focus:ring-4 focus:ring-action/10 outline-none transition-all font-semibold"
                />
                <HelperTip text="Must be strong to protect your professional data" />
              </div>

              {errors.password && (
                <p className="text-[10px] text-red-500 font-bold ml-1 animate-fadeIn">
                  {errors.password.message}
                </p>
              )}

              {(password || errors.password) && (
                <div className="bg-slate-50 dark:bg-midnight/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 grid grid-cols-2 gap-y-2 gap-x-4 animate-fadeIn">
                  <ValidationItem
                    label="7+ Characters"
                    passed={passwordValidation.length}
                  />
                  <ValidationItem
                    label="Uppercase (A-Z)"
                    passed={passwordValidation.hasUpper}
                  />
                  <ValidationItem
                    label="Lowercase (a-z)"
                    passed={passwordValidation.hasLower}
                  />
                  <ValidationItem
                    label="One Number"
                    passed={passwordValidation.hasNumber}
                  />
                  <ValidationItem
                    label="Special (@$!%*?&._)"
                    passed={passwordValidation.hasSpecial}
                  />
                </div>
              )}
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
                <HelperTip text="A professional photo increases your selection chances by 40%" />
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
