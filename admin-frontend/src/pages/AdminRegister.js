import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/admin/register", {
        email,
        password,
        secretKey,
      });

      toast.success("Admin registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Admin Registration</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Secret Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Register
          </button>

          <p style={styles.loginText}>
            Already an admin?{" "}
            <Link to="/login" style={styles.loginLink}>
              Login here
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
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80')",
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
  loginText: {
    marginTop: "1.2rem",
    textAlign: "center",
    fontSize: "0.95rem",
    color: "#555",
  },
  loginLink: {
    color: "#2980b9",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default AdminRegister;
