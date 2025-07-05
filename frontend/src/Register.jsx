import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={bgStyle}>
      <div style={overlay}>
        <div style={formContainer}>
          <h2 style={titleStyle}>Create an Account</h2>
          <form onSubmit={handleRegister} style={formStyle}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Register</button>
            <p style={linkText}>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} style={linkStyle}>Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// -------------------- Styles --------------------

const bgStyle = {
  backgroundImage: "url('https://i.pinimg.com/736x/7d/66/04/7d6604111a2fb44b73a4bc8b643e479d.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  fontFamily: "'Segoe UI', sans-serif",
};

const overlay = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formContainer = {
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  padding: "40px",
  borderRadius: "12px",
  width: "320px",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "28px",
  marginBottom: "20px",
  color: "#1e293b",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  padding: "12px",
  marginBottom: "15px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#10b981",
  color: "white",
  border: "none",
  fontSize: "16px",
  borderRadius: "6px",
  cursor: "pointer",
};

const linkText = {
  marginTop: "16px",
  textAlign: "center",
  fontSize: "14px",
  color: "#1e293b",
};

const linkStyle = {
  color: "#007bff",
  cursor: "pointer",
  fontWeight: "500",
};

export default Register;
