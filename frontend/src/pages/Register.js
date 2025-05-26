import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegStyle.css";
import Lottie from "lottie-react";
import rocketAnimation from "../assets/rocket.json"; // Replace with your chosen animation

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check for common typo in email
    if (formData.email.includes("@gmil.com")) {
      setMessage("Did you mean '@gmail.com'? Please correct your email.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      setMessage(res.data.message);
      // Redirect to login page after successful registration
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const card = document.querySelector(".glass-card");
    if (card) {
      card.classList.add("animate-entrance");
    }
  }, []);

  return (
    <div className="register-page">
      <Lottie
        animationData={rocketAnimation}
        className="rocket"
        loop
        autoplay
      />
      <div className="glass-card">
        <h2>Join the Journey</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="glass-input"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="glass-input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="glass-input"
            required
          />
          <button type="submit" className="glass-button" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
