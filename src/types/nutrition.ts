import { MacronutrientProfile } from './macros';

export type DietaryPreference = 'vegetarian' | 'vegan' | 'gluten_free' | 'dairy_free';

export interface UserProfile {
  age: number;
  gender: 'male' | 'female';
  height: number; // in cm
  weight: number; // in kg
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
  goal: 'lose_weight' | 'maintain_weight' | 'gain_muscle';
  dietaryPreferences?: DietaryPreference[];
}

export interface Meal {
  id: string; // Unique ID for each meal
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  tags: DietaryPreference[];
}

export interface MealPlan {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
  totalMacros: MacronutrientProfile;
}

export interface HydrationPlan {
  dailyIntake: number; // in liters
  preWorkout: number; // in ml
  intraWorkout: number; // in ml
  postWorkout: number; // in ml
}

export interface FoodLog {
  date: string; // YYYY-MM-DD
  consumedMeals: Meal[];
  totalMacrosConsumed: MacronutrientProfile;
}
