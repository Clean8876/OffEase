import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseLayout from './Pages/BaseLayout/BaseLayout';
import LeaveManagement from './modules/Admin/Pages/LeaveManagement/LeaveManagement';
import Login from './Pages/Login/Login';
import UserBaseLayout from './modules/User/Components/UserBaselayout/UserBaselayout';
import ApplyLeave from './modules/User/Components/ApplyLeave/ApplyLeave';
import Profile from './modules/User/Components/Profile/Profile';
import AdminDashboard from './modules/Admin/Pages/AdminDashboard/AdminDashboard';
import EventManagement from './modules/Admin/Pages/EventManagement/EventManagement';
import EventCalendar from './Components/calender/Calender';
import AllUsersList from './modules/Admin/Pages/AllUsersList/AllUsersList';
import BalanceSheetList from './modules/Admin/Pages/BalanceSheet/BalanceSheetList';
import UserDashboard from './modules/User/Pages/UserDashboard';
import LeaveApprovalModal from './modules/Admin/Components/LeaveApprovalModal/LeaveApprovalModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<BaseLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="all-users" element={<AllUsersList />} />
          <Route path="leave-management" element={<LeaveManagement />} />
          {/* Corrected "mamgement" to "management" */}
          <Route path="leave-management/leave-details/:id" element={<LeaveApprovalModal />} />
          {/* Also corrected event-management spelling */}
          <Route path="event-mamgement" element={<EventManagement />} />
          <Route path="balance-sheet" element={<BalanceSheetList />} />
        </Route>

        <Route path="/user" element={<UserBaseLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="applyleave" element={<ApplyLeave />} />
          <Route path="profile" element={<Profile />} />
          <Route path="calander" element={<EventCalendar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
