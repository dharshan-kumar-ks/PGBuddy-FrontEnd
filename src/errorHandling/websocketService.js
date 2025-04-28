import SockJS from 'sockjs-client'; // Import SockJS for WebSocket communication
import Stomp from 'stompjs'; // Import STOMP for WebSocket messaging protocol

let stompClient = null; // Variable to hold the STOMP client instance

// Function to connect to the WebSocket
export const connectWebSocket = (onMessageReceived, shouldRetryConnection) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  let socket;

  try {
    // Initialize SockJS connection with token
    socket = new SockJS(`/chat?token=${encodeURIComponent(token)}`);
    stompClient = Stomp.over(socket); // Create STOMP client over SockJS

    // Optional: disable STOMP logging
    stompClient.debug = null;

    // Connect to the WebSocket server
    stompClient.connect(
      {},
      (frame) => {
        console.log('Connected: ' + frame); // Log successful connection

        // Subscribe to the user's message queue
        stompClient.subscribe(`/user/queue/messages`, (message) => {
          const receivedMessage = JSON.parse(message.body); // Parse the received message
          console.log('Message received from backend:', receivedMessage);
          onMessageReceived(receivedMessage); // Invoke callback with the received message
        });
      },
      (error) => {
        console.error('STOMP connection error:', error); // Log connection error

        // Retry connection if the retry condition is met
        if (shouldRetryConnection && shouldRetryConnection()) {
          console.log('Retrying WebSocket connection in 5 seconds...');
          setTimeout(() => {
            connectWebSocket(onMessageReceived, shouldRetryConnection); // Retry connection
          }, 5000);
        }
      }
    );

    // Handle SockJS connection close
    socket.onclose = (event) => {
      console.warn('SockJS connection closed:', event);

      // Retry connection if the retry condition is met
      if (shouldRetryConnection && shouldRetryConnection()) {
        console.log('Retrying WebSocket connection in 5 seconds...');
        setTimeout(() => {
          connectWebSocket(onMessageReceived, shouldRetryConnection); // Retry connection
        }, 5000);
      }
    };

    // Handle SockJS connection error
    socket.onerror = (error) => {
      console.error('SockJS encountered an error:', error);
    };
  } catch (err) {
    console.error('WebSocket initialization failed:', err); // Log initialization error

    // Retry initialization if the retry condition is met
    if (shouldRetryConnection && shouldRetryConnection()) {
      console.log('Retrying WebSocket initialization in 5 seconds...');
      setTimeout(() => {
        connectWebSocket(onMessageReceived, shouldRetryConnection); // Retry initialization
      }, 5000);
    }
  }
};

// Function to disconnect from the WebSocket
export const disconnectWebSocket = () => {
  if (stompClient && stompClient.connected) {
    console.log('Disconnecting WebSocket...');
    stompClient.disconnect(() => {
      console.log('WebSocket disconnected successfully.'); // Log successful disconnection
    });
  } else {
    console.warn('WebSocket is not connected. Skipping disconnect.'); // Log if WebSocket is not connected
  }
};

// Function to send a message via WebSocket
export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    // Send message to the server
    stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
  }
};
