
# Spartan AI Trainer - Blueprint

## 1. Visión General

Spartan es una aplicación web de fitness impulsada por IA, diseñada para ser un entrenador personal virtual. Proporciona a los usuarios entrenamientos personalizados, seguimiento del progreso en tiempo real y análisis de datos para optimizar su rendimiento. La aplicación está construida con React, Vite, TypeScript y Firebase, con un enfoque en un diseño moderno, motivador y fácil de usar.

## 2. Características Implementadas

Esta sección documenta las características que se han completado y están actualmente funcionales en la aplicación.

### 2.1. Arquitectura y Estilo del Proyecto
- **Framework:** React con Vite y TypeScript.
- **Enrutamiento:** `react-router-dom` para la navegación entre páginas.
- **Estilo Global:** Se ha establecido una paleta de colores y tipografía consistente en `src/index.css` para reflejar la marca "Spartan".
- **Estructura de Archivos:** Organización clara con componentes reutilizables y páginas dedicadas.

### 2.2. Flujo de Autenticación de Usuarios
- **Páginas de Autenticación:** Formularios de registro e inicio de sesión seguros y estilizados que utilizan Firebase Authentication.
- **Rutas Protegidas:** Componente `ProtectedRoute` que asegura que solo los usuarios autenticados puedan acceder a ciertas páginas como el Dashboard.
- **Integración con Firebase:** Configuración completa en `src/firebase.ts`.

### 2.3. Panel de Control del Usuario (Dashboard)
- **Estructura Dinámica:** El Dashboard da la bienvenida al usuario y muestra un "Entrenamiento del Día" seleccionado de una biblioteca de entrenamientos.
- **Componente `WorkoutOfTheDay`:** Un componente dinámico que muestra los detalles de un entrenamiento y permite al usuario iniciarlo.
- **Navegación:** Funcionalidad completa de inicio y cierre de sesión.

### 2.4. Pantalla de Entrenamiento Interactiva
- **Ruta Dinámica:** La ruta `/workout/:id` carga la pantalla de entrenamiento correcta según el entrenamiento seleccionado.
- **Gestión de Estado:** La pantalla gestiona el estado del ejercicio y la serie actual, guiando al usuario a través del entrenamiento.
- **Navegación Funcional:** El botón "Start Workout" navega correctamente a la pantalla de entrenamiento activa.
- **Temporizador de Descanso:** Un temporizador de descanso superpuesto se activa automáticamente después de completar una serie para guiar al usuario.
- **Barra de Progreso:** Una barra de progreso visual que muestra el avance del usuario a través de los ejercicios del entrenamiento.

## 3. Plan de Desarrollo Actual

Esta sección describe el plan para la siguiente fase de desarrollo.

### 3.1. Resumen y Registro de Entrenamientos
- **Objetivo:** Proporcionar al usuario un resumen de su rendimiento después de cada entrenamiento y guardar un registro histórico para el seguimiento del progreso.
- **Pasos:**
    1. **Crear la Pantalla de Resumen:**
        - Añadir una nueva ruta `/workout-summary`.
        - Crear un nuevo componente `src/pages/WorkoutSummary.tsx`.
        - Al finalizar un entrenamiento en `WorkoutScreen.tsx`, redirigir al usuario a esta nueva página, pasando los datos del rendimiento.
    2. **Guardar en Firestore:**
        - Al llegar a la pantalla de resumen, se activará una función para guardar un documento en una nueva colección `workoutLogs` en Firestore.
        - El documento contendrá `userId`, `workoutId`, `dateCompleted`, y otras métricas relevantes.
    3. **Actualizar Reglas de Firestore:**
        - Modificar las reglas de seguridad de Firestore para permitir que los usuarios autenticados escriban en su propia sección de `workoutLogs`.
    4. **Mostrar Historial en el Dashboard:**
        - Actualizar el `Dashboard.tsx` para que consulte los últimos entrenamientos completados por el usuario desde `workoutLogs`.
        - Diseñar y añadir una nueva sección en el Dashboard para mostrar esta lista, proporcionando un acceso rápido a su historial.

