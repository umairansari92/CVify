import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import CreateResume from "../pages/CreateResume";
import Templates from "../pages/Templates";
import CoverLetterPage from "../pages/CoverLetterPage";
import ReferralPage from "../pages/ReferralPage";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/edit/:id" element={<CreateResume />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
        <Route path="/referral" element={<ReferralPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
