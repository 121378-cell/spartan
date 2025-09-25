// src/types/workoutLog.ts

export interface CompletedSet {
  reps: number;
  weight: number;
}

export interface CompletedExercise {
  exerciseName: string;
  sets: CompletedSet[];
}

export interface WorkoutLog {
  userId: string;
  dateCompleted: Date;
  workoutName: string;
  completedExercises: CompletedExercise[];
}
