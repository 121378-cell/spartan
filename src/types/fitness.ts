// src/types/fitness.ts

export type Objective = 'strength' | 'hypertrophy' | 'endurance' | 'definition';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Equipment = 'full_gym' | 'dumbbells' | 'bodyweight' | 'bands';
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'biceps' | 'triceps' | 'core';
export type ExerciseType = 'compound' | 'isolation' | 'accessory';

// Defines a single exercise in the database
export interface ExerciseDefinition {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  requiredEquipment: Equipment[];
  difficulty: Level;
  type: ExerciseType;
}

// User's training profile and goals
export interface UserPreferences {
  objective: Objective;
  level: Level;
  availableEquipment: Equipment[];
  daysPerWeek: number;
}

// Structure for a single set in a workout
export interface WorkoutSet {
  reps: number | string; // e.g., 10 or 'AMRAP'
  weight?: number; // Optional, for tracking
}

// A specific exercise instance within a workout
export interface WorkoutExercise {
  definition: ExerciseDefinition;
  sets: WorkoutSet[];
  restPeriod: number; // in seconds
}

// A complete workout session for a single day
export interface DailyWorkout {
  day: number;
  name: string;
  focus: MuscleGroup[];
  exercises: WorkoutExercise[];
}

// A full weekly training plan
export interface WeeklyPlan {
  week: number;
  workouts: DailyWorkout[];
}

// A multi-week training block
export interface Mesocycle {
  user: UserPreferences;
  plan: WeeklyPlan[];
}
