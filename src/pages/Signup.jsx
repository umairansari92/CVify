import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authThunk";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/common/Logo";
import { isDisposableEmail } from "../utils/blockedDomains";
import { toast } from "react-hot-toast";
import { formatAuthError } from "../utils/formatAuthError";
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
  } = useForm({ defaultValues: { gender: "Male" } });

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const password = watch("password");

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  // Autogenerate username
  useEffect(() => {
    if (!isEditingUsername && (firstName || lastName)) {
      const generated = `${(firstName || "").toLowerCase()}${(lastName || "").toLowerCase()}`
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 15);
      if (generated) setValue("username", generated);
    }
  }, [firstName, lastName, isEditingUsername, setValue]);

  const onSubmit = async (data) => {
    if (isDisposableEmail(data.email)) {
      toast.error("Temporary or disposable email addresses are not allowed. Please use a real email address.", {
        duration: 5000,
        icon: "🚫",
      });
      return;
    }
    if (data.profileImage && data.profileImage[0] && data.profileImage[0].size > 4 * 1024 * 1024) {
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
    if (referralCode) formData.append("referredBy", referralCode);
    if (data.profileImage && data.profileImage[0]) formData.append("profileImage", data.profileImage[0]);

    try {
      const result = await dispatch(signupUser(formData));
      if (signupUser.fulfilled.match(result) && result.payload?.email) {
        navigate("/verify-otp", { state: { email: result.payload.email }, replace: true });
      }
    } catch (_) {}
  };

  const passwordValidation = {
    length: (password || "").length >= 8,
    hasUpper: /[A-Z]/.test(password || ""),
    hasLower: /[a-z]/.test(password || ""),
    hasNumber: /\d/.test(password || ""),
    hasSpecial: /[@$!%*?&._]/.test(password || ""),
  };

  const ValidationItem = ({ label, passed }) => (
    <div className={`auth-val-item ${passed ? "passed" : ""}`}>
      {passed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3 opacity-40" />}
      {label}
    </div>
  );

  return (
    <div className="auth-page-wrapper">
      {/* Ambient Background Orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />

      <div className="auth-container auth-signup-layout">

        {/* ─── SIGN-UP FORM (Right side in signup layout) ─── */}
        <div className="auth-form-container auth-sign-up-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="auth-logo-wrap">
              <Logo className="w-44" />
            </div>
            <h1>Join CVify Pro</h1>
            <span>Join the Career Intelligence Ecosystem</span>

            {error && (
              <div className="auth-error-box">{formatAuthError(error)}</div>
            )}

            {/* Name Row */}
            <div className="auth-row-2">
              <div className="auth-field">
                <label>First Name</label>
                <input
                  {...register("firstName", { required: true })}
                  placeholder="e.g. John"
                />
              </div>
              <div className="auth-field">
                <label>Last Name</label>
                <input
                  {...register("lastName", { required: true })}
                  placeholder="e.g. Doe"
                />
              </div>
            </div>

            {/* Username */}
            <div className="auth-field">
              <label className="auth-label-flex">
                <span>Username (URL Slug)</span>
                {!isEditingUsername && (
                  <button type="button" onClick={() => setIsEditingUsername(true)} className="auth-edit-btn">
                    <Edit3 className="w-3 h-3" /> edit
                  </button>
                )}
              </label>
              <div className="auth-slug-wrap">
                <div className="auth-slug-prefix">
                  <AtSign className="w-4 h-4" />
                  <span>cvify.pro/p/</span>
                </div>
                <input
                  {...register("username", {
                    required: true,
                    pattern: { value: /^[a-z0-9._]+$/, message: "Small letters, numbers, . and _ only" },
                  })}
                  readOnly={!isEditingUsername}
                  placeholder="your-handle"
                  className={`auth-slug-input ${isEditingUsername ? "editing" : ""}`}
                />
              </div>
              {errors.username && <p className="auth-field-error">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div className="auth-field">
              <label>Professional Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="name@company.com"
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <label>Secure Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/,
                    message: "Complete the checklist below for a strong password",
                  },
                })}
                placeholder="••••••••"
              />
              {errors.password && <p className="auth-field-error">{errors.password.message}</p>}
              {(password || errors.password) && (
                <div className="auth-password-grid">
                  <ValidationItem label="8 Characters" passed={passwordValidation.length} />
                  <ValidationItem label="Uppercase (A-Z)" passed={passwordValidation.hasUpper} />
                  <ValidationItem label="Lowercase (a-z)" passed={passwordValidation.hasLower} />
                  <ValidationItem label="One Number" passed={passwordValidation.hasNumber} />
                  <ValidationItem label="Special (@$!%*?&._)" passed={passwordValidation.hasSpecial} />
                </div>
              )}
            </div>

            {/* Gender */}
            <div className="auth-gender-row">
              <label className="auth-radio-label">
                <input type="radio" value="Male" {...register("gender")} />
                <span>Male</span>
              </label>
              <label className="auth-radio-label">
                <input type="radio" value="Female" {...register("gender")} />
                <span>Female</span>
              </label>
            </div>

            {/* Profile Photo */}
            <div className="auth-field">
              <label>Identity Profile (Optional)</label>
              <input
                type="file"
                {...register("profileImage")}
                className="auth-file-input"
                accept="image/*"
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Constructing Account..." : "Confirm Registration"}
            </button>

            <div className="auth-footer-links">
              <p>Existing member? <Link to="/login">Access Account</Link></p>
              <Link to="/verify-otp" className="auth-verify-link">Verify your email →</Link>
            </div>
          </form>
        </div>

        {/* ─── ANIMATED TOGGLE OVERLAY (Left on signup page) ─── */}
        <div className="auth-toggle-container auth-toggle-left-side">
          <div className="auth-toggle">
            <div className="auth-toggle-panel auth-toggle-single">
              <h1>Aesthetics. Agency. Authority.</h1>
              <p>Access your live, SEO-optimized digital portfolio and get honest, context-aware AI coaching.</p>
              <Link to="/login">
                <button type="button" className="auth-ghost-btn">Sign In</button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
