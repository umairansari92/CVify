import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// Lazy Loading Pages
const ResumeLandingPage = lazy(() => import("../modules/resume/pages/landing/ResumeLandingPage"));
const CreateResumeWizard = lazy(() => import("../pages/CreateResumeWizard"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const VerifyOtp = lazy(() => import("../pages/VerifyOtp"));
const Dashboard = lazy(() => import("../modules/dashboard/DashboardPage"));
const CreateResume = lazy(() => import("../pages/CreateResume"));
const MyResumesPage = lazy(() => import("../pages/MyResumesPage"));
const ResumeLibraryPage = lazy(() => import("../modules/resume/pages/ResumeLibraryPage"));
const ResumeBuilder = lazy(() => import("../pages/ResumeBuilder/ResumeBuilderLayout"));
const Templates = lazy(() => import("../pages/Templates"));
const CoverLetterPage = lazy(() => import("../pages/CoverLetterPage"));

// ATS Intelligence Micro-SaaS Module System
const ATSModuleLayout = lazy(() => import("../modules/ats/ATSModuleLayout"));
const ATSLandingPage = lazy(() => import("../modules/ats/pages/ATSLandingPage"));
const ATSWorkspacePage = lazy(() => import("../modules/ats/pages/ATSWorkspacePage"));
const ATSReportsPage = lazy(() => import("../modules/ats/pages/ATSReportsPage"));
const ATSHistoryPage = lazy(() => import("../modules/ats/pages/ATSHistoryPage"));
const ATSGuidePage = lazy(() => import("../modules/ats/pages/ATSGuidePage"));

// Digital Identity & Profile Studio Module
const ProfileModuleLayout = lazy(() => import("../modules/profile/ProfileModuleLayout"));
const ProfileLandingPage = lazy(() => import("../modules/profile/pages/ProfileLandingPage"));
const ProfileStudioPage = lazy(() => import("../modules/profile/pages/ProfileStudioPage"));
const ProfileGuidePage = lazy(() => import("../modules/profile/pages/ProfileGuidePage"));
const ProfileAnalyticsPage = lazy(() => import("../modules/profile/pages/ProfileAnalyticsPage"));

const ReferralPage = lazy(() => import("../pages/ReferralPage"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const PublicProfile = lazy(() => import("../pages/PublicProfile"));
const PublicResumeViewer = lazy(() => import("../pages/PublicResumeViewer"));
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

// Layouts
import Layout from "../components/common/Layout";
import MarketingLayout from "../components/common/MarketingLayout";
import LoadingScreen from "../components/common/LoadingScreen";

/** External marketing site URL — single source of truth */
const MARKETING_SITE = "https://cvifypro.vercel.app/";

/**
 * Performs a hard redirect to the external Next.js marketing site.
 * Used instead of <Navigate> for cross-domain redirects.
 */
const ExternalRedirect = ({ to = MARKETING_SITE }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return <LoadingScreen />;
};

/**
 * ProtectedRoute — guards authenticated-only routes.
 * If unauthenticated, sends user to the external marketing site
 * rather than showing an internal page they shouldn't see.
 */
const ProtectedRoute = ({ children }) => {
  const { user, isInitialized } = useSelector((state) => state.auth);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (user) return children;

  // Redirect unauthenticated users to marketing site, not internal /login
  return <ExternalRedirect to={MARKETING_SITE} />;
};

const AdminRoute = ({ children }) => {
  const { user, isInitialized } = useSelector((state) => state.auth);

  if (!isInitialized) return <LoadingScreen />;

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const ResumeRedirect = () => {
  const { id } = useParams();
  return <Navigate to={id ? `/resume-builder/editor/${id}` : "/resume-builder/create"} replace />;
};

// Carries the legacy :id param from old /builder/:id → new /resume-builder/editor/:id
const BuilderLegacyRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/resume-builder/editor/${id}`} replace />;
};

const AppRoutes = () => {
  const { user, isInitialized } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* Root Route: logged-in → dashboard | guest → external marketing site */}
        <Route
          path="/"
          element={
            !isInitialized ? (
              <LoadingScreen />
            ) : user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <ExternalRedirect to={MARKETING_SITE} />
            )
          }
        />

        {/* Public Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/share/r/:slug" element={<PublicResumeViewer />} />
        <Route path="/share/resume/:id" element={<Navigate to="/" replace />} />

        {/* ── Public / Marketing Pages wrapped in MarketingLayout (Mega Navbar, NO Sidebar) ── */}
        <Route element={<MarketingLayout />}>
          <Route path="/resume-builder" element={<ResumeLandingPage />} />
          <Route path="/ats" element={<ATSLandingPage />} />
          <Route path="/profile-guide" element={<ProfileLandingPage />} />
          <Route path="/landing" element={<Navigate to="/resume-builder" replace />} />
          <Route path="/documentation" element={<Documentation />} />
        </Route>

        {/* ── Standalone Fullscreen Creation Flows (NO Sidebar, Focused Creation) ── */}
        <Route
          path="/resume-builder/create"
          element={
            <ProtectedRoute>
              <CreateResumeWizard />
            </ProtectedRoute>
          }
        />
        <Route path="/create-resume" element={<Navigate to="/resume-builder/create" replace />} />

        <Route
          path="/resume-builder/editor/:id"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route path="/resume-builder/editor" element={<Navigate to="/resume-builder/create" replace />} />
        <Route path="/builder/:id" element={<BuilderLegacyRedirect />} />
        <Route path="/builder" element={<Navigate to="/resume-builder/create" replace />} />

        {/* ── Protected App Workspaces wrapped in Layout (Workspace Sidebar + Workspace Header) ── */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume/library" element={<ResumeLibraryPage />} />
          
          {/* Legacy Redirects */}
          <Route path="/resume-builder/my-resumes" element={<Navigate to="/resume/library" replace />} />
          <Route path="/resumes" element={<Navigate to="/resume/library" replace />} />
          <Route path="/create" element={<Navigate to="/resume-builder/create" replace />} />
          <Route path="/edit/:id" element={<ResumeRedirect />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/cover-letter" element={<CoverLetterPage />} />
          
          {/* ATS Intelligence Micro-Product Module System */}
          <Route path="/ats" element={<ATSModuleLayout />}>
            <Route path="scan" element={<ATSWorkspacePage />} />
            <Route path="reports" element={<ATSReportsPage />} />
            <Route path="reports/:id" element={<ATSReportsPage />} />
            <Route path="history" element={<ATSHistoryPage />} />
            <Route path="guide" element={<ATSGuidePage />} />
          </Route>

          {/* Digital Identity & Profile Studio Module */}
          <Route path="/profile" element={<ProfileModuleLayout />}>
            <Route index element={<ProfileStudioPage />} />
            <Route path="studio" element={<ProfileStudioPage />} />
            <Route path="edit" element={<Navigate to="/profile/studio" replace />} />
            <Route path="guide" element={<ProfileGuidePage />} />
            <Route path="analytics" element={<ProfileAnalyticsPage />} />
            <Route path="overview" element={<ProfileLandingPage />} />
          </Route>

          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/job-matcher" element={<JobMatcher />} />
          <Route path="/interview" element={<InterviewSimulator />} />
          <Route path="/roadmap" element={<CareerRoadmap />} />

          {/* Admin Control Plane */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/analytics"
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
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
