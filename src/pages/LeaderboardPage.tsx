
import { useNavigate } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';
import styles from './LeaderboardPage.module.css';

const LeaderboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
       <nav className={styles.dashboardNav}>
        <div className={styles.logo} onClick={() => navigate('/dashboard')}>SPARTAN</div>
        <button onClick={() => navigate('/dashboard')} className={styles.backButton}>
          Volver al Panel
        </button>
      </nav>
      <main className={styles.mainContent}>
        <Leaderboard />
      </main>
    </div>
  );
};

export default LeaderboardPage;
