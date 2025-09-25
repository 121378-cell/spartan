
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile } from '../types/user';
import styles from './ActivityFeed.module.css';

interface Activity {
  id: string;
  userId: string;
  userName: string; // Store user's name for display
  userPhotoURL: string; // Store user's photo for display
  type: 'workout' | 'achievement';
  timestamp: any;
  data: any;
}

const ActivityFeed = () => {
  const [feed, setFeed] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchFeed = async () => {
      if (!currentUser) return;

      // 1. Get current user's friends list
      const userDocRef = doc(db, `users/${currentUser.uid}`);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        setLoading(false);
        return;
      }
      const userData = userDocSnap.data() as UserProfile;
      const friendIds = userData.friends || [];

      if (friendIds.length === 0) {
        setLoading(false);
        return; // No friends, no feed
      }

      // 2. Query the activity_feed collection for friends' activities
      const feedQuery = query(
        collection(db, 'activity_feed'),
        where('userId', 'in', friendIds),
        orderBy('timestamp', 'desc'),
        limit(20)
      );

      const querySnapshot = await getDocs(feedQuery);
      const activities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Activity[];

      setFeed(activities);
      setLoading(false);
    };

    fetchFeed();
  }, [currentUser]);

  const renderActivity = (activity: Activity) => {
    switch (activity.type) {
      case 'workout':
        return (
          <span>
            completó el entrenamiento <strong>{activity.data.workoutName}</strong>.
          </span>
        );
      case 'achievement':
        return (
          <span>
            desbloqueó el logro: <strong>{activity.data.achievementName}</strong>!
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando actividad...</div>;
  }

  if (feed.length === 0) {
    return (
        <div className={styles.activityFeedContainer}>
            <h3>Actividad de Amigos</h3>
            <p>Aún no hay actividad. ¡Conecta con tus amigos y motívense mutuamente!</p>
        </div>
    );
  }

  return (
    <div className={styles.activityFeedContainer}>
      <h3>Actividad de Amigos</h3>
      {feed.map(activity => (
        <div key={activity.id} className={styles.activityItem}>
          <img src={activity.userPhotoURL || '/placeholder-user.png'} alt={activity.userName} className={styles.userImage} />
          <div className={styles.activityContent}>
            <p>
              <strong>{activity.userName}</strong> {renderActivity(activity)}
              <span className={styles.timestamp}>
                {new Date(activity.timestamp.seconds * 1000).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
