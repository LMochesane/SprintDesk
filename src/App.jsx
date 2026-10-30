import { useState } from 'react';
import HomeView from './views/HomeView.jsx';
import HubView from './views/HubView.jsx';
import SolarSystem from './views/SolarSystemView.jsx';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="app">
      {currentView === 'home' && (
        <HomeView onExplore={() => setCurrentView('hub')} />
      )}

      {currentView === 'hub' && (
        <HubView 
          onSelectCategory={(category) => setCurrentView(category)} 
          onBack={() => setCurrentView('home')} 
        />
      )}

      {currentView === 'SolarSystem' && (
        <SolarSystem
          onBack={() => setCurrentView('hub')}
        />
      )}
    </div>
  );
}

export default App;