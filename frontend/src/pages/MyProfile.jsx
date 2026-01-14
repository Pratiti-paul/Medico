import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyProfile.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        
        const res = await axios.get("http://localhost:5001/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasAccount"); // If used for other logic
    navigate("/login");
  };

  if (!user) return <div className="loading-text">Loading...</div>;

  // Format date: "January 1, 2025"
  const createdDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // Initials
  const initials = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          {initials}
        </div>
        
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        
        <div className="profile-divider"></div>
        
        <div className="profile-meta">
          <p className="meta-label">Account Created</p>
          <p className="meta-value">{createdDate}</p>
        </div>
        
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
