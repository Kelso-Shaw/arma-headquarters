import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = () => {
  const { auth } = useAuth();

  if (auth.loading) {
    return;
  }

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
