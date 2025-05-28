import React, { useEffect, useState } from 'react';
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
import { getAllUsers } from '../../../../api/AuthApi';

// Static sample data
const staticEvents = [
  'Team meeting at 10 AM',
  'Client call at 1 PM',
  'Project deadline submission at 5 PM',
];

const EventsAndGraph = () => {
  const [users, setUsers] = useState([]);
  const [employeeChartData, setEmployeeChartData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("Fetched Users Data:", response);
        const users = Array.isArray(response) ? response : response.data?.data || [];
        setUsers(users);

        // Process the department data
        const departmentCount = {};
        users.forEach(user => {
          if (user.department) {
            departmentCount[user.department] = (departmentCount[user.department] || 0) + 1;
          }
        });

        const chartData = Object.entries(departmentCount).map(([dept, count]) => ({
          department: dept,
          employees: count,
        }));

        setEmployeeChartData(chartData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <EventsContainer>
      <EventStat>
        <EventsTitle>Today's Events</EventsTitle>
        {staticEvents.map((event, idx) => (
          <EventItem key={idx}>{event}</EventItem>
        ))}
      </EventStat>

      <GraphContainer>
        <h3>No of Employees per Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={employeeChartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="employees" fill="rgb(238, 211, 236)" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </GraphContainer>
    </EventsContainer>
  );
};

export default EventsAndGraph;
