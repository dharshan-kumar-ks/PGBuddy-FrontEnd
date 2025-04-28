import React, { useEffect, useState } from 'react';
import './OrderHistoryPage.css';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import { useNavigate } from 'react-router-dom';
import { FaRedo } from 'react-icons/fa'; // Icon for "Order Again"
import axios from 'axios'; // Import axios for API calls

function OrderHistoryPage() {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]); // State to store order history

  // Fetch order history from the backend when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Use environment variable for backend URL

    // Make an API call to fetch order history from backend
    axios
      .get(`${backendUrl}/api/cafe/orders`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then((response) => {
        setOrderHistory(response.data); // Update state with fetched order history
      })
      .catch((error) => {
        console.error('Error fetching order history:', error); // Log error if API call fails
      });
  }, []);

  // Function to handle viewing details of a specific order
  const handleViewDetails = (orderId) => {
    // Placeholder for navigating to a detailed order view
    console.log(`Viewing details for order ID: ${orderId}`);
    // You can navigate to a detailed order page if needed, e.g., navigate(`/order/${orderId}`);
  };

  // Function to handle repeating a past order
  const handleRepeatOrder = (order) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    // Prepare order details for the repeat order
    const orderDetails = {
      user: 1, // Replace with actual user ID if available
      orderStatus: 'PENDING', // Set order status to PENDING
      cafeOrderItems: order.cafeOrderItems.map((item) => ({
        cafeMenuId: item.cafeMenuId, // Menu item ID
        quantity: item.quantity, // Quantity of the item
      })),
    };

    // Make an API call to place the repeat order
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/cafe/order`, orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then(() => {
        alert('Order placed successfully'); // Notify user of successful order placement
      })
      .catch((error) => {
        console.error('Error placing order:', error); // Log error if API call fails
        alert('Failed to place the order. Please try again.'); // Notify user of failure
      });
  };

  return (
    <div className="history-page">
      {/* Render the top navigation bar */}
      <TopNavigationBar />
      <div className="history-content">
        <h1>Order History</h1>
        <p>Your past orders are displayed below.</p>
        {/* Check if there are any orders */}
        {orderHistory.length === 0 ? (
          <p className="no-orders">No orders found.</p> // Display message if no orders are found
        ) : (
          <div className="order-list">
            {/* Render each order in reverse chronological order */}
            {orderHistory.filter(order => order.totalPrice > 0).reverse().map((order, index) => (
              <div key={index} className="order-card">
                {/* Order header section */}
                <div className="order-header">
                  <div className="order-date">
                    <span>Order Date:</span> {/* Display order date */}
                    {new Date(order.orderDate).toLocaleDateString('en-GB').replaceAll('/', '-')}
                  </div>
                  <div 
                    className="order-status" 
                    style={{
                      backgroundColor: order.orderStatus === 'PENDING' ? '#f0ad4e' : '#5cb85c', // Set background color based on order status
                      color: '#fff', 
                      padding: '5px 10px', 
                      borderRadius: '5px', 
                      fontWeight: 'bold'
                    }}
                  >
                    {order.orderStatus} {/* Display order status */}
                  </div>
                </div>
                {/* Order items section */}
                <div className="order-items">
                  {order.cafeOrderItems.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span className="item-name">{item.cafeMenuName}</span> {/* Item name */}
                      <span className="item-quantity">x{item.quantity}</span> {/* Item quantity */}
                      <span className="item-price">₹{(item.cafeMenuPrice * 1.05).toFixed(2)}</span> {/* Item price with tax */}
                    </div>
                  ))}
                </div>
                {/* Order footer section */}
                <div className="order-footer">
                  <button
                    className="view-details-button"
                    onClick={() => handleRepeatOrder(order)} // Handle repeat order
                  >
                    <FaRedo /> Repeat Order {/* Button to repeat the order */}
                  </button>
                  <div className="order-total">
                    <span>Total:</span> ₹{(order.totalPrice * 1.05).toFixed(2)} {/* Display total price with tax */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistoryPage;