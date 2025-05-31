import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaQuestionCircle, FaChartPie } from "react-icons/fa";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItem = (to, icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1rem",
        textDecoration: "none",
        color: "#333",
        fontWeight: 500,
      }}
    >
      {icon}
      {!collapsed && label}
    </NavLink>
  );

  return (
    <aside
      style={{
        width: collapsed ? "60px" : "200px",
        transition: "width 0.3s",
        background: "#f4f4f4",
        height: "100vh",
        borderRight: "1px solid #ccc",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "1rem",
          cursor: "pointer",
          fontSize: "1.25rem",
        }}
        onClick={toggleSidebar}
      >
        <FaBars />
      </div>
      {navItem("/dashboard", <FaHome />, "Dashboard")}
      {navItem("/quiz-editor", <FaQuestionCircle />, "Quiz Editor")}
      {navItem("/analytics", <FaChartPie />, "Analytics")}
    </aside>
  );
};

export default Sidebar;
