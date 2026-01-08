import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import doc1 from "../assets/doc1.png";
import doc2 from "../assets/doc2.png";
import doc3 from "../assets/doc3.png";
import "./TopDoctors.css";

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholders = [doc1, doc2, doc3];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get("/doctors", {
          params: { limit: 8, sort: "rating_desc" }
        });
        setDoctors(Array.isArray(data.doctors) ? data.doctors : data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div className="td-section">Loading top doctors...</div>;

  return (
    <div className="td-section">
      <h2 className="td-title">Top Doctors to Book</h2>
      <p className="td-subtitle">Simply browse through our extensive list of trusted doctors.</p>

      <div className="td-grid">
        {doctors.map((doctor, index) => (
          <div className="td-card" key={doctor._id}>
            <div className="td-image-container">
              <img
                className="td-image"
                src={doctor.image || placeholders[index % placeholders.length]}
                alt={doctor.name}
                onError={(e) => { e.currentTarget.src = placeholders[index % placeholders.length]; }}
              />
            </div>
            <div className="td-info">
              <div className={`td-status ${doctor.available ? "on" : "off"}`}>
                {doctor.available ? "Available" : "Not Available"}
              </div>
              <h3 className="td-name">{doctor.name}</h3>
              <p className="td-specialty">{doctor.specialization}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="td-more-wrap">
        <Link className="td-more" to="/doctors">more</Link>
      </div>
    </div>
  );
};

export default TopDoctors;
