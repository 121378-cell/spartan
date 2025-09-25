
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './WorkoutScreen.module.css';
import type { DailyWorkout, WorkoutExercise } from '../types/fitness';
import { CompletedExercise, WorkoutLog } from '../types/workoutLog';
import { getCurrentChallenge, updateUserChallengeProgress } from '../services/challengeService'; // Import challenge functions

const WorkoutScreen = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { workout } = (location.state as { workout: DailyWorkout }) || {};

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  
  const [repsInput, setRepsInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  
  const [completedWorkoutData, setCompletedWorkoutData] = useState<CompletedExercise[]>([]);
  
  useEffect(() => {
    if (workout) {
      const currentExercise = workout.exercises[currentExerciseIndex];
      const targetReps = currentExercise.sets[currentSet - 1].reps;
      setRepsInput(String(targetReps));
      setWeightInput('');
    }
  }, [currentExerciseIndex, currentSet, workout]);

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

  const finishWorkout = async (finalWorkoutData: CompletedExercise[]) => {
    if (user) {
      const workoutLog: WorkoutLog = {
        userId: user.uid,
        dateCompleted: new Date(),
        workoutName: workout.name,
        completedExercises: finalWorkoutData,
      };
      try {
        // Save workout log
        await addDoc(collection(db, `users/${user.uid}/workoutlogs`), workoutLog);

        // Create activity feed event
        await addDoc(collection(db, 'activity_feed'), {
          userId: user.uid,
          userName: user.displayName,
          userPhotoURL: user.photoURL,
          type: 'workout',
          timestamp: serverTimestamp(),
          data: {
            workoutName: workout.name,
          },
        });

        // Update leaderboard
        const leaderboardRef = doc(db, 'leaderboard', user.uid);
        const leaderboardSnap = await getDoc(leaderboardRef);
        if (leaderboardSnap.exists()) {
          await setDoc(leaderboardRef, { workoutsCompleted: increment(1) }, { merge: true });
        } else {
          await setDoc(leaderboardRef, {
            userName: user.displayName,
            userPhotoURL: user.photoURL,
            workoutsCompleted: 1,
          });
        }

        // Update challenge progress
        const currentChallenge = await getCurrentChallenge();
        if (currentChallenge) {
          await updateUserChallengeProgress(user.uid, currentChallenge.id);
        }

      } catch (error) {
        console.error("Error saving workout log or activity: ", error);
      }
    }
    navigate('/workout-summary', { state: { workout, completedWorkoutData: finalWorkoutData } });
  };

  const handleNext = () => {
    const reps = parseInt(repsInput, 10);
    const weight = parseInt(weightInput, 10) || 0;

    if (isNaN(reps)) {
      alert("Please enter a valid number for reps.");
      return;
    }

    const currentExerciseName = currentExercise.definition.name;
    let updatedWorkoutData = [...completedWorkoutData];
    const exerciseData = updatedWorkoutData.find(e => e.exerciseName === currentExerciseName);

    if (exerciseData) {
      updatedWorkoutData = updatedWorkoutData.map(e =>
        e.exerciseName === currentExerciseName
          ? { ...e, sets: [...e.sets, { reps, weight }] }
          : e
      );
    } else {
      updatedWorkoutData.push({ exerciseName: currentExerciseName, sets: [{ reps, weight }] });
    }
    setCompletedWorkoutData(updatedWorkoutData);

    if (currentExerciseIndex === totalExercises - 1 && currentSet === currentExercise.sets.length) {
      finishWorkout(updatedWorkoutData);
      return;
    }

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
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSet(1);
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
                <span className={styles.displayLabel}>Reps Objetivo</span>
                <span className={styles.displayValue}>{currentExercise.sets[currentSet - 1].reps}</span>
              </div>
            </div>
            
            <div className={styles.inputFields}>
                <div className={styles.inputGroup}>
                    <label htmlFor="reps">Reps Completadas</label>
                    <input
                        id="reps"
                        type="number"
                        value={repsInput}
                        onChange={(e) => setRepsInput(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="weight">Peso (kg)</label>
                    <input
                        id="weight"
                        type="number"
                        value={weightInput}
                        onChange={(e) => setWeightInput(e.target.value)}
                        placeholder="Opcional"
                        className={styles.input}
                    />
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
