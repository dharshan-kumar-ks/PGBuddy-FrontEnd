import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTicket.css';

function CreateTicket() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Room Cleaning', icon: '🧹' },
    { id: 2, name: 'Food', icon: '🍲' },
    { id: 3, name: 'Internet', icon: '🛜' },
    { id: 4, name: 'Laundry', icon: '🧺' },
    { id: 5, name: 'Electricity', icon: '🔌' },
    { id: 6, name: 'Security', icon: '🔒' },
    { id: 7, name: 'Plumbing', icon: '🚰' },
    { id: 8, name: 'Payment & Billing', icon: '💳' },
    { id: 9, name: 'PG Buddy BUGs', icon: '🛠️' },
  ];

  const handleCategoryClick = (category) => {
    navigate('/create-ticket-full-page', { state: { category } });
  };

  return (
    <div className="create-ticket-container">
      <h3>Create a Ticket</h3>
      <div className="ticket-categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-icon">{category.icon}</div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;