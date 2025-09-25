
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Conversation } from '../../types/chat';
import { UserProfile } from '../../types/user';
import styles from './ConversationsList.module.css';

interface ConversationsListProps {
  onSelectConversation: (conversationId: string) => void;
}

const ConversationsList = ({ onSelectConversation }: ConversationsListProps) => {
  const [user] = useAuthState(auth);
  const [conversations, setConversations] = useState<(Conversation & { otherUserName: string, otherUserPhoto: string })[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'conversations'), where('participants', 'array-contains', user.uid));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const convos = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const conversation = { id: doc.id, ...doc.data() } as Conversation;
        const otherUserId = conversation.participants.find(uid => uid !== user.uid);
        let otherUserName = 'Usuario Desconocido';
        let otherUserPhoto = '/placeholder-user.png';

        if (otherUserId) {
          const userDocRef = doc(db, `users/${otherUserId}`);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as UserProfile;
            otherUserName = userData.displayName;
            otherUserPhoto = userData.photoURL || '/placeholder-user.png';
          }
        }

        return { ...conversation, otherUserName, otherUserPhoto };
      }));
      setConversations(convos);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className={styles.conversationsListContainer}>
      <h2>Conversaciones</h2>
      <div className={styles.conversations}>
        {conversations.map((convo) => (
          <div key={convo.id} className={styles.conversationItem} onClick={() => onSelectConversation(convo.id)}>
            <img src={convo.otherUserPhoto} alt={convo.otherUserName} className={styles.profilePic} />
            <div className={styles.conversationDetails}>
              <p className={styles.userName}>{convo.otherUserName}</p>
              <p className={styles.lastMessage}>{convo.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsList;
