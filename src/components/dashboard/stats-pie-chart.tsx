'use client';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'; // Import the necessary components for a pie chart

import { useGetJobsStats } from '~/hooks/api/useJob';

import Skeleton from '../ui/skeleton';

export default function StatsPieChart() {
  const { isLoading, isError, data: stats } = useGetJobsStats();

  return (
    <ResponsiveContainer width="100%" height={300}>
      {isLoading || isError ? (
        <Skeleton className="h-full w-full" />
      ) : (
        <PieChart width={400} height={400}> {/* Specify width and height */}
          {/* Configure the dataKey, data, and other pie chart properties */}
          <Pie
            data={stats?.monthlyApplications}
            dataKey="count" // Replace with the appropriate data key
            cx="50%" // X-position of the center of the pie chart
            cy="50%" // Y-position of the center of the pie chart
            startAngle={90} // Adjust the starting angle if needed
            endAngle={-270} // Adjust the ending angle if needed
            label // Enable labels for pie slices
          >
            {stats?.monthlyApplications.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random colors
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </ResponsiveContainer>
  );
}
