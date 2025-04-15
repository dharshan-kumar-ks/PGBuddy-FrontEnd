import React, { useState, useEffect, useRef } from 'react';
import { connectWebSocket, sendMessage, disconnectWebSocket } from './websocketService';
import './Chat.css';

const Chat = () => {
    const [username, setUsername] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        return () => {
            disconnectWebSocket();
        };
    }, []);

    const handleConnect = () => {
        if (username) {
            connectWebSocket(username, (msg) => {
                setMessages((prev) => [...prev, msg]);
            });
            setIsConnected(true);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message && recipient) {
            const chatMessage = {
                sender: username,
                recipient: recipient,
                content: message,
            };
            sendMessage(chatMessage);
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            {!isConnected ? (
                <div className="connect-box">
                    <h2>Enter Username</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your username"
                        className="input-field"
                    />
                    <button onClick={handleConnect} className="connect-button">
                        Connect
                    </button>
                </div>
            ) : (
                <div className="chat-box">
                    <div className="chat-header">
                        <h2>Chat as {username}</h2>
                    </div>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    msg.sender === username ? 'message-right' : 'message-left'
                                }`}
                            >
                                <span className="message-meta">
                                    {msg.sender} ({msg.timestamp})
                                </span>
                                <div className="message-content">{msg.content}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Recipient username"
                            className="input-field"
                        />
                        <div className="message-input">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
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