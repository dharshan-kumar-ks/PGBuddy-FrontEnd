import React, { useState } from 'react';
import './Cafe.css';
import './Food.css';
import TopNavigationBar from './TopNavigationBar';

function Cafe() {
  const [cartItems, setCartItems] = useState(0); // State to track items in the cart

  const cafeItems = [
    {
      id: 'fried-egg',
      name: 'Fried Egg',
      price: 45,
      description: 'Qty: (2 pcs). A couple of eggs roasted both sides, toasts on the side',
      image: '/meals-1.jpg', // Correct path
      isSpicy: true,
    },
    {
      id: 'omelette',
      name: 'Omelette',
      price: 39,
      description: 'Set beaten eggs, served plain or with a choice of filling',
      image: '/meals-1.jpg', // Corrected path (removed extra dot)
      isSpicy: false,
    },
    {
      id: 'chilli-chicken-noodles',
      name: 'Chilli Chicken with Veg Garlic Noodles',
      price: 135,
      description: 'Sweet, spicy, crispy morsels of chicken, served with garlic noodles',
      image: '/meals-1.jpg', // Corrected path (removed extra dot)
      isSpicy: true,
    },
    {
      id: 'chilli-chicken-noodles-2',
      name: 'Chilli Chicken with Veg Garlic Noodles',
      price: 40,
      description: 'Sweet, spicy, crispy morsels of chicken, served with garlic noodles',
      image: '/meals-1.jpg', // Corrected path (removed extra dot)
      isSpicy: true,
    },
  ];

  const handleAddItem = () => {
    setCartItems(cartItems + 1); // Increment cart items
  };

  return (
    <div className="cafe-container">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Header */}
      <header className="cafe-header">
        <h1>Cafe</h1>
        <div className="history-icon">📜 History</div>
      </header>

      {/* Cafe Items */}
      <section className="cafe-items">
        {cafeItems.slice(0, 2).map((item) => (
          <div key={item.id} className="cafe-item">
            {item.isSpicy && <span className="spicy-icon">🌶️</span>}
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
              <p className="description">{item.description}</p>
            </div>
            <img src={item.image} alt={item.name} className="item-image" />
            <button className="add-button" onClick={handleAddItem}>
              ADD
            </button>
          </div>
        ))}

        {/* Combo Meals Section */}
        <h2 className="category-header">Combo Meals</h2>
        {cafeItems.slice(2).map((item) => (
          <div key={item.id} className="cafe-item">
            {item.isSpicy && <span className="spicy-icon">🌶️</span>}
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
              <p className="description">{item.description}</p>
            </div>
            <img src={item.image} alt={item.name} className="item-image" />
            <button className="add-button" onClick={handleAddItem}>
              ADD
            </button>
          </div>
        ))}
      </section>

      {/* Cart Footer */}
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