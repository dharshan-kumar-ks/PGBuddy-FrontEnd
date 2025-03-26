import React, { useState } from 'react';
import './Cafe.css';

import TopNavigationBar from '../TopNavigationBar';
import FoodPreference from './FoodPreference';
import CafeGrid from './CafeGrid';
import OrderSummary from './OrderSummary';

function Cafe() {
  const [cartItems, setCartItems] = useState([]); // Array to store cart items with quantities
  const [filter, setFilter] = useState(null);
  const [showOrderSummary, setShowOrderSummary] = useState(true); // State to toggle order summary visibility

  const cafeItems = [
    { id: 'fried-egg', name: 'Fried Egg', price: 45, description: 'Qty: (2 pcs). Eggs roasted both sides with toast.', image: '/meals-1.jpg', isSpicy: true, isVeg: false },
    { id: 'omelette', name: 'Omelette', price: 39, description: 'Beaten eggs, served plain or with filling.', image: '/meals-1.jpg', isSpicy: false, isVeg: false },
    { id: 'chilli-chicken-noodles', name: 'Chilli Chicken & Noodles', price: 135, description: 'Spicy chicken with garlic noodles.', image: '/meals-1.jpg', isSpicy: true, isVeg: false },
    { id: 'veg-noodles', name: 'Veg Garlic Noodles', price: 40, description: 'Garlic-flavored noodles with vegetables.', image: '/meals-1.jpg', isSpicy: false, isVeg: true },
    { id: 'pasta', name: 'Cheesy Alfredo Pasta', price: 99, description: 'Creamy cheese pasta with Italian herbs.', image: '/pasta.jpg', isSpicy: false, isVeg: true },
    { id: 'burger', name: 'Chicken Burger', price: 120, description: 'Grilled chicken with lettuce and mayo in a bun.', image: '/burger.jpg', isSpicy: false, isVeg: false },
    { id: 'pizza', name: 'Pepperoni Pizza', price: 199, description: 'Crispy crust, loaded with pepperoni and cheese.', image: '/pizza.jpg', isSpicy: true, isVeg: false },
    { id: 'chips', name: 'French Fries', price: 60, description: 'Crispy golden fries with seasoning.', image: '/chips.jpg', isSpicy: false, isVeg: true },
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

  const handleFilterChange = (type) => {
    setFilter(filter === type ? null : type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseOrderSummary = () => {
    setShowOrderSummary(false);
  };

  return (
    <div className="cafe-container">
      <TopNavigationBar />
      <FoodPreference filter={filter} onFilterChange={handleFilterChange} />
      <div className="cafe-wrapper">
        {/* Left Column: CafeGrid */}
        <div className="left-column">
          <CafeGrid cafeItems={cafeItems} filter={filter} onAddItem={handleAddItem} />
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