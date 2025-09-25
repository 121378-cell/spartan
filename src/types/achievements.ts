
export interface Achievement {
  id: string;
  name: string;
  description: string;
  criteria: (userProgress: UserProgress) => boolean;
}

export interface UserProgress {
  workoutsCompleted: number;
  // Add other relevant metrics here
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: Date;
}
