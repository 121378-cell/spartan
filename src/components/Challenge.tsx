
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { getCurrentChallenge, getUserChallengeProgress } from '../services/challengeService';
import type { Challenge, UserChallengeProgress } from '../types/challenges';
import styles from './Challenge.module.css';

const ChallengeComponent = () => {
  const [user] = useAuthState(auth);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [progress, setProgress] = useState<UserChallengeProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallengeData = async () => {
      const currentChallenge = await getCurrentChallenge();
      setChallenge(currentChallenge);

      if (user && currentChallenge) {
        const userProgress = await getUserChallengeProgress(user.uid, currentChallenge.id);
        setProgress(userProgress);
      }
      setLoading(false);
    };

    fetchChallengeData();
  }, [user]);

  if (loading) {
    return <div className={styles.loading}>Cargando reto...</div>;
  }

  if (!challenge) {
    return null; // No active challenge, so don't render anything
  }

  const userProgress = progress ? progress.progress : 0;
  const progressPercentage = (userProgress / challenge.goal) * 100;

  return (
    <div className={styles.challengeContainer}>
      <h3 className={styles.challengeTitle}>{challenge.title}</h3>
      <p className={styles.challengeDescription}>{challenge.description}</p>
      <div className={styles.progressWrapper}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className={styles.progressText}>{userProgress} / {challenge.goal}</span>
      </div>
    </div>
  );
};

export default ChallengeComponent;
