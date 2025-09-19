
import { useParams, useNavigate } from 'react-router-dom';
import { workouts } from '../data/workouts';
import { useWorkout } from '../hooks/useWorkout';
import styles from './WorkoutScreen.module.css';

const WorkoutScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workout = workouts.find(w => w.id === id);

  const {
    currentExercise,
    currentExerciseIndex,
    currentSet,
    isResting,
    restTime,
    totalExercises,
    handleNext,
  } = useWorkout(workout || null);

  if (!workout || !currentExercise) {
    return <div>Workout not found!</div>;
  }

  const progress = ((currentExerciseIndex) / totalExercises) * 100;

  return (
    <div className={styles.workoutScreenContainer}>
      {isResting ? (
        <div className={styles.restTimerOverlay}>
          <h1>REST</h1>
          <div className={styles.timerDisplay}>{restTime}s</div>
        </div>
      ) : (
        <>
          <div className={styles.workoutScreenHeader}>
            <h1>{workout.title}</h1>
            <button onClick={() => navigate('/dashboard')} className={`${styles.finishWorkoutBtn} ${styles.early}`}>Finish Early</button>
          </div>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>

          <div className={styles.exerciseCard}>
            <h2 className={styles.exerciseName}>{currentExercise.name}</h2>
            <div className={styles.setsRepsDisplay}>
              <div className={styles.displayItem}>
                <span className={styles.displayLabel}>Set</span>
                <span className={styles.displayValue}>{currentSet} / {currentExercise.sets}</span>
              </div>
              <div className={styles.displayItem}>
                <span className={styles.displayLabel}>Reps</span>
                <span className={styles.displayValue}>{currentExercise.reps}</span>
              </div>
            </div>
            <button onClick={handleNext} className={styles.nextSetBtn}>
              Mark Set as Completed
            </button>
          </div>
          
          <div className={styles.progressIndicator}>
            <p>Exercise {currentExerciseIndex + 1} of {totalExercises}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkoutScreen;
