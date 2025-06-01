import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CareerTestPage.css";

function CareerTestPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [savedAnswers, setSavedAnswers] = useState(() => {
    const saved = localStorage.getItem("careerTestAnswers");
    return saved ? JSON.parse(saved) : {};
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [results, setResults] = useState(null);
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userToken");

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizStarted, quizFinished]);

  const startQuiz = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/career");
      localStorage.setItem(
        "quizMessage",
        "Please login or register to take the career quiz."
      );
      navigate("/login");
    } else {
      setQuizStarted(true);
      setProgress(0);
      setTimeLeft(600);
    }
  };

  const saveProgress = (answers) => {
    localStorage.setItem("careerTestAnswers", JSON.stringify(answers));
    setSavedAnswers(answers);
    alert("Progress saved!");
  };

  const submitQuiz = (finalAnswers) => {
    // Simulate result generation based on finalAnswers
    setResults({
      careerPaths: ["Software Engineer", "Data Scientist"],
      tips: "Focus on improving your coding skills and explore data projects.",
      relatedResources: [
        { title: "Intro to Programming", url: "https://example.com/course" },
        { title: "Data Science Video", url: "https://youtube.com/example" },
      ],
    });
    setQuizFinished(true);
    localStorage.removeItem("careerTestAnswers");
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === "") {
      alert("Please enter your feedback before submitting.");
      return;
    }
    alert("Thank you for your feedback!");
    setFeedback("");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!quizStarted)
    return (
      <div className="career-test-intro container">
        <h1>🎯 Career Path Finder</h1>
        <p>Ready to explore the career best suited for you?</p>
        <ul>
          <li>⏱ Takes about 10 minutes</li>
          <li>📊 Get personalized career suggestions</li>
          <li>🧠 Based on your interests & strengths</li>
        </ul>
        <button className="start-btn" onClick={startQuiz}>
          🚀 Start Quiz
        </button>
      </div>
    );

  if (quizFinished)
    return (
      <div className="career-test-results container">
        <h2>🎉 Your Career Suggestions</h2>
        <ul>
          {results.careerPaths.map((career, i) => (
            <li key={i} className="career-path">
              ✅ {career}
            </li>
          ))}
        </ul>
        <h3>💡 Tips for You</h3>
        <p>{results.tips}</p>

        <h3>📚 Resources</h3>
        <ul>
          {results.relatedResources.map((res, i) => (
            <li key={i}>
              <a href={res.url} target="_blank" rel="noopener noreferrer">
                🔗 {res.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="feedback-section">
          <h4>🗣 We value your feedback</h4>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback here..."
          />
          <button onClick={handleFeedbackSubmit}>📩 Submit Feedback</button>
        </div>

        <div className="testimonials">
          <h3>🌟 User Success Stories</h3>
          <blockquote>
            "This quiz helped me find my true calling as a software engineer!"
          </blockquote>
          <blockquote>
            "Thanks to CareerPath, I discovered careers I never knew existed."
          </blockquote>
        </div>

        <div className="cta-buttons">
          <button onClick={() => navigate("/explore")}>🎓 Explore Courses</button>
          <button onClick={() => alert("Mentor connection coming soon!")}>
            🤝 Connect with a Mentor
          </button>
          <button onClick={() => alert("Workshops coming soon!")}>
            📅 Join Career Workshops
          </button>
        </div>
      </div>
    );

  return (
    <div className="career-test-quiz container">
      <h2>📝 Career Test In Progress</h2>
      <div className="progress-container" aria-label="Progress Bar">
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <p>
        Progress: {progress}% | Time left:{" "}
        <strong>{formatTime(timeLeft)}</strong>
      </p>

      {/* Placeholder for quiz questions */}
      <div className="quiz-box">
        <p>
          [This is a placeholder for quiz questions. Implement your questions
          here.]
        </p>
      </div>

      <div className="quiz-controls">
        <button
          className="btn-primary"
          onClick={() => {
            if (progress < 100) setProgress(progress + 20);
            else submitQuiz(savedAnswers);
          }}
        >
          {progress < 100 ? "➡️ Next" : "✅ Submit Quiz"}
        </button>
        <button className="btn-secondary" onClick={() => saveProgress(savedAnswers)}>
          💾 Save Progress
        </button>
        <button
          className="btn-danger"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to quit? Your progress will be lost."
              )
            ) {
              setQuizStarted(false);
              setProgress(0);
              setTimeLeft(600);
              setSavedAnswers({});
              localStorage.removeItem("careerTestAnswers");
            }
          }}
        >
          ❌ Quit Quiz
        </button>
      </div>
    </div>
  );
}

export default CareerTestPage;
