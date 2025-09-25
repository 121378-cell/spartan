
# Spartan AI Trainer - Blueprint

## 1. Visión General

Spartan es una aplicación web de fitness impulsada por IA, diseñada para ser un entrenador personal virtual. Proporciona a los usuarios entrenamientos personalizados, seguimiento del progreso en tiempo real y análisis de datos para optimizar su rendimiento. La aplicación está construida con React, Vite, TypeScript y Firebase, con un enfoque en un diseño moderno, motivador y fácil de usar.

## 2. Características Implementadas

Esta sección documenta las características que se han completado y están actualmente funcionales en la aplicación.

### 2.1. Autenticación de Usuarios
- **Registro y Creación de Cuentas:** Los nuevos usuarios pueden registrarse utilizando su correo electrónico y contraseña.
- **Inicio de Sesión Seguro:** Los usuarios existentes pueden iniciar sesión de forma segura para acceder a sus datos.
- **Gestión de Sesión:** La aplicación gestiona la sesión del usuario, manteniendo al usuario conectado hasta que cierre la sesión.

### 2.2. Selección de Metas y Nivel de Fitness
- **Planes Personalizados:** Al registrarse, los usuarios pueden seleccionar sus metas de fitness (pérdida de grasa, ganancia muscular, etc.) y su nivel de experiencia.
- **Entrenamientos Adaptados:** El sistema utiliza esta información para generar un plan de entrenamiento inicial adaptado al usuario.

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

### 2.5. Módulo de Nutrición (Fase 4 - Intercambio de Comidas)
- **Integración con Firestore:** El módulo lee y escribe los perfiles nutricionales de los usuarios.
- **Planes Personalizados:** La generación de planes de comida filtra las comidas basándose en las preferencias dietéticas del usuario.
- **Intercambio de Comidas:** Los usuarios pueden intercambiar comidas individuales en su plan para mayor flexibilidad.

### 2.6. Registro de Ingesta de Alimentos (Food Logging)
- **Modelo de Datos:** Se ha definido una estructura de datos, `FoodLog`, para almacenar las comidas consumidas en una fecha específica.
- **Interfaz de Usuario:** Se han añadido casillas de verificación a cada comida en el componente `MealPlan` para que los usuarios puedan marcar las comidas como consumidas.
- **Integración con Firestore:** Los registros de ingesta se guardan en una nueva subcolección en Firestore, `/users/{userId}/foodlogs`.
- **Seguimiento del Progreso:** Se muestra un resumen de las calorías y macronutrientes consumidos en el día, comparándolos con los objetivos del plan.

### 2.7. Registro de Entrenamientos e Historial
- **Modelo de Datos Detallado:** Se ha definido un modelo de datos, `WorkoutLog`, que captura los detalles de cada entrenamiento completado, incluyendo ejercicios, series, repeticiones y peso.
- **Registro en `WorkoutScreen`:** La pantalla de entrenamiento ahora permite a los usuarios introducir las repeticiones y el peso de cada serie.
- **Almacenamiento en Firestore:** Al finalizar un entrenamiento, los datos se guardan en una subcolección `/users/{userId}/workoutlogs`.
- **Página de Historial de Entrenamientos:** Se ha creado una nueva página, `WorkoutHistory`, que muestra una lista de todos los entrenamientos completados por el usuario, ordenados por fecha.
- **Navegación:** Se ha añadido un enlace a la página de historial en el panel de control del usuario.

### 2.8. Visualización del Progreso
- **Gráficos de Progreso:** Se ha integrado `react-chartjs-2` para visualizar el progreso del usuario.
- **Componente `ProgressChart`:** Un componente reutilizable que renderiza un gráfico de líneas mostrando el peso máximo levantado para un ejercicio específico a lo largo del tiempo.
- **Integración en `WorkoutHistory`:** En la página de historial, cada ejercicio tiene un botón "Ver Progreso" que muestra el gráfico de progreso correspondiente.

### 2.9. Gamificación y Logros
- **Sistema de Puntos y Logros:** Se ha implementado un sistema de logros para recompensar a los usuarios por su consistencia y esfuerzo.
- **Definición de Logros:** Se han definido logros basados en el número de entrenamientos completados.
- **Hook `useAchievements`:** Un hook personalizado que gestiona la lógica de desbloqueo y persistencia de logros.
- **Página de Logros:** Una nueva página que muestra todos los logros disponibles y el estado de desbloqueo del usuario.

