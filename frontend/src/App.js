import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import StudentModel from "./StudentModel";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ExplorePage from "./pages/ExplorePage";
import QuizPage from "./pages/QuizPage";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import ContributorDashboard from "./pages/ContributorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";



// ✅ Homepage component with Get Started navigation
function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/explore");
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-section">
        <div className="left-content">
          <h1>Find Your Perfect Career Path</h1>
          <p>Discover your strengths.....</p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
        <div className="right-model">
          <StudentModel />
        </div>
      </div>
    </div>
  );
}

// ✅ App entry component with router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/quiz/:role" element={<QuizPage />} />

        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/mentor"
          element={
            <ProtectedRoute>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/contributor"
          element={
            <ProtectedRoute>
              <ContributorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;