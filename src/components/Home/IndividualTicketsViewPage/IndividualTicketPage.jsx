// ... imports remain unchanged
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connectWebSocket, sendMessage, disconnectWebSocket } from '../../../errorHandling/websocketService';
import TopNavigationBar from '../../Navigation/TopNavigationBar';
import AdminTopNavigationBar from '../../AdminPages/AdminNavigation/AdminTopNavigationBar';
import './IndividualTicketPage.css';
import axios from 'axios';

function IndividualTicketPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticket } = location.state || {};

  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const NavigationBar = userRole === 'ADMIN' ? AdminTopNavigationBar : TopNavigationBar;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [assignedToName, setAssignedToName] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history
  useEffect(() => {
    if (ticket?.id) {
      axios.get(`http://localhost:8081/api/chat/history/${ticket.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data))
      .catch(console.error);
    }
  }, [ticket?.id]);

  // WebSocket connection
  useEffect(() => {
    if (!ticket?.id) return;

    const onMessageReceived = (chatMessage) => {
      if (chatMessage.ticketId === ticket?.id) {
        setMessages((prevMessages) => [...prevMessages, chatMessage]);
      }
    };

    connectWebSocket(onMessageReceived, () => window.location.pathname.startsWith('/ticket/'));
    return () => disconnectWebSocket();
  }, [ticket?.id]);

  // Fetch usernames for rendering
  useEffect(() => {
    if (ticket?.assignedTo) {
      axios.get(`http://localhost:8081/api/users/${ticket.assignedTo}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => setAssignedToName(res.data.name)).catch(console.error);
    }
    if (ticket?.userId) {
      axios.get(`http://localhost:8081/api/users/${ticket.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => setCreatedByName(res.data.name)).catch(console.error);
    }
    const id = localStorage.getItem('userId');
    if (id) {
      axios.get(`http://localhost:8081/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => setUserName(res.data.name)).catch(console.error);
    }
  }, [ticket?.assignedTo, ticket?.userId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const chatMessage = {
      sender: userId,
      recipient: userRole === 'ADMIN' ? ticket?.userId : ticket?.assignedTo,
      content: newMessage,
      ticketId: ticket?.id,
    };

    sendMessage(chatMessage);
    setNewMessage('');
  };

  const renderMessageSender = (msg) => {
    if (msg.sender == userId) return userName;
    if (msg.sender == ticket?.userId) return createdByName;
    if (msg.sender == ticket?.assignedTo) return assignedToName;
    return 'Unknown';
  };

  const handleBackToTickets = () => {
    navigate(userRole === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard');
  };

  const handleMarkResolved = () => {
    axios.put(`http://localhost:8081/api/tickets/${ticket.id}/resolve`, {}, {
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
      <NavigationBar />
      <header className="individual-ticket-page-header">Ticket #{ticket.id}</header>
      <p className="individual-ticket-page-category-text">{ticket.category}</p>

      <div className="individual-ticket-page-form-grid">
        {/* Left Column: Chat Box */}
        <div className="individual-ticket-page-left-column">
          <div className="individual-ticket-page-chat-box">
            <div className="individual-ticket-page-chat-messages">
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
              <div ref={messagesEndRef} />
            </div>
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
              const response = await axios.post(`http://localhost:8081/api/tickets/resolve/${ticket.id}`, null, {
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
