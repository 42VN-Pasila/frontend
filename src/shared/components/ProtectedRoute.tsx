import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { sessionVerify } from "../utils/sessionVerify";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null >(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await sessionVerify();
      setAuthenticated(isLoggedIn);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null){
    return <div>Loading...</div>
  }

  if (isAuthenticated){
    return <>{children}</>;
  }
  return <Navigate to='/login' replace/>;
};
