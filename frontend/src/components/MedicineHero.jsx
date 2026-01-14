
import React, { useState } from 'react';
import './MedicineHero.css';
// import medicinesImg from '../assets/med_herosec.png';
const medicinesImg = "https://via.placeholder.com/600x400?text=Medicine+Hero";

const MedicineHero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="medicine-hero">
      <div className="medicine-hero-content">
        <h1 className="medicine-hero-title">Order Medicines Online</h1>
        <p className="medicine-hero-text">
          Get your prescriptions delivered quickly and safely <br /> 
          to your doorstep.
        </p>
        
        <div className="medicine-search-bar">
          <input 
            type="text" 
            placeholder="Search for medicine..." 
            className="medicine-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch(searchTerm)}
          />
          <button 
            className="medicine-search-btn"
            onClick={() => onSearch(searchTerm)}
          >
            🔍
          </button>
        </div>
      </div>

      <div className="medicine-hero-image-container">
        <img src={medicinesImg} alt="Medicines" className="medicine-hero-image"  /> 
      </div>
    </div>
  );
};

export default MedicineHero;
