import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import './AdminAppointments.css';

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/appointments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(res.data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/appointments/${id}/status`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Appointment ${newStatus}`);
            setAppointments(appointments.map(app => app._id === id ? { ...app, status: newStatus } : app));
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <Loader fullPage />;

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <h3>Manage Appointments</h3>
            </div>

            <div className="admin-card">
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map(app => (
                                    <tr key={app._id}>
                                        <td>
                                            <div className="entity-info">
                                                <span className="entity-name">{app.patient?.name || "User"}</span>
                                                <span className="entity-sub">{app.patient?.email}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="entity-info">
                                                <span className="entity-name">{app.doctor?.name || "Doctor"}</span>
                                                <span className="entity-sub">{app.doctor?.specialization}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="date-time-cell">
                                                <span className="date-val">{app.date?.replace(/_/g, '/')}</span>
                                                <span className="time-val">{app.time}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${app.status}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                {app.status === 'booked' ? (
                                                    <button 
                                                        className="action-btn deny"
                                                        onClick={() => updateStatus(app._id, 'cancelled')}
                                                    >
                                                        Cancel
                                                    </button>
                                                ) : app.status === 'cancelled' ? (
                                                    <button 
                                                        className="action-btn approve"
                                                        onClick={() => updateStatus(app._id, 'booked')}
                                                    >
                                                        Re-book
                                                    </button>
                                                ) : (
                                                    <span>-</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="empty-row">No appointments found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAppointments;
