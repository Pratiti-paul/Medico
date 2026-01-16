import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import './AdminDoctors.css';

const AdminDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchDoctors = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/doctors`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDoctors(res.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error("Failed to load doctors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const toggleAvailability = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/doctors/${id}/availability`, 
                { available: !currentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Availability updated");
            // Update local state instead of refetching for better UX
            setDoctors(doctors.map(doc => doc._id === id ? { ...doc, available: !currentStatus } : doc));
        } catch (error) {
            toast.error("Failed to update availability");
        }
    };

    const filteredDoctors = doctors.filter(doc => 
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Loader fullPage />;

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <h3>Manage Doctors</h3>
                <div className="header-actions">
                    <input 
                        type="text" 
                        placeholder="Search by name or specialty..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="admin-search-input"
                    />
                </div>
            </div>

            <div className="admin-card">
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Specialization</th>
                                <th>Experience</th>
                                <th>Consultation Fee</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doc => (
                                    <tr key={doc._id}>
                                        <td className="doc-info-cell">
                                            <div className="doc-avatar">🩺</div>
                                            <div className="doc-meta">
                                                <span className="doc-name">{doc.name}</span>
                                                <span className="doc-id">#{doc._id.slice(-6).toUpperCase()}</span>
                                            </div>
                                        </td>
                                        <td>{doc.specialization}</td>
                                        <td>{doc.experience} Years</td>
                                        <td>₹{doc.consultationFee}</td>
                                        <td>
                                            <label className="switch">
                                                <input 
                                                    type="checkbox" 
                                                    checked={doc.available}
                                                    onChange={() => toggleAvailability(doc._id, doc.available)}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                            <span className={`status-text ${doc.available ? 'available' : 'unavailable'}`}>
                                                {doc.available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="empty-row">No doctors found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDoctors;
