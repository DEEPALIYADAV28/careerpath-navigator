// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar      from "./components/Navbar";
import StudentModel from "./StudentModel";
import Register    from "./pages/Register";
import Login       from "./pages/Login";

function HomePage() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-section">
        {/* …your home content… */}
        <div className="left-content">
          <h1>Find Your Perfect Career Path</h1>
          <p>Discover your strengths…</p>
          <button className="cta-button">Get Started</button>
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
      <Routes>
        {/* Home only on “/” */}
        <Route path="/"        element={<HomePage />} />

        {/* Separate pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />}  />
      </Routes>
    </Router>
  );
}

export default App;
