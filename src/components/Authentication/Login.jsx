import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Common.css'; // Optional: for styling
// ADDED: Import the logo image
import logo from '/logo-1.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //console.log('Hi');  // ADDED: Log a message for debugging

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Sending request with body:', { email, password }); // ADDED: Log the request body for debugging

      const response = await fetch('http://localhost:8081/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status); // ADDED: Log the response status for debugging
      
      if (!response.ok) {
        setError('Invalid email or password');
        return;
      }
  
      // Extract JSON response and check if login is successful
      const responseBody = await response.json();
      console.log('Response body:', responseBody);
  
      if (responseBody.success) {  // Check if backend returned `success: true`
        localStorage.setItem('userId', responseBody.userId); // Store userId in localStorage
        localStorage.setItem('userRole', responseBody.userRole); // Store userRole in localStorage
        localStorage.setItem('token', responseBody.token); // Store token in localStorage
        console.log(`User ID ${responseBody.userId} and token have been added to localStorage`); // Log userId and token added to localStorage

        // Fetch user details after successful login
        const userDetailsResponse = await fetch(`http://localhost:8081/api/users/${responseBody.userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${responseBody.token}` // Include token for authentication
          }
        });

        if (!userDetailsResponse.ok) {
          setError('Failed to fetch user details.');
          return;
        }

        const userDetails = await userDetailsResponse.json();
        console.log('User details:', userDetails);

        // Navigate based on user type
        if (userDetails.userType === 'ADMIN') {
          navigate('/admin-notice-page');
        } else {
          navigate('/home');
        }
      } else {
        setError('Invalid email or password'); // Show error if credentials are wrong
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="common-container">
      {/* ADDED: Add the logo image - <img src={logo} alt="PG Buddy Logo" className="form-logo" /> - */}
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