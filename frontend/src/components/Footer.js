import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1e1b4b",
        color: "#ffffff",
        padding: "3rem 1.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        {/* Brand Section */}
        <div style={{ flex: "1 1 250px", minWidth: "250px" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            Career Navigator
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
            Guiding your journey to top universities and brighter futures.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
          <h3 style={headingStyle}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href="/" style={linkStyle}>
                Home
              </a>
            </li>
            <li>
              <a href="/explore" style={linkStyle}>
                Explore
              </a>
            </li>
            <li>
              <a href="/contact" style={linkStyle}>
                Contact
              </a>
            </li>
            <li>
              <a href="/career" style={linkStyle}>
                Career-Test
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ flex: "1 1 200px", minWidth: "200px" }}>
          <h3 style={headingStyle}>Contact</h3>
          <p>
            Email:{" "}
            <a href="mailto:info@careernavigator.com" style={linkStyle}>
              info@careernavigator.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+919876543210" style={linkStyle}>
              +91 98765 43210
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div style={{ flex: "1 1 150px", minWidth: "150px" }}>
          <h3 style={headingStyle}>Follow Us</h3>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <a href="#" style={iconStyle}>
              <Facebook size={20} />
            </a>
            <a href="#" style={iconStyle}>
              <Twitter size={20} />
            </a>
            <a href="#" style={iconStyle}>
              <Instagram size={20} />
            </a>
            <a href="#" style={iconStyle}>
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <hr style={{ margin: "2rem 0", borderColor: "#44406a" }} />

      <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#c7c5e1" }}>
        © {new Date().getFullYear()} Career Navigator. All rights reserved.
      </p>
    </footer>
  );
};

const headingStyle = {
  fontSize: "1.3rem",
  marginBottom: "1rem",
};

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "1rem",
  marginBottom: "0.5rem",
  display: "block",
  transition: "color 0.3s",
};

const iconStyle = {
  color: "#ffffff",
  backgroundColor: "#3b3678",
  borderRadius: "50%",
  padding: "0.5rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s, transform 0.3s",
  textDecoration: "none",
};

export default Footer;
