import React from 'react';
import AboutHeader from '../components/AboutHeader';
import MissionSection from '../components/MissionSection';
import OfferingsSection from '../components/OfferingsSection';
import VisionSection from '../components/VisionSection';
import Feedback from '../components/Feedback';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <AboutHeader />
      <MissionSection />
      <VisionSection />
      <OfferingsSection />
      <Feedback />
    </div>
  );
};

export default About;
