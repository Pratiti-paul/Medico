import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyProfile.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        
        // Fetch profile
        const profileRes = await axios.get("http://localhost:5001/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(profileRes.data);
        setFormData({
          name: profileRes.data.name || "",
          phone: profileRes.data.phone || "",
          address: profileRes.data.address || ""
        });

        // Fetch appointments
        const appRes = await axios.get("http://localhost:5001/api/appointments/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(appRes.data);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
        }
      } finally {
        setLoadingApps(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5001/api/auth/profile", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
      setIsEdit(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasAccount");
    navigate("/login");
  };

  const handleCancelApp = async (appId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/appointments/${appId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state
      setAppointments((prev) => prev.filter((app) => app._id !== appId));
      alert("Appointment cancelled successfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to cancel appointment");
    }
  };

  if (!user) return <div className="loading-text">Loading...</div>;

  const createdDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const initials = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="profile-container">
      <div className="profile-content">
        {/* User Info Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            {initials}
          </div>
          
          {isEdit ? (
            <div className="edit-form">
              <input 
                type="text" 
                className="edit-input"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="text" 
                className="edit-input"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <textarea 
                className="edit-input edit-textarea"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
              <div className="edit-actions">
                <button className="save-btn" onClick={handleUpdate}>Save</button>
                <button className="cancel-btn" onClick={() => setIsEdit(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              
              <div className="profile-info-grid">
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{user.phone || "Not set"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Address:</span>
                  <span className="info-value">{user.address || "Not set"}</span>
                </div>
              </div>

              <div className="profile-divider"></div>
              
              <div className="profile-meta">
                <p className="meta-label">Account Created</p>
                <p className="meta-value">{createdDate}</p>
              </div>
              
              <div className="profile-btns">
                <button className="edit-profile-btn" onClick={() => setIsEdit(true)}>
                  Edit Profile
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        {/* Appointment History Section */}
        <div className="appointments-history">
          <h2 className="history-title">My Appointments</h2>
          {loadingApps ? (
            <p className="loading-small">Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <div className="appointments-list">
              {appointments.map((app) => (
                <div key={app._id} className="app-history-item">
                  <div className="app-info">
                    <p className="app-doc-name">{app.doctor?.name || "Doctor"}</p>
                    <p className="app-doc-spec">{app.doctor?.specialization}</p>
                    <p className="app-datetime">{app.date?.replace(/_/g, '/')} | {app.time}</p>
                  </div>
                  <div className="app-actions">
                    <div className="app-price">
                      ₹{app.doctor?.consultationFee}
                    </div>
                    <button 
                      className="cancel-app-btn"
                      onClick={() => handleCancelApp(app._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-appointments">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
