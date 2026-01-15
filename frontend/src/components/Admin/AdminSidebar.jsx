import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        toast.success("Logged out successfully");
        navigate('/login');
    };

    return (
        <aside className="admin-sidebar">
            <div className="admin-brand">
                <div className="brand-logo">
                    <span className="plus">+</span>
                </div>
                <h1>Medico <span>Admin</span></h1>
            </div>

            <nav className="admin-nav">
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">🏠</span>
                    Dashboard
                </NavLink>
                <NavLink to="/admin/doctors" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">🔗</span>
                    Doctors
                </NavLink>
                <NavLink to="/admin/medicines" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">💊</span>
                    Medicines
                </NavLink>
                <NavLink to="/admin/appointments" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">📱</span>
                    Appointments
                </NavLink>
                <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">📋</span>
                    Orders
                </NavLink>
                <NavLink to="/admin/feedback" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <span className="nav-icon">💬</span>
                    Feedback
                </NavLink>
            </nav>

            <div className="admin-sidebar-footer">
                <button onClick={handleLogout} className="admin-logout-btn">
                    <span className="nav-icon">⏻</span>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
