
import React from 'react';
import { Meal, MealPlan } from '../types/nutrition';
import { MacronutrientProfile } from '../types/macros';
import './MealPlan.css';

interface MealPlanProps {
  plan: MealPlan | null;
  consumedMeals: Meal[];
  totalMacrosConsumed: MacronutrientProfile;
  onSwapMeal: (category: keyof Omit<MealPlan, 'totalMacros'>, mealToSwap: Meal) => void;
  onToggleMealConsumed: (meal: Meal, isConsumed: boolean) => void;
}

const MealPlanComponent: React.FC<MealPlanProps> = ({ plan, consumedMeals, totalMacrosConsumed, onSwapMeal, onToggleMealConsumed }) => {
  if (!plan) {
    return <div>Loading meal plan...</div>;
  }

  const isMealConsumed = (meal: Meal) => {
    return consumedMeals.some(consumedMeal => consumedMeal.id === meal.id);
  };

  const renderMealCategory = (category: keyof Omit<MealPlan, 'totalMacros'>, title: string) => (
    <div className="meal-category">
      <h3>{title}</h3>
      {plan[category].map((meal, index) => (
        <div key={index} className={`meal-item ${isMealConsumed(meal) ? 'consumed' : ''}`}>
          <div className="meal-info">
            <h4>{meal.name}</h4>
            <p>{meal.description}</p>
          </div>
          <div className="meal-actions">
            <input
              type="checkbox"
              className="meal-checkbox"
              checked={isMealConsumed(meal)}
              onChange={(e) => onToggleMealConsumed(meal, e.target.checked)}
            />
            <button onClick={() => onSwapMeal(category, meal)} className="swap-meal-btn">
              Swap
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="meal-plan">
      <div className="macros-summary">
        <div className="macro-group">
            <span className="macro-label">Calorías</span>
            <span className="macro-value">{totalMacrosConsumed.calories} / {plan.totalMacros.calories}</span>
        </div>
        <div className="macro-group">
            <span className="macro-label">Proteína</span>
            <span className="macro-value">{totalMacrosConsumed.protein}g / {plan.totalMacros.protein}g</span>
        </div>
        <div className="macro-group">
            <span className="macro-label">Carbs</span>
            <span className="macro-value">{totalMacrosConsumed.carbohydrates}g / {plan.totalMacros.carbohydrates}g</span>
        </div>
        <div className="macro-group">
            <span className="macro-label">Grasa</span>
            <span className="macro-value">{totalMacrosConsumed.fat}g / {plan.totalMacros.fat}g</span>
        </div>
      </div>
      <div className="meals">
        {renderMealCategory('breakfast', 'Breakfast')}
        {renderMealCategory('lunch', 'Lunch')}
        {renderMealCategory('dinner', 'Dinner')}
        {renderMealCategory('snacks', 'Snacks')}
      </div>
    </div>
  );
};

export default MealPlanComponent;
