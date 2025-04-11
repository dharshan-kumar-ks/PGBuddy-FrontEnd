import React from 'react';
import '../Cafe.css';

function CafeGrid({ cafeItems, filter, onAddItem, onUpdateQuantity, cartItems }) {
  // Helper function to get the quantity of an item in the cart
  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <section className="cafe-grid">
      {cafeItems
        .filter(item => !filter || (filter === 'veg' && !item.nonVeg) || (filter === 'non-veg' && item.nonVeg))
        .map((item) => {
          const quantity = getItemQuantity(item.id);
          return (
            <div key={item.id} className="cafe-item">
              <div className="image-container">
                <img src={item.imageUrl} alt={item.name} className="item-image" />
                {item.isSpicy && <span className="spicy-icon">🌶️</span>}
              </div>
              <h3>{item.name}</h3>
              <p className="price">₹{item.price}</p>
              <p className="description">{item.description}</p>
              {quantity === 0 ? (
                <button className="add-button" onClick={() => onAddItem(item)}>
                  + ADD
                </button>
              ) : (
                <div className="quantity-selector">
                  <button
                    className="quantity-button"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </section>
  );
}

export default CafeGrid;