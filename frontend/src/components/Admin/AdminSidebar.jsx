import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardIcon from '../../assets/Dashboard Icon.png';
import DoctorIcon from '../../assets/Doctors Stethoscope.png';
import MedicineIcon from '../../assets/Medicines Icon.png';
import AppointmentIcon from '../../assets/Appointment Icon.png';
import OrderIcon from '../../assets/Shopping Cart Icon.png';
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
                <h1>Medico <span>Admin</span></h1>
            </div>

            <nav className="admin-nav">
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <img src={DashboardIcon} alt="Dashboard" className="sidebar-asset-icon" />
                    Dashboard
                </NavLink>
                <NavLink to="/admin/doctors" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <img src={DoctorIcon} alt="Doctors" className="sidebar-asset-icon" />
                    Doctors
                </NavLink>
                <NavLink to="/admin/medicines" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <img src={MedicineIcon} alt="Medicines" className="sidebar-asset-icon" />
                    Medicines
                </NavLink>
                <NavLink to="/admin/appointments" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <img src={AppointmentIcon} alt="Appointments" className="sidebar-asset-icon" />
                    Appointments
                </NavLink>
                <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                    <img src={OrderIcon} alt="Orders" className="sidebar-asset-icon" />
                    Orders
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
