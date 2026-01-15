
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

import heroImg from '../assets/Homehero.jpeg';
import doc1 from '../assets/Doc1.png';
import doc2 from '../assets/Doc2.png';
import doc3 from '../assets/Doc3.png';


const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Book Appointment <br /> With Trusted Doctors</h1>

        <div className="hero-badges">
          <div className="hero-avatar-group">
            <div className="hero-avatar" style={{ backgroundImage: `url(${doc1})` }} />
            <div className="hero-avatar" style={{ backgroundImage: `url(${doc2})` }} />
            <div className="hero-avatar" style={{ backgroundImage: `url(${doc3})` }} />
          </div>
          <p className="hero-badge-text">
            Simply browse through our extensive list of trusted doctors, <br />
            schedule your appointment hassle-free.
          </p>
        </div>

        <button 
          className="hero-button"
          onClick={() => navigate('/appointments')}
        >
          Book appointment <span style={{ fontSize: '1.2rem' }}>→</span>
        </button>
      </div>

      <div className="hero-image-container">
        <img className="hero-image" src={heroImg} alt="Trusted Doctors" />
      </div>
    </div>
  );
};

export default Hero;
