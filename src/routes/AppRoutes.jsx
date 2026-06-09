import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

// Lazy Loading Pages to shred the 5MB bundle
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const VerifyOtp = lazy(() => import("../pages/VerifyOtp"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const CreateResume = lazy(() => import("../pages/CreateResume"));
const ResumeBuilder = lazy(() => import("../pages/ResumeBuilder/ResumeBuilderLayout"));
const Templates = lazy(() => import("../pages/Templates"));
const CoverLetterPage = lazy(() => import("../pages/CoverLetterPage"));
const ATSPage = lazy(() => import("../pages/ATSPage"));
const ReferralPage = lazy(() => import("../pages/ReferralPage"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const PublicProfile = lazy(() => import("../pages/PublicProfile"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const AdminUserDetail = lazy(() => import("../pages/AdminUserDetail"));
const AdminResumes = lazy(() => import("../pages/AdminResumes"));
const AdminATSScans = lazy(() => import("../pages/AdminATSScans"));
const AdminCoverLetters = lazy(() => import("../pages/AdminCoverLetters"));
const AdminEconomy = lazy(() => import("../pages/AdminEconomy"));
const AdminLogs = lazy(() => import("../pages/AdminLogs"));
const AdminSettings = lazy(() => import("../pages/AdminSettings"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Maintenance = lazy(() => import("../pages/Maintenance"));
const Documentation = lazy(() => import("../pages/Documentation"));
const JobMatcher = lazy(() => import("../pages/JobMatcher"));
const InterviewSimulator = lazy(() => import("../pages/InterviewSimulator"));
const CareerRoadmap = lazy(() => import("../pages/CareerRoadmap"));

import Layout from "../components/common/Layout";
import LoadingScreen from "../components/common/LoadingScreen";


const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (token) return children;

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You must be logged in to access this page.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login", { replace: true });
      });
    }
    return () => {
      mounted = false;
    };
  }, [navigate]);

  return null;
};

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin" && user.role !== "superadmin") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You do not have admin privileges.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard", { replace: true });
      });
    }
  }, [user, navigate]);

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return null;
  }

  return children;
};

const ResumeRedirect = () => {
  const { id } = useParams();
  return <Navigate to={id ? `/builder/${id}` : "/builder"} replace />;
};

const AppRoutes = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

      <Route
        path="/"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />

      {/* Public auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* New Resume Builder (Full Screen) */}
      <Route
        path="/builder/:id?"
        element={
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<ResumeRedirect />} />
        <Route path="/edit/:id" element={<ResumeRedirect />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
        <Route path="/ats" element={<ATSPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/job-matcher" element={<JobMatcher />} />
        <Route path="/interview" element={<InterviewSimulator />} />
        <Route path="/roadmap" element={<CareerRoadmap />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <AdminRoute>
              <AdminUserDetail />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/resumes"
          element={
            <AdminRoute>
              <AdminResumes />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/ats-scans"
          element={
            <AdminRoute>
              <AdminATSScans />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/cover-letters"
          element={
            <AdminRoute>
              <AdminCoverLetters />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/economy"
          element={
            <AdminRoute>
              <AdminEconomy />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/logs"
          element={
            <AdminRoute>
              <AdminLogs />
            </AdminRoute>
          }
        />
      </Route>

      <Route path="/p/:username" element={<PublicProfile />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  );
};


export default AppRoutes;
