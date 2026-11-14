import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5179/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      const normalizedRole = data.role.toLowerCase();
      onLoginSuccess(normalizedRole, data.username);
    } catch (err) {
      setError('Unable to connect to the server. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-fills demo credentials without bypassing real API authentication
  const fillDemoCredentials = (demoEmail, demoPassword) => {
    setError('');
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>SprintDesk Access</h2>
        <p className="login-subtitle">Sign in to your workspace</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sprintdesk.com"
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Portfolio Demo Quick-Fill Section */}
        <div className="demo-credentials-box">
          <p className="demo-label">Recruiter / Demo Quick-Fill:</p>
          <div className="demo-btn-group">
            <button
              type="button"
              className="demo-pill-btn"
              onClick={() => fillDemoCredentials('admin@sprintdesk.com', 'password123')}
              disabled={isLoading}
            >
              🛡️ Admin Account
            </button>
            <button
              type="button"
              className="demo-pill-btn"
              onClick={() => fillDemoCredentials('developer@sprintdesk.com', 'password123')}
              disabled={isLoading}
            >
              👤 Developer Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}