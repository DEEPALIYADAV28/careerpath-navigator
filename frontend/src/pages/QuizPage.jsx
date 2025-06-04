// src/pages/QuizPage.jsx
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./QuizPage.css";

const QuizPage = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [customInput, setCustomInput] = useState("");

  const navigate = useNavigate();
  const { role } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/admin/quiz/${role}`);
        setQuizData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load quiz:", err);
        alert("Unable to load quiz. Please try again.");
      }
    };
    fetchQuiz();
  }, [role]);

  const currentQuestion = quizData[currentStep];
  const isMultiSelect = currentQuestion?.question?.toLowerCase().includes("career");

  const handleOptionClick = (idx) => {
    const isOther = quizData[currentStep].options[idx].toLowerCase().includes("other");
    if (isMultiSelect) {
      if (selectedOption.includes(idx)) {
        setSelectedOption(selectedOption.filter(i => i !== idx));
      } else {
        setSelectedOption([...selectedOption, idx]);
      }
    } else {
      setSelectedOption([idx]);
    }
    if (isOther) setCustomInput("");
  };

  const handleNext = async () => {
    if (selectedOption.length === 0) return;

    let selectedAnswers = selectedOption.map(i => currentQuestion.options[i]);
    const includesOther = selectedAnswers.some(ans => ans.toLowerCase().includes("other"));
    if (includesOther && customInput.trim()) {
      selectedAnswers = selectedAnswers.filter(ans => !ans.toLowerCase().includes("other"));
      selectedAnswers.push(customInput.trim());
    }

    const updated = {
      ...answers,
      [currentQuestion.question]: selectedAnswers,
    };

    setAnswers(updated);

    if (currentStep < quizData.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption([]);
      setCustomInput("");
    } else {
      try {
        const token = localStorage.getItem("token");
        await axios.patch("http://localhost:5000/api/user/quiz", { answers: updated }, {
          headers: { Authorization: token },
        });
        navigate(`/dashboard/${role}`);
      } catch (err) {
        console.error("Quiz submission failed:", err);
        alert("Something went wrong while submitting your quiz.");
      }
    }
  };

  if (loading) return <p className="loading">Loading quiz...</p>;

  const progressPercent = ((currentStep + 1) / quizData.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="motion-wrapper"
          >
            <div className="question-text">{currentQuestion.question}</div>

            <div className="options-container">
              {currentQuestion.options.map((option, idx) => (
                <motion.div
                  key={idx}
                  className={`option ${selectedOption.includes(idx) ? "selected" : ""}`}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 12px #4caf50" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOptionClick(idx)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleOptionClick(idx);
                  }}
                >
                  {option}
                </motion.div>
              ))}

              {selectedOption.some(i =>
                currentQuestion.options[i].toLowerCase().includes("other")
              ) && (
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Please specify your option..."
                  className="neumorphic neumorphic-input"
                  style={{ marginTop: "1rem", padding: "12px", borderRadius: "10px", border: "1px solid #ccc" }}
                  required
                />
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={selectedOption.length === 0}
              className="next-button"
            >
              {currentStep === quizData.length - 1 ? "Finish" : "Next"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
