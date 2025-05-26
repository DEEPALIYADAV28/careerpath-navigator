import React, { useState } from "react";
import "./Explore.css";

const careerData = [
  { title: "Software Engineer", category: "Technology", description: "Build and maintain software applications." },
  { title: "Graphic Designer", category: "Design", description: "Create visual content to communicate messages." },
  { title: "Data Analyst", category: "Analytics", description: "Interpret data to help companies make decisions." },
  { title: "Doctor", category: "Healthcare", description: "Diagnose and treat patients to improve health." },
  { title: "Teacher", category: "Education", description: "Educate students and help them learn." },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCareers = careerData.filter((career) =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-wrapper">
      <div className="explore-header">
        <h1>Explore Careers</h1>
        <p>Browse through trending career paths and find your future</p>
        <input
          type="text"
          placeholder="Search careers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="career-grid">
        {filteredCareers.map((career, index) => (
          <div className="career-card" key={index}>
            <h3>{career.title}</h3>
            <span className="category-tag">{career.category}</span>
            <p>{career.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
