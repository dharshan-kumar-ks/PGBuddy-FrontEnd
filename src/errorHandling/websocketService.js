import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connectWebSocket = (username, onMessageReceived) => {
    // Pass the token as a query parameter
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const socket = new SockJS(`/chat?token=${encodeURIComponent(token)}`);
    stompClient = Stomp.over(socket);
    
    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        console.log('Subscribing to:', `/user/${username}/queue/messages`);
        /*
        stompClient.subscribe(`/queue/messages-user${stompClient.ws._transport.url.split('/').pop()}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log('Message received from backend:', receivedMessage);
            onMessageReceived(receivedMessage);
        });
        */
        stompClient.subscribe('/user/queue/messages', (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log('Message received from backend:', receivedMessage);
            onMessageReceived(receivedMessage);
        });
    }, (error) => {
        console.error('WebSocket error: ', error);
    });

    socket.onclose = (event) => {
        console.warn('WebSocket connection closed:', event);
        console.log('Attempting to reconnect in 5 seconds...');
        setTimeout(() => {
            connectWebSocket(username, onMessageReceived); // Retry connection
        }, 5000);
    };

    socket.onerror = (error) => {
        console.error('WebSocket encountered an error:', error);
    };
};

export const sendMessage = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
    }
};

export const disconnectWebSocket = () => {
    if (stompClient && stompClient.connected) {
        console.log('Disconnecting WebSocket...');
        stompClient.disconnect(() => {
            console.log('WebSocket disconnected successfully.');
        });
    } else {
        console.warn('WebSocket is not connected. Skipping disconnect.');
    }
};