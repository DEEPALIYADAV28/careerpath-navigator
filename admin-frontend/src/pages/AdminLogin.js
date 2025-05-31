import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", {
        email,
        password,
      });

      // Store token with key 'adminToken'
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("role", "admin");

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Admin Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Login
          </button>

          <p style={styles.registerText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.registerLink}>
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  background: {
    height: "100vh",
    width: "100%",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "15px",
    padding: "2.5rem",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    marginBottom: "2rem",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "2rem",
    color: "#1a1a1a",
  },
  input: {
    marginBottom: "1.25rem",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "0.75rem 1rem",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  registerText: {
    marginTop: "1.2rem",
    textAlign: "center",
    fontSize: "0.95rem",
    color: "#555",
  },
  registerLink: {
    color: "#2980b9",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default AdminLogin;
