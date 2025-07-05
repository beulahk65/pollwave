import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PollResultsChart from "./PollResultsChart";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  const adminEmail = "admin@pollwave.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email === adminEmail) {
        alert("Access Denied: You are not a regular user");
        navigate("/login");
      } else {
        setUser(currentUser);
        fetchPolls();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchPolls = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/polls");
      const data = await response.json();
      setPolls(data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

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
        alert("Poll created!");
        setQuestion("");
        setOptions(["", ""]);
        fetchPolls();
      } else {
        alert("Error creating poll");
      }
    } catch (error) {
      alert("Server error");
      console.error(error);
    }
  };

  const handleVote = async (pollId) => {
    const optionIndex = selectedOptions[pollId];
    if (optionIndex === undefined) {
      alert("Please select an option before voting.");
      return;
    }

    const votedKey = `voted_${pollId}`;
    if (localStorage.getItem(votedKey)) {
      alert("You already voted on this poll.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId, optionIndex }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem(votedKey, "true");
        alert("Vote submitted!");
        fetchPolls();
      } else {
        alert("Failed to vote.");
      }
    } catch (error) {
      console.error("Vote error:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>Welcome, {user?.email}</h2>
        <button onClick={handleLogout} style={logoutBtn}>Logout</button>
      </div>

      <h3>Create a New Poll</h3>
      <form onSubmit={handlePollSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Enter your question"
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
        <button type="button" onClick={addOption} style={addOptionBtn}>+ Add Option</button>
        <button type="submit" style={createBtn}>Create Poll</button>
      </form>

      <hr />

      <h3>Available Polls</h3>
      {polls.length === 0 ? (
        <p>No polls available</p>
      ) : (
        polls.map((poll) => (
          <div key={poll.id} style={pollCard}>
            <PollResultsChart
              question={poll.question}
              options={poll.options}
              votes={poll.votes}
            />

            <form style={{ marginTop: "10px" }}>
              {poll.options.map((opt, idx) => (
                <label
                  key={idx}
                  style={{
                    ...optionLabelStyle,
                    backgroundColor: optionColors[idx % optionColors.length],
                  }}
                >
                  <input
                    type="radio"
                    name={`poll_${poll.id}`}
                    checked={selectedOptions[poll.id] === idx}
                    onChange={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [poll.id]: idx,
                      }))
                    }
                  />
                  <span style={{ marginLeft: "8px" }}>{opt}</span>
                </label>
              ))}
              <br />
              <button
                type="button"
                onClick={() => handleVote(poll.id)}
                style={voteBtn}
              >
                Submit Vote
              </button>
            </form>
          </div>
        ))
      )}
    </div>
  );
}

// ----------------- Styling ------------------

const containerStyle = {
  padding: "40px",
  fontFamily: "'Segoe UI', sans-serif",
  background: "linear-gradient(to right, #f8fafc, #e2e8f0)",
  minHeight: "100vh",
  color: "#1e293b",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "400px",
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  marginBottom: "30px",
};

const inputStyle = {
  padding: "12px",
  marginBottom: "12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
};

const addOptionBtn = {
  padding: "10px",
  backgroundColor: "#e2e8f0",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "10px",
};

const createBtn = {
  padding: "12px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  fontSize: "16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const logoutBtn = {
  padding: "10px 18px",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const pollCard = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.05)",
};

const voteBtn = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  cursor: "pointer",
};

const optionLabelStyle = {
  display: "block",
  marginBottom: "10px",
  fontSize: "15px",
  padding: "10px",
  borderRadius: "6px",
  fontWeight: "500",
};

// 🎨 Color palette for option blocks
const optionColors = [
  "#fef3c7", // light yellow
  "#d1fae5", // light green
  "#e0f2fe", // light blue
  "#fce7f3", // light pink
  "#ede9fe", // light purple
  "#fee2e2", // light red
];

export default UserDashboard;
