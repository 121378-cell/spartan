
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './WorkoutSummary.module.css';
import type { WorkoutLog } from '../types/workoutLog';
import type { Workout } from '../types/workout';

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
        <h1>No hay datos de entrenamiento disponibles.</h1>
        <button onClick={() => navigate('/dashboard')} className={styles.primaryBtn}>
          Volver al Panel
        </button>
      </div>
    );
  }

  return (
    <div className={styles.summaryContainer}>
      <h1 className={styles.title}>¡Entrenamiento Completado!</h1>
      <h2 className={styles.workoutTitle}>{workout.title}</h2>
      <p className={styles.description}>Has completado con éxito el entrenamiento de <strong>{workout.focus}</strong>. ¡Bien hecho, Espartano!</p>

      <div className={styles.statusMessage}>
        {isSaving && <p>Guardando tu entrenamiento...</p>}
        {saveSuccess === true && <p className={styles.success}>¡Entrenamiento guardado con éxito!</p>}
        {saveSuccess === false && <p className={styles.error}>Error al guardar el entrenamiento. Por favor, inténtalo de nuevo.</p>}
      </div>

      <div className={styles.exercisesList}>
        <h3>Ejercicios Completados:</h3>
        <ul>
          {workout.exercises.map((exercise, index) => (
            <li key={index}>{exercise.name} - {exercise.sets} series</li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate('/dashboard')} className={styles.primaryBtn}>
        Volver al Panel
      </button>
    </div>
  );
};

export default WorkoutSummary;
