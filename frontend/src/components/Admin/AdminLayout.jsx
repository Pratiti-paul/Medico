import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    if (role !== 'admin') {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main-content">
                <header className="admin-header">
                    <div className="header-left">
                        <h2>Admin Dashboard</h2>
                    </div>
                    <div className="header-right" onClick={() => navigate('/admin/profile')} style={{ cursor: 'pointer' }}>
                        <span className="welcome-text">Welcome, <strong>Admin</strong></span>
                        <div className="admin-profile-circle">
                            <span className="admin-icon">👤</span>
                        </div>
                    </div>
                </header>
                <div className="admin-page-body">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
