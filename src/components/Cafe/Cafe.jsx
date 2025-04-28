import React, { useState, useEffect } from 'react';
import './Cafe.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios'; // Import axios for API calls

import TopNavigationBar from '../Navigation/TopNavigationBar';
import FoodPreference from './CafeGrid/FoodPreference';
import CafeGrid from './CafeGrid/CafeGrid';
import OrderSummary from './OrderSummary/OrderSummary';

// Renders the Cafe component to display the café menu and manage user interactions.
// Takes no input and returns a JSX element representing the café page.
function Cafe() {
  const [cartItems, setCartItems] = useState([]); // Array to store cart items with quantities
  const [filter, setFilter] = useState(null); // State to manage the filter (e.g., veg, non-veg).
  const [showOrderSummary, setShowOrderSummary] = useState(true); // State to toggle order summary visibility
  const [cafeItems, setCafeItems] = useState([]); // State to store cafe items fetched from backend
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    // Fetch café items from the backend when the component mounts.
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/cafe/menu`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      })
      .then((response) => {
        setCafeItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching café items:', error);
      });
  }, []);

  // Handle adding an item to the cart.
  const handleAddItem = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If item exists, increment its quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Handle updating the quantity of an item in the cart.
  const handleUpdateQuantity = (itemId, change) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === itemId);
      if (!existingItem) return prevItems;

      const newQuantity = existingItem.quantity + change;
      if (newQuantity <= 0) {
        // Remove item if quantity becomes 0
        return prevItems.filter((cartItem) => cartItem.id !== itemId);
      }

      // Update quantity
      return prevItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
      );
    });
  };

  const handleFilterChange = (type) => {
    setFilter(filter === type ? null : type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseOrderSummary = () => {
    setShowOrderSummary(false);
  };

  const handleHistoryClick = () => {
    navigate('/order-history'); // Navigate to the history page
  };

  return (
    <div className="cafe-container">
      <TopNavigationBar />
      <div className="food-preference-row">
        {/* Filter buttons for veg and non-veg items. */}
        <FoodPreference filter={filter} onFilterChange={handleFilterChange} />
        <button className="history-button" onClick={handleHistoryClick}>
          <img
            src="/history-icon.png"
            alt="History Icon"
            className="history-icon"
            style={{ filter: 'invert(64%) sepia(14%) saturate(374%) hue-rotate(74deg) brightness(92%) contrast(85%)' }} // Apply CSS filter to change color to #b5c3ad
          />
          <span>Order History</span>
        </button>
      </div>
      
      <div className="cafe-wrapper">
        {/* Left Column: CafeGrid */}
        <div className="left-column">
          {/* Render the café grid with filtered items. */}
          <CafeGrid
            cafeItems={cafeItems}
            filter={filter}
            onAddItem={handleAddItem}
            onUpdateQuantity={handleUpdateQuantity}
            cartItems={cartItems} // Pass cartItems to CafeGrid to check quantities
          />
        </div>

        {/* Right Column: OrderSummary */}
        {showOrderSummary && (
          <div className="right-column">
            <OrderSummary cartItems={cartItems} onClose={handleCloseOrderSummary} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cafe;