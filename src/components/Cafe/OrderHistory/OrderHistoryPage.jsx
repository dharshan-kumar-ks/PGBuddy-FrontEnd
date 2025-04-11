import React, { useEffect, useState } from 'react';
import './OrderHistoryPage.css';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import { useNavigate } from 'react-router-dom';
import { FaRedo } from 'react-icons/fa'; // Icon for "Order Again"
import axios from 'axios'; // Import axios for API calls

function OrderHistoryPage() {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]); // State to store order history

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    // Fetch order history from backend
    axios
      .get('http://localhost:8081/api/cafe/orders', {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then((response) => {
        setOrderHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching order history:', error);
      });
  }, []);

  const handleViewDetails = (orderId) => {
    // Placeholder for navigating to a detailed order view
    console.log(`Viewing details for order ID: ${orderId}`);
    // You can navigate to a detailed order page if needed, e.g., navigate(`/order/${orderId}`);
  };

  const handleRepeatOrder = (order) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    const orderDetails = {
      user: 1, // Replace with actual user ID if available
      orderStatus: 'PENDING',
      cafeOrderItems: order.cafeOrderItems.map((item) => ({
        cafeMenuId: item.cafeMenuId,
        quantity: item.quantity,
      })),
    };

    axios
      .post('http://localhost:8081/api/cafe/order', orderDetails, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then(() => {
        alert('Order placed successfully');
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Failed to place the order. Please try again.');
      });
  };

  return (
    <div className="history-page">
      <TopNavigationBar />
      <div className="history-content">
        <h1>Order History</h1>
        <p>Your past orders are displayed below.</p>
        {orderHistory.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <div className="order-list">
            {orderHistory.filter(order => order.totalPrice > 0).reverse().map((order, index) => (
              <div key={index} className="order-card">
                <div className="order-header">
                  <div className="order-date">
                    <span>Order Date:</span> {new Date(order.orderDate).toLocaleDateString('en-GB').replaceAll('/', '-')}
                  </div>
                  <div className="order-status" style={{ backgroundColor: order.orderStatus === 'PENDING' ? '#f0ad4e' : '#5cb85c', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' }}>
                    {order.orderStatus}
                  </div>
                </div>
                <div className="order-items">
                  {order.cafeOrderItems.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span className="item-name">{item.cafeMenuName}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">₹{item.cafeMenuPrice}</span>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <button
                    className="view-details-button"
                    onClick={() => handleRepeatOrder(order)}
                  >
                    <FaRedo /> Repeat Order
                  </button>
                  <div className="order-total">
                    <span>Total:</span> ₹{order.totalPrice.toFixed(2)}
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