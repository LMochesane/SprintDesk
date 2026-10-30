import StarrySky from '../assets/StarrySky.mp4'; // Reusing your video asset
import './HubView.css';

function HubView({ onSelectCategory, onBack }) {
  return (
    <main className="Hub">
      <video 
              className="spaceVideo"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            >
              <source src={StarrySky} type="video/mp4" />
            </video>

      <div className="space-overlay"></div>

      <section className="hub-content">
        <button type="button" className="back-button" onClick={onBack}>
          &larr; Back Home
        </button>

        <h2 className="hub-title">Choose Your Destination</h2>
        <p className="hub-subtitle">Select a frontier to begin your exploration.</p>

        {/* The 4 Topic Cards Grid */}
        <div className="cards-grid">
          <div className="space-card" onClick={() => onSelectCategory('SolarSystem')}>
            <h3>Solar System</h3>
            <p>Explore the Sun, the 8 planets, and their orbits.</p>
          </div>

          <div className="space-card" onClick={() => onSelectCategory('galaxies')}>
            <h3>Search for Life</h3>
            <p>Uncover rover missions, biosignatures, and the search for intelligence.</p>
          </div>

          <div className="space-card" onClick={() => onSelectCategory('moons')}>
            <h3>Cosmic Visitors</h3>
            <p>Discover the comets, asteroids and space objects passing through our neighbourhood.</p>
          </div>

          <div className="space-card" onClick={() => onSelectCategory('life-search')}>
            <h3>Galaxies</h3>
            <p>Journey into the Milky Way, Andromeda, and deep space web.</p>
            
          </div>
        </div>
      </section>
    </main>
  );
}

export default HubView;