import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ChatMaestro from '../components/ChatMaestro';
import { generateMesocycleForUser } from '../logic/RoutineGenerator';
import type { UserPreferences, DailyWorkout } from '../types/fitness';
import './Dashboard.css';

// --- Nuevo componente para mostrar el entrenamiento dinámico ---
const DynamicWorkoutDisplay = ({ workout }: { workout: DailyWorkout }) => {
  const navigate = useNavigate();

  const handleStartWorkout = () => {
    // Ahora navegamos a la pantalla de entrenamiento, pasando el objeto workout completo.
    navigate('/workout', { state: { workout } });
  };

  return (
    <div className="wotd-container">
      <h2 className="wotd-title">Tu Misión de Hoy: {workout.name}</h2>
      <div className="wotd-card">
        <h3 className="workout-title">Foco: {workout.focus.join(', ')}</h3>
        <ul className="exercise-list">
          {workout.exercises.map((exercise, index) => (
            <li key={index} className="exercise-item">
              <span className="exercise-name">{exercise.definition.name}</span>
              <span className="exercise-sets-reps">
                {exercise.sets.length} series de {exercise.sets[0].reps} reps
              </span>
            </li>
          ))}
        </ul>
        <button onClick={handleStartWorkout} className="start-workout-btn">
          Comenzar Misión
        </button>
      </div>
    </div>
  );
};


const Dashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  // --- Simulación de Preferencias de Usuario ---
  const userPreferences: UserPreferences = {
    objective: 'hypertrophy',
    level: 'intermediate',
    availableEquipment: ['full_gym', 'dumbbells'],
    daysPerWeek: 4,
  };

  // --- Generación del Plan y Selección del Entrenamiento de Hoy ---
  const mesocycle = generateMesocycleForUser(userPreferences);
  const todayWorkout = mesocycle.plan[0].workouts[0];

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
          "La disciplina es el puente entre las metas y los logros."
        </p>
        
        <ChatMaestro />
        
        {todayWorkout ? (
          <DynamicWorkoutDisplay workout={todayWorkout} />
        ) : (
          <p>No hay entrenamiento programado para hoy.</p>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
