import React from 'react';
import './OrderSummary.css';
import axios from 'axios'; // Import axios for API calls

function OrderSummary({ cartItems, onClose }) {
  // Calculate subtotal by summing up the price * quantity for all items in the cart
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate GST (assuming 5% GST rate)
  const gstRate = 0.05;
  const gst = subtotal * gstRate;

  // Calculate the total amount (subtotal + GST)
  const total = subtotal + gst;

  // Function to handle the checkout process
  const handleCheckout = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    // Prepare order details for the API request
    const orderDetails = {
      user: 1, // Replace with actual user ID if available
      orderStatus: 'PENDING', // Set order status to PENDING
      cafeOrderItems: cartItems.map((item) => ({
        cafeMenuId: item.id, // Menu item ID
        quantity: item.quantity, // Quantity of the item
      })),
    };

    // Make an API call to place the order
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/cafe/order`, orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then(() => {
        alert('Your order has been placed successfully'); // Notify user of successful order placement
      })
      .catch((error) => {
        console.error('Error placing order:', error); // Log error if API call fails
        alert('Failed to place the order. Please try again.'); // Notify user of failure
      });
  };

  return (
    <div className="order-summary">
      {/* Header section of the order summary */}
      <div className="order-header">
        <h2>Order</h2>
        {/* Uncomment the button below if you want to allow closing the order summary */}
        {/* <button className="close-button" onClick={onClose}>Close</button> */}
      </div>

      {/* Content section of the order summary */}
      <div className="order-content">
        {/* Display subtotal */}
        <div className="order-item">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        {/* Display GST */}
        <div className="order-item">
          <span>GST (5%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>

        {/* Display total amount */}
        <div className="order-item total">
          <span>TOTAL</span>
          <span>₹{total.toFixed(2)}</span>
        </div>

        {/* Checkout button */}
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>

        {/* Display cart items if available */}
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              {/* Display item image */}
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                {/* Display item name */}
                <span className="cart-item-name">{item.name}</span>
                {/* Display item quantity */}
                <span className="cart-item-quantity">Qty: {item.quantity}</span>
                {/* Display item price (price * quantity) */}
                <span className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))
        ) : (
          // Display message if the cart is empty
          <p className="empty-cart">No items in the cart.</p>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;