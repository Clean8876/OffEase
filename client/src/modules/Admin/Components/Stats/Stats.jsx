// import React, { useState, useEffect } from 'react';
// import {
//   StatsContainer,
//   StatBox,
//   StatTitle,
//   StatValue,
//   StatIconWrapper,
//   AddButtonWrapper,
//   AddButton,
//   StatsContent,
//   Wrapper
// } from './Stats.styles';
// import Register from '../Register/Register';
// import { AiOutlineUser, AiOutlineCalendar } from 'react-icons/ai';
// import { getAllUsers } from '../../../../api/AuthApi';
// import { getAllLeaves } from '../../../../api/LeaveRequestApi';

// const Stats = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [todaysLeaveCount, setTodaysLeaveCount] = useState(0);

//   useEffect(() => {
//     getAllUsers().then((res) => {
//       if (res && Array.isArray(res)) {
//         setUsers(res);
//       } else {
//         console.error("Unexpected response from getAllUsers:", res);
//       }
//     });

//     getAllLeaves().then((res) => {
//       if (res && Array.isArray(res)) {
//         const today = new Date().toISOString().split('T')[0];
//         const todaysLeaves = res.filter((leave) => {
//           const leaveDate = new Date(leave.createdAt).toISOString().split('T')[0];
//           return leaveDate === today;
//         });
//         setTodaysLeaveCount(todaysLeaves.length);
//       } else {
//         console.error("Unexpected response from getAllLeaves:", res);
//       }
//     });
//   }, []);

//   return (
//     <>
//       <StatsContainer>
//         <Wrapper>
//         <StatBox>
//           <StatIconWrapper>
//             <AiOutlineUser size={32} />
//           </StatIconWrapper>
//           <StatsContent>
//             <StatTitle>No. of Users</StatTitle>
//             <StatValue>{users.length}</StatValue>
//           </StatsContent>
//         </StatBox>

//         <StatBox>
//           <StatIconWrapper>
//             <AiOutlineCalendar size={32} />
//           </StatIconWrapper>
//           <StatsContent>
//             <StatTitle>Today's Leaves</StatTitle>
//             <StatValue>{todaysLeaveCount}</StatValue>
//           </StatsContent>
//         </StatBox>
//         </Wrapper>

//         <AddButtonWrapper>
//           <AddButton onClick={() => setModalOpen(true)}>+ Add Employee</AddButton>
//         </AddButtonWrapper>
//       </StatsContainer>

//       <Register open={modalOpen} onClose={() => setModalOpen(false)} />
//     </>
//   );
// };

// export default Stats;



import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  CalendarDays, 
  PlusCircle,
  Clock
} from 'lucide-react';
import Register from '../Register/Register';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllUsers } from '../../../../api/AuthApi';
import { getAllLeaves } from '../../../../api/LeaveRequestApi';

const Stats = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [todaysLeaveCount, setTodaysLeaveCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const pendingApprovalsCount = 13  ; // number

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, leavesRes] = await Promise.all([
          getAllUsers(),
          getAllLeaves()
        ]);

        if (Array.isArray(usersRes)) setUsers(usersRes);
        if (Array.isArray(leavesRes)) {
          const today = new Date().toISOString().split('T')[0];
          const todaysLeaves = leavesRes.filter(leave => 
            new Date(leave.createdAt).toISOString().split('T')[0] === today
          );
          setTodaysLeaveCount(todaysLeaves.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="w-full">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl px-1 py-6 md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Key metrics and insights</p>
      </div>
      <Button 
        onClick={() => setModalOpen(true)}
        className="bg-[#159AFF] hover:bg-[#1285e0] transition-all shadow-lg hover:shadow-[#159AFF]/40"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Employee
      </Button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
      {/* Total Users */}
      <Card className="border-0 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          <div className="bg-[#5F259F]/10 p-2 rounded-lg">
            <User className="h-5 w-5 text-[#5F259F]" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-1/2" />
          ) : (
            <div className="text-3xl font-bold text-[#5F259F]">{users.length}</div>
          )}
          <p className="text-xs text-gray-500 mt-1">All registered employees</p>
        </CardContent>
      </Card>

      {/* Today's Leaves */}
      <Card className="border-0 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Today's Leaves</CardTitle>
          <div className="bg-[#5F259F]/10 p-2 rounded-lg">
            <CalendarDays className="h-5 w-5 text-[#5F259F]" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-1/2" />
          ) : (
            <div className="text-3xl font-bold text-[#5F259F]">{todaysLeaveCount}</div>
          )}
          <p className="text-xs text-gray-500 mt-1">Leave requests today</p>
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card className="border-0 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Pending Approvals</CardTitle>
          <div className="bg-[#5F259F]/10 p-2 rounded-lg">
            <Clock className="h-5 w-5 text-[#5F259F]" />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-8 w-1/2" />
          ) : (
            <div className="text-3xl font-bold text-[#5F259F]">{pendingApprovalsCount}</div>
          )}
          <p className="text-xs text-gray-500 mt-1">Waiting for admin action</p>
        </CardContent>
      </Card>
    </div>

    <Register open={modalOpen} onClose={() => setModalOpen(false)} />
  </div>
  );
};

export default Stats;