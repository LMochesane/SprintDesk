import React from 'react';
import './Navbar.css';

function Navbar({ 
  currentView, 
  onViewChange, 
  isDarkMode, 
  onToggleTheme, 
  currentUserRole,
  onLogout 
}) {
  return (
    <header className="navbar">
      {/* Left: Brand / Logo */}
      <div className="navbar-brand" onClick={() => onViewChange('dashboard')}>
        <div className="navbar-logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
            <line x1="9" y1="9" x2="21" y2="9"></line>
          </svg>
        </div>
        <span className="navbar-title">Sprint<span>Desk</span></span>
      </div>

      {/* Center: Navigation Links */}
      <nav className="navbar-links">
        <button 
          className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onViewChange('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-link ${currentView === 'analytics' ? 'active' : ''}`}
          onClick={() => onViewChange('analytics')}
        >
          Analytics
        </button>
        <button 
          className={`nav-link ${currentView === 'settings' ? 'active' : ''}`}
          onClick={() => onViewChange('settings')}
        >
          Settings
        </button>
      </nav>

      {/* Right: Actions */}
      <div className="navbar-actions">
        {/* Read-Only Role Indicator Pill (Verified by Backend) */}
        <div className="role-dropdown-trigger" style={{ cursor: 'default' }}>
          <span className="role-indicator-dot"></span>
          <span className="role-text">
            Role: <strong>{currentUserRole ? currentUserRole.toUpperCase() : 'MEMBER'}</strong>
          </span>
        </div>

        {/* Theme Toggle */}
        <button className="theme-toggle-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* User Profile Badge */}
        <div className="user-profile-badge" title="Logged in as Relebohile">
          <span>RM</span>
        </div>

        {/* Sign Out Button */}
        <button 
          className="sign-out-btn" 
          onClick={onLogout} 
          aria-label="Sign out"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Navbar;