import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import { clearAuthError } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.rejected.match(result)) {
      const payload = result.payload;
      if (typeof payload === "object" && payload?.email) {
        dispatch(clearAuthError());
        navigate("/verify-otp", { state: { email: payload.email }, replace: true });
      }
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Ambient Background Orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />

      <div className={`auth-container ${isActive ? "active" : ""}`}>

        {/* ─── SIGN-IN FORM (Left) ─── */}
        <div className="auth-form-container auth-sign-in">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="auth-logo-wrap">
              <Logo className="w-44" />
            </div>
            <h1>Welcome Back</h1>
            <span>Access your real-time AI auditor</span>

            {error && (
              <div className="auth-error-box">
                {typeof error === "object" && error?.message ? error.message : String(error)}
                {typeof error === "object" && error?.email && (
                  <Link to="/verify-otp" state={{ email: error.email }} className="auth-error-link">
                    Verify email now →
                  </Link>
                )}
              </div>
            )}

            <div className="auth-field">
              <label>Professional Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label>Secure Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <div className="auth-forgot-wrap">
              <Link to="/forgot-password" className="auth-forgot">Forgot Password?</Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Begin Session"}
            </button>

            <div className="auth-footer-links">
              <p>New to the platform? <Link to="/signup">Create Account</Link></p>
              <Link to="/verify-otp" className="auth-verify-link">Verify your email →</Link>
            </div>
          </form>
        </div>

        {/* ─── ANIMATED TOGGLE OVERLAY ─── */}
        <div className="auth-toggle-container">
          <div className="auth-toggle">

            {/* LEFT panel — shown when signup is active */}
            <div className="auth-toggle-panel auth-toggle-left">
              <h1>Aesthetics. Agency. Authority.</h1>
              <p>Access your live, SEO-optimized digital portfolio and get honest, context-aware AI coaching.</p>
              <button type="button" className="auth-ghost-btn" onClick={() => setIsActive(false)}>
                Sign In
              </button>
            </div>

            {/* RIGHT panel — shown on login page (default) */}
            <div className="auth-toggle-panel auth-toggle-right">
              <h1>Not Just a Resume Builder.</h1>
              <p>Solve the "Black Box" problem of Applicant Tracking Systems with our real-time, AI-backed auditor. Build your future today.</p>
              <Link to="/signup">
                <button type="button" className="auth-ghost-btn">Sign Up</button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
