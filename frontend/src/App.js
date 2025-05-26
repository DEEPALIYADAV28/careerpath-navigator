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
import Explore from "./pages/Explore"; // ✅ Import Explore page

// ✅ Homepage component with Get Started navigation
function HomePage() {
  const navigate = useNavigate(); // React Router hook to navigate

  const handleGetStarted = () => {
    navigate("/explore"); // Navigate to Explore page
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
        <Route path="/explore" element={<Explore />} /> {/* ✅ Explore route */}
      </Routes>
    </Router>
  );
}

export default App;
