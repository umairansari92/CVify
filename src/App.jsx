import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { getMe } from "./features/auth/authThunk";
import PWAInstall from "./components/common/PWAInstall";
import ErrorBoundary from "./components/common/ErrorBoundary";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const currentUrl = `https://app-cvifypro.vercel.app${location.pathname}`;

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      <PWAInstall />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
