import React, { useState } from 'react';
import './Cafe.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

import TopNavigationBar from '../TopNavigationBar';
import FoodPreference from './FoodPreference';
import CafeGrid from './CafeGrid';
import OrderSummary from './OrderSummary';

function Cafe() {
  const [cartItems, setCartItems] = useState([]); // Array to store cart items with quantities
  const [filter, setFilter] = useState(null);
  const [showOrderSummary, setShowOrderSummary] = useState(true); // State to toggle order summary visibility
  const navigate = useNavigate(); // Initialize navigation

  const cafeItems = [
    { id: 'fried-egg', name: 'Fried Egg', price: 45, description: 'Qty: (2 pcs). Eggs roasted both sides with toast.', image: '/meals-1.jpg', isSpicy: true, isVeg: false },
    { id: 'omelette', name: 'Omelette', price: 39, description: 'Beaten eggs, served plain or with filling.', image: '/meals-1.jpg', isSpicy: false, isVeg: false },
    { id: 'chilli-chicken-noodles', name: 'Chilli Chicken & Noodles', price: 135, description: 'Spicy chicken with garlic noodles.', image: '/meals-1.jpg', isSpicy: true, isVeg: false },
    { id: 'veg-noodles', name: 'Veg Garlic Noodles', price: 40, description: 'Garlic-flavored noodles with vegetables.', image: '/meals-1.jpg', isSpicy: false, isVeg: true },
    { id: 'pasta', name: 'Cheesy Alfredo Pasta', price: 99, description: 'Creamy cheese pasta with Italian herbs.', image: '/pasta.jpg', isSpicy: false, isVeg: true },
    { id: 'burger', name: 'Chicken Burger', price: 120, description: 'Grilled chicken with lettuce and mayo in a bun.', image: '/burger.jpg', isSpicy: false, isVeg: false },
    { id: 'pizza', name: 'Pepperoni Pizza', price: 199, description: 'Crispy crust, loaded with pepperoni and cheese.', image: '/pizza.jpg', isSpicy: true, isVeg: false },
    { id: 'chips', name: 'French Fries', price: 60, description: 'Crispy golden fries with seasoning.', image: '/chips.jpg', isSpicy: false, isVeg: true },
    { id: 'paneer-tikka', name: 'Paneer Tikka', price: 150, description: 'Grilled paneer cubes marinated in spices.', image: '/paneer-tikka.jpg', isSpicy: true, isVeg: true },
    { id: 'spring-rolls', name: 'Spring Rolls', price: 80, description: 'Crispy rolls stuffed with vegetables.', image: '/spring-rolls.jpg', isSpicy: false, isVeg: true },
    { id: 'butter-chicken', name: 'Butter Chicken', price: 250, description: 'Creamy tomato-based chicken curry.', image: '/butter-chicken.jpg', isSpicy: false, isVeg: false },
    { id: 'dal-makhani', name: 'Dal Makhani', price: 120, description: 'Rich and creamy black lentil curry.', image: '/dal-makhani.jpg', isSpicy: false, isVeg: true },
    { id: 'samosa', name: 'Samosa', price: 20, description: 'Crispy pastry filled with spiced potatoes.', image: '/samosa.jpg', isSpicy: false, isVeg: true },
    { id: 'gulab-jamun', name: 'Gulab Jamun', price: 50, description: 'Soft milk-based sweets soaked in syrup.', image: '/gulab-jamun.jpg', isSpicy: false, isVeg: true },
    { id: 'tandoori-chicken', name: 'Tandoori Chicken', price: 300, description: 'Spiced and grilled chicken.', image: '/tandoori-chicken.jpg', isSpicy: true, isVeg: false },
    { id: 'veg-biryani', name: 'Veg Biryani', price: 180, description: 'Aromatic rice cooked with vegetables and spices.', image: '/veg-biryani.jpg', isSpicy: true, isVeg: true },
    { id: 'chicken-biryani', name: 'Chicken Biryani', price: 220, description: 'Aromatic rice cooked with chicken and spices.', image: '/chicken-biryani.jpg', isSpicy: true, isVeg: false },
    { id: 'pancakes', name: 'Pancakes', price: 90, description: 'Fluffy pancakes served with syrup.', image: '/pancakes.jpg', isSpicy: false, isVeg: true },
    { id: 'ice-cream', name: 'Ice Cream', price: 70, description: 'Creamy and cold dessert in various flavors.', image: '/ice-cream.jpg', isSpicy: false, isVeg: true },
    { id: 'cold-coffee', name: 'Cold Coffee', price: 60, description: 'Chilled coffee with milk and sugar.', image: '/cold-coffee.jpg', isSpicy: false, isVeg: true },
  ];

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