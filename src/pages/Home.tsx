import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <header className="home-header">
        <h1 className="title">
          FORGE YOUR LEGACY
        </h1>
        <p className="subtitle">
          Welcome to <span className="spartan-text">Spartan</span>
        </p>
      </header>
      <main className="main-content">
        <p className="description">
          Your personal AI-powered trainer is ready. Personalized workouts, real-time feedback, and data-driven progress. Stop guessing, start achieving.
        </p>
        <Link to="/signup" className="cta-button">
          Start Your Transformation
        </Link>
      </main>
    </div>
  );
};

export default Home;
