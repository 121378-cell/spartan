
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { WorkoutLog } from '../types/workoutLog';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ProgressChartProps {
  exerciseName: string;
  workoutLogs: WorkoutLog[];
}

const ProgressChart = ({ exerciseName, workoutLogs }: ProgressChartProps) => {
  const chartData = {
    labels: workoutLogs.map(log => log.dateCompleted.toLocaleDateString()),
    datasets: [
      {
        label: `Peso (kg) - ${exerciseName}`,
        data: workoutLogs.map(log => {
          const exercise = log.completedExercises.find(e => e.exerciseName === exerciseName);
          // Return the max weight lifted for that exercise in that workout
          return exercise ? Math.max(...exercise.sets.map(s => s.weight)) : 0;
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ProgressChart;
