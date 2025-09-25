
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import styles from './Leaderboard.module.css';
import { Link } from 'react-router-dom';

interface LeaderboardEntry {
  id: string;
  userName: string;
  userPhotoURL: string;
  workoutsCompleted: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardQuery = query(
        collection(db, 'leaderboard'),
        orderBy('workoutsCompleted', 'desc'),
        limit(10)
      );

      const querySnapshot = await getDocs(leaderboardQuery);
      const entries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as LeaderboardEntry[];

      setLeaderboard(entries);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando clasificación...</div>;
  }

  return (
    <div className={styles.leaderboardContainer}>
      <h2>Top 10 Espartanos</h2>
      <ol className={styles.leaderboardList}>
        {leaderboard.map((entry, index) => (
          <li key={entry.id} className={styles.leaderboardItem}>
            <span className={styles.rank}>{index + 1}</span>
            <Link to={`/profile/${entry.id}`} className={styles.userLink}>
                <img src={entry.userPhotoURL || '/placeholder-user.png'} alt={entry.userName} className={styles.userImage} />
                <span className={styles.userName}>{entry.userName}</span>
            </Link>
            <span className={styles.score}>{entry.workoutsCompleted} Misiones</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
