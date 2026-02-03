import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import CreateResume from "../pages/CreateResume";
import Templates from "../pages/Templates";
import Layout from "../components/common/Layout";

const AppRoutes = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes with Layout */}
      {token ? (
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateResume />} />
          <Route path="/edit/:id" element={<CreateResume />} />
          <Route path="/templates" element={<Templates />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
