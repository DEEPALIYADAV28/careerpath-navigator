import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminQuizEditor from "./pages/AdminQuizEditor";

function App() {
  return (
    <Router>
      <div className="admin-app">
        <header className="admin-header">
          <h1>CareerPath Navigator — Admin Panel</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/quiz-editor" />} />
            <Route path="/quiz-editor" element={<AdminQuizEditor />} />
            {/* You can add more admin routes here like */}
            {/* <Route path="/analytics" element={<AdminAnalytics />} /> */}
            {/* <Route path="/users" element={<AdminUserManager />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
