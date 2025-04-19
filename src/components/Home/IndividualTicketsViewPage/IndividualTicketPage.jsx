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
  const NavigationBar = userRole === 'ADMIN' ? AdminTopNavigationBar : TopNavigationBar;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const [assignedToName, setAssignedToName] = useState('');
  const [userName, setUserName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [createdByName, setCreatedByName] = useState('');

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('useEffect triggered. Dependencies:', { ticketId: ticket?.id });

    if (!ticket?.id) {
      console.warn('Missing ticket ID. Skipping WebSocket initialization.');
      return;
    }

    const onMessageReceived = (chatMessage) => {
      if (chatMessage.ticketId === ticket?.id) {
        console.log('Received message for current ticket:', chatMessage);
        setMessages((prevMessages) => [...prevMessages, chatMessage]);
      } else {
        console.log('Received message for a different ticket. Ignoring:', chatMessage);
      }
    };

    connectWebSocket(userName, onMessageReceived);

    return () => {
      console.log('Cleaning up WebSocket connection...');
      disconnectWebSocket();
    };
  }, [ticket?.id]);

  useEffect(() => {
    if (ticket?.id) {
      axios
        .get(`http://localhost:8081/api/chat/history/${ticket.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMessages(response.data);
          console.log('Fetched chat history:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching chat history:', error);
        });
    }
  }, [ticket?.id]);

  useEffect(() => {
    if (ticket?.assignedTo) {
      axios
        .get(`http://localhost:8081/api/users/${ticket.assignedTo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (userRole !== 'ADMIN') {
            setRecipient(response.data.name); // Retain existing logic for non-ADMIN users
          }
          setAssignedToName(response.data.name);
          console.log('Fetched assignedToName:', response.data.name);
        })
        .catch((error) => {
          console.error('Error fetching assignedToName:', error);
        });
    }
  }, [ticket?.assignedTo, userRole]);

  useEffect(() => {
    if (userRole === 'ADMIN' && ticket?.userId) {
      axios
        .get(`http://localhost:8081/api/users/${ticket.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRecipient(response.data.name); // Set recipient to ticket.userName for ADMIN users
          console.log('Fetched recipient for ADMIN:', response.data.name);
          console.log(`Sender: ${userName}, Recipient: ${recipient}`);
        })
        .catch((error) => {
          console.error('Error fetching recipient for ADMIN:', error);
        });
    }
  }, [userRole, ticket?.userId]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage.');
      return;
    }

    // Fetch userName for the current user
    axios
      .get(`http://localhost:8081/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserName(response.data.name);
        console.log('Fetched userName:', response.data.name);
      })
      .catch((error) => {
        console.error('Error fetching userName:', error);
      });
  }, []);

  useEffect(() => {
    if (ticket?.userId) {
      axios
        .get(`http://localhost:8081/api/users/${ticket.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCreatedByName(response.data.name);
          console.log('Fetched createdByName:', response.data.name);
        })
        .catch((error) => {
          console.error('Error fetching createdByName:', error);
        });
    }
  }, [ticket?.userId]);

  useEffect(() => {
    if (userName && recipient) {
      console.log(`Sender: ${userName}, Recipient: ${recipient}`);
    }
  }, [userName, recipient]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const chatMessage = {
      sender: userName,
      recipient: recipient,
      content: newMessage,
      ticketId: ticket?.id, // Added ticketId to the chatMessage object
    };
    sendMessage(chatMessage);
    setNewMessage('');
  };

  if (!ticket) {
    return (
      <div className="individual-ticket-page-container">
        <NavigationBar />
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
                    msg.sender === userName ? 'individual-ticket-page-user-message' : 'individual-ticket-page-support-message'
                  }`}
                >
                  <div className="individual-ticket-page-message-content">
                    <span className="individual-ticket-page-sender">{msg.sender}</span>
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

        {/* Right Column: Ticket Details */}
        <div className="individual-ticket-page-right-column">
          <div className="individual-ticket-page-right-column-box">
            <div className="individual-ticket-page-form-group">
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
              <p className="individual-ticket-page-display-field">
                {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1).toLowerCase()}
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
              <label>Request Date</label>
              <p className="individual-ticket-page-display-field">
                {new Date(ticket.createdAt).toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
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
