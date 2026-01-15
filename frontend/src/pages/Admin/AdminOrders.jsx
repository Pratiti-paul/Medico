import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import './AdminAppointments.css'; // Reusing base layout styles

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5001/api/admin/orders', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5001/api/admin/orders/${id}/status`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Order marked as ${newStatus}`);
            setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const updatePayment = async (id, newPaymentStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5001/api/admin/orders/${id}/payment`, 
                { paymentStatus: newPaymentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Payment status updated to ${newPaymentStatus}`);
            setOrders(orders.map(order => order._id === id ? { ...order, paymentStatus: newPaymentStatus } : order));
        } catch (error) {
            toast.error("Failed to update payment status");
        }
    };

    if (loading) return <Loader fullPage />;

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <h3>Manage Orders</h3>
            </div>

            <div className="admin-card">
                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Patient</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Order Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td className="order-id">#{order.orderId || order._id.slice(-6).toUpperCase()}</td>
                                        <td>
                                            <div className="entity-info">
                                                <span className="entity-name">{order.patient?.name || "User"}</span>
                                                <span className="entity-sub">{order.patient?.email}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: '700' }}>₹{order.totalAmount}</td>
                                        <td>
                                            <span className={`status-pill ${order.paymentStatus}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${order.status}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                {order.paymentStatus === 'pending' && (
                                                    <button 
                                                        className="action-btn approve"
                                                        onClick={() => updatePayment(order._id, 'paid')}
                                                    >
                                                        Mark Paid
                                                    </button>
                                                )}
                                                {order.status === 'placed' && (
                                                    <button 
                                                        className="action-btn approve"
                                                        onClick={() => updateStatus(order._id, 'delivered')}
                                                    >
                                                        Deliver
                                                    </button>
                                                )}
                                                {order.status === 'delivered' && order.paymentStatus === 'paid' && (
                                                    <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.8rem' }}>COMPLETED</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" className="empty-row">No orders found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
