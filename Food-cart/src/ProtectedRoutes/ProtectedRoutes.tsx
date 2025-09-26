import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authStore";

const ProtectedRoutes = () => {
  const { token, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoutes;
