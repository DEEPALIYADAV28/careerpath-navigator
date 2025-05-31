import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdminAnalytics = () => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/admin/quiz/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const pieData = res.data.rolesCovered.map((role, i) => ({
          name: role,
          value: 1,
        }));

        const barData = [
          {
            name: "Quizzes",
            value: res.data.totalQuizzes,
          },
          {
            name: "Questions",
            value: res.data.totalQuestions,
          },
        ];

        setQuizData({ pieData, barData });
      } catch (err) {
        console.error("Error loading analytics:", err);
      }
    };

    fetchStats();
  }, []);

  if (!quizData.pieData) return <p style={{ padding: "2rem" }}>Loading charts...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Analytics Overview</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginTop: "2rem" }}>
        <div style={{ width: "400px", height: "300px" }}>
          <h4>Quiz Distribution by Role</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={quizData.pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {quizData.pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: "400px", height: "300px" }}>
          <h4>Quizzes vs Questions</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quizData.barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
