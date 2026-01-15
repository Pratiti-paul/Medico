import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import "./Appointments.css";

import generalIcon from "../assets/Physician Medical Assistance.png";
import gynecologistIcon from "../assets/gynecologist.png";
import dermatologistIcon from "../assets/Dermatologist icon.png";
import pediatricianIcon from "../assets/Pediatrician Icon.png";
import neurologistIcon from "../assets/Neurologist Icon.png";
import gastroIcon from "../assets/Gastroenterologists Icon.png";

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const specialities = [
    { name: "General physician", icon: generalIcon },
    { name: "Gynecologist", icon: gynecologistIcon },
    { name: "Dermatologist", icon: dermatologistIcon },
    { name: "Pediatricians", icon: pediatricianIcon },
    { name: "Neurologist", icon: neurologistIcon },
    { name: "Gastroenterologist", icon: gastroIcon },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/doctors?limit=100");
        setDoctors(res.data);
        setFilteredDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleFilter = (speciality) => {
    if (selectedSpeciality === speciality) {
      setSelectedSpeciality("All");
      setFilteredDoctors(doctors);
    } else {
      setSelectedSpeciality(speciality);
      setFilteredDoctors(
        doctors.filter((doc) => doc.specialization === speciality)
      );
    }
  };

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div className="doctors-page">
      <div className="top-filter-section">
        <h1 className="filter-heading">Find by Speciality</h1>
        <p className="filter-subheading">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>

        <div className="speciality-menu">
          {specialities.map((item) => (
            <div
              key={item.name}
              className={`speciality-item ${
                selectedSpeciality === item.name ? "active" : ""
              }`}
              onClick={() => handleFilter(item.name)}
            >
              <div className="speciality-circle">
                 <img src={item.icon} alt={item.name} className="speciality-icon" />
              </div>
              <span className="speciality-label">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.map((doctor) => (
          <div 
            className="doc-card" 
            key={doctor._id}
            onClick={() => navigate(`/appointments/${doctor._id}`)}
          >
            <div className="doc-image-container">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="doc-image"
              />
            </div>
            <div className="doc-info">
              <div className="doc-status">
                <span
                  className={`status-dot ${
                    doctor.available ? "available" : "unavailable"
                  }`}
                ></span>
                <span
                  className={`status-text ${
                    doctor.available ? "available" : "unavailable"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </span>
              </div>
              <h3 className="doc-name">{doctor.name}</h3>
              <p className="doc-speciality">{doctor.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
