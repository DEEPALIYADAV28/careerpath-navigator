import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ExplorePage.css";

function ExplorePage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tagFromURL = queryParams.get("tag");

  const [careers, setCareers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(tagFromURL || "");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/careers")
      .then((response) => {
        setCareers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching careers:", error);
      });
  }, []);

  useEffect(() => {
    if (tagFromURL) {
      setSearchTerm(tagFromURL);
    }
  }, [tagFromURL]);

  const filteredCareers = careers.filter((career) => {
    if (!career || !career.title) return false;
    return career.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="explore-page">
      <h1>Explore Career Paths</h1>

      <input
        type="text"
        placeholder="Search careers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="career-list">
        {filteredCareers.length === 0 ? (
          <p>No careers found matching "{searchTerm}"</p>
        ) : (
          filteredCareers.map((career) => (
            <div key={career._id || career.title} className="career-card">
              <img
                src={
                  career.image ||
                  "https://via.placeholder.com/320x160?text=No+Image"
                }
                alt={career.title}
              />
              <div className="career-card-content">
                <h3>{career.title}</h3>
                <p>{career.description}</p>
                <p>
                  <strong>Skills Required: </strong>
                  {career.skills?.length > 0 ? career.skills.join(", ") : "N/A"}
                </p>
                <p>
                  <strong>Popular Exams: </strong>
                  {career.exams?.length > 0 ? career.exams.join(", ") : "N/A"}
                </p>
                <p>
                  <strong>Average Salary: </strong>
                  {career.salary || "N/A"}
                </p>
                <p>
                  <strong>Career Level: </strong>
                  {career.careerLevel || "N/A"}
                </p>
                <a
                  className="see-more-button"
                  href={career.moreInfoLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See More
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
