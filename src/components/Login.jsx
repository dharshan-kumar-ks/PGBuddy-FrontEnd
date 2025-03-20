import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Common.css'; // Optional: for styling

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns a token or success message
        //localStorage.setItem('token', data.token); // Store token if your backend provides one
        navigate('/dashboard'); // Redirect to dashboard or home page
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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