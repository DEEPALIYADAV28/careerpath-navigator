import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: token },
        });
        setUser(res.data);
        setTags(res.data.tags || []);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  const formatTag = (tag) => {
    return tag
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-6">
      {user && (
        <h2 className="text-2xl font-bold mb-6">
          Welcome, {user.name} 👋
        </h2>
      )}

      <h3 className="text-lg font-semibold mb-4">
        Here are some personalized paths you might like:
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <h4 className="text-xl font-medium text-blue-800 mb-2">
              {formatTag(tag)}
            </h4>
            <a
              href={`/explore?tag=${tag}`}
              className="text-sm text-blue-500 hover:underline"
            >
              Explore more about {formatTag(tag)} career options →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
