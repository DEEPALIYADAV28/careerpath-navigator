// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AdminQuizEditor from "./pages/AdminQuizEditor";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import ProtectedRoute from "./routes/ProtectedRoute";
import Sidebar from "./components/Sidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Header with Logout Button
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <header className="admin-header" style={styles.header}>
      <h1 style={styles.title}>CareerPath Navigator — Admin Panel</h1>
      {isLoggedIn && (
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      )}
    </header>
  );
};

// Layout wrapper for pages that need sidebar
const AdminLayout = ({ children }) => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <main style={{ flexGrow: 1 }}>{children}</main>
  </div>
);

function App() {
  return (
    <Router>
      <div className="admin-app">
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<AdminLogin />} />

          {/* ✅ Protected Routes with Sidebar */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz-editor"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AdminQuizEditor />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout>
                  <AdminAnalytics />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Unauthorized Access Page */}
          <Route
            path="/unauthorized"
            element={<h2 style={{ padding: "2rem" }}>🚫 Access Denied</h2>}
          />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

// Styling
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#0b3d91",
    color: "#fff",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
