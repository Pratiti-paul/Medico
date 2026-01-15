import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import Loader from "../components/Loader/Loader";
import PhoneIcon from "../assets/Phone Call Icon.png";
import AddressIcon from "../assets/Address Maps and Flags.png";
import CalendarIcon from "../assets/Calendar Icon.png";

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
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
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
      toast.success("Appointment cancelled successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to cancel appointment");
    }
  };

  if (!user) return <Loader fullPage />;

  const createdDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const initials = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="profile-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-meta">
          <h1>Welcome back, {user.name.split(' ')[0]}</h1>
          <p>Manage your appointments and personal health information securely.</p>
        </div>
        <div className="header-actions">
          {!isEdit && (
            <button className="edit-btn-top" onClick={() => setIsEdit(true)}>
              Edit Profile
            </button>
          )}
          <button className="logout-btn-top" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar: Profile Details */}
        <aside className="profile-sidebar">
          <div className="sidebar-card">
            <div className="profile-avatar-large">
              {initials}
            </div>
            
            {isEdit ? (
              <div className="edit-form-sidebar">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    className="edit-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    className="edit-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea 
                    className="edit-input"
                    rows="3"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  ></textarea>
                </div>
                <div className="edit-form-actions">
                  <button className="save-btn-sidebar" onClick={handleUpdate}>Save Changes</button>
                  <button className="cancel-btn-sidebar" onClick={() => setIsEdit(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="profile-view-sidebar">
                <h2 className="display-name">{user.name}</h2>
                <p className="display-email">{user.email}</p>
                
                <div className="details-stack">
                  <div className="detail-item">
                    <span className="detail-icon">
                      <img src={PhoneIcon} alt="Phone" />
                    </span>
                    <div className="detail-text">
                      <label>Phone</label>
                      <p>{user.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">
                      <img src={AddressIcon} alt="Address" />
                    </span>
                    <div className="detail-text">
                      <label>Address</label>
                      <p>{user.address || "No address saved"}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">
                      <img src={CalendarIcon} alt="Calendar" />
                    </span>
                    <div className="detail-text">
                      <label>Joined</label>
                      <p>{createdDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Area: Appointments */}
        <main className="dashboard-main">
          <div className="appointments-card">
            <div className="card-header">
              <h2>My Appointments</h2>
              <span className="app-count">{appointments.length} scheduled</span>
            </div>
            
            {loadingApps ? (
              <Loader />
            ) : appointments.length > 0 ? (
              <div className="appointments-grid">
                {appointments.map((app) => (
                  <div key={app._id} className="modern-app-card">
                    <div className="app-main-info">
                      <div className="doc-avatar-small">
                        {app.doctor?.name?.charAt(0) || "D"}
                      </div>
                      <div className="doc-details">
                        <p className="doc-name">{app.doctor?.name || "Doctor Name"}</p>
                        <p className="doc-spec">{app.doctor?.specialization}</p>
                      </div>
                      <div className="app-status">Confirmed</div>
                    </div>
                    
                    <div className="app-time-info">
                      <div className="time-stat">
                        <span>Date</span>
                        <p>{app.date?.replace(/_/g, '/')}</p>
                      </div>
                      <div className="time-stat">
                        <span>Time</span>
                        <p>{app.time}</p>
                      </div>
                    </div>
                    
                    <div className="app-footer">
                      <span className="consult-fee">₹{app.doctor?.consultationFee}</span>
                      <button 
                        className="cancel-link"
                        onClick={() => handleCancelApp(app._id)}
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <img src={CalendarIcon} alt="No appointments" />
                </div>
                <p>No upcoming appointments found.</p>
                <button className="book-btn-empty" onClick={() => navigate('/home')}>Book Now</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyProfile;
