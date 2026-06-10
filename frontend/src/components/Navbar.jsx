
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import Accounticon from "../assets/Account icon.png";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-brand">
        <h1 data-testid="nav-logo">Medico</h1>
      </div>
      
      <button 
        className="hamburger-menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation"
      >
        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to="/home" onClick={() => setMobileMenuOpen(false)} data-testid="nav-home">Home</Link>
        <Link to="/medicines" onClick={() => setMobileMenuOpen(false)} data-testid="nav-medicines">Medicine</Link>
        <Link to="/appointments" onClick={() => setMobileMenuOpen(false)} data-testid="nav-appointments">Consultation</Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)} data-testid="nav-about">About</Link>
      </div>
      <div className="navbar-user">
        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn" aria-label="Cart" data-testid="nav-cart">
             🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <div className="account-wrap">
            <div 
              className="account-trigger"
              ref={btnRef}
              onClick={() => setMenuOpen((v) => !v)}
              data-testid="account-trigger"
            >
              <img 
                src={Accounticon} 
                alt="Account" 
                className="account-icon"
              />
            </div>
            {menuOpen && (
              <div ref={menuRef} className="account-menu" role="menu">
                <button className="menu-item" onClick={() => navigate('/profile')} data-testid="nav-profile">Profile</button>
                <button className="menu-item" onClick={() => navigate('/my-orders')} data-testid="nav-orders">Order History</button>
                <button className="menu-item" onClick={handleLogout} data-testid="nav-logout">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
