import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import { getMe } from "./features/auth/authThunk";

import PWAInstall from "./components/common/PWAInstall";

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  return (
    <>
      <PWAInstall />
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
