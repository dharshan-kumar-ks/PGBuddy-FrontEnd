import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connectWebSocket = (onMessageReceived, shouldRetryConnection) => {
  const token = localStorage.getItem('token');

  let socket;

  try {
    socket = new SockJS(`/chat?token=${encodeURIComponent(token)}`);
    stompClient = Stomp.over(socket);

    // Optional: disable logging
    stompClient.debug = null;

    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe(`/user/queue/messages`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log('Message received from backend:', receivedMessage);
        onMessageReceived(receivedMessage);
      });
    }, (error) => {
      console.error('STOMP connection error:', error);

      // Retry only if user is still on the desired page
      if (shouldRetryConnection && shouldRetryConnection()) {
        console.log('Retrying WebSocket connection in 5 seconds...');
        setTimeout(() => {
          connectWebSocket(onMessageReceived, shouldRetryConnection);
        }, 5000);
      }
    });

    socket.onclose = (event) => {
      console.warn('SockJS connection closed:', event);

      if (shouldRetryConnection && shouldRetryConnection()) {
        console.log('Retrying WebSocket connection in 5 seconds...');
        setTimeout(() => {
          connectWebSocket(onMessageReceived, shouldRetryConnection);
        }, 5000);
      }
    };

    socket.onerror = (error) => {
      console.error('SockJS encountered an error:', error);
    };
  } catch (err) {
    console.error('WebSocket initialization failed:', err);

    if (shouldRetryConnection && shouldRetryConnection()) {
      console.log('Retrying WebSocket initialization in 5 seconds...');
      setTimeout(() => {
        connectWebSocket(onMessageReceived, shouldRetryConnection);
      }, 5000);
    }
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

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
  }
};
