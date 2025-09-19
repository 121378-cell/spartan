// src/logic/RoutineGenerator.ts
import type { UserPreferences, DailyWorkout, WeeklyPlan, Mesocycle, ExerciseDefinition, MuscleGroup } from '../types/fitness';
import { exerciseDatabase } from '../data/exerciseDatabase';

// --- Private Helper Functions ---

/**
 * Selects exercises from the database based on criteria.
 */
const selectExercises = (
  muscle: MuscleGroup,
  count: number,
  preferences: UserPreferences
): ExerciseDefinition[] => {
  const { availableEquipment, level } = preferences;

  const filtered = exerciseDatabase.filter(ex => 
    ex.muscleGroup === muscle &&
    ex.difficulty === level && // Simple filter for now, can be expanded
    ex.requiredEquipment.some(req => availableEquipment.includes(req))
  );

  // Simple shuffle and take, can be improved with exercise variation logic
  return filtered.sort(() => 0.5 - Math.random()).slice(0, count);
};

/**
 * Generates a single day's workout based on a template.
 */
const generateDailyWorkout = (
  dayNumber: number,
  name: string,
  muscles: { muscle: MuscleGroup, count: number }[],
  preferences: UserPreferences,
  week: number
): DailyWorkout => {
  const exercises = muscles.flatMap(({ muscle, count }) => 
    selectExercises(muscle, count, preferences)
  );

  // Apply progressive overload principle (example: add 1 rep each week)
  const repsForWeek = preferences.objective === 'hypertrophy' ? 8 + week : 5 + week;

  return {
    day: dayNumber,
    name: name,
    focus: muscles.map(m => m.muscle),
    exercises: exercises.map(ex => ({
      definition: ex,
      sets: Array(3).fill({ reps: repsForWeek }), // 3 sets for all for now
      restPeriod: 60, // 60s rest for all for now
    })),
  };
};

// --- Public API ---

/**
 * Generates a full 4-week mesocycle based on user preferences.
 */
export const generateMesocycleForUser = (preferences: UserPreferences): Mesocycle => {
  const weeklyPlans: WeeklyPlan[] = [];
  
  // Choose split based on days per week
  let split: { name: string, muscles: { muscle: MuscleGroup, count: number }[] }[] = [];

  if (preferences.daysPerWeek >= 4) { // PPL-like split
    split = [
      { name: 'Día de Empuje', muscles: [{ muscle: 'chest', count: 2 }, { muscle: 'shoulders', count: 1 }, { muscle: 'triceps', count: 1 }] },
      { name: 'Día de Tirón', muscles: [{ muscle: 'back', count: 2 }, { muscle: 'biceps', count: 1 }] },
      { name: 'Día de Pierna', muscles: [{ muscle: 'legs', count: 3 }, { muscle: 'core', count: 1 }] },
      { name: 'Full Body Power', muscles: [{ muscle: 'legs', count: 1 }, { muscle: 'chest', count: 1 }, { muscle: 'back', count: 1 }] },
    ];
  } else { // Full body split
    split = [
      { name: 'Full Body A', muscles: [{ muscle: 'legs', count: 2 }, { muscle: 'chest', count: 1 }, { muscle: 'back', count: 1 }] },
      { name: 'Full Body B', muscles: [{ muscle: 'shoulders', count: 1 }, { muscle: 'biceps', count: 1 }, { muscle: 'triceps', count: 1 }, { muscle: 'core', count: 1 }] },
      { name: 'Full Body C', muscles: [{ muscle: 'legs', count: 1 }, { muscle: 'chest', count: 1 }, { muscle: 'back', count: 2 }] },
    ];
  }
  
  for (let week = 1; week <= 4; week++) {
    const dailyWorkouts = Array.from({ length: preferences.daysPerWeek }, (_, i) => {
      const template = split[i % split.length];
      return generateDailyWorkout(i + 1, template.name, template.muscles, preferences, week);
    });

    weeklyPlans.push({
      week: week,
      workouts: dailyWorkouts,
    });
  }

  return {
    user: preferences,
    plan: weeklyPlans,
  };
};
