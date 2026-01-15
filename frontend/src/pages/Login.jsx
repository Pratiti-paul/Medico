
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
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
      localStorage.setItem("role", data.user.role);

      // Navigate based on role
      toast.success("Logged in successfully!");
      if (data.user.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
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
            <div className="role-selection">
              <button 
                type="button" 
                className={`role-btn ${formData.role === 'user' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'user'})}
              >
                Patient
              </button>
              <button 
                type="button" 
                className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'admin'})}
              >
                Admin
              </button>
            </div>

            <button className="auth-button" type="submit">Login</button>
          </form>
          <div className="auth-text-link">
            Don't have an account? 
            <Link to="/">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
