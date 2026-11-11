import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

function Navbar({ 
  currentView, 
  onViewChange, 
  isDarkMode, 
  onToggleTheme, 
  currentUserRole, 
  setCurrentUserRole 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to track the dropdown container

  const roles = [
    { id: 'admin', label: 'Admin (Full Control)' },
    { id: 'member', label: 'Member (Create/Edit)' },
    { id: 'viewer', label: 'Viewer (Read-Only)' }
  ];

  // Effect to handle clicks outside the dropdown component
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
        {/* Dev Role Switcher Dropdown with ref attached */}
        <div className="role-dropdown-container" ref={dropdownRef}>
          <button 
            className="role-dropdown-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Toggle role menu"
          >
            <span className="role-indicator-dot"></span>
            <span className="role-text">Role: <strong>{currentUserRole ? currentUserRole.toUpperCase() : 'ADMIN'}</strong></span>
            <span className="dropdown-chevron">▼</span>
          </button>

          {isDropdownOpen && (
            <div className="role-dropdown-menu">
              <div className="dropdown-header">Switch Dev Role</div>
              {roles.map((r) => (
                <button
                  key={r.id}
                  className={`dropdown-item ${currentUserRole === r.id ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentUserRole(r.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button className="theme-toggle-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* User Profile Badge */}
        <div className="user-profile-badge" title="Logged in as Relebohile">
          <span>RM</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;