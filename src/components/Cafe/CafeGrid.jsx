import React from 'react';
import './Cafe.css';

function CafeGrid({ cafeItems, filter, onAddItem }) {
  return (
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
            <button className="add-button" onClick={onAddItem}>+ ADD</button>
          </div>
      ))}
    </section>
  );
}

export default CafeGrid;
