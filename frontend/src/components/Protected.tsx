import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAdmin } from "../store/adminStore";

const ProtectedRoutes = () => {
  const { token, isLoading } = useAdmin();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
