import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content-wrapper">
        <div className="footer-brand">
          <h2 className="footer-logo">Medico</h2>
          <h4 className="footer-tagline">Medico – Effortless Healthcare Scheduling</h4>
          <p className="footer-description">
            Patients can instantly book appointments with trusted doctors—from
            routine check-ups to specialist care—in just a few clicks. Our smart
            reminders keep appointments on track, while real-time updates ensure
            seamless coordination. Designed for modern healthcare, we save time for
            both patients and providers.
          </p>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">COMPANY</h3>
          <div className="footer-link-list">
            <Link className="footer-link" to="/doctors">Home</Link>
            <Link className="footer-link" to="/about">About Us</Link>
            <Link className="footer-link" to="#">Contact Us</Link>
            <Link className="footer-link" to="#">Privacy Policy</Link>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">GET IN TOUCH</h3>
          <div className="footer-contact">
            <p>+91-90000-90000</p>
            <p>customersupport@medico.in</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} medico.in — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
