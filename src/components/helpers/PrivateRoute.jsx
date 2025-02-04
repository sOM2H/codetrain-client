import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const PrivateRoute = () => {
  const { currentUser, loading} = useAuth();

  if (loading) {
    return <></>;
  }

  return currentUser ? <Outlet context={{ currentUser }} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
