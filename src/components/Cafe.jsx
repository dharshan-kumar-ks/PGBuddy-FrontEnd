import React, { useState } from 'react';
import './Cafe.css';

import TopNavigationBar from './TopNavigationBar';

function Cafe() {
  const [cartItems, setCartItems] = useState(0);
  const [filter, setFilter] = useState(null);

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

  const handleAddItem = () => {
    setCartItems(cartItems + 1);
  };

  const handleFilterChange = (type) => {
    setFilter(filter === type ? null : type);
    // Prevent scrolling issues
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="cafe-container">
      <TopNavigationBar />

      {/* Filter buttons placed right below navbar */}
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange(null)} className={!filter ? 'active' : ''}>All</button>
        <button onClick={() => handleFilterChange('veg')} className={filter === 'veg' ? 'active' : ''}>🟢 Veg</button>
        <button onClick={() => handleFilterChange('non-veg')} className={filter === 'non-veg' ? 'active' : ''}>🔴 Non-Veg</button>
      </div>

      <section className="cafe-grid">
        {cafeItems
          .filter(item => !filter || (filter === 'veg' && item.isVeg) || (filter === 'non-veg' && !item.isVeg))
          .map((item) => (
            <div key={item.id} className="cafe-item">
              {item.isSpicy && <span className="spicy-icon">🌶️</span>}
              <img src={item.image} alt={item.name} className="item-image" />
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
              <p className="description">{item.description}</p>
              <button className="add-button" onClick={handleAddItem}>+ ADD</button>
            </div>
        ))}
      </section>

      {cartItems > 0 && (
        <div className="cart-footer">
          <span className="cart-count">{cartItems} item{cartItems > 1 ? 's' : ''} added</span>
          <button className="continue-button">Continue</button>
        </div>
      )}
    </div>
  );
}

export default Cafe;
