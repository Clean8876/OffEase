import React from 'react';
import {
  EventsContainer,
  EventsTitle,
  EventItem,
  GraphContainer,
} from './EventsAndGraph.styles';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const EventsAndGraph = ({ events = [], leaveData = [] }) => {
  return (
    <EventsContainer>
      <EventsTitle>Today's Events</EventsTitle>
      {events.length ? (
        events.map((event, idx) => <EventItem key={idx}>{event}</EventItem>)
      ) : (
        <EventItem>No events today.</EventItem>
      )}

      <GraphContainer>
        <h3>Leave Management Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={leaveData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leaves" fill="#007bff" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GraphContainer>
    </EventsContainer>
  );
};

export default EventsAndGraph;
