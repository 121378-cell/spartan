
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ChatMaestro from '../components/ChatMaestro';
import FriendRequests from '../components/FriendRequests';
import UserSearch from '../components/UserSearch';
import ActivityFeed from '../components/ActivityFeed';
import ChallengeComponent from '../components/Challenge'; // Import the new component
import { generateMesocycleForUser } from '../logic/RoutineGenerator';
import { seedInitialChallenge } from '../services/challengeService'; // Import the seed function
import type { UserPreferences, DailyWorkout } from '../types/fitness';
import './Dashboard.css';

const DynamicWorkoutDisplay = ({ workout }: { workout: DailyWorkout }) => {
  const navigate = useNavigate();

  const handleStartWorkout = () => {
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

  const handleNavigateToNutrition = () => {
    navigate('/nutrition');
  };

  const handleNavigateToHistory = () => {
    navigate('/workout-history');
  };

  const handleNavigateToAchievements = () => {
    navigate('/achievements');
  };

  const handleNavigateToProfile = () => {
    if (user) {
      navigate(`/profile/${user.uid}`);
    }
  };

  const handleNavigateToLeaderboard = () => {
    navigate('/leaderboard');
  };

  const handleNavigateToChat = () => {
    navigate('/chat');
  };

  // Temporary function to seed the challenge
  const handleSeedChallenge = async () => {
    try {
      await seedInitialChallenge();
      alert('Challenge seeded successfully!');
    } catch (error) {
      console.error("Failed to seed challenge: ", error);
      alert('Failed to seed challenge. See console for details.');
    }
  };

  const userPreferences: UserPreferences = {
    objective: 'hypertrophy',
    level: 'intermediate',
    availableEquipment: ['full_gym', 'dumbbells'],
    daysPerWeek: 4,
  };

  const mesocycle = generateMesocycleForUser(userPreferences);
  const todayWorkout = mesocycle.plan[0].workouts[0];

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="logo">SPARTAN</div>
        <div>
          <button onClick={handleNavigateToNutrition} className="nav-button">Nutrición</button>
          <button onClick={handleNavigateToHistory} className="nav-button">Historial</button>
          <button onClick={handleNavigateToAchievements} className="nav-button">Logros</button>
          <button onClick={handleNavigateToLeaderboard} className="nav-button">Clasificación</button>
          <button onClick={handleNavigateToChat} className="nav-button">Mensajes</button>
          <button onClick={handleNavigateToProfile} className="nav-button">Perfil</button>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        </div>
      </nav>
      <main className="dashboard-main">
        <h1 className="welcome-message">
          Bienvenido, {user ? user.email : 'Espartano'}
        </h1>
        <p className="motivation-quote">
          "La disciplina es el puente entre las metas y los logros."
        </p>

        {/* Temporary Button to Seed Challenge - Remove in production */}
        <button onClick={handleSeedChallenge} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Seed Enero Challenge (Dev)
        </button>

        <ChallengeComponent />
        <UserSearch />
        <FriendRequests />
        <ActivityFeed /> 
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
