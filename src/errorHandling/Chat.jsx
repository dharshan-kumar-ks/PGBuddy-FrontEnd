import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const clientRef = useRef(null);

    useEffect(() => {
        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, []);

    const connect = () => {
        if (!user) return;

        const client = new Client({
            brokerURL: 'ws://localhost:8081/ws', // Updated to port 8081
            debug: function(str) {
                console.log(str); // Helpful for debugging
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                setConnected(true);
                client.subscribe('/topic/public', (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages(prev => [...prev, newMessage]);
                });
                
                client.publish({
                    destination: '/app/chat.addUser',
                    body: JSON.stringify({
                        sender: user,
                        type: 'JOIN'
                    })
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        client.activate();
        clientRef.current = client;
    };

    const sendMessage = () => {
        if (message.trim() && clientRef.current) {
            const chatMessage = {
                sender: user,
                content: message,
                type: 'CHAT'
            };
            
            clientRef.current.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage)
            });
            setMessage('');
        }
    };

    const handleDisconnect = () => {
        if (clientRef.current) {
            clientRef.current.deactivate();
            setConnected(false);
        }
    };

    return (
        <div className="chat-container">
            {!connected ? (
                <div className="connect-container">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <button onClick={connect}>Connect</button>
                </div>
            ) : (
                <div className="chat-box">
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === user ? 'sent' : 'received'}`}>
                                {msg.type === 'JOIN' || msg.type === 'LEAVE' ? (
                                    <div className="notification">{msg.sender} {msg.type === 'JOIN' ? 'joined' : 'left'} the chat</div>
                                ) : (
                                    <>
                                        <div className="sender">{msg.sender}</div>
                                        <div className="content">{msg.content}</div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                        <button onClick={handleDisconnect}>Disconnect</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;