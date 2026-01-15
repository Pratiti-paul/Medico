import React from 'react';
import './Loader.css';

const Loader = ({ fullPage = false }) => {
  return (
    <div className={`loader-container ${fullPage ? 'full-page' : ''}`}>
      <div className="premium-spinner">
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
        <div className="spinner-dot"></div>
      </div>
    </div>
  );
};

export default Loader;
