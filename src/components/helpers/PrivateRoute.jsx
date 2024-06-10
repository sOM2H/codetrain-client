import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../hooks/AuthProvider";

const PrivateRoute = () => {

  const user = useAuth();

  if (isTokenExpired) {
    <Navigate to="/login" />
  }

  if (user.accessToken && user.email) {
    return <Outlet />;
  }

  <Navigate to="/login" />
};

const isTokenExpired = (exipry) => {
  const now = Date.now() / 1000;
  return exipry < now;
};


export default PrivateRoute;
