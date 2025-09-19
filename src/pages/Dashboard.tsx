import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import WorkoutOfTheDay from '../components/WorkoutOfTheDay';
import { workouts } from '../data/workouts'; // Import the workouts library
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
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
      <main className="dashboard-main">
        <h1 className="welcome-message">
          Welcome, {user ? user.email : 'Spartan'}
        </h1>
        <p className="motivation-quote">
          "The only bad workout is the one that didn't happen."
        </p>
        
        {/* Pass the selected workout to the component */}
        <WorkoutOfTheDay workout={workoutForToday} />

      </main>
    </div>
  );
};

export default Dashboard;
