import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute ensures only authenticated users can access certain pages.
 * It checks for a token in localStorage.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If token doesn't exist, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the protected content
  return children;
};

export default ProtectedRoute;