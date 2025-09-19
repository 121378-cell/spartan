import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './WorkoutScreen.module.css';
import type { DailyWorkout, WorkoutExercise } from '../types/fitness';

const WorkoutScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workout } = (location.state as { workout: DailyWorkout }) || {};

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);

  if (!workout) {
    return (
      <div className={styles.workoutScreenContainer}>
        <h1>Error: No se ha proporcionado un entrenamiento.</h1>
        <button onClick={() => navigate('/dashboard')} className={styles.finishWorkoutBtn}>
          Volver al Panel
        </button>
      </div>
    );
  }

  const currentExercise: WorkoutExercise = workout.exercises[currentExerciseIndex];
  const totalExercises = workout.exercises.length;
  const progress = ((currentExerciseIndex) / totalExercises) * 100;

  const handleNext = () => {
    setIsResting(true);
    setRestTime(currentExercise.restPeriod);

    const timer = setInterval(() => {
      setRestTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsResting(false);
          
          if (currentSet < currentExercise.sets.length) {
            setCurrentSet(currentSet + 1);
          } else {
            if (currentExerciseIndex < totalExercises - 1) {
              setCurrentExerciseIndex(currentExerciseIndex + 1);
              setCurrentSet(1);
            } else {
              // Workout Finished!
              navigate('/workout-summary', { state: { workout } });
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className={styles.workoutScreenContainer}>
      {isResting ? (
        <div className={styles.restTimerOverlay}>
          <h1>DESCANSO</h1>
          <div className={styles.timerDisplay}>{restTime}s</div>
        </div>
      ) : (
        <>
          <div className={styles.workoutScreenHeader}>
            <h1>{workout.name}</h1>
            <button onClick={() => navigate('/dashboard', { replace: true })} className={`${styles.finishWorkoutBtn} ${styles.early}`}>Terminar Antes</button>
          </div>

          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>

          <div className={styles.exerciseCard}>
            <h2 className={styles.exerciseName}>{currentExercise.definition.name}</h2>
            <div className={styles.setsRepsDisplay}>
              <div className={styles.displayItem}>
                <span className={styles.displayLabel}>Serie</span>
                <span className={styles.displayValue}>{currentSet} / {currentExercise.sets.length}</span>
              </div>
              <div className={styles.displayItem}>
                <span className={styles.displayLabel}>Reps</span>
                <span className={styles.displayValue}>{currentExercise.sets[currentSet - 1].reps}</span>
              </div>
            </div>
            <button onClick={handleNext} className={styles.nextSetBtn}>
              Marcar Serie como Completada
            </button>
          </div>
          
          <div className={styles.progressIndicator}>
            <p>Ejercicio {currentExerciseIndex + 1} de {totalExercises}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkoutScreen;
