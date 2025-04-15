/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // Define the global variable to fix the sockjs-client issue
  },
});
*/


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Explicitly map global to window
  },
  server: {
    proxy: {
      '/chat': {
        target: 'http://localhost:8081',
        ws: true,
        changeOrigin: true, // Ensure the origin header is rewritten
      },
    },
  },
});