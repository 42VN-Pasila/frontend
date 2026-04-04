import { Navigate } from "react-router-dom";

import { useAuth } from "../auth/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
};
