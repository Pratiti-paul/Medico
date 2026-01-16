import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import './MyOrders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/my`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Sort by date descending
                setOrders(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <Loader fullPage />;

    return (
        <div className="orders-container">
            <h1 className="orders-title">Order History</h1>
            
            {orders.length === 0 ? (
                <div className="empty-orders">
                    <span className="icon">📦</span>
                    <h3>No orders yet</h3>
                    <p>When you buy medicines, they will appear here.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <div className="id-group">
                                    <span className="label">ORDER ID</span>
                                    <span className="value">{order.orderId || order._id.slice(-8).toUpperCase()}</span>
                                </div>
                                <div className="status-group">
                                    <span className={`status-pill ${order.paymentStatus}`}>
                                        {order.paymentStatus === 'paid' ? '● Paid' : '● Pending'}
                                    </span>
                                    <span className="date">
                                        {new Date(order.createdAt).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="order-content">
                                {order.medicines.map((item, idx) => (
                                    <div key={idx} className="order-item">
                                        <div className="item-info">
                                            <strong>{item.medicine?.name || "Medicine"}</strong>
                                            <span>Qty: {item.quantity}</span>
                                        </div>
                                        <span className="item-price">₹{item.medicine?.price * item.quantity || 0}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="payment-info">
                                    <span>Payment: <strong>{order.paymentMethod}</strong></span>
                                </div>
                                <div className="total-info">
                                    <span>Total Paid:</span>
                                    <strong>₹{order.totalAmount}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
