import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import Dashboard from './components/Dashboard'; // Add your dashboard component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper"> {/* ADDED: Wrapper div for centering */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<Login />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;