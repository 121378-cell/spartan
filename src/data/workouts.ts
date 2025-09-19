import type { Workout } from '../types/workout';

export const workouts: Workout[] = [
  {
    id: 'w001',
    title: 'Forja de Hefesto',
    description: 'Un entrenamiento fundamental del tren superior para construir fuerza y masa en el pecho, hombros y tríceps.',
    focus: 'Upper Body',
    exercises: [
      { name: 'Press de Banca con Barra', sets: 4, reps: 8 },
      { name: 'Press Militar', sets: 3, reps: 10 },
      { name: 'Press Inclinado con Mancuernas', sets: 3, reps: 12 },
      { name: 'Fondos de Tríceps', sets: 4, reps: 'al fallo' },
      { name: 'Elevaciones Laterales', sets: 3, reps: 15 },
    ],
  },
  {
    id: 'w002',
    title: 'Piernas de Atlas',
    description: 'Una sesión agotadora de tren inferior para construir piernas poderosas y resistentes.',
    focus: 'Lower Body',
    exercises: [
      { name: 'Sentadillas con Barra', sets: 4, reps: 8 },
      { name: 'Peso Muerto Rumano', sets: 3, reps: 10 },
      { name: 'Prensa de Piernas', sets: 3, reps: 12 },
      { name: 'Zancadas Caminando', sets: 3, reps: '20 pasos' },
      { name: 'Elevaciones de Gemelo', sets: 4, reps: 20 },
    ],
  },
  {
    id: 'w003',
    title: 'Trueno de Zeus',
    description: 'Un circuito de cuerpo completo para desafiar tu sistema cardiovascular y construir fuerza funcional general.',
    focus: 'Full Body',
    exercises: [
      { name: 'Peso Muerto', sets: 5, reps: 5 },
      { name: 'Dominadas', sets: 4, reps: 'al fallo' },
      { name: 'Balanceo de Kettlebell', sets: 4, reps: 15 },
      { name: 'Sentadilla Goblet', sets: 3, reps: 12 },
      { name: 'Plancha', sets: 3, reps: '60s' },
    ],
  },
  {
    id: 'w004',
    title: 'Núcleo de los Dioses',
    description: 'Un entrenamiento específico para esculpir un núcleo fuerte y estable.',
    focus: 'Core',
    exercises: [
      { name: 'Elevaciones de Piernas Colgado', sets: 3, reps: 15 },
      { name: 'Giros Rusos', sets: 3, reps: 20 },
      { name: 'Encogimientos en Polea', sets: 4, reps: 12 },
      { name: 'Variaciones de Plancha', sets: 3, reps: '45s cada una' },
      { name: 'Ab Rollouts', sets: 3, reps: 'al fallo' },
    ],
  },
];
