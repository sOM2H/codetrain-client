import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const PrivateRoute = () => {
  const { accessToken, currentUser } = useAuth();

  if (accessToken === "" || currentUser === null) {
    return <Navigate to="/login" />;
  }

  if (isTokenExpired(accessToken)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return exp < Date.now() / 1000;
  } catch (error) {
    console.error("Invalid token", error);
    return true;
  }
};

export default PrivateRoute;
