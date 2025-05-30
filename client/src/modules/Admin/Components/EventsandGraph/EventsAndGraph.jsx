// import React, { useEffect, useState } from 'react';
// import {
//   EventsContainer,
//   EventsTitle,
//   EventItem,
//   GraphContainer,
//   EventStat
// } from './EventsAndGraph.styles';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from 'recharts';
// import { getAllUsers } from '../../../../api/AuthApi';

// // Static sample data
// const staticEvents = [
//   'Team meeting at 10 AM',
//   'Client call at 1 PM',
//   'Project deadline submission at 5 PM',
// ];

// const EventsAndGraph = () => {
//   const [users, setUsers] = useState([]);
//   const [employeeChartData, setEmployeeChartData] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await getAllUsers();
//         console.log("Fetched Users Data:", response);
//         const users = Array.isArray(response) ? response : response.data?.data || [];
//         setUsers(users);

//         // Process the department data
//         const departmentCount = {};
//         users.forEach(user => {
//           if (user.department) {
//             departmentCount[user.department] = (departmentCount[user.department] || 0) + 1;
//           }
//         });

//         const chartData = Object.entries(departmentCount).map(([dept, count]) => ({
//           department: dept,
//           employees: count,
//         }));

//         setEmployeeChartData(chartData);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <EventsContainer>
//       <EventStat>
//         <EventsTitle>Today's Events</EventsTitle>
//         {staticEvents.map((event, idx) => (
//           <EventItem key={idx}>{event}</EventItem>
//         ))}
//       </EventStat>

//       <GraphContainer>
//         <h3>No of Employees per Department</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={employeeChartData}
//             margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="department" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="employees" fill="rgb(238, 211, 236)" radius={[10, 10, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </GraphContainer>
//     </EventsContainer>
//   );
// };

// export default EventsAndGraph;

import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
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
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Calendar,
  Users,
  BarChart2,
  Briefcase,
  Bell,
  Clock,
  CheckCircle
} from 'lucide-react';

// API functions would be imported from actual implementation
// import { getAllUsers, getTodaysEvents } from '../../../../api/AuthApi';

const EventsAndGraph = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  // Mock API data - in real app, replace with actual API calls
  const mockEmployees = [
    { department: 'Engineering', employees: 24 },
    { department: 'Marketing', employees: 18 },
    { department: 'Sales', employees: 32 },
    { department: 'Design', employees: 12 },
    { department: 'HR', employees: 8 }
  ];

  const mockEvents = [
    { title: 'Team Sync', time: '10:00 AM', department: 'Engineering' },
    { title: 'Product Launch', time: '1:30 PM', department: 'Marketing' },
    { title: 'Client Review', time: '3:45 PM', department: 'Sales' }
  ];

  useEffect(() => {
    // Simulate API loading
    const fetchData = async () => {
      try {
        // Actual API calls would look like:
        // const users = await getAllUsers();
        // const events = await getTodaysEvents();
        
        // Process chart data
        const departmentData = mockEmployees;
        
        setChartData(departmentData);
        setEvents(mockEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => setLoading(false), 800); // Simulate network delay
      }
    };

    fetchData();
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-indigo-600">
            {payload[0].value} employees
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Today's Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              <span>Employees per Department</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full rounded-xl" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Events Card */}
      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-indigo-700">
            <Calendar className="w-5 h-5" />
            <span>Today's Events</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:bg-indigo-50 transition-colors"
              >
                <div className="bg-indigo-100 p-2 rounded-full mt-1">
                  <Bell className="w-4 h-4 text-indigo-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <span className="flex items-center gap-1 text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      <Briefcase className="w-4 h-4" />
                      {event.department}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
                
                <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="mt-4 text-gray-500">No events scheduled for today</p>
            </div>
          )}
        </CardContent>
        
 
      </Card>

      {/* Chart Card */}
      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-700">
            <Users className="w-5 h-5" />
            <span>Employees per Department</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
                <defs>
                  <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5F259F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#5F259F" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#f0f0f0" 
                />
                
                <XAxis 
                  dataKey="department" 
                  angle={-45} 
                  textAnchor="end"
                  height={60}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                />
                
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f3ff' }} />
                
                <Bar 
                  dataKey="employees" 
                  name="Employees"
                  fill="url(#colorEmployees)" 
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5F259F]"></div>
              <span className="text-sm text-gray-600">Total employees: 94</span>
            </div>
            
           
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventsAndGraph;