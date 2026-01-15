import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./Cart.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any medicines yet.</p>
        <Link to="/medicines" className="continue-shopping-btn">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p>Review your items and proceed to checkout.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items-container">
          <div className="cart-items-header">
            <span className="col-item">Item</span>
            <span className="col-price">Price</span>
            <span className="col-total">Total</span>
          </div>

          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-details">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                </div>
              </div>

              <div className="cart-item-controls">
                <button 
                  className="qty-btn"
                  onClick={() => updateQuantity(item._id, -1)}
                >
                  −
                </button>
                <span className="qty-val">{item.quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => updateQuantity(item._id, 1)}
                >
                  +
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item._id);
                    toast.info(`${item.name} removed from cart`);
                  }}
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-price">
                ₹ {item.price * item.quantity}
              </div>
            </div>
          ))}

          <Link to="/medicines" className="back-link">
             « Continue Shopping
          </Link>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹ {cartTotal}</span>
          </div>
          
          <div className="summary-row success-text">
            <span>Free Delivery</span>
            <span>✔</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹ {cartTotal}</span>
          </div>

          <button 
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
