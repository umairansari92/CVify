import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import VerifyOtp from "../pages/VerifyOtp";
import Dashboard from "../pages/Dashboard";
import CreateResume from "../pages/CreateResume";
import Templates from "../pages/Templates";
import CoverLetterPage from "../pages/CoverLetterPage";
import ATSPage from "../pages/ATSPage";
import ReferralPage from "../pages/ReferralPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProfilePage from "../pages/ProfilePage";
import PublicProfile from "../pages/PublicProfile";
import AdminDashboard from "../pages/AdminDashboard";
import AdminUserDetail from "../pages/AdminUserDetail";
import AdminResumes from "../pages/AdminResumes";
import AdminATSScans from "../pages/AdminATSScans";
import AdminCoverLetters from "../pages/AdminCoverLetters";
import AdminEconomy from "../pages/AdminEconomy";
import AdminLogs from "../pages/AdminLogs";
import AdminSettings from "../pages/AdminSettings";
import NotFound from "../pages/NotFound";
import Layout from "../components/common/Layout";

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

const AppRoutes = () => {
  const { token } = useSelector((state) => state.auth);

  return (
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

      {/* Protected Routes with Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/edit/:id" element={<CreateResume />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
        <Route path="/ats" element={<ATSPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/profile" element={<ProfilePage />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
