import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

export default function Login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const hasAccount = localStorage.getItem("hasAccount");
    if (token) return navigate("/doctors");
    if (!hasAccount) return navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email: gmail,
        password
      });
      localStorage.setItem("token", res.data.token);
      navigate("/doctors");
    } catch (err) {
      setError("Invalid Gmail or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: 12 }}>
        New here? {" "}
        <span style={{ color: "#0070f3", cursor: "pointer" }} onClick={() => navigate("/")}>
          Create an account
        </span>
      </p>
    </div>
  );
}
 
