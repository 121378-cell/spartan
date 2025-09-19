
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Workout, Exercise } from '../types';

export const useWorkout = (workout: Workout | null) => {
  const navigate = useNavigate();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);

  const currentExercise: Exercise | undefined = workout?.exercises[currentExerciseIndex];
  const totalExercises = workout?.exercises.length ?? 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResting && restTime > 0) {
      timer = setTimeout(() => setRestTime(restTime - 1), 1000);
    } else if (isResting && restTime === 0) {
      setIsResting(false);
      if (currentSet === currentExercise?.sets) {
        if (currentExerciseIndex < totalExercises - 1) {
          setCurrentExerciseIndex(currentExerciseIndex + 1);
          setCurrentSet(1);
        } else {
          navigate('/workout-summary', { state: { workout } });
        }
      } else {
        setCurrentSet(currentSet + 1);
      }
    }
    return () => clearTimeout(timer);
  }, [isResting, restTime, currentSet, currentExerciseIndex, totalExercises, currentExercise?.sets, navigate, workout]);

  const handleNext = () => {
    if (currentExercise) {
      setIsResting(true);
      setRestTime(currentExercise.rest);
    }
  };

  return {
    currentExercise,
    currentExerciseIndex,
    currentSet,
    isResting,
    restTime,
    totalExercises,
    handleNext,
  };
};
