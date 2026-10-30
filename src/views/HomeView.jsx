import StarrySky from '../assets/StarrySky.mp4';
import './HomeView.css';

function HomeView({ onExplore }) {
  return (
    <main className="Home">
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

      <section className="home-content">
        <h1>The Galaxy</h1>
        <br />
        <p>A universe of wonders awaits.</p>

        <button type="button" className="start-button" onClick={onExplore}>
          Enter The Universe
        </button>
      </section>
    </main>
  );
}

export default HomeView;