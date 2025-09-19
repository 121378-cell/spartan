import { Workout } from '../types';

export const workouts: Workout[] = [
  {
    id: 'w001',
    title: 'Forge of Hephaestus',
    description: 'A foundational upper body workout to build strength and mass in the chest, shoulders, and triceps.',
    focus: 'Upper Body',
    exercises: [
      { name: 'Barbell Bench Press', sets: 4, reps: 8 },
      { name: 'Overhead Press', sets: 3, reps: 10 },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 12 },
      { name: 'Tricep Dips', sets: 4, reps: 'to failure' },
      { name: 'Lateral Raises', sets: 3, reps: 15 },
    ],
  },
  {
    id: 'w002',
    title: 'Legs of Atlas',
    description: 'A grueling lower body session to build powerful and resilient legs.',
    focus: 'Lower Body',
    exercises: [
      { name: 'Barbell Squats', sets: 4, reps: 8 },
      { name: 'Romanian Deadlifts', sets: 3, reps: 10 },
      { name: 'Leg Press', sets: 3, reps: 12 },
      { name: 'Walking Lunges', sets: 3, reps: '20 steps' },
      { name: 'Calf Raises', sets: 4, reps: 20 },
    ],
  },
  {
    id: 'w003',
    title: 'Zeus\'s Thunder',
    description: 'A full-body circuit to challenge your cardiovascular system and build all-around functional strength.',
    focus: 'Full Body',
    exercises: [
      { name: 'Deadlifts', sets: 5, reps: 5 },
      { name: 'Pull-ups', sets: 4, reps: 'to failure' },
      { name: 'Kettlebell Swings', sets: 4, reps: 15 },
      { name: 'Goblet Squats', sets: 3, reps: 12 },
      { name: 'Plank', sets: 3, reps: '60s hold' },
    ],
  },
  {
    id: 'w004',
    title: 'Core of the Gods',
    description: 'A targeted workout to sculpt a strong and stable core.',
    focus: 'Core',
    exercises: [
      { name: 'Hanging Leg Raises', sets: 3, reps: 15 },
      { name: 'Russian Twists', sets: 3, reps: 20 },
      { name: 'Cable Crunches', sets: 4, reps: 12 },
      { name: 'Plank Variations', sets: 3, reps: '45s each' },
      { name: 'Ab Rollouts', sets: 3, reps: 'to failure' },
    ],
  },
];
