// ... imports remain unchanged
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connectWebSocket, sendMessage, disconnectWebSocket } from '../../../errorHandling/websocketService';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import AdminTopNavigationBar from '../../AdminPages/AdminNavigation/AdminTopNavigationBar';
import './IndividualTicketPage.css';
import axios from 'axios';

function IndividualTicketPage() {
  const location = useLocation(); // Access location to retrieve ticket data
  const navigate = useNavigate(); // Hook to navigate between pages
  const { ticket } = location.state || {}; // Extract ticket from location state

  // Retrieve user role and user ID from localStorage
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const NavigationBar = userRole === 'ADMIN' ? AdminTopNavigationBar : TopNavigationBar; // Use appropriate navigation bar

  // State variables
  const [messages, setMessages] = useState([]); // Chat messages
  const [newMessage, setNewMessage] = useState(''); // New message input
  const [userName, setUserName] = useState(''); // Current user's name
  const [assignedToName, setAssignedToName] = useState(''); // Assigned user's name
  const [createdByName, setCreatedByName] = useState(''); // Ticket creator's name
  const messagesEndRef = useRef(null); // Reference to scroll to the latest message

  // Scroll to the latest message when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history for the ticket
  useEffect(() => {
    if (ticket?.id) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/chat/history/${ticket.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data)) // Update messages state with chat history
      .catch(console.error); // Log error if API call fails
    }
  }, [ticket?.id]);

  // Establish WebSocket connection for real-time chat
  useEffect(() => {
    if (!ticket?.id) return;

    const onMessageReceived = (chatMessage) => {
      if (chatMessage.ticketId === ticket?.id) {
        setMessages((prevMessages) => [...prevMessages, chatMessage]); // Add new message to chat
      }
    };

    connectWebSocket(onMessageReceived, () => window.location.pathname.startsWith('/ticket/')); // Connect WebSocket
    return () => disconnectWebSocket(); // Disconnect WebSocket on component unmount
  }, [ticket?.id]);

  // Fetch user names for rendering
  useEffect(() => {
    if (ticket?.assignedTo) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${ticket.assignedTo}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => setAssignedToName(res.data.name)).catch(console.error); // Fetch assigned user's name
    }
    if (ticket?.userId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${ticket.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => setCreatedByName(res.data.name)).catch(console.error); // Fetch ticket creator's name
    }
    const id = localStorage.getItem('userId');
    if (id) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => setUserName(res.data.name)).catch(console.error); // Fetch current user's name
    }
  }, [ticket?.assignedTo, ticket?.userId]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const chatMessage = {
      sender: userId, // Current user ID
      recipient: userRole === 'ADMIN' ? ticket?.userId : ticket?.assignedTo, // Determine recipient based on role
      content: newMessage, // Message content
      ticketId: ticket?.id, // Ticket ID
    };

    sendMessage(chatMessage); // Send message via WebSocket
    setNewMessage(''); // Clear input field
  };

  // Render the sender's name for each message
  const renderMessageSender = (msg) => {
    if (msg.sender == userId) return userName; // Current user
    if (msg.sender == ticket?.userId) return createdByName; // Ticket creator
    if (msg.sender == ticket?.assignedTo) return assignedToName; // Assigned user
    return 'Unknown'; // Fallback for unknown sender
  };

  // Navigate back to the tickets list
  const handleBackToTickets = () => {
    navigate(userRole === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard');
  };

  // Mark the ticket as resolved
  const handleMarkResolved = () => {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tickets/${ticket.id}/resolve`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      alert('Ticket marked as resolved.');
      navigate(userRole === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard');
    })
    .catch((err) => {
      console.error(err);
      alert('Error marking ticket as resolved.');
    });
  };

  // Render fallback UI if no ticket is selected
  if (!ticket) {
    return (
      <div className="individual-ticket-page-container">
        <NavigationBar />
        <header className="individual-ticket-page-header">Ticket Not Found</header>
        <p className="individual-ticket-page-category-text">Please select a ticket from the list.</p>
      </div>
    );
  }

  return (
    <div className="individual-ticket-page-container">
      {/* Top Navigation Bar */}
      <NavigationBar />
      <header className="individual-ticket-page-header">Ticket #{ticket.id}</header>
      <p className="individual-ticket-page-category-text">{ticket.category}</p>

      {/* Main Content: Two-Column Layout */}
      <div className="individual-ticket-page-form-grid">
        {/* Left Column: Chat Box */}
        <div className="individual-ticket-page-left-column">
          <div className="individual-ticket-page-chat-box">
            <div className="individual-ticket-page-chat-messages">
              {/* Render chat messages */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`individual-ticket-page-chat-message ${
                    msg.sender == userId
                      ? 'individual-ticket-page-user-message'
                      : 'individual-ticket-page-support-message'
                  }`}
                >
                  <div className="individual-ticket-page-message-content">
                    <span className="individual-ticket-page-sender">{renderMessageSender(msg)}</span>
                    <p>{msg.content}</p>
                    <span className="individual-ticket-page-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* Scroll to latest message */}
            </div>
            {/* Message Input */}
            <div className="individual-ticket-page-chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>

        {/* Right Column: Ticket Info */}
        <div className="individual-ticket-page-right-column">
          <div className="individual-ticket-page-right-column-box">
            {/* Ticket Details */}
            <div className="individual-ticket-page-form-group">
              <label>Ticket Title</label>
              <p className="individual-ticket-page-ticket-title-field">{ticket.title}</p>
            </div>
            <div className="individual-ticket-page-form-group">
              <label>Category</label>
              <p className="individual-ticket-page-display-field">
                {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1).toLowerCase()}
              </p>
            </div>
            <div className="individual-ticket-page-form-group">
              <label>Requested Date</label>
              <p className="individual-ticket-page-display-field">
                {new Date(ticket.createdAt).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="individual-ticket-page-form-group">
              <label>Priority</label>
              <p className={`individual-ticket-page-display-field individual-ticket-page-priority ${ticket.priority.toLowerCase()}`}>
                {ticket.priority}
              </p>
            </div>
            <div className="individual-ticket-page-form-group">
              <label>Status</label>
              <p className={`individual-ticket-page-display-field individual-ticket-page-status ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </p>
            </div>
            <div className="individual-ticket-page-form-group">
              <label>Assigned To</label>
              <p className="individual-ticket-page-display-field">{assignedToName || 'Loading...'}</p>
            </div>
            <div className="individual-ticket-page-form-group">
              <label>Created By</label>
              <p className="individual-ticket-page-display-field">{createdByName || 'Loading...'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Action Buttons */}
      <div className="individual-ticket-page-form-actions">
        <button type="button" className="individual-ticket-page-cancel-button" onClick={() => navigate('/ticket-list-full-page')}>
          Back to Tickets
        </button>
        <button
          type="button"
          className="individual-ticket-page-resolve-button"
          onClick={async () => {
            try {
              const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tickets/resolve/${ticket.id}`, null, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log('Ticket resolved successfully:', response.data);
              navigate('/ticket-list-full-page');
            } catch (error) {
              console.error('Error resolving ticket:', error);
            }
          }}
        >
          Mark as Resolved
        </button>
      </div>
          
    </div>
  );
}

export default IndividualTicketPage;
