import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TopDoctors.css";

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/doctors", {
          params: {
            limit: 8
          }
        });
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDoctors();
  }, []);

  if (loading) {
    return <p className="td-loading">Loading top doctors...</p>;
  }

  return (
    <section className="top-doctors">
      <h2 className="td-heading">Top Doctors</h2>
      <p className="td-subheading">
        Book appointments with trusted specialists
      </p>

      <div className="td-grid">
        {doctors.map((doctor) => (
          <div className="td-card" key={doctor._id}>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="td-image"
            />

            <div className="td-info">
              <h3 className="td-name">{doctor.name}</h3>
              <p className="td-specialization">{doctor.specialization}</p>

              <span
                className={`td-status ${
                  doctor.available ? "available" : "unavailable"
                }`}
              >
                {doctor.available ? "Available" : "Not Available"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/appointments")} className="td-more-btn">
        more
      </button>
    </section>
  );
};

export default TopDoctors;
