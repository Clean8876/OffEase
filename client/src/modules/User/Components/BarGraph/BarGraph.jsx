import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  ChartWrapper,
  ChartTitle,
  ChartContainer
} from './BarGraph.styles';

// Transform data to split hours
const workingHours = [
  { day: "Monday", hours: 8 },
  { day: "Tuesday", hours: 5.5 },
  { day: "Wednesday", hours: 9 },
  { day: "Thursday", hours: 6 },
  { day: "Friday", hours: 7 },
  { day: "Saturday", hours: 3 }
].map((entry) => ({
  day: entry.day,
  regularHours: Math.min(entry.hours, 7),
  overtimeHours: entry.hours > 7 ? entry.hours - 7 : 0
}));

const BarGraph = () => {
  return (
    <ChartWrapper>
      <ChartTitle>Weekly Working Hours</ChartTitle>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={workingHours}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            {/* Regular hours (blue) */}
            <Bar dataKey="regularHours" stackId="a" fill="#2196f3" radius={[0, 0, 0, 0]} barSize={30} />
            {/* Overtime hours (pink) */}
            <Bar dataKey="overtimeHours" stackId="a" fill="#bbdefb" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ChartWrapper>
  );
};

export default BarGraph;
