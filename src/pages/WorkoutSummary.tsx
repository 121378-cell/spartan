
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './WorkoutSummary.module.css';
import { WorkoutLog, Workout } from '../types';

const WorkoutSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workout } = (location.state as { workout: Workout }) || {};
  const [user] = useAuthState(auth);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const saveWorkoutLog = async () => {
      if (user && workout && !isSaving && saveSuccess === null) {
        setIsSaving(true);
        try {
          const workoutLog: Omit<WorkoutLog, 'id'> = {
            ...workout,
            userId: user.uid,
            dateCompleted: new Date(),
          };
          await addDoc(collection(db, 'workoutLogs'), workoutLog);
          setSaveSuccess(true);
        } catch (error) {
          console.error("Error saving workout log: ", error);
          setSaveSuccess(false);
        }
        setIsSaving(false);
      }
    };

    saveWorkoutLog();
  }, [user, workout, isSaving, saveSuccess]);

  if (!workout) {
    return (
      <div className={styles.summaryContainer}>
        <h1>No workout data available.</h1>
        <button onClick={() => navigate('/dashboard')} className={styles.primaryBtn}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className={styles.summaryContainer}>
      <h1 className={styles.title}>Workout Completed!</h1>
      <h2 className={styles.workoutTitle}>{workout.title}</h2>
      <p className={styles.description}>You have successfully completed the <strong>{workout.focus}</strong> workout. Well done, Spartan!</p>

      <div className={styles.statusMessage}>
        {isSaving && <p>Saving your workout...</p>}
        {saveSuccess === true && <p className={styles.success}>Workout saved successfully!</p>}
        {saveSuccess === false && <p className={styles.error}>Failed to save workout. Please try again.</p>}
      </div>

      <div className={styles.exercisesList}>
        <h3>Completed Exercises:</h3>
        <ul>
          {workout.exercises.map((exercise, index) => (
            <li key={index}>{exercise.name} - {exercise.sets} sets</li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate('/dashboard')} className={styles.primaryBtn}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default WorkoutSummary;
