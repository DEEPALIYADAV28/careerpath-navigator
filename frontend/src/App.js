import React from "react";
import "./App.css";
import StudentModel from "./StudentModel"; // 3D model
import Navbar from "./components/Navbar"; // Navbar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-section">
        <div className="left-content">
          <h1>Find Your Perfect Career Path</h1>
          <p>
            Discover your strengths, explore careers, and navigate your future
            with confidence. Let us guide you with AI-powered insights.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
        <div className="right-model">
          <StudentModel />
        </div>
      </div>
    </div>
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
