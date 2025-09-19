import { useNavigate } from 'react-router-dom';
import { Workout } from '../types';
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
      <h2 className="wotd-title">Workout of the Day</h2>
      <div className="wotd-card">
        <h3 className="workout-title">{workout.title}</h3>
        <p className="workout-description">{workout.description}</p>
        <ul className="exercise-list">
          {workout.exercises.map((exercise, index) => (
            <li key={index} className="exercise-item">
              <span className="exercise-name">{exercise.name}</span>
              <span className="exercise-sets-reps">{exercise.sets} sets of {exercise.reps} reps</span>
            </li>
          ))}
        </ul>
        <button onClick={handleStartWorkout} className="start-workout-btn">
          Start Workout
        </button>
      </div>
    </div>
  );
};

export default WorkoutOfTheDay;
