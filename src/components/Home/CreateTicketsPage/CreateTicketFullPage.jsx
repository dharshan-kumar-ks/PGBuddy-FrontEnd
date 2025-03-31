import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import './CreateTicketFullPage.css';

function CreateTicketFullPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};

  // State variables for form fields
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('Low'); // Default to Low
  const [ticketType, setTicketType] = useState('');
  const [tags, setTags] = useState('');
  const createdTime = new Date().toLocaleString();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketData = {
      category: category?.name || 'Unknown Category',
      title,
      message,
      priority,
      type: ticketType,
      tags: tags.split(',').map(tag => tag.trim()), // Convert tags string to array
      createdTime,
    };
    console.log('Ticket Submitted:', ticketData);
    // Add your logic here to save the ticket (e.g., API call to PG admin)
  };

  return (
    <div className="create-ticket-full-page">
      <TopNavigationBar />
      <header className="page-header">Create Ticket</header>
      <p className="category-text">{category?.name || 'Unknown Category'}</p> {/* Added category text */}
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
          <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTicketFullPage;