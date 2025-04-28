import React, { useState } from 'react';
import './CreateTicketFullPage.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function CreateTicketFullPage() {
  const navigate = useNavigate(); // Hook to navigate between pages
  const location = useLocation(); // Hook to access passed state

  // Extract category from location state or default to 'Unknown Category'
  const categoryName = location.state?.category?.name || 'Unknown Category';

  // State variables for form fields
  const [title, setTitle] = useState(''); // Ticket title
  const [message, setMessage] = useState(''); // Ticket description/message
  const [priority, setPriority] = useState('Low'); // Default priority is Low
  const [ticketType, setTicketType] = useState(''); // Ticket type (e.g., Incident, Problem)
  const [tags, setTags] = useState(''); // Tags for the ticket
  const createdTime = new Date().toLocaleString(); // Current timestamp
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State to manage success popup visibility

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
    console.log('Fetched userId from localStorage:', userId);

    // Prepare ticket data for API request
    const ticketData = {
      userId, // User ID of the ticket creator
      title, // Ticket title
      description: message, // Ticket description
      priority: priority.toUpperCase(), // Convert priority to uppercase (e.g., HIGH, MEDIUM, LOW)
      ticketType: ticketType.toUpperCase(), // Convert ticket type to uppercase
      assignedTo: 9, // Replace with actual assigned user ID if available
      status: 'PENDING', // Default status is PENDING
      category: categoryName.toUpperCase(), // Convert category to uppercase
    };

    //console.log('Request body:', ticketData); // Log the request body for debugging

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      // Make API call to create the ticket
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tickets/create`, ticketData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      });
      console.log('Ticket created successfully:', response.data);
      setShowSuccessPopup(true); // Show success popup on successful ticket creation
    } catch (error) {
      console.error('Error creating ticket:', error); // Log error if API call fails
    }
  };

  return (
    <div className="create-ticket-full-page">
      {/* Page Header */}
      <header className="page-header">Create Ticket</header>
      {/* Display the category name */}
      <p className="category-text">{categoryName}</p>

      {/* Ticket creation form */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Left Column: Message Section */}
          <div className="left-column">
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={message} // Bind message state
                onChange={(e) => setMessage(e.target.value)} // Update message state
                required
                placeholder="Describe your issue here..." // Placeholder text
              />
            </div>
          </div>

          {/* Right Column: Ticket Details */}
          <div className="right-column">
            <div className="right-column-box">
              {/* Ticket Title */}
              <div className="form-group">
                <label>Ticket Title</label>
                <input
                  type="text"
                  value={title} // Bind title state
                  onChange={(e) => setTitle(e.target.value)} // Update title state
                  required
                  placeholder="Enter ticket title..." // Placeholder text
                />
              </div>

              {/* Priority Selection */}
              <div className="form-group">
                <label>Priority</label>
                <div className="priority-buttons">
                  {/* Low Priority */}
                  <button
                    type="button"
                    className={`priority-button priority-low ${priority === 'Low' ? 'selected' : ''}`}
                    onClick={() => setPriority('Low')} // Set priority to Low
                  >
                    Low
                  </button>
                  {/* Medium Priority */}
                  <button
                    type="button"
                    className={`priority-button priority-medium ${priority === 'Medium' ? 'selected' : ''}`}
                    onClick={() => setPriority('Medium')} // Set priority to Medium
                  >
                    Medium
                  </button>
                  {/* High Priority */}
                  <button
                    type="button"
                    className={`priority-button priority-high ${priority === 'High' ? 'selected' : ''}`}
                    onClick={() => setPriority('High')} // Set priority to High
                  >
                    High
                  </button>
                </div>
              </div>

              {/* Ticket Type Selection */}
              <div className="form-group">
                <label>Ticket Type</label>
                <select
                  value={ticketType} // Bind ticketType state
                  onChange={(e) => setTicketType(e.target.value)} // Update ticketType state
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Incident">Incident</option>
                  <option value="Problem">Problem</option>
                  <option value="Question">Question</option>
                  <option value="Suggestion">Suggestion</option>
                </select>
              </div>

              {/* Tags Input */}
              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={tags} // Bind tags state
                  onChange={(e) => setTags(e.target.value)} // Update tags state
                  placeholder="Enter tags separated by commas (e.g., urgent, maintenance)" // Placeholder text
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Action Buttons */}
        <div className="form-actions">
          {/* Cancel Button */}
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/home')} // Navigate to /home on cancel
          >
            Cancel
          </button>
          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Submit Ticket
          </button>
        </div>
      </form>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <h2>Success!</h2>
            <p>Your ticket has been created successfully.</p>
            <button onClick={() => setShowSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTicketFullPage;