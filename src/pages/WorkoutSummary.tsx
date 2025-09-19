import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './WorkoutSummary.module.css';
import type { DailyWorkout } from '../types/fitness'; // Usamos la nueva definición

const WorkoutSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Aseguramos que el estado recibido es del tipo DailyWorkout
  const { workout } = (location.state as { workout: DailyWorkout }) || {};
  const [user] = useAuthState(auth);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const saveWorkoutLog = async () => {
      // La condición ahora se asegura de que el usuario exista y el entrenamiento no se haya guardado ya.
      if (user && workout && !isSaving && saveSuccess === null) {
        setIsSaving(true);
        try {
          // La ruta ahora apunta a la sub-colección correcta y segura del usuario.
          const logCollectionRef = collection(db, 'users', user.uid, 'workout_logs');

          // Creamos el objeto de registro con los datos relevantes.
          const workoutLog = {
            userId: user.uid,
            dateCompleted: Timestamp.now(),
            workoutName: workout.name,
            focus: workout.focus,
            completedExercises: workout.exercises.map(ex => ({
              exerciseId: ex.definition.id,
              exerciseName: ex.definition.name,
              sets: ex.sets,
            })),
          };

          await addDoc(logCollectionRef, workoutLog);
          setSaveSuccess(true);
        } catch (error) {
          console.error("Error al guardar el registro de entrenamiento: ", error);
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
      <h1 className={styles.title}>¡Misión Cumplida!</h1>
      <h2 className={styles.workoutTitle}>{workout.name}</h2>
      <p className={styles.description}>
        Has completado con éxito la misión de hoy. ¡Bien hecho, Espartano!
      </p>

      <div className={styles.statusMessage}>
        {isSaving && <p>Registrando hazaña...</p>}
        {saveSuccess === true && <p className={styles.success}>¡Hazaña registrada en tu historial!</p>}
        {saveSuccess === false && <p className={styles.error}>Error al registrar. Revisa tu conexión.</p>}
      </div>

      <div className={styles.exercisesList}>
        <h3>Ejercicios Completados:</h3>
        <ul>
          {workout.exercises.map((exercise, index) => (
            <li key={index}>
              {exercise.definition.name} - {exercise.sets.length} series
            </li>
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
