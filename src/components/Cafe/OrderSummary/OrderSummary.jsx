import React from 'react';
import './OrderSummary.css';
import axios from 'axios'; // Import axios for API calls

function OrderSummary({ cartItems, onClose }) {
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate GST (assuming 5% GST)
  const gstRate = 0.05;
  const gst = subtotal * gstRate;

  // Calculate total
  const total = subtotal + gst;

  const handleCheckout = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const orderDetails = {
      user: 1, // Replace with actual user ID if available
      orderStatus: 'PENDING',
      cafeOrderItems: cartItems.map((item) => ({
        cafeMenuId: item.id,
        quantity: item.quantity,
      })),
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/cafe/order`, orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then(() => {
        alert('Your order has been placed successfully');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Failed to place the order. Please try again.');
      });
  };

  return (
    <div className="order-summary">
      <div className="order-header">
        <h2>Order</h2>
        {/*<button className="close-button" onClick={onClose}>Close</button>*/}
      </div>
      <div className="order-content">
        <div className="order-item">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="order-item">
          <span>GST (5%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <div className="order-item total">
          <span>TOTAL</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-quantity">Qty: {item.quantity}</span>
                <span className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-cart">No items in the cart.</p>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;