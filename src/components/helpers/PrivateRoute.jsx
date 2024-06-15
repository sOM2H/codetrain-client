import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/AuthProvider";

const PrivateRoute = () => {

  const user = useAuth();

  if (!user.accessToken || isTokenExpired(user.expiry)) {
     return <Navigate to="/login" />
  }

  return <Outlet />;
};

const isTokenExpired = (expiry) => {
  if (!expiry) {
    return true
  }

  const now = Date.now() / 1000;
  return expiry < now;
};


export default PrivateRoute;
