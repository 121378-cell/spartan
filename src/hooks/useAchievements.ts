
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { achievements } from '../services/achievements';
import { UserProgress, UnlockedAchievement } from '../types/achievements';

export const useAchievements = () => {
  const [user] = useAuthState(auth);
  const [unlockedAchievements, setUnlockedAchievements] = useState<UnlockedAchievement[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({ workoutsCompleted: 0 });

  useEffect(() => {
    const checkAchievements = async () => {
      if (user) {
        // 1. Fetch user progress (workout logs)
        const workoutLogsRef = collection(db, `users/${user.uid}/workoutlogs`);
        const workoutLogsSnapshot = await getDocs(workoutLogsRef);
        const workoutsCompleted = workoutLogsSnapshot.size;
        const progress: UserProgress = { workoutsCompleted };
        setUserProgress(progress);

        // 2. Fetch already unlocked achievements
        const unlockedAchievementsRef = doc(db, `users/${user.uid}/achievements/unlocked`);
        const unlockedAchievementsSnap = await getDoc(unlockedAchievementsRef);
        const unlocked = unlockedAchievementsSnap.exists() ? unlockedAchievementsSnap.data().achievements : [];
        setUnlockedAchievements(unlocked);

        // 3. Check for new achievements
        const newAchievements = achievements.filter(achievement => {
          const isAlreadyUnlocked = unlocked.some((ua: UnlockedAchievement) => ua.achievementId === achievement.id);
          return !isAlreadyUnlocked && achievement.criteria(progress);
        });

        // 4. Save new achievements and create activity feed event
        if (newAchievements.length > 0) {
          const updatedAchievements = [
            ...unlocked,
            ...newAchievements.map(achievement => ({ achievementId: achievement.id, unlockedAt: new Date() })),
          ];
          await setDoc(unlockedAchievementsRef, { achievements: updatedAchievements });
          setUnlockedAchievements(updatedAchievements);

          // Create activity feed events
          const activityFeedRef = collection(db, 'activity_feed');
          for (const achievement of newAchievements) {
            await addDoc(activityFeedRef, {
              userId: user.uid,
              userName: user.displayName,
              userPhotoURL: user.photoURL,
              type: 'achievement',
              timestamp: serverTimestamp(),
              data: {
                achievementId: achievement.id,
                achievementName: achievement.name,
              },
            });
          }
        }
      }
    };

    checkAchievements();
  }, [user]);

  return { unlockedAchievements, userProgress };
};
