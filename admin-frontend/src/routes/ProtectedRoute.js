import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("adminToken"); // use adminToken key here
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (requiredRole && role !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
