import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Common.css'; // Optional: for styling
// ADDED: Import the logo image
import logo from '/Users/dharshan.kumar/PGBuddy-FrontEnd/public/logo-1.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log('Hi');  // ADDED: Log a message for debugging

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Sending request with body:', { email, password }); // ADDED: Log the request body for debugging
      const response = await fetch('http://localhost:8080//api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status); // ADDED: Log the response status for debugging
      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns a token or success message
        //localStorage.setItem('token', data.token); // Store token if your backend provides one
        navigate('/dashboard'); // Redirect to dashboard or home page
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="common-container">
      {/* ADDED: Add the logo image */}
      <img src={logo} alt="PG Buddy Logo" className="form-logo" />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="link">
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;