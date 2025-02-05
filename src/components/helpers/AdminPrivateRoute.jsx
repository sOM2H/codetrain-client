import React from "react";
import { Navigate, Outlet, useOutletContext} from "react-router-dom";

const AdminPrivateRoute = () => {
  const { currentUser } = useOutletContext();

  if (currentUser.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet context={{ currentUser }} />;
};

export default AdminPrivateRoute;
