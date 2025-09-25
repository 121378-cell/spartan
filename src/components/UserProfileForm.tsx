
import React, { useState } from 'react';
import { UserProfile, DietaryPreference } from '../types/nutrition';
import './UserProfileForm.css';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const dietaryOptions: { id: DietaryPreference; label: string }[] = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten_free', label: 'Gluten-Free' },
  { id: 'dairy_free', label: 'Dairy-Free' },
];

const UserProfileForm: React.FC<UserProfileFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserProfile>({
    age: 0,
    gender: 'male',
    height: 0,
    weight: 0,
    activityLevel: 'sedentary',
    goal: 'maintain_weight',
    dietaryPreferences: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' || name === 'height' || name === 'weight' ? Number(value) : value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const preferences = prev.dietaryPreferences ? [...prev.dietaryPreferences] : [];
      if (checked) {
        return { ...prev, dietaryPreferences: [...preferences, value as DietaryPreference] };
      } else {
        return { ...prev, dietaryPreferences: preferences.filter(p => p !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="user-profile-form-container">
      <h2>Create Your Nutrition Profile</h2>
      <p>Please provide some information to help us create your personalized nutrition plan.</p>
      <form onSubmit={handleSubmit} className="user-profile-form">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="activityLevel">Activity Level</label>
          <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
            <option value="sedentary">Sedentary</option>
            <option value="lightly_active">Lightly Active</option>
            <option value="moderately_active">Moderately Active</option>
            <option value="very_active">Very Active</option>
            <option value="extra_active">Extra Active</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="goal">Goal</label>
          <select id="goal" name="goal" value={formData.goal} onChange={handleChange}>
            <option value="lose_weight">Lose Weight</option>
            <option value="maintain_weight">Maintain Weight</option>
            <option value="gain_muscle">Gain Muscle</option>
          </select>
        </div>
        <div className="form-group-full">
          <label>Dietary Preferences</label>
          <div className="checkbox-group">
            {dietaryOptions.map(option => (
              <label key={option.id}>
                <input
                  type="checkbox"
                  value={option.id}
                  checked={formData.dietaryPreferences?.includes(option.id)}
                  onChange={handleCheckboxChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-btn">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
