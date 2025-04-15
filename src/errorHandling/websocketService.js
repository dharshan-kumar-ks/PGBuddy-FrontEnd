import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connectWebSocket = (username, onMessageReceived) => {
    //const socket = new SockJS('/chat'); // Use relative path with proxy
    // Pass the username as a query parameter
    const socket = new SockJS(`/chat?username=${encodeURIComponent(username)}`);
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