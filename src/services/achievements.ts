
import { Achievement, UserProgress } from '../types/achievements';

export const achievements: Achievement[] = [
  {
    id: 'first-workout',
    name: 'First Workout',
    description: 'Complete your first workout.',
    criteria: (progress: UserProgress) => progress.workoutsCompleted >= 1,
  },
  {
    id: 'workout-warrior',
    name: 'Workout Warrior',
    description: 'Complete 10 workouts.',
    criteria: (progress: UserProgress) => progress.workoutsCompleted >= 10,
  },
  {
    id: 'spartan-in-the-making',
    name: 'Spartan in the Making',
    description: 'Complete 25 workouts.',
    criteria: (progress: UserProgress) => progress.workoutsCompleted >= 25,
  },
  {
    id: 'true-spartan',
    name: 'True Spartan',
    description: 'Complete 50 workouts.',
    criteria: (progress: UserProgress) => progress.workoutsCompleted >= 50,
  },
];
