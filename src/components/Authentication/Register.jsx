import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Common.css'; // Optional: for styling
// ADDED: Import the logo image
//import logo from '/Users/dharshan.kumar/PGBuddy-FrontEnd/public/logo-1.png';
import logo from '/logo-1.png';

function Register() {
  const [email, setEmail] = useState(''); // CHANGE: Renamed username to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();

  try {
    console.log('Sending request with body:', { email, password }); // ADDED: Log the request body for debugging

    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const response = await fetch('http://localhost:8081/api/signup', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Response status:', response.status); // ADDED: Log the response status for debugging
    
    if (!response.ok) {
      setError('User with this email already exists! Try logging in');
      return;
    }

    // Extract JSON response and check if login is successful
    const responseBody = await response.json();
    console.log('Response body:', responseBody);

    navigate('/login');  // Redirect to login page on successful registration
  } catch (err) {
    console.error('Error:', err);
    setError('An error occurred. Please try again.');
  }
};

  return (
    <div className="common-container">
      {/* ADDED: Add the logo image */}
      <img src={logo} alt="PG Buddy Logo" className="form-logo" />
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email" // CHANGE: Changed type from text to email for better validation
            value={email} // CHANGE: Use email instead of username
            onChange={(e) => setEmail(e.target.value)} // CHANGE: Use setEmail instead of setUsername
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
        {success && <p className="success">{success}</p>}
        <button type="submit">Register</button>
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="link">
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;