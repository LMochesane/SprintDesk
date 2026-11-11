import { useState, useEffect } from 'react';
import SplashScreen from './Components/SplashScreen.jsx';
import Login from './Components/Login.jsx';
import Navbar from './Components/Navbar.jsx';
import Dashboard from './Views/Dashboard.jsx';
import Analytics from './Views/Analytics.jsx';
import Settings from './Views/Settings.jsx';
import './App.css';

function App() {
  // App flow states: 'splash' -> 'login' -> 'app'
  const [appStage, setAppStage] = useState('splash'); 
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  // RBAC & User State
  const [currentUserRole, setCurrentUserRole] = useState('admin'); 
  const [currentUserName, setCurrentUserName] = useState('Alex Rivera');

  // Centralized Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sprintdesk_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Handle splash screen completion -> move to login
  const handleSplashFinished = () => {
    setAppStage('login');
  };

  // Handle successful login -> move to main app dashboard
  const handleLoginSuccess = (role, name) => {
    setCurrentUserRole(role);
    if (name) setCurrentUserName(name);
    setAppStage('app');
  };

  // Save tasks to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('sprintdesk_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 1. Stage: Splash Screen
  if (appStage === 'splash') {
    return (
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <SplashScreen onAnimationFinished={handleSplashFinished} />
      </div>
    );
  }

  // 2. Stage: Login Screen
  if (appStage === 'login') {
    return (
      <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // 3. Stage: Main App (Navbar + Views)
  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar 
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
      />

      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {currentView === 'dashboard' && (
          <Dashboard 
            tasks={tasks} 
            setTasks={setTasks} 
            currentUserRole={currentUserRole}
          />
        )}

        {currentView === 'analytics' && (
          <Analytics 
            tasks={tasks} 
            currentUserRole={currentUserRole}
            currentUserName={currentUserName}
          />
        )}

        {currentView === 'settings' && (
          <Settings 
            currentUserRole={currentUserRole}
            setCurrentUserRole={setCurrentUserRole}
            currentUserName={currentUserName}
            setCurrentUserName={setCurrentUserName}
          />
        )}
      </main>
    </div>
  );
}

export default App;