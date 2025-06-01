// src/pages/AdminLogin.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5001/api/admin/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.admin.role);

      toast.success("Login successful!", { position: "top-center" });
      setTimeout(() => navigate("/quiz-editor"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        position: "top-center",
      });
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "1rem",
  },
  container: {
    backgroundColor: "#fff",
    padding: "3rem 2.5rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "2rem",
    color: "#4b0082",
    fontWeight: "700",
    fontSize: "2rem",
    letterSpacing: "1px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  input: {
    padding: "0.85rem 1rem",
    fontSize: "1.1rem",
    borderRadius: "8px",
    border: "1.8px solid #ddd",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "0.85rem 1rem",
    fontSize: "1.15rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6c63ff",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 12px rgba(108, 99, 255, 0.5)",
    transition: "background-color 0.3s ease",
  },
};

// Add a hover effect to button using React inline style trick
// Since inline styles don’t support :hover, you can add it via CSS or styled-components
// For simplicity, add this CSS to your global CSS file or index.css:
//
// button:hover {
//   background-color: #574bdb;
// }

export default AdminLogin;
