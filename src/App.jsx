import { useState, useEffect } from 'react';
import SplashScreen from './Components/SplashScreen.jsx';
import Navbar from './Components/Navbar.jsx'; // 1. Import your Navbar component here
import Dashboard from './Views/Dashboard.jsx'
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard'); // Tracks active tab

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Splash Screen on initial load */}
      {isLoading && <SplashScreen />}

      {/* 2. Place the Navbar right here so it renders at the top of the app */}
      <Navbar 
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Dynamic View Area (Switches based on what navbar tab is clicked) */}
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {currentView === 'dashboard' && <Dashboard />}

        {currentView === 'analytics' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Analytics & Reports</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Track productivity metrics and task completion rates.</p>
          </div>
        )}

        {currentView === 'settings' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Settings & Team</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage team members and application preferences.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;


