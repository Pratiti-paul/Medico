
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasAccount");
    navigate("/login");
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Medico</h1>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/medicines">Medicine</Link>
        <Link to="/appointments">Consultation</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="navbar-user">
        <div className="navbar-actions">
          <Link to="/orders" className="cart-btn" aria-label="Cart">🛒 Cart</Link>
          <div className="account-wrap">
            <button
              ref={btnRef}
              className="account-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              Account ▾
            </button>
            {menuOpen && (
              <div ref={menuRef} className="account-menu" role="menu">
                <button className="menu-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
