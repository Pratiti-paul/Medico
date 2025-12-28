
import React from 'react';
import './MedicineHero.css';
import medicinesImg from '../assets/med_herosec.png';

const MedicineHero = ({ onSearch }) => {
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
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="medicine-search-btn">
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
