import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import UserIcon from '../../assets/User Icon (1).png';
import DoctorIcon from '../../assets/Doctors Stethoscope.png';
import MedicineIcon from '../../assets/Medicines Icon.png';
import AppointmentIcon from '../../assets/Appointment Icon.png';
import CartIcon from '../../assets/Shopping Cart Icon.png';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [statsRes, activityRes] = await Promise.all([
                    axios.get('http://localhost:5001/api/admin/stats', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:5001/api/admin/recent-activity', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);
                setStats(statsRes.data);
                setActivity(activityRes.data);
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    if (loading) return <Loader fullPage />;

    return (
        <div className="admin-dashboard-container">
            {/* Stats Cards Row */}
            <div className="stats-grid">
                <div className="stat-card blue">
                    <div className="stat-header">
                        <img src={UserIcon} alt="Users" className="stat-asset-icon" />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.totalUsers || 0}</h3>
                        <p>Total Users</p>
                    </div>
                </div>

                <div className="stat-card green">
                    <div className="stat-header">
                        <img src={DoctorIcon} alt="Doctors" className="stat-asset-icon" />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.totalDoctors || 0}</h3>
                        <p>Total Doctors</p>
                    </div>
                </div>

                <div className="stat-card purple">
                    <div className="stat-header">
                        <img src={MedicineIcon} alt="Medicines" className="stat-asset-icon" />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.medicinesListed || 0}</h3>
                        <p>Medicines Listed</p>
                    </div>
                </div>

                <div className="stat-card orange">
                    <div className="stat-header">
                        <img src={AppointmentIcon} alt="Appointments" className="stat-asset-icon" />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.appointments || 0}</h3>
                        <p>Appointments</p>
                    </div>
                </div>

                <div className="stat-card sky">
                    <div className="stat-header">
                        <img src={CartIcon} alt="Orders" className="stat-asset-icon" />
                    </div>
                    <div className="stat-info">
                        <h3>{stats?.totalOrders || 0}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>
            </div>

            {/* Tables Row */}
            <div className="dashboard-grid">
                {/* Recent Orders Table */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3>Recent Orders</h3>
                        <button onClick={() => navigate('/admin/orders')} className="view-all-link">View All Orders <span>›</span></button>
                    </div>
                    <div className="table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activity?.recentOrders?.length > 0 ? (
                                    activity.recentOrders.map(order => (
                                        <tr key={order._id}>
                                            <td className="order-id">#{order.orderId || order._id.slice(-6).toUpperCase()}</td>
                                            <td>{order.patient?.name || "Guest"}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`status-pill ${order.paymentStatus}`}>
                                                    {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" className="empty-row">No recent orders</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Appointments Table */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3>Upcoming Appointments</h3>
                        <button onClick={() => navigate('/admin/appointments')} className="view-all-link">View All Appointments <span>›</span></button>
                    </div>
                    <div className="table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activity?.upcomingAppointments?.length > 0 ? (
                                    activity.upcomingAppointments.map(app => (
                                        <tr key={app._id}>
                                            <td className="patient-name">{app.patient?.name || "User"}</td>
                                            <td>{app.doctor?.name || "Doctor"}</td>
                                            <td>{app.date?.replace(/_/g, '/')}</td>
                                            <td><span className="time-badge">{app.time}</span></td>
                                            <td>
                                                <span className={`status-pill ${app.status || 'booked'}`}>
                                                    {app.status === 'booked' ? 'Confirmed' : 'Cancelled'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" className="empty-row">No upcoming appointments</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
