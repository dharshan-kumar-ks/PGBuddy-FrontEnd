import React from 'react';
import './OrderSummary.css';

function OrderSummary({ cartItems, onClose }) {
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate GST (assuming 5% GST)
  const gstRate = 0.05;
  const gst = subtotal * gstRate;

  // Calculate total
  const total = subtotal + gst;

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

        <button className="checkout-button">Checkout</button>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
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