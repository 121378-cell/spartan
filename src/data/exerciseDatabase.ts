// src/data/exerciseDatabase.ts
import type { ExerciseDefinition } from '../types/fitness';

export const exerciseDatabase: ExerciseDefinition[] = [
  // --- Chest ---
  { id: 'ex001', name: 'Press de Banca con Barra', muscleGroup: 'chest', requiredEquipment: ['full_gym'], difficulty: 'intermediate', type: 'compound' },
  { id: 'ex002', name: 'Press con Mancuernas', muscleGroup: 'chest', requiredEquipment: ['full_gym', 'dumbbells'], difficulty: 'beginner', type: 'compound' },
  { id: 'ex003', name: 'Flexiones', muscleGroup: 'chest', requiredEquipment: ['bodyweight'], difficulty: 'beginner', type: 'compound' },
  { id: 'ex004', name: 'Aperturas con Mancuernas', muscleGroup: 'chest', requiredEquipment: ['full_gym', 'dumbbells'], difficulty: 'beginner', type: 'isolation' },

  // --- Back ---
  { id: 'ex005', name: 'Dominadas', muscleGroup: 'back', requiredEquipment: ['full_gym', 'bodyweight'], difficulty: 'intermediate', type: 'compound' },
  { id: 'ex006', name: 'Remo con Barra', muscleGroup: 'back', requiredEquipment: ['full_gym'], difficulty: 'intermediate', type: 'compound' },
  { id: 'ex007', name: 'Remo con Mancuerna', muscleGroup: 'back', requiredEquipment: ['full_gym', 'dumbbells'], difficulty: 'beginner', type: 'compound' },
  { id: 'ex008', name: 'Jalón al Pecho', muscleGroup: 'back', requiredEquipment: ['full_gym'], difficulty: 'beginner', type: 'compound' },

  // --- Legs ---
  { id: 'ex009', name: 'Sentadillas con Barra', muscleGroup: 'legs', requiredEquipment: ['full_gym'], difficulty: 'intermediate', type: 'compound' },
  { id: 'ex010', name: 'Peso Muerto', muscleGroup: 'legs', requiredEquipment: ['full_gym'], difficulty: 'advanced', type: 'compound' },
  { id: 'ex011', name: 'Zancadas con Mancuernas', muscleGroup: 'legs', requiredEquipment: ['dumbbells', 'bodyweight'], difficulty: 'beginner', type: 'compound' },
  { id: 'ex012', name: 'Prensa de Piernas', muscleGroup: 'legs', requiredEquipment: ['full_gym'], difficulty: 'beginner', type: 'compound' },
  { id: 'ex013', name: 'Sentadilla Goblet', muscleGroup: 'legs', requiredEquipment: ['dumbbells'], difficulty: 'beginner', type: 'compound' },

  // --- Shoulders ---
  { id: 'ex014', name: 'Press Militar con Barra', muscleGroup: 'shoulders', requiredEquipment: ['full_gym'], difficulty: 'intermediate', type: 'compound' },
  { id: 'ex015', name: 'Press Arnold', muscleGroup: 'shoulders', requiredEquipment: ['dumbbells'], difficulty: 'intermediate', type: 'compound' },
  { id: 'ex016', name: 'Elevaciones Laterales', muscleGroup: 'shoulders', requiredEquipment: ['dumbbells', 'bands'], difficulty: 'beginner', type: 'isolation' },

  // --- Biceps ---
  { id: 'ex017', name: 'Curl de Bíceps con Barra', muscleGroup: 'biceps', requiredEquipment: ['full_gym'], difficulty: 'beginner', type: 'isolation' },
  { id: 'ex018', name: 'Curl de Bíceps con Mancuernas', muscleGroup: 'biceps', requiredEquipment: ['dumbbells'], difficulty: 'beginner', type: 'isolation' },

  // --- Triceps ---
  { id: 'ex019', name: 'Fondos en Paralelas', muscleGroup: 'triceps', requiredEquipment: ['full_gym', 'bodyweight'], difficulty: 'intermediate', type: 'compound' },
  { id: 'ex020', name: 'Press Francés', muscleGroup: 'triceps', requiredEquipment: ['full_gym'], difficulty: 'intermediate', type: 'isolation' },
  
  // --- Core ---
  { id: 'ex021', name: 'Plancha', muscleGroup: 'core', requiredEquipment: ['bodyweight'], difficulty: 'beginner', type: 'isolation' },
  { id: 'ex022', name: 'Elevaciones de Piernas Colgado', muscleGroup: 'core', requiredEquipment: ['full_gym', 'bodyweight'], difficulty: 'intermediate', type: 'isolation' },
];
