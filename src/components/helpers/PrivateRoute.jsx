import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const PrivateRoute = () => {

  const user = useAuth();

  if (user.token && user.email && user.id) return <Outlet />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
