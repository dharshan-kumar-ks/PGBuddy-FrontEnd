import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTicket.css';
import axiosInstance from '../../../../axiosConfig'; // Use the configured axios instance

function CreateTicket() {
  const navigate = useNavigate(); // Hook to navigate between pages

  // List of ticket categories with icons
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

  // Handle category card click
  const handleCategoryClick = (category) => {
    navigate('/create-ticket-full-page', { state: { category } }); // Navigate to the ticket creation page with the selected category
  };

  // Placeholder function for submitting a ticket (not used in this component)
  const handleSubmit = async (title, description) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const ticketData = { title, description }; // Prepare ticket data
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/tickets/create`, // API endpoint for ticket creation
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      }
    ); // Use axiosInstance for the API call
  };

  return (
    <div className="create-ticket-container">
      {/* Heading */}
      <h3>Create a Ticket</h3>

      {/* Grid of ticket categories */}
      <div className="ticket-categories-grid">
        {categories.map((category) => (
          <div
            key={category.id} // Unique key for each category
            className="category-card"
            onClick={() => handleCategoryClick(category)} // Handle category selection
          >
            <div className="category-icon">{category.icon}</div> {/* Display category icon */}
            <span className="category-name">{category.name}</span> {/* Display category name */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;