
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile } from '../types/user';
import styles from './FriendRequests.module.css';

const FriendRequests = () => {
  const [requests, setRequests] = useState<UserProfile[]>([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchRequests = async () => {
      if (currentUser) {
        const userDocRef = doc(db, `users/${currentUser.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserProfile;
          if (userData.friendRequests) {
            const requestPromises = userData.friendRequests.map(uid => getDoc(doc(db, `users/${uid}`)));
            const requestDocs = await Promise.all(requestPromises);
            const requestProfiles = requestDocs.map(doc => doc.data() as UserProfile);
            setRequests(requestProfiles);
          }
        }
      }
    };

    fetchRequests();
  }, [currentUser]);

  const handleAccept = async (requestingUserId: string) => {
    if (currentUser) {
      const currentUserDocRef = doc(db, `users/${currentUser.uid}`);
      const requestingUserDocRef = doc(db, `users/${requestingUserId}`);

      // Add to friends lists
      await updateDoc(currentUserDocRef, { friends: arrayUnion(requestingUserId) });
      await updateDoc(requestingUserDocRef, { friends: arrayUnion(currentUser.uid) });

      // Remove from friend requests
      await updateDoc(currentUserDocRef, { friendRequests: arrayRemove(requestingUserId) });

      setRequests(requests.filter(req => req.uid !== requestingUserId));
    }
  };

  const handleDecline = async (requestingUserId: string) => {
    if (currentUser) {
      const currentUserDocRef = doc(db, `users/${currentUser.uid}`);
      await updateDoc(currentUserDocRef, { friendRequests: arrayRemove(requestingUserId) });
      setRequests(requests.filter(req => req.uid !== requestingUserId));
    }
  };

  if (requests.length === 0) {
    return null;
  }

  return (
    <div className={styles.friendRequestsContainer}>
      <h3>Friend Requests</h3>
      {requests.map(request => (
        <div key={request.uid} className={styles.request}>
          <p>{request.displayName}</p>
          <div>
            <button onClick={() => handleAccept(request.uid)}>Accept</button>
            <button onClick={() => handleDecline(request.uid)}>Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
