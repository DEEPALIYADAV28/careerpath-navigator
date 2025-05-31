// src/routes/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token"); // matches AdminLogin now
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (requiredRole && role !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
