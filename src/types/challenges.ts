
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'workouts' | 'reps' | 'weight'; // Type of challenge
  goal: number; // The target value for the challenge
  startDate: Date;
  endDate: Date;
}

export interface UserChallengeProgress {
  userId: string;
  challengeId: string;
  progress: number;
  completed: boolean;
}
