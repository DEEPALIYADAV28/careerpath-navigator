import React, { useState } from "react";
import axios from "axios";

const AdminQuizEditor = () => {
    const [role, setRole] = useState("student");
    const [questions, setQuestions] = useState([
        { question: "", options: ["", "", "", ""] }
    ]);

    const handleChange = (idx, field, value) => {
        const newQuestions = [...questions];
        if (field === "question") newQuestions[idx].question = value;
        else newQuestions[idx].options[field] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", "", ""] }]);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5001/api/admin/quiz/add", {
                role,
                questions
            }, {
                headers: { Authorization: token }
            });
            alert("Quiz saved!");
        } catch (err) {
            alert("Error saving quiz");
            console.error(err);
        }
    };

    return (
        <div className="editor">
            <h2>Quiz Editor for {role}</h2>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="contributor">Contributor</option>
            </select>

            {questions.map((q, idx) => (
                <div key={idx}>
                    <input
                        placeholder="Question"
                        value={q.question}
                        onChange={(e) => handleChange(idx, "question", e.target.value)}
                    />
                    {q.options.map((opt, i) => (
                        <input
                            key={i}
                            placeholder={`Option ${i + 1}`}
                            value={opt}
                            onChange={(e) => handleChange(idx, i, e.target.value)}
                        />
                    ))}
                    <button onClick={() => {
                        const newQs = [...questions];
                        newQs[idx].options.push("");
                        setQuestions(newQs);
                    }}>+ Add Option</button>

                </div>
            ))}

            <button onClick={addQuestion}>+ Add Question</button>
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
};

export default AdminQuizEditor;
