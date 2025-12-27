import "./Home.css";
import Hero from "../components/Hero";
import TopDoctors from "../components/TopDoctors";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <Hero />

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <h2 className="feature-title">Find Doctors</h2>
          <p className="feature-text">Browse our list of specialist doctors and book appointments with top-rated professionals.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Order Medicine</h2>
          <p className="feature-text">Get your prescriptions delivered right to your doorstep with our fast delivery service.</p>
        </div>
        <div className="feature-card">
          <h2 className="feature-title">Consultations</h2>
          <p className="feature-text">View your upcoming appointments, history, and get instant medical advice.</p>
        </div>
      </div>


      {/* Top Doctors Section */}
      <TopDoctors />

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
