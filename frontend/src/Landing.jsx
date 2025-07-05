import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={bgStyle}>
      <div style={overlay}>
        <div style={contentBox}>
          <h1 style={titleStyle}>Welcome to PollWave</h1>
          <p style={subtitleStyle}>Vote Live. See Instant Results. Powered by DevOps.</p>
          <div style={buttonGroup}>
            <button onClick={() => navigate("/register")} style={buttonStyle}>Register</button>
            <button onClick={() => navigate("/login")} style={buttonStyle}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Styles ----------

const bgStyle = {
  backgroundImage: "url('https://i.pinimg.com/736x/7d/66/04/7d6604111a2fb44b73a4bc8b643e479d.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Segoe UI', sans-serif",
};

const overlay = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentBox = {
  textAlign: "center",
  color: "white",
  padding: "40px",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
};

const titleStyle = {
  fontSize: "48px",
  marginBottom: "20px",
  fontWeight: "600",
};

const subtitleStyle = {
  fontSize: "20px",
  marginBottom: "30px",
  fontWeight: "300",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const buttonStyle = {
  padding: "12px 24px",
  fontSize: "16px",
  backgroundColor: "#ffffff",
  color: "#1e293b",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "transform 0.2s ease",
};

export default Landing;
