import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminQuizEditor = () => {
  const [role, setRole] = useState("student");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""] },
  ]);

  // Fetch quiz if already exists for this role
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/admin/quiz/${role}`
        );
        setQuestions(res.data);
      } catch (err) {
        setQuestions([{ question: "", options: ["", "", "", ""] }]);
      }
    };
    fetchQuiz();
  }, [role]);

  const handleChange = (qIdx, field, value) => {
    const updated = [...questions];
    if (field === "question") {
      updated[qIdx].question = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };
  const [role, setRole] = useState("student");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""] }
  ]);

  // Fetch quiz if already exists for this role
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/admin/quiz/${role}`);
        setQuestions(res.data);
      } catch (err) {
        setQuestions([{ question: "", options: ["", "", "", ""] }]);
      }
    };
    fetchQuiz();
  }, [role]);

  const handleChange = (qIdx, field, value) => {
    const updated = [...questions];
    if (field === "question") {
      updated[qIdx].question = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: [""] }]);
  };

  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push("");
    setQuestions(updated);
  };

  const deleteQuestion = (qIdx) => {
    const updated = questions.filter((_, idx) => idx !== qIdx);
    setQuestions(updated);
  };

  const deleteOption = (qIdx, oIdx) => {
    const updated = [...questions];
    updated[qIdx].options.splice(oIdx, 1);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/api/admin/quiz/add", {
        role,
        questions
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Quiz saved!");
    } catch (err) {
      alert("Error saving quiz");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5001/api/admin/quiz/update/${role}`, {
        questions
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Quiz updated!");
    } catch (err) {
      alert("Error updating quiz");
      console.error(err);
    }
  };

  const handleDeleteQuiz = async () => {
    const confirm = window.confirm(`Are you sure you want to delete the entire quiz for '${role}'?`);
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/admin/quiz/delete/${role}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Quiz for '${role}' deleted successfully.`);
      setQuestions([{ question: "", options: [""] }]);
    } catch (err) {
      alert("Error deleting quiz");
      console.error(err);
    }
  };

  return (
    <div className="editor" style={{ padding: "2rem" }}>
      <h2>Quiz Editor for <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="mentor">Mentor</option>
        <option value="contributor">Contributor</option>
      </select></h2>

      {questions.map((q, qIdx) => (
        <div key={qIdx} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleChange(qIdx, "question", e.target.value)}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          {q.options.map((opt, oIdx) => (
            <div key={oIdx} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <input
                type="text"
                placeholder={`Option ${oIdx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                style={{ flex: 1 }}
              />
              <button onClick={() => deleteOption(qIdx, oIdx)}>🗑️</button>
            </div>
          ))}
          <button onClick={() => addOption(qIdx)}>+ Add Option</button>
          <button onClick={() => deleteQuestion(qIdx)} style={{ marginLeft: "1rem", color: "red" }}>
            Delete Question
          </button>
        </div>
      ))}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={addQuestion}>+ Add Question</button>
        <button onClick={handleSubmit} style={{ marginLeft: "1rem" }}>
          Submit Quiz
        </button>
        <button onClick={handleUpdate} style={{ marginLeft: "1rem" }}>
          Update Quiz
        </button>
        <button
          onClick={handleDeleteQuiz}
          style={{ marginLeft: "1rem", background: "#e74c3c", color: "#fff" }}
        >
          Delete Entire Quiz
        </button>
      </div>
    </div>
  );
      <div style={{ marginTop: "1rem" }}>
        <button onClick={addQuestion}>+ Add Question</button>
        <button onClick={handleSubmit} style={{ marginLeft: "1rem" }}>Submit Quiz</button>
        <button onClick={handleUpdate} style={{ marginLeft: "1rem" }}>Update Quiz</button>
        <button onClick={handleDeleteQuiz} style={{ marginLeft: "1rem", background: "#e74c3c", color: "#fff" }}>
          Delete Entire Quiz
        </button>
      </div>
    </div>
  );
};

export default AdminQuizEditor;
