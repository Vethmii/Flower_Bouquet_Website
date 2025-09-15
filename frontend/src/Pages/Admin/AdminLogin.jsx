import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded admin credentials (for now)
  const adminUser = {
    username: "admin",
    password: "admin123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === adminUser.username && password === adminUser.password) {
      localStorage.setItem("isAdmin", "true"); // simple login flag
      navigate("/admin"); // redirect to admin panel
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", width: "300px", gap: "15px" }}
      >
        <h2 style={{ textAlign: "center", color: "#800080" }}>Admin Login</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#800080",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminLogin;
