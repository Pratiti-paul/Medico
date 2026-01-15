
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Success - Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to main project (Doctors page as default dashboard)
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content-wrapper">
        <div className="auth-card">
          <h2 className="auth-title">Medico Login</h2>
          {error && <div className="auth-error-message">{error}</div>}
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="Gmail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="auth-button" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
