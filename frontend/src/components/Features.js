import React from "react";
import { motion } from "framer-motion";

const featuresData = [
  {
    title: "AI-Based Career Tests",
    emoji: "🧠",
    description:
      "Personalized guidance with smart algorithms to match your strengths.",
    image: "https://cdn-icons-png.flaticon.com/512/1087/1087815.png",
  },
  {
    title: "Real Career Insights",
    emoji: "📊",
    description:
      "Get data-driven insights into trending job roles and career demand.",
    image: "https://cdn-icons-png.flaticon.com/512/4149/4149653.png",
  },
  {
    title: "Expert Resources",
    emoji: "🎓",
    description:
      "Access curated articles, videos, and mentorship from professionals.",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  {
    title: "Career Community",
    emoji: "🌐",
    description:
      "Connect with like-minded individuals and grow your career network.",
    image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
];

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "2rem",
  marginTop: "3rem",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "2rem",
  boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "300px",
  cursor: "pointer",
};

const imageStyle = {
  width: "80px",
  height: "80px",
  marginBottom: "1rem",
};

const Features = () => {
  return (
    <section style={{ padding: "5rem 2rem", backgroundColor: "#f0f4f8" }}>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: "center",
          fontSize: "2.8rem",
          marginBottom: "2rem",
          color: "#2c3e50",
        }}
      >
        Why Choose <span style={{ color: "#4A90E2" }}>CareerPath</span>?
      </motion.h2>

      <div style={containerStyle}>
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            style={cardStyle}
            whileHover={{ scale: 1.07 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img src={feature.image} alt={feature.title} style={imageStyle} />
            <h3 style={{ color: "#4A90E2", marginBottom: "1rem" }}>
              {feature.emoji} {feature.title}
            </h3>
            <p style={{ color: "#555", fontSize: "1rem" }}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
