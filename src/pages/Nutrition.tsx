
import React, { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserProfile, MealPlan as MealPlanType, Meal, FoodLog } from '../types/nutrition';
import { MacronutrientProfile } from '../types/macros';
import { calculateMacronutrients } from '../logic/NutritionCalculator';
import MealPlanComponent from '../components/MealPlan';
import UserProfileForm from '../components/UserProfileForm';
import './Nutrition.css';

// Expanded meal database with unique IDs and tags
const mockMealDatabase: { [key: string]: Meal[] } = {
  breakfast: [
    { id: 'b1', name: 'Scrambled Eggs with Spinach', description: '3 large eggs, 1 cup spinach, 1/4 cup feta cheese.', calories: 350, protein: 25, carbohydrates: 5, fat: 25, tags: ['gluten_free'] },
    { id: 'b2', name: 'Oatmeal with Berries', description: '1 cup cooked oatmeal, 1/2 cup mixed berries, 1 tbsp honey.', calories: 300, protein: 10, carbohydrates: 60, fat: 5, tags: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free'] },
    { id: 'b3', name: 'Tofu Scramble', description: '150g tofu, bell peppers, onions, turmeric.', calories: 320, protein: 20, carbohydrates: 15, fat: 20, tags: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free'] },
  ],
  lunch: [
    { id: 'l1', name: 'Grilled Chicken Salad', description: '150g grilled chicken, mixed greens, cherry tomatoes, cucumber, light vinaigrette.', calories: 450, protein: 40, carbohydrates: 15, fat: 25, tags: ['gluten_free', 'dairy_free'] },
    { id: 'l2', name: 'Quinoa Bowl with Black Beans', description: '1 cup quinoa, 1/2 cup black beans, 1/2 avocado, salsa.', calories: 400, protein: 15, carbohydrates: 70, fat: 10, tags: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free'] },
    { id: 'l3', name: 'Lentil Soup', description: '1 cup lentils, vegetable broth, carrots, celery.', calories: 380, protein: 18, carbohydrates: 60, fat: 5, tags: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free'] },
  ],
  dinner: [
    { id: 'd1', name: 'Salmon with Roasted Vegetables', description: '150g salmon, 1 cup roasted broccoli and carrots.', calories: 500, protein: 40, carbohydrates: 20, fat: 30, tags: ['gluten_free', 'dairy_free'] },
    { id: 'd2', name: 'Lean Beef Stir-fry', description: '150g lean beef, mixed vegetables, soy sauce.', calories: 450, protein: 35, carbohydrates: 25, fat: 20, tags: ['dairy_free'] },
    { id: 'd3', name: 'Black Bean Burgers', description: '2 black bean patties on whole wheat buns with lettuce and tomato.', calories: 480, protein: 22, carbohydrates: 80, fat: 10, tags: ['vegetarian', 'vegan'] },
  ],
  snacks: [
    { id: 's1', name: 'Greek Yogurt with Almonds', description: '1 cup Greek yogurt, 1/4 cup almonds.', calories: 250, protein: 20, carbohydrates: 10, fat: 15, tags: ['gluten_free', 'vegetarian'] },
    { id: 's2', name: 'Protein Shake', description: '1 scoop whey protein, 250ml milk.', calories: 200, protein: 25, carbohydrates: 10, fat: 5, tags: ['gluten_free', 'vegetarian'] },
    { id: 's3', name: 'Apple with Peanut Butter', description: '1 medium apple, 2 tbsp peanut butter.', calories: 280, protein: 8, carbohydrates: 30, fat: 16, tags: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free'] },
  ],
};

const getTodaysDateString = () => new Date().toISOString().split('T')[0];

const initialMacros: MacronutrientProfile = { calories: 0, protein: 0, carbohydrates: 0, fat: 0 };

const NutritionPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlanType | null>(null);
  const [foodLog, setFoodLog] = useState<FoodLog>({ date: getTodaysDateString(), consumedMeals: [], totalMacrosConsumed: initialMacros });
  const [loading, setLoading] = useState(true);

  const generateFilteredMealPlan = useCallback((profile: UserProfile): MealPlanType => {
    const macros = calculateMacronutrients(profile);
    const preferences = profile.dietaryPreferences || [];

    const filterMeals = (meals: Meal[]) => meals.filter(meal => preferences.every(pref => meal.tags.includes(pref)));

    const breakfastOptions = filterMeals(mockMealDatabase.breakfast);
    const lunchOptions = filterMeals(mockMealDatabase.lunch);
    const dinnerOptions = filterMeals(mockMealDatabase.dinner);
    const snackOptions = filterMeals(mockMealDatabase.snacks);

    return {
      breakfast: [breakfastOptions[0] || mockMealDatabase.breakfast[0]],
      lunch: [lunchOptions[0] || mockMealDatabase.lunch[0]],
      dinner: [dinnerOptions[0] || mockMealDatabase.dinner[0]],
      snacks: [snackOptions[0] || mockMealDatabase.snacks[0], snackOptions[1] || mockMealDatabase.snacks[1]].filter(Boolean),
      totalMacros: macros,
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const profile = userDocSnap.data() as UserProfile;
          setUserProfile(profile);
          const plan = generateFilteredMealPlan(profile);
          setMealPlan(plan);

          const foodLogRef = doc(db, `users/${user.uid}/foodlogs`, getTodaysDateString());
          const foodLogSnap = await getDoc(foodLogRef);
          if (foodLogSnap.exists()) {
            setFoodLog(foodLogSnap.data() as FoodLog);
          }
        }
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user, generateFilteredMealPlan]);

  const handleProfileSubmit = async (profile: UserProfile) => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, profile, { merge: true });
      setUserProfile(profile);
      const plan = generateFilteredMealPlan(profile);
      setMealPlan(plan);
    }
  };

  const handleSwapMeal = (category: keyof Omit<MealPlanType, 'totalMacros'>, mealToSwap: Meal) => {
    if (!userProfile || !mealPlan) return;

    const preferences = userProfile.dietaryPreferences || [];
    const potentialReplacements = mockMealDatabase[category].filter(meal =>
      meal.id !== mealToSwap.id &&
      preferences.every(pref => meal.tags.includes(pref))
    );

    if (potentialReplacements.length > 0) {
      const newMeal = potentialReplacements[Math.floor(Math.random() * potentialReplacements.length)];
      const newMealCategory = mealPlan[category].map(meal => meal.id === mealToSwap.id ? newMeal : meal);
      setMealPlan({ ...mealPlan, [category]: newMealCategory });
    } else {
      alert("No suitable replacements found for this meal.");
    }
  };

  const handleToggleMealConsumed = async (meal: Meal, isConsumed: boolean) => {
    const newConsumedMeals = isConsumed
      ? [...foodLog.consumedMeals, meal]
      : foodLog.consumedMeals.filter(m => m.id !== meal.id);

    const newTotalMacrosConsumed = newConsumedMeals.reduce((acc, curr) => ({
      calories: acc.calories + curr.calories,
      protein: acc.protein + curr.protein,
      carbohydrates: acc.carbohydrates + curr.carbohydrates,
      fat: acc.fat + curr.fat,
    }), initialMacros);

    const newFoodLog: FoodLog = { ...foodLog, consumedMeals: newConsumedMeals, totalMacrosConsumed: newTotalMacrosConsumed };
    setFoodLog(newFoodLog);

    if (user) {
      const foodLogRef = doc(db, `users/${user.uid}/foodlogs`, getTodaysDateString());
      await setDoc(foodLogRef, newFoodLog);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="nutrition-page">
      <h1>Your Nutrition Plan</h1>
      {userProfile ? (
        <>
          <MealPlanComponent
            plan={mealPlan}
            consumedMeals={foodLog.consumedMeals}
            totalMacrosConsumed={foodLog.totalMacrosConsumed}
            onSwapMeal={handleSwapMeal}
            onToggleMealConsumed={handleToggleMealConsumed}
          />
        </>
      ) : (
        <UserProfileForm onSubmit={handleProfileSubmit} />
      )}
    </div>
  );
};

export default NutritionPage;
