import React from 'react';
import './SplashScreen.css';

function SplashScreen() {
  return (
    <div className="splash-container">
      <div className="splash-content">
        {/* Animated Icon / Logo Mark */}
        <div className="splash-logo-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
            <line x1="9" y1="9" x2="21" y2="9"></line>
          </svg>
        </div>
        
        {/* Animated App Name */}
        <h1 className="splash-title">Sprint<span>Desk</span></h1>
        <p className="splash-subtitle">Enterprise Task Management</p>
      </div>
    </div>
  );
}

export default SplashScreen;