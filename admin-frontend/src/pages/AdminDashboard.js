// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/admin/quiz/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome Admin 👋</h2>

      {!stats ? (
        <p>Loading stats...</p>
      ) : (
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
          <Card title="Total Quizzes" value={stats.totalQuizzes} />
          <Card title="Roles Covered" value={stats.rolesCovered.join(", ")} />
          <Card title="Total Questions" value={stats.totalQuestions} />
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value }) => (
  <div style={{
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "200px",
    background: "#fff"
  }}>
    <h4>{title}</h4>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
  </div>
);

export default AdminDashboard;
