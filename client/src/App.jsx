import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseLayout from './Pages/BaseLayout/BaseLayout';
import LeaveManagement from './modules/Admin/Pages/LeaveManagement/LeaveManagement';
import Login from './Pages/Login/Login'
import UserBaseLayout from './modules/User/Components/UserBaselayout/UserBaselayout'
import ApplyLeave from './modules/User/Components/ApplyLeave/ApplyLeave'
import Profile from './modules/User/Components/Profile/Profile'
import AdminDashboard from './modules/Admin/Pages/AdminDashboard/AdminDashboard';
import EventManagement from './modules/Admin/Pages/EventManagement/EventManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<BaseLayout />}>
        <Route index element={<AdminDashboard />} />
          <Route path="leave-management" element={<LeaveManagement />} />
          <Route path="event-mamgement" element={<EventManagement />} />

          
          {/* relative path! */}
        </Route>



                <Route path="/user" element={<UserBaseLayout />}>
                <Route path='applyleave' element={<ApplyLeave />}></Route>
                <Route path='profile' element={<Profile />}></Route>
                </Route>

      </Routes>
    </Router>
  );
}

export default App;
