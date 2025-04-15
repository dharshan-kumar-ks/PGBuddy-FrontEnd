import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connectWebSocket = (username, onMessageReceived) => {
    const socket = new SockJS('/chat'); // Use relative path with proxy
    stompClient = Stomp.over(socket);
    
    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe(`/user/${username}/queue/messages`, (message) => {
            onMessageReceived(JSON.parse(message.body));
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
    if (stompClient) {
        stompClient.disconnect();
    }
};