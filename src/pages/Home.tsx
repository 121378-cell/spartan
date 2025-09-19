import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <header className="home-header">
        <h1 className="title">
          FORJA TU LEYENDA
        </h1>
        <p className="subtitle">
          Bienvenido a <span className="spartan-text">Spartan</span>
        </p>
      </header>
      <main className="main-content">
        <p className="description">
          Tu entrenador personal con IA está listo. Entrenamientos personalizados, feedback en tiempo real y progreso basado en datos. Deja de adivinar, empieza a conseguirlo.
        </p>
        <Link to="/signup" className="cta-button">
          Comienza Tu Transformación
        </Link>
      </main>
    </div>
  );
};

export default Home;
