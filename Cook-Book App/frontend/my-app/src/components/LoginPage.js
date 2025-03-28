import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/components/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Login failed:', data);
        alert(`Login failed: ${data.message || 'Invalid credentials'}`);
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Store token in local storage or a cookie
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      navigate('/');  // Redirect to home page after successful login
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>

      <section className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; Cookbook App 2023</p>
      </footer>
    </div>
  );
}

export default LoginPage;
