import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import "./QuizPage.css";

const quizData = [
  {
    question: "Which language is used for web apps?",
    options: ["Python", "JavaScript", "C++", "Java"],
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
  },
  {
    question: "React is developed by?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
  },
  {
    question: "What is your favorite programming language?",
    options: ["JavaScript", "Python", "Java", "C++"],
  },
  {
    question: "Which framework do you prefer?",
    options: ["React", "Angular", "Vue", "Svelte"],
  },
];

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const { role } = useParams();

  const questionCount = quizData.length;
  const progressPercent = ((currentStep + 1) / questionCount) * 100;

  const handleOptionClick = (idx) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    if (currentStep < questionCount - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      // ✅ Redirect based on role
      if (role === "student") {
        navigate("/dashboard/student");
      } else if (role === "mentor") {
        navigate("/dashboard/mentor");
      } else if (role === "contributor") {
        navigate("/dashboard/contributor");
      } else {
        alert("Invalid role. Cannot redirect to dashboard.");
      }
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
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
            <div className="question-text">
              {quizData[currentStep].question}
            </div>

            <div className="options-container">
              {quizData[currentStep].options.map((option, idx) => (
                <motion.div
                  key={idx}
                  className={`option ${
                    selectedOption === idx ? "selected" : ""
                  }`}
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
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="next-button"
        >
          {currentStep === questionCount - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
