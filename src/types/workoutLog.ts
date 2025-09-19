import { Workout } from './workout';

export interface WorkoutLog extends Workout {
  userId: string;
  dateCompleted: Date;
}
