import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavigationBar from '../TopNavigationBar';
import './IndividualTicketPage.css';

function IndividualTicketPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket } = location.state || {}; // Get the ticket data passed from TicketListFullPage

  // Sample chat messages (placeholder for future WebSocket implementation)
  const chatMessages = [
    { sender: 'User', message: 'Hi, I ordered the wrong product. Can you help?', timestamp: '07/11/2023, 06:25AM' },
    { sender: 'Support', message: 'Hello! Sure, I can help with that. Can you provide the order number?', timestamp: '07/11/2023, 06:30AM' },
    { sender: 'User', message: 'It’s Order #12345.', timestamp: '07/11/2023, 06:32AM' },
    { sender: 'Support', message: 'Thank you. I’ve found your order. Let’s process a return for you.', timestamp: '07/11/2023, 06:35AM' },
  ];

  if (!ticket) {
    return (
      <div className="individual-ticket-page-container">
        <TopNavigationBar />
        <header className="individual-ticket-page-header">Ticket Not Found</header>
        <p className="individual-ticket-page-category-text">Please select a ticket from the list.</p>
        <div className="individual-ticket-page-form-actions">
          <button type="button" className="individual-ticket-page-cancel-button" onClick={() => navigate('/tickets')}>
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="individual-ticket-page-container">
      <TopNavigationBar />
      <header className="individual-ticket-page-header">Ticket #{ticket.id}</header>
      <p className="individual-ticket-page-category-text">{ticket.category}</p>
      <div className="individual-ticket-page-form-grid">
        {/* Left Column: Chat Box */}
        <div className="individual-ticket-page-left-column">
          <div className="individual-ticket-page-chat-box">
            <div className="individual-ticket-page-chat-messages">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`individual-ticket-page-chat-message ${
                    msg.sender === 'User' ? 'individual-ticket-page-user-message' : 'individual-ticket-page-support-message'
                  }`}
                >
                  <div className="individual-ticket-page-message-content">
                    <span className="individual-ticket-page-sender">{msg.sender}</span>
                    <p>{msg.message}</p>
                    <span className="individual-ticket-page-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="individual-ticket-page-chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                // disabled // Disable for now since WebSocket isn't implemented
              />
              <button>Send</button>
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Details (Display Only) */}
        <div className="individual-ticket-page-right-column">
          <div className="individual-ticket-page-right-column-box">
            <div className="individual-ticket-page-form-group ">
              <label>Ticket Title</label>
              <p className="individual-ticket-page-ticket-title-field">{ticket.title}</p>
            </div>

            <div className="individual-ticket-page-form-group">
              <label>Priority</label>
              <p className={`individual-ticket-page-display-field individual-ticket-page-priority ${ticket.priority.toLowerCase()}`}>
                {ticket.priority}
              </p>
            </div>

            <div className="individual-ticket-page-form-group">
              <label>Ticket Type</label>
              <p className="individual-ticket-page-display-field">{ticket.category}</p>
            </div>

            <div className="individual-ticket-page-form-group">
              <label>Status</label>
              <p className={`individual-ticket-page-display-field individual-ticket-page-status ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </p>
            </div>

            <div className="individual-ticket-page-form-group">
              <label>Assigned To</label>
              <p className="individual-ticket-page-display-field">{ticket.assignedTo}</p>
            </div>

            <div className="individual-ticket-page-form-group">
              <label>Request Date</label>
              <p className="individual-ticket-page-display-field">{ticket.requestDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="individual-ticket-page-form-actions">
        <button type="button" className="individual-ticket-page-cancel-button" onClick={() => navigate('/ticket-list-full-page')}>
          Back to Tickets
        </button>
      </div>
    </div>
  );
}

export default IndividualTicketPage;