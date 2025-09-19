// src/types/workoutLog.ts
// Eliminamos la extensión de Workout ya que la estructura ha cambiado.
// El log almacenará una copia de la información relevante del entrenamiento del día.

export interface WorkoutLog {
  userId: string;
  dateCompleted: Date;
  workoutName: string;
  // Podríamos añadir más detalles si fuera necesario, como los ejercicios completados.
}
