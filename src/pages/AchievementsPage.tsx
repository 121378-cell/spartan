
import { useAchievements } from '../hooks/useAchievements';
import { achievements } from '../services/achievements';
import styles from './AchievementsPage.module.css';

const AchievementsPage = () => {
  const { unlockedAchievements } = useAchievements();

  return (
    <div className={styles.achievementsContainer}>
      <h1>Achievements</h1>
      <div className={styles.achievementsList}>
        {achievements.map(achievement => {
          const isUnlocked = unlockedAchievements.some(ua => ua.achievementId === achievement.id);
          return (
            <div key={achievement.id} className={`${styles.achievementCard} ${isUnlocked ? styles.unlocked : ''}`}>
              <h3>{achievement.name}</h3>
              <p>{achievement.description}</p>
              {isUnlocked && <div className={styles.unlockedBadge}>Unlocked</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsPage;
