import React from "react";
import { useNavigate } from "react-router-dom";
import StudentModel from "../StudentModel";
import Features from "../components/Features";
import Programs from "./Programs";
import TopUniversitiesSlider from "./TopUniversitiesSlider";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
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

      {/* Features Section */}
      <Features />
      <Programs />
      <TopUniversitiesSlider />
      <Footer />
    </>
  );
};

export default HomePage;
