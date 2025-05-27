// src/pages/QuizPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const quizData = {
  student: [
    { question: "Do you enjoy solving logical problems?", key: "logic" },
    { question: "Do you like working with numbers?", key: "numbers" },
    { question: "Do you prefer creative activities?", key: "creative" }
  ],
  mentor: [
    { question: "What subjects do you specialize in?", key: "subjects" },
    { question: "Do you prefer 1-on-1 mentoring or group sessions?", key: "mentoring_type" }
  ],
  contributor: [
    { question: "Do you write blogs or create videos?", key: "content_type" },
    { question: "What topics would you like to contribute on?", key: "topics" }
  ]
};

const QuizPage = () => {
  const { role } = useParams();
  const questions = quizData[role] || [];
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch('http://localhost:5000/api/user/quiz', { answers }, {
        headers: { Authorization: token }
      });
      navigate(`/dashboard/${role}`);
    } catch (err) {
      console.error('Quiz submit error:', err);
    }
  };

  return (
    <div className="quiz-page">
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Quiz</h2>
      {questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          <input
            type="text"
            onChange={(e) => handleChange(q.key, e.target.value)}
            placeholder="Your answer"
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizPage;

