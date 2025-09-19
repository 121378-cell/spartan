export interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
  rest: number;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  focus: 'Upper Body' | 'Lower Body' | 'Full Body' | 'Core';
  exercises: Exercise[];
}

export interface WorkoutLog extends Workout {
  userId: string;
  dateCompleted: Date;
}