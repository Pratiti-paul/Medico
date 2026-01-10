import { useEffect, useState } from "react";
import axios from "axios";
import "./Appointments.css";

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");
  const [loading, setLoading] = useState(true);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
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
    return <p className="loading-text">Loading...</p>;
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
          {specialities.map((speciality) => (
            <div
              key={speciality}
              className={`speciality-item ${
                selectedSpeciality === speciality ? "active" : ""
              }`}
              onClick={() => handleFilter(speciality)}
            >
              <div className="speciality-circle">
              </div>
              <span className="speciality-label">{speciality}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.map((doctor) => (
          <div className="doc-card" key={doctor._id}>
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
