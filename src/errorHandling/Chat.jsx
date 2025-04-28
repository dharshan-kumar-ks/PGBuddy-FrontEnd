import React, { useState, useEffect, useRef } from 'react';
import { connectWebSocket, sendMessage, disconnectWebSocket } from './websocketService'; // WebSocket service functions
import './Chat.css';

const Chat = () => {
    const [username, setUsername] = useState(''); // State to store the username
    const [recipient, setRecipient] = useState(''); // State to store the recipient's username
    const [message, setMessage] = useState(''); // State to store the current message
    const [messages, setMessages] = useState([]); // State to store the list of messages
    const [isConnected, setIsConnected] = useState(false); // State to track WebSocket connection status
    const messagesEndRef = useRef(null); // Reference to scroll to the latest message

    // Scroll to the bottom of the messages container
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll to the bottom whenever a new message is added
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Disconnect WebSocket when the component unmounts
    useEffect(() => {
        return () => {
            disconnectWebSocket(); // Disconnect WebSocket connection
        };
    }, []);

    // Handle WebSocket connection
    const handleConnect = () => {
        if (username) {
            // Connect to WebSocket with the provided username
            connectWebSocket(username, (msg) => {
                setMessages((prev) => [...prev, msg]); // Add received messages to the state
            });
            setIsConnected(true); // Set connection status to true
        }
    };

    // Handle sending a message
    const handleSendMessage = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (message && recipient) {
            const chatMessage = {
                sender: username, // Sender's username
                recipient: recipient, // Recipient's username
                content: message, // Message content
            };
            sendMessage(chatMessage); // Send the message via WebSocket
            setMessage(''); // Clear the message input field
        }
    };

    return (
        <div className="chat-container">
            {/* Show connect box if not connected */}
            {!isConnected ? (
                <div className="connect-box">
                    <h2>Enter Username</h2>
                    <input
                        type="text"
                        value={username} // Bind username state
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                        placeholder="Your username"
                        className="input-field"
                    />
                    <button onClick={handleConnect} className="connect-button">
                        Connect
                    </button>
                </div>
            ) : (
                // Show chat box if connected
                <div className="chat-box">
                    {/* Chat Header */}
                    <div className="chat-header">
                        <h2>Chat as {username}</h2> {/* Display the username */}
                    </div>

                    {/* Messages Section */}
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    msg.sender === username ? 'message-right' : 'message-left'
                                }`} // Align message based on sender
                            >
                                <span className="message-meta">
                                    {msg.sender} ({msg.timestamp}) {/* Display sender and timestamp */}
                                </span>
                                <div className="message-content">{msg.content}</div> {/* Display message content */}
                            </div>
                        ))}
                        <div ref={messagesEndRef} /> {/* Scroll to the latest message */}
                    </div>

                    {/* Input Section */}
                    <div className="input-box">
                        {/* Recipient Input */}
                        <input
                            type="text"
                            value={recipient} // Bind recipient state
                            onChange={(e) => setRecipient(e.target.value)} // Update recipient state
                            placeholder="Recipient username"
                            className="input-field"
                        />
                        {/* Message Input */}
                        <div className="message-input">
                            <input
                                type="text"
                                value={message} // Bind message state
                                onChange={(e) => setMessage(e.target.value)} // Update message state
                                placeholder="Type a message"
                                className="input-field"
                            />
                            <button onClick={handleSendMessage} className="send-button">
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;