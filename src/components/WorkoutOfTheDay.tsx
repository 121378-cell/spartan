import { useNavigate } from 'react-router-dom';
import type { Workout } from '../types/workout';
import './WorkoutOfTheDay.css';

interface Props {
  workout: Workout;
}

const WorkoutOfTheDay = ({ workout }: Props) => {
  const navigate = useNavigate();

  const handleStartWorkout = () => {
    navigate(`/workout/${workout.id}`);
  };

  return (
    <div className="wotd-container">
      <h2 className="wotd-title">Entrenamiento del Día</h2>
      <div className="wotd-card">
        <h3 className="workout-title">{workout.title}</h3>
        <p className="workout-description">{workout.description}</p>
        <ul className="exercise-list">
          {workout.exercises.map((exercise, index) => (
            <li key={index} className="exercise-item">
              <span className="exercise-name">{exercise.name}</span>
              <span className="exercise-sets-reps">{exercise.sets} series de {exercise.reps} reps</span>
            </li>
          ))}
        </ul>
        <button onClick={handleStartWorkout} className="start-workout-btn">
          Comenzar Entrenamiento
        </button>
      </div>
    </div>
  );
};

export default WorkoutOfTheDay;
