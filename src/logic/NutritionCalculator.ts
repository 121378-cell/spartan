
import { UserProfile } from '../types/nutrition';
import { MacronutrientProfile } from '../types/macros';

// Harris-Benedict Equation for Basal Metabolic Rate (BMR)
const calculateBMR = (profile: UserProfile): number => {
  const { gender, weight, height, age } = profile;
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

// Total Daily Energy Expenditure (TDEE)
const calculateTDEE = (bmr: number, activityLevel: UserProfile['activityLevel']): number => {
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  };
  return bmr * activityMultipliers[activityLevel];
};

// Macronutrient calculation based on goal
export const calculateMacronutrients = (profile: UserProfile): MacronutrientProfile => {
  const bmr = calculateBMR(profile);
  const tdee = calculateTDEE(bmr, profile.activityLevel);

  let targetCalories = tdee;

  switch (profile.goal) {
    case 'lose_weight':
      targetCalories -= 500; // Caloric deficit for weight loss
      break;
    case 'gain_muscle':
      targetCalories += 500; // Caloric surplus for muscle gain
      break;
    case 'maintain_weight':
    default:
      break;
  }

  // Macronutrient ratios (can be adjusted)
  const proteinRatio = 0.3; // 30% of calories from protein
  const carbRatio = 0.4;    // 40% of calories from carbs
  const fatRatio = 0.3;     // 30% of calories from fat

  const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
  const carbGrams = Math.round((targetCalories * carbRatio) / 4);
  const fatGrams = Math.round((targetCalories * fatRatio) / 9);

  return {
    calories: Math.round(targetCalories),
    protein: proteinGrams,
    carbohydrates: carbGrams,
    fat: fatGrams,
  };
};
