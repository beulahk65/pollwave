import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const adminEmail = "admin@pollwave.com"; // Change this to your admin email

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== adminEmail) {
        alert("Access Denied: Not an Admin");
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handlePollSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/polls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, options }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Poll created successfully");
        setQuestion("");
        setOptions(["", ""]);
      } else {
        alert("Error creating poll");
      }
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Welcome, Admin</h2>
      <p>Logged in as: {user?.email}</p>
      <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>

      <hr />
      <h3>Create a New Poll</h3>
      <form onSubmit={handlePollSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          style={inputStyle}
        />
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            required
            style={inputStyle}
          />
        ))}
        <button type="button" onClick={addOption} style={addButtonStyle}>+ Add Option</button>
        <br />
        <button type="submit" style={submitButtonStyle}>Create Poll</button>
      </form>
    </div>
  );
}

// --- Inline styles (you can replace with Tailwind/CSS later)
const containerStyle = {
  padding: "40px",
  fontFamily: "Arial",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "20px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const addButtonStyle = {
  padding: "8px",
  backgroundColor: "#eee",
  border: "1px solid #aaa",
  cursor: "pointer",
};

const submitButtonStyle = {
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  fontSize: "16px",
  borderRadius: "5px",
  cursor: "pointer",
};

const logoutButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  float: "right",
};

export default AdminDashboard;
