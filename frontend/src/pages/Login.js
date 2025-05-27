import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import Lottie from "lottie-react";

// Lottie animation files
import mascotAnimation from "../assets/mascot.json"; // existing mascot (right)
import mascot2Animation from "../assets/mascot2.json"; // new mascot (left)

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [rippleStyle, setRippleStyle] = useState({});
  const [showRipple, setShowRipple] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.email.includes("@gmil.com")) {
      setMessage("Did you mean '@gmail.com'? Please correct your email.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      setMessage(`Welcome ${res.data.user.name}`);
      const userRole = res.data.user.role;
      setTimeout(() => {
        navigate(`/quiz/${userRole }`);
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const handleRipple = (e) => {
    const rect = e.target.getBoundingClientRect();
    setRippleStyle({
      left: e.clientX - rect.left + "px",
      top: e.clientY - rect.top + "px",
    });
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };

  useEffect(() => {
    const card = document.querySelector(".neumorphic-card");
    if (card) {
      card.classList.add("animate-entrance");
    }
  }, []);

  return (
    <div className="login-page">
      {/* Left-side new mascot */}
      <Lottie
        animationData={mascot2Animation}
        className="mascot mascot--left"
        loop
        autoplay
      />

      {/* Centered Login Form */}
      <div className="neumorphic neumorphic-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="neumorphic neumorphic-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="neumorphic neumorphic-input"
            required
          />
          <button
            type="submit"
            className="neumorphic neumorphic-button"
            onClick={handleRipple}
            disabled={loading}
          >
            {showRipple && <span className="ripple" style={rippleStyle}></span>}
            {loading ? "Loading..." : "Login"}
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>

      {/* Right-side existing mascot */}
      <Lottie
        animationData={mascotAnimation}
        className="mascot mascot--right"
        loop
        autoplay
      />
    </div>
  );
};

export default Login;
