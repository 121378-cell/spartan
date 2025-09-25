
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile } from '../types/user';
import { useAchievements } from '../hooks/useAchievements';
import { achievements } from '../services/achievements';
import styles from './UserProfilePage.module.css';

const UserProfilePage = () => {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const { unlockedAchievements } = useAchievements();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (uid && currentUser) {
        const userDocRef = doc(db, `users/${uid}`);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data() as UserProfile);
        }

        const currentUserDocRef = doc(db, `users/${currentUser.uid}`);
        const currentUserDocSnap = await getDoc(currentUserDocRef);
        if (currentUserDocSnap.exists()) {
          const currentUserData = currentUserDocSnap.data() as UserProfile;
          if (currentUserData.friends && currentUserData.friends.includes(uid)) {
            setIsFriend(true);
          }
        }

        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [uid, currentUser]);

  const handleSendRequest = async () => {
    if (uid && currentUser) {
      const targetUserDocRef = doc(db, `users/${uid}`);
      await updateDoc(targetUserDocRef, {
        friendRequests: arrayUnion(currentUser.uid)
      });
      setRequestSent(true);
    }
  };

  const handleSendMessage = async () => {
    if (!currentUser || !uid) return;

    // Check if a conversation already exists
    const q = query(
      collection(db, 'conversations'), 
      where('participants', 'array-contains', currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let existingConversationId: string | null = null;

    querySnapshot.forEach(doc => {
      const conversation = doc.data();
      if (conversation.participants.includes(uid)) {
        existingConversationId = doc.id;
      }
    });

    if (existingConversationId) {
      navigate('/chat', { state: { conversationId: existingConversationId } });
    } else {
      // Create a new conversation
      const newConversation = await addDoc(collection(db, 'conversations'), {
        participants: [currentUser.uid, uid],
        lastMessage: 'Started a conversation',
        lastMessageTimestamp: new Date(),
      });
      navigate('/chat', { state: { conversationId: newConversation.id } });
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  if (!userProfile) {
    return <div className={styles.error}>User not found.</div>;
  }

  const isOwnProfile = currentUser?.uid === uid;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <img src={userProfile.photoURL || '/placeholder-user.png'} alt="Profile" className={styles.profilePicture} />
        <h1>{userProfile.displayName}</h1>
        <p>{userProfile.email}</p>
        {!isOwnProfile && isFriend && (
          <button onClick={handleSendMessage} className={styles.messageButton}>
            Message
          </button>
        )}
        {!isOwnProfile && !isFriend && (
          <button onClick={handleSendRequest} disabled={requestSent} className={styles.friendRequestButton}>
            {requestSent ? 'Request Sent' : 'Add Friend'}
          </button>
        )}
      </div>
      <div className={styles.achievementsSection}>
        <h2>Achievements</h2>
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
      <div className={styles.friendsSection}>
        <h2>Friends</h2>
        {userProfile.friends && userProfile.friends.length > 0 ? (
          <ul>
            {userProfile.friends.map(friendId => (
              <li key={friendId}>{friendId}</li>
            ))}
          </ul>
        ) : (
          <p>No friends yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
