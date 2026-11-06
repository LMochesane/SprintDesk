import { useState, useEffect } from 'react';
import SplashScreen from './Components/SplashScreen.jsx';
import Navbar from './Components/Navbar.jsx';
import Dashboard from './Views/Dashboard.jsx';
import Analytics from './Views/Analytics.jsx';
import Settings from './Views/Settings.jsx';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');

  // RBAC & User State
  const [currentUserRole, setCurrentUserRole] = useState('admin'); // 'admin' | 'member'
  const [currentUserName, setCurrentUserName] = useState('Alex Rivera');

  // Centralized Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sprintdesk_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Save tasks to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('sprintdesk_tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {isLoading && <SplashScreen />}

      <Navbar 
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <Dashboard 
            tasks={tasks} 
            setTasks={setTasks} 
            currentUserRole={currentUserRole}
          />
        )}

        {/* Analytics View */}
        {currentView === 'analytics' && (
          <Analytics 
            tasks={tasks} 
            currentUserRole={currentUserRole}
            currentUserName={currentUserName}
          />
        )}

        {/* Settings View */}
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