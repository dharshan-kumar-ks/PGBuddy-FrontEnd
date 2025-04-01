import React, { useState } from 'react';
import './CreateTicketFullPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTicketFullPage() {
  const navigate = useNavigate(); // Initialize navigate function

  // State variables for form fields
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Low'); // Default to Low
  const [ticketType, setTicketType] = useState('');
  const [tags, setTags] = useState('');
  const createdTime = new Date().toLocaleString();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = {
      userId: 1, // Replace with actual user ID if available
      title,
      description: message,
      priority: priority.toUpperCase(), // Convert priority to uppercase (e.g., HIGH, MEDIUM, LOW)
      ticketType: ticketType.toUpperCase(), // Convert ticket type to uppercase
      assignedTo: 5, // Replace with actual assigned user ID if available
      status: 'PENDING',
    };

    try {
      const response = await axios.post('http://localhost:8081/api/tickets/create', ticketData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Ticket created successfully:', response.data);
      setShowSuccessPopup(true); // Show success popup
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="create-ticket-full-page">
      <header className="page-header">Create Ticket</header>
      <p className="category-text">Unknown Category</p> {/* Added category text */}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Left Column: Message Section */}
          <div className="left-column">
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Describe your issue here..."
              />
            </div>
          </div>

          {/* Right Column: Ticket Details with Box */}
          <div className="right-column">
            <div className="right-column-box">
              <div className="form-group">
                <label>Ticket Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter ticket title..."
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <div className="priority-buttons">
                  <button
                    type="button"
                    className={`priority-button priority-low ${priority === 'Low' ? 'selected' : ''}`}
                    onClick={() => setPriority('Low')}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    className={`priority-button priority-medium ${priority === 'Medium' ? 'selected' : ''}`}
                    onClick={() => setPriority('Medium')}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    className={`priority-button priority-high ${priority === 'High' ? 'selected' : ''}`}
                    onClick={() => setPriority('High')}
                  >
                    High
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Ticket Type</label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Incident">Incident</option>
                  <option value="Problem">Problem</option>
                  <option value="Question">Question</option>
                  <option value="Suggestion">Suggestion</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter tags separated by commas (e.g., urgent, maintenance)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Action Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/home')} // Navigate to /home on cancel
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Ticket
          </button>
        </div>
      </form>

      {/* TODO: change the colour scheme for this - Success Popup */}
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