### 2.10. Social y Comunidad
- **Perfiles de Usuario:** Los perfiles de usuario muestran información básica, logros y una lista de amigos.
- **Sistema de Amigos:**
    - **Solicitudes de Amistad:** Los usuarios pueden enviar solicitudes de amistad a otros usuarios desde sus perfiles.
    - **Gestión de Solicitudes:** Los usuarios pueden ver las solicitudes de amistad pendientes en su panel de control (Dashboard) y aceptarlas o rechazarlas.
    - **Lista de Amigos:** Una vez que se acepta una solicitud, los usuarios aparecen en las listas de amigos de cada uno.
- **Búsqueda de Usuarios:**
    - **Barra de Búsqueda:** Se ha añadido una barra de búsqueda en el Dashboard que permite a los usuarios buscar a otros "Espartanos" por su nombre de usuario (`displayName`).
    - **Resultados de Búsqueda:** Los resultados se muestran dinámicamente, y al hacer clic en un usuario, se navega a su perfil.
- **Feed de Actividad:**
    - **Componente `ActivityFeed`:** Un nuevo componente en el Dashboard que muestra la actividad reciente de los amigos del usuario.
    - **Generación de Eventos:** Se crea un evento en la colección `activity_feed` de Firestore cuando un usuario completa un entrenamiento o desbloquea un logro.
    - **Visualización:** El feed muestra quién realizó la acción, qué hizo y cuándo, manteniendo a los usuarios conectados con el progreso de sus amigos.
- **Clasificaciones (Leaderboard):**
    - **Componente `Leaderboard`:** Se ha creado un componente que muestra a los 10 mejores usuarios en una tabla de clasificación, ordenados por el número de entrenamientos completados.
    - **Página de Clasificación:** Una nueva página en `/leaderboard` que muestra la tabla de clasificación.
    - **Actualización de Puntuación:** Al completar un entrenamiento, la `WorkoutScreen` ahora actualiza la puntuación del usuario en la colección `leaderboard` de Firestore.
    - **Navegación:** Se ha añadido un enlace a la página de clasificación en la barra de navegación principal.
- **Retos Comunitarios (Community Challenges):**
    - **Estructura de Datos:** Se han definido modelos de datos para los retos (`Challenge`) y el progreso de los usuarios en ellos (`UserChallengeProgress`).
    - **Servicio de Retos:** Se ha creado un `challengeService` para gestionar la lógica de los retos en Firestore, incluyendo la obtención del reto activo y la actualización del progreso del usuario.
    - **Componente de Reto:** Un componente en el Dashboard que muestra el reto activo, junto con la descripción y una barra de progreso visual del usuario.
    - **Actualización de Progreso:** Al completar un entrenamiento, se actualiza automáticamente el progreso del usuario en el reto activo.
- **Mensajería Directa (Chat):**
    - **Interfaz de Chat:** Se ha implementado una página de chat con una vista de dos paneles: una lista de conversaciones y una ventana de chat activa.
    - **Mensajería en Tiempo Real:** Utiliza Firestore para enviar y recibir mensajes en tiempo real entre amigos.
    - **Creación de Conversaciones:** Los usuarios pueden iniciar nuevas conversaciones desde el perfil de un amigo a través de un botón "Mensaje". El sistema crea una nueva conversación si no existe una.
    - **Navegación Integrada:** Se ha añadido un enlace "Mensajes" en la barra de navegación principal para un acceso rápido a la página de chat.
    - **Estructura de Datos:** Se han definido los modelos de datos `Conversation` y `Message` para gestionar la lógica del chat.

## 3. Plan de Desarrollo Actual

Con la implementación de la mensajería, las características sociales clave están completas. La siguiente fase se centrará en dar a los usuarios más control sobre su viaje de fitness.

### 3.1. Próximas Características: Personalización de Entrenamientos
- **Creador de Entrenamientos:** Desarrollar una interfaz donde los usuarios puedan crear sus propios entrenamientos desde cero, seleccionando ejercicios, definiendo series, repeticiones y tiempos de descanso.
- **Editor de Planes:** Permitir a los usuarios modificar los planes de entrenamiento generados por la IA, intercambiando ejercicios o ajustando parámetros.
- **Guardar y Compartir:** Los usuarios podrán guardar sus entrenamientos personalizados y, opcionalmente, compartirlos con sus amigos.

## 4. Consideraciones Futuras
- **Planes de Nutrición Avanzados:** Integración con APIs de alimentos para un seguimiento más detallado de la nutrición.
- **Integración con Dispositivos:** Sincronización con wearables para un seguimiento automático de la actividad.
