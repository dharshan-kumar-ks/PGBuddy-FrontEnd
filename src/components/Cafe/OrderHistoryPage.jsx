import React from 'react';
import './OrderHistoryPage.css';
import TopNavigationBar from '../TopNavigationBar';
import { useNavigate } from 'react-router-dom';
import { FaRedo } from 'react-icons/fa'; // Icon for "Order Again"

// Sample order history data (you can replace this with actual data from a backend)
const orderHistory = [
  {
    id: 1,
    date: '2025-03-25',
    items: [
      { name: 'Fried Egg', quantity: 2, price: 45 },
      { name: 'Omelette', quantity: 1, price: 39 },
    ],
    total: 129, // Including GST
    status: 'Delivered',
  },
  {
    id: 2,
    date: '2025-03-20',
    items: [
      { name: 'Chilli Chicken & Noodles', quantity: 1, price: 135 },
      { name: 'French Fries', quantity: 1, price: 60 },
    ],
    total: 204.75, // Including GST
    status: 'Delivered',
  },
  {
    id: 3,
    date: '2025-03-15',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 199 },
    ],
    total: 208.95, // Including GST
    status: 'Cancelled',
  },
];

function OrderHistoryPage() {
  const navigate = useNavigate();

  const handleViewDetails = (orderId) => {
    // Placeholder for navigating to a detailed order view
    console.log(`Viewing details for order ID: ${orderId}`);
    // You can navigate to a detailed order page if needed, e.g., navigate(`/order/${orderId}`);
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
            {orderHistory.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-date">
                    <span>Order Date:</span> {order.date}
                  </div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                </div>
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                      <span className="item-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <button
                    className="view-details-button"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    <FaRedo /> Repeat Order
                  </button>
                  <div className="order-total">
                    <span>Total:</span> ₹{order.total.toFixed(2)}
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