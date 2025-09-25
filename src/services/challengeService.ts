
import { collection, doc, getDocs, setDoc, query, where, Timestamp, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import type { Challenge, UserChallengeProgress } from '../types/challenges';

const challengesCollection = collection(db, 'challenges');

// Hardcoded challenge data for initial setup
const initialChallenge: Omit<Challenge, 'id'> = {
  title: 'Misión de Enero: 20 Entrenamientos',
  description: 'Completa 20 entrenamientos este mes para ganar un logro exclusivo.',
  type: 'workouts',
  goal: 20,
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-31'),
};

// Function to seed the initial challenge into Firestore. 
// This should be run once manually or from an admin script.
export const seedInitialChallenge = async () => {
  const challengeId = 'january_2024_workout_challenge';
  const challengeRef = doc(db, 'challenges', challengeId);
  await setDoc(challengeRef, {
    ...initialChallenge,
    startDate: Timestamp.fromDate(initialChallenge.startDate),
    endDate: Timestamp.fromDate(initialChallenge.endDate),
  });
  console.log('Challenge seeded successfully!');
};

export const getCurrentChallenge = async (): Promise<Challenge | null> => {
    const now = Timestamp.now();
    const q = query(
      challengesCollection,
      where('startDate', '<=', now),
      where('endDate', '>=', now)
    );
  
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      return null; // No active challenge
    }
  
    // Assuming there's only one active challenge at a time
    const challengeDoc = querySnapshot.docs[0];
    const data = challengeDoc.data();
  
    return {
      id: challengeDoc.id,
      title: data.title,
      description: data.description,
      type: data.type,
      goal: data.goal,
      startDate: (data.startDate as Timestamp).toDate(),
      endDate: (data.endDate as Timestamp).toDate(),
    };
  };
  
  export const getUserChallengeProgress = async (userId: string, challengeId: string): Promise<UserChallengeProgress | null> => {
    const progressRef = doc(db, `users/${userId}/challengeProgress`, challengeId);
    const docSnap = await getDocs(progressRef as any);

    if (docSnap.empty) {
        return null
    }

    const data = docSnap.docs[0].data();

    return data as UserChallengeProgress;
  };

  export const updateUserChallengeProgress = async (userId: string, challengeId: string) => {
    const progressRef = doc(db, 'users', userId, 'challengeProgress', challengeId);
    const docSnap = await getDocs(progressRef as any);
  
    if (!docSnap.empty) {
      await updateDoc(progressRef, {
        progress: increment(1),
      });
    } else {
      await setDoc(progressRef, {
        userId,
        challengeId,
        progress: 1,
        completed: false, // This will be updated separately if goal is met
      });
    }
  };
