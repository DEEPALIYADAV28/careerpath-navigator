import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import StudentModel from "./StudentModel";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ExplorePage from "./pages/ExplorePage";
import QuizPage from "./pages/QuizPage";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import ContributorDashboard from "./pages/ContributorDashboard";
import Contact from "./pages/Contact";
import CareerTestPage from "./pages/CareerTestPage";

import ProtectedRoute from "./components/ProtectedRoute";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <div className="main-section">
        <div className="left-content">
          <h1>Find Your Perfect Career Path</h1>
          <p>Discover your strengths and unlock your potential!</p>
          <button className="cta-button" onClick={() => navigate("/explore")}>
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/quiz/:role" element={<QuizPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<CareerTestPage />} /> {/* Fixed path */}
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
