import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ErrorBoundary from './errorHandling/ErrorBoundary';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Home from './components/Home/Home';
import Food from './components/Food/Food';
import Stay from './components/Stay/Stay';
import Cafe from './components/Cafe/Cafe';
import Services from './components/Services/Services';
import Account from './components/Account/Account';
import CreateTicketFullPage from './components/Home/CreateTicketFullPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper"> {/* ADDED: Wrapper div for centering */}
        {/* If a component fails to render, the ErrorBoundary will catch the error and display a message instead of showing a blank page. */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/food" element={<Food />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/cafe" element={<Cafe />} />
            <Route path="/services" element={<Services />} />
            <Route path="/account" element={<Account />} />
            <Route path="/create-ticket-full-page" element={<CreateTicketFullPage />} />

            <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
      </div>
    </Router>
  );
}

export default App;