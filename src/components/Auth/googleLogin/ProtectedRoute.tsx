import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authStorage } from "./AuthStorage";

type Props = {
  redirectTo?: string;
};

const ProtectedRoute: React.FC<Props> = ({ redirectTo = "/login" }) => {
  const auth = authStorage.get();

  if (!auth?.accessToken) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
