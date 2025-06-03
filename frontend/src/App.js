import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ExplorePage from "./pages/ExplorePage";
import QuizPage from "./pages/QuizPage";
import Contact from "./pages/Contact";
import CareerTestPage from "./pages/CareerTestPage";
import Programs from "./pages/Programs";

import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import ContributorDashboard from "./pages/ContributorDashboard";

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
        <Route path="/career" element={<CareerTestPage />} />
        <Route path="/programs" element={<Programs />} />
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
