import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import WorkoutOfTheDay from '../components/WorkoutOfTheDay';
import { workouts } from '../data/workouts'; // Import the workouts library
import ChatMaestro from '../components/ChatMaestro'; // Import the new component
import './Dashboard.css';

const Dashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  // For now, let's just pick the first workout from our library
  const workoutForToday = workouts[0];

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="logo">SPARTAN</div>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </nav>
      <main className="dashboard-main">
        <h1 className="welcome-message">
          Bienvenido, {user ? user.email : 'Espartano'}
        </h1>
        <p className="motivation-quote">
          "El único entrenamiento malo es el que no se hace."
        </p>
        
        <ChatMaestro />
        
        {/* Pass the selected workout to the component */}
        <WorkoutOfTheDay workout={workoutForToday} />

      </main>
    </div>
  );
};

export default Dashboard;
