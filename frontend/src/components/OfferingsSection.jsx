import React from 'react';
import './OfferingsSection.css';
import icon1 from '../assets/1.png';
import icon2 from '../assets/2.png';
import icon3 from '../assets/3.png';
import icon4 from '../assets/4.png';

const OfferingsSection = () => {
  const offerings = [
    {
      title: "Doctor Appointments",
      description: "Browse verified doctors, check availability, and book appointments instantly without long waiting times.",
      icon: icon1
    },
    {
        title: "Online Medicine Store",
        description: "Order medicines online from trusted sources and get them delivered right to your doorstep.",
        icon: icon2
    },
    {
        title: "Health Records",
        description: "Securely manage your medical history and prescriptions in one place for easy access anytime.",
        icon: icon3
    },
    {
        title: "Trusted Platform",
        description: "We prioritize data security and transparency, ensuring your information stays safe and confidential.",
        icon: icon4
    }
  ];

  return (
    <div className="offerings-section">
        <h2>What We Offer</h2>
        <div className="offerings-grid">
            {offerings.map((offer, index) => (
                <div key={index} className="offering-card">
                    <img src={offer.icon} alt={offer.title} className="offering-icon" />
                    <div className="offering-info">
                        <h3>{offer.title}</h3>
                        <p>{offer.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default OfferingsSection;
