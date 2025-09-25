
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { WorkoutLog } from '../types/workoutLog';
import ProgressChart from '../components/ProgressChart';
import styles from './WorkoutHistory.module.css';

const WorkoutHistory = () => {
  const [user] = useAuthState(auth);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutLogs = async () => {
      if (user) {
        const logsQuery = query(
          collection(db, `users/${user.uid}/workoutlogs`),
          orderBy('dateCompleted', 'desc')
        );
        const querySnapshot = await getDocs(logsQuery);
        const logs = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            dateCompleted: data.dateCompleted.toDate(),
          } as WorkoutLog;
        });
        setWorkoutLogs(logs);
        setLoading(false);
      }
    };

    fetchWorkoutLogs();
  }, [user]);

  if (loading) {
    return <div className={styles.loading}>Loading workout history...</div>;
  }

  return (
    <div className={styles.historyContainer}>
      <h1>Workout History</h1>
      
      {selectedExercise && (
        <div className={styles.chartOverlay}>
            <div className={styles.chartContainer}>
                <ProgressChart exerciseName={selectedExercise} workoutLogs={workoutLogs} />
                <button onClick={() => setSelectedExercise(null)} className={styles.closeChartBtn}>
                    Cerrar Gráfico
                </button>
            </div>
        </div>
      )}

      {workoutLogs.length === 0 ? (
        <p>No workout history found.</p>
      ) : (
        <div className={styles.logsContainer}>
          {workoutLogs.map((log, index) => (
            <div key={index} className={styles.logCard}>
              <h2>{log.workoutName}</h2>
              <p>{log.dateCompleted.toLocaleDateString()}</p>
              <div className={styles.exercisesContainer}>
                {log.completedExercises.map((exercise, i) => (
                  <div key={i} className={styles.exercise}>
                    <div className={styles.exerciseHeader}>
                        <h3>{exercise.exerciseName}</h3>
                        <button onClick={() => setSelectedExercise(exercise.exerciseName)} className={styles.viewProgressBtn}>
                            Ver Progreso
                        </button>
                    </div>
                    <ul>
                      {exercise.sets.map((set, j) => (
                        <li key={j}>
                          Set {j + 1}: {set.reps} reps @ {set.weight} kg
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
