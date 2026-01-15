import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const medicines = cartItems.map(item => ({
                medicine: item._id,
                quantity: item.quantity
            }));

            const res = await axios.post('http://localhost:5001/api/orders', {
                medicines,
                totalAmount: cartTotal,
                paymentMethod
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.order) {
                toast.success("Payment successful! Order placed.");
                clearCart();
                navigate('/my-orders');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/medicines');
        return null;
    }

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Secure Checkout</h1>
            
            <div className="checkout-content">
                <div className="payment-selection">
                    <h3>Select Payment Method</h3>
                    <div className="payment-options">
                        <div 
                            className={`payment-card ${paymentMethod === 'UPI' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('UPI')}
                        >
                            <span className="icon">📱</span>
                            <div className="info">
                                <strong>UPI</strong>
                                <p>Google Pay, PhonePe, Paytm</p>
                            </div>
                            <div className="radio"></div>
                        </div>

                        <div 
                            className={`payment-card ${paymentMethod === 'Card' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('Card')}
                        >
                            <span className="icon">💳</span>
                            <div className="info">
                                <strong>Credit / Debit Card</strong>
                                <p>Visa, Mastercard, RuPay</p>
                            </div>
                            <div className="radio"></div>
                        </div>

                        <div 
                            className={`payment-card ${paymentMethod === 'COD' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('COD')}
                        >
                            <span className="icon">💵</span>
                            <div className="info">
                                <strong>Cash on Delivery</strong>
                                <p>Pay when you receive</p>
                            </div>
                            <div className="radio"></div>
                        </div>
                    </div>
                </div>

                <div className="order-summary-checkout">
                    <h3>Order Summary</h3>
                    <div className="summary-details">
                        <div className="row">
                            <span>Items ({cartItems.length})</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="row">
                            <span>Delivery Charges</span>
                            <span className="free">FREE</span>
                        </div>
                        <div className="divider"></div>
                        <div className="row total">
                            <span>Total Amount</span>
                            <span>₹{cartTotal}</span>
                        </div>
                    </div>

                    <button 
                        className="pay-now-btn" 
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : paymentMethod === 'COD' ? "Place Order" : "Pay Now"}
                    </button>
                    
                    <p className="secure-text">🔒 100% Secure & Encrypted Payments</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
