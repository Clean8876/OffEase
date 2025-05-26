import React from 'react';
import {
  EventsContainer,
  EventsTitle,
  EventItem,
  GraphContainer,
  EventStat
} from './EventsAndGraph.styles';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// Static sample data
const staticEvents = [
  'Team meeting at 10 AM',
  'Client call at 1 PM',
  'Project deadline submission at 5 PM',
];

const staticLeaveData = [
  { department: 'HR', leaves: 3 },
  { department: 'Sales', leaves: 5 },
  { department: 'Tech', leaves: 2 },
  { department: 'Marketing', leaves: 4 },
];

const EventsAndGraph = () => {
  return (
    <EventsContainer>
      <EventStat>
      <EventsTitle>Today's Events</EventsTitle>
      {staticEvents.map((event, idx) => (
        <EventItem key={idx}>{event}</EventItem>
      ))}
      </EventStat>

      <GraphContainer>
        <h3>Leave Management Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={staticLeaveData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leaves" fill="rgb(238, 211, 236)" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GraphContainer>
    </EventsContainer>
  );
};

export default EventsAndGraph;
