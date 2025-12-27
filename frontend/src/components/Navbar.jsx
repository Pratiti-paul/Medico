
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasAccount"); // Optional: clear this if we want full reset
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Medico</h1>
      </div>
      <div className="navbar-links">
        <Link to="/doctors">Home</Link>
        <Link to="/medicines">Medicine</Link>
        <Link to="/appointments">Consultation</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="navbar-user">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
