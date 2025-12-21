import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect rules on open
  useEffect(() => {
    const token = localStorage.getItem("token");
    const hasAccount = localStorage.getItem("hasAccount");
    if (token) return navigate("/doctors");
    if (hasAccount) return navigate("/login");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Map Username/Gmail to backend schema fields
      await API.post("/auth/register", {
        name: username,
        email: gmail,
        password
      });
      localStorage.setItem("hasAccount", "true");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Gmail"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create account</button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? {" "}
        <span style={{ color: "#0070f3", cursor: "pointer" }} onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
}
 
